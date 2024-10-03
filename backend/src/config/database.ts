import * as schema from '@/entities/schemas/drizzle';

import { DrizzleDialect, DrizzleOutputPath, DrizzleSchemaRoot } from '@/entities/constants/db';

import { Config } from 'drizzle-kit';
import { DrizzleConfig } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import env from './environment';
import postgres from 'postgres';

const credentials = {
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
    port: env.DB_PORT,
};

const drizzleClientConfig: DrizzleConfig = { logger: true };

const connection = postgres(credentials);

const db = drizzle(connection, { schema, logger: drizzleClientConfig.logger });

export const config: Config = {
    schema: DrizzleSchemaRoot,
    out: DrizzleOutputPath,
    dialect: DrizzleDialect,
    dbCredentials: credentials,
};

export default db;