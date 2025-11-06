import { useRef, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { use3DTilt } from '@/hooks/use3DTilt';
import { useLightSweep } from '@/hooks/useLightSweep';
import { cn } from '@/lib/utils';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  tiltIntensity?: number;
  glowColor?: string;
}

/**
 * Premium card with 3D tilt and light sweep effect
 * Neon border glow with glass morphism background
 */
export const GlowCard = ({
  children,
  className = '',
  tiltIntensity = 8,
  glowColor = 'hsl(var(--neon-forest))',
}: GlowCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const tilt = use3DTilt(cardRef, tiltIntensity);
  const lightPos = useLightSweep(cardRef);

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        'relative glass-card rounded-xl overflow-hidden',
        'border border-border/50 hover:border-neon-forest/50',
        'transition-all duration-300',
        'hover:shadow-[0_0_30px_var(--glow-color)]',
        className
      )}
      style={{
        transformStyle: 'preserve-3d',
        '--glow-color': glowColor,
      } as React.CSSProperties}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        scale: tilt.scale,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
    >
      {/* Ambient shadow pulse when idle */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          filter: 'blur(20px)',
          zIndex: -1,
        }}
        animate={
          !lightPos.isActive
            ? {
                opacity: [0, 0.2, 0],
              }
            : { opacity: 0 }
        }
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Light sweep effect on hover */}
      {lightPos.isActive && (
        <motion.div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${lightPos.x}% ${lightPos.y}%, ${glowColor} 0%, transparent 50%)`,
            filter: 'blur(30px)',
          }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
