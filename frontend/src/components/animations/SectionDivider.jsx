import { motion, useReducedMotion } from "framer-motion";
import { easing } from "./animationConfig.js";

/**
 * <SectionDivider />
 * Elegant, subtle gradient line between sections with a central photography lens spark.
 * Expands gently from the center when scrolled into view.
 *
 * Props:
 *  - height: number (default: 1)
 *  - showSpark: boolean (default: true)
 *  - className: string
 */
export default function SectionDivider({
  height = 1,
  showSpark = true,
  className = "",
  style = {},
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={`luxury-section-divider ${className}`}
      aria-hidden="true"
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "1140px",
        margin: "0 auto",
        padding: "24px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        ...style,
      }}
    >
      {/* Expanding gradient line */}
      <motion.div
        style={{
          width: "100%",
          height,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(14, 165, 233, 0.15) 20%, rgba(14, 165, 233, 0.45) 50%, rgba(14, 165, 233, 0.15) 80%, transparent 100%)",
          transformOrigin: "center",
        }}
        initial={shouldReduceMotion ? { scaleX: 1, opacity: 0.6 } : { scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.1, ease: easing.cinematic }}
      />

      {/* Central camera lens diamond / aperture spark */}
      {showSpark && (
        <motion.div
          style={{
            position: "absolute",
            width: "8px",
            height: "8px",
            background: "#38bdf8",
            borderRadius: "50%",
            boxShadow: "0 0 10px #0ea5e9, 0 0 20px rgba(14, 165, 233, 0.6)",
          }}
          initial={shouldReduceMotion ? { scale: 1, opacity: 0.8 } : { scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.4, ease: easing.cinematic }}
        />
      )}
    </div>
  );
}
