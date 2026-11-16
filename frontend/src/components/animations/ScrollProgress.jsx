import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

/**
 * <ScrollProgress />
 * Ultra-thin cyan gradient scroll indicator fixed at the top of the viewport.
 * Uses spring smoothing to ensure buttery responsiveness as the user scrolls.
 */
export default function ScrollProgress({ height = 3, className = "" }) {
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  // Gentle spring so bar glides rather than skips
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      className={`luxury-scroll-progress ${className}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height,
        transformOrigin: "0%",
        scaleX,
        zIndex: 99999,
        pointerEvents: "none",
        background: "linear-gradient(90deg, #0284c7 0%, #0ea5e9 50%, #38bdf8 100%)",
        boxShadow: "0 0 12px rgba(14, 165, 233, 0.65), 0 0 4px rgba(2, 132, 199, 0.9)",
      }}
      aria-hidden="true"
    />
  );
}
