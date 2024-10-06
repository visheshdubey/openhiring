type FilterWrapperProps = {
    label: string;
    children: React.ReactNode;
};

const FilterWrapper = ({ label, children }: FilterWrapperProps) => {
    return (
        <div className="flex flex-col gap-2.5">
            <span className="font-medium text-sm text-neutral-800">{label}</span>
            {children}
        </div>
    );
};

export default FilterWrapper;
