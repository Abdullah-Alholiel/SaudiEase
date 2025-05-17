'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BentoGrid, BentoGridItem } from '@/components/ui/aceternity/bento-grid';
import { Plane, Briefcase, Building2, Key, Calendar, Phone, HeartHandshake, Search } from 'lucide-react';

const services = [
  {
    icon: Plane,
    title: 'Visa & Immigration',
    description: 'Streamlined visa processing, residency permits, and immigration support',
    status: 'active',
    category: 'immigration',
  },
  {
    icon: Briefcase,
    title: 'Business Setup',
    description: 'Company registration, licensing, and market entry strategies',
    status: 'active',
    category: 'business',
  },
  {
    icon: Building2,
    title: 'Housing Solutions',
    description: 'Finding the perfect home in your preferred location',
    status: 'pending',
    category: 'housing',
  },
  {
    icon: Key,
    title: 'Property Investment',
    description: 'Real estate consultation and investment opportunities',
    status: 'active',
    category: 'investment',
  },
  {
    icon: Calendar,
    title: 'Event Planning',
    description: 'Corporate and personal event organization',
    status: 'completed',
    category: 'events',
  },
  {
    icon: Phone,
    title: '24/7 Support',
    description: 'Round-the-clock assistance for all your needs',
    status: 'active',
    category: 'support',
  },
  {
    icon: HeartHandshake,
    title: 'Family Services',
    description: 'School enrollment, healthcare setup, and family support',
    status: 'pending',
    category: 'family',
  },
];

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || service.category === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">My Services</h1>
          <p className="text-muted-foreground">
            Manage and track your booked services with Saudi Ease
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="immigration">Immigration</TabsTrigger>
                <TabsTrigger value="business">Business</TabsTrigger>
                <TabsTrigger value="housing">Housing</TabsTrigger>
                <TabsTrigger value="investment">Investment</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <BentoGrid className="max-w-7xl mx-auto">
            {filteredServices.map((service, index) => (
              <BentoGridItem
                key={service.title}
                title={service.title}
                description={
                  <div className="flex flex-col gap-2">
                    <p>{service.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant={service.status === 'active' ? 'default' : 'secondary'}>
                        {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                      </Badge>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                }
                header={
                  <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg p-8">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                }
                className={index === 0 || index === filteredServices.length - 1 ? "md:col-span-2" : ""}
              />
            ))}
          </BentoGrid>
        </div>
      </div>
    </div>
  );
}