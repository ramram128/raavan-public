import { useState } from "react";
import { studio } from "../content.js";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") || "";
    const partnerName = formData.get("partnerName") || "";
    const email = formData.get("email") || "";
    const phone = formData.get("phone") || "Not provided";
    const date = formData.get("date") || "Date undecided";
    const location = formData.get("location") || "Venue undecided";
    const budget = formData.get("budget") || "Not specified";
    const guests = formData.get("guests") || "Not specified";
    const message = formData.get("message") || "No additional notes";

    // Gather checked services
    const services = [];
    if (formData.get("service_photo")) services.push("Photography");
    if (formData.get("service_cinema")) services.push("Cinematography (Video)");
    if (formData.get("service_drone")) services.push("Drone Aerials");
    if (formData.get("service_album")) services.push("Fine-Art Album");
    const serviceList = services.length > 0 ? services.join(", ") : "Full Photography";

    const subject = encodeURIComponent(`Wedding Commission Inquiry: ${name} & ${partnerName}`);
    const body = encodeURIComponent(
      `Hello ${studio.name},\n\nWe would love to discuss photography & cinema for our wedding!\n\n` +
      `Couple: ${name} & ${partnerName}\n` +
      `Email: ${email}\n` +
      `Phone/WhatsApp: ${phone}\n` +
      `Wedding Date: ${date}\n` +
      `Venue & Location: ${location}\n` +
      `Estimated Guests: ${guests}\n` +
      `Estimated Budget: ${budget}\n` +
      `Services of Interest: ${serviceList}\n\n` +
      `About our day & vision:\n${message}\n\n` +
      `Looking forward to hearing from you!`
    );

    window.location.href = `mailto:${studio.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  function handleCopyEmail() {
    navigator.clipboard?.writeText(studio.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  }

  return (
    <main className="page-container contact-page" id="contact-page">
      {/* Hero Header */}
      <section className="page-hero">
        <div className="page-badge">Reserve Your Date</div>
        <h1>Let’s start something timeless.</h1>
        <p className="page-subtitle">
          We limit our commissions each year to ensure personal, focused attention for every celebration.
          Tell us a little about yourselves below.
        </p>
      </section>

      <div className="content-wrapper">
        <div className="contact-page-layout">
          {/* Left Column: Direct Info & Concierge */}
          <div className="contact-info-panel">
            {/* Live Availability Status */}
            <div className="contact-availability-badge">
              <div className="pulse-dot" aria-hidden="true" />
              <span>{studio.bookingLabel} · Limited weekend dates remain</span>
            </div>

            {/* Direct Contact Card */}
            <div className="contact-detail-card">
              <h3>Direct Studio Concierge</h3>
              <div className="contact-methods">
                <div className="contact-method-item">
                  <div className="contact-icon-bubble" aria-hidden="true">✉</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "12px", color: "var(--muted)", textTransform: "uppercase" }}>Email Us</div>
                    <a href={`mailto:${studio.email}`}>{studio.email}</a>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="filter-chip"
                    style={{ padding: "4px 10px", fontSize: "11px" }}
                    aria-label="Copy studio email"
                  >
                    {copiedEmail ? "Copied!" : "Copy"}
                  </button>
                </div>

                <div className="contact-method-item">
                  <div className="contact-icon-bubble" aria-hidden="true">📞</div>
                  <div>
                    <div style={{ fontSize: "12px", color: "var(--muted)", textTransform: "uppercase" }}>Studio Phone</div>
                    <a href={`tel:${studio.phone}`}>{studio.phone}</a>
                  </div>
                </div>

                <div className="contact-method-item">
                  <div className="contact-icon-bubble" aria-hidden="true">💬</div>
                  <div>
                    <div style={{ fontSize: "12px", color: "var(--muted)", textTransform: "uppercase" }}>WhatsApp Chat</div>
                    <a
                      href={`https://wa.me/${studio.whatsapp.replace(/\D/g, "")}?text=Hi%20Raavan%20Studio%27z%2C%20we%27d%20love%20to%20enquire%20about%20our%20wedding`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {studio.whatsapp} ↗
                    </a>
                  </div>
                </div>

                <div className="contact-method-item">
                  <div className="contact-icon-bubble" aria-hidden="true">📷</div>
                  <div>
                    <div style={{ fontSize: "12px", color: "var(--muted)", textTransform: "uppercase" }}>Instagram</div>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                      {studio.instagram} ↗
                    </a>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid var(--line)", fontSize: "13px", color: "var(--muted)", lineHeight: "1.6" }}>
                ⏱ <strong>Response Commitment:</strong> We read and reply to all wedding inquiries
                within 24 hours (excluding Sundays).
              </div>
            </div>

            {/* Travel Bases Card */}
            <div className="travel-bases-card">
              <h4>Base & Travel Destinations</h4>
              <p>
                Based between London and the South Downs of Sussex, we travel extensively across
                Europe and worldwide with flat, transparent travel packages.
              </p>
              <div className="country-tags">
                <span className="country-tag">🇬🇧 United Kingdom</span>
                <span className="country-tag">🇮🇹 Lake Como & Tuscany</span>
                <span className="country-tag">🇫🇷 Provence & Paris</span>
                <span className="country-tag">🇬🇷 Santorini & Athens</span>
                <span className="country-tag">🇪🇸 Mallorca & Ibiza</span>
                <span className="country-tag">✈️ Worldwide</span>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="contact-form-panel">
            {submitted ? (
              <div className="success-card">
                <div className="success-check-bubble">✓</div>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: "28px", marginBottom: "12px" }}>
                  Enquiry Prepared!
                </h3>
                <p style={{ color: "var(--muted)", fontSize: "15px", lineHeight: "1.7", marginBottom: "24px" }}>
                  Your email client has been opened with your wedding details ready to send directly
                  to our studio inbox ({studio.email}).
                </p>
                <p style={{ color: "var(--muted)", fontSize: "13px", marginBottom: "32px" }}>
                  If your email client didn’t launch automatically, you can also write to us directly at:
                  <br />
                  <strong style={{ color: "var(--accent)" }}>{studio.email}</strong>
                </p>
                <button
                  type="button"
                  className="cta-button"
                  onClick={() => setSubmitted(false)}
                >
                  Edit Enquiry Details
                </button>
              </div>
            ) : (
              <>
                <h3>Tell Us About Your Day</h3>
                <p className="form-subtitle">
                  Fill in whatever details you know so far. We’ll verify our calendar and reply
                  with availability and our full client guide.
                </p>

                <form className="luxury-form" onSubmit={handleSubmit}>
                  {/* Row 1: Names */}
                  <div className="form-grid-2">
                    <div className="form-field">
                      <label htmlFor="name">Your Name *</label>
                      <input id="name" name="name" required placeholder="Elena Vance" autoComplete="name" />
                    </div>
                    <div className="form-field">
                      <label htmlFor="partnerName">Partner’s Name *</label>
                      <input id="partnerName" name="partnerName" required placeholder="Marcus Sterling" />
                    </div>
                  </div>

                  {/* Row 2: Contact */}
                  <div className="form-grid-2">
                    <div className="form-field">
                      <label htmlFor="email">Email Address *</label>
                      <input id="email" name="email" type="email" required placeholder="you@example.com" autoComplete="email" />
                    </div>
                    <div className="form-field">
                      <label htmlFor="phone">Phone / WhatsApp</label>
                      <input id="phone" name="phone" placeholder="+44 7700 900000" autoComplete="tel" />
                    </div>
                  </div>

                  {/* Row 3: Date & Venue */}
                  <div className="form-grid-2">
                    <div className="form-field">
                      <label htmlFor="date">Wedding Date</label>
                      <input id="date" name="date" type="date" />
                    </div>
                    <div className="form-field">
                      <label htmlFor="location">Venue & Destination</label>
                      <input id="location" name="location" placeholder="e.g. Villa Balbianello, Lake Como" />
                    </div>
                  </div>

                  {/* Row 4: Guests & Budget */}
                  <div className="form-grid-2">
                    <div className="form-field">
                      <label htmlFor="guests">Estimated Guest Count</label>
                      <select id="guests" name="guests" defaultValue="50-100 guests">
                        <option value="Just the two of us (Elopement)">Just the two of us (Elopement)</option>
                        <option value="Under 50 guests (Intimate)">Under 50 guests (Intimate)</option>
                        <option value="50-100 guests">50–100 guests</option>
                        <option value="100-200 guests">100–200 guests</option>
                        <option value="200+ guests (Grand celebration)">200+ guests (Grand celebration)</option>
                      </select>
                    </div>

                    <div className="form-field">
                      <label htmlFor="budget">Photography Budget</label>
                      <select id="budget" name="budget" defaultValue="£2,500 - £4,000">
                        <option value="£1,850 - £2,500">£1,850 – £2,500</option>
                        <option value="£2,500 - £4,000">£2,500 – £4,000</option>
                        <option value="£4,000 - £6,000">£4,000 – £6,000</option>
                        <option value="£6,000+ (Cinema + Photo Heirloom)">£6,000+ (Cinema + Photo Heirloom)</option>
                      </select>
                    </div>
                  </div>

                  {/* Services Checklist */}
                  <div className="form-field">
                    <label>Services of Interest</label>
                    <div className="services-checkboxes">
                      <label className="checkbox-pill">
                        <input type="checkbox" name="service_photo" defaultChecked />
                        <span>Wedding Photography</span>
                      </label>
                      <label className="checkbox-pill">
                        <input type="checkbox" name="service_cinema" />
                        <span>Cinematic Wedding Film</span>
                      </label>
                      <label className="checkbox-pill">
                        <input type="checkbox" name="service_drone" />
                        <span>Drone Aerials</span>
                      </label>
                      <label className="checkbox-pill">
                        <input type="checkbox" name="service_album" defaultChecked />
                        <span>Heirloom Leather Album</span>
                      </label>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="form-field">
                    <label htmlFor="message">Your Love Story & Vision</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      placeholder="Tell us what you love most about each other, your style, or what parts of the celebration you’re most excited about..."
                    />
                  </div>

                  {/* Submit Row */}
                  <div className="form-submit-row">
                    <button className="contact-submit-btn" type="submit">
                      Send Your Wedding Enquiry <span aria-hidden="true">→</span>
                    </button>
                    <span className="submit-feedback-badge">
                      🔒 No spam. We treat your personal details with complete discretion.
                    </span>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
