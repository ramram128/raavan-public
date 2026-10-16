import { useEffect, useState } from "react";
import {
  expandedGallery,
  heroSlides,
  servicePackages,
  studio,
  studioServices,
  testimonials,
} from "../content.js";

export default function HomePage({ onNavigate }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = heroSlides[activeSlide];

  // Auto-advance hero slides
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="home-page-root" id="home-page">
      {/* 1. Hero Section */}
      <section className="hero" id="home" aria-label="Wedding photography highlights">
        <div className="hero-frame">
          {heroSlides.map((item, index) => (
            <img
              className={`hero-image${index === activeSlide ? " active" : ""}`}
              key={item.image}
              src={item.image}
              alt={item.alt}
              fetchpriority={index === 0 ? "high" : "auto"}
              aria-hidden={index !== activeSlide}
            />
          ))}
          <div className="hero-shade" />

          <div className="hero-copy">
            <p className="eyebrow">Weddings, remembered as they felt</p>
            <h1>
              Make room
              <br />
              for the moment.
            </h1>
            <div className="hero-actions" style={{ display: "flex", gap: "16px", marginTop: "28px" }}>
              <button
                type="button"
                className="hero-cta-btn"
                onClick={() => onNavigate("/gallery")}
              >
                View Stories ↗
              </button>
              <button
                type="button"
                className="hero-cta-btn secondary"
                onClick={() => onNavigate("/contact")}
              >
                Inquire Dates
              </button>
            </div>
          </div>

          <div className="hero-caption">
            <span>{slide.location}</span>
            <div className="slide-controls" role="group" aria-label="Featured photographs">
              {heroSlides.map((item, index) => (
                <button
                  type="button"
                  key={item.image}
                  aria-label={`Show photograph ${index + 1}`}
                  aria-current={index === activeSlide}
                  onClick={() => setActiveSlide(index)}
                />
              ))}
            </div>
          </div>

          {/* Explore Prompt Button */}
          <button
            type="button"
            className="hero-scroll-prompt"
            onClick={() => {
              const el = document.getElementById("home-intro");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            aria-label="Scroll to explore about section"
          >
            <span>Explore the Studio</span>
            <span className="scroll-arrow" aria-hidden="true">↓</span>
          </button>
        </div>
      </section>

      {/* 2. Studio Introduction Teaser */}
      <section className="home-teaser-section" id="home-intro">
        <div className="content-wrapper">
          <div className="home-teaser-grid">
            <div className="teaser-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=85"
                alt="Raavan Studio photographer documenting natural wedding celebration"
                loading="lazy"
              />
              <div className="teaser-image-badge">The Raavan Ethos</div>
            </div>

            <div className="teaser-copy-wrap">
              <div className="page-badge">Our Story & Philosophy</div>
              <h2>We document weddings as they felt — raw, cinematic, and profoundly honest.</h2>
              <p>
                Raavan Studio’z was born from an obsession with analogue light and unchoreographed feeling.
                We believe weddings are sacred, wild family gatherings, not editorial stage sets.
                We don’t carry bulky flashes that blind your guests, and we won’t turn your day into
                an endless series of staged smiles.
              </p>
              <div className="narrative-quote" style={{ margin: "24px 0" }}>
                “True romance doesn’t ask you to pose or freeze in place. It breathes in
                the quiet glances when you think no one is watching.”
              </div>
              <button
                type="button"
                className="cta-button"
                onClick={() => onNavigate("/about")}
                style={{ marginTop: "12px" }}
              >
                Read Our Story & Craft <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="stats-strip" style={{ marginTop: "64px" }} aria-label="Studio Milestones">
            <div className="stats-grid">
              {studio.stats.map((stat) => (
                <div className="stat-item" key={stat.label}>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Services Teaser */}
      <section className="home-teaser-section" style={{ background: "var(--paper-deep)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div className="content-wrapper">
          <div className="section-head-wrap" style={{ textAlign: "center" }}>
            <div className="page-badge">What We Offer</div>
            <h2>Curated Visual Disciplines</h2>
            <p className="section-head-subtitle">
              From full-day documentary stills and analogue 35mm film to emotive 4K motion pictures and handcrafted Italian albums.
            </p>
          </div>

          <div className="home-services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "28px", marginTop: "44px" }}>
            {studioServices.slice(0, 3).map((serv) => (
              <div className="home-service-card" key={serv.id}>
                <div className="home-service-img-wrap">
                  <img src={serv.image} alt={serv.alt} loading="lazy" />
                  <span className="card-badge">{serv.badge}</span>
                </div>
                <div className="home-service-card-body">
                  <h3>{serv.title}</h3>
                  <p className="tagline">“{serv.tagline}”</p>
                  <p className="desc">{serv.overview.substring(0, 140)}...</p>
                  <ul className="mini-features">
                    {serv.deliverables.slice(0, 3).map((d) => (
                      <li key={d}>✓ {d}</li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="service-learn-more"
                    onClick={() => onNavigate("/services")}
                  >
                    Learn More About This Service →
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <button
              type="button"
              className="cta-button"
              onClick={() => onNavigate("/services")}
            >
              Explore All 6 Studio Services <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4. Curated Stories Gallery Teaser */}
      <section className="home-teaser-section">
        <div className="content-wrapper">
          <div className="section-head-wrap" style={{ textAlign: "center" }}>
            <div className="page-badge">Visual Portfolio</div>
            <h2>Selected Stories & Works</h2>
            <p className="section-head-subtitle">
              Moments from countryside estates, sun-drenched European terraces, and intimate city registries.
            </p>
          </div>

          <div className="editorial-gallery-grid" style={{ marginTop: "40px" }}>
            {expandedGallery.slice(0, 6).map((photo) => (
              <article
                key={photo.id}
                className={`gallery-card ${photo.aspect}`}
                onClick={() => onNavigate("/gallery")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onNavigate("/gallery");
                }}
              >
                <img src={photo.image} alt={photo.alt} loading="lazy" />
                <div className="gallery-card-overlay">
                  <div className="gallery-card-tags">
                    <span className="gallery-tag">{photo.category}</span>
                    <span className="gallery-tag">{photo.tag}</span>
                  </div>
                  <h3>{photo.title}</h3>
                  <p>{photo.story}</p>
                  <div className="gallery-card-location">
                    <span aria-hidden="true">📍</span>
                    <span>{photo.location} · {photo.year}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <button
              type="button"
              className="cta-button"
              onClick={() => onNavigate("/gallery")}
            >
              View Complete Stories Gallery (16+ Works) <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* 5. Investment & Pricing Teaser */}
      <section className="home-teaser-section" style={{ background: "var(--paper-deep)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div className="content-wrapper">
          <div className="section-head-wrap" style={{ textAlign: "center" }}>
            <div className="page-badge">Investment</div>
            <h2>Simple, Honest Wedding Pricing</h2>
            <p className="section-head-subtitle">
              Transparent collections crafted for heartfelt celebrations. Zero travel surcharges across the UK and triple archival security.
            </p>
          </div>

          <div className="pricing-grid" style={{ marginTop: "44px", marginBottom: "40px" }}>
            {servicePackages.map((pkg) => (
              <div className={`pricing-card${pkg.badge ? " featured" : ""}`} key={pkg.id}>
                {pkg.badge && <div className="featured-pill">{pkg.badge}</div>}
                <div>
                  <div className="pricing-header">
                    <h3>{pkg.name}</h3>
                    <p className="package-tagline">{pkg.tagline}</p>
                  </div>
                  <div className="pricing-amount-block">
                    <div className="price">{pkg.price}</div>
                    <div className="duration">{pkg.duration}</div>
                  </div>
                  <ul className="feature-checklist">
                    {pkg.features.slice(0, 4).map((feat) => (
                      <li key={feat}>
                        <span className="check-icon" aria-hidden="true">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  type="button"
                  className="package-button"
                  onClick={() => onNavigate("/pricing")}
                >
                  View Package Details ↗
                </button>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <button
              type="button"
              className="cta-button"
              onClick={() => onNavigate("/pricing")}
            >
              Compare All Inclusions & Currency Rates <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* 6. Testimonials Praise Strip */}
      <section className="home-teaser-section">
        <div className="content-wrapper">
          <div className="section-head-wrap" style={{ textAlign: "center" }}>
            <div className="page-badge">Kind Words</div>
            <h2>Love letters from our couples</h2>
          </div>

          <div className="testimonials-grid" style={{ marginTop: "36px" }}>
            {testimonials.map((t) => (
              <blockquote className="testimonial-card" key={t.couple}>
                <p className="testimonial-quote">“{t.quote}”</p>
                <footer className="testimonial-author">
                  <img src={t.image} alt={t.couple} />
                  <div className="author-meta">
                    <strong>{t.couple}</strong>
                    <span>{t.location}</span>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Bottom Call to Action Banner */}
      <section className="content-wrapper" style={{ marginBottom: "80px" }}>
        <div className="page-cta-banner">
          <h2>Every great love story deserves an honest telling.</h2>
          <p>
            Now reserving dates for 2026 & 2027 celebrations across the UK, Europe, and worldwide.
            Let’s start something timeless together.
          </p>
          <button
            type="button"
            className="cta-button"
            onClick={() => onNavigate("/contact")}
          >
            Check Availability For Your Date <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>
    </div>
  );
}
