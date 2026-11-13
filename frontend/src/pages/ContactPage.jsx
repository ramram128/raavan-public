import { useState } from "react";
import { studio } from "../content.js";
import { postEnquiry } from "../api.js";

export default function ContactPage() {
  const [formType, setFormType] = useState("wedding_event"); // 'wedding_event' or 'newborn_toddler'
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setResult(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      type: formType,
      name: formData.get("name") || "",
      phone: formData.get("phone") || "",
      email: formData.get("email") || "",
      message: formData.get("message") || "",
    };

    if (formType === "wedding_event") {
      payload.event_type = formData.get("event_type") || "Wedding & Reception";
      payload.event_date = formData.get("event_date") || "";
      payload.location = formData.get("location") || "";
    } else {
      payload.parent_name = formData.get("parent_name") || "";
      payload.baby_name = formData.get("baby_name") || "";
      payload.baby_age = formData.get("baby_age") || "";
      payload.baby_weight = formData.get("baby_weight") || "";
      payload.baby_gender = formData.get("baby_gender") || "";
      payload.selected_package = formData.get("selected_package") || "Little Stars (₹8,000)";
      payload.preferred_slot = formData.get("preferred_slot") || "";
    }

    const res = await postEnquiry(payload);
    setSubmitting(false);
    setResult(res);
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
        <div className="page-badge">Connect with Raavan Studio’z</div>
        <h1>Let’s click the moment.</h1>
        <p className="page-subtitle">
          {studio.tagline} · Reserve your date for weddings, newborn sessions with @toddlers_by_raavan, or heirloom photobooks.
        </p>
      </section>

      <div className="content-wrapper">
        <div className="contact-page-layout">
          {/* Left Column: Direct Info & Branches */}
          <div className="contact-info-panel">
            <div className="concierge-card status-card">
              <span className="live-dot" aria-hidden="true" />
              <div>
                <p className="status-title">Booking Open for 2026 & 2027</p>
                <p className="status-sub">Founder Mr. Gowtham Raj &amp; Team</p>
              </div>
            </div>

            <div className="concierge-card">
              <h3>Direct Touchpoint</h3>
              <p className="concierge-text">
                Speak directly with Mr. Gowtham Raj or our booking coordinators:
              </p>
              <div className="contact-links-list">
                <a href={`tel:${studio.phone}`} className="contact-direct-link">
                  <span className="link-icon">📞</span>
                  <span>{studio.phone}</span>
                </a>
                <a
                  href={`https://wa.me/919500306696?text=Hi%20Raavan%20Studio%E2%80%99z!%20I%20have%20an%20upcoming%20event/project%20in%20mind.`}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-direct-link"
                >
                  <span className="link-icon">💬</span>
                  <span>WhatsApp: +91-9500306696</span>
                </a>
                <a href={`mailto:${studio.email}`} className="contact-direct-link">
                  <span className="link-icon">✉️</span>
                  <span>{studio.email}</span>
                </a>
              </div>
              <button
                type="button"
                className="copy-email-btn"
                onClick={handleCopyEmail}
                style={{ marginTop: "0.75rem", fontSize: "0.85rem", opacity: 0.8 }}
              >
                {copiedEmail ? "✓ Email copied to clipboard" : "Copy email address"}
              </button>
            </div>

            <div className="concierge-card">
              <h3>Our 2 Studio Branches</h3>
              <div style={{ display: "grid", gap: "1rem", marginTop: "0.75rem" }}>
                {studio.branches.map((b) => (
                  <div
                    key={b.id}
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      padding: "1rem",
                      borderRadius: "8px",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <strong style={{ color: "#00d4ff", fontSize: "1rem" }}>{b.name}</strong>
                      <span style={{ fontSize: "0.75rem", opacity: 0.6 }}>{b.type}</span>
                    </div>
                    <p style={{ fontSize: "0.85rem", margin: "0.35rem 0", lineHeight: 1.4, opacity: 0.85 }}>
                      {b.address}
                    </p>
                    <p style={{ fontSize: "0.8rem", color: "#e2b876", marginBottom: "0.5rem" }}>
                      📍 Landmark: {b.landmark}
                    </p>
                    <a
                      href={b.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        fontSize: "0.82rem",
                        color: "#00d4ff",
                        textDecoration: "underline",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.25rem",
                      }}
                    >
                      <span>Open in Google Maps ↗</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="concierge-card">
              <h3>Official Instagram Handles</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: "0.5rem 0 0", display: "grid", gap: "0.5rem" }}>
                <li>
                  <a
                    href="https://instagram.com/raavan_studioz"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#fff", textDecoration: "none", display: "flex", justifyContent: "space-between" }}
                  >
                    <span>@raavan_studioz</span>
                    <span style={{ opacity: 0.5, fontSize: "0.8rem" }}>Main Profile</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/toddlers_by_raavan"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#fff", textDecoration: "none", display: "flex", justifyContent: "space-between" }}
                  >
                    <span>@toddlers_by_raavan</span>
                    <span style={{ opacity: 0.5, fontSize: "0.8rem" }}>Maternity &amp; Newborns</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/photobooks_by_raavan"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#fff", textDecoration: "none", display: "flex", justifyContent: "space-between" }}
                  >
                    <span>@photobooks_by_raavan</span>
                    <span style={{ opacity: 0.5, fontSize: "0.8rem" }}>Luxury Photobooks</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Dynamic Form */}
          <div className="contact-form-panel">
            {/* Form Mode Selector */}
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                marginBottom: "1.5rem",
                padding: "0.4rem",
                background: "rgba(255,255,255,0.04)",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <button
                type="button"
                onClick={() => { setFormType("wedding_event"); setResult(null); }}
                style={{
                  flex: 1,
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  border: "none",
                  background: formType === "wedding_event" ? "var(--color-primary, #00d4ff)" : "transparent",
                  color: formType === "wedding_event" ? "#000" : "#fff",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                Weddings &amp; Celebrations
              </button>
              <button
                type="button"
                onClick={() => { setFormType("newborn_toddler"); setResult(null); }}
                style={{
                  flex: 1,
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  border: "none",
                  background: formType === "newborn_toddler" ? "var(--color-primary, #00d4ff)" : "transparent",
                  color: formType === "newborn_toddler" ? "#000" : "#fff",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                Newborn &amp; Toddlers (@toddlers)
              </button>
            </div>

            {result && result.success ? (
              <div
                className="form-success-banner"
                style={{
                  background: "rgba(0, 212, 255, 0.1)",
                  border: "1px solid rgba(0, 212, 255, 0.4)",
                  borderRadius: "12px",
                  padding: "2rem",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>✨</div>
                <h3 style={{ fontSize: "1.4rem", marginBottom: "0.5rem", color: "#fff" }}>Enquiry Received!</h3>
                <p style={{ opacity: 0.85, maxWidth: "500px", margin: "0 auto 1.5rem", lineHeight: 1.5 }}>
                  {result.message} A copy has been stored in our system and sent to <strong>{studio.email}</strong>.
                </p>
                {result.whatsapp_url && (
                  <a
                    href={result.whatsapp_url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.85rem 1.75rem",
                      fontSize: "1rem",
                      fontWeight: 600,
                    }}
                  >
                    <span>Send via WhatsApp (+91-9500306696) →</span>
                  </a>
                )}
                <div style={{ marginTop: "1.5rem" }}>
                  <button
                    type="button"
                    onClick={() => setResult(null)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "rgba(255,255,255,0.6)",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    Submit another enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="commission-form">
                {formType === "wedding_event" ? (
                  <>
                    <div className="form-row two-col">
                      <div className="form-group">
                        <label htmlFor="name">Your Full Name *</label>
                        <input type="text" id="name" name="name" required placeholder="e.g. Arun & Divya" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="phone">Phone / WhatsApp Number *</label>
                        <input type="tel" id="phone" name="phone" required placeholder="+91-9876543210" />
                      </div>
                    </div>

                    <div className="form-row two-col">
                      <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" name="email" placeholder="name@example.com" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="event_type">Event / Commission Type</label>
                        <select id="event_type" name="event_type" defaultValue="Wedding & Reception">
                          <option value="Wedding & Reception">Wedding &amp; Reception (Namma Veetu Kalyanam)</option>
                          <option value="Pre-Wedding / Post-Wedding">Pre-Wedding / Post-Wedding Portraits</option>
                          <option value="Engagement & Sangeet">Engagement &amp; Sangeet Ceremony</option>
                          <option value="Baby Shower & Maternity">Baby Shower &amp; Outdoor Maternity</option>
                          <option value="Birthday & Family Milestone">Birthday &amp; Family Milestone</option>
                          <option value="Corporate / Automotive">Corporate, Commercial &amp; Automotive</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-row two-col">
                      <div className="form-group">
                        <label htmlFor="event_date">Date of Event *</label>
                        <input type="date" id="event_date" name="event_date" required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="location">Place of Event / Venue *</label>
                        <input type="text" id="location" name="location" required placeholder="e.g. Mandapam / City / Destination" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="message">Event Vision &amp; Special Requirements</label>
                      <textarea
                        id="message"
                        name="message"
                        rows="4"
                        placeholder="Tell us about the ceremonies, hours of coverage, or preferences..."
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {/* Newborn & Toddler Specific Form */}
                    <div className="form-row two-col">
                      <div className="form-group">
                        <label htmlFor="parent_name">Name of Parents *</label>
                        <input type="text" id="parent_name" name="parent_name" required placeholder="e.g. Ramesh & Priya" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="name">Contact Person Name *</label>
                        <input type="text" id="name" name="name" required placeholder="Primary contact" />
                      </div>
                    </div>

                    <div className="form-row two-col">
                      <div className="form-group">
                        <label htmlFor="phone">Contact Number (WhatsApp) *</label>
                        <input type="tel" id="phone" name="phone" required placeholder="+91-9876543210" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" name="email" placeholder="name@example.com" />
                      </div>
                    </div>

                    <div className="form-row two-col">
                      <div className="form-group">
                        <label htmlFor="baby_name">Name of Newborn / Toddler (If named)</label>
                        <input type="text" id="baby_name" name="baby_name" placeholder="Baby name or 'Baby of...'" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="baby_gender">Gender</label>
                        <select id="baby_gender" name="baby_gender" defaultValue="Boy">
                          <option value="Boy">Baby Boy</option>
                          <option value="Girl">Baby Girl</option>
                          <option value="Twins">Twins / Multiples</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-row two-col">
                      <div className="form-group">
                        <label htmlFor="baby_age">Age of Baby *</label>
                        <input type="text" id="baby_age" name="baby_age" required placeholder="e.g. 10 Days / 6 Months / 1 Year" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="baby_weight">Weight of Newborn</label>
                        <input type="text" id="baby_weight" name="baby_weight" placeholder="e.g. 3.2 kg" />
                      </div>
                    </div>

                    <div className="form-row two-col">
                      <div className="form-group">
                        <label htmlFor="selected_package">Select Package *</label>
                        <select id="selected_package" name="selected_package" defaultValue="Little Stars (₹8,000)">
                          <option value="Mini Memories (₹2,500)">Mini Memories – ₹2,500 (1 setup, 5 photos)</option>
                          <option value="Sweet Beginnings (₹5,000)">Sweet Beginnings – ₹5,000 (2 setups, 10 photos, parent shot)</option>
                          <option value="Little Stars (₹8,000)">Little Stars – ₹8,000 (3 setups, 15 photos, frame) [Most Popular]</option>
                          <option value="Tiny Royalty (₹12,000)">Tiny Royalty – ₹12,000 (5 setups, 25 photos, 3 frames)</option>
                          <option value="Custom / Home Shoot">Home Shoot Session (Free travel within 20km)</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="preferred_slot">Preferred Date &amp; Time Slot *</label>
                        <input type="text" id="preferred_slot" name="preferred_slot" required placeholder="e.g. Next Saturday morning (10 AM)" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="message">Special Notes / Medical / Allergies</label>
                      <textarea
                        id="message"
                        name="message"
                        rows="3"
                        placeholder="Any sleep cycles, feeding schedule, or prop requests..."
                      />
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="btn btn-primary submit-btn"
                  disabled={submitting}
                  style={{
                    width: "100%",
                    padding: "1rem",
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    marginTop: "1rem",
                  }}
                >
                  {submitting ? "Submitting to Studio..." : "Submit Enquiry & Connect on WhatsApp →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
