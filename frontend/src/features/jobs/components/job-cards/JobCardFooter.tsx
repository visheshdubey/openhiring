import { Button } from "@/lib/shadcn/ui/button";
import { JobCardApplyDrawer } from "./JobCardApplyDrawer";
import { Separator } from "@/lib/shadcn/ui/separator";
import { cn } from "@/lib/shadcn/utils";
import { format } from "date-fns";

interface JobCardFooterProps {
    createdAt: Date;
    showRawJobDescription: boolean;
    hasApplyLinks: boolean;
    onToggleDescription: () => void;
    className?: string;
    applyLinks: string[];
    applyEmails: string[];
}

export const JobCardFooterDesktop = ({
    createdAt,
    showRawJobDescription,
    hasApplyLinks,
    onToggleDescription,
    className,
    applyLinks,
    applyEmails,
}: JobCardFooterProps) => {
    const formatDate = (value: any) => format(new Date(value), "MMM d, yyyy");

    return (
        <div className={cn("flex w-full items-center justify-between", className)}>
            <span className="text-neutral-500 text-xs">Posted on: {formatDate(createdAt)}</span>
            <div className="flex gap-2">
                <Button variant="link" onClick={onToggleDescription}>
                    {showRawJobDescription ? "Hide" : "Show"} original
                </Button>
                {hasApplyLinks && (
                    <JobCardApplyDrawer links={applyLinks} emails={applyEmails}>
                        <Button size="sm">Apply</Button>
                    </JobCardApplyDrawer>
                )}
            </div>
        </div>
    );
};

export const JobCardFooterMobile = ({
    createdAt,
    showRawJobDescription,
    hasApplyLinks,
    onToggleDescription,
    className,
    applyLinks,
    applyEmails,
}: JobCardFooterProps) => {
    const formatDate = (value: any) => format(new Date(value), "MMM d, yyyy");

    return (
        <div className={cn("flex w-full flex-col items-center justify-between", className)}>
            <div className="flex gap-2 w-full items-center justify-between">
                <Button variant="link" className="p-0" onClick={onToggleDescription}>
                    {showRawJobDescription ? "Hide" : "Show"} original
                </Button>
                {hasApplyLinks && (
                    <JobCardApplyDrawer links={applyLinks} emails={applyEmails}>
                        <Button size="sm">Apply</Button>
                    </JobCardApplyDrawer>
                )}
            </div>
            <Separator className="bg-neutral-100 w-full my-2" />
            <span className="text-neutral-500 text-xs py-0.5 mr-auto">Posted on: {formatDate(createdAt)}</span>
        </div>
    );
};
