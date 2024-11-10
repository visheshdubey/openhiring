import { Separator } from "@/lib/shadcn/ui/separator";
import { Skeleton } from "@/lib/shadcn/components/ui/skeleton";

type Props = {};

const JobCardSkeleton = (props: Props) => {
    return (
        <div className="bg-card flex flex-col gap-5 lg:gap-8 w-full rounded-lg p-4 border border-neutral-100">
            <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1.5">
                    <span className="text-base lg:text-lg font-medium text-secondary-foreground">
                        <Skeleton className="bg-neutral-100 h-4 lg:h-5 w-40" />
                    </span>
                    <span className="text-xs lg:text-sm text-neutral-500">
                        <Skeleton className="bg-neutral-100 w-20 h-4"></Skeleton>
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Skeleton className="bg-neutral-100 size-8"></Skeleton>
                    <Skeleton className="bg-neutral-100 size-8"></Skeleton>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 lg:gap-3">
                <Skeleton className="bg-neutral-100 w-24 h-4"></Skeleton>
                <Skeleton className="bg-neutral-100 w-28 h-4"></Skeleton>
                <Skeleton className="bg-neutral-100 w-20 h-4"></Skeleton>
                <Skeleton className="bg-neutral-100 w-12 h-4"></Skeleton>
            </div>

            <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-neutral-600">
                    <Skeleton className="bg-neutral-100 w-28 h-4"></Skeleton>
                </span>
                <Skeleton className="bg-neutral-100 size-1.5 rounded-full"></Skeleton>
                <span className="text-sm text-neutral-600">
                    <Skeleton className="bg-neutral-100 w-20 h-4"></Skeleton>
                </span>
            </div>

            <Separator className="bg-neutral-100" />

            <div className="flex w-full items-center justify-between">
                <span className="text-neutral-500 text-xs">
                    <Skeleton className="bg-neutral-100 w-28 h-4"></Skeleton>
                </span>
                <div className="flex gap-2">
                    <Skeleton className="bg-neutral-100 w-20 h-8"></Skeleton>
                    <Skeleton className="bg-neutral-100 w-20 h-8"></Skeleton>
                </div>
            </div>
        </div>
    );
};

export default JobCardSkeleton;
