'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/contexts/auth-context';
import { useUserType } from '@/lib/contexts/user-type-context';
import { userTypeDescriptions } from '@/lib/utils';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const { setUserType } = useUserType();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const userTypeParam = searchParams.get('type') as keyof typeof userTypeDescriptions | null;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Get onboarding data from localStorage
      const onboardingData = localStorage.getItem('onboardingData');
      const parsedData = onboardingData ? JSON.parse(onboardingData) : null;
      
      // Sign up the user
      await signUp(email, password);
      
      // Set user type if provided in query params or onboarding data
      const finalUserType = userTypeParam || (parsedData?.userType);
      if (finalUserType && finalUserType in userTypeDescriptions) {
        setUserType(finalUserType as any);
      }
      
      // Clear onboarding data from localStorage
      localStorage.removeItem('onboardingData');
      
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      setIsLoading(false);
    }
  };
  
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center mb-2">
            <Button variant="ghost" size="icon" asChild className="mr-2">
              <Link href="/get-started">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <CardTitle>Create your account</CardTitle>
          </div>
          <CardDescription>
            {userTypeParam && userTypeParam in userTypeDescriptions 
              ? `Get started as a ${userTypeDescriptions[userTypeParam].title.toLowerCase()}`
              : 'Get started with Saudi Ease'}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email" 
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                  required
                />
                <Button 
                  type="button"
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-0 top-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Create account'}
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-primary hover:underline">
                Log in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}