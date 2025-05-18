'use client';

import { useState, useRef, useEffect, useId } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Landmark, Mountain, Trees, Building2, Coffee, Star, Search, MapPin, X, CalendarDays, Euro, DollarSign, ChevronDown } from 'lucide-react';
import { useOutsideClick } from '@/hooks/use-outside-click';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const attractions = [
  {
    icon: Landmark,
    title: 'Masjid al-Haram (Grand Mosque)',
    description: 'The holiest site in Islam',
    category: 'religious',
    rating: 5.0,
    location: 'Mecca',
    src: '/images/attractions/grand-mosque.jpg',
    bookable: false,
    content: () => (
      <div className="space-y-4">
        <p>Masjid al-Haram is the largest mosque in the world and surrounds the Kaaba. It is the primary destination for Hajj and Umrah pilgrimages.</p>
        <p>Key features include:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>The Kaaba, the most sacred site in Islam</li>
          <li>The Black Stone (Al-Hajar al-Aswad)</li>
          <li>The Station of Abraham (Maqam Ibrahim)</li>
          <li>The well of Zamzam</li>
        </ul>
        <p>While not bookable for entry, guided tours and nearby accommodations are available.</p>
      </div>
    )
  },
  {
    icon: Landmark,
    title: 'Al-Masjid an-Nabawi (Prophet\'s Mosque)',
    description: 'The resting place of the Prophet Muhammad (PBUH)',
    category: 'religious',
    rating: 4.9,
    location: 'Medina',
    src: '/images/attractions/prophets-mosque.jpg',
    bookable: false,
    content: () => (
      <div className="space-y-4">
        <p>Al-Masjid an-Nabawi is a major mosque built by the Prophet Muhammad (PBUH) in the city of Medina. It is the second holiest site in Islam.</p>
        <p>Highlights include:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>The Green Dome, covering the Prophet's tomb</li>
          <li>Rawdah Sharif, a revered area within the mosque</li>
          <li>The Pillars of the Mosque</li>
        </ul>
        <p>Like Masjid al-Haram, entry is not bookable, but the surrounding area offers many services for visitors.</p>
      </div>
    )
  },
  {
    icon: Mountain,
    title: 'Edge of the World',
    description: 'Dramatic cliffs overlooking a vast plain',
    category: 'nature',
    rating: 4.8,
    location: 'Riyadh',
    src: '/images/attractions/edge-of-the-world.jpg',
    bookable: true,
    content: () => (
      <div className="space-y-4">
        <p>The Edge of the World (Jabal Fihrayn) offers breathtaking panoramic views from the top of towering cliffs. It's a popular destination for hiking and camping.</p>
        <p>Activities often include:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Hiking along the cliff edge</li>
          <li>Camping under the stars</li>
          <li>Enjoying stunning sunset and sunrise views</li>
          <li>Exploring the surrounding desert landscape</li>
        </ul>
        <p>Guided tours are available for booking to explore this natural wonder safely and conveniently.</p>
      </div>
    )
  },
  {
    icon: Trees,
    title: 'AlUla Historical Oasis',
    description: 'Ancient city and Nabataean tombs',
    category: 'historical',
    rating: 4.9,
    location: 'AlUla',
    src: '/images/attractions/alula-oasis.jpg',
    bookable: true,
    content: () => (
      <div className="space-y-4">
        <p>AlUla is an ancient oasis city with a rich history, including being a major stop on the incense trade route. It is home to Hegra, a UNESCO World Heritage site.</p>
        <p>Key attractions and experiences:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Hegra (Mada'in Salih), with its monumental Nabataean tombs</li>
          <li>Dadan and Lihyan, ancient Dadanite and Lihyanite capitals</li>
          <li>Jabal Ikmah, an open-air library of inscriptions</li>
          <li>Adventure activities like zip-lining and exploring wadis</li>
        </ul>
        <p>Various tours, experiences, and entry tickets to historical sites in AlUla are available for booking.</p>
      </div>
    )
  },
  {
    icon: Building2,
    title: 'Kingdom Centre Tower',
    description: 'Iconic skyscraper with a skybridge',
    category: 'modern',
    rating: 4.7,
    location: 'Riyadh',
    src: '/images/attractions/kingdom-centre.jpg',
    bookable: true,
    content: () => (
      <div className="space-y-4">
        <p>The Kingdom Centre Tower is one of Riyadh's most famous landmarks. Its unique design and the Skybridge offering panoramic views make it a must-visit.</p>
        <p>Features and amenities:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>The Skybridge on the 99th floor with stunning city views</li>
          <li>Luxury shopping mall</li>
          <li>Fine dining restaurants</li>
          <li>Four Seasons Hotel</li>
        </ul>
        <p>Tickets for the Skybridge can be booked in advance, especially during peak hours.</p>
      </div>
    )
  },
  {
    icon: Coffee,
    title: 'Al-Balad (Historic Jeddah)',
    description: 'UNESCO World Heritage coral architecture',
    category: 'historical',
    rating: 4.8,
    location: 'Jeddah',
    src: '/images/attractions/al-balad.jpg',
    bookable: true,
    content: () => (
      <div className="space-y-4">
        <p>Al-Balad, the historical district of Jeddah, is a UNESCO World Heritage site known for its unique coral-stone buildings and traditional architecture. It's a vibrant area reflecting the city's history as a major port.</p>
        <p>Things to do and see:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Explore historical houses like Naseef House</li>
          <li>Wander through the bustling souqs (markets)</li>
          <li>Admire the distinctive Roshan (wooden balconies)</li>
          <li>Visit historical mosques</li>
        </ul>
        <p>Guided walking tours of Al-Balad are available for booking to fully appreciate its history and architecture.</p>
      </div>
    )
  },
  {
    icon: Mountain,
    title: 'Taif Rose Gardens',
    description: 'Fragrant rose farms in the mountains',
    category: 'nature',
    rating: 4.5,
    location: 'Taif',
    src: '/images/attractions/taif-roses.jpg',
    bookable: true,
    content: () => (
      <div className="space-y-4">
        <p>Taif is famous for its fragrant roses, cultivated in gardens in the mountains. Visiting during the spring allows you to experience the harvest and distillation process.</p>
        <p>Activities include:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Touring rose farms and distilleries</li>
          <li>Learning about rose oil extraction</li>
          <li>Purchasing rose products</li>
          <li>Enjoying the cool mountain climate</li>
        </ul>
        <p>Tours and workshops at rose gardens in Taif are often available for booking.</p>
      </div>
    )
  },
  {
    icon: Trees,
    title: 'Farasan Islands Marine Sanctuary',
    description: 'Biodiverse coral reefs and marine life',
    category: 'nature',
    rating: 4.9,
    location: 'Jazan',
    src: '/images/attractions/farasan-islands.jpg',
    bookable: true,
    content: () => (
      <div className="space-y-4">
        <p>The Farasan Islands are an archipelago in the Red Sea, known for their pristine coral reefs, diverse marine life, and migratory birds. It's a protected marine sanctuary.</p>
        <p>Activities include:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Scuba diving and snorkeling</li>
          <li>Boat trips and island hopping</li>
          <li>Bird watching</li>
          <li>Exploring the islands' historical sites</li>
        </ul>
        <p>Diving excursions, boat trips, and accommodation on the islands can be booked.</p>
      </div>
    )
  },
];

const allCities = Array.from(new Set(attractions.map(a => a.location)));
const allCategories = Array.from(new Set(attractions.map(a => a.category)));

const CloseIcon = ({ setActive }: { setActive: (active: typeof attractions[number] | null) => void }) => {
  return (
    <motion.button
      className="flex absolute top-4 right-4 items-center justify-center bg-background/80 text-foreground rounded-full h-8 w-8 z-10 backdrop-blur-sm"
      onClick={(e) => { e.stopPropagation(); setActive(null); }}
    >
      <X className="h-4 w-4" />
    </motion.button>
  );
};

interface FilterSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const FilterSection = ({ title, description, children }: FilterSectionProps) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center gap-2 mb-1">
      <div className="text-sm font-semibold text-foreground">{title}</div>
      <div className="text-xs text-muted-foreground">{description}</div>
    </div>
    {children}
  </div>
);

