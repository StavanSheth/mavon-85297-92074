import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Three-layer parallax forest background system
 * Creates depth with scroll-linked transforms and neon accents
 */
export const ParallaxForest = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Different speeds for each layer
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '80%']);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden" style={{ zIndex: 0 }}>
      {/* Layer 1: Deep Forest Mountains (Slowest) */}
      <motion.div
        className="absolute inset-0"
        style={{ y: y1 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 20% 80%, hsl(var(--forest-deep) / 0.6) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 70%, hsl(var(--forest-canopy) / 0.5) 0%, transparent 60%)
            `,
            clipPath: 'polygon(0 60%, 25% 50%, 50% 55%, 75% 45%, 100% 50%, 100% 100%, 0 100%)',
          }}
        />
      </motion.div>

      {/* Layer 2: Mid-range Tree Silhouettes (Medium) */}
      <motion.div
        className="absolute inset-0"
        style={{ y: y2 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 15% 85%, hsl(var(--forest-canopy) / 0.7) 0%, transparent 40%),
              radial-gradient(ellipse at 50% 90%, hsl(var(--forest-deep) / 0.8) 0%, transparent 45%),
              radial-gradient(ellipse at 85% 88%, hsl(var(--forest-canopy) / 0.6) 0%, transparent 50%)
            `,
            clipPath: 'polygon(0 70%, 15% 65%, 30% 72%, 45% 68%, 60% 75%, 75% 70%, 90% 73%, 100% 68%, 100% 100%, 0 100%)',
          }}
        >
          {/* Subtle neon edge highlights */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: `
                linear-gradient(to bottom, transparent 70%, hsl(var(--neon-forest) / 0.1) 85%, transparent 100%)
              `,
            }}
          />
        </div>
      </motion.div>

      {/* Layer 3: Foreground Fog & Mist (Fastest) */}
      <motion.div
        className="absolute inset-0"
        style={{ y: y3 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 30% 95%, hsl(var(--background) / 0.4) 0%, transparent 30%),
              radial-gradient(ellipse at 70% 92%, hsl(var(--background) / 0.5) 0%, transparent 35%)
            `,
          }}
        />
      </motion.div>

      {/* Ambient fog overlay with neon tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 50% 100%, hsl(var(--neon-forest) / 0.05) 0%, transparent 60%)
          `,
        }}
      />

      {/* Bottom gradient fade to background */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, hsl(var(--background)) 0%, transparent 100%)',
        }}
      />
    </div>
  );
};
