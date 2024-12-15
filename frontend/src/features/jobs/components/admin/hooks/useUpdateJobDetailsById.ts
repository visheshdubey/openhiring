import { Job } from "@/features/jobs/types";
import apiClient from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

const updateJobDetailsById = async (jobId: string, body: Job): Promise<Job> => {
    const res = await apiClient.put({
        path: `jobs/${jobId}`,
        data: body,
    });
    return res.json();
};

export const useUpdateJobDetailsById = () => {
    return useMutation<Job, Error, { jobId: string; body: Job }>({
        mutationFn: ({ jobId, body }) => updateJobDetailsById(jobId, body),
    });
};
