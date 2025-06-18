// components/email-editor/RenderedElement.tsx
"use client";
import React from "react";
import { AnyEmailElement } from "@/lib/types/email-editor.types";
import { useEmailEditor } from "@/context/EmailEditorProvider";
import TextElementDisplay from "./elements/TextElementDisplay";
import ImageElementDisplay from "./elements/ImageElementDisplay";
import ButtonElementDisplay from "./elements/ButtonElementDisplay";
import DividerElementDisplay from "./elements/DividerElementDisplay";
import SpacerElementDisplay from "./elements/SpacerElementDisplay";
import SocialElementDisplay from "./elements/SocialElementDisplay";
import ColumnsElementDisplay from "./elements/ColumnsElementDisplay";
import { Trash2, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface RenderedElementProps {
  element: AnyEmailElement;
  parentId: string | null; // ID of the parent column, or null for root canvas
}

export default function RenderedElement({ element, parentId }: RenderedElementProps) {
  const { selectedElement, setSelectedElement, deleteElement, dropIndicator, setDropIndicator } = useEmailEditor();
  const isSelected = selectedElement?.id === element.id;

  const handleSelectElement = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedElement(element);
  };

  const handleDeleteElement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete this ${element.type} element?`)) {
      deleteElement(element.id);
    }
  };

  // Drag handler for the specific drag handle
  const handleDragStartElement = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.dataTransfer.setData("application/json", JSON.stringify(element));
    e.dataTransfer.effectAllowed = "move";
  };

  // Drag handler to show the drop indicator when dragging over this element
  const handleDragOverElement = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";

    const rect = e.currentTarget.getBoundingClientRect();
    const mouseY = e.clientY;
    const midY = rect.top + rect.height / 2;
    const position = mouseY < midY ? "before" : "after";

    setDropIndicator({
      parentId,
      targetElementId: element.id,
      position,
    });
  };

  const elementDisplayMap: Record<AnyEmailElement['type'], React.FC<{element: any}>> = {
    text: TextElementDisplay,
    image: ImageElementDisplay,
    button: ButtonElementDisplay,
    divider: DividerElementDisplay,
    spacer: SpacerElementDisplay,
    social: SocialElementDisplay,
    columns: ColumnsElementDisplay,
  };

  const ElementDisplayComponent = elementDisplayMap[element.type];

  if (!ElementDisplayComponent) {
    return <div className="p-2 my-1 border border-red-500 bg-red-100">Unknown element type: {element.type}</div>;
  }
  
  const showIndicatorBefore = dropIndicator?.targetElementId === element.id && dropIndicator?.position === 'before';
  const showIndicatorAfter = dropIndicator?.targetElementId === element.id && dropIndicator?.position === 'after';

  return (
    <>
      {showIndicatorBefore && <div className="h-1.5 bg-primary rounded-full my-1" data-testid="drop-indicator-before" />}
      <div
        className={cn(
            "relative group transition-all email-element-wrapper",
            isSelected && "ring-2 ring-primary ring-offset-2 shadow-lg",
            !isSelected && "hover:ring-1 hover:ring-blue-400"
        )}
        style={{ padding: "2px" }}
        onClick={handleSelectElement}
        onDragOver={handleDragOverElement} // The entire element is a drop target
        data-element-id={element.id}
      >
        {isSelected && (
          <div className="absolute -top-3 right-0 z-10 flex items-center space-x-1 p-0.5 bg-background border rounded-full shadow-md">
            {/* The drag handle is now the only draggable part for reordering */}
            <div
              draggable
              onDragStart={handleDragStartElement}
              className="p-1 hover:bg-muted rounded cursor-move"
              title="Move Element"
            >
              <GripVertical size={14} className="text-muted-foreground" />
            </div>
            <button
              onClick={handleDeleteElement}
              className="p-1 text-destructive hover:bg-destructive/10 rounded-full"
              title="Delete Element"
            >
              <Trash2 size={14} />
            </button>
          </div>
        )}
        <div className="element-content" style={{pointerEvents: isSelected ? 'none' : 'auto'}}>
          <ElementDisplayComponent element={element} />
        </div>
      </div>
      {showIndicatorAfter && <div className="h-1.5 bg-primary rounded-full my-1" data-testid="drop-indicator-after" />}
    </>
  );
}
