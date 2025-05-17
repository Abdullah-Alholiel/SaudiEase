'use client';

import { useLanguage } from '@/lib/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };
  
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleLanguage}
      className="relative"
      aria-label={`Switch to ${language === 'en' ? 'Arabic' : 'English'}`}
    >
      <Globe className="h-5 w-5" />
      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold opacity-70">
        {language === 'en' ? 'AR' : 'EN'}
      </span>
    </Button>
  );
}