import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";

import { Job } from "../types";
import { QueryKey } from "@/lib/api-client/query-keys";
import apiClient from "@/lib/api-client";

interface JobsResponse {
    data: Job[];
    // Add other pagination-related fields if needed
}

const bookmarkJobById = async (jobId: string): Promise<Job> => {
    const res = await apiClient.put({
        path: `/jobs/${jobId}/bookmark`,
    });
    return res.json();
};

export const useBookmarkJob = () => {
    const queryClient = useQueryClient();

    return useMutation<Job, Error, string, { previousJobs: InfiniteData<JobsResponse> | undefined }>({
        mutationFn: bookmarkJobById,

        onMutate: async (jobId) => {
            await queryClient.cancelQueries({ queryKey: [QueryKey.JOBS] });
            const previousJobs = queryClient.getQueryData<InfiniteData<JobsResponse>>([QueryKey.JOBS]);

            queryClient.setQueryData<InfiniteData<JobsResponse>>([QueryKey.JOBS], (old) => {
                if (!old) return old;

                const fn = (page: JobsResponse) => {
                    return page.data.map((job: Job) =>
                        job.id === jobId ? { ...job, isBookmarked: true } : job
                    );
                };

                return {
                    ...old,
                    pages: old.pages.map((page) => ({
                        ...page,
                        data: fn(page),
                    })),
                };
            });

            return { previousJobs };
        },

        onError: (err, jobId, context) => {
            if (context?.previousJobs) {
                queryClient.setQueryData([QueryKey.JOBS], context.previousJobs);
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKey.JOBS] });
        },
    });
};
