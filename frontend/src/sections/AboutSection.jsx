import { philosophyPillars, studio } from "../content.js";

export default function AboutSection({ onNavigate }) {
  return (
    <section className="home-section section-about" id="about" aria-label="About Raavan Studioz">
      <div className="section-head-wrap">
        <div className="page-badge" style={{ color: "#00d4ff", borderColor: "rgba(0, 212, 255, 0.4)" }}>
          About Raavan Studio’z
        </div>
        <h2>
          {studio.tagline}
          <br />
          Raw, cinematic, and profoundly honest.
        </h2>
        <p className="section-head-subtitle">
          Founded on 21st January 2021 by Mr. Gowtham Raj (8+ Years Industry Mastery). Preserving every cherished detail of weddings, newborn milestones with @toddlers_by_raavan, and custom luxury photobooks.
        </p>
      </div>

      <div className="about-narrative">
        <div className="narrative-image-frame">
          <img
            src="/kalyanam/page_4_img_1.png"
            alt="Raavan Studio'z signature visual storytelling"
            loading="lazy"
          />
          <div className="photo-caption-tag">
            <span>Raavan Studio’z · Krishnagiri &amp; Worldwide</span>
          </div>
        </div>

        <div className="narrative-copy">
          <p className="section-eyebrow" style={{ color: "#00d4ff" }}>The Studio Story</p>
          <h3>Born to capture life’s genuine unscripted moments.</h3>
          <p>
            Raavan Studio’z operates two dedicated creative spaces in Krishnagiri: <strong>The Creative Space</strong> (Opposite Gunam Hospital, Salem-Bangalore Highways) and our <strong>Work Space</strong> (Near Pillayar Kovil).
          </p>
          <div className="narrative-quote" style={{ borderLeft: "3px solid #00d4ff", paddingLeft: "1rem", color: "#e2b876" }}>
            “Our major strength is to work creatively according to our client’s special needs. We deliver our outputs in the highest quality — photos, handcrafted albums, and cinematic video.”
          </div>
          <p>
            With specialized expertise across weddings, maternity, newborn photography starting at ₹2,500/-, and luxury layflat albums, our team led by Mr. Gowtham Raj crafts timeless memories for families across India.
          </p>
          <div style={{ marginTop: "1.5rem" }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => onNavigate("/about")}
            >
              Read Full Founder Story &amp; View Branches →
            </button>
          </div>
        </div>
      </div>

      <div className="stats-strip" aria-label="Studio Milestones" style={{ marginTop: "3rem" }}>
        <div className="stats-grid">
          {studio.stats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <span className="stat-value" style={{ color: "#00d4ff" }}>{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
