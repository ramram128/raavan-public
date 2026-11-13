import { useEffect, useRef, useState } from "react";
import {
  expandedGallery,
  heroSlides,
  servicePackages,
  studio,
  studioServices,
  testimonials,
} from "../content.js";

const filmReelPhotos = [
  { img: "/kalyanam/page_4_img_1.png", title: "Namma Veetu Kalyanam", tag: "Royal Muhurtham" },
  { img: "/gallery/kutty_1.jpg", title: "Toddlers by Raavan", tag: "Newborn Wrap" },
  { img: "/kalyanam/page_2_img_1.png", title: "Sacred Vows", tag: "Traditions" },
  { img: "/gallery/kutty_4.jpg", title: "Little Smiles", tag: "Milestones" },
  { img: "/kalyanam/page_5_img_1.png", title: "Krishnagiri Hills", tag: "Pre-Wedding" },
  { img: "/gallery/kutty_chutties_1.png", title: "Cake Smash", tag: "1st Birthday" },
  { img: "/kalyanam/page_3_img_1.png", title: "Candid Laughter", tag: "Celebration" },
  { img: "/kalyanam/page_7_img_1.png", title: "Bridal Grace", tag: "Portraits" },
];

const homeGalleryFilters = [
  "All Stories",
  "Weddings",
  "Newborns",
  "Toddlers",
  "Couple portraits",
];

