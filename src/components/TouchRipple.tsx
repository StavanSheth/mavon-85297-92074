import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LeafSpark {
  id: number;
  x: number;
  y: number;
}

interface TouchRippleProps {
  children: ReactNode;
  className?: string;
}

/**
 * Mobile-specific touch burst effect with micro leaf spark particles
 * Includes haptic feedback trigger
 */
export const TouchRipple = ({ children, className = '' }: TouchRippleProps) => {
  const [sparks, setSparks] = useState<LeafSpark[]>([]);

  const handleTouch = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    // Create spark particles
    const newSparks: LeafSpark[] = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x,
      y,
    }));

    setSparks((prev) => [...prev, ...newSparks]);

    // Trigger haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }

    // Cleanup after animation
    setTimeout(() => {
      setSparks((prev) => prev.filter((s) => !newSparks.some((ns) => ns.id === s.id)));
    }, 600);
  };

  return (
    <div className={`relative ${className}`} onTouchStart={handleTouch}>
      {children}

      {/* Leaf spark particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <AnimatePresence>
          {sparks.map((spark, index) => (
            <motion.div
              key={spark.id}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: spark.x,
                top: spark.y,
                backgroundColor: index % 2 === 0 ? 'hsl(var(--neon-forest))' : 'hsl(var(--gold))',
                boxShadow: '0 0 8px currentColor',
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{
                scale: [0, 1.5, 0],
                x: Math.cos((index * Math.PI) / 3) * 40,
                y: Math.sin((index * Math.PI) / 3) * 40 - 20,
                opacity: [1, 0.8, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.6,
                ease: 'easeOut',
              }}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
