import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Butterfly {
  id: number;
  x: number;
  y: number;
  clicked: boolean;
}

export default function InteractiveButterflies() {
  const [butterflies, setButterflies] = useState<Butterfly[]>(
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      clicked: false,
    }))
  );

  const handleClick = (id: number) => {
    setButterflies(prev =>
      prev.map(b => (b.id === id ? { ...b, clicked: true } : b))
    );
    
    // Reset after animation
    setTimeout(() => {
      setButterflies(prev =>
        prev.map(b => (b.id === id ? { ...b, clicked: false, x: Math.random() * 100, y: Math.random() * 100 } : b))
      );
    }, 1500);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      <AnimatePresence>
        {butterflies.map((butterfly) => (
          <motion.div
            key={butterfly.id}
            className="absolute pointer-events-auto cursor-pointer"
            style={{
              left: `${butterfly.x}%`,
              top: `${butterfly.y}%`,
            }}
            animate={butterfly.clicked ? {
              scale: [1, 1.5, 0],
              rotate: [0, 360, 720],
              y: [0, -100, -200],
              opacity: [1, 0.8, 0],
            } : {
              x: [0, Math.random() * 40 - 20, 0],
              y: [0, Math.random() * 40 - 20, 0],
              rotate: [0, Math.random() * 20 - 10, 0],
            }}
            transition={{
              duration: butterfly.clicked ? 1.5 : 4 + Math.random() * 2,
              repeat: butterfly.clicked ? 0 : Infinity,
              ease: 'easeInOut',
            }}
            onClick={() => handleClick(butterfly.id)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="drop-shadow-glow"
            >
              {/* Butterfly wings */}
              <path
                d="M12 12C12 12 8 8 4 10C2 11 1 13 2 15C3 17 5 17 6 16C7 15 8 14 8 12"
                fill="hsl(var(--service-branding))"
                opacity="0.8"
              />
              <path
                d="M12 12C12 12 16 8 20 10C22 11 23 13 22 15C21 17 19 17 18 16C17 15 16 14 16 12"
                fill="hsl(var(--service-branding))"
                opacity="0.8"
              />
              <path
                d="M12 12C12 12 8 16 4 14C2 13 1 11 2 9C3 7 5 7 6 8C7 9 8 10 8 12"
                fill="hsl(var(--service-branding-glow))"
                opacity="0.9"
              />
              <path
                d="M12 12C12 12 16 16 20 14C22 13 23 11 22 9C21 7 19 7 18 8C17 9 16 10 16 12"
                fill="hsl(var(--service-branding-glow))"
                opacity="0.9"
              />
              {/* Body */}
              <circle cx="12" cy="12" r="1.5" fill="hsl(var(--service-branding-accent))" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
