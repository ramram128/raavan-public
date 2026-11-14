import { useEffect, useState } from "react";
import {
  expandedGallery,
  heroSlides,
  servicePackages,
  studio,
  studioServices,
  testimonials,
} from "../content.js";

// Curated clean high-res hero slides without messy text watermarks
const cleanHeroSlides = [
  {
    image: "/kalyanam/page_4_img_1.png",
    alt: "Namma Veetu Kalyanam sacred moments",
    tagline: "Namma Veetu Kalyanam · Krishnagiri",
  },
  {
    image: "/kalyanam/page_2_img_1.png",
    alt: "Cinematic wedding vows and rituals",
    tagline: "Sacred Traditions · Tamil Nadu",
  },
  {
    image: "/gallery/kutty_4.jpg",
    alt: "Toddlers by Raavan newborn portrait",
    tagline: "The Creative Space · Toddlers by Raavan",
  },
  {
    image: "/kalyanam/page_5_img_1.png",
    alt: "Pre-wedding portrait in Krishnagiri Hills",
    tagline: "Outdoor Cinematography · Krishnagiri Hills",
  },
];

const galleryFilters = [
  "All Works",
  "Weddings",
  "Newborns",
  "Toddlers",
  "Couple portraits",
];

export default function HomePage({ onNavigate }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeFilter, setActiveFilter] = useState("All Works");
  const [lightboxPhoto, setLightboxPhoto] = useState(null);

  const slide = cleanHeroSlides[activeSlide] || cleanHeroSlides[0];

  // Auto-advance slides every 6 seconds
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((curr) => (curr + 1) % cleanHeroSlides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, []);

  // Filter gallery
  const filteredGallery =
    activeFilter === "All Works"
      ? expandedGallery.slice(0, 8)
      : expandedGallery.filter((item) => item.category === activeFilter).slice(0, 8);

  // Lightbox keyboard navigation
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") setLightboxPhoto(null);
    }
    if (lightboxPhoto) {
      document.body.classList.add("modal-open");
      window.addEventListener("keydown", onKeyDown);
    }
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxPhoto]);

  const handlePrevSlide = () => {
    setActiveSlide((curr) => (curr - 1 + cleanHeroSlides.length) % cleanHeroSlides.length);
  };

  const handleNextSlide = () => {
    setActiveSlide((curr) => (curr + 1) % cleanHeroSlides.length);
  };

  return (
    <div className="clean-homepage-root" id="home-page">
      {/* 1. FULL-WIDTH CINEMATIC HERO SLIDER BANNER (COVERING FULL BANNER) */}
      <section className="full-banner-hero-section" id="home" aria-label="Raavan Studio'z visual highlights">
        <div className="full-banner-hero-container">
          <div className="full-banner-slider-track">
            {cleanHeroSlides.map((item, index) => (
              <div
                key={item.image}
                className={`full-banner-slide${index === activeSlide ? " active" : ""}`}
                aria-hidden={index !== activeSlide}
              >
                {/* Ambient Atmospheric Backdrop */}
                <img
                  src={item.image}
                  alt=""
                  aria-hidden="true"
                  className="full-banner-ambient-bg"
                />

                {/* Crisp Foreground Photo (Natural Proportion, Zero Excessive Zoom) */}
                <img
                  src={item.image}
                  alt={item.alt}
                  className="full-banner-slide-image"
                  fetchpriority={index === 0 ? "high" : "auto"}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>

          {/* Left Navigation Arrow */}
          <button
            type="button"
            className="banner-nav-arrow prev-arrow"
            onClick={handlePrevSlide}
            aria-label="Previous slide"
          >
            ‹
          </button>

          {/* Right Navigation Arrow */}
          <button
            type="button"
            className="banner-nav-arrow next-arrow"
            onClick={handleNextSlide}
            aria-label="Next slide"
          >
            ›
          </button>

          {/* Floating Studio Craft Tag Top-Right */}
          <div className="banner-floating-badge">
            <span>✦ Raavan Studio’z Signature Reel</span>
          </div>

          {/* Bottom Controls Bar: Location Tag & Dots */}
          <div className="banner-bottom-controls-bar">
            <span className="banner-location-tag">📍 {slide.tagline}</span>

            <div className="banner-slide-dots-group" role="group" aria-label="Hero slide dots">
              {cleanHeroSlides.map((item, index) => (
                <button
                  type="button"
                  key={item.image}
                  className={`banner-indicator-dot${index === activeSlide ? " active" : ""}`}
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => setActiveSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. STUDIO MILESTONES STRIP (ON PURE WHITE) */}
      <section className="clean-milestones-strip-section" aria-label="Studio Milestones">
        <div className="site-max-container">
          <div className="milestones-four-col-grid">
            <div className="milestone-block">
              <strong className="milestone-big-number">8+</strong>
              <span className="milestone-label-title">Years Craftsmanship</span>
              <p className="milestone-sub-text">Dedicated visual storytelling</p>
            </div>
            <div className="milestone-block">
              <strong className="milestone-big-number">1,500+</strong>
              <span className="milestone-label-title">Moments Told</span>
              <p className="milestone-sub-text">Weddings, babies &amp; portraits</p>
            </div>
            <div className="milestone-block">
              <strong className="milestone-big-number">2</strong>
              <span className="milestone-label-title">Signature Studios</span>
              <p className="milestone-sub-text">Creative Space &amp; Work Space</p>
            </div>
            <div className="milestone-block">
              <strong className="milestone-big-number">5.0 ★</strong>
              <span className="milestone-label-title">Client Satisfaction</span>
              <p className="milestone-sub-text">Loved across Krishnagiri &amp; TN</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SIGNATURE DISCIPLINES (CLEAN WHITE EDITORIAL CARDS) */}
      <section className="clean-white-section" id="disciplines-section">
        <div className="site-max-container">
          <div className="clean-section-header-box">
            <span className="clean-section-pill">Our Core Disciplines</span>
            <h2 className="clean-section-heading">Signature Photography Disciplines</h2>
            <p className="clean-section-subtitle">
              From grand traditional South Indian weddings to gentle 12-day newborn milestone sessions.
            </p>
          </div>

          <div className="clean-disciplines-cards-grid">
            {studioServices.map((serv) => (
              <div
                className="clean-discipline-card"
                key={serv.id}
                onClick={() => onNavigate("/services")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onNavigate("/services");
                }}
              >
                <div className="clean-discipline-image-wrap">
                  <img src={serv.image} alt={serv.alt} loading="lazy" />
                  <span className="clean-discipline-badge-tag">{serv.badge}</span>
                </div>

                <div className="clean-discipline-body">
                  <h3 className="clean-discipline-card-title">{serv.title}</h3>
                  <p className="clean-discipline-tagline-text">“{serv.tagline}”</p>
                  <p className="clean-discipline-desc-text">{serv.overview.substring(0, 115)}...</p>

                  <div className="clean-discipline-features-chips">
                    {serv.deliverables.slice(0, 2).map((item) => (
                      <span className="mini-chip" key={item}>✓ {item}</span>
                    ))}
                  </div>

                  <span className="clean-discipline-view-link">Explore Service Details →</span>
                </div>
              </div>
            ))}
          </div>

          <div className="clean-center-cta-wrap">
            <button
              type="button"
              className="clean-btn-primary"
              onClick={() => onNavigate("/services")}
            >
              <span>Explore All 6 Photography Disciplines ↗</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4. CURATED WORKS GALLERY (CLEAN ON SOFT PORCELAIN #F8FAFC) */}
      <section className="clean-porcelain-section" id="gallery-section">
        <div className="site-max-container">
          <div className="clean-section-header-box">
            <span className="clean-section-pill">Curated Stories</span>
            <h2 className="clean-section-heading">Selected Moments &amp; Works</h2>
            <p className="clean-section-subtitle">
              Unscripted emotions, candid wedding rituals, and precious toddler giggles.
            </p>

            <div className="clean-gallery-filter-chips-row">
              {galleryFilters.map((filt) => (
                <button
                  type="button"
                  key={filt}
                  className={`clean-filter-tab${activeFilter === filt ? " active" : ""}`}
                  onClick={() => setActiveFilter(filt)}
                >
                  {filt}
                </button>
              ))}
            </div>
          </div>

          <div className="clean-gallery-photo-grid">
            {filteredGallery.map((photo) => (
              <article
                key={photo.id}
                className="clean-gallery-photo-card"
                onClick={() => setLightboxPhoto(photo)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setLightboxPhoto(photo);
                }}
              >
                <div className="clean-gallery-img-container">
                  <img src={photo.image} alt={photo.alt} loading="lazy" />
                  <div className="clean-gallery-hover-overlay">
                    <span className="clean-photo-cat-tag">{photo.category}</span>
                    <h3 className="clean-photo-title">{photo.title}</h3>
                    <p className="clean-photo-story">{photo.story}</p>
                    <span className="clean-photo-loc">📍 {photo.location}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="clean-center-cta-wrap">
            <button
              type="button"
              className="clean-btn-secondary"
              onClick={() => onNavigate("/gallery")}
            >
              <span>View Complete 16+ Curated Works Gallery ↗</span>
            </button>
          </div>
        </div>
      </section>

      {/* 5. KUTTY CHUTTIES PRICING PACKAGES (ON CLEAN WHITE) */}
      <section className="clean-white-section" id="pricing-section">
        <div className="site-max-container">
          <div className="clean-section-header-box">
            <span className="clean-section-pill">Transparent Investments</span>
            <h2 className="clean-section-heading">Kutty Chutties Pricing Packages</h2>
            <p className="clean-section-subtitle">
              Milestone portrait sessions starting from ₹2,500/-. Complimentary travel within 20km from Krishnagiri.
            </p>
          </div>

          <div className="clean-pricing-cards-grid">
            {servicePackages.map((pkg) => {
              const isPopular = pkg.badge === "Most Popular" || pkg.badge === "VIP Masterpiece";
              return (
                <div
                  className={`clean-pricing-card${isPopular ? " popular-highlight" : ""}`}
                  key={pkg.id}
                >
                  {pkg.badge && (
                    <div className="pricing-badge-top">
                      <span>{isPopular ? "⭐ " : ""}{pkg.badge}</span>
                    </div>
                  )}

                  <h3 className="pkg-card-title">{pkg.name}</h3>
                  <p className="pkg-card-tagline">“{pkg.tagline}”</p>

                  <div className="pkg-card-price-row">
                    <span className="pkg-price-amount">{pkg.price}</span>
                    <span className="pkg-price-duration">/ {pkg.duration}</span>
                  </div>

                  <ul className="pkg-card-features-list">
                    {pkg.features.map((feat) => (
                      <li key={feat}>
                        <span className="check-mark" aria-hidden="true">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={`https://wa.me/919500306696?text=${encodeURIComponent(
                      `Hi Gowtham Raj, I would like to book the "${pkg.name}" (${pkg.price}) package with Raavan Studio’z!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`clean-pkg-book-btn${isPopular ? " filled" : ""}`}
                  >
                    <span>Book on WhatsApp →</span>
                  </a>
                </div>
              );
            })}
          </div>

          {/* Wedding Custom Quote Card */}
          <div className="clean-wedding-quote-banner">
            <div>
              <span className="wedding-badge-label">💍 Namma Veetu Kalyanam</span>
              <h3>Planning a Wedding, Reception or Sacred Muhurtham?</h3>
              <p>
                Every celebration is unique. We craft bespoke wedding quotations including 4K candid cinema, aerial drone visuals, and handcrafted archival photobooks.
              </p>
            </div>
            <a
              href={`https://wa.me/919500306696?text=${encodeURIComponent(
                "Hi Gowtham Raj! I would like to request a custom quotation for our upcoming wedding celebration."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="clean-btn-primary"
            >
              <span>Get Custom Wedding Quote ↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* 6. FOUNDER & 2 KRISHNAGIRI BRANCHES (ON SOFT PORCELAIN #F8FAFC) */}
      <section className="clean-porcelain-section" id="about-section">
        <div className="site-max-container">
          <div className="founder-editorial-two-col">
            <div className="founder-card-box">
              <div className="founder-emblem-badge-wrap">
                <img
                  src="/raavan-logo-only.png"
                  alt="Raavan Studio'z Emblem"
                  className="founder-emblem-img"
                />
              </div>
              <strong className="founder-name-text">Mr. Gowtham Raj</strong>
              <span className="founder-title-text">Founder &amp; Creative Director</span>
              <div className="founder-experience-tag">8+ Years Craftsmanship · Estd. 2021</div>
            </div>

            <div className="founder-story-info-box">
              <span className="clean-section-pill">The Vision</span>
              <h2 className="founder-headline-title">“Make a count, Click the moment.”</h2>
              <p className="founder-bio-p">
                With over 8 years of specialized visual mastery, <strong>Mr. Gowtham Raj</strong> established Raavan Studio’z on 21st January 2021 in Krishnagiri. Our singular conviction is that photography should feel like an heirloom — authentic, soulful, and unforced.
              </p>
              <blockquote className="founder-pullquote">
                “Our major strength is to work creatively according to each client’s special vision. We deliver our outputs in the highest quality, capturing authentic emotions that outlive lifetimes.”
              </blockquote>

              {/* 2 Branches in Krishnagiri */}
              <div className="branches-clean-two-grid">
                <div className="branch-card-clean">
                  <span className="branch-type-label">Flagship Experience</span>
                  <strong className="branch-name-title">The Creative Space</strong>
                  <p className="branch-address-text">
                    3/470B RCC Moulding Bldg, Gandhi Nagar, Salem-Bangalore Hwy, Krishnagiri (Opp. Gunam Hospital)
                  </p>
                  <a
                    href="https://maps.app.goo.gl/13tnC9ZgRtQ5Ftje8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="branch-maps-link"
                  >
                    📍 Open in Google Maps ↗
                  </a>
                </div>

                <div className="branch-card-clean">
                  <span className="branch-type-label">Digital Atelier</span>
                  <strong className="branch-name-title">Work Space</strong>
                  <p className="branch-address-text">
                    3/59-9, Gandhi Nagar, Near Pillayar Kovil, Krishnagiri (BATA Showroom lane, backside Central Theatre)
                  </p>
                  <a
                    href="https://maps.app.goo.gl/e11f4M4RwXUbF1gcA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="branch-maps-link"
                  >
                    📍 Open in Google Maps ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CLIENT TESTIMONIALS (ON PURE WHITE) */}
      <section className="clean-white-section" id="testimonials-section">
        <div className="site-max-container">
          <div className="clean-section-header-box">
            <span className="clean-section-pill">Client Trust</span>
            <h2 className="clean-section-heading">Love Notes From Our Families</h2>
            <p className="clean-section-subtitle">
              Cherished testimonials from newlyweds and young parents across Krishnagiri &amp; Bangalore.
            </p>
          </div>

          <div className="clean-testimonials-three-grid">
            {testimonials.map((t) => (
              <div className="clean-testimonial-card" key={t.couple}>
                <div className="golden-stars-row">★★★★★</div>
                <p className="testimonial-body-quote">“{t.quote}”</p>
                <div className="testimonial-client-row">
                  <img src={t.image} alt={t.couple} className="client-avatar-img" />
                  <div>
                    <strong className="client-name">{t.couple}</strong>
                    <span className="client-location">📍 {t.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. VIP BOTTOM CALL TO ACTION BANNER (DEEP NAVY ANCHOR) */}
      <section className="clean-porcelain-section" style={{ paddingBottom: "100px" }}>
        <div className="site-max-container">
          <div className="clean-vip-cta-banner">
            <span className="vip-sub-label">✦ NOW RESERVING DATES FOR 2026 &amp; 2027</span>
            <h2 className="vip-banner-title">Let’s immortalize your sacred moments.</h2>
            <p className="vip-banner-desc">
              Whether it is your wedding muhurtham, newborn milestone, or a family heirloom photobook, we would love to document your legacy.
            </p>
            <div className="vip-buttons-row">
              <a
                href={`https://wa.me/919500306696?text=${encodeURIComponent(
                  "Hi Gowtham Raj! I would love to check date availability and package details with Raavan Studio’z."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="clean-btn-whatsapp-large"
              >
                <span>Direct WhatsApp with Gowtham Raj</span>
              </a>
              <button
                type="button"
                className="clean-btn-primary"
                onClick={() => onNavigate("/contact")}
              >
                <span>Send Online Enquiry →</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {lightboxPhoto && (
        <div
          className="clean-lightbox-backdrop"
          onClick={() => setLightboxPhoto(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="clean-lightbox-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="clean-lightbox-close"
              onClick={() => setLightboxPhoto(null)}
              aria-label="Close photo preview"
            >
              ✕
            </button>
            <img
              src={lightboxPhoto.image}
              alt={lightboxPhoto.alt || lightboxPhoto.title}
              className="clean-lightbox-img"
            />
            <div className="clean-lightbox-meta">
              <span className="clean-lightbox-cat">{lightboxPhoto.category}</span>
              <h3>{lightboxPhoto.title}</h3>
              <p>{lightboxPhoto.story}</p>
              <span className="clean-lightbox-loc">📍 {lightboxPhoto.location}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
