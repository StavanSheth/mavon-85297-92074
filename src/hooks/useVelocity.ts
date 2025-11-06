import { useState, useEffect, useRef } from 'react';
import { cursorConfig } from '@/config/cursor.config';

interface Velocity {
  x: number;
  y: number;
  speed: number;
}

/**
 * Custom hook to track mouse velocity
 * Returns velocity vector and speed for trail activation
 */
export const useVelocity = (): Velocity => {
  const [velocity, setVelocity] = useState<Velocity>({ x: 0, y: 0, speed: 0 });
  const lastPositionRef = useRef({ x: 0, y: 0, time: Date.now() });
  const rafRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const currentTime = Date.now();
        const deltaTime = currentTime - lastPositionRef.current.time;

        if (deltaTime === 0) return;

        const deltaX = e.clientX - lastPositionRef.current.x;
        const deltaY = e.clientY - lastPositionRef.current.y;

        const vx = deltaX / deltaTime;
        const vy = deltaY / deltaTime;
        const speed = Math.sqrt(vx * vx + vy * vy);

        setVelocity({ x: vx, y: vy, speed: speed * 1000 }); // Scale for better readability

        lastPositionRef.current = {
          x: e.clientX,
          y: e.clientY,
          time: currentTime,
        };
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return velocity;
};
