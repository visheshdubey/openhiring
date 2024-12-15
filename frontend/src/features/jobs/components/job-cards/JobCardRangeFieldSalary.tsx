import JobCardNotSpecifiedFieldPlaceholder from "./JobCardNotSpecifiedFieldPlaceholder";
import React from "react";

type SalaryRangeProps = {
    minSalary?: number | string;
    maxSalary?: number | string;
    currency?: string | null;
};

const SalaryRange: React.FC<SalaryRangeProps> = ({ minSalary = 0, maxSalary = 0, currency = null }) => {
    if (Number(minSalary) === 0 && Number(maxSalary) === 0) {
        return <JobCardNotSpecifiedFieldPlaceholder fieldName="Salary" />;
    }

    const formatSalary = () => {
        const isValidCurrency = currency && currency !== "undefined";
        const currencyNotSpecified = !isValidCurrency ? " (Currency not specified)" : "";
        const currencySymbol = isValidCurrency ? currency : "";

        const validMinSalary = Number(minSalary) !== 0 ? minSalary : null;
        const validMaxSalary = Number(maxSalary) !== 0 ? maxSalary : null;

        if (validMinSalary && validMaxSalary) {
            return `${currencySymbol} ${validMinSalary} - ${validMaxSalary}${currencyNotSpecified}`;
        } else if (validMinSalary) {
            return `${currencySymbol} ${validMinSalary}${currencyNotSpecified}`;
        } else if (validMaxSalary) {
            return `${currencySymbol} ${validMaxSalary}${currencyNotSpecified}`;
        }
        return null;
    };

    return <div>{formatSalary() || <JobCardNotSpecifiedFieldPlaceholder fieldName="Salary" />}</div>;
};

export default SalaryRange;
