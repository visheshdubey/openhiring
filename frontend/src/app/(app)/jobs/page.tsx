"use client";

import AppHeader from "@/features/navigation/components/AppHeader";
import { FilterOptions } from "@/lib/configs/job";
import FilterSideBar from "@/lib/components/job-list/FilterSideBar";
import { Job } from "@/lib/components/job-list/types";
import JobCard from "@/lib/components/job-list/JobCard";
import JobSearchInput from "@/lib/components/job-list/JobSearchInput";
import { fetchJobs } from "@/lib/api-client/api-client";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

type Props = {};

// TODO: Following data to be removed before final release

type JobTags = {
    id: number;
    name: string;
    variant: "secondary" | "destructive" | null | undefined;
    order: number;
}[];

const jobTags: JobTags = [
    { id: 1, name: "$30K-40K /Month", variant: "secondary", order: 1 },
    { id: 2, name: "Backend Developer", variant: "secondary", order: 2 },
    { id: 3, name: "Full Stack Developer", variant: "secondary", order: 3 },
    { id: 4, name: "DevOps Engineer", variant: "secondary", order: 4 },
    { id: 5, name: "Data Scientist", variant: "secondary", order: 5 },
    { id: 6, name: "Mobile Developer", variant: "secondary", order: 6 },
    { id: 7, name: "QA Engineer", variant: "secondary", order: 7 },
    { id: 9, name: "Cloud Engineer", variant: "secondary", order: 9 },
    { id: 10, name: "UI/UX Designer", variant: "secondary", order: 10 },
    { id: 8, name: "Urgent", variant: "destructive", order: 8 },
];

export const sampleJobs: Job[] = [
    {
        id: "1",
        title: "Full Stack Developer",
        company: "Campusmonk",
        tags: [
            { name: "React", variant: "secondary" },
            { name: "Node.js", variant: "secondary" },
            { name: "TypeScript", variant: "secondary" },
            { name: "Remote", variant: "secondary" },
        ],
        isFavorite: false,
        postedDate: "04 Oct, 2024",
    },
    {
        id: "2",
        title: "UX Designer",
        company: "DesignCo",
        tags: [
            { name: "Figma", variant: "secondary" },
            { name: "UI/UX", variant: "secondary" },
            { name: "Prototyping", variant: "secondary" },
            { name: "Hybrid", variant: "secondary" },
        ],
        isFavorite: true,
        postedDate: "03 Oct, 2024",
    },
    {
        id: "3",
        title: "Data Scientist",
        company: "DataTech Solutions",
        tags: [
            { name: "Python", variant: "secondary" },
            { name: "Machine Learning", variant: "secondary" },
            { name: "SQL", variant: "secondary" },
            { name: "On-site", variant: "destructive" },
        ],
        isFavorite: false,
        postedDate: "02 Oct, 2024",
    },
    {
        id: "4",
        title: "DevOps Engineer",
        company: "CloudScale Inc.",
        tags: [
            { name: "AWS", variant: "secondary" },
            { name: "Docker", variant: "secondary" },
            { name: "Kubernetes", variant: "secondary" },
            { name: "Remote", variant: "secondary" },
        ],
        isFavorite: false,
        postedDate: "01 Oct, 2024",
    },
    {
        id: "5",
        title: "Mobile App Developer",
        company: "AppWizards",
        tags: [
            { name: "React Native", variant: "secondary" },
            { name: "iOS", variant: "secondary" },
            { name: "Android", variant: "secondary" },
            { name: "Hybrid", variant: "secondary" },
        ],
        isFavorite: true,
        postedDate: "30 Sep, 2024",
    },
];

const JobPage = (props: Props) => {
    const getWorkProjects = useQuery({
        queryKey: ["jobs"],
        queryFn: fetchJobs,
    });

    useEffect(() => {
        console.log(getWorkProjects.data);
    }, [getWorkProjects.data]);

    return (
        <div className="bg-neutral-50 min-h-screen">
            <AppHeader className="sticky top-0 z-50" />

            <div className="w-full px-4">
                <div className="relative flex max-w-screen-xl w-full mx-auto mt-4 gap-8">
                    <FilterSideBar filterOptions={FilterOptions} />

                    <div className="grow flex-col w-full flex gap-4 mt-6">
                        <div className="flex flex-col gap-2 rounded-lg bg-primary px-4 py-6 lg:px-8 lg:py-14 bg-[radial-gradient(circle,rgba(118,49,237,1)_16%,rgba(92,10,232,1)_100%)]">
                            <span className="text-lg lg:text-2xl font-medium text-primary-foreground">
                                Get your career blessed with AI ✨
                            </span>
                            <span className="text-sm lg:text-base text-primary-foreground">
                                Explore the latest job openings and apply for the best job opportunities available today!
                            </span>
                            <JobSearchInput onSearch={() => {}} />
                        </div>

                        <div className="w-full py-2">
                            <span className="text-sm text-neutral-500">Found 21399 Jobs</span>
                        </div>

                        {sampleJobs.map((job, index) => (
                            <JobCard job={job} key={`job-card-${index}`} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobPage;
