import OpenAIClient, { PromptArray } from "../clients/OpenAIClient";

import { env } from "./env";
import { z } from "zod";

export const openai = OpenAIClient.getInstance(env.OPENAI_KEY, 'gpt-4o-mini')

const instruction = ` Please extract the following information from the given job posting text. If a piece of information is not available or cannot be determined, use "undefined" as the value. Return the data in a JSON format with the following structure:

{
  "company": String or undefined,
  "jobTitle": String or undefined,
  "salaryRange": [Number, Number] or [], First element is lower range, second higher. If there is only one element then it is the actual salary.
  "salaryCurrency": String or undefined,
  "jobType": "FullTime" | "PartTime" | "Contract" | "Freelance" | undefined,
  "jobWorkMode": "Remote" | "OnSite" | "Hybrid" | undefined,
  "location": String or undefined,
  "applyEmails": [String] or [],
  "applyLinks": [String] or [],
  "technology": [String] or [],
  "seekingWork": Boolean
  "experienceRange": [Number, Number] or [], It is a range
  "tags": [String] or []
}

Notes:
- For salaryRange and experienceRange, use [min, max] format.
- For jobType and jobWorkMode, use the exact values provided in the structure.
- For arrays (salaryRange, applyEmails, applyLinks, technology, experienceRange, tags), if only one value is found, still use an array format.
- Extract any relevant technologies, programming languages, or tools mentioned in the posting for the "technology" field.
- Use "tags" for any additional keywords or categories that describe the job or required skills.

Please provide the extracted information in JSON format for the given job posting.`

export const prompt: PromptArray[] = [
    { role: 'system', content: 'You are a helpful data analyst designed to analyze Job Data and output in JSON.' },
    { role: 'user', content: instruction },
]

export const jobSchema = z.object({
    company: z.string().optional(),
    jobTitle: z.string().optional(),
    salaryRange: z
        .array(z.number())
        .optional(),
    salaryCurrency: z.string().optional(),
    jobType: z.enum(["FullTime", "PartTime", "Contract", "Freelance"]).optional(),
    jobWorkMode: z.enum(["Remote", "OnSite", "Hybrid"]).optional(),
    location: z.string().optional(),
    applyEmails: z.array(z.string()).optional(),
    applyLinks: z.array(z.string()).optional(),
    technology: z.array(z.string()).optional(),
    seekingWork: z.boolean(),
    experienceRange: z
        .array(z.number())
        .optional(),
    tags: z.array(z.string()).optional(),
});

