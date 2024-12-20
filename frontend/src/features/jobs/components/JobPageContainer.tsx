"use client";

import { FilterOptions } from "@/lib/configs/job";
import { Job } from "../types";
import JobCardList from "./job-cards/JobCardList";
import JobFilters from "./JobFilters";
import JobListHeader from "./job-cards/JobListHeader";
import JobSearchInput from "./JobSearchInput";
import { useEffect } from "react";
import { useFetchInfiniteJobs } from "@/features/jobs/hooks/useFetchInfiniteJobs";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useStore } from "@/store/store";

interface JobPageContainerProps {
    jobs: Job[];
    isLoading: boolean;
    isError: boolean;
    totalJobs?: number;
    onEditJob?: (jobId: string) => void;
}

const JobPageContainer = () => {
    const { filters, updateFilter } = useStore((state) => state.jobs);
    const { data, isFetching, status, hasNextPage, fetchNextPage } = useFetchInfiniteJobs({ filters });
    const { targetRef, isIntersecting } = useIntersectionObserver({
        threshold: 0.1,
        enabled: !isFetching && hasNextPage,
    });

    const handleSearch = (term: string) => {
        updateFilter("search", term);
    };

    useEffect(() => {
        if (isIntersecting && hasNextPage) {
            fetchNextPage();
        }
    }, [isIntersecting, hasNextPage, fetchNextPage]);

    return (
        <div className="w-full bg-neutral-100 px-4">
            <div className="relative flex max-w-screen-xl w-full mx-auto mt-4 gap-8">
                <JobFilters filterOptions={FilterOptions} className="hidden lg:block" />

                <div className="grow flex-col w-full flex gap-4 mt-6">
                    <div className="flex flex-col gap-2 rounded-lg bg-primary px-4 py-6 lg:px-8 lg:py-14 bg-[radial-gradient(circle,rgba(118,49,237,1)_16%,rgba(92,10,232,1)_100%)]">
                        <span className="text-lg lg:text-2xl font-medium text-primary-foreground">Get your career blessed with AI ✨</span>
                        <span className="text-sm lg:text-base text-primary-foreground">
                            Explore the latest job openings and apply for the best job opportunities available today!
                        </span>
                        <JobSearchInput onSearch={handleSearch} />
                    </div>
                    <JobListHeader totalJobs={data?.total} isLoading={isFetching} />
                    <JobCardList jobs={data?.jobs || []} status={status} totalJobs={data?.total} isFetchingMore={isFetching} />
                    <div className="size-20" ref={targetRef}></div>
                </div>
            </div>
        </div>
    );
};

export default JobPageContainer;
