import { JobCardFooterDesktop, JobCardFooterMobile } from "./JobCardFooter";
import { memo, useCallback, useState } from "react";

import { Job } from "../../types";
import JobCardExperienceRange from "./JobCardRangeFieldExperience";
import { JobCardHeader } from "./JobCardHeader";
import JobCardRangeFieldSalary from "./JobCardRangeFieldSalary";
import { JobCardTags } from "./JobCardTags";
import { Separator } from "@/lib/shadcn/ui/separator";
import { isEmpty } from "lodash";
import { useSession } from "next-auth/react";

export interface JobCardProps {
    job: Job;
    onEdit: (jobId: string) => void;
    onBookmark: (jobId: string) => void;
}

const JobCard = memo(({ job, onEdit, onBookmark }: JobCardProps) => {
    const [isFavorite, setIsFavorite] = useState(!isEmpty(job.UserJobBookMarks));
    const [showRawJobDescription, setShowRawJobDescription] = useState(false);
    const { data: session } = useSession();

    const handleEdit = useCallback(() => onEdit(job.id), [job.id, onEdit]);
    const handleBookmark = useCallback(() => {
        onBookmark(job.id);
        setIsFavorite((prev) => !prev);
    }, [job.id, onBookmark]);
    const toggleDescription = useCallback(() => setShowRawJobDescription((prev) => !prev), []);

    const hasApplyLinks = job.applyLinks.length > 0;

    return (
        <div className="bg-card hover:shadow-sm shadow-neutral-200/80 flex flex-col gap-5 lg:gap-4 w-full bg-white rounded-lg p-4 lg:p-6 border border-neutral-200/70">
            <JobCardHeader
                job={job}
                isFavorite={isFavorite}
                isAdmin={session?.user.isAdmin ?? false}
                onEdit={handleEdit}
                onBookmark={handleBookmark}
            />
            <JobCardTags job={job} />
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
            <JobCardFooterDesktop
                createdAt={job.createdAt}
                showRawJobDescription={showRawJobDescription}
                hasApplyLinks={hasApplyLinks}
                onToggleDescription={toggleDescription}
                className="hidden lg:flex"
                applyLinks={job.applyLinks}
                applyEmails={job.applyEmails}
            />
            <JobCardFooterMobile
                createdAt={job.createdAt}
                showRawJobDescription={showRawJobDescription}
                hasApplyLinks={hasApplyLinks}
                onToggleDescription={toggleDescription}
                className="lg:hidden"
                applyLinks={job.applyLinks}
                applyEmails={job.applyEmails}
            />
            {showRawJobDescription && (
                <div
                    className="p-4 bg-secondary/60 rounded-lg text-secondary-foreground text-sm"
                    dangerouslySetInnerHTML={{ __html: JSON.parse(job.raw).html }}
                ></div>
            )}
        </div>
    );
});

export default JobCard;
