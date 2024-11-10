import { JobRes } from '../api-client/types/jobs.types';
import { fetchJobs } from '../api-client/api-client';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useInfiniteFetchJobs = (pageSize: number = 10) => {
    const query = useInfiniteQuery<JobRes>({
        queryKey: ['jobs'],
        queryFn: ({ pageParam = null }) => fetchJobs(pageSize, pageParam as string | null),
        initialPageParam: null,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        select: (data) => ({
            pages: data.pages,
            pageParams: data.pageParams,
            jobs: data.pages.flatMap(page => page.items),
            hasNextPage: data.pages[data.pages.length - 1].hasMore
        })
    });

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
        error
    } = query;

    return {
        jobs: data?.jobs ?? [],
        fetchNextPage,
        hasNextPage: !!hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
        error
    };
};