import { useState } from "react";
import { faqs, paymentSchedule, pricingComparison, serviceAddons, servicePackages } from "../content.js";

const currencies = [
  { code: "GBP", symbol: "£", rate: 1.0, label: "GBP (£)" },
  { code: "EUR", symbol: "€", rate: 1.18, label: "EUR (€)" },
  { code: "USD", symbol: "$", rate: 1.30, label: "USD ($)" },
];

export default function PricingSection({ onNavigate }) {
  const [currency, setCurrency] = useState(currencies[0]);
  const [openFaq, setOpenFaq] = useState(null);

  // Helper to format price in selected currency
  function formatPrice(gbpString) {
    const rawNumber = parseInt(gbpString.replace(/\D/g, ""), 10);
    if (isNaN(rawNumber)) return gbpString;
    const converted = Math.round((rawNumber * currency.rate) / 10) * 10;
    return `${currency.symbol}${converted.toLocaleString()}`;
  }

  return (
    <section className="home-section section-pricing" id="pricing" aria-label="Wedding Pricing and Packages">
      {/* Section Header */}
      <div className="section-head-wrap">
        <div className="page-badge">Transparent Investment</div>
        <h2>
          Simple, honest wedding pricing.
        </h2>
        <p className="section-head-subtitle">
          Transparent collections crafted for heartfelt celebrations. Zero travel surcharges across
          the UK, full personal print rights, and triple-redundant archival security included.
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
      </div>

      {/* Main Pricing Cards */}
      <div className="content-wrapper">
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
                href="#contact"
                className="package-button"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("#contact");
                }}
              >
                Book This Collection ↗
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Side-by-Side Comparison Table */}
      <div className="content-wrapper">
        <div className="section-intro-block">
          <p className="section-eyebrow">Deliverables Matrix</p>
          <h3>Compare all package inclusions</h3>
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
      </div>

      {/* Payment Schedule & Reassurance Milestones */}
      <div className="content-wrapper" style={{ marginTop: "72px" }}>
        <div className="section-intro-block">
          <p className="section-eyebrow">Payment Clarity</p>
          <h3>How payments are structured</h3>
          <p style={{ color: "var(--muted)", fontSize: "15px", marginTop: "10px" }}>
            We break your investment into three simple, predictable milestones so planning remains stress-free.
          </p>
        </div>

        <div className="payment-milestones-grid">
          {paymentSchedule.map((step) => (
            <div className="milestone-card" key={step.step}>
              <div className="milestone-step-pill">{step.step} // STAGE</div>
              <div className="milestone-pct">{step.percent}</div>
              <h4>{step.title}</h4>
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
      </div>

      {/* Frequently Asked Questions */}
      <div className="content-wrapper">
        <div className="section-intro-block">
          <p className="section-eyebrow">Clear Answers</p>
          <h3>Frequently Asked Questions</h3>
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
      </div>
    </section>
  );
}
