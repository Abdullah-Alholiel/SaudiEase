'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useUserType } from '@/lib/contexts/user-type-context';
import { userTypeDescriptions } from '@/lib/utils';
import { Camera, Briefcase, Home, Compass } from 'lucide-react';

interface UserTypeSelectionProps {
  onNextAction: () => void;
  onValidAction: (valid: boolean) => void;
  onBackAction: () => void;
}

export default function UserTypeSelection({ onNextAction, onValidAction, onBackAction }: UserTypeSelectionProps) {
  const { userType, setUserType } = useUserType();
  const [selectedType, setSelectedType] = useState<string>('');
  
  const iconMap = {
    'tourist': <Camera className="h-6 w-6" />,
    'investor': <Briefcase className="h-6 w-6" />,
    'expat': <Home className="h-6 w-6" />,
    'generic': <Compass className="h-6 w-6" />
  };
  
  useEffect(() => {
    if (selectedType) {
      setUserType(selectedType as any);
      onValidAction(true);
    } else {
      onValidAction(false);
    }
  }, [selectedType, setUserType, onValidAction]);
  
  return (
    <div className="space-y-6">
      <p className="text-lg text-muted-foreground">
        Select the option that best describes your interest in Saudi Arabia.
        This helps us personalize your experience.
      </p>
      
      <RadioGroup 
        value={selectedType} 
        onValueChange={setSelectedType}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {Object.entries(userTypeDescriptions).map(([type, details]) => (
          <div key={type} className="relative">
            <RadioGroupItem
              value={type}
              id={type}
              className="peer sr-only"
            />
            <Label
              htmlFor={type}
              className="flex flex-col h-full p-6 rounded-xl border-2 border-muted bg-card hover:bg-accent/5 hover:border-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-colors"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  {iconMap[type as keyof typeof iconMap]}
                </div>
                <span className="font-heading font-medium text-lg">{details.title}</span>
              </div>
              <p className="text-muted-foreground text-sm">{details.description}</p>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}