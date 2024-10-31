import AppHeader from "@/features/navigation/components/AppHeader";
import OAuthProviderButton from "./OAuthProviderButton";
import { getProviders } from "next-auth/react";

type Props = {};

const SigninPage = async (props: Props) => {
    const providers = await getProviders();

    return (
        <main className="min-h-screen bg-secondary">
            <AppHeader />

            {JSON.stringify(providers)}
            <div className="max-w-lg flex flex-col mx-auto px-4 grow h-full min-h-[calc(100vh-3.5rem)] items-center justify-center">
                <div className="bg-card max-w-md w-full rounded-md shadow-md border border-neutral-100 p-8 flex items-center justify-center flex-col gap-4">
                    <h1 className="text-sm font-medium">Login in to Openhiring</h1>
                    {providers &&
                        Object.values(providers).map((provider) => (
                            <OAuthProviderButton key={`oauth-button-${provider.name}`} provider={provider} />
                        ))}
                </div>
            </div>
        </main>
    );
};

export default SigninPage;
