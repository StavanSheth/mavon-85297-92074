import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ParallaxBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Different parallax speeds for each layer
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <div ref={ref} className="fixed inset-0 pointer-events-none z-0">
      {/* Layer 1 - Furthest back (Mountains) */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 opacity-20"
      >
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-forest-canopy/40 to-transparent" 
          style={{
            clipPath: 'polygon(0 100%, 0 40%, 20% 50%, 40% 35%, 60% 45%, 80% 30%, 100% 40%, 100% 100%)'
          }}
        />
      </motion.div>

      {/* Layer 2 - Middle (Trees) */}
      <motion.div 
        style={{ y: y2 }}
        className="absolute inset-0 opacity-30"
      >
        <div className="absolute bottom-0 left-0 right-0 h-72 bg-gradient-to-t from-forest-deep/50 to-transparent"
          style={{
            clipPath: 'polygon(0 100%, 0 60%, 10% 55%, 15% 65%, 25% 50%, 35% 60%, 45% 45%, 55% 55%, 65% 40%, 75% 50%, 85% 45%, 95% 55%, 100% 50%, 100% 100%)'
          }}
        />
      </motion.div>

      {/* Layer 3 - Closest (Foreground mist) */}
      <motion.div 
        style={{ y: y3 }}
        className="absolute inset-0 opacity-40"
      >
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-leaf-green/10 via-transparent to-transparent animate-pulse-slow" />
      </motion.div>

      {/* Ambient fog effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-forest-deep/20" />
    </div>
  );
}
