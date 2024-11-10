"use client";

import { ClientSafeProvider, LiteralUnion } from "next-auth/react";

import { BuiltInProviderType } from "next-auth/providers/index";
import OAuthProviderButton from "./OAuthProviderButton";

type Props = {
    providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;
};

const SignInForm = ({ providers }: Props) => {
    return (
        <div className="max-w-lg flex flex-col mx-auto px-4 grow h-full min-h-[calc(100vh-3.5rem)] items-center justify-center">
            <div className="bg-card max-w-md w-full rounded-md shadow-md border border-neutral-100 p-8 flex items-center justify-center flex-col gap-4">
                <h1 className="text-sm font-medium">Login in to Openhiring</h1>
                {providers &&
                    Object.values(providers).map((provider) => (
                        <OAuthProviderButton key={`oauth-button-${provider.name}`} provider={provider} />
                    ))}
            </div>
        </div>
    );
};

export default SignInForm;
