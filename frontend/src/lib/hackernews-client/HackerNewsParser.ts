import * as fs from 'fs';

import axios from 'axios';
import { join } from 'path';

const BASE = 'https://hacker-news.firebaseio.com/v0';
const USER = 'whoishiring';

interface User {
    about: string;
    created: number;
    id: string;
    karma: number;
    submitted: number[];
}

interface Item {
    id: number;
    deleted?: boolean;
    type: string;
    by?: string;
    time: number;
    text?: string;
    dead?: boolean;
    parent?: number;
    kids?: number[];
    url?: string;
    score?: number;
    title?: string;
    descendants?: number;
}

enum ThreadType {
    Freelancer = "Freelancer",
    Fulltime = "Fulltime",
}

class Thread {
    constructor(
        public id: number,
        public threadType: ThreadType,
        public date: DateObj,
        public comments: number[]
    ) { }
}

class Comment {
    constructor(
        public id: number,
        public level: number,
        public html: string,
        public submitter: string,
        public url: string,
        public time: number
    ) { }
}

class DateObj {
    constructor(public month: number, public year: number) { }

    isCurrent(): boolean {
        const now = new Date();
        return this.month === now.getMonth() && this.year === now.getFullYear();
    }
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export class HackerNewsParser {
    private client = axios.create({
        baseURL: BASE,
        maxRedirects: 10,
    });

    async process(outDir: string): Promise<any> {
        console.log(`Writing out to ${outDir}`);
        const user = await this.getUser(USER);

        const threadPromises = user.submitted.slice(0, 72).map((id) => this.getItem(id));
        const items = await Promise.all(threadPromises);

        const threads = items
            .map((item) => this.itemToThread(item))
            .filter((thread) => thread !== null) as Thread[];
        let list = []
        for (const thread of threads) {
            console.log(`Processing ${thread.threadType} ${MONTHS[thread.date.month]} ${thread.date.year}`);

            // if (!thread.date.isCurrent()) {
            const comments = await this.expandComments(thread);


            const commentsObj: Record<string, Comment> = comments.reduce((obj, comment) => {
                obj[comment.id.toString()] = comment;
                console.log(convertTimestampToIST(comment.time));
                return obj;
            }, {});

            // const path = join(outDir, `comments-${thread.id}.json`);

            // if (!fs.existsSync(outDir)) {
            //     fs.mkdirSync(outDir, { recursive: true }); // Create directory if it doesn't exist
            // }
            // fs.writeFileSync(path, JSON.stringify(commentsObj, null, 2));
            list.push(commentsObj)

            // console.log('-->', JSON.stringify(commentsObj, null, 2))


            // }
            return list
        }

        const threadMap = threads.reduce((map, thread) => {
            const key = `${thread.date.year}-${thread.date.month}-${thread.threadType}`;
            map[key] = { id: thread.id, threadType: thread.threadType, date: thread.date };
            return map;
        }, {} as Record<string, { id: number; threadType: ThreadType; date: DateObj }>);

        const threadList = Object.values(threadMap).map((el) => [
            `${MONTHS[el.date.month]} ${el.date.year} &mdash; ${el.threadType}`,
            `${el.id}`,
        ]);

        const path = join(outDir, `threads.json`);
        fs.writeFileSync(path, JSON.stringify(threadList, null, 2));
    }

    private async getUser(username: string): Promise<User> {
        const response = await this.client.get(`/user/${username}.json`);
        return response.data;
    }

    private async getItem(id: number): Promise<Item> {
        const response = await this.client.get(`/item/${id}.json`);
        return response.data;
    }

    private itemToThread(item: Item): Thread | null {
        if (item.type !== 'story' || !item.title) {
            return null;
        }

        const threadType = this.parseType(item.title);
        const date = this.parseDate(item.title);

        if (!threadType || !date) {
            return null;
        }

        return new Thread(item.id, threadType, date, item.kids || []);
    }

    private parseType(title: string): ThreadType | null {
        if (title.toLowerCase().includes('freelancer')) {
            return ThreadType.Freelancer;
        } else if (title.toLowerCase().includes('who is hiring')) {
            return ThreadType.Fulltime;
        } else {
            return null;
        }
    }

    private parseDate(title: string): DateObj | null {
        const re = /\((\w+) (\d+)\)/;
        const match = title.match(re);

        if (!match) {
            return null;
        }

        const monthStr = match[1];
        const yearStr = match[2];

        const month = MONTHS.findIndex((m) => m.startsWith(monthStr));
        const year = parseInt(yearStr);

        if (month === -1 || isNaN(year)) {
            return null;
        }

        return new DateObj(month, year);
    }

    private async expandComments(thread: Thread): Promise<Comment[]> {
        const commentPromises = thread.comments.map((id) =>
            this.getItem(id)
                .then((item) => this.itemToComment(item))
                .catch((err) => {
                    console.error(`Failed on comment ${id}: ${err}`);
                    return null;
                })
        );
        const comments = await Promise.all(commentPromises);
        return comments.filter((comment) => comment !== null) as Comment[];
    }

    private itemToComment(item: Item): Comment | null {
        if (!item.text || !item.by) {
            return null;
        }

        return new Comment(
            item.id,
            0,
            item.text,
            item.by,
            `https://news.ycombinator.com/item?id=${item.id}`,
            item.time
        );
    }
}

// Example usage:
const parser = new HackerNewsParser();
parser.process('./output').catch((err) => console.error(err));


function convertTimestampToIST(timestamp) {
    // Convert to milliseconds
    const date = new Date(timestamp * 1000);

    // Options for formatting the date
    const options = {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true, // 12-hour format
    };

    // Format the date to a readable string
    const istDateString = date.toLocaleString("en-IN", options);

    return istDateString;
}