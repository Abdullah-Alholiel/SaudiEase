'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/lib/contexts/auth-context';
import { useUserType } from '@/lib/contexts/user-type-context';
import { userTypeDescriptions } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, User, Shield, Bell, Globe, Plane, Briefcase, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { touristInterests, investorInterests, expatInterests, genericInterests } from '@/components/onboarding/preferences';
import { questions } from '@/components/onboarding/questionnaire';
import { CheckboxWithText } from '@/components/ui/checkbox-with-text';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { Question } from '@/components/onboarding/questionnaire';
import type { PreferencesData } from '@/app/onboarding/page';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  phone?: string;
  location?: string;
  userType: 'tourist' | 'investor' | 'expat';
  preferences: {
    interests: string[];
    notifications: {
      email: boolean;
      sms: boolean;
      marketing: boolean;
    };
    appSettings: {
      language: boolean;
      location: boolean;
      offline: boolean;
    };
  };
  questionnaire: Record<string, string>;
}

const ALL_INTERESTS: string[] = [
  'Cultural Experiences', 'Adventure Tourism', 'Shopping & Markets', 'Local Cuisine', 'Events & Festivals',
  'Technology & Innovation', 'Real Estate & Construction', 'Energy & Sustainability', 'Banking & Finance', 'Tourism & Hospitality',
  'Housing & Accommodation', 'Education & Schools', 'Healthcare Services', 'Community & Networking', 'Lifestyle & Recreation',
  'Cultural & Historical Insights', 'Business Opportunities', 'Living & Relocation', 'Travel Information', 'News & Events'
];

const interestsByType = {
  tourist: touristInterests,
  investor: investorInterests,
  expat: expatInterests,
  generic: genericInterests,
};

