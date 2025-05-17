'use client';

import { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  
  // Effect to update document direction based on language
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);
  
  // Simple translation function for MVP
  // In a real app, this would use a more robust i18n solution
  const t = (key: string): string => {
    const translations: Record<string, Record<string, string>> = {
      'welcome': {
        'en': 'Welcome to Saudi Ease',
        'ar': 'مرحبًا بكم في سعودي إيز'
      },
      'onboarding.title': {
        'en': 'Begin Your Journey',
        'ar': 'ابدأ رحلتك'
      },
      // Add more translations as needed
    };
    
    return translations[key]?.[language] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};