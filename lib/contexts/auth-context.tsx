'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  name?: string;
  profileCompleted: boolean;
  userType?: string;
  preferences?: {
    interests: string[];
  };
  questionnaire?: Record<string, string>;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  
  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, this would verify the session with your backend
        const savedUser = localStorage.getItem('saudi_ease_user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock authentication for MVP
      // In a real app, this would call your authentication API
      const mockUser: User = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        email,
        profileCompleted: false
      };
      
      setUser(mockUser);
      localStorage.setItem('saudi_ease_user', JSON.stringify(mockUser));
      router.push('/dashboard');
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const signUp = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Get onboarding data from localStorage
      const onboardingData = localStorage.getItem('onboardingData');
      const parsedData = onboardingData ? JSON.parse(onboardingData) : null;
      
      // Mock registration for MVP
      // In a real app, this would call your registration API
      const mockUser: User = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        email,
        profileCompleted: !!parsedData,
        userType: parsedData?.userType,
        preferences: parsedData?.preferences,
        questionnaire: parsedData?.questionnaire,
      };
      
      setUser(mockUser);
      localStorage.setItem('saudi_ease_user', JSON.stringify(mockUser));
      // Optionally clear onboardingData
      localStorage.removeItem('onboardingData');
      router.push('/dashboard');
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const signOut = async () => {
    try {
      // Clear user data
      setUser(null);
      localStorage.removeItem('saudi_ease_user');
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };
  
  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};