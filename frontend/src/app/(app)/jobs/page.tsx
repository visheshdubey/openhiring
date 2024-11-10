import JobPageContainer from "@/features/jobs/components/JobPageContainer";

type Props = {};

type JobTags = {
    id: number;
    name: string;
    variant: "secondary" | "destructive" | null | undefined;
    order: number;
}[];

const JobPage = async (props: Props) => {
    return <JobPageContainer />;
};

export default JobPage;
