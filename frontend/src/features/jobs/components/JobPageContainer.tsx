"use client";

import { Button } from "@/lib/shadcn/ui/button";
import { FilterOptions } from "@/lib/configs/job";
import { Job } from "../types";
import JobCardList from "./JobCardList";
import JobFilters from "./JobFilters";
import JobSearchInput from "./JobSearchInput";
import { useEffect } from "react";
import { useFetchInfiniteJobs } from "@/features/jobs/hooks/useFetchInfiniteJobs";
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
    const { data, refetch, isLoading, isFetching, status, fetchNextPage } = useFetchInfiniteJobs({ filters });

    const handleSearch = (term: string) => {
        updateFilter("search", term);
        // refetch();
    };

    const handleLoadMore = () => {
        fetchNextPage();
    };

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <div className="w-full px-4">
            <div className="relative flex max-w-screen-xl w-full mx-auto mt-4 gap-8">
                <JobFilters filterOptions={FilterOptions} />

                <div className="grow flex-col w-full flex gap-4 mt-6">
                    <div className="flex flex-col gap-2 rounded-lg bg-primary px-4 py-6 lg:px-8 lg:py-14 bg-[radial-gradient(circle,rgba(118,49,237,1)_16%,rgba(92,10,232,1)_100%)]">
                        <span className="text-lg lg:text-2xl font-medium text-primary-foreground">Get your career blessed with AI ✨</span>
                        <span className="text-sm lg:text-base text-primary-foreground">
                            Explore the latest job openings and apply for the best job opportunities available today!
                        </span>
                        <JobSearchInput onSearch={handleSearch} />
                    </div>
                    <JobCardList jobs={data?.jobs || []} status={status} totalJobs={data?.total} />
                    {data?.hasMore && <Button onClick={handleLoadMore}>Load More</Button>}
                </div>
            </div>
        </div>
    );
};

export default JobPageContainer;
