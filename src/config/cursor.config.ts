/**
 * Cursor Engine Configuration
 * Centralized settings for cursor physics and behavior
 */

export const cursorConfig = {
  // Cursor core settings
  cursor: {
    dotSize: 8,
    ringSize: 40,
    ringBorder: 2,
    transitionSpeed: 0.15,
    hoverScale: 1.5,
    clickScale: 0.8,
  },

  // Magnetic effect
  magnetic: {
    enabled: true,
    strength: 0.4,
    maxDistance: 100,
    smoothing: 0.2,
  },

  // Trail particles
  trail: {
    enabled: true,
    velocityThreshold: 2,
    maxParticles: 12,
    lifetime: 400,
    size: 6,
    opacity: 0.8,
    spawnRate: 2,
  },

  // Spirit particles (occasional leaf-firefly hybrids)
  spirit: {
    enabled: true,
    spawnChance: 0.15,
    lifetime: 800,
    size: 8,
    colors: ['hsl(150, 100%, 50%)', 'hsl(45, 100%, 50%)'],
  },

  // Ripple effect
  ripple: {
    duration: 600,
    maxSize: 100,
    opacity: 0.6,
  },

  // Device detection
  device: {
    disableOnTouch: true,
    mobileBreakpoint: 768,
    tabletBreakpoint: 1024,
  },

  // Performance
  performance: {
    useRAF: true,
    throttleDelay: 16,
    maxFPS: 120,
  },
};
