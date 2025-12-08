"use client";
import React from 'react';
import { Label } from '@/components/ui/label';

interface ColorPickerProps {
    color: string;
    onColorChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onColorChange }) => {
  const presetColors = [
    '#3F51B5', // Primary
    '#009688', // Accent
    '#FF7A59',
    '#8B5CF6',
    '#EF4444',
    '#10B981',
    '#F59E0B',
    '#6366F1',
  ];

  return (
    <div>
      <Label>Template Color</Label>
      <div className="flex items-center gap-3 mt-2">
        {presetColors.map((presetColor) => (
          <button
            key={presetColor}
            onClick={() => onColorChange(presetColor)}
            className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${
              color === presetColor ? 'border-foreground scale-110' : 'border-border'
            }`}
            style={{ backgroundColor: presetColor }}
            aria-label={`Select color ${presetColor}`}
          />
        ))}
        <input
          type="color"
          value={color}
          onChange={(e) => onColorChange(e.target.value)}
          className="w-10 h-10 rounded-full cursor-pointer border-2 border-border bg-card p-0.5"
          aria-label="Select custom color"
        />
      </div>
    </div>
  );
};

export default ColorPicker;
