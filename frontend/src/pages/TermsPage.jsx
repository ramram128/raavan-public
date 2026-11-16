import { useEffect, useState, useMemo } from "react";
import { fetchFromApi } from "../api.js";
import { termsConditions as fallbackTerms } from "../content.js";

// Section category icons mapping
const iconMap = {
  "01": "💳",
  "02": "👶",
  "03": "🛡️",
  "04": "🧸",
  "05": "✨",
  "06": "🗓️",
  "07": "🎨",
  "08": "🔬",
  "09": "🗄️",
  "10": "⚖️",
  "11": "🍽️",
  "12": "📸",
  "13": "💬",
};

export default function TermsPage({ onNavigate }) {
  const [terms, setTerms] = useState(fallbackTerms);
  // Two distinct documents: "general" (Raavan Studio'z) or "toddlers" (Toddlers by Raavan)
  const [activeDoc, setActiveDoc] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  // Default to English ("en"): full English by default, switchable to Tamil anytime
  const [lang, setLang] = useState("en");

  useEffect(() => {
    fetchFromApi("/terms", null).then((data) => {
      if (data && data.all && data.all.length > 0) {
        const formatted = data.all.map((t) => ({
          id: `tc-api-${t.id}`,
          section: t.section_type || "general",
          num: t.section_number || String(t.order).padStart(2, "0"),
          titleEn: t.title_en,
          titleTa: t.title_ta || "",
          contentEn: t.content_en,
          contentTa: t.content_ta || "",
          handle: t.section_type === "toddlers" ? "@toddlers_by_raavan" : "@raavan_studioz",
        }));
        setTerms(formatted);
      }
    });
  }, []);

  const isTamil = lang === "ta";

  // Separate terms by document type
  const toddlerTerms = useMemo(() => terms.filter((t) => t.section === "toddlers"), [terms]);
  const generalTerms = useMemo(() => terms.filter((t) => t.section === "general"), [terms]);

  // Current terms list to display
  const currentDocTerms = activeDoc === "toddlers" ? toddlerTerms : generalTerms;

  // Filter with search query
  const filteredTerms = useMemo(() => {
    if (!searchQuery.trim()) return currentDocTerms;
    const query = searchQuery.toLowerCase();
    return currentDocTerms.filter((item) => {
      const tEn = (item.titleEn || "").toLowerCase();
      const tTa = (item.titleTa || "").toLowerCase();
      const cEn = (item.contentEn || "").toLowerCase();
      const cTa = (item.contentTa || "").toLowerCase();
      return (
        tEn.includes(query) ||
        tTa.includes(query) ||
        cEn.includes(query) ||
        cTa.includes(query) ||
        item.num.toLowerCase().includes(query)
      );
    });
  }, [currentDocTerms, searchQuery]);

  return (
    <div className="clean-subpage-root terms-page-root" id="terms-page">
      {/* ============================================================== */}
      {/* 1. HERO HEADER                                                 */}
      {/* ============================================================== */}
      <section className="terms-page-hero-wrapper">
        <div className="inc-container">
          <div className="clean-hero-badge-wrap">
            <span className="clean-eyebrow-tag">
              {isTamil ? "✦ அதிகாரப்பூர்வ ஸ்டுடியோ ஒப்பந்தம்" : "✦ OFFICIAL CLIENT POLICY & AGREEMENT"}
            </span>
          </div>

          <h1 className="clean-page-title" style={{ marginBottom: "8px" }}>
            {isTamil ? "விதிமுறைகள் மற்றும் நிபந்தனைகள்" : "Terms & Conditions"}
          </h1>

          <p style={{ color: "#0284c7", fontWeight: 700, fontSize: "1.1rem", margin: "0 0 16px" }}>
            Raavan Studio’z · Toddlers by Raavan
          </p>

          <p className="clean-page-lead" style={{ maxWidth: "780px", margin: "0 auto 28px" }}>
            {isTamil ? (
              <>
                நாங்கள் <strong>2 தனித்தனி அதிகாரப்பூர்வ ஆவணங்களை</strong> வைத்துள்ளோம்: 
                பொதுவான புகைப்பட சேவைகள் (General Photography) மற்றும் குழந்தைகளுக்கான சிறப்பு அமர்வுகள் (Toddlers by Raavan).
                கீழே உள்ள பட்டன்களைத் தேர்வு செய்து இரண்டையும் தனித்தனியாகப் பார்க்கலாம்.
              </>
            ) : (
              <>
                We maintain <strong>two distinct official agreements</strong>: one for General Photography Services (Weddings &amp; Events) and one specifically for Newborns &amp; Toddlers. Select either document below to read its full terms.
              </>
            )}
          </p>

          {/* ============================================================== */}
          {/* TWO MAIN DOCUMENT SELECTION TABS                               */}
          {/* ============================================================== */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "14px",
              flexWrap: "wrap",
              margin: "0 auto",
              maxWidth: "820px",
            }}
          >
            {/* Tab 1: General Photography */}
            <button
              type="button"
              onClick={() => setActiveDoc("general")}
              style={{
                flex: "1 1 340px",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "16px 20px",
                borderRadius: "14px",
                border: activeDoc === "general" ? "2px solid #0284c7" : "1.5px solid #cbd5e1",
                background: activeDoc === "general" ? "#f0f9ff" : "#ffffff",
                boxShadow: activeDoc === "general" ? "0 8px 24px rgba(2, 132, 199, 0.15)" : "0 2px 8px rgba(0,0,0,0.03)",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.25s ease",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "10px",
                  background: activeDoc === "general" ? "#0284c7" : "#e2e8f0",
                  color: activeDoc === "general" ? "#ffffff" : "#475569",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4rem",
                  flexShrink: 0,
                }}
              >
                📸
              </div>
              <div>
                <strong style={{ display: "block", fontSize: "1.1rem", color: "#0f172a", fontWeight: 800 }}>
                  Raavan Studio’z
                </strong>
                <span style={{ fontSize: "0.82rem", color: activeDoc === "general" ? "#0284c7" : "#64748b", fontWeight: 600 }}>
                  {isTamil ? "Terms of the services of Photography (13 விதிகள்)" : "Terms of the services of Photography (13 Rules)"}
                </span>
              </div>
            </button>

            {/* Tab 2: Toddlers by Raavan */}
            <button
              type="button"
              onClick={() => setActiveDoc("toddlers")}
              style={{
                flex: "1 1 340px",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "16px 20px",
                borderRadius: "14px",
                border: activeDoc === "toddlers" ? "2px solid #0284c7" : "1.5px solid #cbd5e1",
                background: activeDoc === "toddlers" ? "#f0f9ff" : "#ffffff",
                boxShadow: activeDoc === "toddlers" ? "0 8px 24px rgba(2, 132, 199, 0.15)" : "0 2px 8px rgba(0,0,0,0.03)",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.25s ease",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "10px",
                  background: activeDoc === "toddlers" ? "#0284c7" : "#e2e8f0",
                  color: activeDoc === "toddlers" ? "#ffffff" : "#475569",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4rem",
                  flexShrink: 0,
                }}
              >
                👶
              </div>
              <div>
                <strong style={{ display: "block", fontSize: "1.1rem", color: "#0f172a", fontWeight: 800 }}>
                  Toddlers by Raavan
                </strong>
                <span style={{ fontSize: "0.82rem", color: activeDoc === "toddlers" ? "#0284c7" : "#64748b", fontWeight: 600 }}>
                  {isTamil ? "Newborn & Toddler Photography (10 விதிகள்)" : "Newborn & Toddler Photography (10 Rules)"}
                </span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. TOOLBAR & CONTROLS                                          */}
      {/* ============================================================== */}
      <section className="inc-section-wrap" style={{ paddingTop: "24px" }}>
        <div className="inc-container">
          {/* Active Document Header Box */}
          <div
            style={{
              background: "#ffffff",
              border: "1.5px solid #e2e8f0",
              borderLeft: "6px solid #0284c7",
              borderRadius: "16px",
              padding: "24px 28px",
              marginBottom: "24px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
            }}
          >
            {activeDoc === "general" ? (
              <>
                <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#0284c7", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  GENERAL PHOTOGRAPHY &amp; WEDDINGS
                </span>
                <h2 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#0a192f", margin: "6px 0 2px" }}>
                  RAAVAN STUDIO’Z
                </h2>
                <p style={{ fontStyle: "italic", color: "#64748b", margin: "0 0 10px", fontSize: "0.95rem" }}>
                  “Make a count and click the moments”
                </p>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0284c7", margin: "0 0 4px" }}>
                  {isTamil ? "புகைப்பட சேவைகளுக்கான விதிமுறைகள் மற்றும் நிபந்தனைகள்" : "Terms and conditions of the services of Photography."}
                </h3>
                <p style={{ fontSize: "0.92rem", color: "#475569", margin: 0 }}>
                  {isTamil
                    ? "இந்தப் பக்கத்தில் Raavan Studio’z சேவைகள், விதிமுறைகள் மற்றும் நிபந்தனைகள் உள்ளன (13 விதிகள்)."
                    : "This page contains Raavan Studio’z Services, terms and conditions (Total 13 Clauses)."}
                </p>
              </>
            ) : (
              <>
                <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#0284c7", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  NEWBORN &amp; TODDLER SESSIONS
                </span>
                <h2 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#0a192f", margin: "6px 0 2px" }}>
                  TODDLERS BY RAAVAN
                </h2>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0284c7", margin: "0 0 6px" }}>
                  {isTamil ? "குழந்தைகள் புகைப்படத்திற்கான விதிமுறைகள் மற்றும் நிபந்தனைகள்" : "Terms and conditions for the services of photography"}
                </h3>
                <p style={{ fontSize: "0.92rem", color: "#475569", margin: 0 }}>
                  {isTamil
                    ? "இந்த ஆவணத்தில் “Toddlers by Raavan”-இன் அனைத்து விதிமுறைகளும் நிபந்தனைகளும் உள்ளன (10 விதிகள்)."
                    : "This document contains all the terms and conditions of “Toddlers by Raavan” (Total 10 Clauses)."}
                </p>
              </>
            )}
          </div>

          <div className="terms-toolbar-wrap">
            {/* Language Switcher */}
            <div className="terms-lang-toggle-box" role="tablist" aria-label="Select Language">
              <button
                type="button"
                className={`terms-lang-btn ${lang === "en" ? "active" : ""}`}
                onClick={() => setLang("en")}
              >
                🇬🇧 English (Default)
              </button>
              <button
                type="button"
                className={`terms-lang-btn ${lang === "ta" ? "active" : ""}`}
                onClick={() => setLang("ta")}
              >
                🇮🇳 தமிழ் (Tamil)
              </button>
            </div>

            {/* Live Search */}
            <div className="terms-search-box">
              <span className="terms-search-icon">🔍</span>
              <input
                type="text"
                className="terms-search-input"
                placeholder={isTamil ? "விதிமுறைகளில் தேட (எ.கா: album, advance)..." : "Search in this document..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Print Button */}
            <button
              type="button"
              className="terms-filter-chip"
              onClick={() => window.print()}
              style={{ background: "#ffffff", borderColor: "#cbd5e1" }}
              title="Print document or Save as PDF"
            >
              🖨️ {isTamil ? "Print / Save PDF" : "Print / Save PDF"}
            </button>
          </div>

          {/* ============================================================== */}
          {/* 3. POLICY CARDS LIST                                           */}
          {/* ============================================================== */}
          <div className="terms-cards-list">
            {filteredTerms.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "48px 20px",
                  background: "#ffffff",
                  borderRadius: "16px",
                  border: "1px dashed #cbd5e1",
                }}
              >
                <p style={{ color: "#64748b", fontSize: "1.1rem" }}>
                  {isTamil
                    ? "நீங்கள் தேடிய வார்த்தைக்கு இந்த ஆவணத்தில் எந்த விதிகளும் பொருந்தவில்லை."
                    : "No rules in this document match your search."}
                </p>
                <button
                  type="button"
                  className="terms-filter-chip active"
                  onClick={() => setSearchQuery("")}
                >
                  {isTamil ? "அனைத்தையும் காட்டு" : "Clear Search"}
                </button>
              </div>
            ) : (
              filteredTerms.map((item, idx) => {
                const title = isTamil ? (item.titleTa || item.titleEn) : item.titleEn;
                const content = isTamil ? (item.contentTa || item.contentEn) : item.contentEn;
                const icon = iconMap[item.num] || "📄";

                const lines = content.split("\n").filter((l) => l.trim().length > 0);

                return (
                  <article
                    className="terms-policy-card reveal-on-scroll"
                    key={item.id || idx}
                  >
                    <div className="terms-card-head-row">
                      <div className="terms-badge-num">{item.num}</div>
                      <div>
                        <h3 className="terms-card-heading-title">
                          <span style={{ marginRight: "8px" }}>{icon}</span>
                          {title}
                        </h3>
                      </div>
                      {item.handle && (
                        <span className="terms-channel-tag">
                          <span>{item.handle}</span>
                        </span>
                      )}
                    </div>

                    <ul className="terms-bullet-list">
                      {lines.map((line, lIdx) => {
                        const isSubBullet = line.trim().startsWith("o ") || line.trim().startsWith("- ");
                        const cleanLine = line.replace(/^[•o\-]\s*/, "");

                        if (isSubBullet) {
                          return (
                            <li key={lIdx} className="terms-sub-bullet-item">
                              <span>{cleanLine}</span>
                            </li>
                          );
                        }

                        return (
                          <li key={lIdx} className="terms-bullet-item">
                            <span className="terms-bullet-icon">✦</span>
                            <span>{cleanLine}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </article>
                );
              })
            )}
          </div>

          {/* ============================================================== */}
          {/* 4. OFFICIAL CONTRACT CERTIFICATE & SIGNATURE                   */}
          {/* ============================================================== */}
          <div className="terms-certificate-box reveal-scale">
            <svg
              className="terms-cert-watermark"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>

            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: "#0284c7",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.3rem",
                  fontWeight: "900",
                }}
              >
                ✓
              </div>
              <div>
                <h3 style={{ fontSize: "1.45rem", fontWeight: "900", color: "#0a192f", margin: "0 0 2px" }}>
                  {isTamil
                    ? "வாடிக்கையாளர் பிரகடனம் & முன்பதிவு ஏற்பு"
                    : "Declaration & Booking Acceptance"}
                </h3>
                <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: "600" }}>
                  {activeDoc === "toddlers" ? "Toddlers by Raavan Legal Retainer" : "Raavan Studio’z Legal Retainer"}
                </span>
              </div>
            </div>

            <div className="terms-declaration-quote">
              <p>
                {isTamil
                  ? "“படப்பிடிப்பு அமர்வை முன்பதிவு செய்வதன் மூலம், வாடிக்கையாளர் மேற்கூறிய அனைத்து விதிமுறைகளையும் நிபந்தனைகளையும் படித்து, புரிந்து கொண்டு, ஒப்புக்கொண்டதாக உறுதிப்படுத்துகிறார்.”"
                  : "“By booking the session, the client confirms that they have read, understood, and agreed to all the above terms and conditions.”"}
              </p>
            </div>

            <div className="terms-signatures-grid">
              {/* Studio Signatory */}
              <div className="terms-sig-card">
                <span className="terms-sig-role">
                  {isTamil ? "அங்கீகரிக்கப்பட்ட கையொப்பம்" : "Authorized Studio Signatory"}
                </span>
                <p className="terms-sig-name">For, Raavan Studio’z</p>
                <p className="terms-sig-title">Gowtham Raj. R</p>
                <p className="terms-sig-meta">
                  Founder &amp; Creative Director (8+ Years Experience)
                  <br />
                  Official Contact: +91-9500306696 | raavanstudioz24@gmail.com
                </p>
                <div className="terms-stamp-pill">
                  <span>✓ Studio Registered &amp; Verified</span>
                </div>
              </div>

              {/* Client Signatory */}
              <div className="terms-sig-card">
                <span className="terms-sig-role">
                  {isTamil ? "வாடிக்கையாளர் ஏற்பு" : "Client Acknowledgement"}
                </span>
                <p className="terms-sig-name">Client’s Signature</p>
                <p className="terms-sig-title">
                  {isTamil ? "முன்பதிவு வாடிக்கையாளர்" : "Booking Client / Guardian"}
                </p>
                <p className="terms-sig-meta">
                  {isTamil
                    ? "WhatsApp முன்பதிவு மற்றும் ரசீது உறுதிப்படுத்தல் மூலம் மின்னணு முறையில் ஏற்கப்பட்டது."
                    : "Confirmed electronically via WhatsApp booking message & invoice confirmation."}
                  <br />
                  Adjustments informed to +91-9500306696
                </p>
                <div className="terms-stamp-pill" style={{ background: "#e0f2fe", color: "#0369a1" }}>
                  <span>✓ Digitally Acknowledged on Booking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. DIRECT CTA                                                  */}
      {/* ============================================================== */}
      <section className="inc-section-wrap inc-alt-bg" style={{ marginTop: "40px" }}>
        <div className="inc-container">
          <div className="clean-cta-box reveal-scale">
            <h2 className="clean-cta-title">
              {isTamil ? "உங்கள் படப்பிடிப்பு தேதியை உறுதி செய்ய தயாரா?" : "Ready to Lock Your Date on the Studio Calendar?"}
            </h2>
            <p className="clean-cta-desc">
              {isTamil
                ? "விதிமுறைகள் அல்லது பிரத்யேக ஆல்பங்கள் குறித்து மேலும் அறிய திரு. கௌதம் ராஜிடம் நேரடியாக வாட்ஸ்அப்பில் பேசுங்கள்."
                : "Have specific questions regarding packages, album sheets, or dates? Chat directly with Mr. Gowtham Raj on WhatsApp."}
            </p>
            <div className="clean-cta-buttons-row">
              <a
                href={`https://wa.me/919500306696?text=${encodeURIComponent(
                  "Hi Gowtham Raj! I have reviewed the Terms & Conditions and want to book a photography session."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="clean-cta-whatsapp-btn"
              >
                <span>Chat on WhatsApp (+91 9500306696) →</span>
              </a>
              <button
                type="button"
                className="clean-cta-contact-btn"
                onClick={() => onNavigate("/contact")}
              >
                <span>{isTamil ? "ஆன்லைனில் முன்பதிவு செய்ய ↗" : "Book a Session Online ↗"}</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
