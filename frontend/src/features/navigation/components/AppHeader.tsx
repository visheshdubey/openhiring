import AppLogo from "@/features/brand/components/AppLogo";
import Link from "next/link";
import LoggedInUserProfileMenu from "./LoggedInUserProfileMenu";
import { buttonVariants } from "@/lib/shadcn/ui/button";
import { cn } from "@/lib/shadcn/utils";
import { getServerSession } from "next-auth";

type Props = {
    className?: string;
};

const AppHeader = async (props: Props) => {
    const session = await getServerSession();

    return (
        <nav
            className={cn("flex w-full border-b border-neutral-200/70 h-14 shadow-sm shadow-neutral-100/70 bg-white px-4", props.className)}
        >
            <div className="max-w-screen-xl mx-auto w-full flex items-center justify-between">
                <AppLogo />

                <div className="flex gap-6">
                    {session ? (
                        <LoggedInUserProfileMenu />
                    ) : (
                        <Link
                            href="/signin"
                            className={cn(
                                buttonVariants({
                                    variant: "outline",
                                    size: "sm",
                                }),
                                "bg-transparent rounded-full border-brand text-brand shadow-none px-2.5 py-0.5",
                            )}
                        >
                            Sign in
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default AppHeader;
