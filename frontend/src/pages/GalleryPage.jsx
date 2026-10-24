import { useEffect, useState } from "react";
import { expandedGallery, stories } from "../content.js";

const categories = ["All Works", "Couples", "Celebrations", "Details", "Black & White"];

export default function GalleryPage({ onNavigate }) {
  const [activeCategory, setActiveCategory] = useState("All Works");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "journey"
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
    <main className="page-container gallery-page-view" id="gallery-page">
      {/* Hero Header */}
      <section className="page-hero">
        <h1>The Stories Collection</h1>
        <p className="page-subtitle">
          Intimate elopements, golden sunsets, and celebratory nights captured across the UK,
          the Mediterranean, and beyond.
        </p>
      </section>

      <div className="content-wrapper">
        {/* Controls Bar: Filters & View Switcher */}
        <div className="gallery-controls-bar">
          <div className="gallery-filter-chips" role="group" aria-label="Filter portfolio categories">
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

          <div className="gallery-view-mode" role="group" aria-label="Portfolio view mode">
            <button
              type="button"
              className={`view-mode-button${viewMode === "grid" ? " active" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              Editorial Grid
            </button>
            <button
              type="button"
              className={`view-mode-button${viewMode === "journey" ? " active" : ""}`}
              onClick={() => setViewMode("journey")}
            >
              Cinematic Journey
            </button>
          </div>
        </div>

        {/* View Mode 1: Editorial Portfolio Grid */}
        {viewMode === "grid" ? (
          <section className="editorial-gallery-grid" aria-label="Wedding photographs grid">
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
                    <span className="gallery-tag">{photo.tag}</span>
                  </div>
                  <h3>{photo.title}</h3>
                  <p>{photo.story}</p>
                  <div className="gallery-card-location">
                    <span aria-hidden="true">📍</span>
                    <span>{photo.location} · {photo.year}</span>
                  </div>
                </div>
              </article>
            ))}
          </section>
        ) : (
          /* View Mode 2: Original Cinematic Journey Full-bleed Panels */
          <section className="gallery-journey" aria-label="Wedding story gallery journey">
            {stories.map((story, index) => (
              <section
                className={`gallery-panel ${index === 0 ? "start" : index === stories.length - 1 ? "end" : "centre"}`}
                key={story.id}
                aria-label={`${index + 1} of ${stories.length}: ${story.title}`}
              >
                <img className="gallery-backdrop" src={story.image} alt="" aria-hidden="true" />
                <div className="gallery-vignette" aria-hidden="true" />
                <div className="gallery-track">
                  <div className="gallery-content">
                    <div className="gallery-meta">
                      <span>LOVE STORIES</span>
                      <span>/ {String(index + 1).padStart(2, "0")}</span>
                    </div>
                    <figure className="gallery-image-wrap">
                      <img src={story.image} alt={story.alt} decoding="async" />
                    </figure>
                    <div className="gallery-story-caption">
                      <span aria-hidden="true">{"/".repeat(index + 1)}</span>
                      <h1>{story.title}</h1>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </section>
        )}
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
                  <span className="gallery-tag" style={{ background: "var(--paper-deep)", color: "var(--muted)" }}>
                    {selectedPhoto.tag}
                  </span>
                </div>
                <h2 style={{ fontFamily: "var(--serif)", fontSize: "28px", fontWeight: 400, marginBottom: "8px" }}>
                  {selectedPhoto.title}
                </h2>
                <div style={{ fontSize: "13px", color: "var(--accent)", marginBottom: "20px" }}>
                  📍 {selectedPhoto.location} · {selectedPhoto.year}
                </div>
                <p style={{ color: "var(--muted)", fontSize: "15px", lineHeight: "1.7", marginBottom: "24px" }}>
                  {selectedPhoto.story}
                </p>
              </div>

              <div style={{ paddingTop: "20px", borderTop: "1px solid var(--line)" }}>
                <a
                  href="/contact"
                  className="package-button"
                  style={{ textAlign: "center", textDecoration: "none" }}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedPhoto(null);
                    onNavigate("/contact");
                  }}
                >
                  Enquire For Your Wedding Date ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA Banner */}
      <section className="content-wrapper" style={{ marginTop: "64px" }}>
        <div className="page-cta-banner">
          <h2>Like what you see?</h2>
          <p>
            Every gallery we deliver contains between 400 to 1,000+ timeless frames,
            hand-graded with love and care.
          </p>
          <a
            href="/contact"
            className="cta-button"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("/contact");
            }}
          >
            Tell Us What You’re Dreaming Of <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </main>
  );
}
