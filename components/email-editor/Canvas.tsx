// components/email-editor/Canvas.tsx
"use client";
import React from "react";
import { useEmailEditor } from "@/context/EmailEditorProvider";
import { AnyEmailElement, DraggableItem as DraggableItemType } from "@/lib/types/email-editor.types";
import RenderedElement from "./RenderedElement";
import { ScrollArea } from "@/components/ui/scroll-area";
import { availableEditorElements } from "@/lib/email-editor.config";

export default function Canvas() {
  const { design, addElement, moveElement, dropIndicator, setDropIndicator, setSelectedElement } = useEmailEditor();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move"; // Use "move" to indicate reordering is possible
    
    // If dragging over empty canvas space, show a general "drop is possible" visual
    if (design.elements.length === 0) {
      e.currentTarget.classList.add("bg-primary/10", "border-primary", "border-dashed");
    } else {
      // If dragging over the general canvas area (not over another element), clear the specific indicator
      // This can prevent a stale indicator from showing if you drag from an element out to the side.
      // A more advanced version could show an indicator at the very end of the list here.
      setDropIndicator({ parentId: null, targetElementId: null, position: 'after' });
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    setDropIndicator(null); // Clear indicator when leaving the main drop zone
    e.currentTarget.classList.remove("bg-primary/10", "border-primary", "border-dashed");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation(); // Stop event from bubbling up
    e.currentTarget.classList.remove("bg-primary/10", "border-primary", "border-dashed");

    const parentId = null; // Dropping on the main canvas has no parent column ID
    
    // Use the indicator state to find where to drop. Fallback to the end of the list.
    const { targetElementId, position } = dropIndicator || { targetElementId: null, position: 'after' };

    setDropIndicator(null); // Clear the visual indicator immediately

    const transferDataString = e.dataTransfer.getData("application/json");
    if (!transferDataString) return;
    
    try {
      const parsedData = JSON.parse(transferDataString);

      if (parsedData.source === "sidebar") { // Case 1: A new element from the sidebar
        const draggableItemDefinition = availableEditorElements.find(item => item.type === parsedData.type);
        if (draggableItemDefinition) {
          addElement(draggableItemDefinition, parentId, targetElementId, position);
        }
      } else if (parsedData.id) { // Case 2: An existing element is being moved
        // Prevent dropping an element onto itself
        if (parsedData.id === targetElementId) return;
        moveElement(parsedData.id, parentId, targetElementId, position);
      }
    } catch (error) {
      console.error("Error handling drop on canvas:", error);
    }
  };
  
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Deselect if the click is on the canvas background itself
    if (e.target === e.currentTarget) { 
      setSelectedElement(null); 
    }
  };

  return (
    <ScrollArea className="flex-1 bg-slate-100 dark:bg-slate-800 p-4 md:p-8" onDragLeave={handleDragLeave}>
      <div
        id="email-canvas-dropzone"
        className="mx-auto bg-white dark:bg-slate-900 shadow-lg border-2 border-transparent transition-colors duration-150 ease-in-out"
        style={{
          width: design.globalStyle.contentWidth || "600px",
          minHeight: "800px", // A good tall height to ensure there's always a drop zone
          backgroundColor: design.globalStyle.contentBackgroundColor || "#FFFFFF",
          fontFamily: design.globalStyle.fontFamily || "Arial, sans-serif",
          color: design.globalStyle.textColor || "#333333",
        }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleCanvasClick}
      >
        {design.elements.length === 0 ? (
          <div className="flex-1 flex items-center justify-center h-full text-muted-foreground pointer-events-none">
            <p>Drag and drop elements here</p>
          </div>
        ) : (
          design.elements.map((element) => (
            <RenderedElement key={element.id} element={element} parentId={null} />
          ))
        )}
        {/* Visual indicator for dropping at the very end of the canvas (when no specific element is targeted) */}
        {dropIndicator && dropIndicator.parentId === null && !dropIndicator.targetElementId && (
            <div className="h-1.5 bg-primary rounded-full my-1" />
        )}
      </div>
    </ScrollArea>
  );
}
