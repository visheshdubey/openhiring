import { isEmpty, isNil } from "lodash";

import { Badge } from "@/lib/shadcn/ui/badge";
import { Job } from "../../types";

interface JobCardTagsProps {
    job: Job;
}

export const JobCardTags = ({ job }: JobCardTagsProps) => {
    const isMeaningfulValue = (value: string) => {
        return !(isNil(value) || isEmpty(value) || value === "undefined");
    };

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

    return (
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
    );
};
