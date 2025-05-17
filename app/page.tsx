'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { LanguageToggle } from '@/components/ui/language-toggle';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

import { ArrowRight, MapPin, Shield, Clock, Building2, Users, CheckCircle2, Globe, Briefcase, Plane, Star, Phone, Calendar, Check, Palmtree as PalmtreeFill, Landmark, Building, BadgeCheck, Key, HeartHandshake, Home, Newspaper, ChevronRight, Menu, X, Mail, ArrowUpRight } from 'lucide-react';

// Import Aceternity UI components
import { AppleCardsCarousel } from '@/components/ui/aceternity/apple-cards-carousel';
import { SparklesCore } from '@/components/ui/aceternity/sparkles';
import { BackgroundPath } from '@/components/ui/aceternity/background-path';
import { AppleCard as Card3D } from '@/components/ui/aceternity/apple-card';
import { FlipWords } from '@/components/ui/aceternity/flip-words';
import { InfiniteMovingCards } from '@/components/ui/aceternity/infinite-moving-cards';
import { TextGenerateEffect } from '@/components/ui/aceternity/text-generate-effect';
import { BentoGrid, BentoGridItem } from '@/components/ui/aceternity/bento-grid';

// Regions data
const regions = [
  {
    src: 'https://images.pexels.com/photos/5273617/pexels-photo-5273617.jpeg',
    title: 'Riyadh',
    category: 'Capital City',
    content: (
      <div className="space-y-4">
        <p>Riyadh, the capital of Saudi Arabia, is a thriving metropolis that blends modern architecture with rich cultural heritage.</p>
        <ul className="space-y-2">
          <li className="flex items-center gap-2"><Star className="h-4 w-4 text-yellow-500" /> Financial and administrative center</li>
          <li className="flex items-center gap-2"><Star className="h-4 w-4 text-yellow-500" /> Home to iconic landmarks like Kingdom Centre</li>
          <li className="flex items-center gap-2"><Star className="h-4 w-4 text-yellow-500" /> Growing expat community</li>
        </ul>
      </div>
    ),
  },
  {
    src: 'https://images.pexels.com/photos/6098038/pexels-photo-6098038.jpeg',
    title: 'Jeddah',
    category: 'Red Sea Gateway',
    content: (
      <div className="space-y-4">
        <p>Jeddah is Saudi Arabia's commercial hub and the gateway to the holy cities of Mecca and Medina.</p>
        <ul className="space-y-2">
          <li className="flex items-center gap-2"><Star className="h-4 w-4 text-yellow-500" /> Major port city with international connections</li>
          <li className="flex items-center gap-2"><Star className="h-4 w-4 text-yellow-500" /> Historic Al-Balad district</li>
          <li className="flex items-center gap-2"><Star className="h-4 w-4 text-yellow-500" /> Vibrant coastal lifestyle</li>
        </ul>
      </div>
    ),
  },
  {
    src: 'https://images.pexels.com/photos/4825701/pexels-photo-4825701.jpeg',
    title: 'Dammam',
    category: 'Eastern Hub',
    content: (
      <div className="space-y-4">
        <p>Dammam is the capital of the Eastern Province and the center of Saudi Arabia's oil industry.</p>
        <ul className="space-y-2">
          <li className="flex items-center gap-2"><Star className="h-4 w-4 text-yellow-500" /> Major industrial and business center</li>
          <li className="flex items-center gap-2"><Star className="h-4 w-4 text-yellow-500" /> Beautiful corniche and beaches</li>
          <li className="flex items-center gap-2"><Star className="h-4 w-4 text-yellow-500" /> Close to Bahrain via King Fahd Causeway</li>
        </ul>
      </div>
    ),
  },
  {
    src: 'https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg',
    title: 'NEOM',
    category: 'Future City',
    content: (
      <div className="space-y-4">
        <p>NEOM is Saudi Arabia's $500 billion flagship project to build a futuristic megacity.</p>
        <ul className="space-y-2">
          <li className="flex items-center gap-2"><Star className="h-4 w-4 text-yellow-500" /> Focus on sustainability and technology</li>
          <li className="flex items-center gap-2"><Star className="h-4 w-4 text-yellow-500" /> Planned to span 26,500 square kilometers</li>
          <li className="flex items-center gap-2"><Star className="h-4 w-4 text-yellow-500" /> Part of Vision 2030 economic diversification</li>
        </ul>
      </div>
    ),
  },
  {
    src: 'https://images.pexels.com/photos/2739015/pexels-photo-2739015.jpeg',
    title: 'AlUla',
    category: 'Historic Wonder',
    content: (
      <div className="space-y-4">
        <p>AlUla is home to Hegra, Saudi Arabia's first UNESCO World Heritage site with stunning landscapes and ancient history.</p>
        <ul className="space-y-2">
          <li className="flex items-center gap-2"><Star className="h-4 w-4 text-yellow-500" /> 2,000+ years of human history</li>
          <li className="flex items-center gap-2"><Star className="h-4 w-4 text-yellow-500" /> Dramatic desert landscape</li>
          <li className="flex items-center gap-2"><Star className="h-4 w-4 text-yellow-500" /> Exclusive luxury tourism destination</li>
        </ul>
      </div>
    ),
  },
];

