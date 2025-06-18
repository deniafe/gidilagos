// components/email-editor/properties/ImageProperties.tsx
import { ImageEmailElement, ImageElementStyle, ImageElementProps } from "@/lib/types/email-editor.types";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface ImagePropertiesProps {
  element: ImageEmailElement;
  onUpdate: (updates: { style?: Partial<ImageElementStyle>, props?: Partial<ImageElementProps> }) => void;
}

export default function ImageProperties({ element, onUpdate }: ImagePropertiesProps) {
  const handleStyleChange = (key: keyof ImageElementStyle, value: any) => {
    onUpdate({ style: { ...element.style, [key]: value } });
  };

  const handlePropChange = (key: keyof ImageElementProps, value: any) => {
    onUpdate({ props: { ...element.props, [key]: value } });
  };

  return (
    <Accordion type="multiple" defaultValue={['content', 'sizing', 'spacing', 'appearance']} className="w-full">
      <AccordionItem value="content">
        <AccordionTrigger>Content</AccordionTrigger>
        <AccordionContent className="space-y-4 px-1">
          <div>
            <Label htmlFor={`image-src-${element.id}`}>Image URL (Source)</Label>
            <Textarea
              id={`image-src-${element.id}`}
              placeholder="https://example.com/image.png"
              value={element.props.src}
              onChange={(e) => handlePropChange("src", e.target.value)}
              className="mt-1"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor={`image-alt-${element.id}`}>Alt Text</Label>
            <Input
              id={`image-alt-${element.id}`}
              placeholder="Descriptive text for image"
              value={element.props.alt || ""}
              onChange={(e) => handlePropChange("alt", e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor={`image-href-${element.id}`}>Link URL (Optional)</Label>
            <Input
              id={`image-href-${element.id}`}
              placeholder="https://example.com/link"
              value={element.props.href || ""}
              onChange={(e) => handlePropChange("href", e.target.value)}
              className="mt-1"
            />
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="sizing">
        <AccordionTrigger>Sizing & Alignment</AccordionTrigger>
        <AccordionContent className="space-y-4 px-1">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor={`image-width-${element.id}`}>Width (e.g., 150px, 100%)</Label>
              <Input
                id={`image-width-${element.id}`}
                value={element.style.width || "auto"}
                onChange={(e) => handleStyleChange("width", e.target.value)}
                className="mt-1"
                placeholder="auto"
              />
            </div>
            <div>
              <Label htmlFor={`image-height-${element.id}`}>Height (e.g., 100px, auto)</Label>
              <Input
                id={`image-height-${element.id}`}
                value={element.style.height || "auto"}
                onChange={(e) => handleStyleChange("height", e.target.value)}
                className="mt-1"
                placeholder="auto"
              />
            </div>
          </div>
          <div>
            <Label htmlFor={`image-align-${element.id}`}>Alignment (of image block)</Label>
            <Select
              value={element.style.textAlign || "left"}
              onValueChange={(value) => handleStyleChange("textAlign", value as ImageElementStyle['textAlign'])}
            >
              <SelectTrigger id={`image-align-${element.id}`} className="mt-1">
                <SelectValue placeholder="Select alignment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="right">Right</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="spacing">
        <AccordionTrigger>Spacing</AccordionTrigger>
        <AccordionContent className="space-y-4 px-1">
          <div className="grid grid-cols-2 gap-2">
            <div><Label>Padding Top</Label><Input value={element.style.paddingTop || "0px"} onChange={(e) => handleStyleChange("paddingTop", e.target.value)} placeholder="0px" /></div>
            <div><Label>Padding Bottom</Label><Input value={element.style.paddingBottom || "0px"} onChange={(e) => handleStyleChange("paddingBottom", e.target.value)} placeholder="0px" /></div>
            <div><Label>Padding Left</Label><Input value={element.style.paddingLeft || "0px"} onChange={(e) => handleStyleChange("paddingLeft", e.target.value)} placeholder="0px" /></div>
            <div><Label>Padding Right</Label><Input value={element.style.paddingRight || "0px"} onChange={(e) => handleStyleChange("paddingRight", e.target.value)} placeholder="0px" /></div>
            <div><Label>Margin Top</Label><Input value={element.style.marginTop || "0px"} onChange={(e) => handleStyleChange("marginTop", e.target.value)} placeholder="0px" /></div>
            <div><Label>Margin Bottom</Label><Input value={element.style.marginBottom || "0px"} onChange={(e) => handleStyleChange("marginBottom", e.target.value)} placeholder="0px" /></div>
          </div>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="appearance">
        <AccordionTrigger>Appearance</AccordionTrigger>
        <AccordionContent className="space-y-4 px-1">
           <div>
            <Label htmlFor={`image-bg-${element.id}`}>Background Color (Block)</Label>
            <Input
              id={`image-bg-${element.id}`}
              type="color"
              value={element.style.backgroundColor || "#FFFFFF"}
              onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
              className="mt-1 h-10 w-full"
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}