'use client';

import { createContext, useContext, useState } from 'react';

export type UserType = 'tourist' | 'investor' | 'expat' | 'generic' | undefined;

interface UserTypeContextType {
  userType: UserType;
  setUserType: (type: UserType) => void;
}

const UserTypeContext = createContext<UserTypeContextType | undefined>(undefined);

export function UserTypeProvider({ children }: { children: React.ReactNode }) {
  const [userType, setUserType] = useState<UserType>(undefined);
  
  return (
    <UserTypeContext.Provider value={{ userType, setUserType }}>
      {children}
    </UserTypeContext.Provider>
  );
}

export const useUserType = () => {
  const context = useContext(UserTypeContext);
  if (context === undefined) {
    throw new Error('useUserType must be used within a UserTypeProvider');
  }
  return context;
};