import { useEffect, useState } from "react";
import { fetchFromApi } from "../api.js";
import {
  paymentSchedule,
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
        const formatted = data.all.map((p) => ({
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
      {/* 1. HERO HEADER                                                 */}
      {/* ============================================================== */}
      <section className="clean-page-hero">
        <div className="inc-container">
          <div className="clean-hero-badge-wrap">
            <span className="clean-eyebrow-tag">THE CREATIVE SPACE · KRISHNAGIRI</span>
          </div>
          <h1 className="clean-page-title">
            Kutty Chutties Pricing Packages
          </h1>
          <p className="clean-page-subtitle">
            Honest, transparent investments for newborn, infant &amp; toddler photography with <strong>@toddlers_by_raavan</strong>. Every session is hosted in our sanitized, climate-controlled studio in Krishnagiri.
          </p>

          <div className="clean-pricing-perks-row">
            <span className="clean-perk-badge">✓ Free Travel within 20km from Krishnagiri</span>
            <span className="clean-perk-badge">✓ 15+ Themed Handcrafted Sets</span>
            <span className="clean-perk-badge">✓ All Props &amp; Outfits Included</span>
            <span className="clean-perk-badge">✓ Directed by Mr. Gowtham Raj (8+ Yrs Exp)</span>
          </div>

          {/* Category Filter Tabs */}
          <div className="clean-pricing-filter-tabs">
            <button
              type="button"
              className={`clean-filter-pill${selectedCategory === "toddlers" ? " active" : ""}`}
              onClick={() => setSelectedCategory("toddlers")}
            >
              <span>Kutty Chutties (Newborn &amp; Toddlers)</span>
            </button>
            <button
              type="button"
              className={`clean-filter-pill${selectedCategory === "all" ? " active" : ""}`}
              onClick={() => setSelectedCategory("all")}
            >
              <span>All Collections</span>
            </button>
            <button
              type="button"
              className={`clean-filter-pill${selectedCategory === "weddings" ? " active" : ""}`}
              onClick={() => setSelectedCategory("weddings")}
            >
              <span>Weddings &amp; Celebrations</span>
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. PACKAGES GRID                                               */}
      {/* ============================================================== */}
      <section className="inc-section-wrap pricing-cards-section">
        <div className="inc-container">
          <div className="inc-pricing-grid luxury-tiers-grid">
            {filteredPackages.map((pkg, idx) => {
              const isPopular =
                pkg.badge === "Most Popular" ||
                pkg.badge === "VIP Masterpiece" ||
                pkg.id === "little-stars";

              const isLuxury =
                pkg.badge === "Luxury Experience" || pkg.id === "tiny-royalty";

              return (
                <div
                  key={pkg.id || pkg.name}
                  className={`luxury-pricing-card reveal-on-scroll stagger-${(idx % 4) + 1}${
                    isPopular ? " is-featured-tier" : isLuxury ? " is-luxury-tier" : ""
                  }`}
                >
                  {/* Top Badge */}
                  {pkg.badge && (
                    <div className="tier-header-badge">
                      <span className={`tier-pill ${isPopular ? "pill-popular" : isLuxury ? "pill-luxury" : "pill-intro"}`}>
                        {pkg.badge.toUpperCase()}
                      </span>
                    </div>
                  )}

                  <h3 className="tier-card-title">{pkg.name}</h3>
                  {pkg.tagline && <p className="tier-card-tagline">“{pkg.tagline}”</p>}

                  <div className="tier-price-box">
                    <div className="tier-price-wrap">
                      <span className="tier-price-amount">{pkg.price}</span>
                      {pkg.price !== "Get a Quote" && (
                        <span className="tier-price-sub">/ session</span>
                      )}
                    </div>
                    {pkg.duration && (
                      <span className="tier-duration-chip">{pkg.duration}</span>
                    )}
                  </div>

                  <div className="tier-divider" />

                  {/* Features List */}
                  <ul className="tier-features-list">
                    {pkg.features.map((feat) => (
                      <li key={feat}>
                        <span className="tier-check-icon">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Action CTA */}
                  <div className="tier-card-footer">
                    <a
                      href={`https://wa.me/919500306696?text=${encodeURIComponent(
                        `Hi Gowtham Raj! I would like to book the "${pkg.name}" (${pkg.price}) session with Raavan Studio’z.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`tier-cta-button ${isPopular ? "btn-primary-filled" : "btn-outline"}`}
                    >
                      <span>Book on WhatsApp →</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Wedding Custom Quote Card */}
          <div className="clean-wedding-quote-box reveal-scale">
            <div className="wedding-quote-info">
              <span className="wedding-quote-tag">NAMMA VEETU KALYANAM</span>
              <h3 className="wedding-quote-title">Planning a Wedding, Reception or Sacred Muhurtham?</h3>
              <p className="wedding-quote-p">
                We craft bespoke wedding packages tailored to your ceremony timeline, including multi-camera candid photography, 4K cinema highlight reels, drone aerial cinematography, and luxury handcrafted Italian-bound photobooks.
              </p>
            </div>
            <div className="wedding-quote-btn-wrap">
              <a
                href={`https://wa.me/919500306696?text=${encodeURIComponent(
                  "Hi Gowtham Raj! I would like to request a bespoke quotation for our upcoming wedding celebration."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="clean-quote-btn"
              >
                <span>Request Wedding Quote on WhatsApp →</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. POPULAR ADD-ONS & UPGRADES                                   */}
      {/* ============================================================== */}
      <section className="inc-section-wrap inc-alt-bg addons-section">
        <div className="inc-container">
          <div className="clean-centered-header reveal-on-scroll">
            <span className="clean-section-tag">A LA CARTE EXTRAS</span>
            <h2 className="clean-section-heading">Session Upgrades &amp; Keepsakes</h2>
            <p className="clean-section-sub">Add extra touches to make your photoshoot even more memorable.</p>
          </div>

          <div className="addons-cards-grid">
            {addons.map((addon, idx) => (
              <div className={`clean-addon-card reveal-on-scroll stagger-${(idx % 3) + 1}`} key={addon.name}>
                <div className="addon-header-row">
                  <h4 className="addon-title">{addon.name}</h4>
                  <span className="addon-price-badge">{addon.price}</span>
                </div>
                <p className="addon-desc">{addon.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. PAYMENT TRANSPARENCY                                         */}
      {/* ============================================================== */}
      <section className="inc-section-wrap payment-schedule-section">
        <div className="inc-container">
          <div className="clean-centered-header reveal-on-scroll">
            <span className="clean-section-tag">PAYMENT SCHEDULE</span>
            <h2 className="clean-section-heading">Simple, Honest Payment Schedule</h2>
            <p className="clean-section-sub">No hidden surcharges. Clear milestones from booking to delivery.</p>
          </div>

          <div className="payment-schedule-grid">
            {paymentSchedule.map((item, idx) => (
              <div className={`clean-payment-card reveal-on-scroll stagger-${idx + 1}`} key={item.stage}>
                <div className="payment-percent-pill">{item.percent}</div>
                <h4 className="payment-stage-name">{item.stage}</h4>
                <p className="payment-timing">{item.timing}</p>
                <p className="payment-detail">{item.detail}</p>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "32px",
              textAlign: "center",
              padding: "20px 24px",
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "14px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
            }}
            className="reveal-on-scroll"
          >
            <div style={{ textAlign: "left" }}>
              <strong style={{ display: "block", color: "#0a192f", fontSize: "1.05rem" }}>
                📜 Official Photography Terms &amp; Conditions
              </strong>
              <span style={{ color: "#64748b", fontSize: "0.9rem" }}>
                Complete guidelines for “Toddlers by Raavan”, theme rules, props safety, and extra album sheet charges.
              </span>
            </div>
            <button
              type="button"
              onClick={() => onNavigate("/terms")}
              style={{
                background: "#0284c7",
                color: "#ffffff",
                border: "none",
                padding: "10px 22px",
                borderRadius: "999px",
                fontWeight: "700",
                fontSize: "0.9rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              View Full Terms &amp; Conditions →
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. DIRECT CTA                                                  */}
      {/* ============================================================== */}
      <section className="inc-section-wrap inc-alt-bg">
        <div className="inc-container">
          <div className="clean-cta-box reveal-scale">
            <h2 className="clean-cta-title">Ready to Lock Your Date on the Studio Calendar?</h2>
            <p className="clean-cta-desc">
              Connect with Mr. Gowtham Raj on WhatsApp for quick date availability and custom wedding package consultations.
            </p>
            <div className="clean-cta-buttons-row">
              <a
                href={`https://wa.me/919500306696?text=${encodeURIComponent(
                  "Hi Gowtham Raj! I would like to book a photography session with Raavan Studio’z."
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
                onClick={() => onNavigate("/contact")}
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
