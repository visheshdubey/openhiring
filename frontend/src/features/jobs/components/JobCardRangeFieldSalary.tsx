import JobCardNotSpecifiedFieldPlaceholder from "./JobCardNotSpecifiedFieldPlaceholder";
import React from "react";

type SalaryRangeProps = {
    minSalary?: number | string;
    maxSalary?: number | string;
    currency?: string | null;
};

const SalaryRange: React.FC<SalaryRangeProps> = ({ minSalary = 0, maxSalary = 0, currency = "$" }) => {
    if (Number(minSalary) === 0 && Number(maxSalary) === 0) {
        return <JobCardNotSpecifiedFieldPlaceholder fieldName="Salary" />;
    }

    const formatSalary = () => {
        if (minSalary && maxSalary) {
            return `${currency} ${minSalary} - ${currency} ${maxSalary}`;
        } else if (minSalary) {
            return `${currency} ${minSalary}`;
        } else if (maxSalary) {
            return `${currency} ${maxSalary}`;
        }
        return null;
    };

    return <div>{formatSalary() || <JobCardNotSpecifiedFieldPlaceholder fieldName="Salary" />}</div>;
};

export default SalaryRange;
