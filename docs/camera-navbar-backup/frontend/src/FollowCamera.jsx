import { useEffect, useRef } from "react";

export default function FollowCamera() {
  const rootRef = useRef(null);
  const bodyRef = useRef(null);
  const lensRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame;
    let last = 0;
    let activity = performance.now();
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let yaw = 30;
    let hasPointer = false;
    let y = 0;
    let scrollY = window.scrollY;
    let scrollLook = 0;
    let shutterAt = -1000;

    function aim(clientX, clientY) {
      const rect = root.getBoundingClientRect();
      const dx = clientX - rect.left - rect.width / 2;
      const dy = clientY - rect.top - rect.height / 2;
      const distance = Math.hypot(dx, dy) || 1;
      const strength = 1 - Math.exp(-distance / 140);
      hasPointer = true;
      targetX = dx / distance * strength;
      targetY = dy / distance * strength;
      activity = performance.now();
    }
    function move(event) {
      if (event.pointerType === "mouse") aim(event.clientX, event.clientY);
    }
    function focus(event) {
      if (!root.closest("header")?.contains(event.target)) return;
      const rect = event.target.getBoundingClientRect();
      aim(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
    function reset(event) {
      if (!event.relatedTarget) { hasPointer = false; targetX = 0; targetY = 0; }
    }
    function scroll() {
      scrollLook = Math.max(-1, Math.min(1, (window.scrollY - scrollY) / 30));
      scrollY = window.scrollY;
      activity = performance.now();
    }
    function shutter() { shutterAt = performance.now(); activity = shutterAt; }
    function tick(now) {
      const dt = Math.min((now - (last || now)) / 16.67, 3);
      last = now;
      const idle = now - activity > 4000;
      const ease = 1 - Math.pow(.84, dt);
      const tx = motion.matches || idle ? 0 : targetX;
      const ty = motion.matches || idle ? 0 : targetY + scrollLook * .5;
      x += (tx - x) * ease;
      y += (ty - y) * ease;
      scrollLook *= Math.pow(.88, dt);
      const targetYaw = motion.matches || idle || !hasPointer ? 30 : 10 + targetX * 32;
      yaw += (targetYaw - yaw) * ease;
      bodyRef.current.style.transform = `rotateY(${yaw}deg) rotateX(${-9 - y * 18}deg)`;
      lensRef.current.style.transform = `translate3d(${x * 1.8}px, ${y * 1.5}px, 0)`;
      root.style.setProperty("--camera-light-x", `${35 + x * 25}%`);
      const snap = !motion.matches && now - shutterAt < 260;
      root.style.setProperty("--camera-shutter", snap ? ".25" : "1");
      frame = requestAnimationFrame(tick);
    }
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerout", reset);
    document.addEventListener("focusin", focus);
    window.addEventListener("scroll", scroll, { passive: true });
    root.addEventListener("click", shutter);
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerout", reset);
      document.removeEventListener("focusin", focus);
      window.removeEventListener("scroll", scroll);
      root.removeEventListener("click", shutter);
    };
  }, []);

  return (
    <div className="follow-camera" ref={rootRef} aria-hidden="true">
      <div className="camera-object" ref={bodyRef}>
        <div className="camera-back" />
        <div className="camera-side camera-side-left" />
        <div className="camera-side camera-side-right" />
        <div className="camera-top" />
        <div className="camera-bottom" />
        <div className="camera-face">
          <div className="camera-viewfinder"><i /></div>
          <div className="camera-shutter-button" />
          <div className="camera-dial" />
          <div className="camera-grip" />
          <div className="camera-indicator" />
          <span className="camera-brand">RAAVAN</span>
          <span className="camera-model">PRO</span>
          <div className="camera-mount-screw screw-left" />
          <div className="camera-mount-screw screw-right" />
          <div className="camera-strap-lug" />
          <div className="camera-lens" ref={lensRef}>
            {Array.from({ length: 16 }, (_, index) => (
              <div className="camera-barrel-ring" key={index} style={{ transform: `translateZ(${3 + index * 2}px)` }} />
            ))}
            <div className="camera-lens-front">
              <div className="camera-lens-lettering">50 / 1.4</div>
              <div className="camera-glass">
                <div className="camera-inner-ring" />
                <div className="camera-aperture" />
                <div className="camera-reflection" />
                <div className="camera-reflection-small" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
