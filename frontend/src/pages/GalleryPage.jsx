import { useEffect, useState } from "react";
import { fetchFromApi } from "../api.js";
import { expandedGallery as fallbackGallery, studio } from "../content.js";

const categories = [
  "All Works",
  "Weddings",
  "Couple portraits",
  "Maternity",
  "Newborns",
  "Toddlers",
  "Model portraits",
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
      : photos.filter((item) => item.category === activeCategory);

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
        <div className="page-badge">Our Curated Works</div>
        <h1>Stories &amp; Moments Preserved</h1>
        <p className="page-subtitle">
          {studio.tagline} · Unscripted weddings, precious newborns with @toddlers_by_raavan, and handcrafted photobooks with @photobooks_by_raavan.
        </p>

        {/* Category Filters */}
        <div
          className="gallery-filters"
          style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px", marginTop: "24px" }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-chip ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid Display */}
      <section className="content-wrapper" style={{ marginTop: "2rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="gallery-grid-card"
              style={{
                position: "relative",
                borderRadius: "12px",
                overflow: "hidden",
                cursor: "pointer",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              onClick={() => setSelectedPhoto(photo)}
            >
              <img
                src={photo.image}
                alt={photo.title}
                loading="lazy"
                style={{
                  width: "100%",
                  height: photo.aspect === "wide" ? "260px" : "380px",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.4s ease",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "1.25rem",
                  background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
                }}
              >
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "#00d4ff",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  {photo.category}
                </span>
                <h3 style={{ fontSize: "1.15rem", margin: "0.2rem 0", color: "#fff" }}>{photo.title}</h3>
                {photo.location && (
                  <p style={{ fontSize: "0.82rem", opacity: 0.75 }}>{photo.location}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="lightbox-overlay active"
          onClick={() => setSelectedPhoto(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.92)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <div
            className="lightbox-inner"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "1000px", width: "100%", textAlign: "center" }}
          >
            <img
              src={selectedPhoto.image}
              alt={selectedPhoto.title}
              style={{ maxHeight: "75vh", maxWidth: "100%", objectFit: "contain", borderRadius: "8px" }}
            />
            <div style={{ marginTop: "1rem", color: "#fff" }}>
              <span style={{ color: "#00d4ff", fontSize: "0.85rem", textTransform: "uppercase" }}>
                {selectedPhoto.category}
              </span>
              <h2 style={{ fontSize: "1.4rem", margin: "0.3rem 0" }}>{selectedPhoto.title}</h2>
              {selectedPhoto.description && (
                <p style={{ opacity: 0.8, fontSize: "0.95rem", maxWidth: "600px", margin: "0 auto" }}>
                  {selectedPhoto.description}
                </p>
              )}
            </div>
            <button
              type="button"
              className="btn btn-primary"
              style={{ marginTop: "1.5rem" }}
              onClick={() => onNavigate("/contact")}
            >
              Enquire About Similar Coverage
            </button>
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              style={{
                position: "fixed",
                top: "20px",
                right: "30px",
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: "2rem",
                cursor: "pointer",
              }}
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
