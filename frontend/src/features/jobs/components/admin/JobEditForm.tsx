"use client";

import * as z from "zod";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/lib/shadcn/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/lib/shadcn/components/ui/select";

import { Button } from "@/lib/shadcn/components/ui/button";
import { Checkbox } from "@/lib/shadcn/components/ui/checkbox";
import { Input } from "@/lib/shadcn/components/ui/input";
import { Textarea } from "@/lib/shadcn/components/ui/textarea";
import { useEffect } from "react";
import { useFetchJobDetailsById } from "./hooks/useFetchJobDetailsById";
import { useForm } from "react-hook-form";
import { useUpdateJobDetailsById } from "./hooks/useUpdateJobDetailsById";
import { zodResolver } from "@hookform/resolvers/zod";

const jobSchema = z
    .object({
        company: z.string().nonempty("Company name is required").optional(),
        jobTitle: z.string().nonempty("Job title is required").optional(),
        minSalary: z.number().min(0, "Minimum salary must be a positive number").optional(),
        maxSalary: z.number().optional(),
        // .refine((val, ctx) => val == null || val >= ctx.parent.minSalary, {
        //     message: "Maximum salary must be equal to or greater than minimum salary",
        // }),
        salaryCurrency: z.string().nonempty("Currency is required").optional(),
        jobType: z.enum(["FullTime", "PartTime", "Contract", "Freelance"]).optional(),
        jobWorkMode: z.enum(["Remote", "OnSite", "Hybrid"]).optional(),
        location: z.string().nonempty("Location is required").optional(),
        applyEmails: z.array(z.string().email("Invalid email format")).optional(), //.nonempty(),
        applyLinks: z.array(z.string().url("Invalid URL format")).optional(), //.nonempty(),
        technology: z.array(z.string()).optional(),
        technologyDomain: z
            .enum(["WebDevelopment", "BackendDevelopment", "FrontendDevelopment", "Web3_Blockchain", "GameDevelopment"])
            .optional(),
        seekingWork: z.boolean({
            required_error: "Seeking work is required",
        }),
        minExperience: z.number().min(0, "Minimum experience must be a positive number").optional(),
        maxExperience: z.number().optional(),
        // .refine((val, ctx) => val == null || val >= ctx.parent.minExperience, {
        //     message: "Maximum experience must be equal to or greater than minimum experience",
        // }),
        tags: z.array(z.string()).optional(), //.nonempty(),
    })
    .refine((data) => !data.minSalary || !data.maxSalary || data.maxSalary >= data.minSalary, {
        message: "Maximum salary must be equal to or greater than minimum salary",
        path: ["maxSalary"],
    })
    .refine((data) => !data.minExperience || !data.maxExperience || data.maxExperience >= data.minExperience, {
        message: "Maximum experience must be equal to or greater than minimum experience",
        path: ["maxExperience"],
    });

export default function JobEditForm({ jobId }: { jobId: string }) {
    const { data, isLoading } = useFetchJobDetailsById(jobId);
    const { data: submitData, mutateAsync } = useUpdateJobDetailsById();
    console.log(data);

    const form = useForm<z.infer<typeof jobSchema>>({
        resolver: zodResolver(jobSchema),
        defaultValues: {
            seekingWork: false,
            applyEmails: [""],
            applyLinks: [""],
            technology: [""],
            tags: [""],
        },
    });

    useEffect(() => {
        if (data) {
            form.setValue("company", data.company);
            form.setValue("jobTitle", data.jobTitle);
            form.setValue("minSalary", Number(data.minSalary));
            form.setValue("maxSalary", Number(data.maxSalary));
            form.setValue("salaryCurrency", data.salaryCurrency);
            form.setValue("jobType", data.jobType);
            form.setValue("jobWorkMode", data.jobWorkMode);
            form.setValue("location", data.location);
            form.setValue("applyEmails", data.applyEmails);
            form.setValue("applyLinks", data.applyLinks);
            form.setValue("technology", data.technology);
            form.setValue("technologyDomain", data.technologyDomain);
            form.setValue("seekingWork", data.seekingWork);
            form.setValue("minExperience", Number(data.minExperience));
            form.setValue("maxExperience", Number(data.maxExperience));
            form.setValue("tags", data.tags);
        }
    }, [data]);

    async function onSubmit(values: z.infer<typeof jobSchema>) {
        await mutateAsync(
            { jobId, body: values },
            {
                onSuccess: (data) => {
                    console.log("Job updated successfully:", values);
                },
                onError: (error) => {
                    console.error("Error updating job:", error);
                },
            },
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter company name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="jobTitle"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Job Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter job title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <FormField
                        control={form.control}
                        name="minSalary"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Minimum Salary</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Enter minimum salary"
                                        {...field}
                                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="maxSalary"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Maximum Salary</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Enter maximum salary"
                                        {...field}
                                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="salaryCurrency"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Currency</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter currency" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="jobType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Job Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select job type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="FullTime">Full Time</SelectItem>
                                    <SelectItem value="PartTime">Part Time</SelectItem>
                                    <SelectItem value="Contract">Contract</SelectItem>
                                    <SelectItem value="Freelance">Freelance</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="jobWorkMode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Work Mode</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select work mode" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Remote">Remote</SelectItem>
                                    <SelectItem value="OnSite">On Site</SelectItem>
                                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter location" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="applyEmails"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Apply Emails</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter email addresses (one per line)"
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.value.split("\n"))}
                                    value={field.value?.join("\n")}
                                />
                            </FormControl>
                            <FormDescription>Enter one email address per line</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="applyLinks"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Apply Links</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter application URLs (one per line)"
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.value.split("\n"))}
                                    value={field.value?.join("\n")}
                                />
                            </FormControl>
                            <FormDescription>Enter one URL per line</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="technology"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Technologies</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter technologies (one per line)"
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.value.split("\n"))}
                                    value={field.value?.join("\n")}
                                />
                            </FormControl>
                            <FormDescription>Enter one technology per line</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="technologyDomain"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Technology Domain</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select technology domain" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="WebDevelopment">Web Development</SelectItem>
                                    <SelectItem value="BackendDevelopment">Backend Development</SelectItem>
                                    <SelectItem value="FrontendDevelopment">Frontend Development</SelectItem>
                                    <SelectItem value="Web3_Blockchain">Web3 / Blockchain</SelectItem>
                                    <SelectItem value="GameDevelopment">Game Development</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="seekingWork"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>Seeking Work</FormLabel>
                                <FormDescription>Check this if you are currently seeking work</FormDescription>
                            </div>
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="minExperience"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Minimum Experience (years)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Enter minimum experience"
                                        {...field}
                                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="maxExperience"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Maximum Experience (years)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Enter maximum experience"
                                        {...field}
                                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tags</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter tags (one per line)"
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.value.split("\n"))}
                                    value={field.value?.join("\n")}
                                />
                            </FormControl>
                            <FormDescription>Enter one tag per line</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {data && (
                    <div
                        className="p-4 bg-secondary/60 w-full overflow-x-auto rounded-lg text-secondary-foreground text-sm"
                        dangerouslySetInnerHTML={{ __html: JSON.parse(data.raw).html }}
                    ></div>
                )}

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
