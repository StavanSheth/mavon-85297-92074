import { useState } from 'react';
import { motion } from 'framer-motion';

interface Bird {
  id: number;
  x: number;
  y: number;
  delay: number;
  speed: number;
}

export default function InteractiveBirds() {
  const [birds] = useState<Bird[]>(
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: -10,
      y: 20 + Math.random() * 40,
      delay: i * 2,
      speed: 15 + Math.random() * 5,
    }))
  );

  const [hoveredBird, setHoveredBird] = useState<number | null>(null);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {birds.map((bird) => (
        <motion.div
          key={bird.id}
          className="absolute pointer-events-auto cursor-pointer"
          style={{
            top: `${bird.y}%`,
          }}
          initial={{ x: '-10%' }}
          animate={hoveredBird === bird.id ? {
            x: ['0%', '50%'],
            y: [0, -50, -100, -50, 0],
          } : {
            x: ['0%', '110%'],
          }}
          transition={{
            duration: hoveredBird === bird.id ? 2 : bird.speed,
            delay: bird.delay,
            repeat: Infinity,
            ease: hoveredBird === bird.id ? 'easeInOut' : 'linear',
          }}
          onHoverStart={() => setHoveredBird(bird.id)}
          onHoverEnd={() => setHoveredBird(null)}
        >
          <motion.svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            animate={{
              scaleX: [1, 1.1, 1, 0.9, 1],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
            }}
          >
            {/* Bird body */}
            <ellipse cx="16" cy="16" rx="4" ry="3" fill="hsl(var(--service-digital))" opacity="0.8" />
            
            {/* Wings */}
            <motion.path
              d="M12 16 Q8 12, 4 14"
              stroke="hsl(var(--service-digital-glow))"
              strokeWidth="2"
              fill="none"
              animate={{
                d: [
                  'M12 16 Q8 12, 4 14',
                  'M12 16 Q8 10, 4 12',
                  'M12 16 Q8 12, 4 14',
                ],
              }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
              }}
            />
            <motion.path
              d="M20 16 Q24 12, 28 14"
              stroke="hsl(var(--service-digital-glow))"
              strokeWidth="2"
              fill="none"
              animate={{
                d: [
                  'M20 16 Q24 12, 28 14',
                  'M20 16 Q24 10, 28 12',
                  'M20 16 Q24 12, 28 14',
                ],
              }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
              }}
            />
          </motion.svg>
        </motion.div>
      ))}
    </div>
  );
}
