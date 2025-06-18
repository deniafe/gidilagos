// components/email-editor/elements/TextElementDisplay.tsx
import { TextEmailElement } from "@/lib/types/email-editor.types";
import React from "react";

interface TextElementDisplayProps {
  element: TextEmailElement;
}

export default function TextElementDisplay({ element }: TextElementDisplayProps) {
  return (
    <div
      style={{
        paddingTop: element.style.paddingTop || "0px",
        paddingBottom: element.style.paddingBottom || "0px",
        paddingLeft: element.style.paddingLeft || "0px",
        paddingRight: element.style.paddingRight || "0px",
        marginTop: element.style.marginTop || "0px",
        marginBottom: element.style.marginBottom || "0px",
        backgroundColor: element.style.backgroundColor,
        color: element.style.color,
        fontFamily: element.style.fontFamily,
        fontSize: element.style.fontSize,
        fontWeight: element.style.fontWeight,
        lineHeight: element.style.lineHeight,
        textAlign: element.style.textAlign,
      }}
      dangerouslySetInnerHTML={{ __html: element.props.content }}
    />
  );
}