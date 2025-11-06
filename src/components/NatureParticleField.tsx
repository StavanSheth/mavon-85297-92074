import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

/**
 * Hybrid spirit particle field (leaf + firefly + neon orb essence)
 * GPU-optimized with CSS transforms only
 */
export const NatureParticleField = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Reduce particle count on mobile
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 8 : 16;

    const colors = [
      'hsl(var(--neon-forest))',
      'hsl(var(--gold))',
      'hsl(var(--leaf-light))',
    ];

    const newParticles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 3,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}, 0 0 ${particle.size * 4}px ${particle.color}`,
            willChange: 'transform, opacity',
          }}
          animate={{
            y: [-20, -40, -20],
            x: [-10, 10, -10],
            opacity: [0.4, 1, 0.4],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};
