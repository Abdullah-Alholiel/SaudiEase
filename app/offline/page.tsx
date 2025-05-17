import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { WifiOff } from 'lucide-react';

export default function Offline() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <WifiOff className="h-8 w-8 text-primary" />
        </div>
        
        <h1 className="text-3xl font-heading font-bold">You're Offline</h1>
        
        <p className="text-muted-foreground">
          It looks like you've lost your internet connection. Some features may be unavailable until you're back online.
        </p>
        
        <div className="space-y-3">
          <Button className="w-full" onClick={() => window.location.reload()}>
            Try Again
          </Button>
          
          <Button variant="outline" className="w-full" asChild>
            <Link href="/">
              Go to Homepage
            </Link>
          </Button>
        </div>
        
        <div className="text-sm text-muted-foreground">
          <p>Don't worry, Saudi Ease keeps your important documents available offline.</p>
        </div>
      </div>
    </main>
  );
}