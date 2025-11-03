import { useState } from 'react';
import { Monitor, Smartphone, Database, Cog, Palette, PenTool } from 'lucide-react';
import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';
import ScrollReveal from './ScrollReveal';
import { servicesData } from '@/lib/servicesData';

interface ServicesProps {
  liteMode: boolean;
}

type ServiceColor = 'software' | 'digital' | 'branding' | 'marketing' | 'digital2' | 'branding2' | 'marketing2';

interface ServiceExample {
  title: string;
  description: string;
  image: string;
  demoUrl: string;
}

const Services = ({ liteMode }: ServicesProps) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const serviceCategories = [
    {
      id: 'software-web-retail',
      title: 'Web & Retail',
      shortTitle: 'Web',
      icon: Monitor,
      color: 'marketing' as ServiceColor,
      subcategories: servicesData.softwareWebRetail,
    },
    {
      id: 'software-mobile-ai',
      title: 'Mobile & AI',
      shortTitle: 'Mobile',
      icon: Smartphone,
      color: 'digital' as ServiceColor,
      subcategories: servicesData.softwareMobileAI,
    },
    {
      id: 'software-dbms',
      title: 'Database',
      shortTitle: 'DBMS',
      icon: Database,
      color: 'branding' as ServiceColor,
      subcategories: servicesData.softwareDBMS,
    },
    {
      id: 'software-automation',
      title: 'Automation',
      shortTitle: 'Auto',
      icon: Cog,
      color: 'marketing2' as ServiceColor,
      subcategories: servicesData.softwareAutomation,
    },
    {
      id: 'digital',
      title: 'Digital Posts',
      shortTitle: 'Digital',
      icon: Palette,
      color: 'digital2' as ServiceColor,
      subcategories: servicesData.digital,
    },
    {
      id: 'branding',
      title: 'Branding',
      shortTitle: 'Brand',
      icon: PenTool,
      color: 'branding2' as ServiceColor,
      subcategories: servicesData.branding,
    },
  ];

  // Flatten all examples with category info
  const allExamples = serviceCategories.flatMap(category => 
    Object.entries(category.subcategories).flatMap(([_, subData]: [string, any]) =>
      subData.examples.map((example: ServiceExample) => ({
        ...example,
        categoryId: category.id,
        categoryTitle: category.title,
        categoryShortTitle: category.shortTitle,
        categoryColor: category.color,
        categoryIcon: category.icon,
      }))
    )
  );

  // Filter examples
  const filteredExamples = activeFilter === 'all' 
    ? allExamples 
    : allExamples.filter(ex => ex.categoryId === activeFilter);


  const getColorClasses = (color: ServiceColor) => {
    const colorMap = {
      software: {
        bg: 'bg-service-software/20',
        border: 'border-service-software/30',
        text: 'text-service-software',
        glow: 'text-service-software-glow',
        gradient: 'from-service-software to-service-software-glow',
        hover: 'hover:border-service-software hover:shadow-[0_0_20px_hsl(var(--service-software)/0.3)]',
      },
      digital: {
        bg: 'bg-service-digital/20',
        border: 'border-service-digital/30',
        text: 'text-service-digital',
        glow: 'text-service-digital-glow',
        gradient: 'from-service-digital to-service-digital-glow',
        hover: 'hover:border-service-digital hover:shadow-[0_0_20px_hsl(var(--service-digital)/0.3)]',
      },
       digital2: {
        bg: 'bg-service-digital/20',
        border: 'border-service-digital/30',
        text: 'text-service-digital',
        glow: 'text-service-digital-glow',
        gradient: 'from-service-digital-glow to-service-digital',
        hover: 'hover:border-service-digital hover:shadow-[0_0_20px_hsl(var(--service-digital)/0.3)]',
      },
      branding: {
        bg: 'bg-service-branding/20',
        border: 'border-service-branding/30',
        text: 'text-service-branding',
        glow: 'text-service-branding-glow',
        gradient: 'from-service-branding to-service-branding-glow',
        hover: 'hover:border-service-branding hover:shadow-[0_0_20px_hsl(var(--service-branding)/0.3)]',
      },
       branding2: {
        bg: 'bg-service-branding/20',
        border: 'border-service-branding/30',
        text: 'text-service-branding',
        glow: 'text-service-branding-glow',
        gradient: 'from-service-branding-glow to-service-branding',
        hover: 'hover:border-service-branding hover:shadow-[0_0_20px_hsl(var(--service-branding)/0.3)]',
      },
      marketing: {
        bg: 'bg-service-marketing/20',
        border: 'border-service-marketing/30',
        text: 'text-service-marketing',
        glow: 'text-service-marketing-glow',
        gradient: 'from-service-marketing to-service-marketing-glow',
        hover: 'hover:border-service-marketing hover:shadow-[0_0_20px_hsl(var(--service-marketing)/0.3)]',
      },
       marketing2: {
        bg: 'bg-service-marketing/20',
        border: 'border-service-marketing/30',
        text: 'text-service-marketing',
        glow: 'text-service-marketing-glow',
        gradient: 'from-service-marketing-glow to-service-marketing',
        hover: 'hover:border-service-marketing hover:shadow-[0_0_20px_hsl(var(--service-marketing)/0.3)]',
      },
    };
    return colorMap[color];
  };

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-forest-deep/50 to-background" />
      
      {/* Floating particle overlay */}
      {!liteMode && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-leaf-light/40 rounded-full animate-particle-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <ScrollReveal disabled={liteMode}>
          <div className="text-center mb-12 md:mb-16">
            <motion.h2 
              className="text-3xl md:text-5xl font-bold text-holographic mb-4"
              animate={!liteMode ? {
                textShadow: [
                  '0 0 20px rgba(102, 187, 106, 0.5)',
                  '0 0 40px rgba(102, 187, 106, 0.8)',
                  '0 0 20px rgba(102, 187, 106, 0.5)',
                ],
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Our Services
            </motion.h2>
            <p className="text-muted-foreground text-sm md:text-base">Explore our portfolio of creative work</p>
          </div>
        </ScrollReveal>

        {/* Category Filter Pills */}
        <ScrollReveal disabled={liteMode}>
          <div className="flex flex-wrap gap-2 md:gap-3 justify-center mb-8 md:mb-12">
            <motion.button
              whileHover={!liteMode ? { scale: 1.05 } : {}}
              whileTap={!liteMode ? { scale: 0.95 } : {}}
              onClick={() => setActiveFilter('all')}
              className={`
                px-4 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all
                ${activeFilter === 'all' 
                  ? 'bg-gradient-to-r from-service-marketing to-service-marketing-glow text-white shadow-lg' 
                  : 'glass-card border border-border/50 hover:border-service-marketing/50'
                }
              `}
            >
              All Projects
            </motion.button>
            {serviceCategories.map((category) => {
              const Icon = category.icon;
              const colors = getColorClasses(category.color);
              const isActive = activeFilter === category.id;
              
              return (
                <motion.button
                  key={category.id}
                  whileHover={!liteMode ? { scale: 1.05 } : {}}
                  whileTap={!liteMode ? { scale: 0.95 } : {}}
                  onClick={() => setActiveFilter(category.id)}
                  className={`
                    px-3 md:px-5 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all
                    flex items-center gap-1.5 md:gap-2
                    ${isActive 
                      ? `bg-gradient-to-r ${colors.gradient} text-white shadow-lg` 
                      : `glass-card border ${colors.border} hover:${colors.border.replace('/30', '/50')}`
                    }
                  `}
                >
                  <Icon size={14} className="hidden md:block" />
                  <Icon size={12} className="md:hidden" />
                  <span className="hidden sm:inline">{category.title}</span>
                  <span className="sm:hidden">{category.shortTitle}</span>
                </motion.button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredExamples.map((example, index) => {
            const colors = getColorClasses(example.categoryColor);
            const CategoryIcon = example.categoryIcon;
            
            return (
              <ScrollReveal 
                key={`${example.categoryId}-${index}`}
                delay={index * 0.05}
                disabled={liteMode}
              >
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative"
                >
                  {/* Category Badge */}
                  <div className={`
                    absolute -top-2 -right-2 z-10 
                    px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold
                    flex items-center gap-1 md:gap-1.5
                    bg-gradient-to-r ${colors.gradient} text-white
                    shadow-lg backdrop-blur-sm
                  `}>
                    <CategoryIcon size={10} className="md:hidden" />
                    <CategoryIcon size={12} className="hidden md:block" />
                    <span className="hidden sm:inline">{example.categoryTitle}</span>
                    <span className="sm:hidden">{example.categoryShortTitle}</span>
                  </div>

                  {/* Service Card */}
                  <ServiceCard
                    example={example}
                    color={example.categoryColor}
                    liteMode={liteMode}
                  />
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredExamples.length === 0 && (
          <div className="text-center py-12 md:py-20">
            <p className="text-muted-foreground text-sm md:text-base">No projects found in this category</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
