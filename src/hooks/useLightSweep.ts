import { useState, useEffect, RefObject } from 'react';

interface LightPosition {
  x: number;
  y: number;
  isActive: boolean;
}

/**
 * Custom hook for spotlight/light sweep effect
 * Tracks cursor position relative to element for gradient positioning
 */
export const useLightSweep = <T extends HTMLElement>(
  elementRef: RefObject<T>
): LightPosition => {
  const [position, setPosition] = useState<LightPosition>({ x: 50, y: 50, isActive: false });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      setPosition({ x, y, isActive: true });
    };

    const handleMouseLeave = () => {
      setPosition({ x: 50, y: 50, isActive: false });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [elementRef]);

  return position;
};
