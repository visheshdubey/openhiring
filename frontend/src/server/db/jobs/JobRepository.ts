import { Job } from "@prisma/client";
import prisma from "@/server/db/prisma";

type PaginatedResponse<T> = {
    data: T[];
    nextCursor: string | null;
    hasMore: boolean;
};

export const getJobList = async (take: number = 5, cursor?: string): Promise<PaginatedResponse<Job>> => {
    const items = await prisma.job.findMany({
        take: take + 1,
        ...(cursor
            ? {
                cursor: {
                    id: cursor,
                },
                skip: 1,
            }
            : {}),
        orderBy: {
            id: "asc",
        },
    });

    const hasMore = items.length > take;
    const data = hasMore ? items.slice(0, -1) : items;

    return {
        data,
        nextCursor: hasMore ? data[data.length - 1].id : null,
        hasMore,
    };
};

export const totalJobsInDB = async (): Promise<number> => await prisma.job.count();

export const getBookmarkedJobList = async (email: string) => {
    return await prisma.user.findUnique({
        where: {
            email,
        },
        select: {
            bookmarks: true,
        },
    });
};