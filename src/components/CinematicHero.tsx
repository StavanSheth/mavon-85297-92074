import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { HybridSpiritOrb } from './HybridSpiritOrb';

interface CinematicHeroProps {
  onScrollToServices: () => void;
}

/**
 * Cinematic Hero Section with Hybrid Spirit Orb centerpiece
 * Features: scroll-linked animations, magnetic buttons, breathing text
 */
export const CinematicHero = ({ onScrollToServices }: CinematicHeroProps) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" style={{ zIndex: 1 }} />

      {/* Content container */}
      <div className="relative container mx-auto px-4 text-center" style={{ zIndex: 10 }}>
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Sparkles className="text-neon-forest" size={18} />
            <span className="text-sm font-medium bg-gradient-to-r from-neon-forest to-gold bg-clip-text text-transparent">
              Innovation in Motion
            </span>
          </motion.div>

          {/* Main Heading with line-by-line reveal */}
          <div className="mb-8 space-y-4">
            <motion.h1
              className="text-6xl md:text-8xl font-bold text-holographic"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
            >
              Moving Innovation
            </motion.h1>
            <motion.h1
              className="text-6xl md:text-8xl font-bold text-holographic"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
            >
              Forward
            </motion.h1>
          </div>

          {/* Hybrid Spirit Orb */}
          <div className="relative h-32 mb-12">
            <HybridSpiritOrb />
          </div>

          {/* Subheading with breathing effect */}
          <motion.p
            className="text-xl md:text-3xl text-foreground/80 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{
              opacity: {
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
          >
            Futuristic software solutions powered by nature and technology
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <MagneticButton
              size="lg"
              onClick={onScrollToServices}
              className="bg-primary hover:bg-primary-glow text-primary-foreground font-semibold px-10 py-7 text-lg rounded-xl group"
              glowColor="hsl(var(--neon-forest))"
            >
              Explore Services
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </MagneticButton>

            <MagneticButton
              size="lg"
              variant="outline"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="glass-card border-neon-forest/30 hover:border-neon-forest/60 px-10 py-7 text-lg rounded-xl"
              glowColor="hsl(var(--gold))"
            >
              Get in Touch
            </MagneticButton>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="mt-20"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <span className="text-sm">Scroll to explore</span>
              <motion.div
                className="w-6 h-10 rounded-full border-2 border-neon-forest/30 flex items-start justify-center p-2"
                animate={{
                  borderColor: ['hsl(var(--neon-forest) / 0.3)', 'hsl(var(--neon-forest) / 0.6)', 'hsl(var(--neon-forest) / 0.3)'],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  className="w-1.5 h-1.5 bg-neon-forest rounded-full"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
