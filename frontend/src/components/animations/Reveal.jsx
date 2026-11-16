import { motion, useReducedMotion } from "framer-motion";
import { easing, durations, delays } from "./animationConfig.js";

/**
 * <Reveal />
 * Scroll-triggered reveal wrapper.
 * Props:
 *  - direction: "up" | "down" | "left" | "right" | "none" (default: "up")
 *  - delay: number in seconds (default: 0)
 *  - duration: number in seconds (default: durations.normal)
 *  - blur: boolean (default: false) - subtle camera lens focus transition
 *  - once: boolean (default: true) - trigger once only
 *  - className: string
 *  - as: string | motion element (default: "div")
 */
export default function Reveal({
  children,
  direction = "up",
  delay = delays.none,
  duration = durations.normal,
  blur = false,
  once = true,
  className = "",
  style = {},
  as = "div",
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();

  // If user prefers reduced motion, render clean instant opacity fade
  if (shouldReduceMotion) {
    const Component = motion[as] || motion.div;
    return (
      <Component
        className={className}
        style={style}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once, margin: "-80px" }}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {children}
      </Component>
    );
  }

  const offset = 32;
  const initialVariants = {
    opacity: 0,
    x: direction === "left" ? offset : direction === "right" ? -offset : 0,
    y: direction === "up" ? offset : direction === "down" ? -offset : 0,
    filter: blur ? "blur(8px)" : "blur(0px)",
  };

  const animateVariants = {
    opacity: 1,
    x: 0,
    y: 0,
    filter: "blur(0px)",
  };

  const Component = motion[as] || motion.div;

  return (
    <Component
      className={className}
      style={{ willChange: "transform, opacity", ...style }}
      initial={initialVariants}
      whileInView={animateVariants}
      viewport={{ once, margin: "-80px" }}
      transition={{
        duration,
        delay,
        ease: easing.cinematic,
      }}
      {...props}
    >
      {children}
    </Component>
  );
}
