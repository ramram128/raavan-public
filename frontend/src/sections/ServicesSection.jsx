import { useState } from "react";
import { processSteps, serviceAddons, servicePackages } from "../content.js";

export default function ServicesSection({ onNavigate }) {
  // Estimator state
  const [estimatorHours, setEstimatorHours] = useState(10);
  const [estimatorSecondShooter, setEstimatorSecondShooter] = useState(true);
  const [estimatorCinema, setEstimatorCinema] = useState(false);
  const [estimatorDrone, setEstimatorDrone] = useState(false);
  const [estimatorAlbum, setEstimatorAlbum] = useState(true);

  // Live estimate calculation
  const baseRate = estimatorHours === 5 ? 1850 : estimatorHours === 10 ? 2750 : 3900;
  const secondShooterCost = estimatorSecondShooter ? 450 : 0;
  const cinemaCost = estimatorCinema ? 1400 : 0;
  const droneCost = estimatorDrone ? 350 : 0;
  const albumCost = estimatorAlbum ? 650 : 0;
  const totalEstimate = baseRate + secondShooterCost + cinemaCost + droneCost + albumCost;

  return (
    <section className="home-section section-services" id="services" aria-label="Services and Offerings">
      {/* Section Header */}
      <div className="section-head-wrap">
        <div className="page-badge">Investment & Experiences</div>
        <h2>
          Curated wedding collections
          <br />
          for unforgettable celebrations.
        </h2>
        <p className="section-head-subtitle">
          Transparent, all-inclusive photography and cinema commissions with zero hidden travel fees
          or print markups.
        </p>
      </div>

      {/* Signature Collections Grid */}
      <div className="content-wrapper">
        <div className="section-intro-block">
          <p className="section-eyebrow">Signature Collections</p>
          <h3>Three ways to document your legacy</h3>
        </div>

        <div className="pricing-grid">
          {servicePackages.map((pkg) => (
            <div className={`pricing-card${pkg.badge ? " featured" : ""}`} key={pkg.id}>
              {pkg.badge && <div className="featured-pill">{pkg.badge}</div>}

              <div>
                <div className="pricing-header">
                  <h4>{pkg.name}</h4>
                  <p className="package-tagline">{pkg.tagline}</p>
                </div>

                <div className="pricing-amount-block">
                  <div className="price">{pkg.price}</div>
                  <div className="duration">{pkg.duration}</div>
                </div>

                <ul className="feature-checklist">
                  {pkg.features.map((feat) => (
                    <li key={feat}>
                      <span className="check-icon" aria-hidden="true">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#contact"
                className="package-button"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("#contact");
                }}
              >
                Inquire For This Collection ↗
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Package Estimator */}
      <div className="content-wrapper">
        <div className="estimator-panel">
          <div className="estimator-grid">
            <div className="estimator-options">
              <p className="section-eyebrow">Interactive Estimator</p>
              <h3>Customize your own coverage breakdown</h3>
              <p style={{ color: "var(--muted)", fontSize: "14px", marginBottom: "24px" }}>
                Select your preferred coverage duration and bespoke add-ons below for an immediate,
                transparent estimate:
              </p>

              {/* Hours Selector */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "13px", fontWeight: 600, textTransform: "uppercase", color: "var(--muted)", letterSpacing: "0.05em", display: "block", marginBottom: "10px" }}>
                  Hours of Coverage: <strong style={{ color: "var(--accent)" }}>{estimatorHours} Hours</strong>
                </label>
                <div style={{ display: "flex", gap: "10px" }}>
                  {[5, 10, 14].map((hours) => (
                    <button
                      type="button"
                      key={hours}
                      className={`filter-chip${estimatorHours === hours ? " active" : ""}`}
                      onClick={() => setEstimatorHours(hours)}
                      style={{ flex: 1, textAlign: "center" }}
                    >
                      {hours} Hours {hours === 10 ? "(Standard)" : hours === 14 ? "(Multi-Day)" : "(Elopement)"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <label className="estimator-toggle-item">
                <span>
                  <strong>Second Lead Photographer</strong>
                  <small style={{ display: "block", color: "var(--muted)", fontSize: "12px" }}>
                    Multi-angle ceremony and cocktail hour coverage (+£450)
                  </small>
                </span>
                <input
                  type="checkbox"
                  checked={estimatorSecondShooter}
                  onChange={(e) => setEstimatorSecondShooter(e.target.checked)}
                />
              </label>

              <label className="estimator-toggle-item">
                <span>
                  <strong>4K Cinematic Highlight Film (Video)</strong>
                  <small style={{ display: "block", color: "var(--muted)", fontSize: "12px" }}>
                    Emotive 7-10 min film with licensed score (+£1,400)
                  </small>
                </span>
                <input
                  type="checkbox"
                  checked={estimatorCinema}
                  onChange={(e) => setEstimatorCinema(e.target.checked)}
                />
              </label>

              <label className="estimator-toggle-item">
                <span>
                  <strong>ProRes Drone Aerial Cinematography</strong>
                  <small style={{ display: "block", color: "var(--muted)", fontSize: "12px" }}>
                    Cinematic venue vistas & landscape establishing shots (+£350)
                  </small>
                </span>
                <input
                  type="checkbox"
                  checked={estimatorDrone}
                  onChange={(e) => setEstimatorDrone(e.target.checked)}
                />
              </label>

              <label className="estimator-toggle-item">
                <span>
                  <strong>Handcrafted Italian Fine-Art Album</strong>
                  <small style={{ display: "block", color: "var(--muted)", fontSize: "12px" }}>
                    30-page bespoke lay-flat leather/linen heirloom (+£650)
                  </small>
                </span>
                <input
                  type="checkbox"
                  checked={estimatorAlbum}
                  onChange={(e) => setEstimatorAlbum(e.target.checked)}
                />
              </label>
            </div>

            <div className="estimator-summary-card">
              <div className="est-label">Estimated Investment</div>
              <div className="est-price">£{totalEstimate.toLocaleString()}</div>
              <p style={{ color: "var(--muted)", fontSize: "13px", lineHeight: "1.6", marginBottom: "24px" }}>
                Includes full personal reproduction rights, private high-res cloud gallery, 48-hour sneak peek,
                and UK travel.
              </p>
              <a
                href="#contact"
                className="cta-button"
                style={{ width: "100%", justifyContent: "center" }}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("#contact");
                }}
              >
                Inquire With This Setup ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* A La Carte Add-ons */}
      <div className="content-wrapper">
        <div className="section-intro-block">
          <p className="section-eyebrow">A La Carte Inclusions</p>
          <h3>Bespoke additions for your day</h3>
        </div>

        <div className="addons-grid">
          {serviceAddons.map((addon) => (
            <div className="addon-card" key={addon.title}>
              <div>
                <div className="addon-header">
                  <h4>{addon.title}</h4>
                  <span className="addon-price">{addon.price}</span>
                </div>
                <p>{addon.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Workflow Experience */}
      <div className="content-wrapper">
        <div className="section-intro-block">
          <p className="section-eyebrow">The Experience</p>
          <h3>How we work together, step by step</h3>
        </div>

        <div className="steps" style={{ marginTop: "32px" }}>
          {processSteps.map((step) => (
            <div className="step" key={step.number}>
              <small>{step.number} — {step.moment}</small>
              <p>{step.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
