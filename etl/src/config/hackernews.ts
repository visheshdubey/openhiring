import { HackerNewsParser } from "../clients/HackerNewsParser";
import { env } from "./env";

const config = {
    baseUrl: env.HN_BASE_URL,
    user: env.HN_USER
}

export const hn = HackerNewsParser.getInstance(config)