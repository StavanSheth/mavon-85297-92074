import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface SectionTransitionProps {
  children: React.ReactNode;
  fromColor?: string;
  toColor?: string;
  id?: string;
}

export default function SectionTransition({
  children,
  fromColor = 'hsl(var(--background))',
  toColor = 'hsl(var(--forest-deep))',
  id,
}: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [fromColor, toColor, fromColor]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      ref={ref}
      id={id}
      className="relative"
      style={{
        background: backgroundColor,
      }}
    >
      {/* Gradient overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity,
          background: `radial-gradient(circle at 50% 50%, ${toColor} 0%, transparent 70%)`,
        }}
      />
      
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
