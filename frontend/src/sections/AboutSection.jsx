import { gearCraft, philosophyPillars, studio, testimonials } from "../content.js";

export default function AboutSection({ onNavigate }) {
  return (
    <section className="home-section section-about" id="about" aria-label="About Raavan Studioz">
      {/* Section Header */}
      <div className="section-head-wrap">
        <div className="page-badge">About Raavan Studio’z</div>
        <h2>
          We document weddings as they felt —
          <br />
          raw, cinematic, and profoundly honest.
        </h2>
        <p className="section-head-subtitle">
          An intimate photography and motion studio based in the UK, preserving
          the unspoken gestures, joyful tears, and wild celebration of your day.
        </p>
      </div>

      {/* Narrative Section */}
      <div className="about-narrative">
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
          <p className="section-eyebrow">The Studio Story</p>
          <h3>Born from an obsession with analogue light and unspoken feelings.</h3>
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
      </div>

      {/* Stats Counter Strip */}
      <div className="stats-strip" aria-label="Studio Milestones">
        <div className="stats-grid">
          {studio.stats.map((stat) => (
            <div className="stat-item" key={stat.label}>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Philosophy Pillars */}
      <div className="content-wrapper">
        <div className="section-intro-block">
          <p className="section-eyebrow">Our Philosophy</p>
          <h3>Three pillars that guide every shutter click</h3>
        </div>

        <div className="philosophy-grid">
          {philosophyPillars.map((pillar) => (
            <article className="philosophy-card" key={pillar.number}>
              <div className="num-badge">{pillar.number} // PRINCIPLE</div>
              <h4>{pillar.title}</h4>
              <div className="card-tagline">{pillar.tagline}</div>
              <p>{pillar.description}</p>
            </article>
          ))}
        </div>
      </div>


      {/* Gear & Craftsmanship */}
      <div className="content-wrapper">
        <div className="gear-section">
          <div className="section-intro-block" style={{ marginBottom: "20px" }}>
            <p className="section-eyebrow">Precision Optics</p>
            <h3>Master tools. Archival preservation.</h3>
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
      </div>

      {/* Testimonials */}
      <div className="content-wrapper">
        <div className="section-intro-block">
          <p className="section-eyebrow">Couple Praise</p>
          <h3>Kind words from the hearts we’ve documented</h3>
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
      </div>
    </section>
  );
}
