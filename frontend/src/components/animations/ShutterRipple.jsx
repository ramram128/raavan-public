import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * <ShutterRipple />
 * Emits a high-precision camera shutter aperture ripple ring on click.
 * Visual only, zero audio. Wrap-able around any button, link, or CTA.
 */
export default function ShutterRipple({
  children,
  className = "",
  color = "rgba(14, 165, 233, 0.75)",
  ringColor = "rgba(56, 189, 248, 0.9)",
  ...props
}) {
  const [ripples, setRipples] = useState([]);
  const shouldReduceMotion = useReducedMotion();

  function triggerShutter(e) {
    if (shouldReduceMotion) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX ? e.clientX - rect.left : rect.width / 2;
    const y = e.clientY ? e.clientY - rect.top : rect.height / 2;
    const size = Math.max(rect.width, rect.height) * 2;

    const newRipple = {
      id: Date.now() + Math.random(),
      x,
      y,
      size,
    };

    setRipples((prev) => [...prev.slice(-3), newRipple]);
  }

  function handleAnimationComplete(id) {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <div
      className={`shutter-ripple-container ${className}`}
      onClick={triggerShutter}
      style={{
        position: "relative",
        display: "inline-flex",
        overflow: "hidden",
        borderRadius: "inherit",
      }}
      {...props}
    >
      {children}

      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            aria-hidden="true"
            onAnimationComplete={() => handleAnimationComplete(r.id)}
            style={{
              position: "absolute",
              left: r.x - r.size / 2,
              top: r.y - r.size / 2,
              width: r.size,
              height: r.size,
              borderRadius: "50%",
              pointerEvents: "none",
              border: `2px solid ${ringColor}`,
              boxShadow: `0 0 16px ${color}, inset 0 0 12px ${color}`,
              zIndex: 10,
            }}
            initial={{ scale: 0, opacity: 0.85 }}
            animate={{ scale: 1.15, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.65,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
