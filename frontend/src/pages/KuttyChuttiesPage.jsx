import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { kuttyChuttiesDetails, allKuttyChuttiesPhotos, studio } from "../content.js";
import { fetchFromApi } from "../api.js";

export default function KuttyChuttiesPage({ onNavigate }) {
  const [activePhoto, setActivePhoto] = useState(null);
  const [packages, setPackages] = useState(kuttyChuttiesDetails.packages);
  const [addOns, setAddOns] = useState(kuttyChuttiesDetails.addOns);
  const [babyPhotos, setBabyPhotos] = useState(allKuttyChuttiesPhotos || []);
  const [activeCategory, setActiveCategory] = useState("all");

  // Sync with API for packages and gallery
  useEffect(() => {
    fetchFromApi("/packages", null).then((data) => {
      if (data && data.kutty_chutties && data.kutty_chutties.length > 0) {
        const apiPkgs = data.kutty_chutties.map((p, idx) => ({
          num: `0${idx + 1}`,
          id: `pkg-${p.id}`,
          name: p.name.toUpperCase(),
          price: p.price_display,
          duration: p.duration,
          badge: p.badge,
          isFeatured: p.is_featured,
          description: p.description,
          features: Array.isArray(p.features) ? p.features : (p.features ? [p.features] : []),
        }));
        setPackages(apiPkgs);
      }
      if (data && data.add_ons && data.add_ons.length > 0) {
        const apiAddons = data.add_ons.map((a) => ({
          name: a.name,
          price: a.price_display,
          detail: a.description || "Archival quality studio addon",
        }));
        setAddOns(apiAddons);
      }
    });

    // Also fetch gallery from MySQL database
    fetchFromApi("/gallery", null).then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        const kuttyItems = data.filter(
          (item) => item.category === "Newborns" || item.category === "Toddlers"
        );
        if (kuttyItems.length > 0) {
          const formatted = kuttyItems.map((item) => ({
            id: `gal-${item.id}`,
            title: item.title,
            category: item.category,
            theme: item.location || item.category,
            src: item.image_url,
            aspect: item.aspect || "portrait",
          }));
          setBabyPhotos(formatted);
        }
      }
    });
  }, []);

  const filteredPhotos = babyPhotos.filter((p) => {
    if (activeCategory === "all") return true;
    return p.category === activeCategory;
  });

  // Lock scroll completely when lightbox is open (STRICTLY NO SCROLLING)
  useEffect(() => {
    if (activePhoto) {
      document.body.classList.add("modal-open");
      const prevBodyOverflow = document.body.style.overflow;
      const prevHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      function handleKeyDown(e) {
        if (e.key === "Escape") {
          setActivePhoto(null);
        } else if (e.key === "ArrowRight") {
          const curIdx = filteredPhotos.findIndex((p) => p.src === activePhoto.src);
          const nextIdx = (curIdx + 1) % filteredPhotos.length;
          setActivePhoto(filteredPhotos[nextIdx]);
        } else if (e.key === "ArrowLeft") {
          const curIdx = filteredPhotos.findIndex((p) => p.src === activePhoto.src);
          const prevIdx = (curIdx - 1 + filteredPhotos.length) % filteredPhotos.length;
          setActivePhoto(filteredPhotos[prevIdx]);
        }
      }

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.classList.remove("modal-open");
        document.body.style.overflow = prevBodyOverflow;
        document.documentElement.style.overflow = prevHtmlOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [activePhoto, filteredPhotos]);

  function handleBookWhatsApp(packageName, price) {
    const text = encodeURIComponent(
      `Hi Mr. Gowtham Raj! I would like to book the Raavan Kutty Chutties "${packageName}" (${price}) package. Could you share date availability at your Creative Space Studio?`
    );
    window.open(`https://wa.me/919500306696?text=${text}`, "_blank");
  }

  return (
    <div className="clean-subpage-root kutty-chutties-page-root">
      {/* ============================================================== */}
      {/* 1. HERO HEADER SECTION - LUXURY SHOWCASE                       */}
      {/* ============================================================== */}
      <section className="clean-page-hero kutty-hero-wrap">
        <div className="inc-container">
          <div className="kutty-hero-layout">
            {/* Left Content Column */}
            <div className="kutty-hero-content">
              <div className="kutty-hero-eyebrow-row">
                <span className="clean-eyebrow-tag kutty-glowing-tag">
                  <span className="kutty-pulse-dot"></span>
                  👶 RAAVAN KUTTY CHUTTIES · @TODDLERS_BY_RAAVAN
                </span>
              </div>

              <h1 className="kutty-hero-heading">
                Price and <span className="kutty-title-gradient">Package Details</span>
              </h1>

              <p className="kutty-hero-lead">
                Preserving the sweetest baby smiles, tiny yawns, and playful milestones. Every session is hosted in our sanitized, climate-controlled flagship studio in Krishnagiri by <strong>Mr. Gowtham Raj</strong> (8+ Years Experience).
              </p>

              {/* 4 Feature Value Cards */}
              <div className="kutty-hero-features-grid">
                <div className="kutty-hero-feat-card">
                  <span className="kutty-feat-icon">📍</span>
                  <div className="kutty-feat-body">
                    <strong>Flagship Studio</strong>
                    <span>The Creative Space, Krishnagiri</span>
                  </div>
                </div>

                <div className="kutty-hero-feat-card">
                  <span className="kutty-feat-icon">🚗</span>
                  <div className="kutty-feat-body">
                    <strong>Free Travel</strong>
                    <span>Within 20km for Home Visits</span>
                  </div>
                </div>

                <div className="kutty-hero-feat-card">
                  <span className="kutty-feat-icon">🧸</span>
                  <div className="kutty-feat-body">
                    <strong>Designer Setups</strong>
                    <span>All props, wraps &amp; outfits provided</span>
                  </div>
                </div>

                <div className="kutty-hero-feat-card">
                  <span className="kutty-feat-icon">🖼️</span>
                  <div className="kutty-feat-body">
                    <strong>Keepsake Frames</strong>
                    <span>Fine-Art layflat keepsake frames</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="kutty-hero-actions">
                <a
                  href="#packages-grid"
                  className="kutty-hero-btn-primary"
                >
                  Explore 4 Packages ↓
                </a>
                <a
                  href="#baby-gallery"
                  className="kutty-hero-btn-secondary"
                >
                  View Baby Gallery 📸
                </a>
                <a
                  href="https://wa.me/919500306696?text=Hi%20Mr.%20Gowtham%20Raj!%20I%20would%20like%20to%20enquire%20about%20Raavan%20Kutty%20Chutties%20photoshoots."
                  target="_blank"
                  rel="noreferrer"
                  className="kutty-hero-btn-wa"
                  title="Direct WhatsApp with Mr. Gowtham Raj"
                >
                  💬 WhatsApp Us
                </a>
              </div>
            </div>

            {/* Right Visual Collage Column */}
            <div className="kutty-hero-visual-col">
              <div className="kutty-hero-visual-card-main">
                <img
                  src="/drive_gallery/optimized/kutty/kutty_01.jpg"
                  alt="Tender Newborn Serenity Portrait"
                  className="kutty-hero-img-main"
                  loading="eager"
                />
                <div className="kutty-hero-img-badge">
                  <span className="kutty-badge-dot"></span>
                  <span>Tender Newborn Serenity</span>
                </div>
              </div>

              <div className="kutty-hero-visual-card-sub">
                <img
                  src="/drive_gallery/optimized/kutty/kutty_03.jpg"
                  alt="Baby Knitted Wrap Portrait"
                  className="kutty-hero-img-sub"
                  loading="lazy"
                />
                <div className="kutty-hero-sub-label">
                  <span>🧸 Cozy Wraps Setup</span>
                </div>
              </div>

              {/* Floating Verified Trust Badge */}
              <div className="kutty-hero-floating-badge">
                <div className="kutty-badge-icon">⭐</div>
                <div className="kutty-badge-text">
                  <strong>8+ Years Experience</strong>
                  <span>500+ Happy Families Documented</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. PACKAGES GRID (THE 4 PACKAGES SPECIFIED BY USER)            */}
      {/* ============================================================== */}
      <section id="packages-grid" className="inc-content-section" style={{ padding: "3rem 1.5rem 5rem" }}>
        <div className="inc-container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="clean-section-tag">INVESTMENT TIERS</span>
            <h2 className="clean-section-title">Raavan Kutty Chutties Packages</h2>
            <p className="clean-section-subtitle">
              Clear, transparent pricing designed for newborns (5–30 days) and toddlers (1–3 years).
            </p>
          </div>

          <div className="kutty-packages-grid">
            {packages.map((pkg, idx) => {
              const isPopular = pkg.isFeatured || pkg.id === "little-stars" || pkg.num === "03";
              return (
                <div
                  key={pkg.id || idx}
                  className={`kutty-package-card${isPopular ? " kutty-popular-card" : ""}`}
                >
                  {pkg.badge && (
                    <div className="kutty-badge-strip">
                      <span>{pkg.badge}</span>
                    </div>
                  )}

                  <div className="kutty-card-header">
                    <span className="kutty-card-num">{pkg.num}</span>
                    <h3 className="kutty-card-name">{pkg.name}</h3>
                    <div className="kutty-price-row">
                      <span className="kutty-card-price">{pkg.price}</span>
                    </div>
                    {pkg.duration && (
                      <span className="kutty-duration-tag">⏱ {pkg.duration}</span>
                    )}
                  </div>

                  <div className="kutty-divider" />

                  {/* Scrollable Features Body (around 400px card height) */}
                  <div className="kutty-card-scroll-body">
                    {pkg.description && (
                      <p className="kutty-desc-text">{pkg.description}</p>
                    )}

                    <ul className="kutty-features-list">
                      {pkg.features.map((feature, fIdx) => (
                        <li key={fIdx}>
                          <span className="kutty-check-icon">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="kutty-card-footer">
                    <button
                      type="button"
                      onClick={() => handleBookWhatsApp(pkg.name, pkg.price)}
                      className={isPopular ? "kutty-cta-btn-primary" : "kutty-cta-btn-secondary"}
                    >
                      Book on WhatsApp
                    </button>

                  </div>
                </div>
              );
            })}
          </div>

          {/* ============================================================== */}
          {/* 3. OPTIONAL ADD-ONS SECTION                                    */}
          {/* ============================================================== */}
          <div className="kutty-addons-container">
            <div className="kutty-addons-header">
              <span className="clean-eyebrow-tag">CUSTOMIZE YOUR EXPERIENCE</span>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", margin: "6px 0 4px" }}>
                Optional Add-Ons
              </h3>
              <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
                Enhance your Kutty Chutties session with custom themes or additional framed prints.
              </p>
            </div>

            <div className="kutty-addons-grid">
              {addOns.map((addon, aIdx) => (
                <div key={aIdx} className="kutty-addon-item">
                  <div className="kutty-addon-left">
                    <span className="kutty-addon-icon">
                      {addon.name.toLowerCase().includes("cake") ? "🎂" : "📸"}
                    </span>
                    <div>
                      <h4 className="kutty-addon-title">{addon.name}</h4>
                      <p className="kutty-addon-desc">{addon.detail}</p>
                    </div>
                  </div>
                  <div className="kutty-addon-price">{addon.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. REAL BABY GALLERY SHOWCASE FROM DRIVE (ALL 70+ PHOTOS)       */}
      {/* ============================================================== */}
      <section id="baby-gallery" className="kutty-gallery-section">
        <div className="inc-container">
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <span className="clean-section-tag">AUTHENTIC CLIENT WORK · @TODDLERS_BY_RAAVAN</span>
            <h2 className="clean-section-title">Kutty Chutties Gallery ({babyPhotos.length} Photos)</h2>
            <p className="clean-section-subtitle">
              Every single portrait is an authentic milestone moment documented by Mr. Gowtham Raj at The Creative Space Studio.
            </p>

            {/* Category Filter Pills */}
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap", marginTop: "1.5rem" }}>
              <button
                type="button"
                className={`clean-filter-pill${activeCategory === "all" ? " active" : ""}`}
                onClick={() => setActiveCategory("all")}
              >
                <span>🌟 All Photos ({babyPhotos.length})</span>
              </button>
              <button
                type="button"
                className={`clean-filter-pill${activeCategory === "Newborns" ? " active" : ""}`}
                onClick={() => setActiveCategory("Newborns")}
              >
                <span>🍼 Newborns ({babyPhotos.filter((p) => p.category === "Newborns").length})</span>
              </button>
              <button
                type="button"
                className={`clean-filter-pill${activeCategory === "Toddlers" ? " active" : ""}`}
                onClick={() => setActiveCategory("Toddlers")}
              >
                <span>🧸 Toddlers ({babyPhotos.filter((p) => p.category === "Toddlers").length})</span>
              </button>
            </div>
          </div>

          <div className="kutty-photo-masonry">
            {filteredPhotos.map((item, pIdx) => (
              <div
                key={item.id || pIdx}
                className="kutty-photo-card"
                onClick={() => setActivePhoto(item)}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="kutty-photo-img"
                />
                <div className="kutty-photo-overlay">
                  <span className="kutty-photo-theme">{item.theme}</span>
                  <span className="kutty-photo-title">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal (Direct Body Portal to prevent ANY scrolling or navbar leaks) */}
      {activePhoto &&
        createPortal(
          <div
            className="kutty-lightbox-backdrop"
            onClick={() => setActivePhoto(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="kutty-lightbox-card"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                className="kutty-lightbox-close"
                onClick={() => setActivePhoto(null)}
                aria-label="Close modal"
              >
                ✕
              </button>

              {/* Prev Navigation Arrow */}
              <button
                type="button"
                className="kutty-lightbox-nav-arrow kutty-nav-prev"
                onClick={() => {
                  const curIdx = filteredPhotos.findIndex((p) => p.src === activePhoto.src);
                  const prevIdx = (curIdx - 1 + filteredPhotos.length) % filteredPhotos.length;
                  setActivePhoto(filteredPhotos[prevIdx]);
                }}
                aria-label="Previous photo"
              >
                ‹
              </button>

              {/* Next Navigation Arrow */}
              <button
                type="button"
                className="kutty-lightbox-nav-arrow kutty-nav-next"
                onClick={() => {
                  const curIdx = filteredPhotos.findIndex((p) => p.src === activePhoto.src);
                  const nextIdx = (curIdx + 1) % filteredPhotos.length;
                  setActivePhoto(filteredPhotos[nextIdx]);
                }}
                aria-label="Next photo"
              >
                ›
              </button>

              {/* Centered Image Container */}
              <div className="kutty-lightbox-img-wrap">
                <img
                  src={activePhoto.src}
                  alt={activePhoto.title}
                  className="kutty-lightbox-img"
                />
              </div>

              {/* Bottom Caption & Instant WhatsApp Action */}
              <div className="kutty-lightbox-caption">
                <div className="kutty-caption-left">
                  <span className="kutty-photo-theme" style={{ display: "block" }}>{activePhoto.theme}</span>
                  <strong style={{ fontSize: "1.05rem", color: "#0f172a" }}>{activePhoto.title}</strong>
                </div>
                <a
                  href={`https://wa.me/919500306696?text=${encodeURIComponent(
                    `Hi Mr. Gowtham Raj! I love this Kutty Chutties theme ("${activePhoto.title}" - ${activePhoto.theme}) on your website. Could you please share booking slots for this?`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="kutty-lightbox-wa-btn"
                >
                  <span>Book This Theme on WhatsApp</span>
                  <span>💬</span>
                </a>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* ============================================================== */}
      {/* 5. STUDIO & HYGIENE COMMITMENT CALLOUT                         */}
      {/* ============================================================== */}
      <section className="kutty-studio-banner">
        <div className="inc-container">
          <div className="kutty-banner-inner">
            <div className="kutty-banner-text">
              <span className="clean-eyebrow-tag" style={{ color: "#0284c7" }}>
                100% GENTLE &amp; SAFE
              </span>
              <h3 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "10px 0 12px" }}>
                Our Baby Comfort &amp; Hygiene Promise
              </h3>
              <p style={{ color: "#475569", lineHeight: 1.7, fontSize: "1rem" }}>
                We understand that your baby is your whole world. At <strong>The Creative Space Studio</strong>, all wraps, baskets, and props are UV and steam-sanitized before every session. We work entirely around baby sleep and feeding cues with zero rush.
              </p>
              <div style={{ marginTop: "1.5rem", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <span className="clean-perk-badge">✓ Hypoallergenic wraps</span>
                <span className="clean-perk-badge">✓ Warm studio heating</span>
                <span className="clean-perk-badge">✓ Parent changing &amp; feeding suite</span>
              </div>
            </div>
            <div className="kutty-banner-action">
              <a
                href={`https://wa.me/919500306696?text=${encodeURIComponent(
                  "Hi Gowtham Raj! I would like to book a Raavan Kutty Chutties baby photoshoot. Please let me know available slots."
                )}`}
                target="_blank"
                rel="noreferrer"
                className="kutty-whatsapp-cta"
              >
                <span>Book on WhatsApp</span>
                <span style={{ fontSize: "1.2rem" }}>💬</span>
              </a>
              <span style={{ fontSize: "0.8rem", color: "#64748b", textAlign: "center" }}>
                📞 Direct founder line: +91 9500306696
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
