"use client";

import { ClientSafeProvider, signIn } from "next-auth/react";

import { Button } from "@/lib/shadcn/ui/button";
import ProviderIcon from "./ProviderIcon";

type OAuthProviderButtonProps = {
    provider: ClientSafeProvider;
    className?: string;
};

const OAuthProviderButton = ({ provider, className = "" }: OAuthProviderButtonProps) => {
    return (
        <div className="mb-4">
            <Button onClick={() => signIn(provider.id)} className={`gap-2 w-full ${className}`} variant="outline">
                <ProviderIcon provider={provider.id} />
                <span>Sign in with {provider.name}</span>
            </Button>
        </div>
    );
};

export default OAuthProviderButton;
