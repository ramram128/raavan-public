import { useEffect, useRef, useState } from "react";
import { expandedGallery, stories } from "../content.js";

const categories = ["All Works", "Couples", "Celebrations", "Details", "Black & White"];

function HomeStoryCarousel({ items, onSelect, suspended }) {
  const viewportRef = useRef(null);
  const movementRef = useRef(0);
  const [paused, setPaused] = useState(false);
  const settingsRef = useRef({ paused, suspended });
  settingsRef.current = { paused, suspended };

  const sequence = Array.from({ length: Math.max(items.length, 8) }, (_, index) => items[index % items.length]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const cards = [...viewport.querySelectorAll(".carousel-card")];
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame;
    let previousTime = 0;
    let period = 0;
    let visible = true;
    let focused = false;
    let touching = false;
    let manualUntil = 0;
    let carry = 0;

    function measure() {
      period = viewport.scrollWidth / 3;
      if (period > 0) viewport.scrollLeft = period;
    }
    const resize = new ResizeObserver(measure);
    resize.observe(viewport);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(viewport);

    function wheel(event) {
      if (event.ctrlKey || settingsRef.current.suspended) return;
      event.preventDefault();
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? viewport.clientWidth : 1;
      movementRef.current += delta * unit;
      manualUntil = performance.now() + 1200;
    }
    function focusIn() { focused = true; }
    function focusOut(event) { focused = viewport.contains(event.relatedTarget); }
    function touchStart() { touching = true; }
    function touchEnd() { touching = false; manualUntil = performance.now() + 1200; }

    function tick(time) {
      const elapsed = Math.min(time - (previousTime || time), 50);
      previousTime = time;
      if (visible && !document.hidden && period) {
        if (!touching && !focused && !settingsRef.current.suspended) {
          const manual = movementRef.current * (motion.matches ? 1 : 1 - Math.exp(-elapsed / 85));
          movementRef.current -= manual;
          carry += manual;
          if (!settingsRef.current.paused && !motion.matches && time > manualUntil) carry += elapsed * 0.022;
          const pixels = Math.trunc(carry);
          viewport.scrollLeft += pixels;
          carry -= pixels;
          if (viewport.scrollLeft >= period * 2) viewport.scrollLeft -= period;
          if (viewport.scrollLeft < period * 0.5) viewport.scrollLeft += period;
        }
        const center = viewport.scrollLeft + viewport.clientWidth / 2;
        for (const card of cards) {
          const distance = Math.max(-1.3, Math.min(1.3, (card.offsetLeft + card.offsetWidth / 2 - center) / (viewport.clientWidth / 2)));
          card.style.transform = `perspective(1100px) rotateY(${-distance * 22}deg) translateY(${-Math.abs(distance) * 18}px)`;
        }
      }
      frame = requestAnimationFrame(tick);
    }
    measure();
    movementRef.current = 0;
    viewport.addEventListener("wheel", wheel, { passive: false });
    viewport.addEventListener("focusin", focusIn);
    viewport.addEventListener("focusout", focusOut);
    viewport.addEventListener("touchstart", touchStart, { passive: true });
    viewport.addEventListener("touchend", touchEnd);
    viewport.addEventListener("touchcancel", touchEnd);
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      observer.disconnect();
      viewport.removeEventListener("wheel", wheel);
      viewport.removeEventListener("focusin", focusIn);
      viewport.removeEventListener("focusout", focusOut);
      viewport.removeEventListener("touchstart", touchStart);
      viewport.removeEventListener("touchend", touchEnd);
      viewport.removeEventListener("touchcancel", touchEnd);
    };
  }, [items]);

  return (
    <>
      <div
        className="story-carousel"
        ref={viewportRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Wedding stories"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            viewportRef.current.scrollLeft += (event.key === "ArrowRight" ? 1 : -1) * 320;
          }
        }}
      >
        <div className="carousel-track">
          {[0, 1, 2].flatMap((copy) =>
            sequence.map((story, index) => (
              <button
                className="story-card carousel-card"
                type="button"
                key={`${copy}-${index}-${story.id}`}
                tabIndex={copy === 1 && index < items.length ? 0 : -1}
                aria-hidden={copy !== 1 || index >= items.length ? true : undefined}
                onClick={() => onSelect(story)}
                aria-label={`View ${story.title}: ${story.description || story.story}`}
              >
                <img src={story.image} alt={story.alt} draggable="false" loading="lazy" />
                <span className="story-label">
                  <span>
                    <span className="story-category">{story.category}</span>
                    <span className="story-title">{story.title}</span>
                  </span>
                </span>
              </button>
            ))
          )}
        </div>
      </div>
      <div className="carousel-controls">
        <span>Scroll over the photographs to explore</span>
        <button
          type="button"
          aria-label="Previous stories"
          onClick={() => {
            movementRef.current -= 340;
          }}
        >
          ‹
        </button>
        <button type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>
          {paused ? "Play" : "Pause"}
        </button>
        <button
          type="button"
          aria-label="Next stories"
          onClick={() => {
            movementRef.current += 340;
          }}
        >
          ›
        </button>
      </div>
    </>
  );
}

