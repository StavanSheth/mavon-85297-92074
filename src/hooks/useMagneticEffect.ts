import { useState, useEffect, useRef, RefObject } from 'react';
import { cursorConfig } from '@/config/cursor.config';

interface MagneticPosition {
  x: number;
  y: number;
}

interface MagneticState {
  isActive: boolean;
  position: MagneticPosition;
  distance: number;
}

/**
 * Custom hook for magnetic cursor attraction effect
 * Returns magnetic state and position for smooth pull animation
 */
export const useMagneticEffect = <T extends HTMLElement>(
  elementRef: RefObject<T>,
  strength: number = cursorConfig.magnetic.strength
): MagneticState => {
  const [state, setState] = useState<MagneticState>({
    isActive: false,
    position: { x: 0, y: 0 },
    distance: 0,
  });

  const rafRef = useRef<number>();

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance < cursorConfig.magnetic.maxDistance) {
          const pullX = deltaX * strength;
          const pullY = deltaY * strength;

          setState({
            isActive: true,
            position: { x: pullX, y: pullY },
            distance,
          });
        } else if (state.isActive) {
          setState({
            isActive: false,
            position: { x: 0, y: 0 },
            distance,
          });
        }
      });
    };

    const handleMouseLeave = () => {
      setState({
        isActive: false,
        position: { x: 0, y: 0 },
        distance: 0,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [elementRef, strength, state.isActive]);

  return state;
};
