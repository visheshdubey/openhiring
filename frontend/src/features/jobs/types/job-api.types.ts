import { PaginatedResponse } from "@/lib/api-client/types";

export type JobResponse = PaginatedResponse<Job>;
export type JobRequest = {};

type JobType = "FullTime" | "PartTime" | "Contract" | "Freelance" | undefined;
type JobWorkMode = "Remote" | "Hybrid" | "OnSite";
type JobStatus = "AWAITING_USER_INFO" | "PENDING" | "APPROVED" | "REJECTED";
type TechnologyDomain = "WebDevelopment" | "BackendDevelopment" | "FrontendDevelopment" | "Web3_Blockchain" | "GameDevelopment";

export interface Job {
    id: string;
    company: string | undefined;
    jobTitle: string | undefined;
    minSalary: string;
    maxSalary: string;
    salaryCurrency: string | undefined;
    jobType: JobType | undefined;
    jobWorkMode: JobWorkMode | undefined;
    location: string | undefined;
    applyEmails: string[];
    applyLinks: string[];
    technology: string[];
    technologyDomain: TechnologyDomain;
    minExperience: string;
    maxExperience: string;
    tags: string[];
    raw: string;
    seekingWork: boolean;
    status: JobStatus;
    createdAt: Date;
    updatedAt: Date;
    userId: string | undefined;
    UserJobBookMarks?: {
        id: string;
        userId: string;
        jobId: string;
    }[];
}
