// components/email-editor/properties/DividerProperties.tsx
import { DividerEmailElement, DividerElementStyle } from "@/lib/types/email-editor.types";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface DividerPropertiesProps {
  element: DividerEmailElement;
  onUpdate: (updates: { style?: Partial<DividerElementStyle> }) => void;
}

export default function DividerProperties({ element, onUpdate }: DividerPropertiesProps) {
  const handleStyleChange = (key: keyof DividerElementStyle, value: any) => {
    onUpdate({ style: { ...element.style, [key]: value } });
  };

  return (
    <Accordion type="multiple" defaultValue={['appearance', 'spacing']} className="w-full">
      <AccordionItem value="appearance">
        <AccordionTrigger>Appearance</AccordionTrigger>
        <AccordionContent className="space-y-4 px-1">
          <div>
            <Label htmlFor={`divider-color-${element.id}`}>Color</Label>
            <Input
              id={`divider-color-${element.id}`}
              type="color"
              value={element.style.borderTopColor || "#cccccc"}
              onChange={(e) => handleStyleChange("borderTopColor", e.target.value)}
              className="mt-1 h-10 w-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor={`divider-thickness-${element.id}`}>Thickness (e.g., 1px)</Label>
              <Input
                id={`divider-thickness-${element.id}`}
                value={element.style.borderTopWidth || "1px"}
                onChange={(e) => handleStyleChange("borderTopWidth", e.target.value)}
                className="mt-1"
                placeholder="1px"
              />
            </div>
            <div>
              <Label htmlFor={`divider-style-${element.id}`}>Style</Label>
              <Select
                value={element.style.borderTopStyle || "solid"}
                onValueChange={(value) => handleStyleChange("borderTopStyle", value as DividerElementStyle['borderTopStyle'])}
              >
                <SelectTrigger id={`divider-style-${element.id}`} className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solid">Solid</SelectItem>
                  <SelectItem value="dashed">Dashed</SelectItem>
                  <SelectItem value="dotted">Dotted</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="spacing">
        <AccordionTrigger>Spacing</AccordionTrigger>
        <AccordionContent className="space-y-4 px-1">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Padding Top</Label>
              <Input value={element.style.paddingTop || "10px"} onChange={(e) => handleStyleChange("paddingTop", e.target.value)} placeholder="10px" />
            </div>
            <div>
              <Label>Padding Bottom</Label>
              <Input value={element.style.paddingBottom || "10px"} onChange={(e) => handleStyleChange("paddingBottom", e.target.value)} placeholder="10px" />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}