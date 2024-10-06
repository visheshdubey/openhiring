export const FilterOptions = Object.freeze({
    salary: {
        min: 10,
        max: 500,
        step: 5
    },
    experience: {
        min: 0,
        max: 12,
        step: 1
    },
    workLocation: [
        { id: 'work-1', label: 'Work from Home/Remote' },
        { id: 'work-2', label: 'In-Office' },
    ],
    technology: [
        { id: 'tech-1', label: 'Web Development' },
        { id: 'tech-2', label: 'Backend Development' },
        { id: 'tech-3', label: 'Frontend Development' },
        { id: 'tech-4', label: 'Web3/Blockchain' },
        { id: 'tech-5', label: 'Game Development' },
    ],
    jobType: [
        { id: 'job-1', label: 'Full-Time' },
        { id: 'job-2', label: 'Contract' },
        { id: 'job-3', label: 'Freelance' },
    ],
    showOptions: [
        { id: 'show-1', label: 'All' },
        { id: 'show-2', label: 'Bookmarked' },
    ],
})

export type FilterOptionType = typeof FilterOptions
