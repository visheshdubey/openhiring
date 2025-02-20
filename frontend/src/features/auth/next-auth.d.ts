import "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            _id?: string;
            isVerified?: boolean;
            isAcceptingMessages?: boolean;
            username?: string;
            isAdmin?: boolean;
        } & DefaultSession["user"];
        token?: string;
    }

    interface User {
        _id?: string;
        isVerified?: boolean;
        isAcceptingMessages?: boolean;
        username?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        _id?: string;
        isVerified?: boolean;
        isAcceptingMessages?: boolean;
        username?: string;
        isAdmin?: boolean;
    }
}
