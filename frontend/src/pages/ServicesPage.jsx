import { useEffect, useState } from "react";
import { fetchFromApi } from "../api.js";
import { processSteps, studio } from "../content.js";

const specializedServices = [
  {
    id: "wedding-photography",
    title: "Wedding Photography & 4K Cinema",
    subtitle: "Namma Veetu Kalyanam",
    badge: "Full Day Coverage",
    image: "/banners/banner_wedding.jpg",
    alt: "Wedding Photography by Raavan Studio'z",
    overview:
      "From traditional morning muhurtham rituals to vibrant evening receptions, our wedding team captures authentic emotions, genuine family laughter, and sacred traditions without stiff artificial posing.",
    highlights: [
      "Traditional Muhurtham & Candid Photography",
      "4K Cinematic Wedding Films & Teasers",
      "Dual Full-Frame Cameras & Drone Aerial Perspectives",
      "Premium Printed Flush-Mount Wedding Albums",
    ],
    whatsappMsg: "Hi Gowtham Raj! I would like to enquire about Wedding Photography services for our upcoming wedding.",
  },
  {
    id: "outdoor-couple-shoots",
    title: "Outdoor & Pre-Wedding Couple Shoots",
    subtitle: "Krishnagiri Hills & Scenic Locations",
    badge: "Golden Hour Sessions",
    image: "/banners/banner_couple.jpg",
    alt: "Outdoor Couple Shoot at Krishnagiri Hills",
    overview:
      "Pre-wedding and couple shoots at scenic Krishnagiri spots, hillsides, and lakes. We guide you with natural, comfortable poses and golden-hour sunset lighting so your chemistry shines effortlessly.",
    highlights: [
      "Krishnagiri Hills, Lakesides & Heritage Locations",
      "Sunset & Golden Hour Lighting Guidance",
      "Cinematic Teasers & Instagram Reels Included",
      "High-Resolution Color Graded Digital Deliverables",
    ],
    whatsappMsg: "Hi Gowtham Raj! I would like to book an Outdoor Pre-Wedding shoot with Raavan Studio’z.",
  },
  {
    id: "toddlers-by-raavan",
    title: "Toddlers by Raavan (Newborn & Baby Shoots)",
    subtitle: "The Creative Space · Krishnagiri",
    badge: "Packages from ₹2,500",
    image: "/banners/banner_toddler.jpg",
    alt: "Toddlers by Raavan Newborn & Milestone Shoot",
    overview:
      "Our dedicated baby studio in Krishnagiri is custom-built exclusively for newborns, infants, and toddlers. Equipped with 15+ themed handcrafted sets, cozy wraps, outfits, and gentle sanitation.",
    highlights: [
      "15+ Creative Themed Sets & Baby Costumes",
      "Sanitized, Heated & Baby-Safe Studio Environment",
      "Packages Starting from ₹2,500 (Mini Memories)",
      "Free Travel within 20km from Krishnagiri",
    ],
    whatsappMsg: "Hi Gowtham Raj! I would like to book a Kutty Chutties baby photoshoot at The Creative Space.",
  },
  {
    id: "maternity-family",
    title: "Maternity & Family Milestones",
    subtitle: "Gentle Family Storytelling",
    badge: "Studio & Outdoor",
    image: "/gallery/kutty_4.jpg",
    alt: "Maternity and Family Photography by Raavan Studio'z",
    overview:
      "Honoring the miracle of motherhood and precious family bonds. Relaxed studio setups or outdoor sessions capturing the genuine anticipation and joy of welcoming a new life.",
    highlights: [
      "Relaxed Posing Tailored for Expecting Mothers",
      "Partner & Sibling Portraits Included",
      "Choice of Studio or Outdoor Golden Hour Setting",
      "Complimentary Framed Keepsake Print",
    ],
    whatsappMsg: "Hi Gowtham Raj! I would like to enquire about Maternity & Family photography packages.",
  },
  {
    id: "heirloom-photobooks",
    title: "Handcrafted Luxury Photobooks",
    subtitle: "@photobooks_by_raavan",
    badge: "Lifetime Archival",
    image: "/kalyanam/page_4_img_1.png",
    alt: "Handcrafted Photobooks by Raavan",
    overview:
      "Tangible heirlooms crafted to withstand generations. Fine-art layflat sheets, premium leatherette or velvet covers, and UV-protective archival coatings that keep your colors vivid for decades.",
    highlights: [
      "Seamless 180° Layflat Panorama Pages",
      "Archival Fine-Art Paper & UV Protection",
      "Bespoke Leatherette & Linen Box Packaging",
      "Custom Typography & Story Layout Design",
    ],
    whatsappMsg: "Hi Gowtham Raj! I would like to order a custom handcrafted photobook from Raavan Studio’z.",
  },
];

