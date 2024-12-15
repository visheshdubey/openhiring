import { Job } from "@/features/jobs/types";
import apiClient from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

const fetchJobDetailsById = async (jobId: string): Promise<Job> => {
    const res = await apiClient.get({
        path: `jobs/${jobId}`,
    });
    return await res.json();
};

export const useFetchJobDetailsById = (jobId: string) => {
    return useQuery<Job, Error>({
        queryKey: ["jobDetails", jobId],
        queryFn: () => fetchJobDetailsById(jobId),
        enabled: Boolean(jobId),
    });
};
