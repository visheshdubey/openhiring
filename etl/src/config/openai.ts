import OpenAIClient, { PromptArray } from "../clients/OpenAIClient";

import { env } from "./env";
import { z } from "zod";

export const openai = OpenAIClient.getInstance(env.OPENAI_KEY, 'gpt-4o-mini')

const instruction = ` Please extract the following information from the given job posting text. If a piece of information is not available or cannot be determined, use "undefined" as the value. Return the data in a JSON format with the following structure:

{
  "company": String or undefined,
  "jobTitle": String or undefined,
  "minSalary": If a salary range is not present add salary number here, else add minimum salary, 
  "maxSalary": If a salary range is present add maximum salary,
  "salaryRange": [Number, Number] or [], First element is lower range, second higher. If there is only one element then it is the actual salary.
  "salaryCurrency": String or undefined,
  "jobType": "FullTime" | "PartTime" | "Contract" | "Freelance" | undefined,
  "jobWorkMode": "Remote" | "OnSite" | "Hybrid" | undefined,
  "location": String or undefined,
  "applyEmails": [String] or [],
  "applyLinks": [String] or [],
  "technology": [String] or [],
  "technologyDomain":  "WebDevelopment" | "BackendDevelopment" | "FrontendDevelopment" | "Web3_Blockchain" | "GameDevelopment"
  "seekingWork": Boolean
  "minExperience": If a experience year range is not present add experience number here, else add minimum experience, 
  "maxExperience": If a experience year range is present add maximum experience,
  "tags": [String] or []
}

Notes:
- For jobType and jobWorkMode, use the exact values provided in the structure.
- For arrays (applyEmails, applyLinks, technology, tags), if only one value is found, still use an array format.
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
    minSalary: z.number().optional(),
    maxSalary: z.number().optional(),
    salaryCurrency: z.string().optional(),
    jobType: z.enum(["FullTime", "PartTime", "Contract", "Freelance"]).optional(),
    jobWorkMode: z.enum(["Remote", "OnSite", "Hybrid"]).optional(),
    location: z.string().optional(),
    applyEmails: z.array(z.string()).optional(),
    applyLinks: z.array(z.string()).optional(),
    technology: z.array(z.string()).optional(),
    technologyDomain: z.enum([
        "WebDevelopment",
        "BackendDevelopment",
        "FrontendDevelopment",
        "Web3_Blockchain",
        "GameDevelopment"]).optional(),
    seekingWork: z.boolean(),
    minExperience: z.number().optional(),
    maxExperience: z.number().optional(),
    tags: z.array(z.string()).optional(),
});

