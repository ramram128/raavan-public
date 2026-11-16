import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * <BokehBackground />
 * Atmospheric photography-bokeh effect with slow floating, blurred cyan and silver orbs.
 * Very low opacity, pointer-events none, zero layout shift.
 * Automatically displays fewer orbs on mobile screens.
 */
export default function BokehBackground({ count = 5, className = "" }) {
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function checkSize() {
      setIsMobile(window.innerWidth < 768);
    }
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const orbList = isMobile
    ? [
        { id: 1, size: 260, top: "15%", left: "10%", color: "rgba(14, 165, 233, 0.08)", duration: 24, dx: 30, dy: 40 },
        { id: 2, size: 220, top: "65%", right: "8%", color: "rgba(203, 213, 225, 0.12)", duration: 28, dx: -25, dy: 35 },
      ]
    : [
        { id: 1, size: 340, top: "10%", left: "8%", color: "rgba(14, 165, 233, 0.09)", duration: 26, dx: 45, dy: 50 },
        { id: 2, size: 280, top: "45%", right: "12%", color: "rgba(56, 189, 248, 0.07)", duration: 32, dx: -40, dy: 45 },
        { id: 3, size: 380, top: "75%", left: "20%", color: "rgba(226, 232, 240, 0.15)", duration: 36, dx: 35, dy: -40 },
        { id: 4, size: 240, top: "30%", left: "55%", color: "rgba(245, 158, 11, 0.04)", duration: 28, dx: -30, dy: 30 },
        { id: 5, size: 320, top: "85%", right: "18%", color: "rgba(2, 132, 199, 0.06)", duration: 34, dx: 40, dy: -35 },
      ].slice(0, count);

  return (
    <div
      className={`bokeh-background-canvas ${className}`}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {orbList.map((orb) => (
        <motion.div
          key={orb.id}
          style={{
            position: "absolute",
            width: orb.size,
            height: orb.size,
            borderRadius: "50%",
            top: orb.top,
            left: orb.left,
            right: orb.right,
            background: orb.color,
            filter: "blur(60px)",
            willChange: "transform",
          }}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: [0, orb.dx, -orb.dx * 0.6, 0],
                  y: [0, orb.dy, -orb.dy * 0.8, 0],
                  scale: [1, 1.08, 0.94, 1],
                }
          }
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
