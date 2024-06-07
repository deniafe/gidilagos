import React from 'react';
import { useEditor } from '@craftjs/core';

export const PropertiesPanel: React.FC = () => {
  const { actions, selectedNodeId, selected } = useEditor((state) => {
    const selectedNodeIds = Array.from(state.events.selected);
    const selectedNodeId = selectedNodeIds[0];
    return {
      selectedNodeId,
      selected: selectedNodeId ? state.nodes[selectedNodeId]?.data : null,
    };
  });

  if (!selected) {
    return <div className="w-64 bg-gray-200 p-4">Select a component to edit its properties</div>;
  }

  const { name, props } = selected;

  const handleChange = (key: string, value: string) => {
    actions.setProp(selectedNodeId, (prop: any) => {
      prop[key] = value;
    });
  };

  return (
    <div className="w-64 bg-gray-200 p-4">
      <h2 className="text-xl mb-4">Properties</h2>
      <h3 className="text-lg">{name}</h3>
      <div className="space-y-2">
        {Object.keys(props).map((key) => (
          <div key={key} className="flex flex-col">
            <label className="text-sm">{key}</label>
            <input
              type={key === 'color' ? 'color' : 'text'}
              value={props[key]}
              onChange={(e) => handleChange(key, e.target.value)}
              className="p-1 border rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