// Services data
const services = [
  {
    icon: Plane,
    title: 'Visa & Immigration',
    description: 'Streamlined visa processing, residency permits, and immigration support',
  },
  {
    icon: Briefcase,
    title: 'Business Setup',
    description: 'Company registration, licensing, and market entry strategies',
  },
  {
    icon: Building2,
    title: 'Housing Solutions',
    description: 'Finding the perfect home in your preferred location',
  },
  {
    icon: Key,
    title: 'Property Investment',
    description: 'Real estate consultation and investment opportunities',
  },
  {
    icon: Calendar,
    title: 'Event Planning',
    description: 'Corporate and personal event organization',
  },
  {
    icon: Phone,
    title: '24/7 Support',
    description: 'Round-the-clock assistance for all your needs',
  },
  {
    icon: HeartHandshake,
    title: 'Family Services',
    description: 'School enrollment, healthcare setup, and family support',
  },
];

// Process steps
const processSteps = [
  {
    title: "Initial Consultation",
    description: "We learn about your specific needs and goals for relocating to Saudi Arabia."
  },
  {
    title: "Personalized Plan",
    description: "Our experts create a tailored relocation strategy with timeline and requirements."
  },
  {
    title: "Document Preparation",
    description: "We guide you through gathering and preparing all necessary documentation."
  },
  {
    title: "Application Processing",
    description: "Our team handles submission and follows up with relevant authorities."
  },
  {
    title: "Pre-Arrival Support",
    description: "Housing arrangements, school enrollment, and other pre-arrival preparations."
  },
  {
    title: "Arrival & Settlement",
    description: "Airport pickup, home setup, and orientation to your new surroundings."
  }
];

// Statistics data
const stats = [
  { value: '98%', label: 'Customer Satisfaction' },
  { value: '1000+', label: 'Successful Relocations' },
  { value: '50+', label: 'Corporate Partners' },
  { value: '4', label: 'Major Regions Covered' },
];

// Testimonials data for moving cards
const testimonials = [
  {
    quote: "Saudi Ease made my relocation completely seamless. Their document guidance saved me countless hours and prevented many potential headaches.",
    author: "James Wilson",
    role: "IT Professional from UK",
    rating: 5
  },
  {
    quote: "As an investor, their business insights and connections were invaluable for my market entry. They understand both local regulations and international business needs.",
    author: "Sarah Ahmed",
    role: "Business Investor",
    rating: 5
  },
  {
    quote: "The local knowledge provided helped my family settle in quickly and feel at home in Jeddah. Their school recommendations were perfect for our children.",
    author: "Michael Chen",
    role: "Expat Family",
    rating: 4
  },
  {
    quote: "Moving to NEOM for a tech role would have been overwhelming without Saudi Ease. They simplified the entire process and provided cultural insights that made transition smooth.",
    author: "Priya Sharma",
    role: "Software Engineer",
    rating: 5
  },
  {
    quote: "Their 24/7 support made all the difference when we faced unexpected challenges with our housing. They resolved everything within hours.",
    author: "Robert Johnson",
    role: "Construction Manager",
    rating: 5
  }
];

