import 'dotenv/config';

import { extractTask } from "./extract";

// cron.schedule(env.EXTRACT_CRON, async () => {
//     console.log("Running Extract process...");
//     await extractTask();

// });

// console.log("Extract process started ...");

// cron.schedule(env.TRANSFORM_CRON, async () => {
//     console.log("Running Transform process...");
//     await transformTask();

// });

// console.log("Transform process started ...");

// cron.schedule(env.LOAD_CRON, async () => {
//     console.log("Running Load process...");
//     await loadTask();

// });

// console.log("Load process started ...");

extractTask();