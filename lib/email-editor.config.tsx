// lib/email-editor.config.ts
import { DraggableItem, TextEmailElement, ImageEmailElement, ButtonEmailElement, DividerEmailElement, SpacerEmailElement, SocialEmailElement, ColumnsEmailElement } from "./types/email-editor.types";
import { Type, Image as LucideImage, MousePointer, MinusSquare, Maximize2, Share2, Columns as ColumnsIcon } from "lucide-react";
import React from "react";
import { v4 as uuidv4 } from 'uuid';

export const availableEditorElements: DraggableItem[] = [
  {
    id: "el_text", type: "text", icon: <Type className="h-5 w-5" />, label: "Text",
    defaultElement: () => ({
      type: "text",
      props: { content: "<p>Edit this text block. You can use <strong>bold</strong>, <em>italics</em>, and <a href='#' target='_blank'>links</a>.</p>" },
      style: { paddingTop: "10px", paddingBottom: "10px", paddingLeft: "15px", paddingRight: "15px", textAlign: "left", color: "#333333", lineHeight: "1.5" }
    }) as Omit<TextEmailElement, "id" | "name">
  },
  {
    id: "el_image", type: "image", icon: <LucideImage className="h-5 w-5" />, label: "Image",
    defaultElement: () => ({
      type: "image",
      props: { src: "https://placehold.co/600x300?text=Drag+Image+Here", alt: "Placeholder Image", href: "" },
      style: { paddingTop: "10px", paddingBottom: "10px", textAlign: "center", width: "100%", height: "auto" }
    }) as Omit<ImageEmailElement, "id" | "name">
  },
  {
    id: "el_button", type: "button", icon: <MousePointer className="h-5 w-5" />, label: "Button",
    defaultElement: () => ({
      type: "button",
      props: { text: "Button Text", href: "#" },
      style: {
        backgroundColor: "#007bff", color: "#ffffff",
        fontFamily: "Arial, sans-serif", fontSize: "16px", fontWeight: "bold",
        padding: "12px 25px", borderRadius: "5px", textAlign: "center",
        paddingTop: "10px", paddingBottom: "10px",
        width: "auto"
      }
    }) as Omit<ButtonEmailElement, "id" | "name">
  },
   {
    id: "el_columns", type: "columns", icon: <ColumnsIcon className="h-5 w-5" />, label: "Columns",
    defaultElement: () => ({
      type: "columns",
      props: { layoutType: "2_col_equal" },
      style: { paddingTop: "5px", paddingBottom: "5px" },
      columns: [
        { id: uuidv4(), widthFactor: 0.5, elements: [] },
        { id: uuidv4(), widthFactor: 0.5, elements: [], style: { padding: "5px"} }
      ]
    }) as Omit<ColumnsEmailElement, "id" | "name">
  },
  {
    id: "el_divider", type: "divider", icon: <MinusSquare className="h-5 w-5" />, label: "Divider",
    defaultElement: () => ({
      type: "divider",
      props: {},
      style: { paddingTop: "10px", paddingBottom: "10px", borderTopColor: "#dddddd", borderTopStyle: "solid", borderTopWidth: "1px" }
    }) as Omit<DividerEmailElement, "id" | "name">
  },
  {
    id: "el_spacer", type: "spacer", icon: <Maximize2 className="h-5 w-5 transform rotate-90" />, label: "Spacer",
    defaultElement: () => ({
      type: "spacer",
      props: {},
      style: { height: "30px" }
    }) as Omit<SpacerEmailElement, "id" | "name">
  },
  {
    id: "el_social", type: "social", icon: <Share2 className="h-5 w-5" />, label: "Social",
    defaultElement: () => ({
      type: "social",
      props: {
        links: [
          { id: uuidv4(), platform: "facebook", url: "#" },
          { id: uuidv4(), platform: "twitter", url: "#" },
          { id: uuidv4(), platform: "instagram", url: "#" },
        ]
      },
      style: { align: "center", paddingTop: "10px", paddingBottom: "10px", iconSpacing: "8px", iconSize: "24px", iconStyle: "color" }
    }) as Omit<SocialEmailElement, "id" | "name">
  },
];