export default function AttractionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [active, setActive] = useState<typeof attractions[number] | null>(null);
  const [openCategory, setOpenCategory] = useState(false);
  const [openCity, setOpenCity] = useState(false);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  const filteredAttractions = attractions.filter(attraction => {
    const matchesSearch = attraction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         attraction.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(attraction.category);
    const matchesCity = selectedCities.length === 0 || selectedCities.includes(attraction.location);
    return matchesSearch && matchesCategory && matchesCity;
  });

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-2 bg-accent/20 text-accent-foreground">Discover</Badge>
          <h1 className="text-3xl font-heading font-bold mb-4">Saudi Attractions</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore the rich cultural heritage and natural wonders of Saudi Arabia
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mb-12">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search attractions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full"
              />
            </div>
          </div>

          <Popover open={openCategory} onOpenChange={setOpenCategory}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openCategory}
                className="w-[200px] justify-between"
              >
                {selectedCategories.length === 0
                  ? "Select categories..."
                  : `${selectedCategories.length} selected`}
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search categories..." />
                <CommandList>
                  <CommandEmpty>No category found.</CommandEmpty>
                  <CommandGroup>
                    {allCategories.map((category) => (
                      <CommandItem
                        key={category}
                        onSelect={() => {
                          setSelectedCategories((prev) =>
                            prev.includes(category)
                              ? prev.filter((c) => c !== category)
                              : [...prev, category]
                          );
                        }}
                      >
                        <div className="flex items-center">
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedCategories.includes(category) ? "opacity-100" : "opacity-0"
                            )}
                          />
                          <span>{category}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <Popover open={openCity} onOpenChange={setOpenCity}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openCity}
                className="w-[200px] justify-between"
              >
                {selectedCities.length === 0
                  ? "Select cities..."
                  : `${selectedCities.length} selected`}
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search cities..." />
                <CommandList>
                  <CommandEmpty>No city found.</CommandEmpty>
                  <CommandGroup>
                    {allCities.map((city) => (
                      <CommandItem
                        key={city}
                        onSelect={() => {
                          setSelectedCities((prev) =>
                            prev.includes(city)
                              ? prev.filter((c) => c !== city)
                              : [...prev, city]
                          );
                        }}
                      >
                        <div className="flex items-center">
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedCities.includes(city) ? "opacity-100" : "opacity-0"
                            )}
                          />
                          <span>{city}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAttractions.map((attraction) => (
             <motion.div
                key={attraction.title}
                layoutId={`card-${attraction.title}-${id}`}
                onClick={() => setActive(attraction)}
                className="cursor-pointer"
             >
              <Card className="flex flex-col h-full rounded-lg overflow-hidden shadow-sm border border-border/30">
                <CardHeader className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-b border-border/30">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      {attraction.icon && <attraction.icon className="h-5 w-5 text-primary" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base font-semibold line-clamp-1">
                        {attraction.title}
                      </CardTitle>
                      <CardDescription className="text-xs text-muted-foreground line-clamp-1">
                        {attraction.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 p-4 bg-card/90">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{attraction.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      <span>{attraction.rating}</span>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      variant={attraction.bookable ? 'default' : 'outline'}
                      size="sm"
                      className="px-4 py-1.5 text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActive(attraction);
                      }}
                    >
                      {attraction.bookable ? 'Book Now' : 'View Details'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
             </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 h-full w-full z-50 flex items-center justify-center px-4 py-12"
            >
              <motion.div
                layoutId={`card-${active.title}-${id}`}
                ref={ref}
                className="w-full max-w-3xl max-h-full overflow-y-auto  flex flex-col bg-card text-card-foreground rounded-lg shadow-xl"
              >
                 <CloseIcon setActive={setActive} />

                 <motion.div layoutId={`image-${active.title}-${id}`} className="w-full h-60 md:h-80 overflow-hidden rounded-t-lg">
                   {active.src ? (
                     <img src={active.src} alt={active.title} className="w-full h-full object-cover" />
                   ) : (
                     <div className="flex items-center justify-center w-full h-full bg-secondary/20 rounded-t-lg">
                       {active.icon && <active.icon className="h-16 w-16 text-primary" />}
                     </div>
                   )}
                 </motion.div>

                <div className="p-6">
                   <div className="flex justify-between items-start mb-4">
                      <div className="flex-1 mr-4">
                          <motion.h3
                            layoutId={`title-${active.title}-${id}`}
                            className="font-bold text-2xl mb-1"
                          >
                            {active.title}
                          </motion.h3>
                          <motion.p
                            layoutId={`description-${active.description}-${id}`}
                            className="text-muted-foreground text-base"
                          >
                            {active.description}
                          </motion.p>
                          <div className="flex items-center gap-4 mt-2">
                              <motion.div layoutId={`location-${active.title}-${id}`} className="flex items-center gap-1">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">{active.location}</span>
                              </motion.div>
                              <motion.div layoutId={`rating-${active.title}-${id}`} className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                <span className="text-sm font-medium">{active.rating}</span>
                              </motion.div>
                          </div>
                      </div>

                      {active.bookable && (
                          <motion.button
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                             exit={{ opacity: 0,
                                    transition: { duration: 0.05 }
                                 }}
                             className="px-6 py-2 text-sm rounded-full font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors whitespace-nowrap"
                           >
                             Book Now
                           </motion.button>
                       )}
                   </div>

                   <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0,
                              transition: { duration: 0.05 }
                           }}
                      className="text-muted-foreground text-sm leading-relaxed mt-4"
                   >
                     {typeof active.content === "function"
                       ? active.content()
                       : active.content}
                   </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}