// FAQ data
const faqs = [
  {
    question: "What visa types does Saudi Ease help with?",
    answer: "We assist with all visa categories including tourist, business, work, family, and premium residency visas. Our team stays updated with the latest regulations and requirements to ensure smooth processing."
  },
  {
    question: "How long does the relocation process typically take?",
    answer: "The timeline varies based on visa type and personal circumstances. Work visas typically take 4-8 weeks, while tourist visas can be processed within days. During your consultation, we'll provide a personalized timeline for your specific situation."
  },
  {
    question: "Do you provide services for families moving to Saudi Arabia?",
    answer: "Absolutely! We offer comprehensive family relocation services including school placement, housing suitable for families, healthcare setup, and cultural adaptation programs for all family members."
  },
  {
    question: "Can you help with business registration in Saudi Arabia?",
    answer: "Yes, we provide end-to-end business setup services including entity formation, licensing, local partnership facilitation, office setup, and compliance guidance aligned with Saudi Vision 2030 initiatives."
  },
  {
    question: "What areas of Saudi Arabia do you cover?",
    answer: "We operate throughout the Kingdom with specialized expertise in major regions including Riyadh, Jeddah, Dammam, and emerging areas like NEOM and AlUla. Our team has local experts in each region."
  }
];

// Latest news
const latestNews = [
  {
    title: "Saudi Ease Expands Services to NEOM Region",
    date: "May 10, 2025",
    description: "We're proud to announce our expansion into the NEOM region, offering specialized relocation services for tech professionals and their families."
  },
  {
    title: "New Premium Residency Program: What You Need to Know",
    date: "April 28, 2025",
    description: "Our experts break down the latest updates to Saudi Arabia's Premium Residency program and how it benefits international professionals."
  },
  {
    title: "Upcoming Webinar: Investing in Saudi Real Estate",
    date: "May 25, 2025",
    description: "Join our panel of experts as they discuss opportunities in the Saudi Arabian real estate market for international investors."
  }
];

