import { useState } from "react";
import { faqs, processSteps, serviceAddons, studioServices, studioStandards } from "../content.js";

export default function ServicesPage({ onNavigate }) {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="page-container services-page" id="services-page">
      {/* Hero Header */}
      <section className="page-hero">
        <div className="page-badge">Studio Services & Creative Craft</div>
        <h1>
          Artisan Wedding Photography
          <br />
          & Cinematic Motion.
        </h1>
        <p className="page-subtitle">
          Documentary honesty, analogue soul, and refined editorial elegance.
          Explore our complete range of visual storytelling services crafted for heartfelt celebrations.
        </p>

        {/* Quick Service Anchor Navigation */}
        <div className="services-quick-nav" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", marginTop: "32px" }}>
          {studioServices.map((service) => (
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
              {service.title.split("&")[0].trim()}
            </a>
          ))}
        </div>
      </section>

      {/* Featured Services Showcase Breakdown */}
      <section className="content-wrapper">
        <div className="section-intro-block" style={{ textAlign: "center", marginBottom: "48px" }}>
          <p className="section-eyebrow">Visual Disciplines</p>
          <h2>How we document your celebration</h2>
          <p style={{ color: "var(--muted)", fontSize: "16px", maxWidth: "680px", margin: "12px auto 0" }}>
            Every commission combines quiet, unobtrusive documentary observation with bespoke creative direction.
            Explore each specialized service below.
          </p>
        </div>

        <div className="services-showcase-list">
          {studioServices.map((service, index) => (
            <article className="service-showcase-card" id={service.id} key={service.id}>
              <div className="service-card-grid">
                {/* Visual Column */}
                <div className="service-image-col">
                  <div className="service-image-frame">
                    <img src={service.image} alt={service.alt} loading="lazy" />
                    <div className="service-card-badge">{service.badge}</div>
                  </div>
                  <div className="service-highlight-pill">
                    <span aria-hidden="true">✦</span>
                    <span>{service.highlight}</span>
                  </div>
                </div>

                {/* Information Column */}
                <div className="service-info-col">
                  <div className="service-num-tag">DISCIPLINE 0{index + 1}</div>
                  <h3>{service.title}</h3>
                  <div className="service-subtitle">{service.subtitle}</div>
                  <p className="service-tagline">“{service.tagline}”</p>
                  <p className="service-overview">{service.overview}</p>

                  <div className="service-deliverables-block">
                    <div className="deliverables-heading">Deliverables & Features:</div>
                    <ul className="service-deliverables-list">
                      {service.deliverables.map((item) => (
                        <li key={item}>
                          <span className="check-bullet" aria-hidden="true">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {service.idealFor && (
                    <div className="service-ideal-for">
                      <strong>Best suited for:</strong> {service.idealFor}
                    </div>
                  )}

                  <div className="service-action-row">
                    <a
                      href="/contact"
                      className="package-button"
                      style={{ display: "inline-block", width: "auto", padding: "12px 28px", textDecoration: "none" }}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate("/contact");
                      }}
                    >
                      Inquire for this Service ↗
                    </a>
                    <a
                      href="/pricing"
                      className="text-link-button"
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate("/pricing");
                      }}
                    >
                      View Pricing Guide →
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* The 4-Step Creative Workflow */}
      <section className="content-wrapper" style={{ marginTop: "110px" }}>
        <div className="section-intro-block" style={{ textAlign: "center", marginBottom: "56px" }}>
          <p className="section-eyebrow">Our Philosophy in Action</p>
          <h2>The Four-Stage Creative Experience</h2>
          <p style={{ color: "var(--muted)", fontSize: "16px", maxWidth: "640px", margin: "12px auto 0" }}>
            From our very first conversation to holding your handcrafted leather album,
            here is how we ensure an effortless, stress-free journey.
          </p>
        </div>

        <div className="process-cards-grid">
          {processSteps.map((step) => (
            <div className="process-card" key={step.number}>
              <div className="process-card-num">{step.number}</div>
              <h4>{step.moment}</h4>
              <p>{step.detail}</p>
              <div className="process-card-hint">
                {step.number === "01" && "Initial coffee chat or video call to align on your vision and aesthetics."}
                {step.number === "02" && "Collaborative timeline drafting, natural lighting schedule & venue scouting."}
                {step.number === "03" && "Gentle, non-intrusive documentation letting you stay 100% present."}
                {step.number === "04" && "Hand-graded master photos, 48h sneak peek & bespoke Italian albums."}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Studio Standards & Guarantees Strip */}
      <section className="content-wrapper" style={{ marginTop: "100px" }}>
        <div className="standards-banner">
          <div className="section-intro-block" style={{ marginBottom: "36px" }}>
            <p className="section-eyebrow" style={{ color: "var(--accent)" }}>The Raavan Standard</p>
            <h2>Uncompromising Quality & Client Peace of Mind</h2>
            <p style={{ color: "var(--muted)", fontSize: "15px", maxWidth: "600px", margin: "10px auto 0" }}>
              Every commission we undertake is backed by our strict archival and service benchmarks:
            </p>
          </div>

          <div className="standards-grid">
            {studioStandards.map((std) => (
              <div className="standard-item" key={std.title}>
                <div className="standard-icon" aria-hidden="true">{std.icon}</div>
                <h4>{std.title}</h4>
                <p>{std.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bespoke A La Carte Add-ons */}
      <section className="content-wrapper" style={{ marginTop: "110px" }}>
        <div className="section-intro-block" style={{ textAlign: "center", marginBottom: "48px" }}>
          <p className="section-eyebrow">Bespoke Enhancements</p>
          <h2>A La Carte Custom Add-ons</h2>
          <p style={{ color: "var(--muted)", fontSize: "16px", maxWidth: "640px", margin: "12px auto 0" }}>
            Tailor any of our services with curated archival pieces and special commissions.
          </p>
        </div>

        <div className="addons-grid">
          {serviceAddons.map((addon) => (
            <div className="addon-card" key={addon.title}>
              <div>
                <div className="addon-header">
                  <h4>{addon.title}</h4>
                  <span className="addon-price">{addon.price}</span>
                </div>
                <p className="addon-detail">{addon.detail}</p>
              </div>
              <div style={{ marginTop: "20px", paddingTop: "14px", borderTop: "1px solid var(--line)" }}>
                <span style={{ fontSize: "12px", color: "var(--accent)", fontWeight: 600 }}>
                  Available across all commissions
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Direct Transition to Pricing Notice Banner */}
      <section className="content-wrapper" style={{ marginTop: "60px" }}>
        <div className="page-cta-banner pricing-redirect-banner">
          <div className="badge-pill" style={{ display: "inline-block", marginBottom: "16px", background: "rgba(36, 125, 150, 0.2)", color: "var(--accent)", padding: "4px 14px", borderRadius: "99px", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Investment Guide
          </div>
          <h2>Looking for complete packages & transparent rates?</h2>
          <p style={{ maxWidth: "620px", margin: "0 auto 28px" }}>
            We believe in honest, straightforward pricing with zero hidden surcharges.
            Explore our curated collections, package comparison matrix, and currency converter.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="/pricing"
              className="cta-button"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("/pricing");
              }}
            >
              Explore Pricing & Packages <span aria-hidden="true">→</span>
            </a>
            <a
              href="/contact"
              className="cta-button secondary"
              style={{ background: "transparent", border: "1px solid var(--line)", color: "var(--ink)" }}
              onClick={(e) => {
                e.preventDefault();
                onNavigate("/contact");
              }}
            >
              Check Date Availability ↗
            </a>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="content-wrapper" style={{ marginTop: "100px" }}>
        <div className="section-intro-block" style={{ textAlign: "center", marginBottom: "48px" }}>
          <p className="section-eyebrow">Common Inquiries</p>
          <h2>Frequently Asked Questions</h2>
          <p style={{ color: "var(--muted)", fontSize: "15px", marginTop: "8px" }}>
            Everything you need to know about commissioning Raavan Studio’z.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div className={`faq-item${isOpen ? " open" : ""}`} key={faq.q}>
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <span className="faq-icon" aria-hidden="true">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && (
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
