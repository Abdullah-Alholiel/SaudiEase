import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { userTypeDescriptions } from '@/lib/utils';
import { Camera, Briefcase, Home, Compass } from 'lucide-react';

export default function GetStarted() {
  const iconMap = {
    'camera': <Camera className="h-8 w-8" />,
    'briefcase': <Briefcase className="h-8 w-8" />,
    'home': <Home className="h-8 w-8" />,
    'compass': <Compass className="h-8 w-8" />
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              How will you experience Saudi Arabia?
            </h1>
            <p className="text-lg text-muted-foreground">
              Select your profile to get personalized guidance tailored to your needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(userTypeDescriptions).map(([type, details]) => (
              <Card key={type} className="hover:shadow-md transition-shadow border-2 hover:border-primary/50">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                    {iconMap[details.icon as keyof typeof iconMap]}
                  </div>
                  <CardTitle>{details.title}</CardTitle>
                  <CardDescription>{details.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {details.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/auth/register?type=${type}`}>Continue as {details.title}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button asChild variant="ghost">
              <Link href="/auth/register">Skip for now</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}