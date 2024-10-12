import { HeartFilledIcon, HeartIcon, Pencil2Icon } from "@radix-ui/react-icons";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Job } from "./types";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

interface JobCardProps {
    job: Job;
    onEdit?: (jobId: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onEdit }) => {
    const [isFavorite, setIsFavorite] = useState(job.isFavorite);
    const [showRawJobDescription, setShowRawJobDescription] = useState(false);

    return (
        <div className="bg-card flex flex-col gap-5 lg:gap-8 w-full rounded-lg p-4 border border-neutral-100">
            <div className="flex items-start justify-between">
                <div className="flex flex-col">
                    <span className="text-base lg:text-lg font-medium text-secondary-foreground">{job.title}</span>
                    <span className="text-xs lg:text-sm text-neutral-500">{job.company}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Button size="icon" variant="ghost" onClick={() => onEdit && onEdit(job.id)}>
                        <Pencil2Icon className="size-4" />
                    </Button>
                    <Button
                        size="icon"
                        variant="outline"
                        className="shadow-none border-primary/40 size-8"
                        onClick={() => setIsFavorite(!isFavorite)}
                    >
                        {isFavorite ? (
                            <HeartFilledIcon className="size-4 text-primary" />
                        ) : (
                            <HeartIcon className="size-4 text-primary" />
                        )}
                    </Button>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 lg:gap-3">
                {job.tags.map((tag, index) => (
                    <Badge key={`job-tags-${index}`} className="font-normal lg:text-[13px]" variant={tag.variant}>
                        {tag.name}
                    </Badge>
                ))}
            </div>

            <Separator className="bg-neutral-100 lg:-mt-2" />

            <div className="flex w-full items-center justify-between lg:-mt-4">
                <span className="text-neutral-500 text-xs">Posted on: {job.postedDate}</span>
                <div className="flex gap-2">
                    <Button variant="link" onClick={() => setShowRawJobDescription(!showRawJobDescription)}>
                        {showRawJobDescription ? "Hide" : "Show"} raw
                    </Button>
                    <Button size="sm">Apply</Button>
                </div>
            </div>

            {/* TODO: Should be handled in a better way */}

            {showRawJobDescription ? (
                <div className="p-4 bg-secondary/60 rounded-lg text-secondary-foreground text-sm">{job.rawText}</div>
            ) : null}
        </div>
    );
};

export default JobCard;
