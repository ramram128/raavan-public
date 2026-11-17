import { useEffect, useState } from "react";
import { getPageContent } from "../api.js";
import {
  expandedGallery,
  servicePackages,
  studio,
  studioServices,
  testimonials,
} from "../content.js";

// 16:9 widescreen hero banners for Raavan Studio'z
const cleanHeroSlides = [
  {
    image: "/banners/banner_wedding.jpg",
    alt: "Wedding Photography by Raavan Studio'z Krishnagiri",
    title: "Preserving Every Precious Wedding Moment.",
    subtitle: "Traditional wedding rituals, candid family smiles, and cinematic wedding films. Led by Gowtham Raj with 8+ years of photography experience.",
    primaryCta: { label: "View Wedding Gallery ↗", path: "/gallery" },
    secondaryCta: { label: "Book a Session", path: "/contact" },
  },
  {
    image: "/banners/banner_toddler.jpg",
    alt: "Toddlers by Raavan baby milestone photography",
    title: "Cute Baby Milestones & Newborn Portraits.",
    subtitle: "Krishnagiri's dedicated baby studio with 15+ colorful themes, safe props, cute costumes, and comfortable suites for your little one.",
    primaryCta: { label: "View Baby Packages ↗", path: "/pricing" },
    secondaryCta: { label: "Book a Session", path: "/contact" },
  },
  {
    image: "/banners/banner_couple.jpg",
    alt: "Outdoor Pre-Wedding photography at Krishnagiri Hills",
    title: "Romantic Outdoor & Pre-Wedding Shoots.",
    subtitle: "Natural couple portraits amidst Krishnagiri Hills, sunset golden-hour views, and relaxed outdoor sessions you'll cherish forever.",
    primaryCta: { label: "Explore Outdoor Shoots ↗", path: "/services" },
    secondaryCta: { label: "Book a Session", path: "/contact" },
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
  const [cmsContent, setCmsContent] = useState(null);

  // Quick booking form state in "Book Us Now" section
  const [formRole, setFormRole] = useState("");
  const [formName, setFormName] = useState("");
  const [formMobile, setFormMobile] = useState("");
  const [formService, setFormService] = useState("");
  const [formDate, setFormDate] = useState("");
  const [formSent, setFormSent] = useState(false);

  // Fetch dynamic page content from CMS API
  useEffect(() => {
    getPageContent("home").then((data) => {
      if (data && Object.keys(data).length > 0) {
        setCmsContent(data);
      }
    });
  }, []);

  const heroSlidesList =
    cmsContent?.hero_slides && cmsContent.hero_slides.length > 0
      ? cmsContent.hero_slides
      : cleanHeroSlides;

  const slide = heroSlidesList[activeSlide] || heroSlidesList[0];

  // Auto-advance hero slides every 5 seconds
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((curr) => (curr + 1) % heroSlidesList.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [heroSlidesList.length]);

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
    setActiveSlide((curr) => (curr - 1 + heroSlidesList.length) % heroSlidesList.length);
  };

  const handleNextSlide = () => {
    setActiveSlide((curr) => (curr + 1) % heroSlidesList.length);
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
      {/* 1. HERO SLIDER: CINEMATIC WIDESCREEN BANNER WITH TITLE & DESC  */}
      {/* ============================================================== */}
      <section className="inc-hero-section" id="home" aria-label="Raavan Studio'z Widescreen Banner">
        <div className="inc-hero-slider-track">
          {heroSlidesList.map((item, index) => (
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

              {/* Cinematic Shadow & Gradient Overlay for Contrast */}
              <div className="inc-hero-vignette-overlay" />

              {/* Hero Title, Description & Action Buttons Overlay */}
              <div className="inc-hero-content-overlay">
                <div className="inc-container">
                  <div className="inc-hero-text-card">
                    <h1 className="inc-hero-headline-title">{item.title}</h1>
                    <p className="inc-hero-lead-desc">{item.subtitle}</p>

                    <div className="inc-hero-buttons-group">
                      <button
                        type="button"
                        className="inc-hero-primary-btn"
                        onClick={() => onNavigate(item.primaryCta.path)}
                      >
                        <span>{item.primaryCta.label}</span>
                      </button>
                      <button
                        type="button"
                        className="inc-hero-secondary-btn"
                        onClick={() => onNavigate(item.secondaryCta.path)}
                      >
                        <span>{item.secondaryCta.label}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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

        {/* Bottom Control Bar: Indicator Dots */}
        <div className="inc-hero-bottom-bar">
          <div className="inc-hero-dots-row" role="group" aria-label="Hero slide dots">
            {heroSlidesList.map((item, index) => (
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
            <div className="inc-about-images-col reveal-scale">
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
            <div className="inc-about-content-col reveal-on-scroll">
              <h2 className="inc-heading-1">
                {cmsContent?.about_intro?.title || "Capturing Real Emotions & Family Celebrations"}
              </h2>

              <p className="inc-paragraph">
                {cmsContent?.about_intro?.bio || "At Raavan Studio’z, we believe great photography is about capturing genuine emotions without forced poses. Founded on 21st January 2021 by Mr. Gowtham Raj with over 8 years of hands-on experience, our team brings passion, natural lighting, and dedicated care to every wedding and family session."}
              </p>

              <p className="inc-paragraph">
                We operate two dedicated studios in Krishnagiri: <strong>The Creative Space</strong> designed exclusively for newborn, infant, and toddler shoots, and <strong>Work Space</strong> for wedding consultations, couple photography, and video editing.
              </p>

              {/* 3 Clean Metric Cards */}
              <div className="about-stats-container">
                <div className="about-stat-card stagger-1">
                  <div className="about-stat-value">8+</div>
                  <div className="about-stat-text">Years Experience</div>
                </div>
                <div className="about-stat-card stagger-2">
                  <div className="about-stat-value">1,500+</div>
                  <div className="about-stat-text">Happy Clients</div>
                </div>
                <div className="about-stat-card stagger-3">
                  <div className="about-stat-value">5.0 ★</div>
                  <div className="about-stat-text">Client Reviews</div>
                </div>
              </div>

              <div className="about-actions-row">
                <button
                  type="button"
                  className="about-primary-btn"
                  onClick={() => onNavigate(cmsContent?.about_intro?.ctaPath || "/about")}
                >
                  <span>{cmsContent?.about_intro?.ctaLabel || "About Our Studio →"}</span>
                </button>
                <a
                  href={`https://wa.me/919500306696?text=${encodeURIComponent(
                    "Hi Gowtham Raj! I would like to learn more about Raavan Studio’z services."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-whatsapp-btn"
                >
                  <svg viewBox="0 0 448 512" width="17" height="17" fill="currentColor">
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                  </svg>
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. SERVICE 1: WEDDING COUPLE SHOOT (Namma Veetu Kalyanam)       */}
      {/* ============================================================== */}
      {/* 3. SERVICE 1: WEDDING PHOTOGRAPHY (Namma Veetu Kalyanam)       */}
      {/* ============================================================== */}
      <section className="inc-section-wrap inc-service-section" id="wedding-couple-shoot">
        <div className="inc-container">
          <div className="inc-two-col-grid align-center">
            <div className="inc-service-text-col reveal-on-scroll">
              <h2 className="inc-heading-2">{cmsContent?.wedding_block?.title || "Namma Veetu Kalyanam"}</h2>

              <p className="inc-paragraph">
                {cmsContent?.wedding_block?.description || "From morning muhurtham rituals to evening reception celebrations, our wedding photography captures real family moments, candid smiles, and traditional ceremonies. We provide complete wedding coverage across Krishnagiri, Hosur, Dharmapuri, and Bangalore."}
              </p>

              <div className="inc-service-highlights-list">
                <div className="inc-highlight-pill">✓ Traditional Muhurtham &amp; Candid Photography</div>
                <div className="inc-highlight-pill">✓ 4K Cinematic Wedding Films &amp; Teasers</div>
                <div className="inc-highlight-pill">✓ Premium Printed Wedding Albums</div>
              </div>

              <div className="inc-btn-row">
                <button
                  type="button"
                  className="inc-primary-button"
                  onClick={() => onNavigate(cmsContent?.wedding_block?.buttonPath || "/services")}
                >
                  <span>{cmsContent?.wedding_block?.buttonLabel || "View Wedding Services →"}</span>
                </button>
              </div>
            </div>

            <div className="inc-service-image-col reveal-scale">
              <div className="inc-showcase-image-card">
                <img
                  src="/banners/banner_wedding.jpg"
                  alt="Wedding Photography by Raavan Studio'z"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. SERVICE 2: OUTDOOR & PRE-WEDDING SHOOTS                     */}
      {/* ============================================================== */}
      <section className="inc-section-wrap inc-service-section inc-alt-bg" id="outdoor-couple-shoot">
        <div className="inc-container">
          <div className="inc-two-col-grid align-center reverse-mobile">
            <div className="inc-service-image-col reveal-scale">
              <div className="inc-showcase-image-card">
                <img
                  src="/banners/banner_couple.jpg"
                  alt="Outdoor Couple Shoot at Krishnagiri Hills"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="inc-service-text-col reveal-on-scroll">
              <h2 className="inc-heading-2">{cmsContent?.outdoor_block?.title || "Outdoor & Pre-Wedding Shoots"}</h2>

              <p className="inc-paragraph">
                {cmsContent?.outdoor_block?.description || "Pre-wedding and couple shoots at Krishnagiri Hills, scenic lakesides, and heritage spots. We guide you with natural, relaxed poses and golden hour lighting so your photos feel comfortable, candid, and full of life."}
              </p>

              <div className="inc-service-highlights-list">
                <div className="inc-highlight-pill">✓ Krishnagiri Hills &amp; Scenic Outdoor Spots</div>
                <div className="inc-highlight-pill">✓ Sunset &amp; Golden Hour Timing</div>
                <div className="inc-highlight-pill">✓ Pre-Wedding Teasers &amp; Cinematic Reels</div>
              </div>

              <div className="inc-btn-row">
                <button
                  type="button"
                  className="inc-primary-button"
                  onClick={() => onNavigate(cmsContent?.outdoor_block?.buttonPath || "/services")}
                >
                  <span>{cmsContent?.outdoor_block?.buttonLabel || "View Outdoor Shoots →"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. SERVICE 3: TODDLERS BY RAAVAN (The Creative Space)          */}
      {/* ============================================================== */}
      <section className="inc-section-wrap inc-service-section" id="toddlers-shoot">
        <div className="inc-container">
          <div className="inc-two-col-grid align-center">
            <div className="inc-service-text-col reveal-on-scroll">
              <h2 className="inc-heading-2">{cmsContent?.toddler_block?.title || "Toddlers by Raavan"}</h2>

              <p className="inc-paragraph">
                {cmsContent?.toddler_block?.description || "Our dedicated baby studio in Krishnagiri — The Creative Space — is custom designed for newborns, infants, and toddlers. With 15+ creative themed sets, cute outfits, clean props, and a cozy environment, we ensure your baby stays comfortable and smiling throughout the session."}
              </p>

              <div className="inc-service-highlights-list">
                <div className="inc-highlight-pill">✓ 15+ Creative Themed Sets &amp; Baby Costumes</div>
                <div className="inc-highlight-pill">✓ Packages Starting from ₹2,500</div>
                <div className="inc-highlight-pill">✓ Safe, Clean &amp; Baby-Friendly Studio</div>
              </div>

              <div className="inc-btn-row">
                <button
                  type="button"
                  className="inc-primary-button"
                  onClick={() => onNavigate(cmsContent?.toddler_block?.buttonPath || "/kutty-chutties")}
                >
                  <span>{cmsContent?.toddler_block?.buttonLabel || "👶 Explore Raavan Kutty Chutties Page →"}</span>
                </button>
              </div>
            </div>

            <div className="inc-service-image-col reveal-scale">
              <div className="inc-showcase-image-card">
                <img
                  src="/banners/banner_toddler.jpg"
                  alt="Toddlers by Raavan Newborn & Milestone Shoot"
                  loading="lazy"
                />
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
          <div className="inc-centered-header reveal-on-scroll">
            <h2 className="inc-heading-1 text-center">Featured Photos</h2>

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
            {filteredGallery.map((photo, index) => (
              <div
                key={photo.id}
                className={`incredible-gallery-item reveal-on-scroll stagger-${(index % 4) + 1}`}
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
                    <span className="inc-photo-card-loc">{photo.location}</span>
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
              <span>View Full Photo Gallery ↗</span>
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. PRICING: KUTTY CHUTTIES PACKAGES                            */}
      {/* ============================================================== */}
      <section className="inc-section-wrap inc-pricing-section" id="pricing">
        <div className="inc-container">
          <div className="inc-centered-header reveal-on-scroll">
            <h2 className="inc-heading-1 text-center">Kutty Chutties Pricing Packages</h2>
            <p className="inc-subtitle text-center">
              Simple, transparent packages starting from ₹2,500 at The Creative Space, Krishnagiri. Free travel within 20km.
            </p>

            <div className="inc-pricing-perks-row">
              <span className="inc-perk-chip">✓ 15+ Themed Sets</span>
              <span className="inc-perk-chip">✓ Outfits &amp; Props Included</span>
              <span className="inc-perk-chip">✓ Baby-Safe &amp; Clean Studio</span>
              <span className="inc-perk-chip">✓ Led by Gowtham Raj (8+ Yrs Exp)</span>
            </div>
          </div>

          {/* 4 Kutty Chutties Tier Cards */}
          <div className="inc-pricing-grid luxury-tiers-grid">
            {/* 1. Mini Memories */}
            <div className="luxury-pricing-card tier-intro reveal-on-scroll stagger-1">
              <div className="tier-header-badge">
                <span className="tier-pill pill-intro">Mini Session</span>
              </div>
              <h3 className="tier-card-title">Mini Memories</h3>
              <div className="tier-price-box">
                <div className="tier-price-wrap">
                  <span className="tier-price-amount">₹2,500</span>
                  <span className="tier-price-sub">/ session</span>
                </div>
                <span className="tier-duration-chip">15–20 Mins Session</span>
              </div>
              <div className="tier-divider" />
              <ul className="tier-features-list">
                <li>
                  <span className="tier-check-icon">✓</span>
                  <span>1 Themed backdrop setup included</span>
                </li>
                <li>
                  <span className="tier-check-icon">✓</span>
                  <span>1 Baby outfit / wrap provided</span>
                </li>
                <li>
                  <span className="tier-check-icon">✓</span>
                  <span>5 Edited high-resolution photos</span>
                </li>
                <li>
                  <span className="tier-check-icon">✓</span>
                  <span>Digital download link provided</span>
                </li>
              </ul>
              <div className="tier-card-footer">
                <a
                  href={`https://wa.me/919500306696?text=${encodeURIComponent(
                    "Hi Gowtham Raj! I would like to book the \"Mini Memories\" (₹2,500) session with Raavan Studio’z."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tier-cta-button btn-outline"
                >
                  <span>Book on WhatsApp →</span>
                </a>
              </div>
            </div>

            {/* 2. Sweet Beginnings */}
            <div className="luxury-pricing-card tier-classic reveal-on-scroll stagger-2">
              <div className="tier-header-badge">
                <span className="tier-pill pill-classic">Standard Session</span>
              </div>
              <h3 className="tier-card-title">Sweet Beginnings</h3>
              <div className="tier-price-box">
                <div className="tier-price-wrap">
                  <span className="tier-price-amount">₹5,000</span>
                  <span className="tier-price-sub">/ session</span>
                </div>
                <span className="tier-duration-chip">30 Mins Session</span>
              </div>
              <div className="tier-divider" />
              <ul className="tier-features-list">
                <li>
                  <span className="tier-check-icon">✓</span>
                  <span>2 Creative setups (props &amp; wraps)</span>
                </li>
                <li>
                  <span className="tier-check-icon">✓</span>
                  <span>2 Baby outfits provided</span>
                </li>
                <li>
                  <span className="tier-check-icon">✓</span>
                  <span>10 Edited high-resolution photos</span>
                </li>
                <li>
                  <span className="tier-check-icon">✓</span>
                  <span>Parent + baby portrait included</span>
                </li>
              </ul>
              <div className="tier-card-footer">
                <a
                  href={`https://wa.me/919500306696?text=${encodeURIComponent(
                    "Hi Gowtham Raj! I would like to book the \"Sweet Beginnings\" (₹5,000) session with Raavan Studio’z."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tier-cta-button btn-outline"
                >
                  <span>Book on WhatsApp →</span>
                </a>
              </div>
            </div>

            {/* 3. Little Stars (Featured Popular) */}
            <div className="luxury-pricing-card tier-popular is-featured-tier reveal-on-scroll stagger-3">
              <div className="tier-header-badge">
                <span className="tier-pill pill-popular">MOST POPULAR CHOICE</span>
              </div>
              <h3 className="tier-card-title">Little Stars</h3>
              <div className="tier-price-box">
                <div className="tier-price-wrap">
                  <span className="tier-price-amount">₹8,000</span>
                  <span className="tier-price-sub">/ session</span>
                </div>
                <span className="tier-duration-chip chip-popular">60 Mins Session</span>
              </div>
              <div className="tier-divider" />
              <ul className="tier-features-list">
                <li>
                  <span className="tier-check-icon">✓</span>
                  <span>3 Themed setups of your choice</span>
                </li>
                <li>
                  <span className="tier-check-icon">✓</span>
                  <span>3 Baby outfits &amp; props provided</span>
                </li>
                <li>
                  <span className="tier-check-icon">✓</span>
                  <span>15 Edited photos + Family pictures</span>
                </li>
                <li>
                  <span className="tier-check-icon">✓</span>
                  <span>1 Complimentary wooden photo frame</span>
                </li>
              </ul>
              <div className="tier-card-footer">
                <a
                  href={`https://wa.me/919500306696?text=${encodeURIComponent(
                    "Hi Gowtham Raj! I would like to book the \"Little Stars\" (₹8,000) session with Raavan Studio’z."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tier-cta-button btn-primary-filled"
                >
                  <span>Book on WhatsApp →</span>
                </a>
              </div>
            </div>

            {/* 4. Tiny Royalty (VIP Luxury) */}
            <div className="luxury-pricing-card tier-luxury is-luxury-tier reveal-on-scroll stagger-4">
              <div className="tier-header-badge">
                <span className="tier-pill pill-luxury">PREMIUM SESSION</span>
              </div>
              <h3 className="tier-card-title">Tiny Royalty</h3>
              <div className="tier-price-box">
                <div className="tier-price-wrap">
                  <span className="tier-price-amount">₹12,000</span>
                  <span className="tier-price-sub">/ session</span>
                </div>
                <span className="tier-duration-chip chip-luxury">90 Mins Relaxed Session</span>
              </div>
              <div className="tier-divider" />
              <ul className="tier-features-list">
                <li>
                  <span className="tier-check-icon">✓</span>
                  <span>5 Themed setups of your choice</span>
                </li>
                <li>
                  <span className="tier-check-icon">✓</span>
                  <span>All props &amp; outfits provided</span>
                </li>
                <li>
                  <span className="tier-check-icon">✓</span>
                  <span>25 Edited photos + Parents &amp; Siblings</span>
                </li>
                <li>
                  <span className="tier-check-icon">✓</span>
                  <span>3 Complimentary wooden frames</span>
                </li>
              </ul>
              <div className="tier-card-footer">
                <a
                  href={`https://wa.me/919500306696?text=${encodeURIComponent(
                    "Hi Gowtham Raj! I would like to book the \"Tiny Royalty\" (₹12,000) session with Raavan Studio’z."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tier-cta-button btn-luxury-filled"
                >
                  <span>Book on WhatsApp →</span>
                </a>
              </div>
            </div>
          </div>

          {/* Wedding Custom Quote Card (Full Width Banner) */}
          <div className="inc-wedding-quote-card">
            <div className="inc-wedding-quote-info">
              <span className="inc-quote-badge">NAMMA VEETU KALYANAM</span>
              <h3 className="inc-quote-heading">Planning a Wedding, Reception, or Muhurtham?</h3>
              <p className="inc-quote-desc">
                Every wedding is special. We provide customized wedding packages with candid photography, traditional rituals, 4K wedding films, drone shoots, and premium photo albums.
              </p>
              <div className="inc-wedding-tags-row">
                <span className="inc-mini-tag">✓ Candid Photography Team</span>
                <span className="inc-mini-tag">✓ 4K Cinematic Video &amp; Teasers</span>
                <span className="inc-mini-tag">✓ Drone Aerial Shoots</span>
                <span className="inc-mini-tag">✓ Premium Wedding Albums</span>
              </div>
            </div>
            <div className="inc-quote-btn-wrap">
              <a
                href={`https://wa.me/919500306696?text=${encodeURIComponent(
                  "Hi Gowtham Raj! I would like to request a quote for our upcoming wedding celebration."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inc-primary-button"
              >
                <span>Get Wedding Quote ↗</span>
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
      {/* 8. TESTIMONIALS: "What Our Clients Say"                        */}
      {/* ============================================================== */}
      <section className="inc-section-wrap inc-testimonials-section inc-alt-bg" id="testimonials">
        <div className="inc-container">
          <h2 className="inc-heading-1 reveal-on-scroll">What Our Clients Say</h2>

          <div className="inc-testimonials-grid">
            {testimonials.map((t, idx) => (
              <div className={`inc-testimonial-card reveal-on-scroll stagger-${(idx % 3) + 1}`} key={t.couple}>
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
                    <span className="inc-author-loc">{t.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 9. STUDIO LOCATIONS & QUICK BOOKING                            */}
      {/* ============================================================== */}
      <section className="inc-section-wrap inc-book-us-section" id="contact-booking">
        <div className="inc-container">
          <div className="inc-two-col-grid align-center">
            {/* Left: Studio Locations Hub */}
            <div className="inc-book-info-col reveal-on-scroll">
              <h2 className="inc-heading-1">Visit Our Studios in Krishnagiri</h2>

              <p className="inc-paragraph" style={{ marginBottom: "26px" }}>
                Visit our studios in Krishnagiri to view printed album samples, check our themed baby sets, or discuss wedding dates with <strong>Mr. Gowtham Raj</strong>.
              </p>

              {/* 2 Clean Studio Location Cards */}
              <div className="pro-studios-stack">
                {/* Studio 1 */}
                <div className="pro-studio-card stagger-1">
                  <div className="pro-card-header">
                    <span className="pro-branch-tag">STUDIO 01 · NEWBORN &amp; TODDLERS</span>
                    <a
                      href="https://maps.app.goo.gl/13tnC9ZgRtQ5Ftje8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pro-map-link"
                    >
                      Open in Maps ↗
                    </a>
                  </div>
                  <h3 className="pro-studio-title">The Creative Space</h3>
                  <p className="pro-studio-detail">
                    3/470B RCC Moulding Bldg, Gandhi Nagar, Salem-Bangalore Hwy, Krishnagiri (Opp. Gunam Hospital)
                  </p>
                </div>

                {/* Studio 2 */}
                <div className="pro-studio-card stagger-2">
                  <div className="pro-card-header">
                    <span className="pro-branch-tag">STUDIO 02 · WEDDINGS &amp; CINEMA</span>
                    <a
                      href="https://maps.app.goo.gl/e11f4M4RwXUbF1gcA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pro-map-link"
                    >
                      Open in Maps ↗
                    </a>
                  </div>
                  <h3 className="pro-studio-title">Work Space</h3>
                  <p className="pro-studio-detail">
                    3/59-9, Gandhi Nagar, Near Pillayar Kovil, Krishnagiri (BATA Showroom lane, backside Central Theatre)
                  </p>
                </div>

                {/* Direct Contact Info Block */}
                <div className="pro-contact-bar">
                  <div className="pro-contact-meta">
                    <span className="pro-meta-label">DIRECT PHONE &amp; WHATSAPP</span>
                    <div className="pro-meta-phone-row">
                      <a href="tel:+919500306696" className="pro-phone-number">
                        +91 9500306696
                      </a>
                      <span className="pro-hours-tag">9:00 AM – 9:00 PM Daily</span>
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/919500306696?text=${encodeURIComponent(
                      "Hi Gowtham Raj! I would like to schedule a studio appointment with Raavan Studio’z."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pro-whatsapp-cta"
                  >
                    <span>Chat on WhatsApp →</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Clean Professional Booking Form */}
            <div className="inc-book-form-col reveal-scale">
              <div className="pro-booking-card">
                <div className="pro-form-head">
                  <h3 className="pro-form-title">{cmsContent?.quick_booking?.title || "Check Date Availability"}</h3>
                  <p className="pro-form-subtitle">
                    {cmsContent?.quick_booking?.subtitle || "Share your shoot details below and Mr. Gowtham Raj will connect with you directly with availability and pricing."}
                  </p>
                </div>

                {formSent ? (
                  <div className="inc-form-success">
                    <div className="inc-success-icon">✓</div>
                    <h4>Enquiry Sent via WhatsApp!</h4>
                    <p>Thank you! Mr. Gowtham Raj will review your request and get back to you shortly.</p>
                    <button
                      type="button"
                      className="inc-primary-button mt-3"
                      onClick={() => setFormSent(false)}
                    >
                      <span>Send Another Request</span>
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleQuickBookingSubmit} className="pro-inquiry-form">
                    <div className="pro-form-row">
                      <div className="pro-form-group">
                        <label htmlFor="formRole">Client Type</label>
                        <select
                          id="formRole"
                          value={formRole}
                          onChange={(e) => setFormRole(e.target.value)}
                          className="pro-form-control"
                        >
                          <option value="">Select client type</option>
                          <option value="Bride">Bride</option>
                          <option value="Groom">Groom</option>
                          <option value="Parent (Baby/Toddler Shoot)">Parent (Baby / Toddler Shoot)</option>
                          <option value="Family Member">Family Member</option>
                          <option value="Individual Client">Individual Client</option>
                        </select>
                      </div>

                      <div className="pro-form-group">
                        <label htmlFor="formService">Photography Service</label>
                        <select
                          id="formService"
                          value={formService}
                          onChange={(e) => setFormService(e.target.value)}
                          className="pro-form-control"
                        >
                          <option value="">Select service</option>
                          <option value="Wedding Couple Shoot / Namma Veetu Kalyanam">Wedding (Namma Veetu Kalyanam)</option>
                          <option value="Toddlers by Raavan (Baby / Newborn Milestone)">Toddlers by Raavan (Baby / Newborn)</option>
                          <option value="Outdoor Couple Shoot (Krishnagiri Hills)">Outdoor Couple (Krishnagiri Hills)</option>
                          <option value="Maternity & Family Portraiture">Maternity &amp; Family Portrait</option>
                          <option value="Birthday & Family Event">Birthday &amp; Family Event</option>
                        </select>
                      </div>
                    </div>

                    <div className="pro-form-row">
                      <div className="pro-form-group">
                        <label htmlFor="formName">Full Name *</label>
                        <input
                          type="text"
                          id="formName"
                          required
                          placeholder="Your name"
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          className="pro-form-control"
                        />
                      </div>

                      <div className="pro-form-group">
                        <label htmlFor="formMobile">Mobile / WhatsApp *</label>
                        <input
                          type="tel"
                          id="formMobile"
                          required
                          placeholder="Phone number"
                          value={formMobile}
                          onChange={(e) => setFormMobile(e.target.value)}
                          className="pro-form-control"
                        />
                      </div>
                    </div>

                    <div className="pro-form-group">
                      <label htmlFor="formDate">Preferred Event / Shoot Date</label>
                      <input
                        type="date"
                        id="formDate"
                        value={formDate}
                        onChange={(e) => setFormDate(e.target.value)}
                        className="pro-form-control"
                      />
                    </div>

                    <button type="submit" className="pro-submit-btn">
                      <span>{cmsContent?.quick_booking?.whatsappBtnText || "Check Availability on WhatsApp →"}</span>
                    </button>

                    <div className="pro-privacy-text">
                      Direct response from founder Mr. Gowtham Raj.
                    </div>
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
              <span className="clean-lightbox-loc">{lightboxPhoto.location}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
