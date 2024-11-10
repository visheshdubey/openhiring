import { Job } from "../types";
import JobCard from "./JobCard";
import JobCardSkeleton from "./Skeleton";

type Props = {
    totalJobs: string | number; // Changed from string to number for better type safety
    isError?: boolean;
    status?: "error" | "success" | "pending";
    jobs: Job[];
};

const JobCardList = ({ status = "success", jobs = [], totalJobs = 0 }: Props) => {
    if (status === "pending") {
        return (
            <>
                <div className="w-full py-2">
                    <span className="text-sm text-neutral-500">Loading jobs...</span>
                </div>
                <div className="flex flex-col gap-4">
                    <JobCardSkeleton />
                    <JobCardSkeleton />
                    <JobCardSkeleton />
                </div>
            </>
        );
    }

    if (status === "error") {
        return (
            <>
                <div className="w-full py-2">
                    <span className="text-sm text-neutral-500">Error loading jobs</span>
                </div>
                <div className="text-center py-8 text-red-500">Failed to load jobs. Please try again later.</div>
            </>
        );
    }

    if (jobs.length === 0) {
        return (
            <>
                <div className="w-full py-2">
                    <span className="text-sm text-neutral-500">No jobs found</span>
                </div>
                <div className="text-center py-8 text-neutral-500">No jobs found matching your criteria.</div>
            </>
        );
    }

    return (
        <>
            <div className="w-full py-2">
                <span className="text-sm text-neutral-500">Found {totalJobs.toLocaleString()} Jobs</span>
            </div>
            <div className="flex flex-col gap-4">
                {jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                ))}
            </div>
        </>
    );
};

export default JobCardList;
