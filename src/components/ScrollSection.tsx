import { motion } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface ScrollSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  parallaxSpeed?: number;
  fadeDirection?: 'up' | 'down' | 'left' | 'right' | 'none';
  disabled?: boolean;
}

/**
 * Enhanced scroll section with fade-slide reveals and parallax depth
 * Forest-themed cinematic transitions
 */
export const ScrollSection = ({
  children,
  className = '',
  delay = 0,
  parallaxSpeed = 0.3,
  fadeDirection = 'up',
  disabled = false,
}: ScrollSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { isInView, parallax } = useScrollAnimation(ref, { parallaxSpeed });

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  const directions = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { y: 0, x: 60 },
    right: { y: 0, x: -60 },
    none: { y: 0, x: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...directions[fadeDirection],
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              x: 0,
              y: 0,
            }
          : {}
      }
      transition={{
        duration: 1,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={cn('relative', className)}
    >
      {/* Fog clearing effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, hsl(var(--background)) 100%)',
          opacity: parallax.opacity,
        }}
        animate={
          isInView
            ? {
                opacity: [0.3, 0, 0],
              }
            : {}
        }
        transition={{
          duration: 1.5,
          delay: delay + 0.2,
        }}
      />
      
      {children}
    </motion.div>
  );
};
