import { useEffect, useState } from "react";
import { fetchFromApi } from "../api.js";
import { expandedGallery as fallbackGallery, studio } from "../content.js";

const categories = [
  "All Works",
  "Weddings",
  "Couple portraits",
  "Toddlers",
  "Maternity",
  "Photobooks",
];

export default function GalleryPage({ onNavigate }) {
  const [photos, setPhotos] = useState(fallbackGallery);
  const [activeCategory, setActiveCategory] = useState("All Works");
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    fetchFromApi("/gallery", null).then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        const formatted = data.map((item) => ({
          id: `gal-${item.id}`,
          title: item.title,
          category: item.category,
          location: item.location || item.couple_or_client,
          description: item.description,
          image: item.image_url,
          aspect: item.aspect || "portrait",
        }));
        setPhotos(formatted);
      }
    });
  }, []);

  const filteredPhotos =
    activeCategory === "All Works"
      ? photos
      : photos.filter((item) => {
          if (activeCategory === "Weddings") return item.category.toLowerCase().includes("wedding");
          if (activeCategory === "Couple portraits") return item.category.toLowerCase().includes("couple");
          if (activeCategory === "Toddlers") return item.category.toLowerCase().includes("toddler") || item.category.toLowerCase().includes("newborn");
          if (activeCategory === "Maternity") return item.category.toLowerCase().includes("maternity");
          if (activeCategory === "Photobooks") return item.category.toLowerCase().includes("photobook");
          return item.category === activeCategory;
        });

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
    <div className="clean-subpage-root gallery-page-root" id="gallery-page">
      {/* ============================================================== */}
      {/* 1. HERO HEADER & CATEGORY FILTERS                              */}
      {/* ============================================================== */}
      <section className="clean-page-hero">
        <div className="inc-container">
          <div className="clean-hero-badge-wrap">
            <span className="clean-eyebrow-tag">OUR CURATED WORKS</span>
          </div>
          <h1 className="clean-page-title">
            Stories &amp; Moments Preserved
          </h1>
          <p className="clean-page-subtitle">
            Unscripted wedding cinema, precious newborn &amp; toddler milestones with <strong>@toddlers_by_raavan</strong>, and handcrafted heirloom photobooks.
          </p>

          {/* Category Filter Tabs */}
          <div className="clean-gallery-filter-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`gallery-filter-pill${activeCategory === cat ? " active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                <span>{cat}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. PHOTO GRID DISPLAY                                          */}
      {/* ============================================================== */}
      <section className="inc-section-wrap gallery-grid-section">
        <div className="inc-container">
          <div className="clean-gallery-grid">
            {filteredPhotos.map((photo, index) => (
              <div
                key={photo.id}
                className={`clean-gallery-card reveal-on-scroll stagger-${(index % 4) + 1}`}
                data-photo="true"
                onClick={() => setSelectedPhoto(photo)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setSelectedPhoto(photo);
                }}
              >
                <div className="gallery-photo-holder">
                  <img src={photo.image} alt={photo.title} loading="lazy" />
                  <div className="gallery-photo-overlay">
                    <span className="gallery-photo-badge">{photo.category}</span>
                    <h3 className="gallery-photo-title">{photo.title}</h3>
                    {photo.description && (
                      <p className="gallery-photo-story">{photo.description}</p>
                    )}
                    {photo.location && (
                      <span className="gallery-photo-location">{photo.location}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPhotos.length === 0 && (
            <div className="gallery-empty-state">
              <p>No photos found in this category.</p>
              <button
                type="button"
                className="clean-primary-btn"
                onClick={() => setActiveCategory("All Works")}
              >
                Show All Works
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. LIGHTBOX FULLSCREEN MODAL                                   */}
      {/* ============================================================== */}
      {selectedPhoto && (
        <div
          className="clean-lightbox-backdrop"
          onClick={() => setSelectedPhoto(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="clean-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              className="clean-lightbox-close-btn"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Prev Arrow */}
            <button
              type="button"
              className="lightbox-nav-arrow arrow-prev"
              onClick={() => {
                const cur = filteredPhotos.findIndex((p) => p.id === selectedPhoto.id);
                const prev = (cur - 1 + filteredPhotos.length) % filteredPhotos.length;
                setSelectedPhoto(filteredPhotos[prev]);
              }}
              aria-label="Previous photo"
            >
              ‹
            </button>

            {/* Next Arrow */}
            <button
              type="button"
              className="lightbox-nav-arrow arrow-next"
              onClick={() => {
                const cur = filteredPhotos.findIndex((p) => p.id === selectedPhoto.id);
                const next = (cur + 1) % filteredPhotos.length;
                setSelectedPhoto(filteredPhotos[next]);
              }}
              aria-label="Next photo"
            >
              ›
            </button>

            {/* Lightbox Image */}
            <div className="clean-lightbox-img-wrap">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="clean-lightbox-img"
              />
            </div>

            {/* Lightbox Footer Details */}
            <div className="clean-lightbox-meta-bar">
              <div className="lightbox-meta-text">
                <span className="lightbox-cat-tag">{selectedPhoto.category}</span>
                <h3 className="lightbox-title">{selectedPhoto.title}</h3>
                {selectedPhoto.description && (
                  <p className="lightbox-desc">{selectedPhoto.description}</p>
                )}
                {selectedPhoto.location && (
                  <span className="lightbox-loc">{selectedPhoto.location}</span>
                )}
              </div>

              <a
                href={`https://wa.me/919500306696?text=${encodeURIComponent(
                  `Hi Gowtham Raj! I saw your photo "${selectedPhoto.title}" in the gallery and would like to enquire about similar shoots.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="lightbox-whatsapp-action"
              >
                <span>Enquire This Style on WhatsApp →</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. DIRECT CTA                                                  */}
      {/* ============================================================== */}
      <section className="inc-section-wrap inc-alt-bg">
        <div className="inc-container">
          <div className="clean-cta-box reveal-scale">
            <h2 className="clean-cta-title">Like What You See? Let’s Create Together</h2>
            <p className="clean-cta-desc">
              Connect directly with Mr. Gowtham Raj to discuss your wedding timeline or reserve a baby photoshoot at The Creative Space, Krishnagiri.
            </p>
            <div className="clean-cta-buttons-row">
              <a
                href={`https://wa.me/919500306696?text=${encodeURIComponent(
                  "Hi Gowtham Raj! I browsed your gallery and would like to plan a photo session with Raavan Studio’z."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="clean-cta-whatsapp-btn"
              >
                <span>Chat on WhatsApp →</span>
              </a>
              <button
                type="button"
                className="clean-cta-contact-btn"
                onClick={() => onNavigate("/pricing")}
              >
                <span>View Pricing Packages ↗</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
