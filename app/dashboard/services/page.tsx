'use client';

import { useState, useRef, useEffect, useId } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { BentoGrid, BentoGridItem } from '@/components/ui/aceternity/bento-grid';
import { ArrowRight, CheckCircle2, Clock, FileText, AlertCircle, Upload, BookOpen, Briefcase, Building2, Key, Calendar, Phone, HeartHandshake, Globe, BadgeCheck, Home, Newspaper, X, Search, ChevronDown } from 'lucide-react';
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

const services = [
  {
    icon: BookOpen,
    title: 'Visa & Immigration',
    description: 'Streamlined visa processing, residency permits, and immigration support',
    src: '/images/services/visa.jpg',
    ctaText: 'Learn More',
    ctaLink: '#',
    content: () => (
      <div className="space-y-4">
        <p>Our comprehensive visa and immigration services simplify your move to Saudi Arabia. We assist with:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Work visas (Iqama)</li>
          <li>Family visas</li>
          <li>Tourist visas</li>
          <li>Business visas</li>
          <li>Residency permits</li>
          <li>Documentation attestation and translation</li>
          <li>Navigating government processes</li>
        </ul>
        <p>We stay updated on the latest regulations to ensure a smooth and compliant application process.</p>
      </div>
    )
  },
  {
    icon: Briefcase,
    title: 'Business Setup',
    description: 'Company registration, licensing, and market entry strategies',
    src: '/images/services/business.jpg',
    ctaText: 'Start Your Business',
    ctaLink: '#',
    content: () => (
      <div className="space-y-4">
        <p>Looking to establish your business in the Kingdom? We provide end-to-end business setup services, including:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Company registration (SAGIA/MISA)</li>
          <li>Obtaining commercial licenses</li>
          <li>Setting up legal structures</li>
          <li>Identifying local partners</li>
          <li>Opening corporate bank accounts</li>
          <li>Compliance and legal guidance</li>
        </ul>
        <p>Leverage our expertise to navigate the Saudi market efficiently and compliantly.</p>
      </div>
    )
  },
  {
    icon: Building2,
    title: 'Housing Solutions',
    description: 'Finding the perfect home in your preferred location',
    src: '/images/services/housing.jpg',
    ctaText: 'Find Your Home',
    ctaLink: '#',
    content: () => (
      <div className="space-y-4">
        <p>Finding the right accommodation is crucial. Our housing solutions cover:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Property search and viewing (apartments, villas, compounds)</li>
          <li>Lease negotiation and contract review</li>
          <li>Relocation assistance</li>
          <li>Furnishing and utility setup support</li>
          <li>Guidance on rental laws and tenant rights</li>
        </ul>
        <p>We help you find a comfortable and suitable home, whether you are an individual or a family.</p>
      </div>
    )
  },
  {
    icon: Key,
    title: 'Property Investment',
    description: 'Real estate consultation and investment opportunities',
    src: '/images/services/investment.jpg',
    ctaText: 'Invest Now',
    ctaLink: '#',
    content: () => (
      <div className="space-y-4">
        <p>Explore lucrative real estate investment opportunities in Saudi Arabia with our expert guidance:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Market analysis and property valuation</li>
          <li>Identifying prime investment locations (Riyadh, Jeddah, NEOM, etc.)</li>
          <li>Assistance with property acquisition</li>
          <li>Legal and regulatory compliance</li>
          <li>Rental management services</li>
        </ul>
        <p>We provide insights into the dynamic Saudi property market for informed investment decisions.</p>
      </div>
    )
  },
  {
    icon: Calendar,
    title: 'Event Planning',
    description: 'Corporate and personal event organization',
    src: '/images/services/events.jpg',
    ctaText: 'Plan Your Event',
    ctaLink: '#',
    content: () => (
      <div className="space-y-4">
        <p>Planning an event in Saudi Arabia? Our event planning services include:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Venue selection and booking</li>
          <li>Vendor management</li>
          <li>Logistics and permits</li>
          <li>Catering and entertainment</li>
          <li>Corporate events, conferences, and personal gatherings</li>
        </ul>
        <p>We ensure your event is successful and hassle-free, leveraging our local network.</p>
      </div>
    )
  },
  {
    icon: Phone,
    title: '24/7 Support',
    description: 'Round-the-clock assistance for all your needs',
    src: '/images/services/support.jpg',
    ctaText: 'Get Support',
    ctaLink: '#',
    content: () => (
      <div className="space-y-4">
        <p>Our dedicated 24/7 support team is always available to assist you with any urgent needs or questions:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Emergency assistance</li>
          <li>Travel support</li>
          <li>General inquiries</li>
          <li>Troubleshooting and guidance</li>
        </ul>
        <p>We are here to provide peace of mind throughout your stay in Saudi Arabia.</p>
      </div>
    )
  },
  {
    icon: HeartHandshake,
    title: 'Family Services',
    description: 'School enrollment, healthcare setup, and family support',
    src: '/images/services/family.jpg',
    ctaText: 'Support Your Family',
    ctaLink: '#',
    content: () => (
      <div className="space-y-4">
        <p>Relocating with family requires special care. Our family services cover:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>School search and enrollment assistance</li>
          <li>Healthcare provider selection and registration</li>
          <li>Cultural orientation and adaptation programs</li>
          <li>Finding family-friendly activities and communities</li>
          <li>Dependent visa processing</li>
        </ul>
        <p>We help your entire family settle in comfortably and quickly.</p>
      </div>
    )
  },
];

