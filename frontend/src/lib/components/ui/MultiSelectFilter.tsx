import { Checkbox } from "@/lib/shadcn/ui/checkbox";
import React from "react";
import { cn } from "@/lib/shadcn/utils";

type Option = {
    id: number;
    label: string;
};

type MultiSelectFilterProps = {
    defaultValue?: number[];
    value?: number[];
    onValueChange?: (value: number[]) => void;
    children: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "value" | "onValueChange">;

type MultiSelectFilterContextType = {
    selectedItems: number[];
    toggleItem: (id: number) => void;
};

const MultiSelectFilterContext = React.createContext<MultiSelectFilterContextType | null>(null);

function useMultiSelectFilter() {
    const context = React.useContext(MultiSelectFilterContext);

    if (!context) {
        throw new Error("useMultiSelectFilter must be used within a <MultiSelectFilter />");
    }

    return context;
}

const MultiSelectFilter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & MultiSelectFilterProps>(
    ({ defaultValue = [], value, onValueChange, children, ...props }, ref) => {
        const [selectedItems, setSelectedItems] = React.useState<number[]>(defaultValue);

        React.useEffect(() => {
            if (value) {
                setSelectedItems(value);
            }
        }, [value]);

        const toggleItem = React.useCallback(
            (id: number) => {
                setSelectedItems((prev) => {
                    const newItems = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];

                    onValueChange?.(newItems);
                    return newItems;
                });
            },
            [onValueChange],
        );

        return (
            <MultiSelectFilterContext.Provider value={{ selectedItems, toggleItem }}>
                <div ref={ref} {...props}>
                    {children}
                </div>
            </MultiSelectFilterContext.Provider>
        );
    },
);

MultiSelectFilter.displayName = "MultiSelectFilter";

type MultiSelectCheckboxProps = {
    option: Option;
    className?: string;
};

const MultiSelectCheckbox = ({ option, className }: MultiSelectCheckboxProps) => {
    const { selectedItems, toggleItem } = useMultiSelectFilter();
    const isChecked = selectedItems.includes(option.id);

    return (
        <label className={cn("flex items-center gap-2 text-sm", className)}>
            <Checkbox checked={isChecked} onCheckedChange={(e) => toggleItem(option.id)} />
            {option.label}
        </label>
    );
};

export { MultiSelectFilter, MultiSelectCheckbox, useMultiSelectFilter };
export type { Option, MultiSelectFilterProps };
