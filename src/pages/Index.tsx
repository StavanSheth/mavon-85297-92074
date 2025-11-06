import { ChevronDown, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { CinematicHero } from '@/components/CinematicHero';
import Values from '@/components/Values';
import Services from '@/components/Services';
import Solutions from '@/components/Solutions';
import About from '@/components/About';
import Contact from '@/components/Contact';
import FloatingMascot from '@/components/FloatingMascot';
import { CursorEngine } from '@/components/CursorEngine';
import { ParallaxForest } from '@/components/ParallaxForest';
import { NatureParticleField } from '@/components/NatureParticleField';
import { ForestFog } from '@/components/ForestFog';
import { Navigation } from '@/components/Navigation';
import { useLiteMode } from '@/contexts/LiteModeContext';
import { useAmbientSound } from '@/hooks/useAmbientSound';

const Index = () => {
  const { liteMode } = useLiteMode();
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Ambient sound system
  const { isPlaying, toggle: toggleSound } = useAmbientSound('/sounds/ambient-forest.mp3', {
    autoPlay: !liteMode && soundEnabled,
    volume: 0.3,
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSoundToggle = () => {
    toggleSound();
    setSoundEnabled(!soundEnabled);
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background decorative elements - all at z-0 */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        {/* Parallax Forest Background */}
        {!liteMode && <ParallaxForest />}
        
        {/* Nature Particle Field */}
        {!liteMode && <NatureParticleField />}
        
        {/* Forest Fog */}
        {!liteMode && <ForestFog />}
      </div>
      
      {/* Custom Cursor Engine */}
      {!liteMode && <CursorEngine />}

      {/* Floating Mascot */}
      {!liteMode && <FloatingMascot />}

      {/* Sound Toggle Button */}
      {!liteMode && (
        <motion.button
          onClick={handleSoundToggle}
          className="fixed top-24 right-8 w-12 h-12 rounded-full glass-card flex items-center justify-center z-50 hover:scale-110 transition-transform"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={isPlaying ? 'Mute sound' : 'Unmute sound'}
        >
          {isPlaying ? (
            <Volume2 className="text-neon-forest" size={20} />
          ) : (
            <VolumeX className="text-muted-foreground" size={20} />
          )}
        </motion.button>
      )}

      {/* Main content - higher z-index */}
      <div className="relative" style={{ zIndex: 10 }}>
        {/* Navigation */}
        <Navigation />

        {/* Hero Section */}
        <section id="home" className="relative">
          <CinematicHero onScrollToServices={() => scrollToSection('services')} />
        </section>

        {/* Values Section - Forest Wisdom */}
        <section id="values" className="py-20 relative">
          <Values liteMode={liteMode} />
        </section>

        {/* Services Section - Innovation Groves */}
        <section id="services" className="py-20 relative">
          <Services liteMode={liteMode} />
        </section>

        {/* Solutions Section - Impact Showcase */}
        <section id="solutions" className="py-20 relative">
          <Solutions liteMode={liteMode} />
        </section>

        {/* About Section - Our Story Timeline */}
        <section id="about" className="py-20 relative">
          <About liteMode={liteMode} />
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
