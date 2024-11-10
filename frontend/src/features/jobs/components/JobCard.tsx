import { Heart, PencilIcon } from "lucide-react";
import { isEmpty, isNil } from "lodash";

import { Badge } from "@/lib/shadcn/ui/badge";
import { Button } from "@/lib/shadcn/ui/button";
import { Job } from "../types";
import JobCardExperienceRange from "./JobCardRangeFieldExperience";
import JobCardNotSpecifiedFieldPlaceholder from "./JobCardNotSpecifiedFieldPlaceholder";
import JobCardRangeFieldSalary from "./JobCardRangeFieldSalary";
import { Separator } from "@/lib/shadcn/ui/separator";
import { format } from "date-fns";
import { useState } from "react";

export interface JobCardProps {
    job: Job;
    onEdit?: (jobId: string) => void;
}

const JobCard = ({ job, onEdit }: JobCardProps) => {
    // TODO: This to be done using optimisitically
    const [isFavorite, setIsFavorite] = useState(!isEmpty(job.UserJobBookMarks));
    const [showRawJobDescription, setShowRawJobDescription] = useState(false);

    const getBadgeVariant = (tag: string) => {
        switch (tag.toLowerCase()) {
            case "remote":
                return "secondary";
            case "urgent":
                return "destructive";
            case "featured":
                return "default";
            default:
                return "outline";
        }
    };

    const isMeaningfulValue = (value: string) => {
        return !(isNil(value) || isEmpty(value) || value === "undefined");
    };

    const formatDate = (value: any) => format(new Date(value), "MMM d, yyyy");

    return (
        <div className="bg-card flex flex-col gap-5 lg:gap-8 w-full rounded-lg p-4 border border-neutral-100">
            <div className="flex items-start justify-between">
                <div className="flex flex-col">
                    <span className="text-base lg:text-lg capitalize font-medium text-secondary-foreground">
                        {job.jobTitle !== "undefined" ? job.jobTitle : <JobCardNotSpecifiedFieldPlaceholder fieldName="Role" />}
                    </span>
                    <span className="text-xs lg:text-sm text-neutral-500">
                        {" "}
                        {job.company !== "undefined" ? job.company : <JobCardNotSpecifiedFieldPlaceholder fieldName="Company" />}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    {onEdit && (
                        <Button size="icon" variant="ghost" onClick={() => onEdit(job.id)}>
                            <PencilIcon className="size-4" />
                        </Button>
                    )}
                    <Button
                        size="icon"
                        variant="outline"
                        className="shadow-none border-primary/40 size-8"
                        onClick={() => setIsFavorite(!isFavorite)}
                    >
                        <Heart className={`size-4 ${isFavorite ? "fill-primary text-primary" : "text-primary"}`} />
                    </Button>
                </div>
            </div>
            <div className="flex flex-wrap gap-2 lg:gap-3">
                {job.jobType && isMeaningfulValue(job.jobType.replace("_", " ")) && (
                    <Badge variant="secondary" className="capitalize">
                        {job.jobType.replace("_", " ")}
                    </Badge>
                )}
                {job.jobWorkMode && isMeaningfulValue(job.jobWorkMode.replace("_", " ")) && (
                    <Badge variant="secondary" className="capitalize">
                        {job.jobWorkMode.replace("_", " ")}
                    </Badge>
                )}
                {job.location && isMeaningfulValue(job.location) && (
                    <Badge variant="secondary" className="capitalize">
                        {job.location}
                    </Badge>
                )}
                {job.tags.map((tag, index) => (
                    <Badge key={`${job.id}-tag-${index}`} className="capitalize" variant={getBadgeVariant(tag)}>
                        {tag}
                    </Badge>
                ))}
                {job.technology.map((tag, index) => (
                    <Badge key={`${job.id}-tag-${index}`} className="capitalize" variant={getBadgeVariant(tag)}>
                        {tag}
                    </Badge>
                ))}
            </div>
            <div className="flex flex-wrap gap-2">
                <span className="text-sm text-neutral-600">
                    <JobCardRangeFieldSalary minSalary={job.minSalary} maxSalary={job.maxSalary} currency={job.salaryCurrency} />
                </span>
                <span className="text-sm text-neutral-600">•</span>
                <span className="text-sm text-neutral-600">
                    <JobCardExperienceRange minExperience={job.minExperience} maxExperience={job.maxExperience} />
                </span>
            </div>
            <Separator className="bg-neutral-100" />
            <div className="flex w-full items-center justify-between">
                <span className="text-neutral-500 text-xs">Posted on: {formatDate(job.createdAt)}</span>
                <div className="flex gap-2">
                    <Button variant="link" onClick={() => setShowRawJobDescription(!showRawJobDescription)}>
                        {showRawJobDescription ? "Hide" : "Show"} original
                    </Button>
                    {job.applyLinks.length > 0 && (
                        <Button size="sm" onClick={() => window.open(job.applyLinks[0], "_blank")}>
                            Apply
                        </Button>
                    )}
                </div>
            </div>
            {showRawJobDescription && (
                <div
                    className="p-4 bg-secondary/60 rounded-lg text-secondary-foreground text-sm"
                    dangerouslySetInnerHTML={{ __html: JSON.parse(job.raw).html }}
                ></div>
            )}
        </div>
    );
};

export default JobCard;
