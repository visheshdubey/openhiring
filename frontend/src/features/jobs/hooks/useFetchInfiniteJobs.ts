import { useInfiniteQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { PaginatedResponse } from "@/lib/api-client/types";
import { Job } from "../types";
import { QueryKey } from "@/lib/api-client/query-keys";
import { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";

interface UseFetchInfiniteJobsOptions {
    enabled?: boolean;
    pageSize?: number;
    filters?: {};
    debounceMs?: number;
}

interface UseFetchInfiniteJobsResult {
    data: {
        jobs: Job[];
        hasMore: boolean;
        total: number;
    } | undefined;
    error: Error | null;
    isError: boolean;
    isPending: boolean;
    isLoading: boolean;
    isFetching: boolean;
    isFetchingNextPage: boolean;
    hasNextPage: boolean;
    fetchNextPage: () => Promise<void>;
    refetch: () => Promise<void>;
    status: 'error' | 'pending' | 'success';
}

export function useFetchInfiniteJobs(options: UseFetchInfiniteJobsOptions = {}): UseFetchInfiniteJobsResult {
    const { enabled = true, pageSize = 10, filters, debounceMs = 150 } = options;
    const [debouncedFilters, setDebouncedFilters] = useState(filters);

    const debouncedUpdate = useCallback(
        debounce((newFilters) => {
            setDebouncedFilters(newFilters);
        }, debounceMs),
        [debounceMs]
    );

    useEffect(() => {
        debouncedUpdate(filters);

        return () => {
            debouncedUpdate.cancel();
        };
    }, [filters, debouncedUpdate]);

    const query = useInfiniteQuery({
        queryKey: [QueryKey.JOBS, debouncedFilters],
        queryFn: async ({ pageParam = "" }): Promise<PaginatedResponse<Job>> => {
            const response = (
                await apiClient.get({
                    path: "jobs",
                    params: {
                        cursor: pageParam,
                        limit: pageSize,
                        ...debouncedFilters,
                    },
                })
            ).json();

            return response;
        },
        initialPageParam: "",
        getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextCursor : undefined),
        enabled,
    });

    const transformedData = query.data
        ? {
            jobs: query.data.pages.flatMap((page) => page.data),
            hasMore: query.hasNextPage ?? false,
            total: query.data.pages[0].total,
        }
        : undefined;

    return {
        data: transformedData,
        error: query.error,
        isError: query.isError,
        isPending: query.isPending,
        isLoading: query.isLoading,
        isFetching: query.isFetching,
        isFetchingNextPage: query.isFetchingNextPage,
        hasNextPage: query.hasNextPage,
        fetchNextPage: async () => { await query.fetchNextPage(); },
        refetch: async () => { await query.refetch(); },
        status: query.status,
    };
}

// Example usage:
/*
function JobList() {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useFetchInfiniteJobs({ pageSize: 20 });

    if (status === 'pending') return <div>Loading...</div>;
    if (status === 'error') return <div>Error loading jobs</div>;

    return (
        <div>
            {data.pages.map((page, i) => (
                <React.Fragment key={i}>
                    {page.data.map((job) => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </React.Fragment>
            ))}
            
            {hasNextPage && (
                <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                >
                    {isFetchingNextPage ? 'Loading more...' : 'Load More'}
                </button>
            )}
        </div>
    );
}
*/
