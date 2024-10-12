import axios from 'axios';

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
    private static instance: HackerNewsParser;
    private baseUrl: string;
    private user: string;
    private client: any;

    private constructor(baseUrl: string, user: string) {
        this.baseUrl = baseUrl;
        this.user = user;
        this.client = axios.create({
            baseURL: this.baseUrl,
            maxRedirects: 10,
        });
    }

    public static getInstance({ baseUrl, user }: { baseUrl: string; user: string }): HackerNewsParser {
        if (!HackerNewsParser.instance) {
            HackerNewsParser.instance = new HackerNewsParser(baseUrl, user);
        }

        return HackerNewsParser.instance;
    }

    private async getJobs(): Promise<any> {
        const user = await this.getUser(this.user);
        const threadPromises = user.submitted.slice(0, 72).map((id) => this.getItem(id));
        const items = await Promise.all(threadPromises);
        const threads = items.map((item) => this.itemToThread(item)).filter((thread) => thread !== null);

        const list = [];
        for (const thread of threads) {
            console.log(`Processing ${thread.threadType} ${MONTHS[thread.date.month]} ${thread.date.year}`);
            const comments = await this.expandComments(thread);

            for (const comment of comments) {
                list.push(comment)
            }
        }

        return list;
    }


    async getJobsInBatches(batchSize: number): Promise<any[]> {
        const batchPromises = [];
        const jobs = await this.getJobs()

        for (let i = 0; i < jobs.length; i += batchSize) {
            const batch = jobs.slice(i, i + batchSize);

            batchPromises.push(batch);
        }

        return batchPromises;
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
// const parser = new HackerNewsParser();
// parser.process('./output').catch((err) => console.error(err));


// function convertTimestampToIST(timestamp) {
//     // Convert to milliseconds
//     const date = new Date(timestamp * 1000);

//     // Options for formatting the date
//     const options = {
//         timeZone: "Asia/Kolkata",
//         year: "numeric",
//         month: "2-digit",
//         day: "2-digit",
//         hour: "2-digit",
//         minute: "2-digit",
//         second: "2-digit",
//         hour12: true, // 12-hour format
//     };

//     // Format the date to a readable string
//     const istDateString = date.toLocaleString("en-IN", options);

//     return istDateString;
// }