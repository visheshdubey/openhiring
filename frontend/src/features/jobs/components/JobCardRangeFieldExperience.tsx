import JobCardNotSpecifiedFieldPlaceholder from "./JobCardNotSpecifiedFieldPlaceholder";
import React from "react";

type ExperienceRangeProps = {
    minExperience?: number | string;
    maxExperience?: number | string;
};

const JobCardExperienceRange: React.FC<ExperienceRangeProps> = ({ minExperience = 0, maxExperience = 0 }) => {
    if (Number(minExperience) === 0 && Number(maxExperience) === 0) {
        return <JobCardNotSpecifiedFieldPlaceholder fieldName="Experience" />;
    }

    const formatExperience = () => {
        if (minExperience && maxExperience) {
            return `${minExperience} - ${maxExperience} years`;
        } else if (minExperience) {
            return `${minExperience} years`;
        } else if (maxExperience) {
            return `${maxExperience} years`;
        }
        return null;
    };

    return <div>{formatExperience() || <JobCardNotSpecifiedFieldPlaceholder fieldName="Experience" />}</div>;
};

export default JobCardExperienceRange;
