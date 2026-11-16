import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { easing } from "./animationConfig.js";

/**
 * <CountUp />
 * Counts a number from 0 to target when scrolled into view, once only.
 * Supports suffix like "+", prefix like "₹", and decimals (e.g. 5.0).
 * Calls an optional onComplete callback.
 *
 * Props:
 *  - target: number | string (e.g. 8, 500, 5.0)
 *  - duration: number in seconds (default: 2)
 *  - delay: number in seconds (default: 0)
 *  - suffix: string (e.g. "+", "%")
 *  - prefix: string (e.g. "₹")
 *  - decimals: number (default auto-detected from target)
 *  - onComplete: callback function
 *  - className: string
 */
export default function CountUp({
  target = 0,
  duration = 2.0,
  delay = 0,
  suffix = "",
  prefix = "",
  decimals,
  onComplete,
  className = "",
  ...props
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();

  // Parse numeric target and decimal count
  const numericTarget = typeof target === "string" ? parseFloat(target.replace(/[^0-9.]/g, "")) : Number(target);
  
  const decimalCount =
    typeof decimals === "number"
      ? decimals
      : (String(target).split(".")[1] || "").length;

  const [currentVal, setCurrentVal] = useState(shouldReduceMotion ? numericTarget : 0);
  const [hasCompleted, setHasCompleted] = useState(false);

  useEffect(() => {
    if (!isInView || hasCompleted) return;

    if (shouldReduceMotion) {
      setCurrentVal(numericTarget);
      setHasCompleted(true);
      if (onComplete) onComplete();
      return;
    }

    let startTime = null;
    let animationFrameId = null;

    // Standard cubic-bezier easing evaluation
    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    const delayTimeout = setTimeout(() => {
      function animateNumber(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        const easedProgress = easeOutCubic(progress);
        const value = easedProgress * numericTarget;

        setCurrentVal(value);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animateNumber);
        } else {
          setCurrentVal(numericTarget);
          setHasCompleted(true);
          if (onComplete) onComplete();
        }
      }

      animationFrameId = requestAnimationFrame(animateNumber);
    }, delay * 1000);

    return () => {
      clearTimeout(delayTimeout);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, numericTarget, duration, delay, shouldReduceMotion, hasCompleted, onComplete]);

  const formattedValue = currentVal.toLocaleString("en-US", {
    minimumFractionDigits: decimalCount,
    maximumFractionDigits: decimalCount,
  });

  return (
    <span ref={ref} className={className} {...props}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
}
