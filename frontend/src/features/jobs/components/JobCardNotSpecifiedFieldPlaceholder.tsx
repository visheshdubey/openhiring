import { cn } from "@/lib/shadcn/utils";

type Props = {
    className?: string;
    fieldName?: string;
};

const JobCardNotSpecifiedFieldPlaceholder = ({ fieldName: key, className }: Props) => {
    return <div className={cn("text-neutral-400", className)}>{key ? <>{key} Not Specified</> : "Not Specified"}</div>;
};

export default JobCardNotSpecifiedFieldPlaceholder;