export default function HomePage({ onNavigate }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeTabDiscipline, setActiveTabDiscipline] = useState(0);
  const [activeFilter, setActiveFilter] = useState("All Stories");
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [cameraFlash, setCameraFlash] = useState(false);
  const [slideProgress, setSlideProgress] = useState(0);

  const slide = heroSlides[activeSlide] || heroSlides[0];
  const activeDiscipline = studioServices[activeTabDiscipline] || studioServices[0];

  // Auto-advance hero slides every 6 seconds with progress bar
  useEffect(() => {
    setSlideProgress(0);
    const interval = 50; // update progress every 50ms
    const totalTime = 6000;
    const step = (interval / totalTime) * 100;

    const progressTimer = window.setInterval(() => {
      setSlideProgress((prev) => {
        if (prev >= 100) {
          setActiveSlide((curr) => (curr + 1) % heroSlides.length);
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => window.clearInterval(progressTimer);
  }, [activeSlide]);

  // Camera Flash Trigger
  function triggerShutter() {
    setCameraFlash(true);
    window.setTimeout(() => setCameraFlash(false), 300);
  }

  // Filter gallery items
  const filteredGallery =
    activeFilter === "All Stories"
      ? expandedGallery.slice(0, 8)
      : expandedGallery.filter((item) => item.category === activeFilter).slice(0, 8);

  // Close lightbox on Escape
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

  return (
    <div className="home-page-root animatic-experience" id="home-page">
      {/* Camera Flash Screen Animation */}
      {cameraFlash && <div className="camera-flash-overlay" aria-hidden="true" />}

      {/* 1. CINEMATIC FULLSCREEN HERO WITH INTERACTIVE CAMERA VIEW品质 */}
      <section className="hero cinematic-hero animatic-hero" id="home" aria-label="Raavan Studio'z visual showcases">
        <div className="hero-frame">
          {heroSlides.map((item, index) => (
            <img
              className={`hero-image animatic-slide${index === activeSlide ? " active" : ""}`}
              key={item.image}
              src={item.image}
              alt={item.alt}
              fetchPriority={index === 0 ? "high" : "auto"}
              aria-hidden={index !== activeSlide}
            />
          ))}

          {/* Deep Cinematic Film Vignette */}
          <div className="hero-cinematic-shade" />

          {/* Animatic Camera Viewfinder HUD Overlay */}
          <div className="camera-viewfinder-hud" aria-hidden="true">
            <div className="hud-corner top-left" />
            <div className="hud-corner top-right" />
            <div className="hud-corner bottom-left" />
            <div className="hud-corner bottom-right" />
            
            <div className="hud-header-bar">
              <div className="hud-rec-badge">
                <span className="rec-live-dot" />
                <span>4K CINEMA 60FPS</span>
              </div>
              <div className="hud-iso-info">
                <span>ISO 400</span>
                <span>f/1.4</span>
                <span>1/250s</span>
              </div>
            </div>

            <div className="hud-focus-reticle">
              <div className="reticle-box" />
              <div className="reticle-center-cross" />
            </div>
          </div>

          {/* Hero Copy / Main Branding */}
          <div className="hero-copy cinematic-copy">
            <div className="hero-luxury-badge animatic-badge">
              <span className="live-pulse-dot" />
              <span>KRISHNAGIRI’S PREMIER CINEMATIC ATELIER · ESTD. 2021</span>
            </div>

            <h1 className="hero-headline-cinematic animatic-title">
              Make a count,
              <br />
              <span className="gold-cyan-shimmer">Click the moment.</span>
            </h1>

            <p className="hero-editorial-sub">
              Preserving sacred South Indian wedding rituals with <em>Namma Veetu Kalyanam</em> and tender newborn wonder with <em>Toddlers by Raavan</em>. Founded by <strong>Mr. Gowtham Raj</strong> with 8+ years of dedicated artistry.
            </p>

            {/* Quick Hero Stat Island */}
            <div className="hero-stats-island animatic-stats">
              <div className="hero-stat-pill">
                <span className="stat-num">8+</span>
                <span className="stat-desc">Years Craft</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat-pill">
                <span className="stat-num">1,500+</span>
                <span className="stat-desc">Moments Told</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat-pill">
                <span className="stat-num">2</span>
                <span className="stat-desc">Krishnagiri Studios</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat-pill">
                <span className="stat-num">5.0 ★</span>
                <span className="stat-desc">Client Trust</span>
              </div>
            </div>

            {/* High-End Hero Action CTAs */}
            <div className="hero-actions-luxury">
              <button
                type="button"
                className="btn-luxury-primary animatic-btn"
                onClick={() => {
                  triggerShutter();
                  onNavigate("/gallery");
                }}
              >
                <span>✦ Explore Curated Stories</span>
              </button>

              <a
                href={`https://wa.me/919500306696?text=${encodeURIComponent(
                  "Hi Gowtham Raj! I am looking to inquire about date availability for Raavan Studio’z."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-luxury-whatsapp animatic-btn"
              >
                <svg className="whatsapp-cta-svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.128-.521-1.615-.669-2.716-2.28-2.797-2.39-.081-.11-.671-.892-.671-1.701 0-.809.424-1.206.574-1.37.151-.164.33-.205.441-.205.11 0 .221.002.317.007.101.005.237-.038.371.285.144.344.492 1.201.536 1.288.044.088.073.191.015.306-.058.115-.088.19-.176.294-.088.104-.185.232-.264.312-.089.09-.181.189-.078.366.103.176.458.756.984 1.224.678.604 1.25.79 1.427.878.177.088.279.077.382-.041.103-.118.441-.515.559-.691.118-.176.236-.147.397-.088.162.059 1.026.484 1.203.573.176.088.294.132.338.206.044.074.044.428-.1 1.033z"/>
                </svg>
                <span>Chat with Gowtham Raj</span>
              </a>

              <button
                type="button"
                className="btn-luxury-outline animatic-btn"
                onClick={() => onNavigate("/pricing")}
              >
                <span>View Packages (From ₹2,500)</span>
              </button>
            </div>
          </div>

          {/* Location Caption & Animated Slide Progress Indicators */}
          <div className="hero-caption-cinematic">
            <div className="hero-location-tag">
              <span className="camera-aperture-icon" aria-hidden="true">◎</span>
              <span>{slide.location}</span>
            </div>
            
            <div className="slide-progress-indicators" role="group" aria-label="Slide selectors">
              {heroSlides.map((item, index) => (
                <button
                  type="button"
                  key={item.image}
                  className={`progress-pip-btn${index === activeSlide ? " active" : ""}`}
                  aria-label={`Slide ${index + 1}`}
                  onClick={() => {
                    triggerShutter();
                    setActiveSlide(index);
                  }}
                >
                  <div
                    className="progress-fill"
                    style={{
                      width: index === activeSlide ? `${slideProgress}%` : index < activeSlide ? "100%" : "0%",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Smooth Scroll Prompt */}
          <button
            type="button"
            className="hero-scroll-prompt-stylish"
            onClick={() => {
              const el = document.getElementById("home-film-strip");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            aria-label="Scroll to explore film reel"
          >
            <span>Explore The Visual Reel</span>
            <span className="scroll-arrow-anim" aria-hidden="true">↓</span>
          </button>
        </div>
      </section>

      {/* 2. ANIMATED 35MM CINEMATIC FILM REEL STRIP */}
      <section className="animated-film-reel-section" id="home-film-strip" aria-label="Cinematic Film Reel Strip">
        <div className="film-strip-sprockets top" aria-hidden="true">
          {Array.from({ length: 30 }).map((_, i) => (
            <span key={i} className="sprocket-hole" />
          ))}
        </div>

        <div className="film-reel-marquee-track">
          <div className="film-reel-marquee-content">
            {filmReelPhotos.concat(filmReelPhotos).map((item, idx) => (
              <div
                className="film-reel-frame"
                key={idx}
                onClick={() => setLightboxPhoto({ image: item.img, title: item.title, story: item.tag, location: "Krishnagiri Studios" })}
              >
                <div className="film-frame-inner">
                  <img src={item.img} alt={item.title} loading="lazy" />
                  <div className="film-frame-overlay">
                    <span className="film-tag">{item.tag}</span>
                    <strong className="film-title">{item.title}</strong>
                  </div>
                </div>
                <div className="film-timecode">FRAME #0{idx + 1} · 24FPS</div>
              </div>
            ))}
          </div>
        </div>

        <div className="film-strip-sprockets bottom" aria-hidden="true">
          {Array.from({ length: 30 }).map((_, i) => (
            <span key={i} className="sprocket-hole" />
          ))}
        </div>
      </section>

      {/* 3. INTERACTIVE TABBED VISUAL DISCIPLINES (ANIMATIC SHOWCASE) */}
      <section className="home-section section-disciplines" id="home-disciplines">
        <div className="content-wrapper">
          <div className="section-head-wrap">
            <div className="luxury-section-badge">Mastery Across Every Chapter</div>
            <h2 className="section-title-cinematic">Signature Visual Disciplines</h2>
            <p className="section-head-subtitle">
              Click any discipline below to view our artistic approach, deliverables, and starting investments.
            </p>

            {/* Interactive Discipline Selector Tabs */}
            <div className="discipline-tabs-row" role="tablist">
              {studioServices.map((serv, index) => (
                <button
                  type="button"
                  key={serv.id}
                  className={`discipline-tab-btn${activeTabDiscipline === index ? " active" : ""}`}
                  onClick={() => setActiveTabDiscipline(index)}
                  role="tab"
                  aria-selected={activeTabDiscipline === index}
                >
                  <span className="tab-badge-icon">✦</span>
                  <span>{serv.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Featured Animatic Split Showcase */}
          <div className="discipline-featured-showcase">
            <div className="showcase-visual-frame">
              <img
                src={activeDiscipline.image}
                alt={activeDiscipline.alt}
                key={activeDiscipline.id}
                className="showcase-img-animated"
              />
              <div className="showcase-img-badge">
                <span className="badge-glow-dot" />
                <span>{activeDiscipline.badge}</span>
              </div>
            </div>

            <div className="showcase-info-block">
              <span className="showcase-eyebrow">RAAVAN SIGNATURE CRAFT</span>
              <h3 className="showcase-title">{activeDiscipline.title}</h3>
              <p className="showcase-tagline">“{activeDiscipline.tagline}”</p>
              <p className="showcase-desc">{activeDiscipline.overview}</p>

              <div className="showcase-deliverables">
                <h4>What Is Included:</h4>
                <div className="deliverables-grid">
                  {activeDiscipline.deliverables.map((d) => (
                    <div className="deliverable-item" key={d}>
                      <span className="check-bullet">✓</span>
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="showcase-actions">
                <a
                  href={`https://wa.me/919500306696?text=${encodeURIComponent(
                    `Hi Gowtham Raj! I am interested in inquiring about the "${activeDiscipline.title}" service.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury-whatsapp animatic-btn"
                >
                  <span>Inquire via WhatsApp →</span>
                </a>
                <button
                  type="button"
                  className="btn-luxury-outline animatic-btn"
                  onClick={() => onNavigate("/services")}
                >
                  <span>Explore All Services ↗</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Grid of all 6 Disciplines */}
          <div className="disciplines-grid-luxury" style={{ marginTop: "60px" }}>
            {studioServices.map((serv, idx) => (
              <div
                className={`discipline-card-luxury${activeTabDiscipline === idx ? " highlighted-card" : ""}`}
                key={serv.id}
                onClick={() => {
                  setActiveTabDiscipline(idx);
                  const el = document.getElementById("home-disciplines");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setActiveTabDiscipline(idx);
                }}
              >
                <div className="discipline-img-wrapper">
                  <img src={serv.image} alt={serv.alt} loading="lazy" />
                  <div className="discipline-overlay-gradient" />
                  <span className="discipline-badge-pill">{serv.badge}</span>
                  <div className="discipline-hover-action">
                    <span>View Showcase ✦</span>
                  </div>
                </div>

                <div className="discipline-card-info">
                  <h3 className="discipline-title">{serv.title}</h3>
                  <p className="discipline-tagline">“{serv.tagline}”</p>
                  <p className="discipline-overview">{serv.overview.substring(0, 120)}...</p>

                  <div className="discipline-card-footer">
                    <span className="explore-link-styled">
                      View Details &amp; Highlights →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE CURATED WORKS GALLERY (ANIMATIC FILTER & LIGHTBOX) */}
      <section className="home-section section-gallery-highlight">
        <div className="content-wrapper">
          <div className="section-head-wrap">
            <div className="luxury-section-badge">Moments Frozen in Time</div>
            <h2 className="section-title-cinematic">Selected Stories &amp; Works</h2>
            <p className="section-head-subtitle">
              Every frame is a timeless document of joy, sacred muhurthams, playful laughter, and unscripted emotion.
            </p>

            {/* Interactive Filter Chips */}
            <div className="home-gallery-filter-chips">
              {homeGalleryFilters.map((filt) => (
                <button
                  type="button"
                  key={filt}
                  className={`gallery-filter-chip${activeFilter === filt ? " active" : ""}`}
                  onClick={() => setActiveFilter(filt)}
                >
                  {filt}
                </button>
              ))}
            </div>
          </div>

          {/* Staggered Modern Gallery Grid */}
          <div className="editorial-gallery-grid-stylish">
            {filteredGallery.map((photo) => (
              <article
                key={photo.id}
                className={`gallery-card-stylish ${photo.aspect} animatic-card`}
                onClick={() => setLightboxPhoto(photo)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setLightboxPhoto(photo);
                }}
              >
                <div className="gallery-photo-container">
                  <img src={photo.image} alt={photo.alt} loading="lazy" />
                  <div className="gallery-hover-scrim" />

                  <div className="gallery-card-badge-top">
                    <span className="pill-category">{photo.category}</span>
                  </div>

                  <div className="gallery-card-content-bottom">
                    <span className="gallery-card-lens-icon">◎</span>
                    <h3 className="gallery-card-title">{photo.title}</h3>
                    <p className="gallery-card-story">{photo.story}</p>
                    <div className="gallery-card-loc">
                      <span>📍 {photo.location}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="center-cta-wrap" style={{ marginTop: "50px" }}>
            <button
              type="button"
              className="btn-luxury-outline animatic-btn"
              onClick={() => onNavigate("/gallery")}
            >
              <span>View Complete 16+ Curated Works Gallery ↗</span>
            </button>
          </div>
        </div>
      </section>

      {/* 5. KUTTY CHUTTIES PRICING PACKAGES SHOWCASE */}
      <section className="home-section section-packages-highlight">
        <div className="content-wrapper">
          <div className="section-head-wrap">
            <div className="luxury-section-badge">Transparent Investments</div>
            <h2 className="section-title-cinematic">Kutty Chutties Pricing Packages</h2>
            <p className="section-head-subtitle">
              Newborn and toddler milestone collections starting at ₹2,500/-. Complimentary travel within 20km from Krishnagiri.
            </p>
          </div>

          <div className="pricing-cards-luxury-grid">
            {servicePackages.map((pkg) => {
              const isPopular = pkg.badge === "Most Popular" || pkg.badge === "VIP Masterpiece";
              return (
                <div
                  className={`pricing-luxury-card animatic-card${isPopular ? " popular-card" : ""}`}
                  key={pkg.id}
                >
                  {pkg.badge && (
                    <div className="popular-ribbon-tag">
                      <span>{isPopular ? "⭐ " : ""}{pkg.badge}</span>
                    </div>
                  )}

                  <div className="pricing-card-header">
                    <h3 className="package-name">{pkg.name}</h3>
                    <p className="package-tagline">“{pkg.tagline}”</p>
                  </div>

                  <div className="pricing-card-amount">
                    <span className="price-val">{pkg.price}</span>
                    <span className="price-dur">/ {pkg.duration}</span>
                  </div>

                  <ul className="package-features-list">
                    {pkg.features.map((feat) => (
                      <li key={feat}>
                        <span className="feat-check" aria-hidden="true">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pricing-card-cta">
                    <a
                      href={`https://wa.me/919500306696?text=${encodeURIComponent(
                        `Hi Gowtham Raj, I would like to book the "${pkg.name}" (${pkg.price}) package for our session!`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn-package-book animatic-btn${isPopular ? " primary" : ""}`}
                    >
                      <span>Book on WhatsApp →</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Wedding Custom Quote Strip */}
          <div className="wedding-quote-strip-luxury animatic-card">
            <div className="wedding-strip-info">
              <span className="wedding-strip-badge">💍 Namma Veetu Kalyanam</span>
              <h3>Planning a Wedding, Reception or Sacred Muhurtham?</h3>
              <p>
                Every wedding is uniquely sacred. We craft bespoke wedding quotations including 4K candid cinema, aerial drone visuals, and handcrafted archival photobooks.
              </p>
            </div>
            <a
              href={`https://wa.me/919500306696?text=${encodeURIComponent(
                "Hi Gowtham Raj! I would like to get a custom quotation for our upcoming wedding celebration."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury-primary animatic-btn"
            >
              <span>Get Custom Wedding Quote ↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* 6. THE FOUNDER'S CRAFT & 2 KRISHNAGIRI BRANCHES */}
      <section className="home-section section-founder-studios">
        <div className="content-wrapper">
          <div className="founder-editorial-layout">
            <div className="founder-visual-card animatic-card">
              <div className="founder-frame">
                <img
                  src="/raavan-logo-darkmode.png"
                  alt="Raavan Studio'z official emblem"
                  className="founder-emblem-large"
                />
                <div className="founder-card-badge">
                  <strong>Mr. Gowtham Raj</strong>
                  <small>Founder &amp; Creative Director</small>
                </div>
              </div>
              <div className="founder-stat-bar">
                <div className="fstat">
                  <strong>8+</strong>
                  <span>Years of Visual Craft</span>
                </div>
                <div className="fstat">
                  <strong>2021</strong>
                  <span>Established in Krishnagiri</span>
                </div>
              </div>
            </div>

            <div className="founder-narrative-copy">
              <div className="luxury-section-badge">The Heart Behind The Lens</div>
              <h2 className="section-title-cinematic">“Make a count, Click the moment.”</h2>
              <p className="founder-lead-p">
                With over 8 years of specialized visual mastery, <strong>Mr. Gowtham Raj</strong> founded Raavan Studio’z on 21st January 2021 with a singular conviction: photography should feel like an heirloom, not an artificial pose.
              </p>
              <blockquote className="founder-quote-box">
                “Our major strength is to work creatively according to each client’s special vision. We deliver our outputs in the highest quality, capturing authentic South Indian emotions that outlive lifetimes.”
              </blockquote>

              {/* 2 Physical Branches in Krishnagiri */}
              <div className="studios-branches-card animatic-card">
                <h4>Our 2 Signature Studios in Krishnagiri:</h4>
                <div className="branch-split-grid">
                  <div className="branch-box">
                    <div className="branch-header">
                      <span className="branch-tag">Flagship Experience</span>
                      <strong>The Creative Space</strong>
                    </div>
                    <p>
                      3/470B RCC Moulding Bldg - Ground floor, Gandhi Nagar, Salem-Bangalore Hwy, Krishnagiri (Opp. Gunam Hospital)
                    </p>
                    <a
                      href="https://maps.app.goo.gl/13tnC9ZgRtQ5Ftje8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="branch-map-btn"
                    >
                      📍 Open in Google Maps ↗
                    </a>
                  </div>

                  <div className="branch-box">
                    <div className="branch-header">
                      <span className="branch-tag">Digital Atelier</span>
                      <strong>Work Space</strong>
                    </div>
                    <p>
                      3/59-9, Gandhi Nagar, Near Pillayar Kovil, Krishnagiri (BATA Showroom lane, backside Central Theatre)
                    </p>
                    <a
                      href="https://maps.app.goo.gl/e11f4M4RwXUbF1gcA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="branch-map-btn"
                    >
                      📍 Open in Google Maps ↗
                    </a>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "28px" }}>
                <button
                  type="button"
                  className="btn-luxury-outline animatic-btn"
                  onClick={() => onNavigate("/about")}
                >
                  <span>Read Full Founder Story &amp; Craft →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CLIENT LOVE & REVIEWS */}
      <section className="home-section section-testimonials-luxury">
        <div className="content-wrapper">
          <div className="section-head-wrap">
            <div className="luxury-section-badge">Word of Mouth</div>
            <h2 className="section-title-cinematic">Love Notes From Our Families</h2>
            <p className="section-head-subtitle">
              Cherished testimonials from newlyweds and happy parents across Krishnagiri &amp; Bangalore.
            </p>
          </div>

          <div className="testimonials-cards-grid">
            {testimonials.map((t) => (
              <div className="testimonial-luxury-card animatic-card" key={t.couple}>
                <div className="stars-rating-gold">
                  ★★★★★
                </div>
                <p className="testimonial-quote-text">“{t.quote}”</p>
                <div className="testimonial-author-row">
                  <img src={t.image} alt={t.couple} className="testimonial-author-avatar" />
                  <div className="testimonial-author-info">
                    <strong>{t.couple}</strong>
                    <span>📍 {t.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CINEMATIC BOTTOM VIP CALL TO ACTION */}
      <section className="home-section section-vip-cta">
        <div className="content-wrapper">
          <div className="vip-cta-banner-luxury animatic-card">
            <div className="vip-cta-content">
              <span className="vip-cta-tag">✦ NOW RESERVING DATES FOR 2026 &amp; 2027</span>
              <h2>Let’s immortalize your sacred moments.</h2>
              <p>
                Whether it is your wedding muhurtham, newborn milestone, or a family heirloom photobook, we would love to document your legacy.
              </p>
              <div className="vip-cta-buttons">
                <a
                  href={`https://wa.me/919500306696?text=${encodeURIComponent(
                    "Hi Gowtham Raj! I would love to check date availability and package details with Raavan Studio’z."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury-whatsapp-large animatic-btn"
                >
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.128-.521-1.615-.669-2.716-2.28-2.797-2.39-.081-.11-.671-.892-.671-1.701 0-.809.424-1.206.574-1.37.151-.164.33-.205.441-.205.11 0 .221.002.317.007.101.005.237-.038.371.285.144.344.492 1.201.536 1.288.044.088.073.191.015.306-.058.115-.088.19-.176.294-.088.104-.185.232-.264.312-.089.09-.181.189-.078.366.103.176.458.756.984 1.224.678.604 1.25.79 1.427.878.177.088.279.077.382-.041.103-.118.441-.515.559-.691.118-.176.236-.147.397-.088.162.059 1.026.484 1.203.573.176.088.294.132.338.206.044.074.044.428-.1 1.033z"/>
                  </svg>
                  <span>Direct WhatsApp with Gowtham Raj</span>
                </a>
                <button
                  type="button"
                  className="btn-luxury-primary animatic-btn"
                  onClick={() => onNavigate("/contact")}
                >
                  <span>Send Online Enquiry →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {lightboxPhoto && (
        <div
          className="luxury-lightbox-backdrop"
          onClick={() => setLightboxPhoto(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="luxury-lightbox-dialog animatic-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={() => setLightboxPhoto(null)}
              aria-label="Close photo preview"
            >
              ✕
            </button>
            <img
              src={lightboxPhoto.image}
              alt={lightboxPhoto.alt || lightboxPhoto.title}
              className="lightbox-preview-img"
            />
            <div className="lightbox-photo-meta">
              <span className="lightbox-cat">{lightboxPhoto.category}</span>
              <h3>{lightboxPhoto.title}</h3>
              <p>{lightboxPhoto.story}</p>
              <div className="lightbox-loc">📍 {lightboxPhoto.location}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
