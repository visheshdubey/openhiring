import * as dotenv from 'dotenv';

import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
    HN_BASE_URL: z.string(),
    HN_USER: z.string(),

    BUNNY_API_KEY: z.string(),
    BUNNY_PULL_ZONE: z.string(),
    BUNNY_STORAGE_ZONE: z.string(),
    BUNNY_HOSTNAME: z.string(),

    EXTRACT_INPUT_DIR: z.string(),
    EXTRACT_OUTPUT_DIR: z.string(),

    TRANSFORM_INPUT_DIR: z.string(),
    TRANSFORM_OUTPUT_DIR: z.string(),

    LOAD_INPUT_DIR: z.string(),
    LOAD_OUTPUT_DIR: z.string(),

    EXTRACT_CRON: z.string(),
    TRANSFORM_CRON: z.string(),
    LOAD_CRON: z.string(),

    OPENAI_KEY: z.string(),

    DB_HOST: z.string(),
    DB_PORT: z.string().refine((val) => !isNaN(Number(val)), {
        message: "DB_PORT must be a number",
    }),
    DB_NAME: z.string(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
});

export const extractEnvironmentVariables = (env: any) => {
    const { HN_BASE_URL,
        HN_USER,
        BUNNY_API_KEY,
        BUNNY_PULL_ZONE,
        BUNNY_STORAGE_ZONE,
        BUNNY_HOSTNAME,
        EXTRACT_INPUT_DIR,
        EXTRACT_OUTPUT_DIR,
        TRANSFORM_INPUT_DIR,
        TRANSFORM_OUTPUT_DIR,
        LOAD_INPUT_DIR,
        LOAD_OUTPUT_DIR,
        EXTRACT_CRON,
        TRANSFORM_CRON,
        LOAD_CRON,
        OPENAI_KEY,
        DB_HOST,
        DB_PORT,
        DB_NAME,
        DB_USER,
        DB_PASSWORD } = env

    return {
        HN_BASE_URL,
        HN_USER,
        BUNNY_API_KEY,
        BUNNY_PULL_ZONE,
        BUNNY_STORAGE_ZONE,
        BUNNY_HOSTNAME,
        EXTRACT_INPUT_DIR,
        EXTRACT_OUTPUT_DIR,
        TRANSFORM_INPUT_DIR,
        TRANSFORM_OUTPUT_DIR,
        LOAD_INPUT_DIR,
        LOAD_OUTPUT_DIR,
        EXTRACT_CRON,
        TRANSFORM_CRON,
        LOAD_CRON,
        OPENAI_KEY,
        DB_HOST,
        DB_PORT,
        DB_NAME,
        DB_USER,
        DB_PASSWORD
    }
}

export const validateEnv = () => {
    const parsedEnv = envSchema.safeParse(process.env);

    if (!parsedEnv.success) {
        console.error("Invalid environment variables", parsedEnv.error);

        throw new Error("Invalid environment variables");
    }

    return parsedEnv.data;
};

export const env = validateEnv();
