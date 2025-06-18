// components/email-editor/elements/ColumnsElementDisplay.tsx
"use client";

import { ColumnsEmailElement, AnyEmailElement, DraggableItem as DraggableItemType } from "@/lib/types/email-editor.types";
import React from "react";
import RenderedElement from "../RenderedElement";
import { useEmailEditor } from "@/context/EmailEditorProvider";
import { cn } from "@/lib/utils";
import { availableEditorElements } from "@/lib/email-editor.config";

interface ColumnsElementDisplayProps {
  element: ColumnsEmailElement;
}

export default function ColumnsElementDisplay({ element }: ColumnsElementDisplayProps) {
  const { addElement, moveElement, dropIndicator, setDropIndicator } = useEmailEditor();

  const handleColumnDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";
    e.currentTarget.classList.add("bg-primary/10", "border-primary", "border-dashed");
    
    // --- FIX IS HERE ---
    // This logic correctly sets a default drop indicator for the column itself.
    // This indicator says "I'm targeting the end of this column".
    // If the user then drags over a specific element within this column, that element's
    // own onDragOver handler will fire and set a more precise indicator, overriding this one.
    const columnId = e.currentTarget.dataset.columnId;

    // By setting this indicator, we ensure empty spaces within the column are always targetable.
    setDropIndicator({ parentId: columnId!, targetElementId: null, position: 'after' });
  };

  const handleColumnDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    // When leaving a column, we should clear the indicator.
    setDropIndicator(null);
    e.currentTarget.classList.remove("bg-primary/10", "border-primary", "border-dashed");
  };

  const handleColumnDrop = (e: React.DragEvent<HTMLDivElement>, columnId: string) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("bg-primary/10", "border-primary", "border-dashed");
    
    // Use the indicator state to find the precise drop location.
    // Fallback to the end of the list if no indicator is set (which this new logic prevents, but good for safety).
    const { targetElementId, position } = dropIndicator || { targetElementId: null, position: 'after' };

    setDropIndicator(null); // Clear the visual indicator after the drop
    
    const transferDataString = e.dataTransfer.getData("application/json");
    if (!transferDataString) return;

    try {
      const parsedData = JSON.parse(transferDataString);
      
      if (parsedData.source === "sidebar") { // New element from the sidebar
        const draggableItemDefinition = availableEditorElements.find(item => item.type === parsedData.type);
        if (draggableItemDefinition) {
          // Add element to this specific column
          addElement(draggableItemDefinition, columnId, targetElementId, position);
        }
      } else if (parsedData.id) { // Existing element being moved
        // Prevent dropping an element onto itself
        if (parsedData.id === targetElementId) return;
        // Move element into this specific column
        moveElement(parsedData.id, columnId, targetElementId, position);
      }
    } catch (error) {
      console.error("Error processing drop into column:", error);
    }
  };
  
  return (
    <div
      className="flex flex-wrap -mx-[5px]" // Negative margin to counteract column padding
      style={{
        paddingTop: element.style.paddingTop || "0px",
        paddingBottom: element.style.paddingBottom || "0px",
        marginTop: element.style.marginTop || "0px",
        marginBottom: element.style.marginBottom || "0px",
        backgroundColor: element.style.backgroundColor,
      }}
    >
      {element.columns.map((column) => (
        <div
          key={column.id}
          className={cn(
            "column-drop-zone border-2 border-transparent min-h-[60px] box-border flex flex-col",
          )}
          style={{
            width: `${column.widthFactor * 100}%`,
            padding: "5px",
            backgroundColor: column.style?.backgroundColor,
            paddingTop: column.style?.paddingTop,
            paddingBottom: column.style?.paddingBottom,
            paddingLeft: column.style?.paddingLeft,
            paddingRight: column.style?.paddingRight,
            marginTop: column.style?.marginTop,
            marginBottom: column.style?.marginBottom,
          }}
          data-column-id={column.id}
          onDragOver={handleColumnDragOver}
          onDragLeave={handleColumnDragLeave}
          onDrop={(e) => handleColumnDrop(e, column.id)}
        >
          {column.elements.length === 0 ? (
            <div className="flex-1 flex items-center justify-center p-2 text-xs text-muted-foreground pointer-events-none border border-dashed border-slate-300 dark:border-slate-700 rounded-md m-[2px]">
              Drop here
            </div>
          ) : (
            column.elements.map((el) => (
              <RenderedElement key={el.id} element={el} parentId={column.id} />
            ))
          )}
          {/* Visual indicator for dropping at the very end of a column */}
          {dropIndicator && dropIndicator.parentId === column.id && !dropIndicator.targetElementId && (
            <div className="h-1.5 bg-primary rounded-full my-1" />
          )}
        </div>
      ))}
    </div>
  );
}