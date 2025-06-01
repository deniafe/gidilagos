// app/(auth)/_components/SocialAuthButton.tsx
"use client";

import React from "react";
import { useSignIn, useSignUp } from "@clerk/nextjs"; 
import { OAuthStrategy } from "@clerk/types"// Removed OAuthStrategy import
import { Button } from "@/components/ui/button";
import { usePathname, useSearchParams } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // This should now work after 'npx shadcn-ui@latest add alert'
import { Terminal } from "lucide-react";

interface SocialAuthButtonProps {
  strategy: OAuthStrategy; // Corrected type for strategy
  providerName: string;
  icon?: React.ReactNode;
}

export function SocialAuthButton({ strategy, providerName, icon }: SocialAuthButtonProps) {
  const { signIn, isLoaded: isSignInLoaded } = useSignIn();
  const { signUp, isLoaded: isSignUpLoaded } = useSignUp();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const isSignUpPage = pathname.includes("/sign-up");
  const isLoaded = isSignUpPage ? isSignUpLoaded : isSignInLoaded;

  const handleSocialAuth = async () => {
    if (!isLoaded) return;
    setIsLoading(true);
    setError(null);

    const finalRedirectUrlAfterSso = searchParams.get("redirect_url") || "/";
    // This is the URL Clerk redirects to after the provider, then Clerk processes and redirects to finalRedirectUrlAfterSso
    const clerkSsoCallbackUrl = `/auth/sso-callback?redirect_url=${encodeURIComponent(finalRedirectUrlAfterSso)}`;

    try {
      if (isSignUpPage && signUp) {
        await signUp.authenticateWithRedirect({
          strategy,
          redirectUrl: clerkSsoCallbackUrl,
          redirectUrlComplete: finalRedirectUrlAfterSso, // Redundant if passed in redirectUrl query, but explicit
        });
      } else if (signIn) {
        await signIn.authenticateWithRedirect({
          strategy,
          redirectUrl: clerkSsoCallbackUrl,
          redirectUrlComplete: finalRedirectUrlAfterSso, // Redundant if passed in redirectUrl query, but explicit
        });
      }
    } catch (err: any) {
      console.error(`OAuth error with ${providerName}:`, JSON.stringify(err, null, 2));
      setError(err.errors?.[0]?.longMessage || err.message || `Failed to sign in with ${providerName}.`);
      setIsLoading(false); // Only set loading to false on error, as redirect happens on success
    }
    // Don't set isLoading to false here on success because a redirect should occur.
  };

  return (
    <>
      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2"
        onClick={handleSocialAuth}
        disabled={!isLoaded || isLoading}
      >
        {isLoading ? (
          "Redirecting..."
        ) : (
          <>
            {icon && <span className="h-5 w-5">{icon}</span>}
            Continue with {providerName}
          </>
        )}
      </Button>
      {error && (
         <Alert variant="destructive" className="mt-2">
           <Terminal className="h-4 w-4" />
           <AlertTitle>Authentication Error</AlertTitle>
           <AlertDescription>{error}</AlertDescription>
         </Alert>
      )}
    </>
  );
}