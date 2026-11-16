import { useEffect, useState } from "react";
import { fetchFromApi } from "../api.js";
import {
  paymentSchedule as fallbackPaymentSchedule,
  serviceAddons as fallbackAddons,
  servicePackages as fallbackPackages,
  studio,
} from "../content.js";

export default function PricingPage({ onNavigate }) {
  const [packages, setPackages] = useState(fallbackPackages);
  const [addons, setAddons] = useState(fallbackAddons);
  const [selectedCategory, setSelectedCategory] = useState("toddlers");

  useEffect(() => {
    fetchFromApi("/packages", null).then((data) => {
      if (data && data.all && data.all.length > 0) {
        const formatted = data.all.map((p, idx) => ({
          num: `0${idx + 1}`,
          id: `pkg-${p.id}`,
          name: p.name,
          category: p.category,
          tagline: p.description,
          price: p.price_display,
          duration: p.duration,
          badge: p.badge,
          isFeatured: p.is_featured,
          features: Array.isArray(p.features) ? p.features : (p.features ? [p.features] : []),
        }));
        setPackages(formatted);
      }
      if (data && data.add_ons && data.add_ons.length > 0) {
        const formattedAddons = data.add_ons.map((a) => ({
          name: a.name,
          price: a.price_display,
          detail: a.description || "Studio premium add-on",
        }));
        setAddons(formattedAddons);
      }
    });
  }, []);

  const filteredPackages = packages.filter((p) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "toddlers") {
      return (
        p.category === "newborn_toddler" ||
        p.id === "mini-memories" ||
        p.id === "sweet-beginnings" ||
        p.id === "little-stars" ||
        p.id === "tiny-royalty"
      );
    }
    if (selectedCategory === "weddings") {
      return p.category === "wedding" || p.id === "namma-veetu-kalyanam";
    }
    return true;
  });

  return (
    <div className="clean-subpage-root pricing-page-root" id="pricing-page">
      {/* ============================================================== */}
      {/* 1. HERO HEADER SECTION - LUXURY DUAL COLUMN SHOWCASE          */}
      {/* ============================================================== */}
      <section className="clean-page-hero kutty-hero-wrap pricing-hero-wrap">
        <div className="inc-container">
          <div className="kutty-hero-layout">
            {/* Left Content Column */}
            <div className="kutty-hero-content">
              <div className="kutty-hero-eyebrow-row">
                <span className="clean-eyebrow-tag kutty-glowing-tag">
                  <span className="kutty-pulse-dot"></span>
                  ✨ TRANSPARENT STUDIO INVESTMENTS · @RAAVANSTUDIOZ
                </span>
              </div>

              <h1 className="kutty-hero-heading">
                Pricing and <span className="kutty-title-gradient">Signature Packages</span>
              </h1>

              <p className="kutty-hero-lead">
                Honest, all-inclusive investments for newborn &amp; toddler milestones, creative studio portraits, and grand wedding celebrations. Every project is gently directed by <strong>Mr. Gowtham Raj (8+ Years Experience)</strong> in our sanitized Krishnagiri flagship studio.
              </p>

              {/* 4 Feature Micro-Cards */}
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
                    <span>Within 20km for Home Visits &amp; Venues</span>
                  </div>
                </div>

                <div className="kutty-hero-feat-card">
                  <span className="kutty-feat-icon">🧸</span>
                  <div className="kutty-feat-body">
                    <strong>15+ Themed Sets</strong>
                    <span>All props, outfits &amp; wraps included</span>
                  </div>
                </div>

                <div className="kutty-hero-feat-card">
                  <span className="kutty-feat-icon">🖼️</span>
                  <div className="kutty-feat-body">
                    <strong>Fine-Art Keepsakes</strong>
                    <span>Archival layflat albums &amp; frames</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="kutty-hero-actions">
                <a href="#packages-section" className="kutty-hero-btn-primary">
                  Explore Packages ↓
                </a>
                <button
                  type="button"
                  onClick={() => onNavigate("kutty-chutties")}
                  className="kutty-hero-btn-secondary"
                  title="View Dedicated Raavan Kutty Chutties Page"
                >
                  👶 Baby Page (70+ Photos) ↗
                </button>
                <a
                  href="https://wa.me/919500306696?text=Hi%20Mr.%20Gowtham%20Raj!%20I%20would%20like%20to%20enquire%20about%20photoshoot%20packages%20with%20Raavan%20Studio’z."
                  target="_blank"
                  rel="noreferrer"
                  className="kutty-hero-btn-wa"
                  title="Direct WhatsApp with Mr. Gowtham Raj"
                >
                  💬 WhatsApp Gowtham Raj
                </a>
              </div>
            </div>

            {/* Right Visual Montage Column */}
            <div className="kutty-hero-visual-col">
              <div className="kutty-hero-visual-card-main">
                <img
                  src="/drive_gallery/optimized/weddings/kal_page_1.jpg"
                  alt="Namma Veetu Kalyanam Wedding Photography"
                  className="kutty-hero-img-main"
                  loading="eager"
                />
                <div className="kutty-hero-img-badge">
                  <span className="kutty-badge-dot"></span>
                  <span>Grand Wedding &amp; Studio Portfolios</span>
                </div>
              </div>

              <div className="kutty-hero-visual-card-sub">
                <img
                  src="/drive_gallery/optimized/kutty/kutty_01.jpg"
                  alt="Raavan Kutty Chutties Milestone Shoot"
                  className="kutty-hero-img-sub"
                  loading="lazy"
                />
                <div className="kutty-hero-sub-label">
                  <span>👶 Kutty Chutties Setup</span>
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
      {/* 2. PACKAGES SECTION WITH CATEGORY FILTER TABS                  */}
      {/* ============================================================== */}
      <section id="packages-section" className="inc-content-section" style={{ padding: "3.5rem 1.5rem 5rem" }}>
        <div className="inc-container">
          {/* Section Header */}
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span className="clean-section-tag">INVESTMENT TIERS</span>
            <h2 className="clean-section-title">Transparent Photography Packages</h2>
            <p className="clean-section-subtitle">
              Clear, transparent pricing with no hidden charges. Select a collection below to view available packages.
            </p>

            {/* Category Filter Tabs - Centered Snug Capsule */}
            <div className="clean-filter-tabs-center-wrap">
              <div className="clean-pricing-filter-tabs">
                <button
                  type="button"
                  className={`clean-filter-pill${selectedCategory === "toddlers" ? " active" : ""}`}
                  onClick={() => setSelectedCategory("toddlers")}
                >
                  <span>👶 Kutty Chutties (4 Packages)</span>
                </button>
                <button
                  type="button"
                  className={`clean-filter-pill${selectedCategory === "weddings" ? " active" : ""}`}
                  onClick={() => setSelectedCategory("weddings")}
                >
                  <span>💍 Weddings &amp; Celebrations</span>
                </button>
                <button
                  type="button"
                  className={`clean-filter-pill${selectedCategory === "all" ? " active" : ""}`}
                  onClick={() => setSelectedCategory("all")}
                >
                  <span>✨ All Collections</span>
                </button>
              </div>
            </div>
          </div>

          {/* Dedicated Baby Page Callout Banner */}
          {(selectedCategory === "toddlers" || selectedCategory === "all") && (
            <div
              style={{
                marginBottom: "2rem",
                padding: "16px 24px",
                background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
                border: "1.5px solid #bae6fd",
                borderRadius: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                flexWrap: "wrap",
                boxShadow: "0 4px 16px rgba(2, 132, 199, 0.08)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "1.6rem" }}>👶</span>
                <div>
                  <strong style={{ display: "block", color: "#0369a1", fontSize: "0.98rem" }}>
                    Looking for 70+ authentic baby photos &amp; creative theme setups?
                  </strong>
                  <span style={{ fontSize: "0.85rem", color: "#0284c7" }}>
                    Visit our dedicated Raavan Kutty Chutties page with full portfolio, setup details &amp; quick filters.
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onNavigate("kutty-chutties")}
                style={{
                  padding: "10px 22px",
                  background: "#0284c7",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "999px",
                  fontWeight: 700,
                  fontSize: "0.88rem",
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(2, 132, 199, 0.25)",
                  transition: "all 0.2s",
                }}
              >
                Open Kutty Chutties Page ↗
              </button>
            </div>
          )}

          {/* Uniform Height 440px Cards Grid */}
          <div className="kutty-packages-grid">
            {filteredPackages.map((pkg, idx) => {
              const isPopular =
                pkg.badge === "Most Popular" ||
                pkg.badge === "VIP Masterpiece" ||
                pkg.id === "little-stars" ||
                pkg.num === "03";

              const badgeText =
                pkg.badge ||
                (idx === 0
                  ? "INTRO SESSION"
                  : idx === 1
                    ? "CLASSIC"
                    : idx === 2
                      ? "MOST POPULAR"
                      : idx === 3
                        ? "LUXURY EXPERIENCE"
                        : "SIGNATURE");

              return (
                <div
                  key={pkg.id || idx}
                  className={`kutty-package-card${isPopular ? " kutty-popular-card" : ""}`}
                >
                  {/* Top Badge Strip */}
                  <div className="kutty-badge-strip">
                    <span>{badgeText}</span>
                  </div>

                  {/* Header */}
                  <div className="kutty-card-header">
                    <span className="kutty-card-num">{pkg.num || `0${idx + 1}`}</span>
                    <h3 className="kutty-card-name" title={pkg.name}>
                      {pkg.name}
                    </h3>
                    <div className="kutty-price-row">
                      <span className="kutty-card-price">{pkg.price}</span>
                      {pkg.price !== "Get a Quote" && (
                        <span style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>
                          {" "}
                          / session
                        </span>
                      )}
                    </div>
                    {pkg.duration && (
                      <span className="kutty-duration-tag">⏱ {pkg.duration}</span>
                    )}
                  </div>

                  <div className="kutty-divider" />

                  {/* Scrollable Features List */}
                  <div className="kutty-card-scroll-body">
                    {pkg.tagline && (
                      <p style={{ fontSize: "0.8rem", color: "#64748b", fontStyle: "italic", marginBottom: "8px" }}>
                        “{pkg.tagline}”
                      </p>
                    )}
                    <ul className="kutty-features-list">
                      {pkg.features.map((feat, fIdx) => (
                        <li key={fIdx}>
                          <span className="kutty-check-icon">✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer Action */}
                  <div className="kutty-card-footer">
                    <a
                      href={`https://wa.me/919500306696?text=${encodeURIComponent(
                        `Hi Mr. Gowtham Raj! I would like to book the "${pkg.name}" (${pkg.price}) package with Raavan Studio’z.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`kutty-cta-btn-primary${isPopular ? "" : " kutty-cta-btn-secondary"}`}
                      style={{ textDecoration: "none", textAlign: "center" }}
                    >
                      Book on WhatsApp 💬
                    </a>
                    <span
                      className="kutty-inquire-link"
                      onClick={() => onNavigate("/contact")}
                    >
                      Or Check Date Availability →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Wedding Custom Quote Card */}
          <div
            style={{
              marginTop: "4rem",
              background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
              borderRadius: "24px",
              padding: "40px",
              color: "#ffffff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "32px",
              flexWrap: "wrap",
              boxShadow: "0 20px 50px rgba(15, 23, 42, 0.2)",
            }}
          >
            <div style={{ maxWidth: "680px" }}>
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 12px",
                  borderRadius: "999px",
                  background: "rgba(56, 182, 216, 0.2)",
                  color: "#38bdf8",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  marginBottom: "12px",
                }}
              >
                NAMMA VEETU KALYANAM
              </span>
              <h3 style={{ fontSize: "1.75rem", fontWeight: 800, margin: "0 0 10px", color: "#ffffff" }}>
                Planning a Wedding, Reception or Sacred Muhurtham?
              </h3>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#94a3b8", margin: 0 }}>
                We craft bespoke wedding packages tailored to your ceremony timeline, including multi-camera candid photography, 4K cinema highlight reels, drone aerial cinematography, and luxury handcrafted Italian-bound photobooks.
              </p>
            </div>
            <div>
              <a
                href={`https://wa.me/919500306696?text=${encodeURIComponent(
                  "Hi Mr. Gowtham Raj! I would like to request a bespoke quotation for our upcoming wedding celebration."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "16px 32px",
                  background: "linear-gradient(135deg, #0284c7, #38bdf8)",
                  color: "#ffffff",
                  textDecoration: "none",
                  fontWeight: 800,
                  fontSize: "1rem",
                  borderRadius: "999px",
                  boxShadow: "0 8px 24px rgba(2, 132, 199, 0.4)",
                  transition: "transform 0.2s",
                }}
              >
                <span>Request Wedding Quote on WhatsApp 💬</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. A LA CARTE ADD-ONS & KEEPSAKES                              */}
      {/* ============================================================== */}
      <section className="inc-section-wrap inc-alt-bg addons-section" style={{ padding: "4rem 1.5rem" }}>
        <div className="inc-container">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span className="clean-section-tag">A LA CARTE EXTRAS</span>
            <h2 className="clean-section-title">Session Upgrades &amp; Keepsakes</h2>
            <p className="clean-section-subtitle">
              Add extra touches to customize your photoshoot experience.
            </p>
          </div>

          <div className="kutty-addons-grid">
            {addons.map((addon, idx) => {
              const icons = ["📷", "🎂", "🖼️", "🚁", "🎞️", "👶"];
              const icon = icons[idx % icons.length];
              return (
                <div className="kutty-addon-item" key={addon.name || idx}>
                  <div className="kutty-addon-left">
                    <span className="kutty-addon-icon">{icon}</span>
                    <div>
                      <h4 className="kutty-addon-title">{addon.name}</h4>
                      <p className="kutty-addon-desc">{addon.detail}</p>
                    </div>
                  </div>
                  <div className="kutty-addon-price" style={{ fontWeight: 800, color: "#0284c7", fontSize: "1.1rem" }}>
                    {addon.price}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. PAYMENT SCHEDULE                                            */}
      {/* ============================================================== */}
      <section className="inc-section-wrap payment-schedule-section" style={{ padding: "4rem 1.5rem" }}>
        <div className="inc-container">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span className="clean-section-tag">PAYMENT TRANSPARENCY</span>
            <h2 className="clean-section-title">Simple, Honest Payment Schedule</h2>
            <p className="clean-section-subtitle">
              No hidden surcharges. Clear milestones from booking date to final photo delivery.
            </p>
          </div>

          <div className="payment-schedule-grid">
            {fallbackPaymentSchedule.map((item, idx) => (
              <div className="clean-payment-card" key={item.step || idx}>
                <div className="payment-percent-pill">{item.pct || item.percent}</div>
                <h4 className="payment-stage-name">{item.label || item.stage}</h4>
                <p className="payment-timing">Step {item.step || idx + 1}</p>
                <p className="payment-detail">{item.detail}</p>
              </div>
            ))}
          </div>

          {/* Official Terms & Conditions Box */}
          <div
            style={{
              marginTop: "36px",
              padding: "24px 28px",
              background: "#ffffff",
              border: "1.5px solid #e2e8f0",
              borderRadius: "18px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "20px",
              boxShadow: "0 4px 18px rgba(0, 0, 0, 0.03)",
            }}
          >
            <div style={{ textAlign: "left" }}>
              <strong style={{ display: "block", color: "#0f172a", fontSize: "1.1rem" }}>
                📜 Official Photography Terms &amp; Conditions
              </strong>
              <span style={{ color: "#64748b", fontSize: "0.9rem" }}>
                Complete studio guidelines for “Toddlers by Raavan”, props safety, theme selections, and archival album extensions.
              </span>
            </div>
            <button
              type="button"
              onClick={() => onNavigate("/terms")}
              style={{
                background: "#0284c7",
                color: "#ffffff",
                border: "none",
                padding: "12px 24px",
                borderRadius: "999px",
                fontWeight: "700",
                fontSize: "0.92rem",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(2, 132, 199, 0.25)",
                transition: "all 0.2s ease",
              }}
            >
              View Full Terms &amp; Conditions →
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. STUDIO VISIT & BOOKING BANNER                               */}
      {/* ============================================================== */}
      <section className="kutty-studio-banner" style={{ padding: "3rem 1.5rem 5rem" }}>
        <div className="inc-container">
          <div className="kutty-banner-inner">
            <div className="kutty-banner-info">
              <span className="clean-section-tag" style={{ background: "#bae6fd", color: "#0369a1" }}>
                RESERVE YOUR DATE
              </span>
              <h2 style={{ fontSize: "1.85rem", fontWeight: 800, color: "#0f172a", margin: "8px 0" }}>
                Ready to Lock Your Date on the Studio Calendar?
              </h2>
              <p style={{ color: "#475569", margin: 0, fontSize: "1rem", maxWidth: "620px" }}>
                Connect directly with Mr. Gowtham Raj on WhatsApp for quick date confirmation, home visit options within 20km, and custom wedding consultations.
              </p>
            </div>
            <div className="kutty-banner-action">
              <a
                href="https://wa.me/919500306696?text=Hi%20Mr.%20Gowtham%20Raj!%20I%20would%20like%20to%20check%20photoshoot%20date%20availability."
                target="_blank"
                rel="noreferrer"
                className="kutty-whatsapp-cta"
              >
                <span>💬 WhatsApp Gowtham Raj</span>
              </a>
              <button
                type="button"
                onClick={() => onNavigate("/contact")}
                style={{
                  background: "#ffffff",
                  color: "#0f172a",
                  border: "1.5px solid #cbd5e1",
                  borderRadius: "999px",
                  padding: "12px 24px",
                  fontWeight: 700,
                  fontSize: "0.92rem",
                  cursor: "pointer",
                }}
              >
                <span>Check Date Availability ↗</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
