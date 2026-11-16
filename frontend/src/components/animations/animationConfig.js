/**
 * Raavan Studio’z — Centralized Animation Configuration
 * Provides unified timing, easing, stagger values, and a global intensity multiplier
 * so animation speed and feel can be adjusted studio-wide in one place.
 */

// Global speed multiplier: set < 1.0 for snappier animations, > 1.0 for more relaxed cinematic pace
export const GLOBAL_ANIMATION_MULTIPLIER = 1.0;

export const easing = {
  // Ultra-luxurious camera glide curve
  cinematic: [0.16, 1, 0.3, 1],
  // Standard refined UI transition
  smooth: [0.25, 0.1, 0.25, 1],
  // Gentle resting curve
  gentle: [0.4, 0, 0.2, 1],
  // Subtle energetic return
  subtleBounce: [0.34, 1.25, 0.64, 1],
};

export const durations = {
  instant: 0.15 * GLOBAL_ANIMATION_MULTIPLIER,
  fast: 0.35 * GLOBAL_ANIMATION_MULTIPLIER,
  normal: 0.65 * GLOBAL_ANIMATION_MULTIPLIER,
  slow: 0.95 * GLOBAL_ANIMATION_MULTIPLIER,
  cinematic: 1.2 * GLOBAL_ANIMATION_MULTIPLIER,
  ambient: 18 * GLOBAL_ANIMATION_MULTIPLIER,
};

export const delays = {
  none: 0,
  micro: 0.06 * GLOBAL_ANIMATION_MULTIPLIER,
  short: 0.15 * GLOBAL_ANIMATION_MULTIPLIER,
  medium: 0.3 * GLOBAL_ANIMATION_MULTIPLIER,
  long: 0.5 * GLOBAL_ANIMATION_MULTIPLIER,
};

export const staggers = {
  tight: 0.06 * GLOBAL_ANIMATION_MULTIPLIER,
  normal: 0.12 * GLOBAL_ANIMATION_MULTIPLIER,
  loose: 0.2 * GLOBAL_ANIMATION_MULTIPLIER,
};

export const brandColors = {
  cyanPrimary: "#0284c7",
  cyanBright: "#0ea5e9",
  cyanGlow: "rgba(14, 165, 233, 0.35)",
  navyDeep: "#0a192f",
  silverSoft: "rgba(226, 232, 240, 0.4)",
  goldAccent: "#f59e0b",
  greenAccent: "#10b981",
};

/**
 * Check whether user prefers reduced motion
 */
export function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default {
  GLOBAL_ANIMATION_MULTIPLIER,
  easing,
  durations,
  delays,
  staggers,
  brandColors,
  prefersReducedMotion,
};
