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
            name: data.founder_name,
            title: "Founder & Creative Director",
            experience: data.founder_experience,
            bio: data.founder_bio,
          },
          branches: data.branches || prev.branches,
          stats: data.stats || prev.stats,
          serviceRadius: data.service_radius_note || prev.serviceRadius,
        }));
      }
    });
  }, []);

  return (
    <main className="page-container about-page" id="about-page">
      {/* Hero Header */}
      <section className="page-hero">
        <div className="page-badge">Our Story &amp; Founder</div>
        <h1>
          {studioData.tagline}
          <br />
          Cinematic, unscripted, and profoundly honest.
        </h1>
        <p className="page-subtitle">
          Founded on 21st January 2021 by Mr. Gowtham Raj with over 8 years of specialized visual mastery. Operating two dedicated creative facilities in Krishnagiri and serving clients nationwide.
        </p>
      </section>

      {/* Narrative Section */}
      <section className="about-narrative">
        <div className="narrative-image-frame">
          <img
            src="/kalyanam/page_4_img_1.png"
            alt="Raavan Studio'z wedding and family storytelling"
            loading="lazy"
          />
          <div className="photo-caption-tag">
            <span>Raavan Studio’z · Krishnagiri &amp; Worldwide</span>
          </div>
        </div>

        <div className="narrative-copy">
          <p className="section-eyebrow" style={{ color: "var(--accent, #00d4ff)", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, marginBottom: "12px" }}>
            The Studio Story
          </p>
          <h2>Crafted by Mr. Gowtham Raj (8+ Years of Visual Artistry)</h2>
          <p>
            Raavan Studio’z opened on <strong>21st January 2021</strong> as a premier cinematic photography and creative atelier in Krishnagiri. Under the vision of our founder, <strong>Mr. Gowtham Raj</strong>, who brings over 8 years of professional craftsmanship, we have preserved hundreds of family legacies, grand weddings, and tender newborn milestones.
          </p>
          <div className="narrative-quote" style={{ borderLeft: "3px solid #00d4ff", paddingLeft: "1rem", fontStyle: "italic", color: "#e2b876" }}>
            “Our major strength is to work creatively according to each client’s special vision. We deliver our outputs in the highest quality — photos, handcrafted albums, and raw cinematic video.”
          </div>
          <p>
            We don’t believe in stiff, artificial choreography. Instead, whether documenting a sacred wedding ceremony or the peaceful slumber of a 10-day-old newborn with our dedicated team at <strong>@toddlers_by_raavan</strong>, we craft visual art that feels as real as the heartbeat of the moment.
          </p>
        </div>
      </section>

      {/* Stats Counter Strip */}
      <section className="stats-strip" aria-label="Studio Milestones">
        <div className="stats-grid">
          {(studioData.stats || []).map((stat, idx) => (
            <div key={idx} className="stat-card">
              <span className="stat-value" style={{ color: "#00d4ff" }}>{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Founder & Creative Space */}
      <section className="section" style={{ background: "rgba(0,0,0,0.15)" }}>
        <div className="content-wrapper">
          <div className="section-head-wrap" style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div className="page-badge">Studio Leadership</div>
            <h2>Meet the Founder</h2>
            <p className="section-head-subtitle">The creative force behind Raavan Studio’z</p>
          </div>

          <div
            style={{
              maxWidth: "850px",
              margin: "0 auto",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "16px",
              padding: "2.5rem",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "2rem",
              alignItems: "center",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <img
                src="/raavan-emblem-clean.png"
                alt="Mr. Gowtham Raj - Founder"
                style={{
                  width: "180px",
                  height: "180px",
                  objectFit: "contain",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(56, 189, 248, 0.2) 0%, rgba(8, 16, 28, 0.7) 70%)",
                  padding: "1.2rem",
                  border: "2px solid rgba(56, 189, 248, 0.4)",
                  boxShadow: "0 0 25px rgba(56, 189, 248, 0.25)",
                }}
              />
              <h3 style={{ marginTop: "1rem", fontSize: "1.35rem", color: "#fff" }}>Mr. Gowtham Raj</h3>
              <p style={{ color: "#00d4ff", fontSize: "0.9rem", fontWeight: 600 }}>Founder &amp; Creative Director</p>
              <p style={{ opacity: 0.65, fontSize: "0.82rem" }}>8+ Years Industry Mastery</p>
            </div>

            <div>
              <h4 style={{ fontSize: "1.15rem", marginBottom: "0.75rem", color: "#e2b876" }}>
                “Make a count Click the moment”
              </h4>
              <p style={{ opacity: 0.85, lineHeight: 1.6, fontSize: "0.95rem", marginBottom: "1rem" }}>
                Under Mr. Gowtham Raj’s leadership, Raavan Studio’z has grown into a multi-branch creative institution with dedicated arms for weddings, newborn portraiture (@toddlers_by_raavan), and bespoke luxury photobooks (@photobooks_by_raavan).
              </p>
              <p style={{ opacity: 0.85, lineHeight: 1.6, fontSize: "0.95rem" }}>
                Each assignment is handled with artistic integrity, high dynamic range cameras, and archival color grading tailored to the warmth and grandeur of our traditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2 Studio Branches Section */}
      <section className="section">
        <div className="content-wrapper">
          <div className="section-head-wrap" style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div className="page-badge">Our Facilities</div>
            <h2>Visit Our Creative Spaces in Krishnagiri</h2>
            <p className="section-head-subtitle">Equipped with specialized light stages, props, and digital finishing suites</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
            {(studioData.branches || []).map((b) => (
              <div
                key={b.id || b.name}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(0, 212, 255, 0.2)",
                  borderRadius: "14px",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "#00d4ff",
                      background: "rgba(0, 212, 255, 0.1)",
                      padding: "0.25rem 0.6rem",
                      borderRadius: "4px",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {b.type || b.tag}
                  </span>
                  <h3 style={{ fontSize: "1.4rem", color: "#fff", marginBottom: "0.5rem" }}>{b.name}</h3>
                  <p style={{ fontSize: "0.92rem", opacity: 0.85, lineHeight: 1.5, marginBottom: "0.75rem" }}>
                    {b.address}
                  </p>
                  <p style={{ fontSize: "0.85rem", color: "#e2b876", marginBottom: "1rem" }}>
                    Landmark: {b.landmark}
                  </p>
                </div>

                <a
                  href={b.mapUrl || b.map_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary"
                  style={{ textAlign: "center", display: "inline-block" }}
                >
                  View on Google Maps ↗
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Pillars */}
      <section className="philosophy-section" aria-label="Our Three Pillars">
        <div className="section-head-wrap" style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div className="page-badge">What Sets Us Apart</div>
          <h2>Our Core Creative Philosophy</h2>
        </div>
        <div className="pillars-grid">
          {philosophyPillars.map((pillar) => (
            <article key={pillar.number} className="pillar-card">
              <span className="pillar-num" style={{ color: "#00d4ff" }}>{pillar.number}</span>
              <h3>{pillar.title}</h3>
              <p className="pillar-tagline" style={{ color: "#e2b876" }}>{pillar.tagline}</p>
              <p className="pillar-desc">{pillar.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Ready to Book CTA */}
      <section className="section" style={{ textAlign: "center", paddingBottom: "4rem" }}>
        <div className="content-wrapper">
          <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Let’s Document Your Moment</h2>
          <p style={{ opacity: 0.8, maxWidth: "600px", margin: "0 auto 2rem" }}>
            Speak directly with Mr. Gowtham Raj or schedule a studio visit at The Creative Space in Krishnagiri.
          </p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onNavigate("/contact")}
            style={{ padding: "0.9rem 2rem", fontSize: "1.05rem" }}
          >
            Connect With Our Team →
          </button>
        </div>
      </section>
    </main>
  );
}
