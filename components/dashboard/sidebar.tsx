'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { UserType } from '@/lib/contexts/user-type-context';
import { 
  LayoutDashboard, 
  FileText, 
  Map, 
  Home, 
  Briefcase, 
  Users, 
  Calendar, 
  HelpCircle,
  Camera,
  Compass,
  MessageSquare,
  PanelLeft,
  Landmark,
  User,
  Settings,
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
  userType?: UserType;
}

export default function Sidebar({ open, userType }: SidebarProps) {
  const pathname = usePathname();
  
  // Base navigation items (common for all user types)
  const baseNavItems = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      title: 'Services',
      href: '/dashboard/services',
      icon: Briefcase,
    },
    {
      title: 'Attractions',
      href: '/dashboard/attractions',
      icon: Landmark,
    },
    {
      title: 'Documents',
      href: '/dashboard/documents',
      icon: FileText,
    },
    {
      title: 'Support',
      href: '/dashboard/support',
      icon: HelpCircle,
    },
  ];
  
  // User type specific navigation items
  const touristNavItems = [
    {
      title: 'Visa Tracking',
      href: '/dashboard/visa-tracking',
      icon: FileText,
    },
    {
      title: 'Attractions',
      href: '/dashboard/attractions',
      icon: Map,
    },
    {
      title: 'Local Tips',
      href: '/dashboard/local-tips',
      icon: Camera,
    },
  ];
  
  const investorNavItems = [
    {
      title: 'Market Insights',
      href: '/dashboard/market-insights',
      icon: Briefcase,
    },
    {
      title: 'Business Setup',
      href: '/dashboard/business-setup',
      icon: FileText,
    },
    {
      title: 'Networking',
      href: '/dashboard/networking',
      icon: Users,
    },
  ];
  
  const expatNavItems = [
    {
      title: 'Housing',
      href: '/dashboard/housing',
      icon: Home,
    },
    {
      title: 'Document Checklist',
      href: '/dashboard/document-checklist',
      icon: FileText,
    },
    {
      title: 'Community',
      href: '/dashboard/community',
      icon: Users,
    },
  ];
  
  const genericNavItems = [
    {
      title: 'Explore',
      href: '/dashboard/explore',
      icon: Compass,
    },
    {
      title: 'Events',
      href: '/dashboard/events',
      icon: Calendar,
    },
    {
      title: 'Messages',
      href: '/dashboard/messages',
      icon: MessageSquare,
    },
  ];
  
  // Determine which nav items to show based on user type
  const userTypeNavItems = 
    userType === 'tourist' ? touristNavItems :
    userType === 'investor' ? investorNavItems :
    userType === 'expat' ? expatNavItems :
    genericNavItems;
  
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => open = false}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-card border-r border-border md:sticky transition-transform duration-300 ease-in-out",
        open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        {/* Sidebar header */}
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">SE</span>
            </div>
            <span className="font-heading font-bold text-lg">Saudi Ease</span>
          </Link>
        </div>
        
        {/* Sidebar content */}
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="px-3 py-4">
            <div className="space-y-1 py-2">
              {baseNavItems.map((item) => (
                <Button
                  key={item.href}
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon className="mr-2 h-5 w-5" />
                    {item.title}
                  </Link>
                </Button>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-1 py-2">
              <h3 className="px-4 text-sm font-medium text-muted-foreground">
                Personalized
              </h3>
              {userTypeNavItems.map((item) => (
                <Button
                  key={item.href}
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon className="mr-2 h-5 w-5" />
                    {item.title}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  );
}