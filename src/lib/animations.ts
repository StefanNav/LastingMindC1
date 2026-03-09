// Shared Framer Motion animation presets — from DESIGN_TOKENS.md
// Use these throughout the app for consistent motion language.

export const transitions = {
  // Standard transitions
  default: { type: "spring" as const, stiffness: 300, damping: 30 },
  gentle: { type: "spring" as const, stiffness: 200, damping: 25 },
  snappy: { type: "spring" as const, stiffness: 400, damping: 35 },
  slow: { type: "spring" as const, stiffness: 100, damping: 20 },

  // Specific uses
  pageEnter: { type: "spring" as const, stiffness: 300, damping: 30, delay: 0.1 },
  bottomSheet: { type: "spring" as const, stiffness: 350, damping: 30 },
  cardReveal: { type: "spring" as const, stiffness: 200, damping: 20 },
  treeGrowth: { type: "spring" as const, stiffness: 80, damping: 15, duration: 2 },
  celebration: { type: "spring" as const, stiffness: 150, damping: 12 },
};

export const animations = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  },
  slideUp: {
    initial: { y: "100%" },
    animate: { y: 0 },
    exit: { y: "100%" },
  },
  scaleIn: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 },
  },
  pulse: {
    animate: {
      scale: [1, 1.05, 1],
      transition: { repeat: Infinity, duration: 2 },
    },
  },
  crossfade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
};