// Bento grid items
const bentoItems = [
  {
    title: "Document Management",
    description: "Secure digital storage for all your important documents with status tracking and expiry notifications.",
    icon: <Newspaper className="h-6 w-6 text-primary" />,
    className: "md:col-span-1",
  },
  {
    title: "Local Insights",
    description: "Access our curated database of local recommendations, cultural norms, and insider tips.",
    icon: <Globe className="h-6 w-6 text-primary" />,
    className: "md:col-span-1",
  },
  {
    title: "Concierge Service",
    description: "Premium personalized assistance for all aspects of your Saudi Arabia journey.",
    icon: <BadgeCheck className="h-6 w-6 text-primary" />,
    className: "md:col-span-1",
  },
  {
    title: "Community Network",
    description: "Connect with fellow expats and locals through our exclusive community platform.",
    icon: <Users className="h-6 w-6 text-primary" />,
    className: "md:col-span-2",
  },
  {
    title: "Property Finder",
    description: "AI-powered property matching based on your preferences and requirements.",
    icon: <Home className="h-6 w-6 text-primary" />,
    className: "md:col-span-1",
  },
];

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <main className="min-h-screen overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 p-4 md:p-6 flex justify-between items-center z-50 backdrop-blur-md bg-background/80 border-b border-border/10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-bold">SE</span>
          </div>
          <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Saudi Ease</span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6">
            <Link href="#services" className="text-sm font-medium hover:text-primary transition-colors">Services</Link>
            <Link href="#regions" className="text-sm font-medium hover:text-primary transition-colors">Regions</Link>
            <Link href="#process" className="text-sm font-medium hover:text-primary transition-colors">Process</Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">Testimonials</Link>
            <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</Link>
          </nav>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <Button asChild size="sm" variant="outline" className="ml-2">
              <Link href="/auth/login">Login</Link>
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </header>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background pt-20 px-4 flex flex-col md:hidden">
          <nav className="flex flex-col gap-6 items-center">
            <Link 
              href="#services" 
              className="text-lg font-medium hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              href="#regions" 
              className="text-lg font-medium hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Regions
            </Link>
            <Link 
              href="#process" 
              className="text-lg font-medium hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Process
            </Link>
            <Link 
              href="#testimonials" 
              className="text-lg font-medium hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link 
              href="#contact" 
              className="text-lg font-medium hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <LanguageToggle />
            <Button asChild size="lg" className="w-full mt-4">
              <Link href="/auth/login">Login</Link>
            </Button>
          </nav>
        </div>
      )}

      {/* Hero Section with Sparkles and Text Generation Effect */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-secondary/5 to-background pt-20">
        <div className="absolute inset-0">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#FFD700"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl pt-16 md:pt-24">
          <Badge className="mb-6 bg-secondary/20 text-secondary-foreground hover:bg-secondary/30 transition-colors">
            Simplifying Relocation to Saudi Arabia
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent leading-tight">
            Your Gateway to <br />
            <FlipWords
              words={["Saudi Arabia", "New Opportunities", "Cultural Experience", "Business Growth"]}
              className="text-primary"
            />
          </h1>

          <div className="relative py-10">
            <TextGenerateEffect
              words="Simplifying relocation for tourists, investors, and expats with personalized guidance, document tracking, and local insights tailored to Saudi Arabia's unique landscape."
              className="text-lg md:text-xl text-muted-foreground"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Button asChild size="lg" className="group relative overflow-hidden rounded-lg bg-primary px-4 py-2 text-primary-foreground transition-all duration-300 ease-out hover:bg-primary/90 hover:shadow-md">
              <Link href="/onboarding" className="flex items-center">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary/20 hover:border-primary/50 transition-all duration-300">
              <Link href="/get-started" className="flex items-center">
                Explore Tailored Services
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          {/* Stats cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 md:mt-24">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-md transition-all duration-300">
                <CardContent className="p-4 md:p-6 text-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</h3>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section with Bento Grid */}
      <section id="services" className="py-20 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-2 bg-primary/10 text-primary hover:bg-primary/20 transition-colors">Our Services</Badge>
            <h2 className="text-3xl font-bold mb-4">Comprehensive Relocation Solutions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide end-to-end support for your journey in Saudi Arabia, ensuring a smooth transition
            </p>
          </div>
          
          <BentoGrid className="max-w-6xl mx-auto">
            {services.map((service, index) => (
              <BentoGridItem
                key={index}
                title={service.title}
                description={service.description}
                header={
                  <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg p-8">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                }
                className={index === 0 || index === services.length - 1 ? "md:col-span-2" : ""}
              />
            ))}
          </BentoGrid>
          
          <div className="mt-12 text-center">
            <Button asChild variant="outline" className="group">
              <Link href="/services" className="flex items-center">
                View All Services
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Digital Tools & Features */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-2 bg-secondary/20 text-secondary-foreground hover:bg-secondary/30 transition-colors">Digital Platform</Badge>
            <h2 className="text-3xl font-bold mb-4">Smart Tools for Your Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our digital platform simplifies your relocation experience with intuitive features
            </p>
          </div>
          
          <BentoGrid className="max-w-5xl mx-auto">
            {bentoItems.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                header={
                  <div className="flex items-center justify-center w-full h-full bg-muted rounded-lg p-6">
                    {item.icon}
                  </div>
                }
                className={item.className}
              />
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* Regions Section with AppleCardsCarousel */}
      <section id="regions" className="py-20 bg-gradient-to-b from-background via-secondary/5 to-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-2 bg-accent/20 text-accent-foreground hover:bg-accent/30 transition-colors">Destinations</Badge>
            <h2 className="text-3xl font-bold mb-4">Explore Saudi Regions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover diverse cities and regions where we offer specialized relocation services
            </p>
          </div>
          
          <div className="relative">
            <AppleCardsCarousel>
              {regions.map((region, index) => (
                <Card3D
                  key={index}
                  card={region}
                  index={index}
                  layout
                />
              ))}
            </AppleCardsCarousel>
          </div>
        </div>
      </section>

      {/* Process Timeline Section */}
      <section id="process" className="py-20 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-2 bg-primary/10 text-primary hover:bg-primary/20 transition-colors">Our Process</Badge>
            <h2 className="text-3xl font-bold mb-4">Your Relocation Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our proven process ensures a smooth transition to Saudi Arabia
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent"></div>
            
            {processSteps.map((step, index) => (
              <div 
                key={index} 
                className={`flex flex-col md:flex-row gap-8 mb-12 relative ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center transform -translate-x-4 md:-translate-x-4">
                  <span className="text-sm font-bold">{index + 1}</span>
                </div>
                
                {/* Content */}
                <div className="md:w-1/2 pl-12 md:pl-0 md:pr-12">
                  <Card className={`border-l-4 ${index % 3 === 0 ? 'border-l-primary' : index % 3 === 1 ? 'border-l-secondary' : 'border-l-accent'}`}>
                    <CardHeader>
                      <CardTitle>{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Empty space for timeline alignment */}
                <div className="hidden md:block md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section with InfiniteMovingCards */}
      <section id="testimonials" className="py-20 bg-secondary/5 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-2 bg-secondary/20 text-secondary-foreground hover:bg-secondary/30 transition-colors">Testimonials</Badge>
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from clients who have successfully relocated with our support
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <InfiniteMovingCards
              items={testimonials.map(item => ({ quote: item.quote, name: item.author, title: item.role }))}
              direction="right"
              speed="slow"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-2 bg-primary/10 text-primary hover:bg-primary/20 transition-colors">FAQ</Badge>
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about relocating to Saudi Arabia
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Tabs defaultValue="visa" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="visa">Visa & Legal</TabsTrigger>
                <TabsTrigger value="services">Our Services</TabsTrigger>
                <TabsTrigger value="living">Living in KSA</TabsTrigger>
              </TabsList>
              
              <TabsContent value="visa" className="space-y-4">
                {faqs.slice(0, 3).map((faq, index) => (
                  <Card key={index} className="border-border/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="services" className="space-y-4">
                {faqs.slice(3, 5).map((faq, index) => (
                  <Card key={index} className="border-border/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
                <Card className="border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Are your services available for individuals or just companies?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Saudi Ease provides relocation services for both individuals and companies. Whether you're moving for personal reasons, with your family, or as part of a corporate relocation, our team can tailor our services to meet your specific needs and budget.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="living" className="space-y-4">
                <Card className="border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">What is the cost of living in Saudi Arabia?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      The cost of living varies by city, with Riyadh and Jeddah being more expensive than smaller cities. Housing is typically the largest expense. For a comfortable lifestyle, monthly costs (excluding rent) range from SAR 4,000-8,000 for individuals and SAR 10,000-15,000 for families. We provide detailed cost breakdowns during consultation.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">How is healthcare handled for expatriates?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Employers typically provide health insurance for expatriates and their dependents as part of work contracts. Saudi Arabia has excellent private healthcare facilities in major cities. Our team can help you understand your coverage and connect you with appropriate healthcare providers.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">What should I know about Saudi cultural norms?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Saudi culture is becoming more open while maintaining its Islamic foundations. Modest dress is appreciated regardless of gender. Business interactions often begin with relationship-building. We provide cultural training as part of our relocation packages to help you navigate social and professional situations with confidence.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            <div className="mt-8 text-center">
              <Button asChild variant="outline">
                <Link href="/faq">
                  View All Questions <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-20 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-2 bg-secondary/20 text-secondary-foreground hover:bg-secondary/30 transition-colors">Updates</Badge>
            <h2 className="text-3xl font-bold mb-4">Latest News</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stay informed about relocation trends and Saudi Arabia developments
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {latestNews.map((news, index) => (
              <Card key={index} className="border-border/50 transition-all duration-300 hover:shadow-md hover:border-primary/20">
                <CardHeader>
                  <CardTitle className="text-xl">{news.title}</CardTitle>
                  <CardDescription>{news.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{news.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="p-0 h-auto group text-primary">
                    <span className="flex items-center">
                      Read More
                      <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Button asChild variant="outline">
              <Link href="/news">
                View All News <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section with Contact Form */}
      <section id="contact" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-90 dark:opacity-80 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <Badge className="mb-6 bg-white/20 text-white hover:bg-white/30 border-none">Contact Us</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Your Saudi Arabia Journey?
              </h2>
              <BackgroundPath
                text="Our team of experts is ready to guide you through every step of your relocation. Get personalized assistance tailored to your specific needs."
                className="text-white/80 text-lg mb-8"
              />
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Call Us</h3>
                    <p className="text-white/80">+966 12 345 6789</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Email Us</h3>
                    <p className="text-white/80">info@saudiease.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Visit Us</h3>
                    <p className="text-white/80">King Fahd Road, Riyadh, Saudi Arabia</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white shadow-xl">
              <CardHeader>
                <CardTitle>Get In Touch</CardTitle>
                <CardDescription className="text-white/70">Fill out the form and we'll be in touch shortly</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/90">First Name</label>
                      <Input className="bg-white/20 border-white/20 text-white placeholder:text-white/50" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/90">Last Name</label>
                      <Input className="bg-white/20 border-white/20 text-white placeholder:text-white/50" placeholder="Doe" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/90">Email</label>
                    <Input className="bg-white/20 border-white/20 text-white placeholder:text-white/50" placeholder="john@example.com" type="email" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/90">Interest</label>
                    <select className="w-full rounded-md bg-white/20 border-white/20 text-white p-2 focus:ring-2 focus:ring-white/30 outline-none">
                      <option value="" className="bg-card text-card-foreground">Select your interest</option>
                      <option value="visa" className="bg-card text-card-foreground">Visa & Immigration</option>
                      <option value="business" className="bg-card text-card-foreground">Business Setup</option>
                      <option value="housing" className="bg-card text-card-foreground">Housing Solutions</option>
                      <option value="family" className="bg-card text-card-foreground">Family Relocation</option>
                      <option value="tourism" className="bg-card text-card-foreground">Tourism Support</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/90">Message</label>
                    <textarea rows={4} className="w-full rounded-md bg-white/20 border-white/20 text-white p-2 focus:ring-2 focus:ring-white/30 outline-none resize-none placeholder:text-white/50" placeholder="How can we help you?"></textarea>
                  </div>
                  
                  <Button className="w-full bg-white text-primary hover:bg-white/90">
                    Submit Inquiry
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">SE</span>
                </div>
                <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Saudi Ease</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Simplifying your journey to Saudi Arabia with comprehensive relocation solutions.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Services</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Visa & Immigration</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Business Setup</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Housing Solutions</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Cultural Integration</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Family Services</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Regions</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Riyadh</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Jeddah</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Dammam</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">NEOM</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">AlUla</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Our Team</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © 2025 Saudi Ease. All rights reserved.
            </p>
            <div className="flex items-center gap-2 mt-4 md:mt-0">
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}