// components/email-editor/properties/ColumnProperties.tsx
import { ColumnsEmailElement, ColumnsElementStyle, ColumnsElementProps, EmailEditorColumn } from "@/lib/types/email-editor.types";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Trash2, PlusCircle } from "lucide-react";
import { useEmailEditor } from "@/context/EmailEditorProvider"; // To get access to updateColumn or similar
import { v4 as uuidv4 } from "uuid";


interface ColumnPropertiesProps {
  element: ColumnsEmailElement;
  onUpdate: (updates: { style?: Partial<ColumnsElementStyle>, props?: Partial<ColumnsElementProps>, columns?: EmailEditorColumn[] }) => void;
}

export default function ColumnProperties({ element, onUpdate }: ColumnPropertiesProps) {
  // const { updateColumn } = useEmailEditor(); // For updating individual column styles

  const handleRowStyleChange = (key: keyof ColumnsElementStyle, value: any) => {
    onUpdate({ style: { ...element.style, [key]: value } });
  };

  // Handle changing number of columns
  const handleColumnCountChange = (count: number) => {
    const newColumns: EmailEditorColumn[] = [];
    const defaultWidthFactor = 1 / count;
    for (let i = 0; i < count; i++) {
      newColumns.push(
        // Try to preserve existing columns if count decreases, or add new ones
        element.columns[i] ? 
        { ...element.columns[i], widthFactor: defaultWidthFactor } : 
        { id: uuidv4(), widthFactor: defaultWidthFactor, elements: [], style: { paddingLeft: '5px', paddingRight: '5px'} }
      );
    }
    // Distribute width factor if not perfectly divisible, or allow manual adjustment below
    // For now, simple equal distribution.
    const totalFactor = newColumns.reduce((sum, col) => sum + col.widthFactor, 0);
    if (totalFactor !== 1 && newColumns.length > 0) {
        const adjustment = (1 - totalFactor) / newColumns.length;
        newColumns.forEach(col => col.widthFactor += adjustment);
    }

    onUpdate({ columns: newColumns });
  };

  const handleColumnWidthFactorChange = (columnIndex: number, value: string) => {
    const newFactor = parseFloat(value) / 100;
    if (isNaN(newFactor) || newFactor < 0 || newFactor > 1) return;

    const newColumns = element.columns.map((col, idx) => 
      idx === columnIndex ? { ...col, widthFactor: newFactor } : col
    );
    // Optional: Auto-adjust other columns if total exceeds 1, or just allow user to manage.
    // For simplicity, direct update. User needs to ensure sum is 1 (or 100%).
    onUpdate({ columns: newColumns });
  };
  
  const handleIndividualColumnStyleChange = (columnId: string, key: keyof ColumnsEmailElement['style'], value: any) => {
    // updateColumn(columnId, (prevCol) => ({
    //     ...prevCol,
    //     style: {
    //         ...(prevCol.style || {}),
    //         [key]: value,
    //     }
    // }));
  };


  return (
    <Accordion type="multiple" defaultValue={['layout', 'row_spacing', 'column_details']} className="w-full">
      <AccordionItem value="layout">
        <AccordionTrigger>Row Layout</AccordionTrigger>
        <AccordionContent className="space-y-4 px-1">
          <div>
            <Label htmlFor={`cols-count-${element.id}`}>Number of Columns</Label>
            <Select
              value={String(element.columns.length)}
              onValueChange={(value) => handleColumnCountChange(parseInt(value))}
            >
              <SelectTrigger id={`cols-count-${element.id}`} className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4].map(num => ( // Max 4 columns for example
                  <SelectItem key={num} value={String(num)}>{num} Column{num > 1 ? 's' : ''}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="column_details">
        <AccordionTrigger>Column Details & Widths</AccordionTrigger>
        <AccordionContent className="space-y-2 px-1">
          {element.columns.map((col, idx) => (
            <div key={col.id} className="p-2 border rounded space-y-2">
              <Label className="font-medium">Column {idx + 1}</Label>
              <div className="flex items-center space-x-2">
                <Label htmlFor={`col-width-${col.id}`} className="text-xs whitespace-nowrap">Width (%):</Label>
                <Input
                  id={`col-width-${col.id}`}
                  type="number"
                  min="5" max="100" step="1"
                  value={Math.round(col.widthFactor * 100)}
                  onChange={(e) => handleColumnWidthFactorChange(idx, e.target.value)}
                  className="mt-1 h-8"
                />
              </div>
               <div>
                <Label htmlFor={`col-bg-${col.id}`}  className="text-xs">Column BG Color</Label>
                <Input
                  id={`col-bg-${col.id}`}
                  type="color"
                  value={col.style?.backgroundColor || ""}
                  onChange={(e) => handleIndividualColumnStyleChange(col.id, "backgroundColor", e.target.value)}
                  className="mt-1 h-8 w-full"
                />
              </div>
              {/* Add more individual column style inputs here: padding etc. */}
               <div className="grid grid-cols-2 gap-1">
                <div><Label className="text-xs">Pad T</Label><Input value={col.style?.paddingTop || ""} onChange={(e) => handleIndividualColumnStyleChange(col.id, "paddingTop", e.target.value)} placeholder="0px" className="h-8 text-xs" /></div>
                <div><Label className="text-xs">Pad B</Label><Input value={col.style?.paddingBottom || ""} onChange={(e) => handleIndividualColumnStyleChange(col.id, "paddingBottom", e.target.value)} placeholder="0px" className="h-8 text-xs" /></div>
                <div><Label className="text-xs">Pad L</Label><Input value={col.style?.paddingLeft || "5px"} onChange={(e) => handleIndividualColumnStyleChange(col.id, "paddingLeft", e.target.value)} placeholder="5px" className="h-8 text-xs" /></div>
                <div><Label className="text-xs">Pad R</Label><Input value={col.style?.paddingRight || "5px"} onChange={(e) => handleIndividualColumnStyleChange(col.id, "paddingRight", e.target.value)} placeholder="5px" className="h-8 text-xs" /></div>
              </div>
            </div>
          ))}
           <p className="text-xs text-muted-foreground mt-1">Ensure column widths sum to 100% for best results.</p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="row_appearance">
        <AccordionTrigger>Row Appearance (Container)</AccordionTrigger>
        <AccordionContent className="space-y-4 px-1">
          <div>
            <Label htmlFor={`cols-bg-${element.id}`}>Row Background Color</Label>
            <Input
              id={`cols-bg-${element.id}`}
              type="color"
              value={element.style.backgroundColor || ""}
              onChange={(e) => handleRowStyleChange("backgroundColor", e.target.value)}
              className="mt-1 h-10 w-full"
            />
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="row_spacing">
        <AccordionTrigger>Row Spacing (Container)</AccordionTrigger>
        <AccordionContent className="space-y-4 px-1">
          <div className="grid grid-cols-2 gap-2">
            <div><Label>Padding Top</Label><Input value={element.style.paddingTop || "0px"} onChange={(e) => handleRowStyleChange("paddingTop", e.target.value)} placeholder="0px" /></div>
            <div><Label>Padding Bottom</Label><Input value={element.style.paddingBottom || "0px"} onChange={(e) => handleRowStyleChange("paddingBottom", e.target.value)} placeholder="0px" /></div>
            {/* Padding Left/Right for rows is less common, usually columns handle internal padding */}
            <div><Label>Margin Top</Label><Input value={element.style.marginTop || "0px"} onChange={(e) => handleRowStyleChange("marginTop", e.target.value)} placeholder="0px" /></div>
            <div><Label>Margin Bottom</Label><Input value={element.style.marginBottom || "0px"} onChange={(e) => handleRowStyleChange("marginBottom", e.target.value)} placeholder="0px" /></div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}