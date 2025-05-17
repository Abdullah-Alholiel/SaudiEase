'use client';

import { useUserType } from '@/lib/contexts/user-type-context';
import { useAuth } from '@/lib/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardGreeting from '@/components/dashboard/greeting';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  MapPin, 
  Building2, 
  Plane, 
  Briefcase, 
  Users, 
  GraduationCap,
  Home,
  Utensils,
  ShoppingBag,
  Calendar,
  Landmark,
  Car
} from 'lucide-react';

const MotionCard = motion(Card);

export default function Dashboard() {
  const { userType } = useUserType();
  const { user } = useAuth();
  
  // Animation variants for cards
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };
  
  // Tourist-specific services
  const touristServices = [
    {
      title: 'Popular Attractions',
      description: 'Discover Saudi Arabia\'s most visited sites',
      icon: MapPin,
      link: '/dashboard/attractions',
      image: 'https://images.pexels.com/photos/6098038/pexels-photo-6098038.jpeg'
    },
    {
      title: 'Local Experiences',
      description: 'Authentic cultural activities and tours',
      icon: Plane,
      link: '/dashboard/experiences',
      image: 'https://images.pexels.com/photos/9096919/pexels-photo-9096919.jpeg'
    },
    {
      title: 'Dining Guide',
      description: 'Best restaurants and local cuisine',
      icon: Utensils,
      link: '/dashboard/dining',
      image: 'https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg'
    }
  ];
  
  // Investor-specific services
  const investorServices = [
    {
      title: 'Market Insights',
      description: 'Latest investment opportunities and trends',
      icon: Briefcase,
      link: '/dashboard/market-insights',
      image: 'https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg'
    },
    {
      title: 'Business Setup',
      description: 'Guide to establishing your business',
      icon: Building2,
      link: '/dashboard/business-setup',
      image: 'https://images.pexels.com/photos/8297452/pexels-photo-8297452.jpeg'
    },
    {
      title: 'Networking Events',
      description: 'Connect with local business leaders',
      icon: Users,
      link: '/dashboard/networking',
      image: 'https://images.pexels.com/photos/7096/people-woman-coffee-meeting.jpg'
    }
  ];
  
  // Expat-specific services
  const expatServices = [
    {
      title: 'Housing Guide',
      description: 'Find your perfect home in Saudi Arabia',
      icon: Home,
      link: '/dashboard/housing',
      image: 'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg'
    },
    {
      title: 'Education',
      description: 'Schools and educational resources',
      icon: GraduationCap,
      link: '/dashboard/education',
      image: 'https://images.pexels.com/photos/8617769/pexels-photo-8617769.jpeg'
    },
    {
      title: 'Community',
      description: 'Connect with fellow expats',
      icon: Users,
      link: '/dashboard/community',
      image: 'https://images.pexels.com/photos/7096/people-woman-coffee-meeting.jpg'
    }
  ];
  
  // Generic services
  const genericServices = [
    {
      title: 'Explore Saudi',
      description: 'Discover the kingdom\'s attractions',
      icon: MapPin,
      link: '/dashboard/explore',
      image: 'https://images.pexels.com/photos/6098038/pexels-photo-6098038.jpeg'
    },
    {
      title: 'Local Services',
      description: 'Essential services directory',
      icon: Landmark,
      link: '/dashboard/services',
      image: 'https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg'
    },
    {
      title: 'Transportation',
      description: 'Getting around made easy',
      icon: Car,
      link: '/dashboard/transportation',
      image: 'https://images.pexels.com/photos/2996106/pexels-photo-2996106.jpeg'
    }
  ];
  
  // Select services based on user type
  const services = 
    userType === 'tourist' ? touristServices :
    userType === 'investor' ? investorServices :
    userType === 'expat' ? expatServices :
    genericServices;
  
  return (
    <div className="space-y-8">
      <DashboardGreeting userType={userType} userName={user?.name || 'there'} />
      
      {/* Featured Services */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {services.map((service, index) => (
          <MotionCard 
            key={index}
            variants={cardVariants}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div 
              className="h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${service.image})` }}
            />
            <CardHeader>
              <div className="flex items-center space-x-2">
                <service.icon className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </div>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href={service.link}>
                  Explore <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </MotionCard>
        ))}
      </motion.div>
      
      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Links</CardTitle>
          <CardDescription>Frequently accessed services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center text-center" asChild>
              <Link href="/dashboard/documents">
                <Calendar className="h-6 w-6 mb-2" />
                <span>Documents</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center text-center" asChild>
              <Link href="/dashboard/shopping">
                <ShoppingBag className="h-6 w-6 mb-2" />
                <span>Shopping</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center text-center" asChild>
              <Link href="/dashboard/events">
                <Calendar className="h-6 w-6 mb-2" />
                <span>Events</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center text-center" asChild>
              <Link href="/dashboard/support">
                <Users className="h-6 w-6 mb-2" />
                <span>Support</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>Events and activities near you</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div>
                <h3 className="font-medium">Riyadh Season</h3>
                <p className="text-sm text-muted-foreground">Cultural festival and entertainment</p>
              </div>
              <Button variant="outline" size="sm">Learn More</Button>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div>
                <h3 className="font-medium">Business Networking</h3>
                <p className="text-sm text-muted-foreground">Meet local entrepreneurs</p>
              </div>
              <Button variant="outline" size="sm">Learn More</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}