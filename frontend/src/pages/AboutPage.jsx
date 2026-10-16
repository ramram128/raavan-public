import { gearCraft, philosophyPillars, studio, testimonials } from "../content.js";

export default function AboutPage({ onNavigate }) {
  return (
    <main className="page-container about-page" id="about-page">
      {/* Hero Header */}
      <section className="page-hero">
        <div className="page-badge">Our Story & Philosophy</div>
        <h1>
          We document weddings as they felt —
          <br />
          raw, cinematic, and profoundly honest.
        </h1>
        <p className="page-subtitle">
          An intimate photography and motion studio based in the UK, preserving
          the unspoken gestures, joyful tears, and wild celebration of your day.
        </p>
      </section>

      {/* Narrative Section */}
      <section className="about-narrative">
        <div className="narrative-image-frame">
          <img
            src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=85"
            alt="Raavan Studio photographer in natural light capturing a wedding celebration"
            loading="lazy"
          />
          <div className="photo-caption-tag">
            <span>Sussex Countryside · Late Summer</span>
          </div>
        </div>

        <div className="narrative-copy">
          <p className="section-eyebrow" style={{ color: "var(--accent)", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, marginBottom: "12px" }}>
            The Studio Story
          </p>
          <h2>Born from an obsession with analogue light and unspoken feelings.</h2>
          <p>
            Raavan Studio’z began over a decade ago with a vintage 35mm film camera
            and a simple conviction: weddings are not choreographed productions or
            editorial stage-sets. They are messy, holy, hilarious, and fleeting family
            gatherings.
          </p>
          <div className="narrative-quote">
            “True romance doesn’t ask you to pose or freeze in place. It breathes in
            the quiet glances when you think no one is watching.”
          </div>
          <p>
            We don’t carry bulky flashes that blind your guests, and we won’t turn your
            day into an endless series of staged smiles. Instead, we weave quietly
            through your celebration, capturing everything from quiet morning anticipation
            to shoes being kicked off on the midnight dance floor.
          </p>
        </div>
      </section>

      {/* Stats Counter Strip */}
      <section className="stats-strip" aria-label="Studio Milestones">
        <div className="stats-grid">
          {studio.stats.map((stat) => (
            <div className="stat-item" key={stat.label}>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy Pillars */}
      <section className="content-wrapper">
        <div className="section-intro-block">
          <p className="section-eyebrow">How We See The World</p>
          <h2>Three pillars that guide every shutter click</h2>
        </div>

        <div className="philosophy-grid">
          {philosophyPillars.map((pillar) => (
            <article className="philosophy-card" key={pillar.number}>
              <div className="num-badge">{pillar.number} // PRINCIPLE</div>
              <h3>{pillar.title}</h3>
              <div className="card-tagline">{pillar.tagline}</div>
              <p>{pillar.description}</p>
            </article>
          ))}
        </div>
      </section>


      {/* Tools & Archival Craft */}
      <section className="content-wrapper">
        <div className="gear-section">
          <div className="section-intro-block" style={{ marginBottom: "20px" }}>
            <p className="section-eyebrow">Craft & Equipment</p>
            <h2>Precision optics. Archival preservation.</h2>
            <p style={{ color: "var(--muted)", fontSize: "15px", maxWidth: "600px", margin: "12px auto 0" }}>
              We invest in museum-grade tools and triple-redundant archival workflows so you never
              have to worry about a single lost second.
            </p>
          </div>

          <div className="gear-grid">
            {gearCraft.map((gear) => (
              <div className="gear-card" key={gear.name}>
                <h4>{gear.name}</h4>
                <p>{gear.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Couple Praise & Testimonials */}
      <section className="content-wrapper">
        <div className="section-intro-block">
          <p className="section-eyebrow">Real Words From Real Couples</p>
          <h2>Kind words from the hearts we’ve documented</h2>
        </div>

        <div className="testimonials-grid">
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
      </section>

      {/* Bottom CTA Banner */}
      <section className="content-wrapper">
        <div className="page-cta-banner">
          <h2>Ready to preserve your wedding story?</h2>
          <p>
            We take on an exclusive number of celebrations each year to ensure
            uncompromising artistry. Check availability for your date.
          </p>
          <a
            href="/contact"
            className="cta-button"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("/contact");
            }}
          >
            Check Your Date Availability <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </main>
  );
}
