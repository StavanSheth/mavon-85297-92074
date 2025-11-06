import { useState, useEffect } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

/**
 * Custom hook to track mouse position
 * Returns the current x, y coordinates of the mouse cursor
 */
export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return mousePosition;
};
