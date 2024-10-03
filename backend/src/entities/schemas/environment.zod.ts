import { z } from 'zod';

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).optional(),
    PORT: z.coerce.number().default(8080),
    JWT_SECRET: z.string(),
    DB_URL: z.string(),
    DB_HOST: z.string(),
    DB_PORT: z.coerce.number(),
    DB_USER: z.string(),
    DB_PASS: z.string(),
    DB_NAME: z.string(),
});

export default envSchema;

export type Environment = z.infer<typeof envSchema>;