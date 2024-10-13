import { Client } from 'pg';
import cuid from 'cuid';

export type DBJobData = {
    company?: string;
    jobTitle?: string;
    salaryRange: string[];
    salaryCurrency?: string;
    jobType?: string;
    jobWorkMode?: string;
    location?: string;
    applyEmails: string[];
    applyLinks: string[];
    technology: string[];
    experienceRange: number[];
    tags: string[];
    raw: string;
    seekingWork?: boolean;
    userId?: string;
}
export class DBClient {
    private static instance: DBClient;
    private client: Client;

    private constructor(client: Client) {
        this.client = client
        this.client.connect();
    }

    public static getInstance(client: Client): DBClient {
        if (!DBClient.instance) {
            DBClient.instance = new DBClient(client);
        }
        return DBClient.instance;
    }

    public async insertJob(jobData: DBJobData): Promise<void> {
        const {
            company,
            jobTitle,
            salaryRange,
            salaryCurrency,
            jobType,
            jobWorkMode,
            location,
            applyEmails,
            applyLinks,
            technology,
            experienceRange,
            tags,
            raw,
            seekingWork,
            userId,
        } = jobData;

        const query = `
            INSERT INTO public."Job" (
                company, job_title, salary_range, salary_currency,
                job_type, job_work_mode, location, apply_emails,
                apply_links, technology, experience_range, tags,
                raw, seeking_work, id, updated_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
        `;

        const values = [
            company,
            jobTitle,
            salaryRange,
            salaryCurrency,
            jobType,
            jobWorkMode,
            location,
            applyEmails,
            applyLinks,
            technology,
            experienceRange,
            tags,
            raw,
            seekingWork || false,
            cuid(),
            new Date()
        ];

        try {
            await this.client.query(query, values);
        } catch (error) {
            console.error('Error inserting job:', error);
            throw error;
        }
    }
}
