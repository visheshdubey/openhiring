"use client";

import { MultiSelectCheckbox, MultiSelectFilter } from "@/lib/components/ui/MultiSelectFilter";

import { FilterOptionType } from "@/lib/configs/job";
import JobFilterRow from "./JobFilterRow";
import { SliderWithTwoThumb } from "@/lib/components/ui/SliderWithTwoThumb";
import { useStore } from "@/store/store";

type Props = {
    filterOptions: FilterOptionType;
};

const JobFilters = ({ filterOptions }: Props) => {
    const { filters, updateFilter } = useStore((state) => state.jobs);
    return (
        <div className="w-3/12 hidden lg:block sticky h-fit top-24 max-h-[calc(100vh-56px-48px)] overflow-y-auto scrollbar-none shrink-0 bg-white rounded-lg shadow shadow-neutral-200/80 px-4 pt-4 pb-6">
            <span className="font-medium">Filters</span>
            <div className="flex flex-col gap-8 mt-6">
                <JobFilterRow label="Salary range">
                    <SliderWithTwoThumb
                        defaultValue={filters.salary}
                        min={filterOptions.salary.min}
                        max={filterOptions.salary.max}
                        step={filterOptions.salary.step}
                        onValueCommit={(value) => updateFilter("salary", value)}
                    />
                    <div className="flex justify-between">
                        <span className="text-xs text-neutral-600">${filters.salary[0]}K</span>
                        <span className="text-xs text-neutral-600">${filters.salary[1]}K</span>
                    </div>
                </JobFilterRow>

                <JobFilterRow label="Experience range">
                    <SliderWithTwoThumb
                        defaultValue={filters.experience}
                        min={filterOptions.experience.min}
                        max={filterOptions.experience.max}
                        step={filterOptions.experience.step}
                        onValueCommit={(value) => updateFilter("experience", value)}
                    />
                    <div className="flex justify-between">
                        <span className="text-xs text-neutral-600">{filters.experience[0]} Y</span>
                        <span className="text-xs text-neutral-600">{filters.experience[1]} Y</span>
                    </div>
                </JobFilterRow>

                <JobFilterRow label="Job work mode">
                    <MultiSelectFilter
                        className="flex flex-col gap-1.5"
                        onValueChange={(value) => updateFilter("jobWorkMode", value)}
                        defaultValue={filters.jobWorkMode}
                    >
                        {filterOptions.jobWorkMode.map((option) => (
                            <MultiSelectCheckbox key={option.id} option={option} className="text-sm" />
                        ))}
                    </MultiSelectFilter>
                </JobFilterRow>

                <JobFilterRow label="Technology">
                    <MultiSelectFilter
                        className="flex flex-col gap-1.5"
                        onValueChange={(value) => updateFilter("technology", value)}
                        defaultValue={filters.technology}
                    >
                        {filterOptions.technology.map((option) => (
                            <MultiSelectCheckbox key={option.id} option={option} className="text-sm" />
                        ))}
                    </MultiSelectFilter>
                </JobFilterRow>

                <JobFilterRow label="Show">
                    <MultiSelectFilter
                        className="flex flex-col gap-1.5"
                        onValueChange={(value) => updateFilter("showOptions", value)}
                        defaultValue={filters.showOptions}
                    >
                        {filterOptions.showOptions.map((option) => (
                            <MultiSelectCheckbox key={option.id} option={option} className="text-sm" />
                        ))}
                    </MultiSelectFilter>
                </JobFilterRow>

                <JobFilterRow label="Job Type">
                    <MultiSelectFilter
                        className="flex flex-col gap-1.5"
                        onValueChange={(value) => updateFilter("jobType", value)}
                        defaultValue={filters.jobType}
                    >
                        {filterOptions.jobType.map((option) => (
                            <MultiSelectCheckbox key={option.id} option={option} className="text-sm" />
                        ))}
                    </MultiSelectFilter>
                </JobFilterRow>
            </div>
        </div>
    );
};

export default JobFilters;
