import { useState } from "react";
import { faqs, paymentSchedule, pricingComparison, serviceAddons, servicePackages } from "../content.js";

const currencies = [
  { code: "GBP", symbol: "£", rate: 1.0, label: "GBP (£)" },
  { code: "EUR", symbol: "€", rate: 1.18, label: "EUR (€)" },
  { code: "USD", symbol: "$", rate: 1.30, label: "USD ($)" },
];

export default function PricingPage({ onNavigate }) {
  const [currency, setCurrency] = useState(currencies[0]);
  const [openFaq, setOpenFaq] = useState(null);

  // Estimator state
  const [estimatorHours, setEstimatorHours] = useState(10);
  const [estimatorSecondShooter, setEstimatorSecondShooter] = useState(true);
  const [estimatorCinema, setEstimatorCinema] = useState(false);
  const [estimatorDrone, setEstimatorDrone] = useState(false);
  const [estimatorAlbum, setEstimatorAlbum] = useState(true);

  // Calculate live estimate
  const baseRate = estimatorHours === 5 ? 1850 : estimatorHours === 10 ? 2750 : 3900;
  const secondShooterCost = estimatorSecondShooter ? 450 : 0;
  const cinemaCost = estimatorCinema ? 1400 : 0;
  const droneCost = estimatorDrone ? 350 : 0;
  const albumCost = estimatorAlbum ? 650 : 0;
  const totalGbp = baseRate + secondShooterCost + cinemaCost + droneCost + albumCost;

  // Helper to format price in selected currency
  function formatPrice(gbpString) {
    const rawNumber = parseInt(String(gbpString).replace(/\D/g, ""), 10);
    if (isNaN(rawNumber)) return gbpString;
    const converted = Math.round((rawNumber * currency.rate) / 10) * 10;
    return `${currency.symbol}${converted.toLocaleString()}`;
  }

  return (
    <main className="page-container pricing-page" id="pricing-page">
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-badge">Investment & Packages</div>
        <h1>Simple, honest wedding pricing.</h1>
        <p className="page-subtitle">
          Transparent collections crafted for heartfelt celebrations. Zero travel surcharges across
          the UK, full personal print rights, and triple-redundant archival security included with every commission.
        </p>

        {/* Currency Switcher */}
        <div className="currency-switcher-wrap" style={{ marginTop: "28px" }}>
          <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", marginRight: "12px", fontWeight: 600 }}>
            Currency:
          </span>
          <div className="gallery-view-mode" role="group" aria-label="Select currency">
            {currencies.map((curr) => (
              <button
                key={curr.code}
                type="button"
                className={`view-mode-button${currency.code === curr.code ? " active" : ""}`}
                onClick={() => setCurrency(curr)}
              >
                {curr.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Pricing Cards */}
      <section className="content-wrapper">
        <div className="pricing-grid">
          {servicePackages.map((pkg) => (
            <div className={`pricing-card${pkg.badge ? " featured" : ""}`} key={pkg.id}>
              {pkg.badge && <div className="featured-pill">{pkg.badge}</div>}

              <div>
                <div className="pricing-header">
                  <h3>{pkg.name}</h3>
                  <p className="package-tagline">{pkg.tagline}</p>
                </div>

                <div className="pricing-amount-block">
                  <div className="price">{formatPrice(pkg.price)}</div>
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
                href="/contact"
                className="package-button"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("/contact");
                }}
              >
                Book This Collection ↗
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Bespoke Package Builder / Live Estimator */}
      <section className="content-wrapper">
        <div className="estimator-panel">
          <div className="estimator-grid">
            <div className="estimator-options">
              <p className="section-eyebrow" style={{ color: "var(--accent)", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, marginBottom: "8px" }}>
                Interactive Configurator
              </p>
              <h3>Build your bespoke coverage</h3>
              <p style={{ color: "var(--muted)", fontSize: "14px", marginBottom: "24px" }}>
                Select your preferred coverage duration and tailor add-ons for an immediate, transparent estimate:
              </p>

              {/* Hours Selector */}
              <div style={{ marginBottom: "22px" }}>
                <label style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase", color: "var(--muted)", letterSpacing: "0.06em", display: "block", marginBottom: "10px" }}>
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
                      {hours} Hours {hours === 10 ? "(Standard)" : hours === 14 ? "(Weekend)" : "(Elopement)"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <label className="estimator-toggle-item">
                <span>
                  <strong>Second Lead Photographer</strong>
                  <small style={{ display: "block", color: "var(--muted)", fontSize: "12px" }}>
                    Multi-angle ceremony and cocktail hour coverage (+{formatPrice("£450")})
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
                    Emotive 8-12 min film with licensed score (+{formatPrice("£1400")})
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
                    Cinematic venue vistas & landscape establishing shots (+{formatPrice("£350")})
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
                  <strong>Handmade Italian Leather Heirloom Album</strong>
                  <small style={{ display: "block", color: "var(--muted)", fontSize: "12px" }}>
                    Bespoke 30-page flush-mount album on archival cotton rag (+{formatPrice("£650")})
                  </small>
                </span>
                <input
                  type="checkbox"
                  checked={estimatorAlbum}
                  onChange={(e) => setEstimatorAlbum(e.target.checked)}
                />
              </label>
            </div>

            {/* Total Summary Sticky Card */}
            <div className="estimator-summary">
              <div className="estimator-summary-card">
                <span className="summary-pill">Configured Investment</span>
                <div className="estimated-total">{formatPrice(`£${totalGbp}`)}</div>
                <div className="estimated-sub">
                  Estimated total in {currency.code} ({estimatorHours}h coverage + selected items)
                </div>

                <div className="summary-breakdown">
                  <div className="breakdown-row">
                    <span>Base ({estimatorHours}h Lead Photo)</span>
                    <strong>{formatPrice(`£${baseRate}`)}</strong>
                  </div>
                  {estimatorSecondShooter && (
                    <div className="breakdown-row">
                      <span>Second Photographer</span>
                      <strong>+{formatPrice("£450")}</strong>
                    </div>
                  )}
                  {estimatorCinema && (
                    <div className="breakdown-row">
                      <span>4K Cinema Film</span>
                      <strong>+{formatPrice("£1400")}</strong>
                    </div>
                  )}
                  {estimatorDrone && (
                    <div className="breakdown-row">
                      <span>Drone Aerials</span>
                      <strong>+{formatPrice("£350")}</strong>
                    </div>
                  )}
                  {estimatorAlbum && (
                    <div className="breakdown-row">
                      <span>Italian Leather Album</span>
                      <strong>+{formatPrice("£650")}</strong>
                    </div>
                  )}
                </div>

                <p style={{ fontSize: "12px", color: "var(--muted)", lineHeight: "1.5", margin: "16px 0" }}>
                  All commissions include travel across the UK, 48-hour sneak peek gallery, and full personal print release.
                </p>

                <a
                  href="/contact"
                  className="package-button"
                  style={{ textAlign: "center", textDecoration: "none" }}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("/contact");
                  }}
                >
                  Reserve With This Estimate ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Side-by-Side Comparison Table */}
      <section className="content-wrapper">
        <div className="section-intro-block">
          <p className="section-eyebrow">Deliverables Matrix</p>
          <h2>Compare all package inclusions</h2>
          <p style={{ color: "var(--muted)", fontSize: "15px", marginTop: "10px" }}>
            Review side-by-side details of what is included in each of our signature commissions.
          </p>
        </div>

        <div className="comparison-table-wrap">
          <table className="comparison-table">
            <thead>
              <tr>
                <th scope="col" style={{ width: "34%" }}>Features & Deliverables</th>
                <th scope="col" style={{ width: "22%" }}>The Intimate</th>
                <th scope="col" style={{ width: "22%" }} className="col-highlight">The Signature</th>
                <th scope="col" style={{ width: "22%" }}>The Heirloom</th>
              </tr>
            </thead>
            <tbody>
              {pricingComparison.map((row, idx) => (
                <tr key={row.feature} className={idx % 2 === 0 ? "row-even" : ""}>
                  <td className="feat-title">{row.feature}</td>
                  <td>{row.elopement}</td>
                  <td className="col-highlight">{row.signature}</td>
                  <td>{row.heirloom}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Payment Schedule & Reassurance Milestones */}
      <section className="content-wrapper" style={{ marginTop: "96px" }}>
        <div className="section-intro-block">
          <p className="section-eyebrow">Payment Clarity</p>
          <h2>How payments are structured</h2>
          <p style={{ color: "var(--muted)", fontSize: "15px", marginTop: "10px" }}>
            We break your investment into three simple, predictable milestones so planning remains stress-free.
          </p>
        </div>

        <div className="payment-milestones-grid">
          {paymentSchedule.map((step) => (
            <div className="milestone-card" key={step.step}>
              <div className="milestone-step-pill">{step.step} // STAGE</div>
              <div className="milestone-pct">{step.percent}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Trust Badges Strip */}
        <div className="trust-strip">
          <div className="trust-item">
            <span className="trust-icon" aria-hidden="true">🛡️</span>
            <div>
              <strong>No Hidden Charges</strong>
              <small>Travel anywhere in England, Wales & Scotland is included.</small>
            </div>
          </div>
          <div className="trust-item">
            <span className="trust-icon" aria-hidden="true">📸</span>
            <div>
              <strong>Full Print Rights</strong>
              <small>High-resolution water-mark free images for personal printing.</small>
            </div>
          </div>
          <div className="trust-item">
            <span className="trust-icon" aria-hidden="true">⚡</span>
            <div>
              <strong>48-Hour Sneak Peek</strong>
              <small>Curated collection delivered within 2 days to relive the feeling.</small>
            </div>
          </div>
          <div className="trust-item">
            <span className="trust-icon" aria-hidden="true">💾</span>
            <div>
              <strong>Triple Redundancy</strong>
              <small>Dual card recording + fireproof hardware & cloud backup.</small>
            </div>
          </div>
        </div>
      </section>

      {/* A La Carte Enhancements */}
      <section className="content-wrapper" style={{ marginTop: "96px" }}>
        <div className="section-intro-block">
          <p className="section-eyebrow">A La Carte Options</p>
          <h2>Add bespoke enhancements to any collection</h2>
        </div>

        <div className="addons-grid">
          {serviceAddons.map((addon) => (
            <div className="addon-card" key={addon.title}>
              <div>
                <div className="addon-header">
                  <h4>{addon.title}</h4>
                  <span className="addon-price">{formatPrice(addon.price)}</span>
                </div>
                <p>{addon.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="content-wrapper">
        <div className="section-intro-block">
          <p className="section-eyebrow">Got Questions?</p>
          <h2>Pricing & Booking FAQs</h2>
        </div>

        <div className="faq-wrap">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div className={`faq-item${isOpen ? " open" : ""}`} key={faq.q}>
                <button
                  type="button"
                  className="faq-trigger"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <span className="faq-icon" aria-hidden="true">+</span>
                </button>
                {isOpen && <div className="faq-body">{faq.a}</div>}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="content-wrapper">
        <div className="page-cta-banner">
          <h2>Ready to secure your wedding date?</h2>
          <p>
            Peak dates fill up quickly. Get in touch with your venue and date details, and
            we’ll check our availability immediately.
          </p>
          <a
            href="/contact"
            className="cta-button"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("/contact");
            }}
          >
            Check Calendar & Book Date <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </main>
  );
}
