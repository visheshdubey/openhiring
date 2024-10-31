import AppHeader from "@/features/navigation/components/AppHeader";
import { getAuthSession } from "@/features/auth/utils";

type Props = {};

type JobTags = {
    id: number;
    name: string;
    variant: "secondary" | "destructive" | null | undefined;
    order: number;
}[];

const JobPage = async (props: Props) => {
    const session = await getAuthSession();

    return (
        <div className="bg-neutral-50 min-h-screen">
            <AppHeader className="sticky top-0 z-50" />
        </div>
    );
};

export default JobPage;
