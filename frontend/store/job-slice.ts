import { ImmerStateCreator } from "./types";

type JobState = {
    filters: JobFilters
}

type JobRangeFilters = {
    salary: number[];
    experience: number[];

}
type JobMultiSelectFilters = {
    workLocation: string[];
    technology: string[];
    jobType: string[];
    showOptions: string[];
}

type JobFilters = JobRangeFilters & JobMultiSelectFilters

type JobActions = {
    updateRangeFilter: (filterId: keyof JobRangeFilters, value: number[]) => void;
    updateMultiSelectFilter: (filterId: keyof JobMultiSelectFilters, value: string[]) => void;
};

type JobSlice = { jobs: JobState & JobActions };

const initialState: JobState = {
    filters: {
        salary: [10, 50],
        experience: [0, 1],
        workLocation: [],
        technology: [],
        jobType: [],
        showOptions: [],
    }
}

export const createJobSlice: ImmerStateCreator<JobSlice> = (set) => ({
    jobs: {
        ...initialState,
        updateRangeFilter: (filterId, value) =>
            set(({ jobs }: JobSlice) => {
                jobs.filters[filterId] = value
            }),
        updateMultiSelectFilter: (filterId, salaryRange) =>
            set(({ jobs }: JobSlice) => {
                jobs.filters[filterId] = salaryRange
            }),
    }
})


