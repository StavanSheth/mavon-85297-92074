import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Layered fog overlay with subtle movement and neon tint
 * Scroll-reactive opacity for depth
 */
export const ForestFog = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0.3, 0.1]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 2, opacity }}
    >
      {/* Main fog layer */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 80%, hsl(var(--neon-forest) / 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 20% 60%, hsl(var(--gold) / 0.05) 0%, transparent 40%),
            radial-gradient(ellipse at 80% 70%, hsl(var(--leaf-light) / 0.06) 0%, transparent 45%)
          `,
        }}
      />

      {/* Animated mist layer */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, hsl(var(--neon-forest) / 0.03) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
};
