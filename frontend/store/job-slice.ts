import { ImmerStateCreator } from "./types";

type JobState = {
    bookmarkedJobs: string[],
    filters: {
        salary: number[]
    }
}

type JobActions = {
    addBookmarkJobs: (jobId: string) => void
}

type JobSlice = { jobs: JobState & JobActions };

const initialState: JobState = {
    bookmarkedJobs: [],
    filters: {
        salary: []
    }
}

export const createJobSlice: ImmerStateCreator<JobSlice> = (set) => ({
    jobs: {
        ...initialState,
        addBookmarkJobs: (jobId) =>
            set(({ jobs }: JobSlice) => {
                jobs.bookmarkedJobs = [...jobs.bookmarkedJobs, jobId]
            }),
    }
})


