// components/email-editor/properties/GeneralEmailProperties.tsx
import { EmailGlobalStyle } from "@/lib/types/email-editor.types";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface GeneralEmailPropertiesProps {
  style: EmailGlobalStyle;
  onUpdate: (updates: Partial<EmailGlobalStyle> | ((prev: EmailGlobalStyle) => EmailGlobalStyle)) => void;
}

export default function GeneralEmailProperties({ style, onUpdate }: GeneralEmailPropertiesProps) {
  const handleChange = (key: keyof EmailGlobalStyle, value: any) => {
    onUpdate({ [key]: value });
  };

  return (
    <Accordion type="multiple" defaultValue={['colors', 'layout', 'typography']} className="w-full">
      <AccordionItem value="layout">
        <AccordionTrigger>Overall Layout</AccordionTrigger>
        <AccordionContent className="space-y-4 px-1">
          <div>
            <Label htmlFor="global-contentWidth">Content Max Width (e.g., 600px)</Label>
            <Input
              id="global-contentWidth"
              value={style.contentWidth || "600px"}
              onChange={(e) => handleChange("contentWidth", e.target.value)}
              className="mt-1"
              placeholder="600px"
            />
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="colors">
        <AccordionTrigger>Colors</AccordionTrigger>
        <AccordionContent className="space-y-4 px-1">
          <div>
            <Label htmlFor="global-backgroundColor">Email Body Background</Label>
            <Input
              id="global-backgroundColor"
              type="color"
              value={style.backgroundColor || "#F4F4F4"}
              onChange={(e) => handleChange("backgroundColor", e.target.value)}
              className="mt-1 h-10 w-full"
            />
          </div>
          <div>
            <Label htmlFor="global-contentBackgroundColor">Content Area Background</Label>
            <Input
              id="global-contentBackgroundColor"
              type="color"
              value={style.contentBackgroundColor || "#FFFFFF"}
              onChange={(e) => handleChange("contentBackgroundColor", e.target.value)}
              className="mt-1 h-10 w-full"
            />
          </div>
          <div>
            <Label htmlFor="global-textColor">Default Text Color</Label>
            <Input
              id="global-textColor"
              type="color"
              value={style.textColor || "#333333"}
              onChange={(e) => handleChange("textColor", e.target.value)}
              className="mt-1 h-10 w-full"
            />
          </div>
          <div>
            <Label htmlFor="global-linkColor">Default Link Color</Label>
            <Input
              id="global-linkColor"
              type="color"
              value={style.linkColor || "#007BFF"}
              onChange={(e) => handleChange("linkColor", e.target.value)}
              className="mt-1 h-10 w-full"
            />
          </div>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="typography">
        <AccordionTrigger>Typography</AccordionTrigger>
        <AccordionContent className="space-y-4 px-1">
           <div>
            <Label htmlFor="global-fontFamily">Default Font Family</Label>
            <Input
              id="global-fontFamily"
              value={style.fontFamily || "Arial, sans-serif"}
              onChange={(e) => handleChange("fontFamily", e.target.value)}
              className="mt-1"
              placeholder="Arial, Helvetica, sans-serif"
            />
            <p className="text-xs text-muted-foreground mt-1">Use email-safe fonts for best compatibility.</p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}