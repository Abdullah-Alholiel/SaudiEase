import './globals.css';
import type { Metadata } from 'next';
import { IBM_Plex_Sans_Arabic, Inter } from 'next/font/google';
import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/toaster';
import { Analytics } from '@/components/analytics';

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  variable: '--font-ibm-plex-sans-arabic',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Saudi Ease | Your Relocation Partner',
  description: 'Facilitating seamless transitions to Saudi Arabia for tourists, investors, and expats.',
  manifest: '/manifest.json',
  themeColor: '#245C36',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#245C36',
} as const;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </head>
      <body className={`${ibmPlexSansArabic.variable} ${inter.variable} font-sans bg-background`}>
        <Providers>
          {children}
          <Toaster />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}