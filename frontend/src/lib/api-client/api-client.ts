import { JobRes } from "./types/jobs.types";

const BASE_URL = 'http://localhost:3000/api/'

export const fetchJobs = async (): Promise<JobRes> => {
    return (await fetch(`${BASE_URL}jobs`)).json();
};