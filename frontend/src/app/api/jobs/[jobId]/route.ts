import { getJobById, updateJobById } from "@/server/db/jobs/JobRepository";

import { NextApiRequest } from "next";
import { getAuthSession } from "@/features/auth/utils";

/** 
export const PUT = async (req: NextApiRequest, { params }: { params: Promise<{ jobId: string }> }) => {
    const session = await getAuthSession();
    const userAfterAddingBookmarkedJob = await addJobToMyBookMarkList(session?.user.id, (await params).jobId);

    return Response.json(userAfterAddingBookmarkedJob);
};
*/

export const GET = async (req: NextApiRequest, { params }: { params: Promise<{ jobId: string }> }) => {
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
