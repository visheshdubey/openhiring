import { NextRequest } from "next/server";
import { getAuthSession } from "@/features/auth/utils";
import { getJobList } from "@/server/db/jobs/JobRepository";
import { queryStringToObject } from "@/lib/utils";

export const GET = async (req: NextRequest) => {
    const session = await getAuthSession();
    const reqQueryObj = new URL(req.url || "");
    const searchQueryParams = queryStringToObject(reqQueryObj.search, { arrayFormat: "comma" });
    const jobs = await getJobList(undefined, searchQueryParams, session?.user.id);

    return Response.json(jobs)
}