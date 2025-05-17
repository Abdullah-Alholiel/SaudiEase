'use client';

import { ThemeProvider } from 'next-themes';
import { LanguageProvider } from '@/lib/contexts/language-context';
import { UserTypeProvider } from '@/lib/contexts/user-type-context';
import { AuthProvider } from '@/lib/contexts/auth-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LanguageProvider>
        <AuthProvider>
          <UserTypeProvider>
            {children}
          </UserTypeProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}