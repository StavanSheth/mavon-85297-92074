import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { cursorConfig } from '@/config/cursor.config';
import { CursorTrail } from './CursorTrail';

type CursorState = 'default' | 'hover' | 'click' | 'text' | 'idle';

/**
 * Custom cursor engine with dot + ring system
 * Features: magnetic pull, velocity trails, state management, spirit orb proximity
 */
export const CursorEngine = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [isVisible, setIsVisible] = useState(false);
  const lastMoveRef = useRef(Date.now());
  const idleTimeoutRef = useRef<NodeJS.Timeout>();
  const rafRef = useRef<number>();

  // Device detection
  useEffect(() => {
    const isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.innerWidth < cursorConfig.device.mobileBreakpoint;

    if (isTouchDevice && cursorConfig.device.disableOnTouch) {
      return;
    }

    setIsVisible(true);

    // Hide default cursor
    document.body.classList.add('cursor-hidden');

    return () => {
      document.body.classList.remove('cursor-hidden');
    };
  }, []);

  // Mouse move handler with RAF
  useEffect(() => {
    if (!isVisible) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
        lastMoveRef.current = Date.now();

        // Reset idle state
        if (cursorState === 'idle') {
          setCursorState('default');
        }

        // Clear and reset idle timeout
        if (idleTimeoutRef.current) {
          clearTimeout(idleTimeoutRef.current);
        }

        idleTimeoutRef.current = setTimeout(() => {
          setCursorState('idle');
        }, 3000);

        // Detect interactive elements
        const target = e.target as HTMLElement;
        const isInteractive =
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.classList.contains('magnetic');

        const isText = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';

        if (isText) {
          setCursorState('text');
        } else if (isInteractive && cursorState !== 'click') {
          setCursorState('hover');
        } else if (!isText && !isInteractive && cursorState !== 'click' && cursorState !== 'idle') {
          setCursorState('default');
        }
      });
    };

    const handleMouseDown = () => {
      setCursorState('click');
    };

    const handleMouseUp = () => {
      setCursorState('default');
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
    };
  }, [isVisible, cursorState]);

  if (!isVisible) return null;

  const getRingScale = () => {
    switch (cursorState) {
      case 'hover':
        return cursorConfig.cursor.hoverScale;
      case 'click':
        return cursorConfig.cursor.clickScale;
      case 'idle':
        return 1.2;
      default:
        return 1;
    }
  };

  const getDotScale = () => {
    switch (cursorState) {
      case 'hover':
        return 0.5;
      case 'click':
        return 1.5;
      case 'text':
        return 0;
      default:
        return 1;
    }
  };

  return (
    <>
      {/* Cursor Trail System */}
      <CursorTrail />

      {/* Cursor Ring */}
      <motion.div
        className="fixed pointer-events-none rounded-full border-2 mix-blend-screen"
        style={{
          left: position.x,
          top: position.y,
          width: cursorConfig.cursor.ringSize,
          height: cursorConfig.cursor.ringSize,
          borderColor: 'hsl(var(--neon-forest))',
          zIndex: 9999,
        }}
        animate={{
          x: -cursorConfig.cursor.ringSize / 2,
          y: -cursorConfig.cursor.ringSize / 2,
          scale: getRingScale(),
          opacity: cursorState === 'text' ? 0 : 0.8,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        {/* Breathing glow effect when idle */}
        {cursorState === 'idle' && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(var(--neon-forest) / 0.4) 0%, transparent 70%)',
              filter: 'blur(8px)',
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}
      </motion.div>

      {/* Cursor Dot */}
      <motion.div
        className="fixed pointer-events-none rounded-full mix-blend-screen"
        style={{
          left: position.x,
          top: position.y,
          width: cursorConfig.cursor.dotSize,
          height: cursorConfig.cursor.dotSize,
          backgroundColor: 'hsl(var(--neon-forest))',
          boxShadow: '0 0 12px hsl(var(--neon-forest-glow)), 0 0 24px hsl(var(--neon-forest-glow) / 0.5)',
          zIndex: 10000,
        }}
        animate={{
          x: -cursorConfig.cursor.dotSize / 2,
          y: -cursorConfig.cursor.dotSize / 2,
          scale: getDotScale(),
        }}
        transition={{
          type: 'spring',
          stiffness: 1000,
          damping: 40,
          mass: 0.2,
        }}
      />
    </>
  );
};
