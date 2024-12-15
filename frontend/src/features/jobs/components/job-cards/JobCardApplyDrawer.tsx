import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/lib/shadcn/components/ui/drawer";

import { Button } from "@/lib/shadcn/components/ui/button";
import Link from "next/link";
import { X } from "lucide-react";
import { buttonVariants } from "@/lib/shadcn/ui/button";
import { cn } from "@/lib/shadcn/utils";

type Props = {
    children?: React.ReactNode;
    links: string[];
    emails: string[];
};

export const JobCardApplyDrawer = ({ children, links, emails }: Props) => {
    if (!links.length && !emails.length) {
        return null;
    }

    return (
        <Drawer>
            <DrawerTrigger>{children}</DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="flex items-center max-w-md mx-auto w-full justify-between">
                    <DrawerTitle>Apply links</DrawerTitle>
                    <DrawerClose className="lg:hidden">
                        <Button variant="outline" size={"icon"}>
                            <X />
                        </Button>
                    </DrawerClose>
                </DrawerHeader>
                <div className="space-y-4 max-w-md mx-auto w-full p-4">
                    {links.length > 0 && (
                        <div className="flex flex-col gap-2">
                            <span className="text-lg font-medium text-neutral-800">Links</span>
                            <div className="flex flex-col gap-2">
                                {links.map((link) => (
                                    <Link
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={cn(buttonVariants({ variant: "link" }), "text-sm p-0 max-w-md truncate")}
                                    >
                                        <span className="max-w-md truncate">{link}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {emails.length > 0 && (
                        <div className="flex flex-col gap-2">
                            <span className="text-lg font-medium text-neutral-800">Emails</span>
                            <div className="flex flex-col gap-2">
                                {emails.map((email) => (
                                    <Link
                                        href={`mailto:${email}`}
                                        className={cn(buttonVariants({ variant: "link" }), "text-sm w-fit p-0 text-wrap")}
                                    >
                                        {email}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </DrawerContent>
        </Drawer>
    );
};
