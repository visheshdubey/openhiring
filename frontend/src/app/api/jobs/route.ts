import { NextApiRequest, NextApiResponse } from "next";

import { getJobList } from "@/server/db/jobs/JobRepository";

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    // const session = await getAuthSession()
    // const reqQueryObj = new URL(req.url || '')
    // console.log(queryStringToObject(reqQueryObj.search)?.salary?.split(',').map(item => Number(item)));

    const jobs = await getJobList()

    return Response.json(jobs)
}