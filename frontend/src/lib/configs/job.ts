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

export const FilterOptions = Object.freeze({
    salary: {
        min: 10,
        max: 500,
        step: 5,
    },
    experience: {
        min: 0,
        max: 12,
        step: 1,
    },
    jobWorkMode: [
        { id: JobWorkMode.Remote, label: "Remote" },
        { id: JobWorkMode.OnSite, label: "On-Site" },
        { id: JobWorkMode.Hybrid, label: "Hybrid" },
    ],
    technology: [
        { id: Technology.WebDev, label: "Web Development" },
        { id: Technology.Backend, label: "Backend Development" },
        { id: Technology.Frontend, label: "Frontend Development" },
        { id: Technology.Blockchain, label: "Web3/Blockchain" },
        { id: Technology.GameDev, label: "Game Development" },
    ],
    jobType: [
        { id: JobType.FullTime, label: "Full-Time" },
        { id: JobType.PartTime, label: "Part-Time" },
        { id: JobType.Contract, label: "Contract" },
        { id: JobType.Freelance, label: "Freelance" },
    ],
    showOptions: [
        { id: ShowOptions.All, label: "All" },
        { id: ShowOptions.Bookmarked, label: "Bookmarked" },
    ],
});


export const FilterDefaultValues = {
    salary: [10, 250],
    experience: [0, 10],
    showOptions: [ShowOptions.All]
}


export type FilterOptionType = typeof FilterOptions;
