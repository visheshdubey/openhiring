import { Prisma } from ".prisma/client";
import db from "@/db/prisma";

export const createRawJob = async (data: Prisma.RawJobCreateInput) => {
    return await db.rawJob.create({
        data,
    });
};

export const createProcessedJob = async (data: Prisma.ProcessedJobCreateInput) => {
    return await db.processedJob.create({
        data,
    });
};
