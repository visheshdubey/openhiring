export type JobResponse = {}
export type JobRequest = {}

type JobType = "FULL_TIME" | "PART_TIME" | "CONTRACT" | "FREELANCE" | "INTERNSHIP";
type JobWorkMode = "REMOTE" | "HYBRID" | "ON_SITE";
type JobStatus = "AWAITING_USER_INFO" | "PENDING" | "APPROVED" | "REJECTED";

export interface Job {
    id: string;
    company: string | null;
    jobTitle: string | null;
    salaryRange: string[];
    salaryCurrency: string | null;
    jobType: JobType | null;
    jobWorkMode: JobWorkMode | null;
    location: string | null;
    applyEmails: string[];
    applyLinks: string[];
    technology: string[];
    experienceRange: number[];
    tags: string[];
    raw: string;
    seekingWork: boolean;
    status: JobStatus;
    createdAt: Date;
    updatedAt: Date;
    userId: string | null;
}