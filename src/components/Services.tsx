import { useState } from 'react';
import { Monitor, Smartphone, Database, Cog, Palette, PenTool } from 'lucide-react';
import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';
import { ScrollSection } from './ScrollSection';
import { WhisperText } from './WhisperText';
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
      {/* Background gradient with forest depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background pointer-events-none" />
      
      {/* Innovation Grove fireflies */}
      {!liteMode && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: i % 3 === 0 ? 3 : 2,
                height: i % 3 === 0 ? 3 : 2,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: i % 2 === 0 ? 'hsl(var(--neon-forest))' : 'hsl(var(--gold))',
                boxShadow: `0 0 ${i % 3 === 0 ? 16 : 12}px currentColor`,
              }}
              animate={{
                y: [-20, -40, -20],
                x: [-10, 10, -10],
                opacity: [0.4, 0.9, 0.4],
                scale: [0.8, 1.3, 0.8],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <ScrollSection disabled={liteMode} parallaxSpeed={0.3}>
          <div className="text-center mb-12 md:mb-16">
            <WhisperText delay={0.1}>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-neon-forest via-gold to-primary bg-clip-text text-transparent">
                Innovation Groves
              </h2>
            </WhisperText>
            <WhisperText delay={0.3}>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Explore the diverse ecosystems where ideas bloom into reality
              </p>
            </WhisperText>
          </div>
        </ScrollSection>

        {/* Forest Path Filter Pills */}
        <ScrollSection disabled={liteMode} delay={0.2} fadeDirection="none">
          <div className="flex flex-wrap gap-2 md:gap-3 justify-center mb-8 md:mb-12">
            <motion.button
              whileHover={!liteMode ? { scale: 1.05, y: -2 } : {}}
              whileTap={!liteMode ? { scale: 0.95 } : {}}
              onClick={() => setActiveFilter('all')}
              className={`
                px-4 md:px-6 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-medium transition-all duration-500
                ${activeFilter === 'all' 
                  ? 'bg-neon-forest/20 text-neon-forest border-2 border-neon-forest/50 shadow-lg shadow-neon-forest/30' 
                  : 'glass-card text-muted-foreground hover:text-foreground border border-border/50'
                }
              `}
            >
              All Paths
            </motion.button>
            {serviceCategories.map((category) => {
              const Icon = category.icon;
              const colors = getColorClasses(category.color);
              const isActive = activeFilter === category.id;
              
              return (
                <motion.button
                  key={category.id}
                  whileHover={!liteMode ? { scale: 1.05, y: -2 } : {}}
                  whileTap={!liteMode ? { scale: 0.95 } : {}}
                  onClick={() => setActiveFilter(category.id)}
                  className={`
                    px-3 md:px-5 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-medium transition-all duration-500
                    flex items-center gap-1.5 md:gap-2
                    ${isActive 
                      ? `${colors.bg} ${colors.text} border-2 ${colors.border.replace('/30', '/50')} shadow-lg` 
                      : `glass-card text-muted-foreground hover:text-foreground border ${colors.border}`
                    }
                  `}
                  style={
                    isActive
                      ? { boxShadow: `0 8px 32px hsl(var(--service-${category.color === 'marketing' ? 'marketing' : category.color === 'digital' ? 'digital' : 'branding'}) / 0.3)` }
                      : undefined
                  }
                >
                  <Icon size={14} className="hidden md:block" />
                  <Icon size={12} className="md:hidden" />
                  <span className="hidden sm:inline">{category.title}</span>
                  <span className="sm:hidden">{category.shortTitle}</span>
                </motion.button>
              );
            })}
          </div>
        </ScrollSection>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredExamples.map((example, index) => {
            const colors = getColorClasses(example.categoryColor);
            const CategoryIcon = example.categoryIcon;
            
            return (
              <ScrollSection 
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
              </ScrollSection>
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
