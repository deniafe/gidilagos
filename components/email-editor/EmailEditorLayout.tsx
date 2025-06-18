// components/email-editor/EmailEditorLayout.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import Canvas from "./Canvas";
import PropertiesPanel from "./PropertiesPanel";
import { Button } from "@/components/ui/button";
import { Save, Eye, Code, Rocket, Undo, Redo } from "lucide-react"; // Example icons
import { useEmailEditor } from "@/context/EmailEditorProvider";
import AIInputModal from "./AIInputModal";
import { useToast } from "@/components/ui/use-toast"; // Assuming you have toasts from Shadcn
import { generateHtml } from "@/lib/email-editor/generateHtml";
// Placeholder for Firebase save function
// import { saveEmailTemplate } from "@/Firebase/emailTemplate.queries"; // We'll create this

interface EmailEditorLayoutProps {
  templateId: string;
  loadError?: string | null;
}

// Mock function for now
const saveEmailTemplateToDb = async (templateId: string, design: any) => {
  console.log("Saving template:", templateId, design);
  // Simulate saving
  await new Promise(resolve => setTimeout(resolve, 1000));
  // throw new Error("Simulated save error");
  return { success: true, id: templateId === "new" ? "newly-saved-id-123" : templateId };
};


export default function EmailEditorLayout({ templateId: initialTemplateId, loadError }: EmailEditorLayoutProps) {
  const { design } = useEmailEditor(); // Access more state/functions as needed
  const { toast } = useToast();
  const router = useRouter();
  const [isSaving, setIsSaving] = React.useState(false);
  const [saveStatus, setSaveStatus] = React.useState<string | null>(null);

  // Use a state for templateId so we can update it after saving a "new" template
  const [currentTemplateId, setCurrentTemplateId] = React.useState(initialTemplateId);

  React.useEffect(() => {
    if (loadError) {
      toast({
        variant: "destructive",
        title: "Error Loading Template",
        description: loadError,
      });
    }
  }, [loadError, toast]);

const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/email-templates/${currentTemplateId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(design), // Send the whole design object
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to save template.");
      }
      
      const result = await response.json();

      toast({
        title: "Success!",
        description: "Your email template has been saved.",
      });

      // If it was a new template, we get back a new ID.
      // We should update the URL to reflect this new ID to prevent creating duplicates on subsequent saves.
      if (currentTemplateId === "new" && result.id) {
        setCurrentTemplateId(result.id);
        // Update URL without a full page reload
        router.push(`/email-marketing/editor/${result.id}`, { scroll: false });
      }

    } catch (error: any) {
      console.error("Save error:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    // Generate the HTML from the current design state
    const htmlContent = generateHtml(design);
    
    // Open the HTML content in a new browser tab for previewing
    const previewWindow = window.open();
    if (previewWindow) {
      previewWindow.document.write(htmlContent);
      previewWindow.document.close();
    } else {
      toast({
        variant: "destructive",
        title: "Preview Failed",
        description: "Please allow pop-ups for this site to preview the email.",
      });
    }
  };

  const handleViewCode = () => {
    const htmlContent = generateHtml(design);
    const newWindow = window.open();
     if (newWindow) {
      // Use a <pre> tag to format the HTML code nicely
      newWindow.document.write(`<pre>${htmlContent.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>`);
      newWindow.document.close();
    }
  }


  return (
    <div className="flex flex-col h-screen bg-muted/40">
      {/* Top Navbar for Editor Actions */}
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 py-2">
        <h1 className="text-xl font-semibold">Email Editor {currentTemplateId !== "new" ? `(${currentTemplateId})` : "(New Template)"}</h1>
        {loadError && <span className="text-xs text-destructive ml-2">(Error: {loadError})</span>}
        <div className="ml-auto flex items-center gap-2">
         <AIInputModal />
          {/* <Button variant="outline" size="sm" onClick={() => console.log("Undo action")}>
            <Undo className="h-4 w-4 mr-1" /> Undo
          </Button>
          <Button variant="outline" size="sm" onClick={() => console.log("Redo action")}>
            <Redo className="h-4 w-4 mr-1" /> Redo
          </Button> */}
          <Button variant="outline" size="sm" onClick={handlePreview}> {/* <-- Updated onClick */}
            <Eye className="h-4 w-4 mr-1" /> Preview
          </Button>
          <Button variant="outline" size="sm" onClick={handleViewCode}>
            <Code className="h-4 w-4 mr-1" /> View Code
          </Button>
          <Button size="sm" onClick={handleSave} disabled={isSaving}>
            <Save className="h-4 w-4 mr-1" /> {isSaving ? "Saving..." : "Save Template"}
          </Button>
          {/* <Button size="sm" variant="success" className="bg-green-500 hover:bg-green-600 text-white">
            <Rocket className="h-4 w-4 mr-1" /> Send/Publish
          </Button> */}
        </div>
      </header>
      {saveStatus && <div className={`p-2 text-center text-sm ${saveStatus.includes("successfully") ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{saveStatus}</div>}


      {/* Main Editor Area */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-auto"> {/* Main content area including canvas */}
          <Canvas />
        </div>
        <PropertiesPanel />
      </div>
    </div>
  );
}