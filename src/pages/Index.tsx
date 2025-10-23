import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import EnhancedHero from '@/components/EnhancedHero';
import Services from '@/components/Services';
import Solutions from '@/components/Solutions';
import About from '@/components/About';
import Contact from '@/components/Contact';
import FloatingMascot from '@/components/FloatingMascot';
import FireflyCursor from '@/components/FireflyCursor';
import ParticleSystem from '@/components/ParticleSystem';
import ParallaxBackground from '@/components/ParallaxBackground';
import FloatingLeaves from '@/components/FloatingLeaves';
import InteractiveButterflies from '@/components/InteractiveButterflies';
import InteractiveBirds from '@/components/InteractiveBirds';
import SectionTransition from '@/components/SectionTransition';
import { Navigation } from '@/components/Navigation';
import { useLiteMode } from '@/contexts/LiteModeContext';

const Index = () => {
  const { liteMode } = useLiteMode();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden cursor-firefly">
      {/* 3D Particle System */}
      {!liteMode && <ParticleSystem />}
      
      {/* Parallax Background Layers */}
      {!liteMode && <ParallaxBackground />}
      
      {/* Floating Leaves */}
      {!liteMode && <FloatingLeaves />}
      
      {/* Interactive Butterflies */}
      {!liteMode && <InteractiveButterflies />}
      
      {/* Interactive Birds */}
      {!liteMode && <InteractiveBirds />}
      
      {/* Firefly cursor effect */}
      {!liteMode && <FireflyCursor />}

      {/* Floating Mascot */}
      {!liteMode && <FloatingMascot />}

      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <SectionTransition 
        id="home" 
        fromColor="hsl(var(--background))"
        toColor="hsl(var(--forest-deep))"
      >
        <div className="pt-20">
          <EnhancedHero onScrollToServices={() => scrollToSection('services')} liteMode={liteMode} />
        </div>
      </SectionTransition>

      {/* Services Section */}
      <SectionTransition 
        id="services"
        fromColor="hsl(var(--forest-deep))"
        toColor="hsl(var(--forest-canopy))"
      >
        <div className="py-20">
          <Services liteMode={liteMode} />
        </div>
      </SectionTransition>

      {/* Solutions Section */}
      <SectionTransition 
        id="solutions"
        fromColor="hsl(var(--forest-canopy))"
        toColor="hsl(var(--background))"
      >
        <div className="py-20">
          <Solutions liteMode={liteMode} />
        </div>
      </SectionTransition>

      {/* About Section */}
      <SectionTransition 
        id="about"
        fromColor="hsl(var(--background))"
        toColor="hsl(var(--forest-deep))"
      >
        <div className="py-20">
          <About liteMode={liteMode} />
        </div>
      </SectionTransition>

      {/* Contact Section */}
      <SectionTransition 
        id="contact"
        fromColor="hsl(var(--forest-deep))"
        toColor="hsl(var(--background))"
      >
        <div className="py-20">
          <Contact liteMode={liteMode} />
        </div>
      </SectionTransition>

      {/* Scroll to Top Indicator */}
      <motion.button
        onClick={() => scrollToSection('home')}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full glass-card flex items-center justify-center transition-all z-40"
        whileHover={{ scale: 1.1, boxShadow: '0 0 40px rgba(102, 187, 106, 0.4)' }}
        whileTap={{ scale: 0.9 }}
        animate={!liteMode ? { y: [0, -5, 0] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
        aria-label="Scroll to top"
      >
        <ChevronDown className="rotate-180 text-primary" size={20} />
      </motion.button>

      {/* Footer */}
      <footer className="py-8 border-t border-border/50">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 Mavon. Moving Innovation Forward.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
