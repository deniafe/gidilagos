import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/organization(.*)',
  '/event(.*)',
  '/admin(.*)',
]);

const isPublicRoute = createRouteMatcher([
  '/',
  '/search(.*)',
]);

export default clerkMiddleware((auth, req) => {
  const userId = auth().userId
  if (!userId && !isPublicRoute(req) && isProtectedRoute(req)) {
    const url = new URL('/sign-in', req.url)
    return NextResponse.redirect(url)
  }
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};