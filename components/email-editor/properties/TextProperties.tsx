// components/email-editor/properties/TextProperties.tsx
import { TextEmailElement, TextElementStyle, TextElementProps } from "@/lib/types/email-editor.types";
import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // npx shadcn-ui@latest add textarea
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // npx shadcn-ui@latest add select

interface TextPropertiesProps {
  element: TextEmailElement;
  onUpdate: (updates: { style?: Partial<TextElementStyle>, props?: Partial<TextElementProps> }) => void;
}

export default function TextProperties({ element, onUpdate }: TextPropertiesProps) {
  const handleStyleChange = (key: keyof TextElementStyle, value: any) => {
    onUpdate({ style: { ...element.style, [key]: value } });
  };

  const handlePropChange = (key: keyof TextElementProps, value: any) => {
    onUpdate({ props: { ...element.props, [key]: value } });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor={`text-content-${element.id}`}>Content (HTML)</Label>
        <Textarea
          id={`text-content-${element.id}`}
          value={element.props.content}
          onChange={(e) => handlePropChange("content", e.target.value)}
          rows={5}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor={`text-color-${element.id}`}>Text Color</Label>
        <Input
          id={`text-color-${element.id}`}
          type="color"
          value={element.style.color || "#000000"}
          onChange={(e) => handleStyleChange("color", e.target.value)}
          className="mt-1 h-10" // Color input needs specific styling sometimes
        />
      </div>
      <div>
        <Label htmlFor={`text-align-${element.id}`}>Text Align</Label>
        <Select
            value={element.style.textAlign || "left"}
            onValueChange={(value) => handleStyleChange("textAlign", value as TextElementStyle['textAlign'])}
        >
            <SelectTrigger id={`text-align-${element.id}`} className="mt-1">
                <SelectValue placeholder="Select alignment" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="right">Right</SelectItem>
                <SelectItem value="justify">Justify</SelectItem>
            </SelectContent>
        </Select>
      </div>
      {/* Add more style inputs: fontSize, fontFamily, padding, etc. */}
      <div>
        <Label htmlFor={`text-paddingTop-${element.id}`}>Padding Top (e.g., 10px)</Label>
        <Input
          id={`text-paddingTop-${element.id}`}
          value={element.style.paddingTop || "0px"}
          onChange={(e) => handleStyleChange("paddingTop", e.target.value)}
          className="mt-1"
          placeholder="0px"
        />
      </div>
       <div>
        <Label htmlFor={`text-paddingBottom-${element.id}`}>Padding Bottom (e.g., 10px)</Label>
        <Input
          id={`text-paddingBottom-${element.id}`}
          value={element.style.paddingBottom || "0px"}
          onChange={(e) => handleStyleChange("paddingBottom", e.target.value)}
          className="mt-1"
          placeholder="0px"
        />
      </div>
    </div>
  );
}