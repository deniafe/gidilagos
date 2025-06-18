// components/email-editor/DraggableElementItem.tsx
"use client";
import React from "react";
import { DraggableItem } from "@/lib/types/email-editor.types";
import { Card, CardContent } from "@/components/ui/card";

interface DraggableElementItemProps {
  item: DraggableItem;
}

export default function DraggableElementItem({ item }: DraggableElementItemProps) {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    // We are transferring the DraggableItem definition,
    // which includes the type and the defaultElement factory.
    const transferData = {
        source: "sidebar", // Indicate it's a new element from the sidebar
        type: item.type,   // The type of element to create
        // We don't transfer the defaultElement function itself via JSON
      };
    e.dataTransfer.setData("application/json", JSON.stringify(transferData));
    e.dataTransfer.effectAllowed = "copy"; // Indicate a copy operation
  };

  return (
    <Card
      draggable
      onDragStart={handleDragStart}
      className="p-0 cursor-grab hover:shadow-lg transition-shadow select-none active:cursor-grabbing border border-border"
    >
      <CardContent className="p-3 flex flex-col items-center justify-center aspect-square">
        <div className="mb-1 text-primary">{item.icon}</div>
        <p className="text-xs text-center text-muted-foreground">{item.label}</p>
      </CardContent>
    </Card>
  );
}