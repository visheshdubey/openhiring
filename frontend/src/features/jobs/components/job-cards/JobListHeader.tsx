import { FilterOptions } from "@/lib/configs/job";
import JobFilterDrawer from "../JobFilterDrawer";
import { Skeleton } from "@/lib/shadcn/components/ui/skeleton";

type Props = {
    totalJobs?: string | number;
    isLoading?: boolean;
};

const JobListHeader = ({ totalJobs = 0, isLoading = false }: Props) => {
    if (isLoading) {
        return (
            <div className="flex justify-between items-center w-full py-2">
                <span className="text-sm text-neutral-500">
                    <Skeleton className="bg-neutral-100 w-28 h-4"></Skeleton>
                </span>
                <div className="block lg:hidden">
                    <JobFilterDrawer filterOptions={FilterOptions} />
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-between items-center w-full py-2">
            <span className="text-sm text-neutral-500">Found {totalJobs} Jobs</span>
            <div className="block lg:hidden">
                <JobFilterDrawer filterOptions={FilterOptions} />
            </div>
        </div>
    );
};

export default JobListHeader;
