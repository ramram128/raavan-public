import { useState } from "react";
import { studio } from "../content.js";
import { postEnquiry } from "../api.js";

export default function ContactSection() {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [formType, setFormType] = useState("wedding_event");

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
      event_type: formData.get("event_type") || "Wedding & Reception",
      event_date: formData.get("event_date") || "",
      location: formData.get("location") || "",
      message: formData.get("message") || "",
    };

    const res = await postEnquiry(payload);
    setSubmitting(false);
    setResult(res);
  }

  return (
    <section className="home-section section-contact" id="contact" aria-label="Contact and Inquiry">
      <div className="section-head-wrap">
        <div className="page-badge" style={{ background: "rgba(255, 255, 255, 0.12)", color: "#00d4ff", borderColor: "rgba(0, 212, 255, 0.4)" }}>
          Reserve Your Date
        </div>
        <h2 style={{ color: "#f4f7fa" }}>
          Make a count, Click the moment.
        </h2>
        <p className="section-head-subtitle" style={{ color: "rgba(244, 247, 250, 0.75)" }}>
          Contact Mr. Gowtham Raj &amp; team for your weddings, newborn sessions, or family milestones.
        </p>
      </div>

      <div className="content-wrapper">
        <div className="contact-page-layout">
          <div className="contact-info-panel">
            <div className="concierge-card status-card">
              <span className="live-dot" aria-hidden="true" />
              <div>
                <p className="status-title">Now Booking 2026 &amp; 2027</p>
                <p className="status-sub">2 Branches in Krishnagiri</p>
              </div>
            </div>

            <div className="concierge-card">
              <h3>Direct Touchpoint</h3>
              <p className="concierge-text">
                Speak directly with Mr. Gowtham Raj or visit our creative spaces:
              </p>
              <div className="contact-links-list">
                <a href={`tel:${studio.phone}`} className="contact-direct-link">
                  <span className="link-icon">📞</span>
                  <span>{studio.phone}</span>
                </a>
                <a
                  href="https://wa.me/919500306696?text=Hi%20Raavan%20Studio%E2%80%99z!%20I%20have%20an%20upcoming%20event/project%20in%20mind."
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
            </div>

            <div className="concierge-card">
              <h3>Flagship Studios</h3>
              <div style={{ display: "grid", gap: "0.75rem", fontSize: "0.88rem" }}>
                <div>
                  <strong style={{ color: "#00d4ff" }}>The Creative Space:</strong>
                  <p style={{ margin: "0.2rem 0", opacity: 0.8 }}>3/470B RCC Moulding Bldg, Gandhi Nagar, Salem-Bangalore Hwy, Krishnagiri (Opp. Gunam Hospital)</p>
                  <a href="https://maps.app.goo.gl/13tnC9ZgRtQ5Ftje8" target="_blank" rel="noreferrer" style={{ color: "#00d4ff", fontSize: "0.8rem" }}>Google Maps ↗</a>
                </div>
                <div>
                  <strong style={{ color: "#00d4ff" }}>Work Space:</strong>
                  <p style={{ margin: "0.2rem 0", opacity: 0.8 }}>3/59-9, Gandhi Nagar, Near Pillayar Kovil (BATA Showroom down lane), Krishnagiri</p>
                  <a href="https://maps.app.goo.gl/e11f4M4RwXUbF1gcA" target="_blank" rel="noreferrer" style={{ color: "#00d4ff", fontSize: "0.8rem" }}>Google Maps ↗</a>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-panel">
            {result && result.success ? (
              <div style={{ padding: "2rem", background: "rgba(0, 212, 255, 0.1)", borderRadius: "12px", border: "1px solid rgba(0, 212, 255, 0.4)", textAlign: "center" }}>
                <h3>✨ Enquiry Stored Successfully!</h3>
                <p style={{ margin: "1rem 0", opacity: 0.9 }}>
                  {result.message} A notification has been routed to <strong>{studio.email}</strong>.
                </p>
                {result.whatsapp_url && (
                  <a href={result.whatsapp_url} target="_blank" rel="noreferrer" className="btn btn-primary">
                    Send Directly via WhatsApp →
                  </a>
                )}
                <div style={{ marginTop: "1rem" }}>
                  <button type="button" onClick={() => setResult(null)} style={{ background: "transparent", border: "none", color: "#ccc", textDecoration: "underline", cursor: "pointer" }}>
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="commission-form">
                <div className="form-row two-col">
                  <div className="form-group">
                    <label htmlFor="sec_name">Your Name *</label>
                    <input type="text" id="sec_name" name="name" required placeholder="Name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="sec_phone">Phone / WhatsApp *</label>
                    <input type="tel" id="sec_phone" name="phone" required placeholder="+91-9500306696" />
                  </div>
                </div>

                <div className="form-row two-col">
                  <div className="form-group">
                    <label htmlFor="sec_event">Event / Shoot Type</label>
                    <select id="sec_event" name="event_type" defaultValue="Wedding & Reception">
                      <option value="Wedding & Reception">Wedding &amp; Reception</option>
                      <option value="Newborn / Toddlers Shoot">Newborn / Toddler Shoot (@toddlers_by_raavan)</option>
                      <option value="Pre-Wedding Shoot">Pre-Wedding / Couple Shoot</option>
                      <option value="Maternity Session">Maternity Session</option>
                      <option value="Custom Photobook">Handcrafted Photobook</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="sec_date">Event / Target Date</label>
                    <input type="date" id="sec_date" name="event_date" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="sec_location">Location / Venue</label>
                  <input type="text" id="sec_location" name="location" placeholder="e.g. Krishnagiri, Chennai, Bangalore" />
                </div>

                <div className="form-group">
                  <label htmlFor="sec_message">Message &amp; Requirements</label>
                  <textarea id="sec_message" name="message" rows="3" placeholder="Tell us what you have in mind..." />
                </div>

                <button type="submit" className="btn btn-primary submit-btn" disabled={submitting} style={{ width: "100%", padding: "0.9rem" }}>
                  {submitting ? "Sending..." : "Submit Enquiry & Connect on WhatsApp →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
