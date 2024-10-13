import { BunnyPath, LOAD_INPUT_BATCH_SIZE } from "./config/constants";

import { FileListItem } from "./clients/BunnyCDNClient";
import { TransformedJobs } from "./types/jobs";
import { cdn } from "./config/cdn";
import { db } from "./config/db";
import { getUnixTime } from "date-fns";

const getFilesToLoad = async (batchSize: number) => {
    const files = await cdn.listFiles(BunnyPath.transformOutputDir());

    return files.slice(0, batchSize);
};


const readFileContent = async (file: FileListItem) => {
    try {
        const content = await cdn.readFile(BunnyPath.transformOutputDir(file.ObjectName));

        console.info(`Reading file: ${file.ObjectName}`);

        return content
    } catch (error) {
        console.error(`Failed to read file: ${file.ObjectName}`, error);

        return [];
    }
};

//TODO: Use Promise.all
const insertDataIntoDB = async (data: TransformedJobs[]) => {
    try {
        for (const job of data) {
            await db.insertJob({ raw: JSON.stringify(job.raw), ...job.processed })
        }

        console.info(`Inserted ${data.length} records into the database`);
    } catch (error) {
        console.error('Error inserting data into database', error);
    }
};

//TODO: Use Promise.all
const deleteLoadedFiles = async (files: any[]) => {
    for (const file of files) {
        await cdn.deleteFile(BunnyPath.transformOutputDir(file.ObjectName));

        console.info(`Deleted loaded file: ${file.ObjectName}`);
    }
};

export const loadTask = async () => {
    try {
        const start_timestamp = getUnixTime(new Date());
        const filesToLoad = await getFilesToLoad(LOAD_INPUT_BATCH_SIZE);

        console.info(`Starting load of ${filesToLoad.length} files`);

        const loadedFiles = [];

        for (const file of filesToLoad) {
            const fileContent = await readFileContent(file);

            if (fileContent.length > 0) {
                await insertDataIntoDB(fileContent);
            }

            loadedFiles.push(file);
        }

        // await deleteLoadedFiles(loadedFiles);

        const end_timestamp = getUnixTime(new Date());

        console.info(`Load completed successfully: Time Taken: ${end_timestamp - start_timestamp}ms`);
    } catch (error) {
        console.error('Error during load task', error);
    }
};
