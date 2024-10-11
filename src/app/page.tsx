"use client";

import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const isServer = typeof window === "undefined";

export default  function Home() {
    // const session = await getServerSession(authOptions);
    // const { data } = useSession();
    return <div>{isServer + ""}</div>;
}
