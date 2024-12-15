// import { Job } from "@/features/jobs/types";
// import apiClient from "@/lib/api-client";
// import { useMutation } from "@tanstack/react-query";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Job } from "../types";
import { QueryKey } from "@/lib/api-client/query-keys";
import apiClient from "@/lib/api-client";

const bookmarkJobById = async (jobId: string): Promise<Job> => {
    const res = await apiClient.put({
        path: `jobs/bookmark/${jobId}`,
    });
    return res.json();
};

// export const useUpdateJobDetailsById = () => {
//     return useMutation<Job, Error, { jobId: string; body: Job }>({
//         mutationFn: ({ jobId, body }) => updateJobDetailsById(jobId, body),
//     });
// };

export const useBookmarkJob = () => {
    const queryClient = useQueryClient();

    return useMutation<any, Error, string, { previousJobs: Job | undefined }>({
        mutationFn: (jobId: string) => bookmarkJobById(jobId),

        onMutate: async (jobId) => {
            await queryClient.cancelQueries({ queryKey: [QueryKey.JOBS] });
            const previousJobs = queryClient.getQueryData<Job>([QueryKey.JOBS]);

            queryClient.setQueryData<Job>([QueryKey.JOBS], (old) => {
                if (!old) return old;

                const fn = (page) => {
                    const x = page.data.map((job) => {
                        console.log(job.id === jobId);

                        return job.id === jobId ? { ...job, isBookmarked: true } : job;
                    });

                    return x;
                };

                return {
                    ...old,
                    pages: old.pages.map((page) => ({
                        ...page,
                        data: fn(page),
                    })),
                };
            });
            return undefined;
            return { previousJobs };
        },

        onError: (err, jobId, context) => {
            if (context?.previousJobs) {
                // queryClient.setQueryData<Job>(["jobs"], context.previousJobs);
            }
        },

        onSettled: () => {
            // queryClient.invalidateQueries({ queryKey: ["jobs"] });
        },
    });
};
