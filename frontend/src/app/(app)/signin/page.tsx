import AppHeader from "@/features/navigation/components/AppHeader";
import SignInForm from "@/features/auth/components/SignInForm";
import { getProviders } from "next-auth/react";

type Props = {};

const SigninPage = async (props: Props) => {
    const providers = await getProviders();

    return (
        <main className="min-h-screen bg-secondary">
            <AppHeader />
            <SignInForm providers={providers} />
        </main>
    );
};

export default SigninPage;
