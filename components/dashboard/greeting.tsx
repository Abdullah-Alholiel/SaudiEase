'use client';

import { useState, useEffect } from 'react';
import { UserType, userTypeDescriptions } from '@/lib/utils';

interface DashboardGreetingProps {
  userType?: UserType;
  userName: string;
}

export default function DashboardGreeting({ userType, userName }: DashboardGreetingProps) {
  const [greeting, setGreeting] = useState('');
  
  // Set greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    let timeGreeting = '';
    
    if (hour < 12) {
      timeGreeting = 'Good morning';
    } else if (hour < 17) {
      timeGreeting = 'Good afternoon';
    } else {
      timeGreeting = 'Good evening';
    }
    
    setGreeting(timeGreeting);
  }, []);
  
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-heading font-bold">
        {greeting}, {userName}!
      </h1>
      <p className="text-muted-foreground">
        {userType ? (
          <>Welcome to your {userTypeDescriptions[userType].title.toLowerCase()} dashboard. Here's your progress so far.</>
        ) : (
          <>Welcome to your dashboard. Here's your progress so far.</>
        )}
      </p>
    </div>
  );
}