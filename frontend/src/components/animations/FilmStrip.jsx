import { motion, useReducedMotion } from "framer-motion";

/**
 * <FilmStrip />
 * Decorative 35mm cinematic film strip with authentic sprocket holes.
 * Slowly glides horizontally in an endless loop at low opacity.
 *
 * Props:
 *  - speed: number in seconds for one full loop (default: 40)
 *  - opacity: number (default: 0.18)
 *  - direction: "left" | "right" (default: "left")
 *  - height: number (default: 28)
 *  - className: string
 */
export default function FilmStrip({
  speed = 40,
  opacity = 0.18,
  direction = "left",
  height = 28,
  className = "",
}) {
  const shouldReduceMotion = useReducedMotion();

  // Sprocket holes repeated pattern
  const frameCount = 24;
  const frames = Array.from({ length: frameCount }, (_, i) => i);

  return (
    <div
      className={`cinematic-film-strip-wrapper ${className}`}
      aria-hidden="true"
      style={{
        position: "relative",
        width: "100%",
        height,
        overflow: "hidden",
        pointerEvents: "none",
        opacity,
        display: "flex",
        alignItems: "center",
      }}
    >
      <motion.div
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          willChange: "transform",
        }}
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
              }
        }
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
      >
        {/* Render twice for seamless infinite loop */}
        {[0, 1].map((copyIdx) => (
          <div
            key={copyIdx}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              paddingRight: "8px",
            }}
          >
            {frames.map((f) => (
              <div
                key={f}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  width: "56px",
                  height: height - 4,
                  border: "1px solid rgba(14, 165, 233, 0.4)",
                  borderRadius: "3px",
                  padding: "3px 4px",
                  background: "rgba(10, 25, 47, 0.05)",
                }}
              >
                {/* Top Sprocket Hole */}
                <div
                  style={{
                    width: "8px",
                    height: "4px",
                    borderRadius: "1.5px",
                    background: "rgba(14, 165, 233, 0.45)",
                    margin: "0 auto",
                  }}
                />
                {/* Center Frame Indicator */}
                <div
                  style={{
                    fontSize: "7px",
                    fontFamily: "monospace",
                    color: "rgba(14, 165, 233, 0.5)",
                    textAlign: "center",
                    lineHeight: 1,
                  }}
                >
                  {(f + 1).toString().padStart(2, "0")}A
                </div>
                {/* Bottom Sprocket Hole */}
                <div
                  style={{
                    width: "8px",
                    height: "4px",
                    borderRadius: "1.5px",
                    background: "rgba(14, 165, 233, 0.45)",
                    margin: "0 auto",
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
