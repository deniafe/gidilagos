// components/email-editor/elements/DividerElementDisplay.tsx
import { DividerEmailElement } from "@/lib/types/email-editor.types";
import React from "react";

interface DividerElementDisplayProps {
  element: DividerEmailElement;
}

export default function DividerElementDisplay({ element }: DividerElementDisplayProps) {
  const { style } = element;

  const wrapperStyle: React.CSSProperties = {
    paddingTop: style.paddingTop || "10px",
    paddingBottom: style.paddingBottom || "10px",
  };

  const lineStyle: React.CSSProperties = {
    borderTopWidth: style.borderTopWidth || "1px",
    borderTopStyle: style.borderTopStyle || "solid",
    borderTopColor: style.borderTopColor || "#cccccc",
    width: "100%",
  };

  return (
    <div style={wrapperStyle}>
      <div style={lineStyle}></div>
    </div>
  );
}