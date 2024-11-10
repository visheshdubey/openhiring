import { NextApiRequest } from "next";
import { addJobToMyBookMarkList } from "@/server/db/jobs/JobRepository";
import { getAuthSession } from "@/features/auth/utils";

export const PUT = async (req: NextApiRequest, { params }: { params: Promise<{ jobId: string }> }) => {
    const session = await getAuthSession();
    const userAfterAddingBookmarkedJob = await addJobToMyBookMarkList(session?.user.id, (await params).jobId)

    return Response.json(userAfterAddingBookmarkedJob)
}