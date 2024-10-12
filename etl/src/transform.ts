// import { BunnyPath, TRANSFORM_INPUT_BATCH_SIZE } from "./config/constants";
// import { jobSchema, openai, prompt } from "./config/openai";

// import { cdn } from "./config/cdn";
// import { getUnixTime } from "date-fns";

// export const transformTask = async () => {
//     const files = await cdn.listFiles(BunnyPath.extractOutputDir())
//     const pickedFiles = files.slice(0, 1 || TRANSFORM_INPUT_BATCH_SIZE)

//     let processedFiles = []
//     let rawAndProcessedJobList = [];

//     for (const file of pickedFiles) {
//         try {
//             const fileContent = await cdn.readFile(BunnyPath.extractOutputDir(file.ObjectName))

//             for (const jsonJobItem of fileContent) {
//                 const jobItem = JSON.stringify(jsonJobItem)
//                 const transformedJsonJobItem = await openai.schemaBasedCompletion(jobItem, prompt, jobSchema)

//                 const rawAndProcessedJobItem = {
//                     raw: jobItem,
//                     proccessed: transformedJsonJobItem
//                 }

//                 rawAndProcessedJobList.push(rawAndProcessedJobItem)
//             }

//             processedFiles.push(file)
//         } catch (e) {
//             console.log('failed to process ', file.ObjectName);
//         }
//     }

//     const transformedJobListBuffer = Buffer.from(JSON.stringify(rawAndProcessedJobList))
//     const timestamp = getUnixTime(new Date());

//     await cdn.uploadFile(BunnyPath.transformOutputDir(`${timestamp}.json`), transformedJobListBuffer)

//     for (const file of processedFiles) {
//         await cdn.deleteFile(BunnyPath.extractOutputDir(file.ObjectName))
//     }

//     console.log('Transformation completed');

// }

import { BunnyPath, TRANSFORM_INPUT_BATCH_SIZE } from "./config/constants";
import { jobSchema, openai, prompt } from "./config/openai";

import { cdn } from "./config/cdn";
import { getUnixTime } from "date-fns";

const getFilesToProcess = async (batchSize: number) => {
    const files = await cdn.listFiles(BunnyPath.extractOutputDir());

    return files.slice(0, batchSize);
};

const processFile = async (file: any) => {
    try {
        const fileContent = await cdn.readFile(BunnyPath.extractOutputDir(file.ObjectName));

        console.info(`Processing file: ${file.ObjectName}`);

        return fileContent;
    } catch (error) {
        console.error(`Failed to process file: ${file.ObjectName}`, error);

        return [];
    }
};

const transformJobItem = async (jobItem: any) => {
    const stringifiedJobItem = JSON.stringify(jobItem);
    const transformedJobItem = await openai.schemaBasedCompletion(stringifiedJobItem, prompt, jobSchema);

    return {
        raw: stringifiedJobItem,
        processed: transformedJobItem
    };
};

const saveTransformedJobs = async (transformedJobs: any[]) => {
    const transformedJobsBuffer = Buffer.from(JSON.stringify(transformedJobs));
    const timestamp = getUnixTime(new Date());
    const outputPath = BunnyPath.transformOutputDir(`${timestamp}.json`);

    await cdn.uploadFile(outputPath, transformedJobsBuffer);

    console.info(`Saved transformed jobs to: ${outputPath}`);
};

const deleteProcessedFiles = async (files: any[]) => {
    for (const file of files) {
        await cdn.deleteFile(BunnyPath.extractOutputDir(file.ObjectName));

        console.info(`Deleted processed file: ${file.ObjectName}`);
    }
};

const processFileContent = async (fileContent: any) => {
    return Promise.all(fileContent.map(transformJobItem));
};

export const transformTask = async () => {
    try {
        const start_timestamp = getUnixTime(new Date());
        const filesToProcess = await getFilesToProcess(TRANSFORM_INPUT_BATCH_SIZE);

        console.info(`Starting transformation of ${filesToProcess.length} files`);

        const processedFiles = [];
        let transformedJobs: any[] = [];

        for (const file of filesToProcess) {
            const fileContent = await processFile(file);
            const fileTransformedJobs = await processFileContent(fileContent);

            transformedJobs = transformedJobs.concat(fileTransformedJobs);

            processedFiles.push(file);
        }

        await saveTransformedJobs(transformedJobs);
        await deleteProcessedFiles(processedFiles);

        const end_timestamp = getUnixTime(new Date());
        console.info(`Transformation completed successfully: ${transformedJobs.length} Items, Time Taken: ${end_timestamp - start_timestamp}ms`);
    } catch (error) {
        console.error('Error during transformation task', error);
    }
};
