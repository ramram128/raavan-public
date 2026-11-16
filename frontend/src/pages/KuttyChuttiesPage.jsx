import { useState, useEffect } from "react";
import { kuttyChuttiesDetails, studio } from "../content.js";
import { fetchFromApi } from "../api.js";

const showcasePhotos = [
  { src: "/drive_gallery/optimized/kutty/kutty_01.jpg", title: "Serene Newborn Snooze", theme: "Woolen Basket" },
  { src: "/drive_gallery/optimized/kutty/kutty_03.jpg", title: "Gentle Swaddled Wrap", theme: "Pastel Knits" },
  { src: "/drive_gallery/optimized/kutty/kutty_05.jpg", title: "Infectious Giggles", theme: "Playful Milestone" },
  { src: "/drive_gallery/optimized/kutty/kutty_07.jpg", title: "Curious Little Explorer", theme: "Studio Props" },
  { src: "/drive_gallery/optimized/kutty/kutty_09.jpg", title: "Floral Nest Theme", theme: "Botanical Bloom" },
  { src: "/drive_gallery/optimized/kutty/kutty_12.jpg", title: "Tiny Toes & Details", theme: "Macro Love" },
  { src: "/drive_gallery/optimized/kutty/kutty_15.jpg", title: "First Birthday Joy", theme: "Celebration Theme" },
  { src: "/drive_gallery/optimized/kutty/kutty_18.jpg", title: "Rustic Basket Dreams", theme: "Warm Natural" },
  { src: "/drive_gallery/optimized/kutty/kutty_21.jpg", title: "Sparkling Eyes", theme: "Milestone Smiles" },
  { src: "/drive_gallery/optimized/kutty/kutty_38.jpg", title: "Tiny Royalty Prince/Princess", theme: "Luxury Heirloom" },
  { src: "/drive_gallery/optimized/kutty/kutty_55.jpg", title: "Pure Baby Laughter", theme: "Candid Expressions" },
  { src: "/drive_gallery/optimized/kutty/kutty_74.jpg", title: "Tender Newborn Milestone", theme: "Artistic Lighting" },
];

export default function KuttyChuttiesPage({ onNavigate }) {
  const [activePhoto, setActivePhoto] = useState(null);
  const [packages, setPackages] = useState(kuttyChuttiesDetails.packages);
  const [addOns, setAddOns] = useState(kuttyChuttiesDetails.addOns);

  // Sync with API if available
  useEffect(() => {
    fetchFromApi("/packages", null).then((data) => {
      if (data && data.kutty_chutties && data.kutty_chutties.length > 0) {
        // Map database records
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
          image: showcasePhotos[idx % showcasePhotos.length].src,
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
  }, []);

  function handleBookWhatsApp(packageName, price) {
    const text = encodeURIComponent(
      `Hi Mr. Gowtham Raj! I would like to book the Raavan Kutty Chutties "${packageName}" (${price}) package. Could you share date availability at your Creative Space Studio?`
    );
    window.open(`https://wa.me/919500306696?text=${text}`, "_blank");
  }

  return (
    <div className="clean-subpage-root kutty-chutties-page-root">
      {/* ============================================================== */}
      {/* 1. HERO HEADER SECTION                                         */}
      {/* ============================================================== */}
      <section className="clean-page-hero kutty-hero-wrap">
        <div className="inc-container">
          <div className="clean-hero-badge-wrap">
            <span className="clean-eyebrow-tag">
              👶 RAAVAN KUTTY CHUTTIES · @TODDLERS_BY_RAAVAN
            </span>
          </div>

          <h1 className="clean-page-title" style={{ maxWidth: "850px" }}>
            Price and Package Details
          </h1>

          <p className="clean-page-subtitle" style={{ maxWidth: "720px" }}>
            Preserving the sweetest baby smiles, tiny yawns, and playful milestones. Every session is hosted in our sanitized, climate-controlled flagship studio in Krishnagiri by <strong>Mr. Gowtham Raj</strong> (8+ Years Experience).
          </p>

          {/* Quick Perks Strip */}
          <div className="clean-pricing-perks-row" style={{ marginTop: "1.5rem" }}>
            <span className="clean-perk-badge">📍 Flagship Studio: The Creative Space, Krishnagiri</span>
            <span className="clean-perk-badge">🚗 Free Travel within 20km for Home Visits</span>
            <span className="clean-perk-badge">🧸 All Designer Props &amp; Outfits Included</span>
            <span className="clean-perk-badge">🖼️ Fine-Art Layflat Keepsake Frames</span>
          </div>

          <div style={{ marginTop: "2rem", display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="#packages-grid"
              className="inc-btn-pill-primary"
              style={{ padding: "12px 28px", textDecoration: "none" }}
            >
              Explore 4 Packages ↓
            </a>
            <a
              href="#baby-gallery"
              className="inc-btn-pill-ghost"
              style={{ padding: "12px 28px", textDecoration: "none" }}
            >
              View Real Baby Photos 📸
            </a>
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

                  <div className="kutty-card-footer">
                    <button
                      type="button"
                      onClick={() => handleBookWhatsApp(pkg.name, pkg.price)}
                      className={isPopular ? "kutty-cta-btn-primary" : "kutty-cta-btn-secondary"}
                    >
                      Book on WhatsApp 💬
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate("contact")}
                      className="kutty-inquire-link"
                    >
                      Or Send Studio Enquiry →
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
      {/* 4. REAL BABY GALLERY SHOWCASE FROM DRIVE                       */}
      {/* ============================================================== */}
      <section id="baby-gallery" className="kutty-gallery-section">
        <div className="inc-container">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span className="clean-section-tag">AUTHENTIC CLIENT WORK</span>
            <h2 className="clean-section-title">Glimpses of Kutty Chutties Magic</h2>
            <p className="clean-section-subtitle">
              Every portrait captures real laughter and innocence — crafted with gentle care and hygiene.
            </p>
          </div>

          <div className="kutty-photo-masonry">
            {showcasePhotos.map((item, pIdx) => (
              <div
                key={pIdx}
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

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="kutty-lightbox-backdrop" onClick={() => setActivePhoto(null)}>
          <div className="kutty-lightbox-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="kutty-lightbox-close"
              onClick={() => setActivePhoto(null)}
            >
              ✕
            </button>
            <img
              src={activePhoto.src}
              alt={activePhoto.title}
              className="kutty-lightbox-img"
            />
            <div className="kutty-lightbox-caption">
              <strong>{activePhoto.title}</strong> · <span>{activePhoto.theme}</span>
            </div>
          </div>
        </div>
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