export default function ProfilePage() {
  const { user } = useAuth();
  const { userType, setUserType } = useUserType();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    nationality: '',
    bio: '',
    language: 'en',
    notifications: {
      email: true,
      push: true,
      sms: false
    }
  });

  const userTypeOptions = [
    { value: 'tourist', label: 'Tourist' },
    { value: 'investor', label: 'Investor' },
    { value: 'expat', label: 'Expat' },
  ];

  useEffect(() => {
    // In a real app, this would fetch from your backend
    // For now, we'll simulate loading the profile
    if (user) {
      // Simulate loading profile data
      const initialProfile: UserProfile = {
        id: user.id,
        email: user.email || '',
        name: user.name || '',
        userType: (userType as 'tourist' | 'investor' | 'expat') || 'tourist',
        preferences: {
          interests: [],
          notifications: {
            email: true,
            sms: false,
            marketing: false
          },
          appSettings: {
            language: false,
            location: true,
            offline: true
          }
        },
        questionnaire: {}
      };
      setProfile(initialProfile);
    }
  }, [user, userType]);

  const handleProfileChange = (field: keyof UserProfile, value: any) => {
    if (!profile) return;
    const updatedProfile = { ...profile, [field]: value };
    setProfile(updatedProfile);
    // Update userType in context if changed
    if (field === 'userType') setUserType(value);
    // Update user in auth context and localStorage
    if (user) {
      const updatedUser = {
        ...user,
        [field]: value,
        preferences: updatedProfile.preferences,
        questionnaire: updatedProfile.questionnaire,
      };
      localStorage.setItem('saudi_ease_user', JSON.stringify(updatedUser));
    }
  };

  const handlePreferencesChange = (section: keyof UserProfile['preferences'], key: string, value: any) => {
    if (!profile) return;
    const updatedPreferences = {
      ...profile.preferences,
      [section]: {
        ...profile.preferences[section],
        [key]: value,
      },
    };
    handleProfileChange('preferences', updatedPreferences);
  };

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading profile...</p>
      </div>
    );
  }

  const currentInterests = interestsByType[profile.userType] || genericInterests;

  const handleInterestCheckbox = (interestId: string, checked: boolean) => {
    if (!profile) return;
    const currentInterests = Array.isArray(profile.preferences.interests) ? profile.preferences.interests : [];
    const interests = checked
      ? [...currentInterests, interestId]
      : currentInterests.filter(i => i !== interestId);
    handlePreferencesChange('interests', '', interests);
  };

  const getUserTypeIcon = (type: string) => {
    switch (type) {
      case 'tourist':
        return <Plane className="h-5 w-5" />;
      case 'investor':
        return <Briefcase className="h-5 w-5" />;
      case 'expat':
        return <Users className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const defaultPreferences: PreferencesData = {
    interests: [],
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      marketingEmails: false
    },
    appSettings: {
      languagePreference: false,
      locationServices: true,
      offlineAccess: true
    }
  };

  const preferences = profile.preferences || defaultPreferences;
  const questionnaire = profile.questionnaire || {};

  const relevantQuestions = questions[profile.userType] || [];

  const notifications = preferences.notifications as any;
  const appSettings = preferences.appSettings as any;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Profile Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <Camera className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg">{profile.name}</h3>
                <p className="text-muted-foreground">{profile.email}</p>
                <Badge className="mt-2" variant="secondary">
                  <span className="flex items-center gap-1">
                    {getUserTypeIcon(profile.userType)}
                    {profile.userType.charAt(0).toUpperCase() + profile.userType.slice(1)}
                  </span>
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          <Tabs defaultValue="personal">
            <TabsList>
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="questionnaire">Questionnaire</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={e => handleProfileChange('name', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profile.phone || ''}
                        onChange={e => handleProfileChange('phone', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profile.location || ''}
                        onChange={e => handleProfileChange('location', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userType">User Type</Label>
                    <Select
                      value={profile.userType}
                      onValueChange={value => handleProfileChange('userType', value as 'tourist' | 'investor' | 'expat')}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select user type" />
                      </SelectTrigger>
                      <SelectContent>
                        {userTypeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>Manage your preferences and settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {/* Interests */}
                    <div>
                      <h3 className="font-medium mb-4">Interests</h3>
                      <div className="grid gap-4">
                        {currentInterests.map((interest) => (
                          <CheckboxWithText
                            key={interest.id}
                            id={interest.id}
                            label={interest.label}
                            description={interest.description}
                            defaultChecked={Array.isArray(preferences.interests) && preferences.interests.includes(interest.id)}
                            onCheckedChange={(checked) => handleInterestCheckbox(interest.id, checked)}
                          />
                        ))}
                      </div>
                    </div>
                    <Separator />
                    {/* Notifications */}
                    <div>
                      <h3 className="font-medium mb-4">Notifications</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-muted-foreground">Receive updates about your applications and documents</p>
                          </div>
                          <Switch
                            checked={notifications.emailNotifications ?? notifications.email ?? false}
                            onCheckedChange={checked => handlePreferencesChange('notifications', 'emailNotifications', checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">SMS Notifications</p>
                            <p className="text-sm text-muted-foreground">Get important alerts via text message</p>
                          </div>
                          <Switch
                            checked={notifications.smsNotifications ?? notifications.sms ?? false}
                            onCheckedChange={checked => handlePreferencesChange('notifications', 'smsNotifications', checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Marketing Emails</p>
                            <p className="text-sm text-muted-foreground">Receive news and offers</p>
                          </div>
                          <Switch
                            checked={notifications.marketingEmails ?? notifications.marketing ?? false}
                            onCheckedChange={checked => handlePreferencesChange('notifications', 'marketingEmails', checked)}
                          />
                        </div>
                      </div>
                    </div>
                    <Separator />
                    {/* App Settings */}
                    <div>
                      <h3 className="font-medium mb-4">App Settings</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Language</p>
                            <p className="text-sm text-muted-foreground">Enable Arabic language support</p>
                          </div>
                          <Switch
                            checked={appSettings.languagePreference ?? appSettings.language ?? false}
                            onCheckedChange={checked => handlePreferencesChange('appSettings', 'languagePreference', checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Location Services</p>
                            <p className="text-sm text-muted-foreground">Enable to get relevant local recommendations</p>
                          </div>
                          <Switch
                            checked={appSettings.locationServices ?? appSettings.location ?? false}
                            onCheckedChange={checked => handlePreferencesChange('appSettings', 'locationServices', checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Offline Access</p>
                            <p className="text-sm text-muted-foreground">Enable offline mode for essential features</p>
                          </div>
                          <Switch
                            checked={appSettings.offlineAccess ?? appSettings.offline ?? false}
                            onCheckedChange={checked => handlePreferencesChange('appSettings', 'offlineAccess', checked)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="questionnaire">
              <Card>
                <CardHeader>
                  <CardTitle>Questionnaire Responses</CardTitle>
                  <CardDescription>Your answers from the onboarding questionnaire</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {relevantQuestions.map((q: Question) => (
                      <div key={q.id} className="space-y-2">
                        <Label className="font-medium">{q.text}</Label>
                        {q.type === 'radio' && (
                          <RadioGroup
                            value={profile.questionnaire[q.id]}
                            onValueChange={val => {
                              const updatedQ = { ...profile.questionnaire, [q.id]: val };
                              handleProfileChange('questionnaire', updatedQ);
                            }}
                          >
                            {q.options?.map((opt: { value: string; label: string }) => (
                              <RadioGroupItem key={opt.value} value={opt.value} id={opt.value} />
                            ))}
                          </RadioGroup>
                        )}
                        {q.type === 'select' && (
                          <Select
                            value={profile.questionnaire[q.id]}
                            onValueChange={val => {
                              const updatedQ = { ...profile.questionnaire, [q.id]: val };
                              handleProfileChange('questionnaire', updatedQ);
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                              {q.options?.map((opt: { value: string; label: string }) => (
                                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                        {q.type === 'text' && (
                          <Input
                            value={profile.questionnaire[q.id] || ''}
                            onChange={e => {
                              const updatedQ = { ...profile.questionnaire, [q.id]: e.target.value };
                              handleProfileChange('questionnaire', updatedQ);
                            }}
                          />
                        )}
                        <Separator />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}