export default function ServicesPage({ onNavigate }) {
  return (
    <div className="clean-subpage-root services-page-root" id="services-page">
      {/* ============================================================== */}
      {/* 1. HERO HEADER                                                 */}
      {/* ============================================================== */}
      <section className="clean-page-hero">
        <div className="inc-container">
          <div className="clean-hero-badge-wrap">
            <span className="clean-eyebrow-tag">OUR EXPERTISE &amp; SERVICES</span>
          </div>
          <h1 className="clean-page-title">
            Our Specialized Visual Disciplines
          </h1>
          <p className="clean-page-subtitle">
            Every commission combines quiet, unscripted documentary storytelling with bespoke artistic direction. Explore our specialized wings for weddings, newborn portraiture, and handcrafted photobooks.
          </p>

          {/* Quick Anchor Navigation */}
          <div className="clean-services-nav-chips">
            {specializedServices.map((service) => (
              <a
                key={service.id}
                href={`#${service.id}`}
                className="service-nav-chip"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(service.id);
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                <span>{service.title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. SERVICES SHOWCASE LIST (Alternating Luxury Cards)            */}
      {/* ============================================================== */}
      <section className="inc-section-wrap services-showcase-section">
        <div className="inc-container">
          <div className="services-vertical-stack">
            {specializedServices.map((service, index) => {
              const isReversed = index % 2 === 1;
              return (
                <article
                  key={service.id}
                  id={service.id}
                  className={`clean-service-block ${isReversed ? "is-reversed" : ""}`}
                >
                  <div className="inc-two-col-grid align-center">
                    {/* Visual Photo Card */}
                    <div className={`service-visual-col reveal-scale ${isReversed ? "order-2" : "order-1"}`}>
                      <div className="inc-showcase-image-card">
                        <img src={service.image} alt={service.alt} loading="lazy" />
                      </div>
                    </div>

                    {/* Content Editorial Col */}
                    <div className={`service-content-col reveal-on-scroll ${isReversed ? "order-1" : "order-2"}`}>
                      <div className="service-badge-pill">{service.badge}</div>
                      <h2 className="service-title">{service.title}</h2>
                      <p className="service-sub-tagline">{service.subtitle}</p>
                      <p className="service-desc">{service.overview}</p>

                      <div className="service-highlights-box">
                        {service.highlights.map((h) => (
                          <div key={h} className="service-highlight-item">
                            <span className="highlight-check">✓</span>
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>

                      <div className="service-actions-row">
                        <a
                          href={`https://wa.me/919500306696?text=${encodeURIComponent(service.whatsappMsg)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="service-whatsapp-btn"
                        >
                          <svg viewBox="0 0 448 512" width="16" height="16" fill="currentColor">
                            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                          </svg>
                          <span>Enquire on WhatsApp →</span>
                        </a>
                        {service.id === "toddlers-by-raavan" && (
                          <button
                            type="button"
                            className="service-secondary-btn"
                            onClick={() => onNavigate("/pricing")}
                          >
                            <span>View Packages (from ₹2,500) →</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. FOUR-STEP WORKFLOW PROCESS                                  */}
      {/* ============================================================== */}
      <section className="inc-section-wrap inc-alt-bg process-section">
        <div className="inc-container">
          <div className="clean-centered-header reveal-on-scroll">
            <span className="clean-section-tag">HOW WE WORK</span>
            <h2 className="clean-section-heading">Our 4-Step Creative Journey</h2>
            <p className="clean-section-sub">From the initial consultation to handing over your finished albums.</p>
          </div>

          <div className="process-steps-grid">
            {processSteps.map((step, idx) => (
              <div className={`clean-process-card reveal-on-scroll stagger-${idx + 1}`} key={step.number}>
                <div className="process-step-num">{step.number}</div>
                <h3 className="process-step-title">{step.moment}</h3>
                <p className="process-step-desc">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. DIRECT CTA                                                  */}
      {/* ============================================================== */}
      <section className="inc-section-wrap inc-alt-bg">
        <div className="inc-container">
          <div className="clean-cta-box reveal-scale">
            <h2 className="clean-cta-title">Looking for a Custom Package or Event Quote?</h2>
            <p className="clean-cta-desc">
              Whether you need multi-day wedding coverage or a newborn milestone portrait, Mr. Gowtham Raj is here to customize your package.
            </p>
            <div className="clean-cta-buttons-row">
              <a
                href={`https://wa.me/919500306696?text=${encodeURIComponent(
                  "Hi Gowtham Raj! I would like to check date availability and get a quote for photography services."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="clean-cta-whatsapp-btn"
              >
                <span>Chat Directly on WhatsApp →</span>
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
