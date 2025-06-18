// app/(platform)/email-marketing/editor/[templateId]/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { EmailEditorProvider, defaultEmailDesign } from "@/context/EmailEditorProvider";
import EmailEditorLayout from "@/components/email-editor/EmailEditorLayout";
import { EmailDesign } from "@/lib/types/email-editor.types";

// No more mock function needed

export default function EmailEditorPage() {
  const params = useParams();
  const templateId = params.templateId as string;
  const [initialDesign, setInitialDesign] = useState<EmailDesign | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!templateId) {
      setIsLoading(false);
      setError("No template ID provided.");
      return;
    }

    if (templateId === "new") {
      setInitialDesign(defaultEmailDesign);
      setIsLoading(false);
      return;
    }

    const fetchTemplate = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/email-templates/${templateId}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Error: ${response.statusText}`);
        }
        const data: EmailDesign = await response.json();
        setInitialDesign(data);
      } catch (err: any) {
        console.error("Error fetching template:", err);
        setError(`Failed to load template: ${err.message}. Starting with a new template.`);
        setInitialDesign(defaultEmailDesign); // Fallback to new if not found
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplate();
  }, [templateId]);

  if (isLoading) {
    // You can use your existing Loading component from gidilagos-main
    return <div className="flex justify-center items-center h-screen">Loading Editor...</div>;
  }

  // Pass any loading error to the layout to display as a notification/toast
  return (
    <EmailEditorProvider initialDesign={initialDesign || defaultEmailDesign}>
      <EmailEditorLayout templateId={templateId} loadError={error} />
    </EmailEditorProvider>
  );
}