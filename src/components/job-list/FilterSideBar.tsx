"use client";

import { MultiSelectCheckbox, MultiSelectFilter } from "./MultiSelectFilter";

import { FilterOptionType } from "@/src/entities/constants/job";
import FilterWrapper from "./FilterWrapper";
import { SliderWithTwoThumb } from "../SliderWithTwoThumb";
import { useStore } from "@/src/store/store";

type Props = {
    filterOptions: FilterOptionType;
};

const FilterSideBar = ({ filterOptions }: Props) => {
    const { filters, updateMultiSelectFilter, updateRangeFilter } = useStore((state) => state.jobs);
    return (
        <div className="w-3/12 hidden lg:block sticky h-fit top-24 max-h-[calc(100vh-56px-48px)] overflow-y-auto scrollbar-none shrink-0 bg-white rounded-lg shadow shadow-neutral-200/80 px-4 pt-4 pb-6">
            <span className="font-medium">Filters</span>
            <div className="flex flex-col gap-8 mt-6">
                <FilterWrapper label="Salary range">
                    <SliderWithTwoThumb
                        defaultValue={filters.salary}
                        min={filterOptions.salary.min}
                        max={filterOptions.salary.max}
                        step={filterOptions.salary.step}
                        onValueCommit={(value) => updateRangeFilter("salary", value)}
                    />
                    <div className="flex justify-between">
                        <span className="text-xs text-neutral-600">${filters.salary[0]}K</span>
                        <span className="text-xs text-neutral-600">${filters.salary[1]}K</span>
                    </div>
                </FilterWrapper>

                <FilterWrapper label="Experience range">
                    <SliderWithTwoThumb
                        defaultValue={filters.experience}
                        min={filterOptions.experience.min}
                        max={filterOptions.experience.max}
                        step={filterOptions.experience.step}
                        onValueCommit={(value) => updateRangeFilter("experience", value)}
                    />
                    <div className="flex justify-between">
                        <span className="text-xs text-neutral-600">{filters.experience[0]} Y</span>
                        <span className="text-xs text-neutral-600">{filters.experience[1]} Y</span>
                    </div>
                </FilterWrapper>

                <FilterWrapper label="Work Location">
                    <MultiSelectFilter
                        className="flex flex-col gap-1.5"
                        onValueChange={(value) => updateMultiSelectFilter("workLocation", value)}
                        defaultValue={filters.workLocation}
                    >
                        {filterOptions.workLocation.map((option) => (
                            <MultiSelectCheckbox key={option.id} option={option} className="text-sm" />
                        ))}
                    </MultiSelectFilter>
                </FilterWrapper>

                <FilterWrapper label="Technology">
                    <MultiSelectFilter
                        className="flex flex-col gap-1.5"
                        onValueChange={(value) => updateMultiSelectFilter("technology", value)}
                        defaultValue={filters.technology}
                    >
                        {filterOptions.technology.map((option) => (
                            <MultiSelectCheckbox key={option.id} option={option} className="text-sm" />
                        ))}
                    </MultiSelectFilter>
                </FilterWrapper>

                <FilterWrapper label="Show">
                    <MultiSelectFilter
                        className="flex flex-col gap-1.5"
                        onValueChange={(value) => updateMultiSelectFilter("showOptions", value)}
                        defaultValue={filters.jobType}
                    >
                        {filterOptions.showOptions.map((option) => (
                            <MultiSelectCheckbox key={option.id} option={option} className="text-sm" />
                        ))}
                    </MultiSelectFilter>
                </FilterWrapper>

                <FilterWrapper label="Job Type">
                    <MultiSelectFilter
                        className="flex flex-col gap-1.5"
                        onValueChange={(value) => updateMultiSelectFilter("jobType", value)}
                        defaultValue={filters.jobType}
                    >
                        {filterOptions.jobType.map((option) => (
                            <MultiSelectCheckbox key={option.id} option={option} className="text-sm" />
                        ))}
                    </MultiSelectFilter>
                </FilterWrapper>
            </div>
        </div>
    );
};

export default FilterSideBar;
