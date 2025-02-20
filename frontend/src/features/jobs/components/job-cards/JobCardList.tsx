"use client";

import { Job } from "../../types";
import JobCard from "./JobCard";
import JobCardSkeleton from "../Skeleton";
import JobListHeader from "./JobListHeader";
import { useBookmarkJob } from "../../hooks/useBookmarkJob";
import { useRouter } from "next/navigation";

type Props = {
    totalJobs?: string | number; // Changed from string to number for better type safety
    isError?: boolean;
    status?: "error" | "success" | "pending";
    isFetchingMore?: boolean;
    jobs: Job[];
};

const JobCardList = ({ status = "success", jobs = [], totalJobs = 0, isFetchingMore }: Props) => {
    const router = useRouter();
    const { mutate } = useBookmarkJob();

    const handleOnEdit = (id: string) => {
        router.push(`jobs/${id}`);
    };

    const handleOnBookmark = (id: string) => {
        mutate(id);
    };

    if (status === "pending") {
        return (
            <>
                <div className="flex flex-col gap-4">
                    {Array(4)
                        .fill("")
                        .map((_, index) => (
                            <JobCardSkeleton key={`job-list-skeleton-${index}`} />
                        ))}
                </div>
            </>
        );
    }

    if (status === "error") {
        return (
            <>
                <div className="text-center py-8 text-red-500">Failed to load jobs. Please try again later.</div>
            </>
        );
    }

    if (jobs.length === 0) {
        return (
            <>
                <div className="text-center py-8 text-neutral-500">No jobs found matching your criteria.</div>
            </>
        );
    }

    return (
        <>
            <div className="flex flex-col gap-4">
                {jobs.map((job) => (
                    <JobCard key={job.id} job={job} onEdit={handleOnEdit} onBookmark={handleOnBookmark} />
                ))}
                {isFetchingMore && <JobCardSkeleton />}
            </div>
        </>
    );
};

export default JobCardList;
