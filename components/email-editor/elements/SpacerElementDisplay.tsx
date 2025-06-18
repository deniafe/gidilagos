// components/email-editor/elements/SpacerElementDisplay.tsx
import { SpacerEmailElement } from "@/lib/types/email-editor.types";
import React from "react";

interface SpacerElementDisplayProps {
  element: SpacerEmailElement;
}

export default function SpacerElementDisplay({ element }: SpacerElementDisplayProps) {
  const { style } = element;

  const spacerStyle: React.CSSProperties = {
    height: style.height || "20px",
    width: "100%",
    backgroundColor: style.backgroundColor || "transparent",
  };

  return (
    <div style={spacerStyle}>
      {/* The div itself provides the space. For visual aid in the editor: */}
      <div className="h-full w-full bg-slate-100 dark:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-700 opacity-50 flex items-center justify-center text-xs text-muted-foreground pointer-events-none">
        Spacer ({style.height})
      </div>
    </div>
  );
}