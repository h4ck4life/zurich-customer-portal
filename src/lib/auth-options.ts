import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error',
    },
    callbacks: {
        async session({ session, token }) {
            if (session?.user) {
                // @ts-expect-error - id is not part of the user object
                session.user.id = token.id as string;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user?.id) {
                token.id = user.id;
            }
            return token;
        }
    }
};