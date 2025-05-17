import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';






export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Register service worker for PWA functionality
export async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered with scope:', registration.scope);
      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return null;
    }
  }
  return null;
}

// User type descriptions
export const userTypeDescriptions = {
  tourist: {
    title: 'Tourist',
    description: 'Discover Saudi Arabia through guided experiences and easy visa tracking.',
    features: ['Visa tracking', 'Attraction guides', 'Local tips', 'Cultural etiquette'],
    icon: 'camera'
  },
  investor: {
    title: 'Investor',
    description: 'Unlock business opportunities with market insights and setup guidance.',
    features: ['Market insights', 'Business setup workflow', 'Networking', 'Regulatory guidance'],
    icon: 'briefcase'
  },
  expat: {
    title: 'Expat',
    description: 'Settle into your new home with housing assistance and community connections.',
    features: ['Housing finder', 'Document checklist', 'Community connect', 'Cultural adaptation'],
    icon: 'home'
  },
  generic: {
    title: 'Explorer',
    description: 'Browse all options and find your path to Saudi Arabia.',
    features: ['General information', 'All service access', 'Personalized later', 'Flexible journey'],
    icon: 'compass'
  }
};