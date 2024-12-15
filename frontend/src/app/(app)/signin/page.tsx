import SignInForm from "@/features/auth/components/SignInForm";
import { getProviders } from "next-auth/react";

type Props = {};

const SigninPage = async (props: Props) => {
    const providers = await getProviders();

    return (
        <main className="min-h-screen bg-secondary">
            <SignInForm providers={providers} />
        </main>
    );
};

export default SigninPage;
