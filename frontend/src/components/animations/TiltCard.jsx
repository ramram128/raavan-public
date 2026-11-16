import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

/**
 * <TiltCard />
 * Subtle, elegant 3D tilt following the mouse with a soft cyan radial glow.
 * Automatically disabled on touch devices, mobile screens (<768px), and for reduced motion.
 *
 * Props:
 *  - maxTilt: number (default: 7 degrees - subtle & cinematic)
 *  - glow: boolean (default: true) - adds soft cyan camera-flash glow
 *  - className: string
 */
export default function TiltCard({
  children,
  maxTilt = 7,
  glow = true,
  className = "",
  style = {},
  ...props
}) {
  const cardRef = useRef(null);
  const [isTouchOrMobile, setIsTouchOrMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Detect touch or small viewport
  useEffect(() => {
    function checkDevice() {
      const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768;
      setIsTouchOrMobile(isTouch || isSmallScreen);
    }
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs to avoid jumpiness
  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-maxTilt, maxTilt]);

  // Glow position percentages
  const glowX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  function handleMouseMove(e) {
    if (!cardRef.current || isTouchOrMobile || shouldReduceMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseXPos = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseYPos = (e.clientY - rect.top) / rect.height - 0.5;

    x.set(mouseXPos);
    y.set(mouseYPos);
  }

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  }

  if (isTouchOrMobile || shouldReduceMotion) {
    return (
      <div className={className} style={style} {...props}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      className={`tilt-card-wrapper ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
        rotateX,
        rotateY,
        position: "relative",
        willChange: "transform",
        ...style,
      }}
      {...props}
    >
      {glow && (
        <motion.div
          className="tilt-card-glow-layer"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            pointerEvents: "none",
            zIndex: 2,
            opacity: isHovered ? 0.35 : 0,
            transition: "opacity 0.4s ease",
            background: `radial-gradient(circle 280px at ${glowX.get()} ${glowY.get()}, rgba(14, 165, 233, 0.3), transparent 70%)`,
          }}
        />
      )}
      <div style={{ position: "relative", zIndex: 1, height: "100%" }}>
        {children}
      </div>
    </motion.div>
  );
}
