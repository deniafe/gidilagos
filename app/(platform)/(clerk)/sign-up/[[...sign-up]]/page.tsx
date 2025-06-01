// src/app/(auth)/sign-up/[[...sign-up]]/page.tsx
"use client"; // This page uses hooks, so it must be a client component

import React from "react";
// import { SocialAuthButton } from "../_components/SocialAuthButton";
import GoogleIcon from "@/components/icons/GoogleIcon"; // Assuming you created this
import { SocialAuthButton } from "@/components/SocialAuthButton";
import FacebookIcon from "@/components/icons/FacebookIcon";
import LinkedInIcon from "@/components/icons/LinkedInIcon";
import TikTokIcon from "@/components/icons/TitokIcon";
// Import other icons like FacebookIcon, GithubIcon if needed

export default function SignUpPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-center mb-1">Create your Account</h1>
        <p className="text-sm text-muted-foreground text-center">
          Join Gidiopolis using your preferred social account.
        </p>
      </div>

      <div className="space-y-3">
        {/* Add a button for each social provider you've enabled in Clerk */}
        <SocialAuthButton
          strategy="oauth_google"
          providerName="Google"
          icon={<GoogleIcon />}
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
        By creating an account, you agree to our{" "}
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