// components/email-editor/PropertiesPanel.tsx
"use client";
import React from "react";
import { useEmailEditor } from "@/context/EmailEditorProvider";
import { ScrollArea } from "@/components/ui/scroll-area";
import TextProperties from "./properties/TextProperties";
import ImageProperties from "./properties/ImageProperties";
import ColumnProperties from "./properties/ColumnProperties";
import GeneralEmailProperties from "./properties/GeneralEmailProperties";
import ButtonProperties from "./properties/ButtonProperties";
// Import other property components as they are created
import DividerProperties from "./properties/DividerProperties";
import SpacerProperties from "./properties/SpacerProperties";
import SocialProperties from "./properties/SocialProperties";


export default function PropertiesPanel() {
  const { selectedElement, updateElement, design, updateGlobalStyle } = useEmailEditor();

  if (!selectedElement) {
    return (
      <aside className="w-80 border-l bg-background p-4">
        <h2 className="text-lg font-semibold mb-4">Properties</h2>
        <p className="text-sm text-muted-foreground">Select an element on the canvas to edit its properties, or select Global Styles from the sidebar.</p>
      </aside>
    );
  }
  
  const isGlobalStyleSelected = selectedElement.type === 'global' && selectedElement.id === 'global_style';

  return (
    <aside className="w-80 border-l bg-background">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">
            {isGlobalStyleSelected ? "Global Email Styles" : `${selectedElement.type.charAt(0).toUpperCase() + selectedElement.type.slice(1)} Properties`}
        </h2>
      </div>
      <ScrollArea className="h-[calc(100vh-120px)] p-4"> {/* Adjust height as needed */}
        {isGlobalStyleSelected && (
            <GeneralEmailProperties
                style={design.globalStyle}
                onUpdate={updateGlobalStyle}
            />
        )}
        {selectedElement.type === "text" && !isGlobalStyleSelected && (
          <TextProperties
            element={selectedElement as any} // Cast for now, will fix with proper type guards
            onUpdate={(updates) => updateElement(selectedElement.id, updates)}
          />
        )}
        {selectedElement.type === "image" && !isGlobalStyleSelected && (
          <ImageProperties
            element={selectedElement as any}
            onUpdate={(updates) => updateElement(selectedElement.id, updates)}
          />
        )}
        {selectedElement.type === "button" && !isGlobalStyleSelected && (
          <ButtonProperties
            element={selectedElement as any}
            onUpdate={(updates) => updateElement(selectedElement.id, updates)}
          />
        )}
         {selectedElement.type === "columns" && !isGlobalStyleSelected && (
          <ColumnProperties
            element={selectedElement as any}
            onUpdate={(updates) => updateElement(selectedElement.id, updates)}
          />
        )}
        {/* Add other property editors here */}
        {selectedElement.type === "divider" && !isGlobalStyleSelected && (
          <DividerProperties
            element={selectedElement as any}
            onUpdate={(updates) => updateElement(selectedElement.id, updates)}
          />
        )}
        {selectedElement.type === "spacer" && !isGlobalStyleSelected && (
          <SpacerProperties
            element={selectedElement as any}
            onUpdate={(updates) => updateElement(selectedElement.id, updates)}
          />
        )}
        {selectedElement.type === "social" && !isGlobalStyleSelected && (
          <SocialProperties
            element={selectedElement as any}
            onUpdate={(updates) => updateElement(selectedElement.id, updates)}
          />
        )}
      </ScrollArea>
    </aside>
  );
}