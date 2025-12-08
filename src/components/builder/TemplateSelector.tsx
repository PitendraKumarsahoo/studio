"use client";
import React from 'react';

interface TemplateSelectorProps {
    selectedTemplate: string;
    onSelectTemplate: (templateId: string) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ selectedTemplate, onSelectTemplate }) => {
  const templates = [
    { id: 'primo', name: 'Primo' },
    { id: 'diamond', name: 'Diamond' },
    { id: 'cascade', name: 'Cascade' },
    { id: 'concept', name: 'Concept' },
    { id: 'muse', name: 'Muse' },
    { id: 'iconic', name: 'Iconic' },
    { id: 'influx', name: 'Influx' },
    { id: 'modern', name: 'Modern' },
    { id: 'minimo', name: 'Minimo' },
    { id: 'academic', name: 'Academic' },
    { id: 'primo-blue', name: 'Primo Blue' },
    { id: 'diamond-green', name: 'Diamond Green' },
    { id: 'cascade-purple', name: 'Cascade Purple' },
    { id: 'concept-teal', name: 'Concept Teal' },
    { id: 'muse-coral', name: 'Muse Coral' },
    { id: 'iconic-navy', name: 'Iconic Navy' },
    { id: 'influx-red', name: 'Influx Red' },
    { id: 'modern-gray', name: 'Modern Gray' },
    { id: 'minimo-black', name: 'Minimo Black' },
  ];

  return (
    <div>
      <h3 className="font-semibold mb-3">Choose Template</h3>
      <div className="grid grid-cols-3 gap-2">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelectTemplate(template.id)}
            className={`p-2 rounded-lg border-2 text-center transition-all hover:shadow-md text-xs ${
              selectedTemplate === template.id
                ? 'border-primary bg-primary/10 font-bold'
                : 'border-border hover:border-primary/50'
            }`}
          >
            {template.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;

    