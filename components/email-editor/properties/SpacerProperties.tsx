// components/email-editor/properties/SpacerProperties.tsx
import { SpacerEmailElement, SpacerElementStyle } from "@/lib/types/email-editor.types";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface SpacerPropertiesProps {
  element: SpacerEmailElement;
  onUpdate: (updates: { style?: Partial<SpacerElementStyle> }) => void;
}

export default function SpacerProperties({ element, onUpdate }: SpacerPropertiesProps) {
  const handleStyleChange = (key: keyof SpacerElementStyle, value: any) => {
    onUpdate({ style: { ...element.style, [key]: value } });
  };

  return (
    <Accordion type="single" collapsible defaultValue="sizing" className="w-full">
      <AccordionItem value="sizing">
        <AccordionTrigger>Sizing</AccordionTrigger>
        <AccordionContent className="space-y-4 px-1">
          <div>
            <Label htmlFor={`spacer-height-${element.id}`}>Height (e.g., 20px)</Label>
            <Input
              id={`spacer-height-${element.id}`}
              value={element.style.height || "20px"}
              onChange={(e) => handleStyleChange("height", e.target.value)}
              className="mt-1"
              placeholder="20px"
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}