import Link from "next/link";
import { Routes } from "@/lib/configs";
import { buttonVariants } from "@/lib/shadcn/ui/button";
import { cn } from "@/lib/shadcn/utils";

type Props = {
    className?: string;
};

const AppHeader = (props: Props) => {
    return (
        <nav
            className={cn("flex w-full border-b border-neutral-200/70 h-14 shadow-sm shadow-neutral-100/70 bg-white px-4", props.className)}
        >
            <div className="max-w-screen-xl mx-auto w-full flex items-center justify-between">
                <Link className="text-lg font-medium text-purple-700" href={Routes.home}>
                    OpenHiring
                </Link>

                <div className="flex gap-6">
                    <Link
                        className={cn(buttonVariants({ variant: "outline", size: "sm" }), "text-xs shadow-none font-normal")}
                        href={Routes.feedback}
                    >
                        Feedback
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default AppHeader;
