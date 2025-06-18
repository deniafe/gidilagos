// context/EmailEditorProvider.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useCallback } from "react";
import {
  EmailDesign,
  AnyEmailElement,
  DraggableItem,
  ColumnsEmailElement,
  TextEmailElement,
  ImageEmailElement,
  ButtonEmailElement,
  DividerEmailElement,
  SpacerEmailElement,
  SocialEmailElement,
  EmailEditorColumn,
  EmailGlobalStyle
} from "@/lib/types/email-editor.types";
import { v4 as uuidv4 } from "uuid";

// --- HELPER FUNCTIONS ---

// Inserts an element into a given array at a specific position relative to a target element.
const insertElementIntoArray = (
  arr: AnyEmailElement[],
  elementToAdd: AnyEmailElement,
  targetId: string | null | undefined,
  position: "before" | "after"
): AnyEmailElement[] => {
  if (!targetId) return [...arr, elementToAdd];
  const targetIndex = arr.findIndex(el => el.id === targetId);
  if (targetIndex === -1) return [...arr, elementToAdd];
  const newArr = [...arr];
  newArr.splice(position === "before" ? targetIndex : targetIndex + 1, 0, elementToAdd);
  return newArr;
};

// Recursively finds and removes an element from a nested structure, returning the modified array and the removed element.
const findAndRemoveElementRecursive = (
  elements: AnyEmailElement[],
  elementId: string
): { newArray: AnyEmailElement[], removedElement: AnyEmailElement | null } => {
  let removedElement: AnyEmailElement | null = null;
  const newArray: AnyEmailElement[] = [];

  for (const el of elements) {
    if (el.id === elementId) {
      removedElement = el;
      continue; // Skip adding it to the new array, thus removing it
    }
    if (el.type === 'columns') {
      const columnsEl = el as ColumnsEmailElement;
      let internalChange = false;
      const newColumns = columnsEl.columns.map(col => {
        const result = findAndRemoveElementRecursive(col.elements, elementId);
        if (result.removedElement) {
          removedElement = result.removedElement;
          internalChange = true;
        }
        return { ...col, elements: result.newArray };
      });
      newArray.push({ ...columnsEl, columns: newColumns });
    } else {
      newArray.push(el);
    }
  }
  return { newArray, removedElement };
};

// --- TYPES & CONTEXT DEFINITION ---

interface DropIndicator {
  parentId: string | null;
  targetElementId: string | null;
  position: 'before' | 'after';
}

interface EmailEditorContextType {
  design: EmailDesign;
  selectedElement: AnyEmailElement | null | { type: 'global'; id: 'global_style' };
  dropIndicator: DropIndicator | null;
  addElement: (item: DraggableItem, parentId: string | null, targetElementId?: string | null, position?: "before" | "after") => void;
  updateElement: (elementId: string, updates: Partial<AnyEmailElement> | ((prev: AnyEmailElement) => AnyEmailElement)) => void;
  deleteElement: (elementId: string) => void;
  moveElement: (draggedElementId: string, targetParentId: string | null, targetElementId: string | null, position: "before" | "after") => void;
  setSelectedElement: Dispatch<SetStateAction<AnyEmailElement | null | { type: 'global'; id: 'global_style' }>>;
  setDropIndicator: Dispatch<SetStateAction<DropIndicator | null>>;
  updateGlobalStyle: (updates: Partial<EmailGlobalStyle> | ((prev: EmailGlobalStyle) => EmailGlobalStyle)) => void;
}

const EmailEditorContext = createContext<EmailEditorContextType | undefined>(undefined);

export const defaultEmailDesign: EmailDesign = {
  globalStyle: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#F4F4F4",
    contentBackgroundColor: "#FFFFFF",
    contentWidth: "600px",
    textColor: "#333333",
    linkColor: "#007bff",
  },
  elements: [],
};


// --- PROVIDER COMPONENT ---

