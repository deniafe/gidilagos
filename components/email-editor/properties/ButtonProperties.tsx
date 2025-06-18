// components/email-editor/properties/ButtonProperties.tsx
import { ButtonEmailElement, ButtonElementStyle, ButtonElementProps } from "@/lib/types/email-editor.types";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface ButtonPropertiesProps {
  element: ButtonEmailElement;
  onUpdate: (updates: { style?: Partial<ButtonElementStyle>, props?: Partial<ButtonElementProps> }) => void;
}

export default function ButtonProperties({ element, onUpdate }: ButtonPropertiesProps) {
  const handleStyleChange = (key: keyof ButtonElementStyle, value: any) => {
    onUpdate({ style: { ...element.style, [key]: value } });
  };

  const handlePropChange = (key: keyof ButtonElementProps, value: any) => {
    onUpdate({ props: { ...element.props, [key]: value } });
  };

  return (
    <Accordion type="multiple" defaultValue={['content', 'appearance', 'sizing', 'spacing']} className="w-full">
      <AccordionItem value="content">
        <AccordionTrigger>Content</AccordionTrigger>
        <AccordionContent className="space-y-4 px-1">
          <div>
            <Label htmlFor={`button-text-${element.id}`}>Button Text</Label>
            <Input
              id={`button-text-${element.id}`}
              value={element.props.text}
              onChange={(e) => handlePropChange("text", e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor={`button-href-${element.id}`}>Link URL</Label>
            <Input
              id={`button-href-${element.id}`}
              placeholder="https://example.com/action"
              value={element.props.href}
              onChange={(e) => handlePropChange("href", e.target.value)}
              className="mt-1"
            />
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="appearance">
        <AccordionTrigger>Appearance</AccordionTrigger>
        <AccordionContent className="space-y-4 px-1">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor={`button-bgcolor-${element.id}`}>Background Color</Label>
              <Input
                id={`button-bgcolor-${element.id}`}
                type="color"
                value={element.style.backgroundColor || "#007BFF"}
                onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
                className="mt-1 h-10 w-full"
              />
            </div>
            <div>
              <Label htmlFor={`button-textcolor-${element.id}`}>Text Color</Label>
              <Input
                id={`button-textcolor-${element.id}`}
                type="color"
                value={element.style.color || "#FFFFFF"}
                onChange={(e) => handleStyleChange("color", e.target.value)}
                className="mt-1 h-10 w-full"
              />
            </div>
          </div>
          <div>
            <Label htmlFor={`button-fontfamily-${element.id}`}>Font Family</Label>
            <Input /* Consider a Select for common email-safe fonts */
              id={`button-fontfamily-${element.id}`}
              value={element.style.fontFamily || "Arial, sans-serif"}
              onChange={(e) => handleStyleChange("fontFamily", e.target.value)}
              className="mt-1"
              placeholder="Arial, sans-serif"
            />
          </div>
           <div className="grid grid-cols-2 gap-2">
            <div>
                <Label htmlFor={`button-fontsize-${element.id}`}>Font Size (e.g., 16px)</Label>
                <Input
                id={`button-fontsize-${element.id}`}
                value={element.style.fontSize || "16px"}
                onChange={(e) => handleStyleChange("fontSize", e.target.value)}
                className="mt-1"
                placeholder="16px"
                />
            </div>
            <div>
                <Label htmlFor={`button-fontweight-${element.id}`}>Font Weight</Label>
                <Select
                    value={element.style.fontWeight || "normal"}
                    onValueChange={(value) => handleStyleChange("fontWeight", value as ButtonElementStyle['fontWeight'])}
                >
                    <SelectTrigger id={`button-fontweight-${element.id}`} className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="bold">Bold</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>
          <div>
            <Label htmlFor={`button-borderradius-${element.id}`}>Border Radius (e.g., 5px)</Label>
            <Input
              id={`button-borderradius-${element.id}`}
              value={element.style.borderRadius || "5px"}
              onChange={(e) => handleStyleChange("borderRadius", e.target.value)}
              className="mt-1"
              placeholder="5px"
            />
          </div>
           {/* Add border style input if needed */}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="sizing">
        <AccordionTrigger>Sizing & Alignment</AccordionTrigger>
        <AccordionContent className="space-y-4 px-1">
          <div>
            <Label htmlFor={`button-width-${element.id}`}>Button Width</Label>
             <Select
                value={element.style.width || "auto"}
                onValueChange={(value) => handleStyleChange("width", value as ButtonElementStyle['width'])}
            >
                <SelectTrigger id={`button-width-${element.id}`} className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="auto">Auto</SelectItem>
                    <SelectItem value="100%">Full Width</SelectItem>
                </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">If Full Width, button takes all available horizontal space. Auto fits content.</p>
          </div>
          <div>
            <Label htmlFor={`button-align-${element.id}`}>Alignment (of button block)</Label>
            <Select
              value={element.style.textAlign || "left"}
              onValueChange={(value) => handleStyleChange("textAlign", value as ButtonElementStyle['textAlign'])}
            >
              <SelectTrigger id={`button-align-${element.id}`} className="mt-1"><SelectValue /></SelectTrigger>
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
        <AccordionTrigger>Spacing (Padding)</AccordionTrigger>
        <AccordionContent className="space-y-4 px-1">
            <p className="text-xs text-muted-foreground">Buttons internal padding (text to edge):</p>
             <div><Label>Padding (e.g., 10px 20px)</Label><Input value={element.style.padding || "10px 20px"} onChange={(e) => handleStyleChange("padding", e.target.value)} placeholder="10px 20px" /></div>
            <p className="text-xs text-muted-foreground mt-2">Spacing around the button block:</p>
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
    </Accordion>
  );
}