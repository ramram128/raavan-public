import { useEffect, useState } from "react";
import { fetchFromApi } from "../api.js";
import { gearCraft, philosophyPillars, studio as fallbackStudio, testimonials } from "../content.js";

export default function AboutPage({ onNavigate }) {
  const [studioData, setStudioData] = useState(fallbackStudio);

  useEffect(() => {
    fetchFromApi("/studio", null).then((data) => {
      if (data && data.name) {
        setStudioData((prev) => ({
          ...prev,
          name: data.name,
          tagline: data.tagline,
          phone: data.phone,
          email: data.email,
          foundedDate: data.founded_date,
          founder: {
            name: data.founder_name || prev.founder.name,
            title: "Founder & Creative Director",
            experience: data.founder_experience || prev.founder.experience,
            bio: data.founder_bio || prev.founder.bio,
          },
          branches: data.branches || prev.branches,
          stats: data.stats || prev.stats,
          serviceRadius: data.service_radius_note || prev.serviceRadius,
        }));
      }
    });
  }, []);

  return (
    <div className="clean-subpage-root about-page-root" id="about-page">
      {/* ============================================================== */}
      {/* 1. HERO HEADER                                                 */}
      {/* ============================================================== */}
      <section className="clean-page-hero">
        <div className="inc-container">
          <div className="clean-hero-badge-wrap">
            <span className="clean-eyebrow-tag">ABOUT RAAVAN STUDIO’Z</span>
          </div>
          <h1 className="clean-page-title">
            Capturing Authentic Emotions &amp; Precious Family Milestones
          </h1>
          <p className="clean-page-subtitle">
            Founded on <strong>21st January 2021</strong> by <strong>Mr. Gowtham Raj</strong> with over 8 years of specialized craftsmanship. We operate two dedicated studios in Krishnagiri, preserving real family legacies across Tamil Nadu, Bangalore, and worldwide.
          </p>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. FOUNDER EDITORIAL NARRATIVE                                 */}
      {/* ============================================================== */}
      <section className="inc-section-wrap about-founder-section">
        <div className="inc-container">
          <div className="inc-two-col-grid align-center">
            {/* Left: Founder Visual Card */}
            <div className="about-founder-visual-col reveal-scale">
              <div className="founder-portrait-card">
                <div className="founder-avatar-wrap">
                  <img
                    src="/raavan-emblem-clean.png"
                    alt="Mr. Gowtham Raj - Founder of Raavan Studio'z"
                    className="founder-portrait-img"
                  />
                </div>
                <div className="founder-info-block">
                  <h3 className="founder-name">Mr. Gowtham Raj</h3>
                  <p className="founder-designation">Founder &amp; Creative Director</p>
                  <span className="founder-exp-pill">8+ Years Industry Mastery</span>
                </div>
                <div className="founder-tagline-quote">
                  “Make a count Click the moment”
                </div>
              </div>
            </div>

            {/* Right: Editorial Narrative Story */}
            <div className="about-founder-story-col reveal-on-scroll">
              <span className="clean-section-tag">OUR ORIGIN &amp; CRAFT</span>
              <h2 className="clean-section-heading">
                Heartfelt Photography Without Forced Choreography
              </h2>
              <p className="clean-body-text">
                Raavan Studio’z was established on <strong>21st January 2021</strong> in Krishnagiri with a simple, enduring conviction: the most meaningful photography comes from authentic, unforced emotions.
              </p>
              <p className="clean-body-text">
                Under the creative direction of <strong>Mr. Gowtham Raj</strong>, our team has documented over 250 grand weddings and more than 1,500 happy families. Whether framing a sacred muhurtham ritual or capturing the gentle laughter of a newborn in our dedicated baby studio, we bring patience, natural lighting, and dedicated care to every commission.
              </p>
              <div className="clean-quote-box">
                “Our major strength is listening closely to each client’s unique family vision. We deliver our work in the absolute highest quality — from masterfully graded photos to archival heirloom albums.”
              </div>
              <div className="founder-wings-row">
                <span className="wing-pill">✓ Wedding Photography &amp; 4K Cinema</span>
                <span className="wing-pill">✓ @toddlers_by_raavan Baby Studio</span>
                <span className="wing-pill">✓ @photobooks_by_raavan Albums</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. THREE BALANCED METRIC STAT CARDS                            */}
      {/* ============================================================== */}
      <section className="inc-section-wrap inc-alt-bg about-stats-section">
        <div className="inc-container">
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
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. TWO DEDICATED STUDIOS IN KRISHNAGIRI                        */}
      {/* ============================================================== */}
      <section className="inc-section-wrap about-studios-section">
        <div className="inc-container">
          <div className="clean-centered-header reveal-on-scroll">
            <span className="clean-section-tag">OUR FACILITIES</span>
            <h2 className="clean-section-heading">Visit Our Studios in Krishnagiri</h2>
            <p className="clean-section-sub">
              Equipped with specialized light stages, 15+ themed baby sets, and digital editing suites.
            </p>
          </div>

          <div className="studios-cards-grid">
            {/* Studio 1 */}
            <div className="clean-studio-card reveal-on-scroll stagger-1">
              <div className="studio-card-top">
                <span className="studio-branch-pill">STUDIO 01 · NEWBORN &amp; TODDLERS</span>
                <h3 className="studio-name">The Creative Space</h3>
                <p className="studio-address">
                  Raavan Studio’z, 3/470B RCC Moulding Building, Ground Floor, Gandhi Nagar, Salem-Bangalore Highways, Krishnagiri - 635001
                </p>
                <div className="studio-landmark">
                  <strong>Landmark:</strong> Opposite Gunam Hospital, Near Challenge Gym
                </div>
              </div>
              <div className="studio-card-actions">
                <a
                  href="https://maps.app.goo.gl/13tnC9ZgRtQ5Ftje8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="studio-map-btn"
                >
                  <span>Open in Google Maps ↗</span>
                </a>
              </div>
            </div>

            {/* Studio 2 */}
            <div className="clean-studio-card reveal-on-scroll stagger-2">
              <div className="studio-card-top">
                <span className="studio-branch-pill">STUDIO 02 · WEDDING CONSULTATIONS</span>
                <h3 className="studio-name">Work Space</h3>
                <p className="studio-address">
                  Raavan Studio’z, 3/59-9, Gandhi Nagar, Near Pillayar Kovil, Krishnagiri - 635001
                </p>
                <div className="studio-landmark">
                  <strong>Landmark:</strong> BATA Showroom lane, backside Central Theatre
                </div>
              </div>
              <div className="studio-card-actions">
                <a
                  href="https://maps.app.goo.gl/e11f4M4RwXUbF1gcA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="studio-map-btn"
                >
                  <span>Open in Google Maps ↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. CORE CREATIVE PHILOSOPHY                                    */}
      {/* ============================================================== */}
      <section className="inc-section-wrap inc-alt-bg about-philosophy-section">
        <div className="inc-container">
          <div className="clean-centered-header reveal-on-scroll">
            <span className="clean-section-tag">WHAT SETS US APART</span>
            <h2 className="clean-section-heading">Our Core Creative Philosophy</h2>
            <p className="clean-section-sub">Three pillars that define every wedding and portrait commission we undertake.</p>
          </div>

          <div className="philosophy-cards-grid">
            {philosophyPillars.map((pillar, idx) => (
              <div className={`clean-pillar-card reveal-on-scroll stagger-${idx + 1}`} key={pillar.number}>
                <div className="pillar-num-badge">{pillar.number}</div>
                <h3 className="pillar-title">{pillar.title}</h3>
                <div className="pillar-tagline-text">{pillar.tagline}</div>
                <p className="pillar-body-text">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. CRAFTSMANSHIP & GEAR STANDARDS                              */}
      {/* ============================================================== */}
      <section className="inc-section-wrap about-gear-section">
        <div className="inc-container">
          <div className="clean-centered-header reveal-on-scroll">
            <span className="clean-section-tag">PROFESSIONAL EXCELLENCE</span>
            <h2 className="clean-section-heading">Camera Craft &amp; Client Standards</h2>
            <p className="clean-section-sub">Premium cinema gear, dual backup redundancy, and sanitized baby environments.</p>
          </div>

          <div className="gear-standards-grid">
            {gearCraft.map((item, idx) => (
              <div className={`clean-gear-card reveal-on-scroll stagger-${(idx % 3) + 1}`} key={item.name}>
                <div className="gear-check-icon">✓</div>
                <div className="gear-card-content">
                  <h4 className="gear-name">{item.name}</h4>
                  <p className="gear-detail">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. CLIENT TESTIMONIALS                                         */}
      {/* ============================================================== */}
      <section className="inc-section-wrap inc-alt-bg">
        <div className="inc-container">
          <div className="clean-centered-header reveal-on-scroll">
            <span className="clean-section-tag">REAL CLIENT WORDS</span>
            <h2 className="clean-section-heading">What Families Say About Us</h2>
          </div>

          <div className="inc-testimonials-grid">
            {testimonials.map((t, idx) => (
              <div className={`inc-testimonial-card reveal-on-scroll stagger-${(idx % 3) + 1}`} key={t.couple}>
                <div className="inc-star-rating">★★★★★</div>
                <p className="inc-testimonial-quote">“{t.quote}”</p>
                <div className="inc-testimonial-author">
                  <img src={t.image} alt={t.couple} className="inc-author-avatar" />
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
      {/* 8. DIRECT BOOKING CTA                                          */}
      {/* ============================================================== */}
      <section className="inc-section-wrap about-cta-section">
        <div className="inc-container">
          <div className="clean-cta-box reveal-scale">
            <h2 className="clean-cta-title">Ready to Document Your Special Milestone?</h2>
            <p className="clean-cta-desc">
              Speak directly with Mr. Gowtham Raj or schedule an album consultation at our Krishnagiri studio.
            </p>
            <div className="clean-cta-buttons-row">
              <a
                href={`https://wa.me/919500306696?text=${encodeURIComponent(
                  "Hi Gowtham Raj! I visited your About page and would like to learn more about booking Raavan Studio’z."
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
                <span>View Contact Details ↗</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
