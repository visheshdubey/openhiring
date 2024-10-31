import { Job } from "../types";
import JobCard from "./JobCard";

type Props = {
    totalJobs: string;
    isError?: boolean;
    isLoading?: boolean;
    jobs: Job[];
};

const JobCardList = ({ isError, isLoading, jobs, totalJobs }: Props) => {
    return (
        <>
            <div className="w-full py-2">
                <span className="text-sm text-neutral-500">Found {totalJobs.toLocaleString()} Jobs</span>
            </div>

            {isError ? (
                <div className="text-center py-8 text-red-500">Failed to load jobs. Please try again later.</div>
            ) : isLoading ? (
                <div className="text-center py-8">Loading jobs...</div>
            ) : jobs.length === 0 ? (
                <div className="text-center py-8 text-neutral-500">No jobs found matching your criteria.</div>
            ) : (
                <div className="flex flex-col gap-4">
                    {jobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>
            )}
        </>
    );
};

export default JobCardList;
