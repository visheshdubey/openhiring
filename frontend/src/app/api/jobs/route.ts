import { getJobList } from "@/lib/db/jobs"

export const GET = async () => {
    const jobs = await getJobList()

    return Response.json({ data: jobs })
}