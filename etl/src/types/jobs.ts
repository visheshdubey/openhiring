export interface TransformedJobs {
    raw: Raw
    processed: Processed
}

export interface Raw {
    id: number
    level: number
    html: string
    submitter: string
    url: string
    time: number
}

export interface Processed {
    company: string
    jobTitle: string
    salaryRange: any[]
    salaryCurrency: string
    jobType: string
    jobWorkMode: string
    location: string
    applyEmails: string[]
    applyLinks: string[]
    technology: string[]
    seekingWork: boolean
    experienceRange: number[]
    tags: string[]
}