export default function GallerySection({ onNavigate }) {
  const [activeCategory, setActiveCategory] = useState("All Works");
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const filteredPhotos =
    activeCategory === "All Works"
      ? expandedGallery
      : expandedGallery.filter((item) => item.category === activeCategory);

  // Keyboard navigation for lightbox
  useEffect(() => {
    function handleKeyDown(e) {
      if (!selectedPhoto) return;
      if (e.key === "Escape") {
        setSelectedPhoto(null);
      } else if (e.key === "ArrowRight") {
        const currentIndex = filteredPhotos.findIndex((p) => p.id === selectedPhoto.id);
        const nextIndex = (currentIndex + 1) % filteredPhotos.length;
        setSelectedPhoto(filteredPhotos[nextIndex]);
      } else if (e.key === "ArrowLeft") {
        const currentIndex = filteredPhotos.findIndex((p) => p.id === selectedPhoto.id);
        const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
        setSelectedPhoto(filteredPhotos[prevIndex]);
      }
    }
    if (selectedPhoto) {
      document.body.classList.add("modal-open");
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPhoto, filteredPhotos]);

  return (
    <section className="home-section section-gallery" id="gallery" aria-label="Wedding Gallery">
      {/* Section Header */}
      <div className="section-head-wrap">
        <div className="page-badge">Visual Portfolio</div>
        <h2>
          Love, remembered
          <br />
          as it actually felt.
        </h2>
        <p className="section-head-subtitle">
          Intimate elopements, golden sunsets, and celebratory nights captured across the UK,
          the Mediterranean, and beyond.
        </p>
      </div>

      {/* 3D Perspective Horizontal Carousel */}
      <div style={{ maxWidth: "1400px", margin: "0 auto 64px", padding: "0 24px" }}>
        <HomeStoryCarousel
          items={stories}
          onSelect={(story) => setSelectedPhoto(story)}
          suspended={Boolean(selectedPhoto)}
        />
      </div>

      {/* Filterable Editorial Grid */}
      <div className="content-wrapper">
        <div className="section-intro-block" style={{ marginBottom: "32px" }}>
          <p className="section-eyebrow">The Editorial Collection</p>
          <h3>Browse by Celebration Theme</h3>
        </div>

        {/* Filter Pills */}
        <div className="gallery-filter-chips" style={{ justifyContent: "center", marginBottom: "40px" }} role="group" aria-label="Filter gallery">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              className={`filter-chip${activeCategory === cat ? " active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Aspect Ratio Grid */}
        <div className="editorial-gallery-grid">
          {filteredPhotos.map((photo) => (
            <article
              key={photo.id}
              className={`gallery-card ${photo.aspect}`}
              onClick={() => setSelectedPhoto(photo)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedPhoto(photo);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Open photograph: ${photo.title}`}
            >
              <img src={photo.image} alt={photo.alt} loading="lazy" />
              <div className="gallery-card-overlay">
                <div className="gallery-card-tags">
                  <span className="gallery-tag">{photo.category}</span>
                  {photo.tag && <span className="gallery-tag">{photo.tag}</span>}
                </div>
                <h4>{photo.title}</h4>
                <p>{photo.story || photo.description}</p>
                <div className="gallery-card-location">
                  <span aria-hidden="true">📍</span>
                  <span>{photo.location} · {photo.year || "2025"}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedPhoto(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedPhoto.title} preview`}
        >
          <div className="modal-content-wrap" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              type="button"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close photo preview"
            >
              ✕
            </button>

            <button
              className="modal-nav-btn prev"
              type="button"
              onClick={() => {
                const currentIndex = filteredPhotos.findIndex((p) => p.id === selectedPhoto.id);
                const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
                setSelectedPhoto(filteredPhotos[prevIndex]);
              }}
              aria-label="Previous photograph"
            >
              ‹
            </button>

            <button
              className="modal-nav-btn next"
              type="button"
              onClick={() => {
                const currentIndex = filteredPhotos.findIndex((p) => p.id === selectedPhoto.id);
                const nextIndex = (currentIndex + 1) % filteredPhotos.length;
                setSelectedPhoto(filteredPhotos[nextIndex]);
              }}
              aria-label="Next photograph"
            >
              ›
            </button>

            <div className="modal-image-col">
              <img src={selectedPhoto.image} alt={selectedPhoto.alt} />
            </div>

            <div className="modal-info-col">
              <div>
                <div className="gallery-card-tags" style={{ marginBottom: "16px" }}>
                  <span className="gallery-tag" style={{ background: "var(--paper-deep)", color: "var(--accent)" }}>
                    {selectedPhoto.category}
                  </span>
                  {selectedPhoto.tag && (
                    <span className="gallery-tag" style={{ background: "var(--paper-deep)", color: "var(--muted)" }}>
                      {selectedPhoto.tag}
                    </span>
                  )}
                </div>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: "28px", fontWeight: 400, marginBottom: "8px" }}>
                  {selectedPhoto.title}
                </h3>
                <div style={{ fontSize: "13px", color: "var(--accent)", marginBottom: "20px" }}>
                  📍 {selectedPhoto.location} · {selectedPhoto.year || "2025"}
                </div>
                <p style={{ color: "var(--muted)", fontSize: "15px", lineHeight: "1.7", marginBottom: "24px" }}>
                  {selectedPhoto.story || selectedPhoto.description}
                </p>
              </div>

              <div style={{ paddingTop: "20px", borderTop: "1px solid var(--line)" }}>
                <a
                  href="#contact"
                  className="package-button"
                  style={{ textAlign: "center", textDecoration: "none" }}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedPhoto(null);
                    onNavigate("#contact");
                  }}
                >
                  Enquire For Your Wedding Date ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
