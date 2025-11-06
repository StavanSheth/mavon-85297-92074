import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cursorConfig } from '@/config/cursor.config';
import { useVelocity } from '@/hooks/useVelocity';

interface TrailParticle {
  id: number;
  x: number;
  y: number;
  timestamp: number;
  isSpirit: boolean;
}

/**
 * Cursor trail component with velocity-based particle system
 * Creates neon orb trail and occasional spirit leaf-firefly particles
 */
export const CursorTrail = () => {
  const [particles, setParticles] = useState<TrailParticle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const velocity = useVelocity();
  const lastSpawnRef = useRef(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const now = Date.now();

        // Check if velocity threshold is met and spawn rate allows
        if (
          velocity.speed > cursorConfig.trail.velocityThreshold &&
          now - lastSpawnRef.current > (1000 / cursorConfig.trail.spawnRate)
        ) {
          const isSpirit = Math.random() < cursorConfig.spirit.spawnChance;

          const newParticle: TrailParticle = {
            id: now,
            x: e.clientX,
            y: e.clientY,
            timestamp: now,
            isSpirit,
          };

          setParticles((prev) => {
            const filtered = prev.filter(
              (p) => now - p.timestamp < (p.isSpirit ? cursorConfig.spirit.lifetime : cursorConfig.trail.lifetime)
            );
            return [...filtered, newParticle].slice(-cursorConfig.trail.maxParticles);
          });

          lastSpawnRef.current = now;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [velocity.speed]);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9999 }}>
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.isSpirit ? cursorConfig.spirit.size : cursorConfig.trail.size,
              height: particle.isSpirit ? cursorConfig.spirit.size : cursorConfig.trail.size,
              backgroundColor: particle.isSpirit
                ? cursorConfig.spirit.colors[Math.floor(Math.random() * cursorConfig.spirit.colors.length)]
                : 'hsl(var(--neon-forest))',
              boxShadow: particle.isSpirit
                ? '0 0 10px currentColor, 0 0 20px currentColor'
                : '0 0 8px hsl(var(--neon-forest-glow))',
            }}
            initial={{ scale: 1, opacity: cursorConfig.trail.opacity }}
            animate={{
              scale: 0,
              opacity: 0,
              y: particle.isSpirit ? -30 : 0,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: particle.isSpirit
                ? cursorConfig.spirit.lifetime / 1000
                : cursorConfig.trail.lifetime / 1000,
              ease: 'easeOut',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
