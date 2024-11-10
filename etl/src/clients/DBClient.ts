import { Client } from 'pg';
import cuid from 'cuid';

export type DBJobData = {
    company?: string;
    jobTitle?: string;
    minSalary?: number;
    maxSalary?: number;
    minExperience?: number;
    maxExperience?: number;
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
    technologyDomain?: string[]
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
            minSalary,
            maxSalary,
            salaryCurrency,
            jobType,
            jobWorkMode,
            location,
            applyEmails,
            applyLinks,
            technology,
            minExperience,
            maxExperience,
            tags,
            raw,
            seekingWork,
            userId,
            technologyDomain
        } = jobData;

        const query = `
        INSERT INTO public."Job" (
            company, job_title, min_salary, max_salary, salary_currency,
            job_type, job_work_mode, location, apply_emails,
            apply_links, technology, min_experience, max_experience, tags,
            raw, seeking_work, id, updated_at, technology_domain
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
    `;

        const values = [
            company,
            jobTitle,
            minSalary,
            maxSalary,
            salaryCurrency,
            jobType,
            jobWorkMode,
            location,
            applyEmails,
            applyLinks,
            technology,
            minExperience,
            maxExperience,
            tags,
            raw,
            seekingWork || false,
            cuid(),
            new Date(),
            technologyDomain
        ];

        try {
            await this.client.query(query, values);
        } catch (error) {
            console.error('Error inserting job:', error);
            throw error;
        }
    }
}