const serviceTypes = [
  { value: 'visa', label: 'Visa & Immigration', icon: BookOpen },
  { value: 'business', label: 'Business Setup', icon: Briefcase },
  { value: 'housing', label: 'Housing Solutions', icon: Building2 },
  { value: 'property', label: 'Property Investment', icon: Key },
  { value: 'events', label: 'Event Planning', icon: Calendar },
  { value: 'support', label: '24/7 Support', icon: Phone },
  { value: 'family', label: 'Family Services', icon: HeartHandshake },
];

const CloseIcon = ({ setActive }: { setActive: (active: typeof services[number] | null) => void }) => {
  return (
    <motion.button
      className="flex absolute top-4 right-4 items-center justify-center bg-background/80 text-foreground rounded-full h-8 w-8 z-10 backdrop-blur-sm"
      onClick={(e) => { e.stopPropagation(); setActive(null); }}
    >
      <X className="h-4 w-4" />
    </motion.button>
  );
};

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [active, setActive] = useState<typeof services[number] | null>(null);
  const [openType, setOpenType] = useState(false);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedTypes.length === 0 || 
                       selectedTypes.some(type => service.title.toLowerCase().includes(type.toLowerCase()));
    return matchesSearch && matchesType;
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
          <Badge className="mb-2 bg-secondary/20 text-secondary-foreground">Our Services</Badge>
          <h1 className="text-3xl font-heading font-bold mb-4">Comprehensive Relocation Solutions</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We provide end-to-end support for your journey in Saudi Arabia, ensuring a smooth transition
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mb-12">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full"
              />
            </div>
          </div>

          <Popover open={openType} onOpenChange={setOpenType}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openType}
                className="w-[200px] justify-between"
              >
                {selectedTypes.length === 0
                  ? "Select service types..."
                  : `${selectedTypes.length} selected`}
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search service types..." />
                <CommandList>
                  <CommandEmpty>No service type found.</CommandEmpty>
                  <CommandGroup>
                    {serviceTypes.map((type) => (
                      <CommandItem
                        key={type.value}
                        onSelect={() => {
                          setSelectedTypes((prev) =>
                            prev.includes(type.value)
                              ? prev.filter((t) => t !== type.value)
                              : [...prev, type.value]
                          );
                        }}
                      >
                        <div className="flex items-center">
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedTypes.includes(type.value) ? "opacity-100" : "opacity-0"
                            )}
                          />
                          <span>{type.label}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
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
                <motion.div layoutId={`icon-${active.title}-${id}`} className="flex items-center justify-center w-full bg-secondary/20 rounded-t-lg p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    {active.icon && <active.icon className="h-8 w-8 text-primary" />}
                  </div>
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
                    </div>
                    {active.ctaLink && active.ctaText && (
                      <motion.a
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0,
                                transition: { duration: 0.05 }
                             }}
                        href={active.ctaLink}
                        target="_blank"
                        className="px-6 py-2 text-sm rounded-full font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                      >
                        {active.ctaText}
                      </motion.a>
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

        <BentoGrid className="max-w-7xl mx-auto">
          {filteredServices.map((service, index) => (
            <motion.div
               key={service.title}
               layoutId={`card-${service.title}-${id}`}
               onClick={() => setActive(service)}
               className="cursor-pointer"
            >
              <BentoGridItem
                title={service.title}
                description={
                  <div className="flex flex-col gap-2">
                    <p>{service.description}</p>
                    <div className="flex items-center justify-start mt-2">
                      <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); setActive(service); }}>
                        Learn More
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                }
                header={
                  <motion.div layoutId={`icon-${service.title}-${id}`} className="flex items-center justify-center w-full h-full bg-primary/20 rounded-lg p-8">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      {service.icon && <service.icon className="h-6 w-6 text-primary" />}
                    </div>
                  </motion.div>
                }
              />
            </motion.div>
          ))}
        </BentoGrid>
      </div>
    </main>
  );
}