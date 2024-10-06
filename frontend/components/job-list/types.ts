export type JobTag = {
    name: string;
    variant: 'default' | 'secondary' | 'destructive' | 'outline';
}

export type Job = {
    id: string;
    title: string;
    company: string;
    tags: JobTag[];
    isFavorite: boolean;
    postedDate: string;
    rawText?: string
}