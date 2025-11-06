import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface WhisperTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  glowColor?: string;
}

/**
 * Softly animated guiding text that appears like forest whispers
 * Subtle glow and fade-in from forest light
 */
export const WhisperText = ({
  children,
  className = '',
  delay = 0,
  duration = 1.2,
  glowColor = 'hsl(var(--neon-forest))',
}: WhisperTextProps) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
        filter: 'blur(10px)',
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
      }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={cn('relative', className)}
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`,
          filter: 'blur(20px)',
          opacity: 0.15,
        }}
        animate={{
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <span className="relative z-10">{children}</span>
    </motion.div>
  );
};
