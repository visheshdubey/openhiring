"use client";

import { useParams } from "next/navigation";

import JobEditPageContainer from "@/features/jobs/components/admin/JobEditPageContainer";

type Props = {};

const JobAdmin = (props: Props) => {
    const params = useParams<{ jobId: string }>();
    return <JobEditPageContainer jobId={params.jobId} />;
};

export default JobAdmin;
