"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

type Props = {
    children: ReactNode;
};

const RootProvider = (props: Props) => {
    return <SessionProvider>{props.children}</SessionProvider>;
};

export default RootProvider;
