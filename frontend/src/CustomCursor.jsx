import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const reticleRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isText, setIsText] = useState(false);

  useEffect(() => {
    // Only run on non-touch devices with fine pointers
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let reticleX = -100;
    let reticleY = -100;
    let animId = null;
    let hasMoved = false;

    const handlePointerMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        reticleX = mouseX;
        reticleY = mouseY;
        setIsVisible(true);
      }

      // Center dot follows mouse coordinates directly with zero lag
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      // Hide custom cursor over text inputs so native text cursor displays cleanly
      const target = e.target;
      if (target) {
        const textInput = !!target.closest('input[type="text"], input[type="email"], input[type="tel"], textarea');
        setIsText(textInput);
      }
    };

    // Camera shutter click animation handlers (only triggers on click)
    const handlePointerDown = () => setIsClicked(true);
    const handlePointerUp = () => setIsClicked(false);

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsClicked(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // RAF loop for smooth camera viewfinder reticle interpolation (lerp)
    const tick = () => {
      const ease = 0.22;
      reticleX += (mouseX - reticleX) * ease;
      reticleY += (mouseY - reticleY) * ease;

      if (reticleRef.current) {
        reticleRef.current.style.transform = `translate3d(${reticleX}px, ${reticleY}px, 0) translate(-50%, -50%)`;
      }

      animId = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return (
    <div
      className={`custom-cursor-root ${!isVisible ? "is-hidden" : ""} ${isText ? "is-text-mode" : ""}`}
      aria-hidden="true"
    >
      {/* 4 Viewfinder Bracket Corners with Shutter Click Animation */}
      <div
        ref={reticleRef}
        className={`custom-cursor-reticle ${isClicked ? "is-clicked" : ""}`}
      >
        <span className="reticle-corner top-left" />
        <span className="reticle-corner top-right" />
        <span className="reticle-corner bottom-left" />
        <span className="reticle-corner bottom-right" />
      </div>

      {/* Central Camera Focus Dot */}
      <div
        ref={dotRef}
        className={`custom-cursor-dot ${isClicked ? "is-clicked" : ""}`}
      />
    </div>
  );
}
