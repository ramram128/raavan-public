import { useEffect, useState } from "react";
import { fetchFromApi } from "../api.js";
import {
  faqs,
  paymentSchedule,
  serviceAddons as fallbackAddons,
  servicePackages as fallbackPackages,
  studio,
} from "../content.js";

export default function PricingPage({ onNavigate }) {
  const [packages, setPackages] = useState(fallbackPackages);
  const [addons, setAddons] = useState(fallbackAddons);
  const [openFaq, setOpenFaq] = useState(null);
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
    <div className="clean-pricing-page-root" id="pricing-page">
      {/* ============================================================== */}
      {/* 1. PAGE HERO HEADER                                            */}
      {/* ============================================================== */}
      <section className="clean-pricing-hero-section">
        <div className="inc-container">
          <div className="clean-pricing-hero-content">
            <div className="inc-section-label-row center-aligned">
              <div className="inc-line" />
              <span className="inc-label-text">THE CREATIVE SPACE · KRISHNAGIRI</span>
              <div className="inc-line" />
            </div>

            <h1 className="clean-pricing-hero-title">
              Kutty Chutties Pricing Packages
            </h1>

            <p className="clean-pricing-hero-subtitle">
              Honest, transparent investments for newborn, baby milestones &amp; toddler photography with <strong>@toddlers_by_raavan</strong>. Every session is hosted in our sanitized, climate-controlled studio suites in Krishnagiri.
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
                👶 Kutty Chutties (Newborn &amp; Toddlers)
              </button>
              <button
                type="button"
                className={`clean-filter-pill${selectedCategory === "all" ? " active" : ""}`}
                onClick={() => setSelectedCategory("all")}
              >
                All Collections
              </button>
              <button
                type="button"
                className={`clean-filter-pill${selectedCategory === "weddings" ? " active" : ""}`}
                onClick={() => setSelectedCategory("weddings")}
              >
                💍 Weddings &amp; Celebrations
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. MAIN PACKAGES GRID                                          */}
      {/* ============================================================== */}
      <section className="clean-packages-section">
        <div className="inc-container">
          <div className="clean-packages-grid">
            {filteredPackages.map((pkg) => {
              const isPopular =
                pkg.badge === "Most Popular" ||
                pkg.badge === "VIP Masterpiece" ||
                pkg.id === "little-stars";

              const isLuxury =
                pkg.badge === "Luxury Experience" || pkg.id === "tiny-royalty";

              return (
                <div
                  key={pkg.id || pkg.name}
                  className={`clean-pkg-card${isPopular ? " is-popular" : ""}${isLuxury ? " is-luxury" : ""}`}
                >
                  {/* Top Floating Badge */}
                  {pkg.badge && (
                    <div className="clean-pkg-floating-badge">
                      <span>{isPopular ? "⭐ " : isLuxury ? "👑 " : ""}{pkg.badge}</span>
                    </div>
                  )}

                  <div className="clean-pkg-header">
                    <h2 className="clean-pkg-name">{pkg.name}</h2>
                    <p className="clean-pkg-tagline">“{pkg.tagline}”</p>
                  </div>

                  <div className="clean-pkg-pricing-box">
                    <div className="clean-pkg-price-wrap">
                      <span className="clean-pkg-price-text">{pkg.price}</span>
                      {pkg.price !== "Get a Quote" && (
                        <span className="clean-pkg-period">/ session</span>
                      )}
                    </div>
                    <span className="clean-pkg-duration-label">⏱ {pkg.duration}</span>
                  </div>

                  {/* Features List */}
                  <div className="clean-pkg-features-wrap">
                    <span className="clean-pkg-includes-heading">Included in this session:</span>
                    <ul className="clean-pkg-features-list">
                      {pkg.features.map((feat) => (
                        <li key={feat}>
                          <span className="clean-feat-check">✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Booking CTA Button */}
                  <div className="clean-pkg-footer">
                    <a
                      href={`https://wa.me/919500306696?text=${encodeURIComponent(
                        `Hi Gowtham Raj! I would like to book the "${pkg.name}" (${pkg.price}) session with Raavan Studio’z.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`clean-pkg-action-btn${isPopular ? " btn-popular" : isLuxury ? " btn-luxury" : ""}`}
                    >
                      <span>Book on WhatsApp →</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Wedding Custom Quote Card (When weddings or all selected) */}
          <div className="clean-wedding-quote-box">
            <div className="wedding-quote-info">
              <span className="wedding-quote-tag">💍 NAMMA VEETU KALYANAM</span>
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
                <span>Request Custom Wedding Quote ↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. A LA CARTE ADD-ONS SECTION                                  */}
      {/* ============================================================== */}
      <section className="clean-addons-section">
        <div className="inc-container">
          <div className="clean-section-center-head">
            <div className="inc-section-label-row center-aligned">
              <div className="inc-line" />
              <span className="inc-label-text">A LA CARTE ENHANCEMENTS</span>
              <div className="inc-line" />
            </div>
            <h2 className="clean-section-h2">Enhance Your Photoshoot Experience</h2>
            <p className="clean-section-p">
              Add extra magic to any Kutty Chutties or family session with our bespoke studio add-ons.
            </p>
          </div>

          <div className="clean-addons-grid">
            {addons.map((add) => (
              <div className="clean-addon-card" key={add.name}>
                <div className="clean-addon-top">
                  <h3 className="clean-addon-title">{add.name}</h3>
                  <span className="clean-addon-price">{add.price}</span>
                </div>
                <p className="clean-addon-detail">{add.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. PAYMENT MILESTONES & STUDIO POLICY                          */}
      {/* ============================================================== */}
      <section className="clean-policy-section">
        <div className="inc-container">
          <div className="clean-section-center-head">
            <div className="inc-section-label-row center-aligned">
              <div className="inc-line" />
              <span className="inc-label-text">STUDIO POLICY</span>
              <div className="inc-line" />
            </div>
            <h2 className="clean-section-h2">Payment Milestones &amp; Structure</h2>
            <p className="clean-section-p">
              Transparent, straightforward milestone payments as outlined in our client agreement.
            </p>
          </div>

          <div className="clean-milestones-grid">
            {paymentSchedule.map((item, idx) => (
              <div className="clean-milestone-card" key={idx}>
                <span className="clean-milestone-pct">{item.pct}</span>
                <span className="clean-milestone-step">Step {item.step || `0${idx + 1}`}</span>
                <h3 className="clean-milestone-label">{item.label}</h3>
                <p className="clean-milestone-detail">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="clean-policy-banner">
            <span>📄 Looking for album re-order terms, extra sheets (₹550/sheet), or cancellation rights?</span>
            <button
              type="button"
              className="clean-policy-link-btn"
              onClick={() => onNavigate("/terms")}
            >
              <span>Read Full Terms &amp; Conditions ↗</span>
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. FREQUENTLY ASKED QUESTIONS (FAQ)                            */}
      {/* ============================================================== */}
      <section className="clean-faq-section">
        <div className="inc-container">
          <div className="clean-section-center-head">
            <div className="inc-section-label-row center-aligned">
              <div className="inc-line" />
              <span className="inc-label-text">COMMON QUESTIONS</span>
              <div className="inc-line" />
            </div>
            <h2 className="clean-section-h2">Frequently Asked Questions</h2>
            <p className="clean-section-p">
              Everything you need to know before stepping into our Krishnagiri studio.
            </p>
          </div>

          <div className="clean-faq-accordion">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`clean-faq-item${isOpen ? " is-open" : ""}`}
                >
                  <button
                    type="button"
                    className="clean-faq-trigger"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="clean-faq-q">{faq.question}</span>
                    <span className="clean-faq-icon">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="clean-faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. BOTTOM VIP BOOKING CALLOUT                                  */}
      {/* ============================================================== */}
      <section className="clean-pricing-bottom-cta">
        <div className="inc-container">
          <div className="clean-pricing-cta-card">
            <span className="cta-sparkle-tag">✦ READY TO CAPTURE YOUR BABY'S MILESTONE?</span>
            <h2 className="cta-headline">Reserve your date at The Creative Space.</h2>
            <p className="cta-sub">
              Slots fill quickly on weekends and auspicious dates. Connect directly with Mr. Gowtham Raj to confirm date availability.
            </p>
            <div className="cta-buttons-row">
              <a
                href={`https://wa.me/919500306696?text=${encodeURIComponent(
                  "Hi Gowtham Raj! I would like to check availability for a Kutty Chutties baby photography session."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-wa-btn"
              >
                <span>Chat with Gowtham Raj on WhatsApp</span>
              </a>
              <button
                type="button"
                className="cta-contact-btn"
                onClick={() => onNavigate("/contact")}
              >
                <span>Send Online Enquiry →</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
