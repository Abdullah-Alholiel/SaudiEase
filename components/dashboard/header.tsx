'use client';

import Link from 'next/link';
import { LanguageToggle } from '@/components/ui/language-toggle';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/lib/contexts/auth-context';
import { UserType, userTypeDescriptions } from '@/lib/utils';
import { Menu, BellIcon, Settings, LogOut, User as UserIcon } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  userType?: UserType;
}

export default function Header({ onMenuClick, userType }: HeaderProps) {
  const { user, signOut } = useAuth();
  const userTypeTitle = userType ? userTypeDescriptions[userType].title : 'User';
  
  return (
    <header className="bg-background border-b border-border sticky top-0 z-30">
      <div className="px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="md:hidden mr-2">
            <Menu className="h-5 w-5" />
          </Button>
          
          <Link href="/dashboard" className="flex items-center gap-2 md:hidden">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">SE</span>
            </div>
            <span className="font-heading font-bold text-lg">Saudi Ease</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground hidden md:inline-block mr-2">
            {userTypeTitle} Dashboard
          </span>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <BellIcon className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="p-4 text-center text-sm text-muted-foreground">
                No new notifications
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <LanguageToggle />
          <ThemeToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <UserIcon className="h-4 w-4 text-secondary-foreground" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                {user?.name || user?.email}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile">
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}