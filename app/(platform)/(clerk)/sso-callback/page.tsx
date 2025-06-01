// src/app/(auth)/sso-callback/page.tsx
"use client";

import { AuthenticateWithRedirectCallback, useClerk } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from 'react';

export default function SSOCallbackPage() {
  const { handleRedirectCallback } = useClerk();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const processCallback = async () => {
      try {
        // The redirect_url here is the final destination we want to go to
        // after Clerk finishes its internal processing.
        const finalRedirectUrl = searchParams.get("redirect_url") || "/";
        await handleRedirectCallback({
          redirectUrl: finalRedirectUrl, // Where to go after Clerk is done with this callback
          // afterSignInUrl: finalRedirectUrl, // also works
          // afterSignUpUrl: finalRedirectUrl, // also works
        });
        // If handleRedirectCallback doesn't automatically redirect (it usually does),
        // or if you need to do something before redirecting.
        // router.push(finalRedirectUrl); // Usually not needed as Clerk handles it.
      } catch (error) {
        console.error("SSO Callback Error:", error);
        // Redirect to a generic error page or sign-in page with an error message
        router.push("/auth/sign-in?error=sso_failed");
      }
    };

    processCallback();
  }, [handleRedirectCallback, router, searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="text-lg">Processing your authentication...</p>
      {/* You can add a spinner/loader component here */}
      <div className="mt-4 animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
}

// Alternatively, Clerk provides a built-in component for this:
// export default function SSOCallbackPage() {
//   const searchParams = useSearchParams();
//   const finalRedirectUrl = searchParams.get("redirect_url") || "/dashboard";
//   return <AuthenticateWithRedirectCallback redirectUrl={finalRedirectUrl} />;
// }