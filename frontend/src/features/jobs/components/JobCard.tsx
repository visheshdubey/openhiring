import { Heart, PencilIcon } from "lucide-react";

import { Badge } from "@/lib/shadcn/ui/badge";
import { Button } from "@/lib/shadcn/ui/button";
import { Job } from "../types";
import { Separator } from "@/lib/shadcn/ui/separator";
import { useState } from "react";

export interface JobCardProps {
    job: Job;
    onEdit?: (jobId: string) => void;
}

const JobCard = ({ job, onEdit }: JobCardProps) => {
    const [isFavorite, setIsFavorite] = useState(false);
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

    const formatSalaryRange = (range: string[]) => {
        if (range.length !== 2) return "Salary not specified";
        return `${job.salaryCurrency || "$"}${range[0]} - ${job.salaryCurrency || "$"}${range[1]}`;
    };

    const formatExperienceRange = (range: number[]) => {
        if (range.length !== 2) return "Experience not specified";
        return `${range[0]}-${range[1]} years`;
    };

    const formatDate = (value: any) => value;

    return (
        <div className="bg-card flex flex-col gap-5 lg:gap-8 w-full rounded-lg p-4 border border-neutral-100">
            <div className="flex items-start justify-between">
                <div className="flex flex-col">
                    <span className="text-base lg:text-lg font-medium text-secondary-foreground">
                        {job.jobTitle || "Untitled Position"}
                    </span>
                    <span className="text-xs lg:text-sm text-neutral-500">{job.company || "Company not specified"}</span>
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
                {job.jobType && <Badge variant="secondary">{job.jobType.replace("_", " ")}</Badge>}
                {job.jobWorkMode && <Badge variant="outline">{job.jobWorkMode.replace("_", " ")}</Badge>}
                {job.location && <Badge variant="outline">{job.location}</Badge>}
                {job.tags.map((tag, index) => (
                    <Badge key={`${job.id}-tag-${index}`} variant={getBadgeVariant(tag)} className="font-normal lg:text-[13px]">
                        {tag}
                    </Badge>
                ))}
            </div>

            <div className="flex flex-wrap gap-2">
                <span className="text-sm text-neutral-600">{formatSalaryRange(job.salaryRange)}</span>
                <span className="text-sm text-neutral-600">•</span>
                <span className="text-sm text-neutral-600">{formatExperienceRange(job.experienceRange)}</span>
            </div>

            <Separator className="bg-neutral-100" />

            <div className="flex w-full items-center justify-between">
                <span className="text-neutral-500 text-xs">Posted on: {formatDate(job.createdAt)}</span>
                <div className="flex gap-2">
                    <Button variant="link" onClick={() => setShowRawJobDescription(!showRawJobDescription)}>
                        {showRawJobDescription ? "Hide" : "Show"} raw
                    </Button>
                    {job.applyLinks.length > 0 && (
                        <Button size="sm" onClick={() => window.open(job.applyLinks[0], "_blank")}>
                            Apply
                        </Button>
                    )}
                </div>
            </div>

            {showRawJobDescription && <div className="p-4 bg-secondary/60 rounded-lg text-secondary-foreground text-sm">{job.raw}</div>}
        </div>
    );
};

export default JobCard;
