import { useScroll, useTransform } from 'framer-motion';
import { RefObject, useEffect, useState } from 'react';

interface ScrollAnimationConfig {
  threshold?: number;
  rootMargin?: string;
  parallaxSpeed?: number;
}

/**
 * Advanced scroll animation hook with parallax and progress tracking
 * Returns scroll progress, parallax transforms, and visibility state
 */
export const useScrollAnimation = (
  ref: RefObject<HTMLElement>,
  config: ScrollAnimationConfig = {}
) => {
  const {
    threshold = 0.1,
    rootMargin = '-100px',
    parallaxSpeed = 0.5,
  } = config;

  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Parallax transforms
  const y = useTransform(scrollYProgress, [0, 1], [100 * parallaxSpeed, -100 * parallaxSpeed]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.95]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (!hasAnimated) {
            setHasAnimated(true);
          }
        } else {
          setIsInView(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, threshold, rootMargin, hasAnimated]);

  return {
    isInView,
    hasAnimated,
    scrollYProgress,
    parallax: { y, opacity, scale },
  };
};
