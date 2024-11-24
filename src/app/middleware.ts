import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        // Check if the user is trying to access the users page
        if (
            req.nextUrl.pathname.startsWith("/users") &&
            !req.nextauth.token
        ) {
            return NextResponse.redirect(new URL("/auth/signin", req.url));
        }
        return NextResponse.next();
    },
    {
        callbacks: {
            // Return true if the token exists
            authorized: ({ token }) => !!token,
        },
    }
);

// Specify which routes to protect
export const config = {
    matcher: ["/users/:path*"],
};