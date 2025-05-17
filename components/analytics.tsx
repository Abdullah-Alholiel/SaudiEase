'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // This would normally connect to your analytics provider
    // For now we'll just log page views to console
    const url = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    console.log(`Page view: ${url}`);
    
    // Example of how you would track page views with a real analytics service:
    // if (typeof window.gtag === 'function') {
    //   window.gtag('config', 'YOUR-GA-ID', {
    //     page_path: url,
    //   });
    // }
  }, [pathname, searchParams]);

  return null;
}