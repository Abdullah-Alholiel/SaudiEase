'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/lib/contexts/auth-context';
import { useUserType } from '@/lib/contexts/user-type-context';
import UserTypeSelection from '@/components/onboarding/user-type-selection';
import Preferences from '@/components/onboarding/preferences';
import Questionnaire from '@/components/onboarding/questionnaire';
import { Check, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

type PreferencesData = {
  interests: string[];
  notifications: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    marketingEmails: boolean;
  };
  appSettings: {
    languagePreference: boolean;
    locationServices: boolean;
    offlineAccess: boolean;
  };
};

export type { PreferencesData };

interface OnboardingData {
  userType: string;
  questionnaire: Record<string, string>;
  preferences: PreferencesData;
}

type OnboardingStep = 'user-type' | 'questionnaire' | 'preferences';

export default function Onboarding() {
  const router = useRouter();
  const { user } = useAuth();
  const { userType, setUserType } = useUserType();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('user-type');
  const [isCompleted, setIsCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stepValidity, setStepValidity] = useState({
    userType: false,
    questionnaire: false,
    preferences: false
  });
  const [questionnaireData, setQuestionnaireData] = useState<Record<string, string>>({});
  const [preferencesData, setPreferencesData] = useState<PreferencesData>({
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
  });
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    userType: '',
    questionnaire: {},
    preferences: {
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
    }
  });

  // Redirect to dashboard if user is already logged in
  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  useEffect(() => {
    if (userType) {
      setOnboardingData(prev => ({ ...prev, userType }));
      setStepValidity(prev => ({ ...prev, userType: true }));
      if (currentStep === 'user-type') {
        setCurrentStep('questionnaire');
      }
    }
  }, [userType, currentStep]);

  const handleUserTypeValid = (valid: boolean) => {
    setStepValidity(prev => ({ ...prev, userType: valid }));
  };

  const handleQuestionnaireValid = (valid: boolean) => {
    setStepValidity(prev => ({ ...prev, questionnaire: valid }));
  };

  const handleQuestionnaireData = (data: Record<string, string>) => {
    setOnboardingData(prev => ({ ...prev, questionnaire: data }));
  };

  const handlePreferencesValid = (valid: boolean) => {
    setStepValidity(prev => ({ ...prev, preferences: valid }));
  };

  const handlePreferencesData = (data: PreferencesData) => {
    setOnboardingData(prev => ({ ...prev, preferences: data }));
    setPreferencesData(data);
  };

  const prevStep = () => {
    if (currentStep === 'questionnaire') {
      setCurrentStep('user-type');
      setStepValidity(prev => ({ ...prev, questionnaire: false }));
      setUserType('' as any);
    } else if (currentStep === 'preferences') {
      setCurrentStep('questionnaire');
      setStepValidity(prev => ({ ...prev, preferences: false }));
    }
  };

  const nextStep = () => {
    if (currentStep === 'user-type') {
      setCurrentStep('questionnaire');
    } else if (currentStep === 'questionnaire') {
      setCurrentStep('preferences');
    } else {
      completeOnboarding();
    }
  };

  const completeOnboarding = async () => {
    try {
      // Save onboarding data to localStorage
      const onboardingData = {
        userType,
        preferences: preferencesData,
        questionnaire: questionnaireData,
      };
      localStorage.setItem('onboardingData', JSON.stringify(onboardingData));
      
      // Set completion state
      setIsCompleted(true);
      
      // Redirect to sign up page after a short delay
      setTimeout(() => {
        router.push('/auth/register');
      }, 2000);
    } catch (error) {
      console.error('Error completing onboarding:', error);
      setError('Failed to complete onboarding. Please try again.');
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 'user-type':
        return stepValidity.userType;
      case 'questionnaire':
        return stepValidity.questionnaire;
      case 'preferences':
        return stepValidity.preferences;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'user-type':
        return (
          <UserTypeSelection
            onNextAction={nextStep}
            onValidAction={handleUserTypeValid}
            onBackAction={() => router.push('/')}
          />
        );
      case 'questionnaire':
        return (
          <Questionnaire
            onCompleteAction={nextStep}
            onValidAction={handleQuestionnaireValid}
            onDataAction={handleQuestionnaireData}
            onBackAction={prevStep}
          />
        );
      case 'preferences':
        return (
          <Preferences
            onCompleteAction={nextStep}
            onValidAction={handlePreferencesValid}
            onDataAction={handlePreferencesData}
            onBackAction={prevStep}
          />
        );
      default:
        return null;
    }
  };

  const getStepNumber = (step: OnboardingStep): number => {
    switch (step) {
      case 'user-type': return 1;
      case 'questionnaire': return 2;
      case 'preferences': return 3;
      default: return 1;
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {isCompleted ? (
          <motion.div 
            className="flex flex-col items-center justify-center h-[80vh]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <Check className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl font-heading font-bold mb-4">All Set!</h1>
            <p className="text-muted-foreground text-center mb-8">
              Your preferences have been saved. Redirecting you to sign up...
            </p>
            <Progress value={100} className="w-full max-w-md" />
          </motion.div>
        ) : (
          <>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h1 className="text-2xl font-heading font-bold">
                    {currentStep === 'user-type' ? 'Select User Type' : 
                     currentStep === 'questionnaire' ? 'Complete Questionnaire' : 
                     'Set Preferences'}
                  </h1>
                </div>
                <span className="text-sm text-muted-foreground">
                  Step {getStepNumber(currentStep)} of 3
                </span>
              </div>
              <Progress value={((getStepNumber(currentStep) - 1) / 3) * 100} className="h-2" />
            </div>

            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode="wait">
                {renderStep()}
              </AnimatePresence>
            </motion.div>

            <div className="flex justify-between mt-8">
              {currentStep !== 'user-type' && (
                <Button
                  variant="outline"
                  onClick={prevStep}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </Button>
              )}
              {currentStep === 'user-type' && (
                <Button
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className="ml-auto flex items-center gap-2"
                >
                  Continue
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
              {currentStep === 'questionnaire' && (
                <Button
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className="ml-auto flex items-center gap-2"
                >
                  Next Step
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
              {currentStep === 'preferences' && (
                <Button
                  onClick={completeOnboarding}
                  disabled={!isStepValid()}
                  className="ml-auto"
                >
                  Complete Setup
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}