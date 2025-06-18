// components/email-editor/AIInputModal.tsx
"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Wand2 } from "lucide-react"; // AI / Magic icon
import { useEmailEditor } from "@/context/EmailEditorProvider";
import { v4 as uuidv4 } from 'uuid';

export default function AIInputModal() {
  const { setDesign, setSelectedElement } = useEmailEditor();
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) {
      setError("Please enter a description for your email.");
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/generate-email-layout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Something went wrong with the AI generator.");
      }

      const designData = await response.json();

      // The AI returns placeholder IDs. We need to replace them with real UUIDs.
      // This is a crucial step for the editor to function correctly.
      const addRealIds = (elements: any[]): any[] => {
          return elements.map(el => {
              const newEl = { ...el, id: uuidv4() };
              if (newEl.type === 'columns' && newEl.columns) {
                  newEl.columns = newEl.columns.map((col: any) => ({
                      ...col,
                      id: uuidv4(),
                      elements: col.elements ? addRealIds(col.elements) : [],
                  }));
              }
              return newEl;
          });
      };
      
      const designWithRealIds = {
          ...designData,
          elements: addRealIds(designData.elements || []),
      };

      setDesign(designWithRealIds);
      setSelectedElement(null); // Deselect any currently selected element
      setIsOpen(false); // Close the modal on success
      setPrompt(""); // Clear prompt for next time

    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Wand2 className="h-4 w-4 mr-2" />
          Generate with AI
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate Email with AI</DialogTitle>
          <DialogDescription>
            Describe the email you want to create. Be as specific as possible for the best results.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="prompt">Your Prompt</Label>
            <Textarea
              id="prompt"
              placeholder="e.g., An announcement email for a summer sale on Gidiopolis events. Include a hero image, a headline, a short paragraph, and a call-to-action button."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={5}
            />
          </div>
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleGenerate} disabled={isLoading}>
            {isLoading ? "Generating..." : "Generate"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}