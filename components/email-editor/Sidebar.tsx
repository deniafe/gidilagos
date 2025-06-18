// components/email-editor/Sidebar.tsx
"use client";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import DraggableElementItem from "./DraggableElementItem";
import { DraggableItem as DraggableItemType } from "@/lib/types/email-editor.types";
import { Heading1, Image as ImageIcon, MousePointer, Minus, Pilcrow, Share2, Columns, Palette } from "lucide-react";
import { useEmailEditor } from "@/context/EmailEditorProvider";
import { Button } from "../ui/button";


// Define available elements for the sidebar
// This should ideally come from a configuration file
const availableElements: DraggableItemType[] = [
  { id: "el_text", type: "text", icon: <Pilcrow className="h-5 w-5" />, label: "Text", defaultElement: () => ({ type: "text", props: { content: "<p>New Text Block</p>" }, style: { paddingTop: "10px", paddingBottom: "10px", textAlign: "left" }})},
  { id: "el_image", type: "image", icon: <ImageIcon className="h-5 w-5" />, label: "Image", defaultElement: () => ({ type: "image", props: { src: "https://placehold.co/600x200?text=New+Image", alt: "Placeholder" }, style: { paddingTop: "10px", paddingBottom: "10px", textAlign: "center" }})},
  { id: "el_button", type: "button", icon: <MousePointer className="h-5 w-5" />, label: "Button", defaultElement: () => ({ type: "button", props: { text: "Click Me", href: "#" }, style: { backgroundColor: "#007bff", color: "#ffffff", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "20px", paddingRight: "20px", borderRadius: "5px", textAlign: "center" }})},
  { id: "el_divider", type: "divider", icon: <Minus className="h-5 w-5" />, label: "Divider", defaultElement: () => ({ type: "divider", props: {}, style: { paddingTop: "10px", paddingBottom: "10px", borderTopColor: "#cccccc", borderTopStyle: "solid", borderTopWidth: "1px" }})},
  { id: "el_spacer", type: "spacer", icon: <div className="h-5 w-5 flex items-center justify-center text-xs font-mono">{"<S>"}</div>, label: "Spacer", defaultElement: () => ({ type: "spacer", props: {}, style: { height: "20px" }})},
  { id: "el_social", type: "social", icon: <Share2 className="h-5 w-5" />, label: "Social Icons", defaultElement: () => ({ type: "social", props: { links: [{id: "default-fb", platform: "facebook", url: "#"}, {id: "default-tw", platform: "twitter", url: "#"}] }, style: { align: "center", paddingTop: "10px", paddingBottom: "10px" }})},
  { id: "el_columns", type: "columns", icon: <Columns className="h-5 w-5" />, label: "Columns", defaultElement: () => ({ type: "columns", props: { layoutType: "2_col_equal" }, style: {}, columns: [{ id: "col_default_1", widthFactor: 0.5, elements: [], style:{paddingLeft:"5px", paddingRight:"5px"} }, { id: "col_default_2", widthFactor: 0.5, elements: [], style:{paddingLeft:"5px", paddingRight:"5px"} }] })},
];


export default function Sidebar() {
  const { setSelectedElement } = useEmailEditor();
  return (
    <aside className="w-72 border-r bg-background flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Elements</h2>
      </div>
      <ScrollArea className="flex-1 p-2">
        <div className="grid grid-cols-2 gap-2">
          {availableElements.map((item) => (
            <DraggableElementItem key={item.id} item={item} />
          ))}
        </div>
      </ScrollArea>
       <div className="p-4 border-t mt-auto">
        <Button variant="outline" className="w-full" onClick={() => setSelectedElement({type: 'global', id: 'global_style'})}>
            <Palette className="h-4 w-4 mr-2" /> Global Styles
        </Button>
      </div>
    </aside>
  );
}