'use client';

import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface CheckboxWithTextProps {
  id: string;
  label: string;
  defaultChecked?: boolean;
  description?: string;
  onCheckedChange?: (checked: boolean) => void;
}

export function CheckboxWithText({ 
  id, 
  label, 
  defaultChecked = false,
  description,
  onCheckedChange
}: CheckboxWithTextProps) {
  const [checked, setChecked] = useState(defaultChecked);
  
  const handleChange = (value: boolean) => {
    setChecked(value);
    onCheckedChange?.(value);
  };
  
  return (
    <div className="flex items-start space-x-2">
      <Checkbox 
        id={id} 
        checked={checked} 
        onCheckedChange={handleChange} 
        className="mt-1"
      />
      <div className="grid gap-1">
        <Label 
          htmlFor={id}
          className="cursor-pointer"
        >
          {label}
        </Label>
        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}