export const EmailEditorProvider = ({
  children,
  initialDesign,
}: {
  children: ReactNode;
  initialDesign?: EmailDesign;
}) => {
  const [design, setDesign] = useState<EmailDesign>(initialDesign || JSON.parse(JSON.stringify(defaultEmailDesign)));
  const [selectedElement, setSelectedElement] = useState<AnyEmailElement | null | { type: 'global'; id: 'global_style' }>(null);
  const [dropIndicator, setDropIndicator] = useState<DropIndicator | null>(null);

  const addElement = useCallback((
    item: DraggableItem, parentId: string | null, targetElementId?: string | null, position: "before" | "after" = "after"
  ) => {
    const newElementId = uuidv4();
    const defaultElementData = item.defaultElement();
    let concreteNewElement: AnyEmailElement;
    const baseProperties = {
      id: newElementId,
      name: `${item.label} ${uuidv4().substring(0, 4)}`,
    };

    // Use a switch statement to create a type-safe element object
    switch (item.type) {
      case "text": concreteNewElement = { ...baseProperties, type: "text", ...(defaultElementData as Omit<TextEmailElement, 'id' | 'name'>) }; break;
      case "image": concreteNewElement = { ...baseProperties, type: "image", ...(defaultElementData as Omit<ImageEmailElement, 'id' | 'name'>) }; break;
      case "button": concreteNewElement = { ...baseProperties, type: "button", ...(defaultElementData as Omit<ButtonEmailElement, 'id' | 'name'>) }; break;
      case "divider": concreteNewElement = { ...baseProperties, type: "divider", ...(defaultElementData as Omit<DividerEmailElement, 'id' | 'name'>) }; break;
      case "spacer": concreteNewElement = { ...baseProperties, type: "spacer", ...(defaultElementData as Omit<SpacerEmailElement, 'id' | 'name'>) }; break;
      case "social":
        const socialDefault = defaultElementData as Omit<SocialEmailElement, "id" | "name">;
        concreteNewElement = { ...baseProperties, type: "social", props: { ...socialDefault.props, links: socialDefault.props.links.map(link => ({...link, id: uuidv4()})) }, style: socialDefault.style };
        break;
      case "columns":
        const columnsDefault = defaultElementData as Omit<ColumnsEmailElement, "id" | "name">;
        concreteNewElement = { ...baseProperties, type: "columns", props: columnsDefault.props, style: columnsDefault.style, columns: columnsDefault.columns.map(col => ({ ...col, id: uuidv4(), elements: [] })) };
        break;
      default: console.error("Unknown element type"); return;
    }

    setDesign((prevDesign) => {
      let wasAdded = false;
      let newRootElements = [...prevDesign.elements];

      if (parentId) {
        newRootElements = prevDesign.elements.map(el => {
          if (el.type === 'columns') {
            const columnsEl = el as ColumnsEmailElement;
            let columnFound = false;
            const updatedColumns = columnsEl.columns.map(col => {
              if (col.id === parentId) {
                wasAdded = true;
                columnFound = true;
                return { ...col, elements: insertElementIntoArray(col.elements, concreteNewElement, targetElementId, position) };
              }
              return col;
            });
            if (columnFound) return { ...columnsEl, columns: updatedColumns };
          }
          return el;
        });
      }

      if (!wasAdded) {
        newRootElements = insertElementIntoArray(prevDesign.elements, concreteNewElement, targetElementId, position);
      }
      
      return { ...prevDesign, elements: newRootElements };
    });
    setSelectedElement(concreteNewElement);
  }, []);

  const moveElement = useCallback((
    draggedElementId: string,
    targetParentId: string | null,
    targetElementId: string | null,
    position: "before" | "after"
  ) => {
    let draggedElement: AnyEmailElement | null = null;
    let nextDesign = design;

    // Step 1: Find and Remove the dragged element
    const { newArray: elementsAfterRemoval, removedElement } = findAndRemoveElementRecursive(design.elements, draggedElementId);
    if (removedElement) {
      draggedElement = removedElement;
      nextDesign = { ...design, elements: elementsAfterRemoval };
    } else {
      console.error("Could not find element to move with ID:", draggedElementId);
      return;
    }

    // Step 2: Insert the removed element into its new position
    let wasInserted = false;

    if (targetParentId) { // Dropping into a column
      const newElementsTree = nextDesign.elements.map(el => {
        if (el.type === 'columns') {
          const columnsEl = el as ColumnsEmailElement;
          let columnFound = false;
          const updatedColumns = columnsEl.columns.map(col => {
            if (col.id === targetParentId) {
              wasInserted = true;
              columnFound = true;
              return { ...col, elements: insertElementIntoArray(col.elements, draggedElement!, targetElementId, position) };
            }
            return col;
          });
          if (columnFound) return { ...columnsEl, columns: updatedColumns };
        }
        return el;
      });
      if (wasInserted) {
        nextDesign = { ...nextDesign, elements: newElementsTree };
      }
    }
    
    if (!wasInserted) { // Dropping into the main canvas
      const newRootElements = insertElementIntoArray(nextDesign.elements, draggedElement, targetElementId, position);
      nextDesign = { ...nextDesign, elements: newRootElements };
    }
    
    setDesign(nextDesign);
  }, [design]);


  const updateElement = useCallback((
    elementId: string,
    updates: Partial<AnyEmailElement> | ((prev: AnyEmailElement) => AnyEmailElement)
  ) => {
    let capturedUpdatedElement: AnyEmailElement | undefined;
    setDesign((prevDesign) => {
      const findAndUpdateRecursive = (elements: AnyEmailElement[]): { updatedElements: AnyEmailElement[]; success: boolean } => {
        let success = false;
        const updatedElements = elements.map((el) => {
          if (el.id === elementId) {
            success = true;
            const newElement = typeof updates === "function" ? updates(el) : { ...el, ...updates };
            capturedUpdatedElement = newElement;
            return newElement;
          }
          if (el.type === "columns") {
            const columnsEl = el as ColumnsEmailElement;
            let columnContentChanged = false;
            const newColumns = columnsEl.columns.map((col) => {
              const colResult = findAndUpdateRecursive(col.elements);
              if (colResult.success) { success = true; columnContentChanged = true; }
              return { ...col, elements: colResult.updatedElements };
            });
            return columnContentChanged ? { ...columnsEl, columns: newColumns } : columnsEl;
          }
          return el;
        });
        return { updatedElements, success };
      };
      const result = findAndUpdateRecursive(prevDesign.elements);
      return result.success ? { ...prevDesign, elements: result.updatedElements } : prevDesign;
    });
    if (capturedUpdatedElement) {
      setSelectedElement(capturedUpdatedElement);
    }
  }, []);

  const deleteElement = useCallback((elementId: string) => {
    setDesign((prevDesign) => {
      const { newArray, removedElement } = findAndRemoveElementRecursive(prevDesign.elements, elementId);
      return removedElement ? { ...prevDesign, elements: newArray } : prevDesign;
    });
    if (selectedElement && "id" in selectedElement && selectedElement.id === elementId) {
      setSelectedElement(null);
    }
  }, [selectedElement]);

  const updateGlobalStyle = useCallback((updates: Partial<EmailGlobalStyle> | ((prev: EmailGlobalStyle) => EmailGlobalStyle)) => {
    setDesign(prevDesign => ({
      ...prevDesign,
      globalStyle: typeof updates === 'function' ? updates(prevDesign.globalStyle) : {...prevDesign.globalStyle, ...updates}
    }));
  }, []);

  // Other getter/updater functions that don't need to be exported can be defined here...

  return (
    <EmailEditorContext.Provider
      value={{
        design,
        setDesign,
        selectedElement,
        setSelectedElement,
        addElement,
        updateElement,
        deleteElement,
        moveElement,
        dropIndicator,
        setDropIndicator,
        updateGlobalStyle,
        // The context doesn't need to export every single internal helper
        // Only the ones the UI components will directly call.
      }}
    >
      {children}
    </EmailEditorContext.Provider>
  );
};

export const useEmailEditor = (): EmailEditorContextType => {
  const context = useContext(EmailEditorContext);
  if (!context) {
    throw new Error("useEmailEditor must be used within an EmailEditorProvider");
  }
  return context;
};
