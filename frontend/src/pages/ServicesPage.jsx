import { useEffect, useState } from "react";
import { fetchFromApi } from "../api.js";
import { faqs, processSteps, studio, studioServices as fallbackServices } from "../content.js";

export default function ServicesPage({ onNavigate }) {
  const [services, setServices] = useState(fallbackServices);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    fetchFromApi("/services", null).then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        const formatted = data.map((s) => ({
          id: s.slug,
          title: s.title,
          subtitle: s.tagline || s.category,
          tagline: s.tagline,
          badge: s.starting_price || s.category,
          image: s.image_url || "/kalyanam/page_4_img_1.png",
          alt: s.title,
          overview: s.description,
          deliverables: Array.isArray(s.deliverables) ? s.deliverables : (s.deliverables ? [s.deliverables] : []),
          highlight: s.starting_price ? `Starts at ${s.starting_price}` : "Bespoke Direction",
          idealFor: "Clients seeking high-quality unscripted visual art",
        }));
        setServices(formatted);
      }
    });
  }, []);

  return (
    <main className="page-container services-page" id="services-page">
      {/* Hero Header */}
      <section className="page-hero">
        <div className="page-badge">Our Expertise &amp; Services</div>
        <h1>
          Our Complete Visual Disciplines
        </h1>
        <p className="page-subtitle">
          {studio.tagline} · Specialized wings for weddings, newborn portraiture with @toddlers_by_raavan, and heirloom photobooks with @photobooks_by_raavan.
        </p>

        {/* Quick Service Anchor Navigation */}
        <div className="services-quick-nav" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", marginTop: "32px" }}>
          {services.map((service) => (
            <a
              key={service.id}
              href={`#${service.id}`}
              className="filter-chip"
              style={{ textDecoration: "none" }}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(service.id);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              {service.title}
            </a>
          ))}
        </div>
      </section>

      {/* Featured Services Showcase Breakdown */}
      <section className="content-wrapper">
        <div className="section-intro-block" style={{ textAlign: "center", marginBottom: "48px" }}>
          <p className="section-eyebrow" style={{ color: "#00d4ff" }}>Visual Disciplines</p>
          <h2>How we capture your milestone</h2>
          <p style={{ color: "var(--muted)", fontSize: "16px", maxWidth: "680px", margin: "12px auto 0" }}>
            Every commission combines quiet, unscripted documentary storytelling with bespoke artistic direction.
          </p>
        </div>

        <div className="services-showcase-list" style={{ display: "grid", gap: "3.5rem" }}>
          {services.map((service, index) => {
            const isReversed = index % 2 === 1;
            return (
              <article
                key={service.id}
                id={service.id}
                className={`service-showcase-card ${isReversed ? "reversed" : ""}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "2.5rem",
                  alignItems: "center",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "16px",
                  padding: "2rem",
                }}
              >
                <div className="service-image-holder" style={{ borderRadius: "12px", overflow: "hidden" }}>
                  <img
                    src={service.image}
                    alt={service.alt}
                    loading="lazy"
                    style={{ width: "100%", height: "350px", objectFit: "cover", display: "block" }}
                  />
                </div>

                <div className="service-copy-holder">
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span
                      style={{
                        background: "rgba(0, 212, 255, 0.1)",
                        color: "#00d4ff",
                        padding: "0.2rem 0.6rem",
                        borderRadius: "20px",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                      }}
                    >
                      {service.badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.75rem", marginBottom: "0.25rem", color: "#fff" }}>{service.title}</h3>
                  <p style={{ color: "#e2b876", fontSize: "0.95rem", fontWeight: 500, marginBottom: "1rem" }}>
                    {service.subtitle}
                  </p>
                  <p style={{ opacity: 0.85, lineHeight: 1.6, fontSize: "0.95rem", marginBottom: "1.5rem" }}>
                    {service.overview}
                  </p>

                  <div style={{ marginBottom: "1.5rem" }}>
                    <h4 style={{ fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.08em", opacity: 0.7, marginBottom: "0.5rem" }}>
                      Key Deliverables &amp; Craft:
                    </h4>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.4rem", fontSize: "0.88rem" }}>
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <span style={{ color: "#00d4ff" }}>✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => onNavigate("/contact")}
                    >
                      Book This Service
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => onNavigate("/pricing")}
                    >
                      View Packages
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 4-Step Process Section */}
      <section className="section" style={{ background: "rgba(0,0,0,0.2)", marginTop: "4rem" }}>
        <div className="content-wrapper">
          <div className="section-head-wrap" style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div className="page-badge">How It Works</div>
            <h2>From First Hello to Cherished Heirloom</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
            {processSteps.map((step) => (
              <div
                key={step.number}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  padding: "1.75rem",
                  textAlign: "center",
                }}
              >
                <span style={{ fontSize: "2rem", fontWeight: 800, color: "#00d4ff", display: "block", marginBottom: "0.5rem" }}>
                  {step.number}
                </span>
                <h3 style={{ fontSize: "1.15rem", marginBottom: "0.5rem", color: "#fff" }}>{step.moment}</h3>
                <p style={{ fontSize: "0.88rem", opacity: 0.8, lineHeight: 1.5 }}>{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
