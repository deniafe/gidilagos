// middleware.ts

import { authMiddleware, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const adminEmails = ['wowe.media@gmail.com', 'deniafe@gmail.com', 'orebamz1@gmail.com'];

export default authMiddleware({
  // By providing the publishableKey, we help the middleware reliably
  // validate the user's session, which should resolve the 'signed-out' status issue.
  publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,

  // Define all routes that are publicly accessible and don't require authentication.
  publicRoutes: [
    "/",
    "/search",
    "/events",
    "/events/(.*)",
    "/category/(.*)",
    "/auth/(.*)", // Your custom sign-in/sign-up pages
    "/api/webhook/clerk",
    "/api/uploadthing",
    "/assets/(.*)",
    "/images/(.*)",
    "/privacy-policy",
    "/terms-and-conditions",
  ],

  // This function runs AFTER the authentication is checked for every request.
  async afterAuth(auth, req) {
    // If the user is not authenticated and is trying to access a protected route,
    // redirect them to the sign-in page.
    if (!auth.userId && !auth.isPublicRoute) {
      const signInUrl = new URL("/auth/sign-in", req.url);
      signInUrl.searchParams.set("redirect_url", req.url); // Preserve where they were going
      return NextResponse.redirect(signInUrl);
    }

    // If the user is authenticated, we can perform additional checks, like for admin routes.
    if (auth.userId) {
      // Check if the user is trying to access an admin route
      if (req.nextUrl.pathname.startsWith('/admin')) {
        // Fetch the user's full details using the server-side clerkClient
        const user = await clerkClient.users.getUser(auth.userId);
        const userEmail = user.emailAddresses[0]?.emailAddress;

        // If their email is not in the admin list, redirect them to the homepage.
        if (!userEmail || !adminEmails.includes(userEmail)) {
          const homeUrl = new URL('/', req.url);
          return NextResponse.redirect(homeUrl);
        }
      }
    }

    // Allow all other authorized requests to proceed.
    return NextResponse.next();
  }
});

export const config = {
  // The matcher ensures the middleware runs on all relevant paths.
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
