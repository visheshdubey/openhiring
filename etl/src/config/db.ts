import { Client } from 'pg';
import { DBClient } from '../clients/DBClient';
import { env } from './env';

const config = new Client({
    user: env.DB_USER,
    host: env.DB_HOST,
    database: env.DB_NAME,
    password: env.DB_PASSWORD,
    port: Number(env.DB_PORT),
});

export const db = DBClient.getInstance(config)