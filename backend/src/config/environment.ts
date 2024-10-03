import * as dotenv from 'dotenv';

import schema from '@/entities/schemas/environment.zod';

dotenv.config();

const envVars = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    DB_URL: process.env.DB_URL,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_NAME: process.env.DB_NAME,
};

const env = schema.parse(envVars);

export const validateEnv = schema.safeParse(envVars);

export default env;