import { useState } from "react";
import { studio } from "../content.js";
import { postEnquiry } from "../api.js";

export default function ContactPage() {
  const [formType, setFormType] = useState("wedding"); // 'wedding', 'toddler', 'prewedding', 'other'
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("Please provide your name and phone number.");
      return;
    }
    setSubmitting(true);

    const typeLabels = {
      wedding: "Wedding & Reception (Namma Veetu Kalyanam)",
      toddler: "Toddlers by Raavan (Baby / Newborn Shoot)",
      prewedding: "Outdoor & Pre-Wedding Shoot",
      other: "Other Photography Commission",
    };

    const payload = {
      type: formType,
      name,
      phone,
      email,
      event_date: eventDate,
      location,
      message,
    };

    try {
      await postEnquiry(payload);
    } catch (err) {
      console.warn("API submission notice:", err);
    }

    // Direct WhatsApp Message as well for instant confirmation
    const waText = `Hi Gowtham Raj! I would like to book a photography session with Raavan Studio’z:%0A• Name: ${name}%0A• Mobile: ${phone}%0A• Service: ${typeLabels[formType]}%0A• Date: ${eventDate || "Flexible"}%0A• Location: ${location || "Krishnagiri / Nearby"}%0A• Notes: ${message || "Please share availability and package options."}`;

    window.open(`https://wa.me/919500306696?text=${waText}`, "_blank");

    setSubmitting(false);
    setSubmitted(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(studio.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <div className="clean-subpage-root contact-page-root" id="contact-page">
      {/* ============================================================== */}
      {/* 1. HERO HEADER                                                 */}
      {/* ============================================================== */}
      <section className="clean-page-hero">
        <div className="inc-container">
          <div className="clean-hero-badge-wrap">
            <span className="clean-eyebrow-tag">CONNECT WITH RAAVAN STUDIO’Z</span>
          </div>
          <h1 className="clean-page-title">
            Let’s Click the Moment Together
          </h1>
          <p className="clean-page-subtitle">
            Reserve your date with <strong>Mr. Gowtham Raj</strong> for weddings, newborn sessions with <strong>@toddlers_by_raavan</strong>, or custom photobooks. We respond promptly via WhatsApp and phone.
          </p>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. TWO-COLUMN CONTACT & BOOKING LAYOUT                         */}
      {/* ============================================================== */}
      <section className="inc-section-wrap contact-main-section">
        <div className="inc-container">
          <div className="inc-two-col-grid align-start">
            {/* Left Column: Direct Info & Studio Locations */}
            <div className="contact-info-col reveal-on-scroll">
              <div className="contact-status-badge">
                <span className="online-indicator" />
                <span>Now Booking 2026 &amp; 2027 Dates · Krishnagiri</span>
              </div>

              <h2 className="clean-section-heading" style={{ marginTop: "16px" }}>
                Direct Studio Touchpoints
              </h2>
              <p className="clean-body-text" style={{ marginBottom: "24px" }}>
                Reach out directly to discuss your event timeline, check studio availability, or schedule an in-person album preview.
              </p>

              {/* Direct Touchpoints Cards */}
              <div className="contact-direct-cards">
                <a href="tel:+919500306696" className="direct-touch-card">
                  <div className="touch-icon-box">📞</div>
                  <div className="touch-info">
                    <span className="touch-label">Direct Phone Call</span>
                    <strong className="touch-val">+91 9500306696</strong>
                    <span className="touch-sub">9:00 AM – 9:00 PM Daily</span>
                  </div>
                </a>

                <a
                  href={`https://wa.me/919500306696?text=${encodeURIComponent(
                    "Hi Gowtham Raj! I would like to connect with Raavan Studio’z."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="direct-touch-card touch-whatsapp"
                >
                  <div className="touch-icon-box whatsapp-box">
                    <svg viewBox="0 0 448 512" width="20" height="20" fill="currentColor">
                      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                    </svg>
                  </div>
                  <div className="touch-info">
                    <span className="touch-label">Official WhatsApp</span>
                    <strong className="touch-val">+91 9500306696</strong>
                    <span className="touch-sub">Instant chat with Gowtham Raj</span>
                  </div>
                </a>

                <div className="direct-touch-card" onClick={handleCopyEmail} style={{ cursor: "pointer" }}>
                  <div className="touch-icon-box">✉️</div>
                  <div className="touch-info">
                    <span className="touch-label">Email Concierge</span>
                    <strong className="touch-val">{studio.email}</strong>
                    <span className="touch-sub">{copiedEmail ? "✓ Copied to clipboard!" : "Click to copy email"}</span>
                  </div>
                </div>
              </div>

              {/* 2 Studio Facility Locations */}
              <h3 className="studios-subhead">Our Two Studios in Krishnagiri</h3>
              <div className="contact-studios-stack">
                <div className="contact-branch-card">
                  <div className="branch-card-header">
                    <span className="branch-pill">STUDIO 01 · THE CREATIVE SPACE</span>
                    <a
                      href="https://maps.app.goo.gl/13tnC9ZgRtQ5Ftje8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="branch-map-link"
                    >
                      Maps ↗
                    </a>
                  </div>
                  <strong className="branch-name">Baby, Infant &amp; Toddler Studio</strong>
                  <p className="branch-p">
                    3/470B RCC Moulding Bldg, Ground Floor, Gandhi Nagar, Salem-Bangalore Hwy, Krishnagiri (Opp. Gunam Hospital)
                  </p>
                </div>

                <div className="contact-branch-card">
                  <div className="branch-card-header">
                    <span className="branch-pill">STUDIO 02 · WORK SPACE</span>
                    <a
                      href="https://maps.app.goo.gl/e11f4M4RwXUbF1gcA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="branch-map-link"
                    >
                      Maps ↗
                    </a>
                  </div>
                  <strong className="branch-name">Weddings &amp; Editing Office</strong>
                  <p className="branch-p">
                    3/59-9, Gandhi Nagar, Near Pillayar Kovil, Krishnagiri (BATA Showroom lane, backside Central Theatre)
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Professional Booking Form */}
            <div className="contact-form-col reveal-scale">
              <div className="clean-booking-card">
                <div className="booking-card-head">
                  <h3 className="booking-form-title">Check Date Availability</h3>
                  <p className="booking-form-desc">
                    Tell us about your celebration or photo session. Mr. Gowtham Raj will review availability and get back to you directly.
                  </p>
                </div>

                {submitted ? (
                  <div className="clean-form-success-state">
                    <div className="success-badge-circle">✓</div>
                    <h4>Enquiry Sent Successfully!</h4>
                    <p>
                      Thank you, <strong>{name}</strong>! Your request has been opened in WhatsApp with Mr. Gowtham Raj. We will connect with you shortly.
                    </p>
                    <button
                      type="button"
                      className="clean-primary-btn"
                      onClick={() => setSubmitted(false)}
                      style={{ marginTop: "16px" }}
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="clean-inquiry-form">
                    {/* Service Type Toggle Pills */}
                    <div className="form-field-group">
                      <label className="clean-field-label">Select Service Type</label>
                      <div className="service-toggle-pills">
                        <button
                          type="button"
                          className={`toggle-pill${formType === "wedding" ? " active" : ""}`}
                          onClick={() => setFormType("wedding")}
                        >
                          Wedding / Reception
                        </button>
                        <button
                          type="button"
                          className={`toggle-pill${formType === "toddler" ? " active" : ""}`}
                          onClick={() => setFormType("toddler")}
                        >
                          Toddlers / Baby Shoot
                        </button>
                        <button
                          type="button"
                          className={`toggle-pill${formType === "prewedding" ? " active" : ""}`}
                          onClick={() => setFormType("prewedding")}
                        >
                          Pre-Wedding Shoot
                        </button>
                        <button
                          type="button"
                          className={`toggle-pill${formType === "other" ? " active" : ""}`}
                          onClick={() => setFormType("other")}
                        >
                          Other Commission
                        </button>
                      </div>
                    </div>

                    <div className="form-two-inputs-row">
                      <div className="form-field-group">
                        <label className="clean-field-label">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Priya or Vignesh"
                          className="clean-text-input"
                        />
                      </div>
                      <div className="form-field-group">
                        <label className="clean-field-label">Phone / WhatsApp Number *</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. +91 98765 43210"
                          className="clean-text-input"
                        />
                      </div>
                    </div>

                    <div className="form-two-inputs-row">
                      <div className="form-field-group">
                        <label className="clean-field-label">Preferred Date</label>
                        <input
                          type="date"
                          value={eventDate}
                          onChange={(e) => setEventDate(e.target.value)}
                          className="clean-text-input"
                        />
                      </div>
                      <div className="form-field-group">
                        <label className="clean-field-label">Location / City</label>
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="e.g. Krishnagiri, Hosur, Bangalore"
                          className="clean-text-input"
                        />
                      </div>
                    </div>

                    <div className="form-field-group">
                      <label className="clean-field-label">Email Address (Optional)</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. yourname@gmail.com"
                        className="clean-text-input"
                      />
                    </div>

                    <div className="form-field-group">
                      <label className="clean-field-label">Your Message or Questions</label>
                      <textarea
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us about your event, baby's age, or specific photo requirements..."
                        className="clean-text-input clean-textarea"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="clean-submit-btn"
                    >
                      {submitting ? "Sending..." : "Check Availability on WhatsApp →"}
                    </button>
                    <p className="form-privacy-note">
                      🔒 Your details are kept confidential. Direct communication with Mr. Gowtham Raj.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
