import { Heart, PencilIcon } from "lucide-react";

import { Button } from "@/lib/shadcn/ui/button";
import { Job } from "../../types";
import JobCardNotSpecifiedFieldPlaceholder from "./JobCardNotSpecifiedFieldPlaceholder";

interface JobCardHeaderProps {
    job: Job;
    isFavorite: boolean;
    isAdmin: boolean;
    onEdit: () => void;
    onBookmark: () => void;
}

export const JobCardHeader = ({ job, isFavorite, isAdmin, onEdit, onBookmark }: JobCardHeaderProps) => {
    const showJobTitle = job.jobTitle !== "undefined";
    const showCompany = job.company !== "undefined";

    return (
        <div className="flex items-start justify-between">
            <div className="flex flex-col">
                <span className="text-base lg:text-lg capitalize font-medium text-secondary-foreground">
                    {showJobTitle ? job.jobTitle : <JobCardNotSpecifiedFieldPlaceholder fieldName="Role" />}
                </span>
                <span className="text-xs lg:text-sm text-neutral-500">
                    {showCompany ? job.company : <JobCardNotSpecifiedFieldPlaceholder fieldName="Company" />}
                </span>
            </div>
            <div className="flex items-center gap-2">
                {isAdmin && (
                    <Button size="icon" variant="ghost" onClick={onEdit}>
                        <PencilIcon className="size-4" />
                    </Button>
                )}
                <Button size="icon" variant="outline" className="shadow-none border-primary/40 size-8" onClick={onBookmark}>
                    <Heart className={`size-4 ${isFavorite ? "fill-primary text-primary" : "text-primary"}`} />
                </Button>
            </div>
        </div>
    );
};
