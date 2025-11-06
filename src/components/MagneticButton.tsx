import { useRef, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Button, ButtonProps } from '@/components/ui/button';
import { useMagneticEffect } from '@/hooks/useMagneticEffect';
import { RippleEffect } from './RippleEffect';
import { cn } from '@/lib/utils';

interface MagneticButtonProps extends ButtonProps {
  magnetStrength?: number;
  glowColor?: string;
}

/**
 * Button component with magnetic cursor pull and neon glow
 * Extends shadcn Button with interactive effects
 */
export const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ children, className, magnetStrength = 0.4, glowColor = 'hsl(var(--neon-forest))', ...props }, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const magnetic = useMagneticEffect(buttonRef, magnetStrength);

    return (
      <motion.div
        className="relative inline-block"
        animate={
          magnetic.isActive
            ? {
                x: magnetic.position.x,
                y: magnetic.position.y,
              }
            : { x: 0, y: 0 }
        }
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 20,
          mass: 0.5,
        }}
      >
        <Button
          ref={buttonRef}
          className={cn(
            'relative overflow-hidden transition-all duration-300 magnetic',
            'hover:scale-105 hover:shadow-[0_0_20px_var(--glow-color)]',
            className
          )}
          style={{ '--glow-color': glowColor } as React.CSSProperties}
          {...props}
        >
          {/* Neon glow pulse */}
          <motion.div
            className="absolute inset-0 rounded-md opacity-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
              filter: 'blur(10px)',
            }}
            animate={
              magnetic.isActive
                ? {
                    opacity: [0, 0.4, 0],
                  }
                : {}
            }
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Ripple effect */}
          <RippleEffect color={glowColor} />

          {/* Button content */}
          <span className="relative z-10">{children}</span>
        </Button>
      </motion.div>
    );
  }
);

MagneticButton.displayName = 'MagneticButton';
