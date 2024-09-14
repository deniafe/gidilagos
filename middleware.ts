import { clerkMiddleware, createRouteMatcher, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
// import { getUser } from '@clerk/nextjs/server'; // Import getUser to fetch user details

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/create-event(.*)',
  '/e/edit(.*)',
  '/user-events(.*)',
  '/admin(.*)',
]);

const isPublicRoute = createRouteMatcher([
  '/',
  '/search(.*)',
]);

const adminEmails = ['wowe.media@gmail.com', 'deniafe@gmail.com', 'orebamz1@gmail.com'];

export default clerkMiddleware(async (auth, req) => {
  const userId = auth().userId;

  if (!userId && !isPublicRoute(req) && isProtectedRoute(req)) {
    const url = new URL('/sign-in', req.url);
    return NextResponse.redirect(url);
  }

  // Fetch user details using userId
  if (userId) {
    const user = await clerkClient.users.getUser(userId);

    const userEmail = user.emailAddresses[0].emailAddress;

    if (req.nextUrl.pathname.startsWith('/admin') && !adminEmails.includes(userEmail)) {
      const url = new URL('/', req.url); // Redirect to a "not authorized" page
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
