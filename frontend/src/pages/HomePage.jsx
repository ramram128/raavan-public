import { useEffect, useState } from "react";
import {
  expandedGallery,
  servicePackages,
  studio,
  studioServices,
  testimonials,
} from "../content.js";

// Curated bespoke 16:9 widescreen cinematic hero banners for Raavan Studio'z
const cleanHeroSlides = [
  {
    image: "/banners/banner_wedding.jpg",
    alt: "Namma Veetu Kalyanam sacred South Indian wedding rituals",
    tagline: "Namma Veetu Kalyanam · Sacred Wedding Traditions",
  },
  {
    image: "/banners/banner_toddler.jpg",
    alt: "Toddlers by Raavan luxury newborn & baby milestone photography",
    tagline: "The Creative Space · Toddlers by Raavan Studio",
  },
  {
    image: "/banners/banner_couple.jpg",
    alt: "Cinematic pre-wedding romance at Krishnagiri Hills",
    tagline: "Krishnagiri Hills · Outdoor Cinematography & Couple Portraits",
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

  // Quick booking form state in "Book Us Now" section
  const [formRole, setFormRole] = useState("");
  const [formName, setFormName] = useState("");
  const [formMobile, setFormMobile] = useState("");
  const [formService, setFormService] = useState("");
  const [formDate, setFormDate] = useState("");
  const [formSent, setFormSent] = useState(false);

  const slide = cleanHeroSlides[activeSlide] || cleanHeroSlides[0];

  // Auto-advance hero slides every 5 seconds
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((curr) => (curr + 1) % cleanHeroSlides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  // Filter gallery items
  const filteredGallery =
    activeFilter === "All Works"
      ? expandedGallery.slice(0, 8)
      : expandedGallery.filter((item) => item.category === activeFilter).slice(0, 8);

  // Lightbox keyboard escape handler
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

  const handleQuickBookingSubmit = (e) => {
    e.preventDefault();
    if (!formName || !formMobile) {
      alert("Please provide your name and mobile number.");
      return;
    }
    const message = `Hi Gowtham Raj! I would like to book a session with Raavan Studio'z:%0A• Role: ${formRole || "Client"}%0A• Name: ${formName}%0A• Mobile: ${formMobile}%0A• Service: ${formService || "Photography Session"}%0A• Preferred Date: ${formDate || "Flexible"}`;
    window.open(`https://wa.me/919500306696?text=${message}`, "_blank");
    setFormSent(true);
  };

  return (
    <div className="incredible-homepage-root" id="home-page">
      {/* ============================================================== */}
      {/* 1. HERO SLIDER: FULL-BLEED 16:9 CINEMATIC WIDESCREEN SLIDER     */}
      {/* Matches incrediblephotography.in (.hero .swiper)               */}
      {/* ============================================================== */}
      <section className="inc-hero-section" id="home" aria-label="Raavan Studio'z Widescreen Banner">
        <div className="inc-hero-slider-track">
          {cleanHeroSlides.map((item, index) => (
            <div
              key={item.image}
              className={`inc-hero-slide${index === activeSlide ? " active" : ""}`}
              aria-hidden={index !== activeSlide}
            >
              <img
                src={item.image}
                alt={item.alt}
                className="inc-hero-image"
                fetchpriority={index === 0 ? "high" : "auto"}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>

        {/* Previous Navigation Arrow */}
        <button
          type="button"
          className="inc-slider-arrow inc-prev-arrow"
          onClick={handlePrevSlide}
          aria-label="Previous slide"
        >
          ‹
        </button>

        {/* Next Navigation Arrow */}
        <button
          type="button"
          className="inc-slider-arrow inc-next-arrow"
          onClick={handleNextSlide}
          aria-label="Next slide"
        >
          ›
        </button>

        {/* Subtle Signature Badge */}
        <div className="inc-hero-badge">
          <span>✦ Raavan Studio’z Signature Reel</span>
        </div>

        {/* Bottom Control Bar: Location Tag & Indicator Dots */}
        <div className="inc-hero-bottom-bar">
          <span className="inc-hero-tagline">📍 {slide.tagline}</span>

          <div className="inc-hero-dots-row" role="group" aria-label="Hero slide dots">
            {cleanHeroSlides.map((item, index) => (
              <button
                type="button"
                key={item.image}
                className={`inc-dot${index === activeSlide ? " active" : ""}`}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. ABOUT SECTION: "Adding the Memories of Every Moment..."     */}
      {/* Matches incrediblephotography.in (.ab-main, .abt-sec)          */}
      {/* ============================================================== */}
      <section className="inc-section-wrap inc-about-section" id="about-intro">
        <div className="inc-container">
          <div className="inc-two-col-grid align-center">
            {/* Left: Overlapping Arched Images */}
            <div className="inc-about-images-col">
              <div className="inc-arched-images-stack">
                <div className="inc-abt-frame-1">
                  <img
                    src="/banners/banner_wedding.jpg"
                    alt="Raavan Studio'z Wedding Craftsmanship"
                    loading="lazy"
                  />
                </div>
                <div className="inc-abt-frame-2">
                  <img
                    src="/banners/banner_toddler.jpg"
                    alt="Toddlers by Raavan Baby Photography"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Right: Studio Editorial Narrative */}
            <div className="inc-about-content-col">
              <div className="inc-section-label-row">
                <span className="inc-label-text">PROFESSIONAL · EXPERIENCED PHOTOGRAPHY</span>
                <div className="inc-line" />
              </div>

              <h1 className="inc-heading-1">
                Adding the Memories of Every Moment with Raavan Studio’z
              </h1>

              <p className="inc-paragraph">
                We at Raavan Studio’z preserve each cherished moment with enduring elegance. Founded on <strong>21st January 2021</strong> by <strong>Mr. Gowtham Raj</strong> with over 8 years of specialized artistic mastery, we bring creativity, cinematic lighting, and heartfelt precision to every frame.
              </p>

              <p className="inc-paragraph">
                With two dedicated physical studios in Krishnagiri — <strong>The Creative Space</strong> for toddler milestones and baby art, and <strong>Work Space</strong> for sacred wedding traditions (Namma Veetu Kalyanam) and outdoor cinematography — we craft visual heirlooms that outlive lifetimes.
              </p>

              {/* 4 Quick Highlight Metric Cards */}
              <div className="inc-stats-strip-grid">
                <div className="inc-stat-box">
                  <strong className="inc-stat-num">8+</strong>
                  <span className="inc-stat-label">Years Craftsmanship</span>
                </div>
                <div className="inc-stat-box">
                  <strong className="inc-stat-num">1,500+</strong>
                  <span className="inc-stat-label">Moments Told</span>
                </div>
                <div className="inc-stat-box">
                  <strong className="inc-stat-num">2</strong>
                  <span className="inc-stat-label">Krishnagiri Studios</span>
                </div>
                <div className="inc-stat-box">
                  <strong className="inc-stat-num">5.0 ★</strong>
                  <span className="inc-stat-label">Client Trust</span>
                </div>
              </div>

              <div className="inc-btn-row">
                <button
                  type="button"
                  className="inc-primary-button"
                  onClick={() => onNavigate("/about")}
                >
                  <span>Know More About Us →</span>
                </button>
                <a
                  href={`https://wa.me/919500306696?text=${encodeURIComponent(
                    "Hi Gowtham Raj! I would like to learn more about Raavan Studio’z services."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inc-secondary-button"
                >
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. SERVICE 1: WEDDING COUPLE SHOOT (Namma Veetu Kalyanam)       */}
      {/* Matches incrediblephotography.in (Wedding Couple Shoot)        */}
      {/* ============================================================== */}
      <section className="inc-section-wrap inc-service-section" id="wedding-couple-shoot">
        <div className="inc-container">
          <div className="inc-two-col-grid align-center">
            <div className="inc-service-text-col">
              <div className="inc-section-label-row">
                <span className="inc-label-text">Our Service</span>
                <div className="inc-line" />
              </div>

              <h2 className="inc-heading-2">Wedding Couple Shoot</h2>

              <p className="inc-paragraph">
                Capture the sacred essence of your love story with our beautifully curated <strong>Namma Veetu Kalyanam</strong> wedding collections. Whether it’s an unscripted quiet exchange, traditional South Indian muhurtham rituals, or grand evening celebrations, we craft timeless images that reflect your unique bond.
              </p>

              <div className="inc-service-highlights-list">
                <div className="inc-highlight-pill">✓ Sacred Muhurtham &amp; Candid Moments</div>
                <div className="inc-highlight-pill">✓ Archival 4K Cinematic Highlights</div>
                <div className="inc-highlight-pill">✓ Handcrafted Photobooks with Archival Paper</div>
              </div>

              <div className="inc-btn-row">
                <button
                  type="button"
                  className="inc-primary-button"
                  onClick={() => onNavigate("/services")}
                >
                  <span>View More Wedding Works →</span>
                </button>
              </div>
            </div>

            <div className="inc-service-image-col">
              <div className="inc-showcase-image-card">
                <img
                  src="/banners/banner_wedding.jpg"
                  alt="Wedding Couple Shoot by Raavan Studio'z"
                  loading="lazy"
                />
                <span className="inc-showcase-caption">Namma Veetu Kalyanam · Sacred Traditions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. SERVICE 2: OUTDOOR COUPLE SHOOT (Krishnagiri Hills)         */}
      {/* Matches incrediblephotography.in (Outdoor Couple Shoot)        */}
      {/* ============================================================== */}
      <section className="inc-section-wrap inc-service-section inc-alt-bg" id="outdoor-couple-shoot">
        <div className="inc-container">
          <div className="inc-two-col-grid align-center reverse-mobile">
            <div className="inc-service-image-col">
              <div className="inc-showcase-image-card">
                <img
                  src="/banners/banner_couple.jpg"
                  alt="Outdoor Couple Shoot at Krishnagiri Hills"
                  loading="lazy"
                />
                <span className="inc-showcase-caption">Outdoor Cinematography · Krishnagiri Hills</span>
              </div>
            </div>

            <div className="inc-service-text-col">
              <div className="inc-section-label-row">
                <span className="inc-label-text">Our Service</span>
                <div className="inc-line" />
              </div>

              <h2 className="inc-heading-2">Outdoor Couple Shoot</h2>

              <p className="inc-paragraph">
                Capture every nuance of your love in breathtaking natural surroundings with our expertly directed outdoor couple shoots. From majestic Krishnagiri Hills sunset panoramas to secluded natural lakesides and heritage architecture, we create cinematic portraits charged with authentic warmth.
              </p>

              <div className="inc-service-highlights-list">
                <div className="inc-highlight-pill">✓ Scenic Krishnagiri Hilltop &amp; Nature Locations</div>
                <div className="inc-highlight-pill">✓ Golden Hour &amp; Sunset Direction</div>
                <div className="inc-highlight-pill">✓ Pre-Wedding Cinematic Teasers</div>
              </div>

              <div className="inc-btn-row">
                <button
                  type="button"
                  className="inc-primary-button"
                  onClick={() => onNavigate("/services")}
                >
                  <span>View More Outdoor Shoots →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. SERVICE 3: TODDLERS BY RAAVAN (The Creative Space)          */}
      {/* Baby Milestone & Luxury Studio Sets                            */}
      {/* ============================================================== */}
      <section className="inc-section-wrap inc-service-section" id="toddlers-shoot">
        <div className="inc-container">
          <div className="inc-two-col-grid align-center">
            <div className="inc-service-text-col">
              <div className="inc-section-label-row">
                <span className="inc-label-text">Our Dedicated Studio</span>
                <div className="inc-line" />
              </div>

              <h2 className="inc-heading-2">Toddlers by Raavan</h2>

              <p className="inc-paragraph">
                Krishnagiri's premier dedicated baby milestone studio — <strong>The Creative Space</strong>. We celebrate the innocent wonder of childhood with 15+ bespoke handcrafted themed sets, sanitized hypoallergenic props, temperature-regulated suites, and calm, loving patience for newborns and toddlers.
              </p>

              <div className="inc-service-highlights-list">
                <div className="inc-highlight-pill">✓ 15+ Bespoke Handcrafted Themes &amp; Costumes</div>
                <div className="inc-highlight-pill">✓ Packages Starting from ₹2,500/-</div>
                <div className="inc-highlight-pill">✓ Gentle, Patient &amp; Sanitized Environment</div>
              </div>

              <div className="inc-btn-row">
                <button
                  type="button"
                  className="inc-primary-button"
                  onClick={() => onNavigate("/pricing")}
                >
                  <span>Explore Kutty Chutties Packages →</span>
                </button>
              </div>
            </div>

            <div className="inc-service-image-col">
              <div className="inc-showcase-image-card">
                <img
                  src="/banners/banner_toddler.jpg"
                  alt="Toddlers by Raavan Newborn & Milestone Shoot"
                  loading="lazy"
                />
                <span className="inc-showcase-caption">The Creative Space · Toddlers by Raavan</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. WORK GALLERY: "Showcase Of Our Work"                        */}
      {/* Matches incrediblephotography.in (.gallery)                    */}
      {/* ============================================================== */}
      <section className="inc-section-wrap inc-gallery-section" id="work-gallery">
        <div className="inc-container">
          <div className="inc-centered-header">
            <div className="inc-centered-label-row">
              <div className="inc-line" />
              <span className="inc-label-text">WORK GALLERY</span>
              <div className="inc-line" />
            </div>
            <h2 className="inc-heading-1 text-center">Showcase Of Our Work</h2>

            {/* Filter Tabs */}
            <div className="inc-filter-tabs-row" role="tablist">
              {galleryFilters.map((filt) => (
                <button
                  type="button"
                  key={filt}
                  className={`inc-filter-tab${activeFilter === filt ? " active" : ""}`}
                  onClick={() => setActiveFilter(filt)}
                  role="tab"
                  aria-selected={activeFilter === filt}
                >
                  {filt}
                </button>
              ))}
            </div>
          </div>

          {/* Photo Grid with Camera Reticle Cursor on Hover */}
          <div className="inc-gallery-grid">
            {filteredGallery.map((photo) => (
              <div
                key={photo.id}
                className="incredible-gallery-item"
                data-photo="true"
                onClick={() => setLightboxPhoto(photo)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setLightboxPhoto(photo);
                }}
              >
                <div className="inc-gallery-image-wrapper">
                  <img src={photo.image} alt={photo.alt} loading="lazy" />
                  <div className="inc-gallery-overlay">
                    <span className="inc-photo-cat-badge">{photo.category}</span>
                    <h3 className="inc-photo-card-title">{photo.title}</h3>
                    <p className="inc-photo-card-story">{photo.story}</p>
                    <span className="inc-photo-card-loc">📍 {photo.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="inc-centered-btn-wrap">
            <button
              type="button"
              className="inc-primary-button"
              onClick={() => onNavigate("/gallery")}
            >
              <span>View Complete 16+ Curated Works Gallery ↗</span>
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. TRANSPARENT PRICING: KUTTY CHUTTIES PACKAGES (4 CLEAN CARDS) */}
      {/* ============================================================== */}
      <section className="inc-section-wrap inc-pricing-section" id="pricing">
        <div className="inc-container">
          <div className="inc-centered-header">
            <div className="inc-centered-label-row">
              <div className="inc-line" />
              <span className="inc-label-text">TRANSPARENT INVESTMENTS · THE CREATIVE SPACE</span>
              <div className="inc-line" />
            </div>
            <h2 className="inc-heading-1 text-center">Kutty Chutties Pricing Packages</h2>
            <p className="inc-subtitle text-center">
              Milestone portrait sessions starting from ₹2,500/-. Complimentary travel within 20km from Krishnagiri.
            </p>

            <div className="inc-pricing-perks-row">
              <span className="inc-perk-chip">✓ 15+ Themed Handcrafted Sets</span>
              <span className="inc-perk-chip">✓ All Props &amp; Outfits Included</span>
              <span className="inc-perk-chip">✓ Temperature-Controlled Studio Suites</span>
              <span className="inc-perk-chip">✓ Directed by Mr. Gowtham Raj (8+ Yrs Exp)</span>
            </div>
          </div>

          {/* 4 Clean Baby Milestone Package Cards */}
          <div className="inc-pricing-grid">
            {servicePackages
              .filter((pkg) => pkg.id !== "namma-veetu-kalyanam")
              .map((pkg) => {
                const isPopular = pkg.id === "little-stars" || pkg.badge === "Most Popular";
                const isLuxury = pkg.id === "tiny-royalty" || pkg.badge === "Luxury Experience";

                return (
                  <div
                    className={`inc-pricing-card${isPopular ? " highlight-popular" : ""}${isLuxury ? " highlight-luxury" : ""}`}
                    key={pkg.id}
                  >
                    {/* Badge */}
                    <div className={`inc-pkg-badge${isPopular ? " badge-popular" : ""}${isLuxury ? " badge-luxury" : ""}`}>
                      <span>{isPopular ? "⭐ " : isLuxury ? "👑 " : ""}{pkg.badge}</span>
                    </div>

                    <div className="inc-pkg-head">
                      <h3 className="inc-pkg-title">{pkg.name}</h3>
                      <p className="inc-pkg-tagline">“{pkg.tagline}”</p>
                    </div>

                    <div className="inc-pkg-price-row">
                      <span className="inc-price-val">{pkg.price}</span>
                      <span className="inc-price-dur">/ session</span>
                    </div>
                    <span className="inc-duration-tag">⏱ {pkg.duration}</span>

                    <div className="inc-pkg-divider" />

                    <ul className="inc-pkg-features">
                      {pkg.features.map((feat) => (
                        <li key={feat}>
                          <span className="inc-check">✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="inc-pkg-footer">
                      <a
                        href={`https://wa.me/919500306696?text=${encodeURIComponent(
                          `Hi Gowtham Raj! I would like to book the "${pkg.name}" (${pkg.price}) session with Raavan Studio’z.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inc-pkg-btn${isPopular ? " filled" : ""}${isLuxury ? " luxury-btn" : ""}`}
                      >
                        <span>Book on WhatsApp →</span>
                      </a>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Wedding Custom Quote Card (Full Width Banner) */}
          <div className="inc-wedding-quote-card">
            <div className="inc-wedding-quote-info">
              <span className="inc-quote-badge">💍 NAMMA VEETU KALYANAM</span>
              <h3 className="inc-quote-heading">Planning a Wedding, Reception or Sacred Muhurtham?</h3>
              <p className="inc-quote-desc">
                Every sacred celebration is distinct. We craft bespoke wedding quotations including 4K candid cinema, aerial drone visuals, and handcrafted archival photobooks.
              </p>
              <div className="inc-wedding-tags-row">
                <span className="inc-mini-tag">✓ Multi-Camera Candid Crew</span>
                <span className="inc-mini-tag">✓ 4K Cinematic Teasers</span>
                <span className="inc-mini-tag">✓ Drone Aerial Cinematography</span>
                <span className="inc-mini-tag">✓ Handcrafted Photobooks</span>
              </div>
            </div>
            <div className="inc-quote-btn-wrap">
              <a
                href={`https://wa.me/919500306696?text=${encodeURIComponent(
                  "Hi Gowtham Raj! I would like to request a custom quotation for our upcoming wedding celebration."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inc-primary-button"
              >
                <span>Get Custom Wedding Quote ↗</span>
              </a>
              <button
                type="button"
                className="inc-secondary-button-light"
                onClick={() => onNavigate("/pricing")}
              >
                <span>View Full Pricing Page →</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. TESTIMONIALS: "What our client says about us"               */}
      {/* Matches incrediblephotography.in (.gtco-testimonials)          */}
      {/* ============================================================== */}
      <section className="inc-section-wrap inc-testimonials-section inc-alt-bg" id="testimonials">
        <div className="inc-container">
          <div className="inc-section-label-row">
            <span className="inc-label-text">Testimonial</span>
            <div className="inc-line" />
          </div>
          <h2 className="inc-heading-1">What our client says about us</h2>

          <div className="inc-testimonials-grid">
            {testimonials.map((t) => (
              <div className="inc-testimonial-card" key={t.couple}>
                <div className="inc-star-rating">★★★★★</div>
                <p className="inc-testimonial-quote">“{t.quote}”</p>
                <div className="inc-testimonial-author">
                  <img
                    src={t.image}
                    alt={t.couple}
                    className="inc-author-avatar"
                  />
                  <div className="inc-author-info">
                    <strong className="inc-author-name">{t.couple}</strong>
                    <span className="inc-author-loc">📍 {t.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 9. BOOK US NOW: Studio Locations & Quick Booking Form          */}
      {/* Matches incrediblephotography.in (Book Us Now)                 */}
      {/* ============================================================== */}
      <section className="inc-section-wrap inc-book-us-section" id="contact-booking">
        <div className="inc-container">
          <div className="inc-two-col-grid">
            {/* Left: Studio Locations & Direct Reach */}
            <div className="inc-book-info-col">
              <div className="inc-section-label-row">
                <span className="inc-label-text">Book Us Now</span>
                <div className="inc-line" />
              </div>

              <h2 className="inc-heading-1">We are here to stitch your story.</h2>

              <p className="inc-paragraph">
                We are here to lessen your worries and stitch a memorable story of your wedding, baby milestones, or family moments. If you are ready to put things in motion, what are you waiting for?
              </p>
              <p className="inc-paragraph">
                Book Us Now — Mr. Gowtham Raj and our team will be more than happy to welcome you to our studios.
              </p>

              {/* Dual Krishnagiri Studios */}
              <div className="inc-address-boxes-stack">
                {/* Branch 1 */}
                <div className="inc-address-box">
                  <div className="inc-address-icon">📍</div>
                  <div className="inc-address-content">
                    <strong className="inc-address-title">Studio 1: The Creative Space</strong>
                    <span className="inc-address-sub">Toddlers, Baby Milestones &amp; Family Portraits</span>
                    <p className="inc-address-text">
                      3/470B RCC Moulding Bldg, Gandhi Nagar, Salem-Bangalore Hwy, Krishnagiri (Opp. Gunam Hospital)
                    </p>
                    <a
                      href="https://maps.app.goo.gl/13tnC9ZgRtQ5Ftje8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inc-map-link"
                    >
                      Open in Google Maps ↗
                    </a>
                  </div>
                </div>

                {/* Branch 2 */}
                <div className="inc-address-box">
                  <div className="inc-address-icon">📍</div>
                  <div className="inc-address-content">
                    <strong className="inc-address-title">Studio 2: Work Space</strong>
                    <span className="inc-address-sub">Weddings, Couples &amp; Commercial Cinematography</span>
                    <p className="inc-address-text">
                      3/59-9, Gandhi Nagar, Near Pillayar Kovil, Krishnagiri (BATA Showroom down lane, backside Central Theatre)
                    </p>
                    <a
                      href="https://maps.app.goo.gl/e11f4M4RwXUbF1gcA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inc-map-link"
                    >
                      Open in Google Maps ↗
                    </a>
                  </div>
                </div>

                {/* Direct Phone & WhatsApp */}
                <div className="inc-address-box">
                  <div className="inc-address-icon">📞</div>
                  <div className="inc-address-content">
                    <strong className="inc-address-title">Call or WhatsApp Mr. Gowtham Raj</strong>
                    <p className="inc-address-text">
                      <a href="tel:+919500306696" className="inc-phone-link">
                        +91 9500306696
                      </a>{" "}
                      · Daily 9:00 AM – 9:00 PM
                    </p>
                    <span className="inc-address-sub">raavanstudioz@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Quick Booking Inquiry Form */}
            <div className="inc-book-form-col">
              <div className="inc-booking-card">
                <h3 className="inc-form-heading">Check Date Availability &amp; Booking</h3>
                <p className="inc-form-sub">
                  Tell us about your upcoming occasion, and Mr. Gowtham Raj will connect with you promptly.
                </p>

                {formSent ? (
                  <div className="inc-form-success">
                    <div className="inc-success-icon">✓</div>
                    <h4>Enquiry Sent via WhatsApp!</h4>
                    <p>Thank you! Gowtham Raj has received your message and will get back to you shortly.</p>
                    <button
                      type="button"
                      className="inc-primary-button mt-3"
                      onClick={() => setFormSent(false)}
                    >
                      <span>Send Another Request</span>
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleQuickBookingSubmit} className="inc-booking-form">
                    <div className="inc-form-field">
                      <label htmlFor="formRole">I am the:</label>
                      <select
                        id="formRole"
                        value={formRole}
                        onChange={(e) => setFormRole(e.target.value)}
                        className="inc-input-control"
                      >
                        <option value="">Select your relation</option>
                        <option value="Bride">Bride</option>
                        <option value="Groom">Groom</option>
                        <option value="Parent (Baby/Toddler Shoot)">Parent (Baby / Toddler Shoot)</option>
                        <option value="Family Member">Family Member</option>
                        <option value="Friend">Friend</option>
                      </select>
                    </div>

                    <div className="inc-form-field">
                      <label htmlFor="formName">Your Name *</label>
                      <input
                        type="text"
                        id="formName"
                        required
                        placeholder="e.g. Priyadarshini / Karthik"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="inc-input-control"
                      />
                    </div>

                    <div className="inc-form-field">
                      <label htmlFor="formMobile">Mobile Number *</label>
                      <input
                        type="tel"
                        id="formMobile"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={formMobile}
                        onChange={(e) => setFormMobile(e.target.value)}
                        className="inc-input-control"
                      />
                    </div>

                    <div className="inc-form-field">
                      <label htmlFor="formService">Photography Service</label>
                      <select
                        id="formService"
                        value={formService}
                        onChange={(e) => setFormService(e.target.value)}
                        className="inc-input-control"
                      >
                        <option value="">Select service</option>
                        <option value="Wedding Couple Shoot / Namma Veetu Kalyanam">Wedding Couple Shoot (Namma Veetu Kalyanam)</option>
                        <option value="Outdoor Couple Shoot (Krishnagiri Hills)">Outdoor Couple Shoot (Krishnagiri Hills)</option>
                        <option value="Toddlers by Raavan (Baby / Newborn Milestone)">Toddlers by Raavan (Baby / Newborn Milestone)</option>
                        <option value="Maternity & Family Portraiture">Maternity &amp; Family Portraiture</option>
                        <option value="Custom Bespoke Event">Custom Bespoke Event</option>
                      </select>
                    </div>

                    <div className="inc-form-field">
                      <label htmlFor="formDate">Expected Event Date</label>
                      <input
                        type="date"
                        id="formDate"
                        value={formDate}
                        onChange={(e) => setFormDate(e.target.value)}
                        className="inc-input-control"
                      />
                    </div>

                    <button type="submit" className="inc-submit-button">
                      <span>Reserve Date &amp; Connect on WhatsApp →</span>
                    </button>

                    <p className="inc-form-privacy-note">
                      🔒 Your details are kept private and confidential. Direct response from Mr. Gowtham Raj.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* LIGHTBOX MODAL PREVIEW                                         */}
      {/* ============================================================== */}
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
