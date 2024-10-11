import NextAuth, { NextAuthOptions, Session } from "next-auth";

import { GithubAuth } from "@/lib/next-auth/providers/github";
import { GoogleAuth } from "@/lib/next-auth/providers/google";
import { JWT as JWTToken } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
    providers: [GoogleAuth, GithubAuth],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt({ token, user }: { token: JWTToken, user?: any }) {
            if (user) {
                token.id = user.id;
            }

            return token;
        },
        async session({ session, token, }: { session: Session, token: JWTToken, }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.token = token

            }
            return session;
        },
    },
    pages: {
        signIn: "/auth/signin",
    },

};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
