export interface JobRes {
    jobs: Job[]
    total: number
}

export interface Job {
    id: string
    company: string
    jobTitle: string
    salaryRange: string[]
    salaryCurrency: string
    jobType: string
    jobWorkMode: string
    location: string
    applyEmails: string[]
    applyLinks: string[]
    technology: string[]
    experienceRange: number[]
    tags: string[]
    raw: string
    seekingWork: boolean
    status: string
    createdAt: string
    updatedAt: string
    userId: any
}