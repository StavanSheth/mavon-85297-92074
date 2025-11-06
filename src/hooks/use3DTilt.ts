import { useState, useEffect, RefObject } from 'react';

interface TiltAngles {
  rotateX: number;
  rotateY: number;
  scale: number;
}

/**
 * Custom hook for 3D tilt effect based on mouse position
 * Returns tilt angles for card rotation
 */
export const use3DTilt = <T extends HTMLElement>(
  elementRef: RefObject<T>,
  intensity: number = 10
): TiltAngles => {
  const [tilt, setTilt] = useState<TiltAngles>({ rotateX: 0, rotateY: 0, scale: 1 });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * intensity;
      const rotateX = -((y - centerY) / centerY) * intensity;

      setTilt({ rotateX, rotateY, scale: 1.02 });
    };

    const handleMouseLeave = () => {
      setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [elementRef, intensity]);

  return tilt;
};
