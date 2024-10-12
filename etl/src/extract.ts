import { BunnyPath } from "./config/constants"
import { cdn } from "./config/cdn"
import { getUnixTime } from "date-fns"
import { hn } from "./config/hackernews"

export const extractTask = async () => {
    console.log('Fetching jobs from HN in batches');

    const jobs = await hn.getJobsInBatches(10)

    console.log(`Found ${jobs.length} batches.`);

    const timestamp = getUnixTime(new Date());

    for (let i = 0; i < jobs.length; i++) {
        const jobString = JSON.stringify(jobs[i]);
        const jobBuffer = Buffer.from(jobString);

        await cdn.uploadFile(BunnyPath.extractOutputDir(`${timestamp}+${i}.json`), jobBuffer)

        console.log(`Uploading batch number: ${i} batch.`);
    }

    if (jobs.length) {
        console.log(`Processed all batches.`);
    }
} 