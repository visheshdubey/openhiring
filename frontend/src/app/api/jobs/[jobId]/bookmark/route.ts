import { NextApiRequest } from "next";
import { getAuthSession } from "@/features/auth/utils";
import { addJobToMyBookMarkList as toggleBookmark } from "@/server/db/jobs/JobRepository";

export const PUT = async (req: NextApiRequest, { params }: { params: Promise<{ jobId: string }> }) => {
    const session = await getAuthSession();
    const userAfterAddingBookmarkedJob = await toggleBookmark(session?.user.id, (await params).jobId);

    return Response.json(userAfterAddingBookmarkedJob);
};