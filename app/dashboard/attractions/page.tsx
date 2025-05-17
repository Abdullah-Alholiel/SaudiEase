'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BentoGrid, BentoGridItem } from '@/components/ui/aceternity/bento-grid';
import { Landmark, Mountain, Trees, Building2, Coffee, Star, Search, MapPin } from 'lucide-react';

const attractions = [
  {
    icon: Landmark,
    title: 'Historical Sites',
    description: 'Explore ancient ruins, forts, and archaeological sites',
    category: 'historical',
    rating: 4.8,
    location: 'Riyadh',
  },
  {
    icon: Mountain,
    title: 'Natural Wonders',
    description: 'Discover stunning landscapes and geological formations',
    category: 'nature',
    rating: 4.9,
    location: 'Asir',
  },
  {
    icon: Trees,
    title: 'Desert Adventures',
    description: 'Experience the magic of the Arabian desert',
    category: 'adventure',
    rating: 4.7,
    location: 'Rub\' al Khali',
  },
  {
    icon: Building2,
    title: 'Religious Sites',
    description: 'Visit sacred places and historical mosques',
    category: 'religious',
    rating: 4.9,
    location: 'Mecca',
  },
  {
    icon: Coffee,
    title: 'Cultural Experiences',
    description: 'Immerse yourself in local traditions and customs',
    category: 'cultural',
    rating: 4.6,
    location: 'Jeddah',
  },
];

// Extract unique cities
const allCities = [
  'All',
  ...Array.from(new Set(attractions.map(a => a.location)))
];

export default function AttractionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCity, setSelectedCity] = useState('All');

  const filteredAttractions = attractions.filter(attraction => {
    const matchesSearch = attraction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         attraction.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || attraction.category === activeTab;
    const matchesCity = selectedCity === 'All' || attraction.location === selectedCity;
    return matchesSearch && matchesTab && matchesCity;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Saudi Attractions</h1>
          <p className="text-muted-foreground">
            Discover the rich cultural heritage and natural wonders of Saudi Arabia
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search attractions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="historical">Historical</TabsTrigger>
                <TabsTrigger value="nature">Nature</TabsTrigger>
                <TabsTrigger value="adventure">Adventure</TabsTrigger>
                <TabsTrigger value="religious">Religious</TabsTrigger>
                <TabsTrigger value="cultural">Cultural</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* City filter bar */}
          <div className="w-full overflow-x-auto pb-2">
            <div className="flex gap-2 min-w-max">
              {allCities.map(city => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-4 py-1 rounded-full border transition-colors whitespace-nowrap text-sm font-medium ${selectedCity === city ? 'bg-primary text-primary-foreground border-primary shadow' : 'bg-muted text-muted-foreground border-border hover:bg-primary/10'}`}
                  style={{ minWidth: 80 }}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Responsive grid of cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAttractions.map((attraction) => (
              <Card key={attraction.title} className="flex flex-col h-full shadow-md border-border/30">
                <CardHeader className="flex flex-col items-center bg-gradient-to-br from-primary/10 to-primary/5 rounded-t-lg pb-2">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-2 mt-2">
                    <attraction.icon className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-lg text-center">{attraction.title}</CardTitle>
                  <CardDescription className="text-center text-muted-foreground mt-1">
                    {attraction.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col flex-1 justify-between pt-2 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{attraction.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium">{attraction.rating}</span>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}