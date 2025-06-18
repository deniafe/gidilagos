// lib/firebase/admin.ts
import admin from 'firebase-admin';

let db: admin.firestore.Firestore;

try {
  console.log("Attempting to initialize Firebase Admin SDK...");

  // 1. Check if the environment variable exists
  const serviceAccountBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_BASE64;
  if (!serviceAccountBase64) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY_BASE64 environment variable is not set.");
  }

  // 2. Decode the base64 string
  const serviceAccountJson = Buffer.from(serviceAccountBase64, 'base64').toString('utf-8');
  if (!serviceAccountJson) {
    throw new Error("Failed to decode base64 service account key.");
  }

  // 3. Parse the JSON
  const serviceAccount = JSON.parse(serviceAccountJson);
  if (!serviceAccount.project_id) {
    throw new Error("Service account JSON is missing 'project_id'. Check if the JSON is corrupted.");
  }

  // 4. Initialize the app (only if not already initialized)
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log(`Firebase Admin SDK initialized successfully for project: ${serviceAccount.project_id}`);
  } else {
    console.log("Firebase Admin SDK was already initialized.");
  }

  // 5. Get Firestore instance
  db = admin.firestore();

} catch (error: any) {
  console.error("!!! FIREBASE ADMIN SDK INITIALIZATION FAILED !!!");
  console.error("ERROR:", error.message);
  // We are not re-throwing the error here, so the app can start,
  // but any attempt to use 'db' will likely fail if it's not initialized.
  // In a production environment, you might want to throw to prevent the server from starting in a bad state.
}

// @ts-ignore - This is to handle the case where db is not initialized but we export it to prevent app-wide crashes on import.
export { db, admin };










// import { clerkMiddleware, createRouteMatcher, clerkClient } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// // import { getUser } from '@clerk/nextjs/server'; // Import getUser to fetch user details

// const isProtectedRoute = createRouteMatcher([
//   '/dashboard(.*)',
//   '/create-event(.*)',
//   '/e/edit(.*)',
//   '/user-events(.*)',
//   '/admin(.*)',
// ]);

// const isPublicRoute = createRouteMatcher([
//   '/',
//   '/search(.*)',
// ]);

// const adminEmails = ['wowe.media@gmail.com', 'deniafe@gmail.com', 'orebamz1@gmail.com'];

// export default clerkMiddleware(async (auth, req) => {
//   const userId = auth().userId;

//   if (!userId && !isPublicRoute(req) && isProtectedRoute(req)) {
//     const url = new URL('/sign-in', req.url);
//     return NextResponse.redirect(url);
//   }

//   // Fetch user details using userId
//   if (userId) {
//     const user = await clerkClient.users.getUser(userId);

//     const userEmail = user.emailAddresses[0].emailAddress;

//     if (req.nextUrl.pathname.startsWith('/admin') && !adminEmails.includes(userEmail)) {
//       const url = new URL('/', req.url); // Redirect to a "not authorized" page
//       return NextResponse.redirect(url);
//     }
//   }

//   return NextResponse.next();
// });

// export const config = {
//   matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };

