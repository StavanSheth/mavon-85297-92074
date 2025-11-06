/**
 * Animation Configuration
 * Centralized animation presets for consistent motion design
 */

export const animationConfig = {
  // Spring presets for framer-motion
  spring: {
    soft: {
      type: "spring" as const,
      stiffness: 100,
      damping: 20,
      mass: 1,
    },
    medium: {
      type: "spring" as const,
      stiffness: 200,
      damping: 25,
      mass: 1,
    },
    bouncy: {
      type: "spring" as const,
      stiffness: 300,
      damping: 15,
      mass: 1,
    },
    snappy: {
      type: "spring" as const,
      stiffness: 400,
      damping: 30,
      mass: 1,
    },
  },

  // Easing curves
  easing: {
    smooth: [0.25, 0.4, 0.25, 1],
    easeOut: [0.4, 0, 0.2, 1],
    easeIn: [0.4, 0, 1, 1],
    elastic: [0.68, -0.55, 0.265, 1.55],
  },

  // Duration presets (in seconds)
  duration: {
    instant: 0.15,
    fast: 0.3,
    normal: 0.5,
    slow: 0.8,
    verySlow: 1.2,
  },

  // Stagger delays for sequential animations
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.2,
  },

  // Cursor animation configs
  cursor: {
    magneticStrength: 0.4,
    trailLifetime: 300, // ms
    maxTrailParticles: 8,
  },

  // Scroll animation configs
  scroll: {
    threshold: 0.1,
    rootMargin: '-100px',
  },

  // Particle system configs
  particles: {
    count: 20,
    speed: {
      min: 0.5,
      max: 1.5,
    },
    size: {
      min: 2,
      max: 6,
    },
  },
};

// Variants for framer-motion
export const fadeInUpVariants = {
  hidden: { 
    opacity: 0, 
    y: 60,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: animationConfig.duration.normal,
      ease: animationConfig.easing.smooth,
    },
  },
};

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: animationConfig.duration.normal,
    },
  },
};

export const scaleInVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: animationConfig.duration.fast,
      ease: animationConfig.easing.smooth,
    },
  },
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: animationConfig.stagger.normal,
    },
  },
};
