import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import EnhancedHero from '@/components/EnhancedHero';
import Services from '@/components/Services';
import Solutions from '@/components/Solutions';
import About from '@/components/About';
import Contact from '@/components/Contact';
import FAQ from '@/components/FAQ';
import FloatingMascot from '@/components/FloatingMascot';
import FireflyCursor from '@/components/FireflyCursor';
import ParticleSystem from '@/components/ParticleSystem';
import ParallaxBackground from '@/components/ParallaxBackground';
import FloatingLeaves from '@/components/FloatingLeaves';
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
    <div className="min-h-screen bg-background relative">
      {/* Background decorative elements - all at z-0 */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        {/* 3D Particle System */}
        {!liteMode && <ParticleSystem />}
        
        {/* Parallax Background Layers */}
        {!liteMode && <ParallaxBackground />}
        
        {/* Floating Leaves */}
        {!liteMode && <FloatingLeaves />}
      </div>
      
      {/* Firefly cursor effect */}
      {!liteMode && <FireflyCursor />}

      {/* Floating Mascot */}
      {!liteMode && <FloatingMascot />}

      {/* Main content - higher z-index */}
      <div className="relative" style={{ zIndex: 10 }}>
        {/* Navigation */}
        <Navigation />

        {/* Hero Section */}
        <section id="home" className="pt-20 relative">
          <EnhancedHero onScrollToServices={() => scrollToSection('services')} liteMode={liteMode} />
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 relative">
          <Services liteMode={liteMode} />
        </section>

        {/* Solutions Section */}
        <section id="solutions" className="py-20 relative">
          <Solutions liteMode={liteMode} />
        </section>

        {/* About Section */}
        <section id="about" className="py-20 relative">
          <About liteMode={liteMode} />
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 relative">
          <FAQ liteMode={liteMode} />
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 relative">
          <Contact liteMode={liteMode} />
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-border/50">
          <div className="container mx-auto px-4 text-center text-muted-foreground">
            <p>&copy; 2025 Mavon. Moving Innovation Forward.</p>
          </div>
        </footer>
      </div>

      {/* Scroll to Top Indicator - outside main content */}
      <motion.button
        onClick={() => scrollToSection('home')}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full glass-card flex items-center justify-center transition-all"
        style={{ zIndex: 50 }}
        whileHover={{ scale: 1.1, boxShadow: '0 0 40px rgba(102, 187, 106, 0.4)' }}
        whileTap={{ scale: 0.9 }}
        animate={!liteMode ? { y: [0, -5, 0] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
        aria-label="Scroll to top"
      >
        <ChevronDown className="rotate-180 text-primary" size={20} />
      </motion.button>
    </div>
  );
};

export default Index;
