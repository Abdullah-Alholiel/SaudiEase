'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckboxWithText } from '@/components/ui/checkbox-with-text';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useUserType } from '@/lib/contexts/user-type-context';
import type { PreferencesData } from '@/app/onboarding/page';

interface Interest {
  id: string;
  label: string;
  description: string;
}

interface PreferencesProps {
  onCompleteAction: () => void;
  onValidAction: (valid: boolean) => void;
  onDataAction: (data: PreferencesData) => void;
  onBackAction: () => void;
}

// Tourist preferences
const touristInterests: Interest[] = [
  { 
    id: 'cultural', 
    label: 'Cultural Experiences',
    description: 'Explore historical sites, museums, and traditional events'
  },
  { 
    id: 'adventure', 
    label: 'Adventure Tourism',
    description: 'Desert safaris, hiking, and outdoor activities'
  },
  { 
    id: 'shopping', 
    label: 'Shopping & Markets',
    description: 'Traditional souks and modern shopping centers'
  },
  { 
    id: 'food', 
    label: 'Local Cuisine',
    description: 'Traditional Saudi dishes and food experiences'
  },
  { 
    id: 'events', 
    label: 'Events & Festivals',
    description: 'Stay updated on local festivals and cultural events'
  },
];

// Investor preferences
const investorInterests: Interest[] = [
  { 
    id: 'tech', 
    label: 'Technology & Innovation',
    description: 'Explore tech investment opportunities and innovation hubs'
  },
  { 
    id: 'real-estate', 
    label: 'Real Estate & Construction',
    description: 'Access real estate investment and development opportunities'
  },
  { 
    id: 'energy', 
    label: 'Energy & Sustainability',
    description: 'Discover renewable energy and sustainability projects'
  },
  { 
    id: 'finance', 
    label: 'Banking & Finance',
    description: 'Learn about banking services and financial opportunities'
  },
  { 
    id: 'tourism', 
    label: 'Tourism & Hospitality',
    description: 'Explore tourism and hospitality investment opportunities'
  },
];

// Expat preferences
const expatInterests: Interest[] = [
  { 
    id: 'housing', 
    label: 'Housing & Accommodation',
    description: 'Find suitable housing and accommodation options'
  },
  { 
    id: 'education', 
    label: 'Education & Schools',
    description: 'Access educational resources and school information'
  },
  { 
    id: 'healthcare', 
    label: 'Healthcare Services',
    description: 'Find healthcare providers and medical services'
  },
  { 
    id: 'community', 
    label: 'Community & Networking',
    description: 'Connect with local communities and expat networks'
  },
  { 
    id: 'lifestyle', 
    label: 'Lifestyle & Recreation',
    description: 'Discover lifestyle amenities and recreational activities'
  },
];

// Generic preferences (combined)
const genericInterests: Interest[] = [
  { 
    id: 'cultural', 
    label: 'Cultural & Historical Insights',
    description: 'Learn about local culture and historical significance'
  },
  { 
    id: 'business', 
    label: 'Business Opportunities',
    description: 'Explore business and investment opportunities'
  },
  { 
    id: 'living', 
    label: 'Living & Relocation',
    description: 'Get information about living and relocation services'
  },
  { 
    id: 'travel', 
    label: 'Travel Information',
    description: 'Access travel guides and transportation information'
  },
  { 
    id: 'events', 
    label: 'News & Events',
    description: 'Stay updated on local news and upcoming events'
  },
];

export default function Preferences({ onCompleteAction, onValidAction, onDataAction, onBackAction }: PreferencesProps) {
  const { userType } = useUserType();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [communicationPrefs, setCommunicationPrefs] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: false
  });
  const [appPrefs, setAppPrefs] = useState({
    languagePreference: false,
    locationServices: true,
    offlineAccess: true
  });

  // Determine which interests to show based on user type
  const interests = 
    userType === 'tourist' ? touristInterests :
    userType === 'investor' ? investorInterests :
    userType === 'expat' ? expatInterests :
    genericInterests;

  useEffect(() => {
    onValidAction(selectedInterests.length > 0);
    onDataAction({
      interests: selectedInterests,
      notifications: communicationPrefs,
      appSettings: appPrefs,
    });
  }, [selectedInterests, communicationPrefs, appPrefs, onValidAction, onDataAction]);

  const handleInterestChange = (interestId: string, checked: boolean) => {
    setSelectedInterests(prev => {
      const newInterests = checked
        ? [...prev, interestId]
        : prev.filter(i => i !== interestId);
      return newInterests;
    });
  };

  const handleCommunicationChange = (key: keyof typeof communicationPrefs) => {
    setCommunicationPrefs(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleAppPrefChange = (key: keyof typeof appPrefs) => {
    setAppPrefs(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Select Your Interests</h3>
        <p className="text-sm text-muted-foreground">
          Choose the areas you're most interested in to personalize your experience
        </p>
        
        <div className="grid gap-4">
          {interests.map((interest) => (
            <CheckboxWithText
              key={interest.id}
              id={interest.id}
              label={interest.label}
              description={interest.description}
              defaultChecked={selectedInterests.includes(interest.id)}
              onCheckedChange={(checked) => handleInterestChange(interest.id, checked)}
            />
          ))}
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Communication Preferences</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive updates about your applications and documents
              </p>
            </div>
            <Switch 
              id="email-notifications" 
              checked={communicationPrefs.emailNotifications}
              onCheckedChange={() => handleCommunicationChange('emailNotifications')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sms-notifications">SMS Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Get important alerts via text message
              </p>
            </div>
            <Switch 
              id="sms-notifications"
              checked={communicationPrefs.smsNotifications}
              onCheckedChange={() => handleCommunicationChange('smsNotifications')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="marketing-emails">Marketing Emails</Label>
              <p className="text-sm text-muted-foreground">
                Receive news, updates, and special offers
              </p>
            </div>
            <Switch 
              id="marketing-emails"
              checked={communicationPrefs.marketingEmails}
              onCheckedChange={() => handleCommunicationChange('marketingEmails')}
            />
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">App Preferences</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="language-preference">Preferred Language</Label>
              <p className="text-sm text-muted-foreground">
                Enable Arabic language support
              </p>
            </div>
            <Switch 
              id="language-preference"
              checked={appPrefs.languagePreference}
              onCheckedChange={() => handleAppPrefChange('languagePreference')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="location-services">Location Services</Label>
              <p className="text-sm text-muted-foreground">
                Enable to get relevant local recommendations
              </p>
            </div>
            <Switch 
              id="location-services"
              checked={appPrefs.locationServices}
              onCheckedChange={() => handleAppPrefChange('locationServices')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="offline-access">Offline Access</Label>
              <p className="text-sm text-muted-foreground">
                Save documents and information for offline use
              </p>
            </div>
            <Switch 
              id="offline-access"
              checked={appPrefs.offlineAccess}
              onCheckedChange={() => handleAppPrefChange('offlineAccess')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export { touristInterests, investorInterests, expatInterests, genericInterests };