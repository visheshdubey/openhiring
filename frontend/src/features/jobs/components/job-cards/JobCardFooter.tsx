import { Button } from "@/lib/shadcn/ui/button";
import { format } from "date-fns";

interface JobCardFooterProps {
    createdAt: Date;
    showRawJobDescription: boolean;
    hasApplyLinks: boolean;
    onToggleDescription: () => void;
    onApply: () => void;
}

export const JobCardFooter = ({ createdAt, showRawJobDescription, hasApplyLinks, onToggleDescription, onApply }: JobCardFooterProps) => {
    const formatDate = (value: any) => format(new Date(value), "MMM d, yyyy");

    return (
        <div className="flex w-full items-center justify-between">
            <span className="text-neutral-500 text-xs">Posted on: {formatDate(createdAt)}</span>
            <div className="flex gap-2">
                <Button variant="link" onClick={onToggleDescription}>
                    {showRawJobDescription ? "Hide" : "Show"} original
                </Button>
                {hasApplyLinks && (
                    <Button size="sm" onClick={onApply}>
                        Apply
                    </Button>
                )}
            </div>
        </div>
    );
};
