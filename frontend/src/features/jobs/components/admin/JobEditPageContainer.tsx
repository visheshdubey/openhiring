import JobEditForm from "./JobEditForm";

type Props = {
    jobId: string;
};

const JobEditPageContainer = (props: Props) => {
    return (
        <div className="w-full lg:px-4">
            <div className="relative flex flex-col max-w-screen-sm w-full bg-white border border-neutral-100 shadow-sm rounded-lg mx-auto mt-4 p-4 gap-8">
                <h1 className="text-xl font-medium">Edit Jobs</h1>
                <div className="max-w-screen-md max-auto w-full">
                    <JobEditForm jobId={props.jobId} />
                </div>
            </div>
        </div>
    );
};

export default JobEditPageContainer;
