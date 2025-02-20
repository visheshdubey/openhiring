import { getJobById, updateJobById } from "@/server/db/jobs/JobRepository";

import { NextRequest } from "next/server";
import { getAuthSession } from "@/features/auth/utils";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ jobId: string }> }) => {
    const job = await getJobById((await params).jobId);

    return Response.json(job);
};

export const PUT = async (req: Request, { params }: { params: Promise<{ jobId: string }> }) => {
    const session = await getAuthSession();
    const body = await req.json(); // Parse JSON body from the request
    console.log("Request Body:", body);

    const userAfterAddingBookmarkedJob = await updateJobById((await params).jobId, body);

    return Response.json(userAfterAddingBookmarkedJob);
};
