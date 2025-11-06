import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';

/**
 * Hybrid Spirit Orb - Intelligent nature-tech seed core
 * Reacts to cursor proximity, scroll momentum, and idle states
 * Features: floating physics, breathing aura, micro firefly-leaf sparks
 */
export const HybridSpiritOrb = () => {
  const orbRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const mousePos = useMousePosition();
  const { scrollYProgress } = useScroll();

  // Transform orb position based on scroll
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1.1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.3], [1, 0.8, 0]);

  // Calculate cursor proximity for magnetic effect
  const [proximity, setProximity] = useState(0);

  useEffect(() => {
    if (!orbRef.current) return;

    const rect = orbRef.current.getBoundingClientRect();
    const orbCenterX = rect.left + rect.width / 2;
    const orbCenterY = rect.top + rect.height / 2;

    const deltaX = mousePos.x - orbCenterX;
    const deltaY = mousePos.y - orbCenterY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    setProximity(Math.max(0, 1 - distance / 300));
  }, [mousePos]);

  useEffect(() => {
    // Fade in orb after hero loads
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      ref={orbRef}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{ y, scale, opacity }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      {/* Outer breathing aura */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          width: 200,
          height: 200,
          left: -100,
          top: -100,
          background: 'radial-gradient(circle, hsl(var(--neon-forest) / 0.3) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4 + proximity * 0.3, 0.6 + proximity * 0.3, 0.4 + proximity * 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Core orb */}
      <motion.div
        className="relative w-24 h-24 rounded-full"
        style={{
          background: `
            radial-gradient(circle at 30% 30%, hsl(var(--neon-forest-glow)) 0%, hsl(var(--neon-forest)) 50%, hsl(var(--forest-deep)) 100%)
          `,
          boxShadow: `
            0 0 20px hsl(var(--neon-forest) / 0.6),
            0 0 40px hsl(var(--neon-forest) / 0.4),
            0 0 60px hsl(var(--neon-forest) / 0.2),
            inset 0 0 20px hsl(var(--neon-forest-glow) / 0.3)
          `,
        }}
        animate={{
          boxShadow: [
            '0 0 20px hsl(var(--neon-forest) / 0.6), 0 0 40px hsl(var(--neon-forest) / 0.4)',
            `0 0 ${30 + proximity * 20}px hsl(var(--neon-forest) / ${0.8 + proximity * 0.2}), 0 0 ${60 + proximity * 40}px hsl(var(--neon-forest) / ${0.6 + proximity * 0.2})`,
            '0 0 20px hsl(var(--neon-forest) / 0.6), 0 0 40px hsl(var(--neon-forest) / 0.4)',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Inner light core */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(var(--neon-forest-glow) / 0.8) 0%, transparent 60%)',
            filter: 'blur(8px)',
          }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Micro firefly-leaf sparks */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: '50%',
              top: '50%',
              backgroundColor: i % 2 === 0 ? 'hsl(var(--neon-forest))' : 'hsl(var(--gold))',
              boxShadow: '0 0 4px currentColor',
            }}
            animate={{
              x: [0, Math.cos((i * Math.PI) / 4) * (30 + proximity * 20)],
              y: [0, Math.sin((i * Math.PI) / 4) * (30 + proximity * 20)],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random(),
              delay: i * 0.2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        ))}
      </motion.div>

      {/* Rotating ring accent */}
      <motion.div
        className="absolute inset-0 rounded-full border border-neon-forest/30"
        style={{
          width: 120,
          height: 120,
          left: -60,
          top: -60,
        }}
        animate={{
          rotate: 360,
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          rotate: {
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          },
          opacity: {
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
      />
    </motion.div>
  );
};
