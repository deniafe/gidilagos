// components/email-editor/properties/SocialProperties.tsx
import { SocialEmailElement, SocialElementStyle, SocialElementProps, SocialLink } from "@/lib/types/email-editor.types";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Trash2, PlusCircle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface SocialPropertiesProps {
  element: SocialEmailElement;
  onUpdate: (updates: { style?: Partial<SocialElementStyle>, props?: Partial<SocialElementProps> }) => void;
}

const availablePlatforms: SocialLink['platform'][] = ["facebook", "twitter", "instagram", "linkedin", "youtube", "website", "custom"];

export default function SocialProperties({ element, onUpdate }: SocialPropertiesProps) {
  const { links = [] } = element.props;
  const { style } = element;

  const handleStyleChange = (key: keyof SocialElementStyle, value: any) => {
    onUpdate({ style: { ...style, [key]: value } });
  };

  const handleLinkChange = (id: string, field: keyof Omit<SocialLink, "id">, value: string) => {
    const newLinks = links.map((link) => 
      link.id === id ? { ...link, [field]: value } : link
    );
    onUpdate({ props: { ...element.props, links: newLinks } });
  };

  const addLink = () => {
    const newLink: SocialLink = { id: uuidv4(), platform: "custom", url: "#" };
    onUpdate({ props: { ...element.props, links: [...links, newLink] } });
  };

  const removeLink = (idToRemove: string) => {
    const newLinks = links.filter((link) => link.id !== idToRemove);
    onUpdate({ props: { ...element.props, links: newLinks } });
  };

  return (
    <Accordion type="multiple" defaultValue={['links', 'styling', 'spacing']} className="w-full">
      <AccordionItem value="links">
        <AccordionTrigger>Social Links ({links.length})</AccordionTrigger>
        <AccordionContent className="space-y-3 px-1">
          {links.map((link, index) => (
            <div key={link.id} className="p-3 border rounded space-y-2 relative mb-2 bg-background">
               <Button variant="ghost" size="icon" className="absolute top-1 right-1 h-6 w-6 text-destructive hover:bg-destructive/10" onClick={() => removeLink(link.id)}> <Trash2 size={14} /> </Button>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor={`social-platform-${link.id}`} className="text-xs">Platform</Label>
                  <Select
                    value={link.platform}
                    onValueChange={(value) => handleLinkChange(link.id, "platform", value as SocialLink['platform'])}
                  >
                    <SelectTrigger id={`social-platform-${link.id}`} className="mt-1 h-9 text-xs">
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      {availablePlatforms.map(p => <SelectItem key={p} value={p} className="text-xs">{p.charAt(0).toUpperCase() + p.slice(1)}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                {link.platform === 'custom' && (
                  <div>
                    <Label htmlFor={`social-icon-${link.id}`} className="text-xs">Custom Icon URL</Label>
                    <Input
                      id={`social-icon-${link.id}`}
                      value={link.iconSrc || ""}
                      onChange={(e) => handleLinkChange(link.id, "iconSrc", e.target.value)}
                      className="mt-1 h-9 text-xs"
                      placeholder="https://path/to/icon.png"
                    />
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor={`social-url-${link.id}`} className="text-xs">URL</Label>
                <Input
                  id={`social-url-${link.id}`}
                  value={link.url}
                  onChange={(e) => handleLinkChange(link.id, "url", e.target.value)}
                  className="mt-1 h-9 text-xs"
                  placeholder="https://example.com"
                />
              </div>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addLink} className="mt-2 w-full">
            <PlusCircle size={16} className="mr-2" /> Add Link
          </Button>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="styling">
        <AccordionTrigger>Icon Styling</AccordionTrigger>
        <AccordionContent className="space-y-4 px-1">
          <div>
            <Label htmlFor={`social-align-${element.id}`}>Alignment of Icon Block</Label>
            <Select
              value={style.align || "center"}
              onValueChange={(value) => handleStyleChange("align", value as SocialElementStyle['align'])}
            >
              <SelectTrigger id={`social-align-${element.id}`} className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="right">Right</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor={`social-iconstyle-${element.id}`}>Icon Style Preset</Label>
              <Select
                value={style.iconStyle || "color"}
                onValueChange={(value) => handleStyleChange("iconStyle", value as SocialElementStyle['iconStyle'])}
              >
                <SelectTrigger id={`social-iconstyle-${element.id}`} className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="color">Brand Color</SelectItem>
                  <SelectItem value="black">Black</SelectItem>
                  <SelectItem value="white">White</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
                <Label htmlFor={`social-iconsize-${element.id}`}>Icon Size (e.g., 24px)</Label>
                <Input
                    id={`social-iconsize-${element.id}`}
                    value={style.iconSize || "24px"}
                    onChange={(e) => handleStyleChange("iconSize", e.target.value)}
                    className="mt-1"
                    placeholder="24px"
                />
            </div>
          </div>
          <div>
            <Label htmlFor={`social-iconspacing-${element.id}`}>Spacing Between Icons</Label>
            <Input
              id={`social-iconspacing-${element.id}`}
              value={style.iconSpacing || "10px"}
              onChange={(e) => handleStyleChange("iconSpacing", e.target.value)}
              className="mt-1"
              placeholder="10px"
            />
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="spacing">
        <AccordionTrigger>Block Spacing</AccordionTrigger>
        <AccordionContent className="space-y-4 px-1">
          <div className="grid grid-cols-2 gap-2">
            <div><Label>Padding Top</Label><Input value={style.paddingTop || "10px"} onChange={(e) => handleStyleChange("paddingTop", e.target.value)} placeholder="10px" /></div>
            <div><Label>Padding Bottom</Label><Input value={style.paddingBottom || "10px"} onChange={(e) => handleStyleChange("paddingBottom", e.target.value)} placeholder="10px" /></div>
            <div><Label>Margin Top</Label><Input value={style.marginTop || "0px"} onChange={(e) => handleStyleChange("marginTop", e.target.value)} placeholder="0px" /></div>
            <div><Label>Margin Bottom</Label><Input value={style.marginBottom || "0px"} onChange={(e) => handleStyleChange("marginBottom", e.target.value)} placeholder="0px" /></div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}