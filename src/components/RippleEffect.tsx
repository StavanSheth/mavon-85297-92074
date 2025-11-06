import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cursorConfig } from '@/config/cursor.config';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface RippleEffectProps {
  className?: string;
  color?: string;
}

/**
 * Ripple effect component for click/tap interactions
 * Creates expanding neon ring with fade effect
 */
export const RippleEffect = ({ className = '', color = 'hsl(var(--neon-forest))' }: RippleEffectProps) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const createRipple = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;

    const newRipple = {
      id: Date.now(),
      x,
      y,
    };

    setRipples((prev) => [...prev, newRipple]);

    // Trigger haptic feedback on touch devices
    if ('vibrate' in navigator && 'touches' in e) {
      navigator.vibrate(10);
    }

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, cursorConfig.ripple.duration);
  };

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      onMouseDown={createRipple as any}
      onTouchStart={createRipple as any}
      style={{ pointerEvents: 'auto' }}
    >
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute rounded-full border-2"
            style={{
              left: ripple.x,
              top: ripple.y,
              borderColor: color,
            }}
            initial={{ width: 0, height: 0, opacity: cursorConfig.ripple.opacity }}
            animate={{
              width: cursorConfig.ripple.maxSize,
              height: cursorConfig.ripple.maxSize,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: cursorConfig.ripple.duration / 1000, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
