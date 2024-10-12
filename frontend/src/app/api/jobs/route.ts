import { HackerNewsParser } from "@/lib/hackernews-client/HackerNewsParser";

export const POST = async () => {
    const parser = new HackerNewsParser();
    const jobs = await parser.process('./output');

    return Response.json({ jobs, length: Object.keys(jobs[0]).length })
}