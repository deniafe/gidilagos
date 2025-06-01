// app/(auth)/sign-in/[[...sign-in]]/page.tsx
"use client";

import React from "react";
import GoogleIcon from "@/components/icons/GoogleIcon";
import FacebookIcon from "@/components/icons/FacebookIcon"; // Import new icon
import LinkedInIcon from "@/components/icons/LinkedInIcon"; // Import new icon
import { SocialAuthButton } from "@/components/SocialAuthButton";
import TikTokIcon from "@/components/icons/TitokIcon";

export default function SignInPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-center mb-1">Welcome Back!</h1>
        <p className="text-sm text-muted-foreground text-center">
          Sign in to continue to Gidiopolis.
        </p>
      </div>

      <div className="space-y-3">
        <SocialAuthButton
          strategy="oauth_google" // Clerk's strategy name
          providerName="Google"
          icon={<GoogleIcon className="h-5 w-5" />}
        />
        <SocialAuthButton
          strategy="oauth_facebook"
          providerName="Facebook"
          icon={<FacebookIcon className="h-5 w-5" />} // Color comes from FacebookIcon
        />
        {/* <SocialAuthButton
          strategy="oauth_linkedin"
          providerName="LinkedIn"
          icon={<LinkedInIcon className="h-5 w-5" />} // Color comes from LinkedInIcon
        /> */}
        <SocialAuthButton
          strategy="oauth_tiktok"
          providerName="TikTok"
          icon={<TikTokIcon className="h-5 w-5" />}   // Color comes from TikTokIcon
        />
      </div>

      <p className="px-8 text-center text-xs text-muted-foreground">
        By continuing, you agree to our{" "}
        <a href="/terms-and-conditions" className="underline hover:text-primary">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="/privacy-policy" className="underline hover:text-primary">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}