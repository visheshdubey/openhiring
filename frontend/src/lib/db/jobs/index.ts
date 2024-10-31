import { Job } from "@prisma/client";
import prisma from '@/server/db/prisma';

type PaginatedResponse<T> = {
    items: T[];
    nextCursor: string | null;
    hasMore: boolean;
}

export const getJobList = async (
    take: number = 5,
    cursor?: string
): Promise<PaginatedResponse<Job>> => {
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
            id: 'asc',
        },
    });

    const hasMore = items.length > take;
    const data = hasMore ? items.slice(0, -1) : items;

    return {
        items: data,
        nextCursor: hasMore ? data[data.length - 1].id : null,
        hasMore,
    };
};

// Example usage:
// First page
// const firstPage = await getJobList(10);

// Next page using cursor
// const nextPage = await getJobList(10, firstPage.nextCursor);