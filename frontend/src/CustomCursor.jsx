import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const reticleRef = useRef(null);
  const [isOverPhoto, setIsOverPhoto] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

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

    const handlePointerMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Center dot follows mouse coordinates directly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      // Show camera viewfinder cursor whenever hovering over photography elements
      const target = e.target;
      if (target) {
        // Exclude system UI logos, icons, avatars, slider buttons
        const isExcluded = target.closest(
          '.navbar-emblem-image, ' +
          '.brand-emblem-clean-img, ' +
          '.client-avatar-img, ' +
          '.founder-emblem-img, ' +
          '.inc-author-avatar, ' +
          '.navbar-brand-emblem-link, ' +
          '.floating-whatsapp-btn, ' +
          '.whatsapp-svg-icon, ' +
          '.inc-slider-arrow, ' +
          '.inc-dot'
        );

        if (isExcluded) {
          setIsOverPhoto(false);
          return;
        }

        const photoEl = target.closest(
          'img, ' +
          '.inc-hero-section, ' +
          '.inc-hero-slide, ' +
          '.inc-hero-image, ' +
          '.inc-abt-frame-1, ' +
          '.inc-abt-frame-2, ' +
          '.inc-showcase-image-card, ' +
          '.incredible-gallery-item, ' +
          '.clean-gallery-photo-card, ' +
          '.clean-gallery-img-container, ' +
          '.clean-lightbox-img, ' +
          '.hero-showcase-frame, ' +
          '[data-photo], ' +
          '[data-cursor="camera"]'
        );
        setIsOverPhoto(!!photoEl);
      }
    };

    // Camera shutter click animation handlers (only triggers on click)
    const handlePointerDown = () => setIsClicked(true);
    const handlePointerUp = () => setIsClicked(false);

    const handleMouseLeave = () => {
      setIsOverPhoto(false);
      setIsClicked(false);
    };

    // RAF loop for smooth camera viewfinder reticle interpolation (lerp)
    const tick = () => {
      const ease = 0.28;
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

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      className={`custom-cursor-root ${!isOverPhoto ? "is-hidden" : ""}`}
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
