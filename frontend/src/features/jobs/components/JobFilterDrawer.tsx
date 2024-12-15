import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/lib/shadcn/components/ui/drawer";
import { ListFilter, X } from "lucide-react";

import { Button } from "@/lib/shadcn/components/ui/button";
import { FilterOptionType } from "@/lib/configs/job";
import JobFilters from "./JobFilters";

type Props = {
    children?: React.ReactNode;
    filterOptions: FilterOptionType;
};

const JobFilterDrawer = ({ children, filterOptions }: Props) => {
    return (
        <Drawer>
            <DrawerTrigger>
                <Button size={"icon"} variant={"ghost"}>
                    <ListFilter />
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="flex items-center justify-between">
                    <DrawerTitle>Filters</DrawerTitle>
                    <DrawerClose>
                        <Button variant="outline" size={"icon"}>
                            <X />
                        </Button>
                    </DrawerClose>
                </DrawerHeader>
                <JobFilters filterOptions={filterOptions} />
                {/* <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter> */}
            </DrawerContent>
        </Drawer>
    );
};

export default JobFilterDrawer;
