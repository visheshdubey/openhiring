export const JobWorkMode = Object.freeze({
    Remote: 1,
    OnSite: 2,
    Hybrid: 3,
});

export const Technology = Object.freeze({
    WebDev: 1,
    Backend: 2,
    Frontend: 3,
    Blockchain: 4,
    GameDev: 5,
});

export const JobType = Object.freeze({
    FullTime: 1,
    PartTime: 2,
    Contract: 3,
    Freelance: 4,
});

export const ShowOptions = Object.freeze({
    All: 1,
    Bookmarked: 2,
});

export const JobTypeStrings = {
    1: "FullTime",
    2: "PartTime",
    3: "Contract",
    4: "Freelance"
} as const;

export const JobWorkModeStrings = {
    1: "Remote",
    2: "OnSite",
    3: "Hybrid"
} as const;

export const TechnologyStrings = {
    1: "WebDevelopment",
    2: "BackendDevelopment",
    3: "FrontendDevelopment",
    4: "Web3_Blockchain",
    5: "GameDevelopment"
} as const;

export const AvailableFilters = Object.freeze({
    salary: 'salary',
    experience: 'experience',
    jobWorkMode: 'jobWorkMode',
    technology: 'technology',
    jobType: 'jobType',
    showOptions: 'showOptions',
    search: 'search',
    cursor: 'cursor',
});

export const FilterOptions = Object.freeze({
    [AvailableFilters.salary]: {
        min: 10,
        max: 500,
        step: 5,
    },
    [AvailableFilters.experience]: {
        min: 0,
        max: 12,
        step: 1,
    },
    [AvailableFilters.jobWorkMode]: [
        { id: JobWorkMode.Remote, label: "Remote" },
        { id: JobWorkMode.OnSite, label: "On-Site" },
        { id: JobWorkMode.Hybrid, label: "Hybrid" },
    ],
    [AvailableFilters.technology]: [
        { id: Technology.WebDev, label: "Web Development" },
        { id: Technology.Backend, label: "Backend Development" },
        { id: Technology.Frontend, label: "Frontend Development" },
        { id: Technology.Blockchain, label: "Web3/Blockchain" },
        { id: Technology.GameDev, label: "Game Development" },
    ],
    [AvailableFilters.jobType]: [
        { id: JobType.FullTime, label: "Full-Time" },
        { id: JobType.PartTime, label: "Part-Time" },
        { id: JobType.Contract, label: "Contract" },
        { id: JobType.Freelance, label: "Freelance" },
    ],
    [AvailableFilters.showOptions]: [
        { id: ShowOptions.All, label: "All" },
        { id: ShowOptions.Bookmarked, label: "Bookmarked" },
    ],
});


export const FilterDefaultValues = {
    [AvailableFilters.salary]: [10, 250],
    [AvailableFilters.experience]: [0, 10],
    [AvailableFilters.showOptions]: [ShowOptions.All]
}


export type FilterOptionType = typeof FilterOptions;
