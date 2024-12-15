import { useInfiniteQuery } from "@tanstack/react-query";
import { type UseInfiniteQueryResult } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { PaginatedResponse } from "@/lib/api-client/types";
import { Job } from "../types";
import { QueryKey } from "@/lib/api-client/query-keys";
import { useEffect, useState } from "react";
import { debounce } from "lodash";

interface UseFetchInfiniteJobsOptions {
    enabled?: boolean;
    pageSize?: number;
    filters?: {};
    debounceMs?: number;
}

interface UseFetchInfiniteJobsResult extends Omit<UseInfiniteQueryResult<PaginatedResponse<Job>, Error>, "data"> {
    data:
        | {
              jobs: Job[];
              hasMore: boolean;
              total: number;
          }
        | undefined;
}

export function useFetchInfiniteJobs(options: UseFetchInfiniteJobsOptions = {}): UseFetchInfiniteJobsResult {
    const { enabled = true, pageSize = 10, filters, debounceMs = 150 } = options;
    const [debouncedFilters, setDebouncedFilters] = useState(filters);

    // Basic debounce added
    useEffect(() => {
        const debouncedUpdate = debounce((newFilters) => {
            setDebouncedFilters(newFilters);
        }, debounceMs);

        debouncedUpdate(filters);

        return () => {
            debouncedUpdate.cancel();
        };
    }, [filters, debounceMs]);

    const query = useInfiniteQuery({
        // , pageSize, debouncedFilters
        queryKey: [QueryKey.JOBS],
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

    // Transform paginated data into flat array with hasMore flag
    const transformedData = query.data
        ? {
              jobs: query.data.pages.flatMap((page) => page.data),
              hasMore: query.hasNextPage ?? false,
              total: query.data.pages[0].total,
          }
        : undefined;

    return {
        ...query,
        data: transformedData,
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
