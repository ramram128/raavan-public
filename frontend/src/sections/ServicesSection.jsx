import { studio, studioServices } from "../content.js";

export default function ServicesSection({ onNavigate }) {
  return (
    <section className="home-section section-services" id="services" aria-label="Our Services">
      <div className="section-head-wrap">
        <div className="page-badge" style={{ color: "#00d4ff", borderColor: "rgba(0, 212, 255, 0.4)" }}>
          Our Expertise &amp; Services
        </div>
        <h2>{studio.tagline}</h2>
        <p className="section-head-subtitle">
          Dedicated arms for Weddings, Newborn &amp; Toddler sessions with @toddlers_by_raavan, and custom luxury photobooks with @photobooks_by_raavan.
        </p>
      </div>

      <div className="content-wrapper">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.75rem", marginBottom: "3rem" }}>
          {studioServices.slice(0, 4).map((s) => (
            <div
              key={s.id}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "14px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <img
                  src={s.image}
                  alt={s.title}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <div style={{ padding: "1.5rem" }}>
                  <span style={{ fontSize: "0.75rem", color: "#00d4ff", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>
                    {s.badge}
                  </span>
                  <h3 style={{ fontSize: "1.3rem", margin: "0.4rem 0 0.5rem", color: "#fff" }}>{s.title}</h3>
                  <p style={{ fontSize: "0.88rem", opacity: 0.8, lineHeight: 1.5 }}>
                    {s.overview.slice(0, 140)}...
                  </p>
                </div>
              </div>
              <div style={{ padding: "0 1.5rem 1.5rem" }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ width: "100%", padding: "0.75rem" }}
                  onClick={() => onNavigate("/services")}
                >
                  Explore Discipline →
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onNavigate("/services")}
          >
            View All Services &amp; Disciplines →
          </button>
        </div>
      </div>
    </section>
  );
}
