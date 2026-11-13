import { useEffect, useState } from "react";
import { fetchFromApi } from "../api.js";
import { termsConditions as fallbackTerms, studio } from "../content.js";

export default function TermsPage({ onNavigate }) {
  const [terms, setTerms] = useState(fallbackTerms);
  const [language, setLanguage] = useState("ta"); // default to Tamil / bilingual
  const [activeTab, setActiveTab] = useState("all"); // 'all', 'general', 'toddlers'

  useEffect(() => {
    fetchFromApi("/terms", null).then((data) => {
      if (data && data.all && data.all.length > 0) {
        // Map API format to component format
        const formatted = data.all.map((item) => ({
          id: `tc-${item.id}`,
          section: item.section_type,
          num: item.section_number || `0${item.order}`,
          titleEn: item.title_en,
          titleTa: item.title_ta || item.title_en,
          contentEn: item.content_en,
          contentTa: item.content_ta || item.content_en,
        }));
        setTerms(formatted);
      }
    });
  }, []);

  const filteredTerms = terms.filter((item) => {
    if (activeTab === "all") return true;
    return item.section === activeTab;
  });

  return (
    <main className="page-shell terms-page" id="main-content">
      <section className="page-hero">
        <div className="container">
          <p className="section-eyebrow">Studio Transparency & Client Agreement</p>
          <h1 className="page-title">
            Terms &amp; Conditions <span className="title-ta">(விதிமுறைகள் மற்றும் நிபந்தனைகள்)</span>
          </h1>
          <p className="page-lead">
            Clear, honest policies for all photography commissions, newborn sessions by @toddlers_by_raavan, and heirloom photobooks.
          </p>

          <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", flexWrap: "wrap", alignItems: "center" }}>
            <div className="segmented-control" role="group" aria-label="Language selector">
              <button
                type="button"
                className={`segmented-btn ${language === "ta" ? "active" : ""}`}
                onClick={() => setLanguage("ta")}
              >
                தமிழ் (Tamil)
              </button>
              <button
                type="button"
                className={`segmented-btn ${language === "en" ? "active" : ""}`}
                onClick={() => setLanguage("en")}
              >
                English
              </button>
              <button
                type="button"
                className={`segmented-btn ${language === "both" ? "active" : ""}`}
                onClick={() => setLanguage("both")}
              >
                Bilingual (இருமொழிகளிலும்)
              </button>
            </div>

            <div className="segmented-control" role="group" aria-label="Section selector">
              <button
                type="button"
                className={`segmented-btn ${activeTab === "all" ? "active" : ""}`}
                onClick={() => setActiveTab("all")}
              >
                All Terms ({terms.length})
              </button>
              <button
                type="button"
                className={`segmented-btn ${activeTab === "general" ? "active" : ""}`}
                onClick={() => setActiveTab("general")}
              >
                General Photography
              </button>
              <button
                type="button"
                className={`segmented-btn ${activeTab === "toddlers" ? "active" : ""}`}
                onClick={() => setActiveTab("toddlers")}
              >
                Toddlers by Raavan
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="terms-grid" style={{ display: "grid", gap: "1.5rem" }}>
            {filteredTerms.map((item) => (
              <article
                key={item.id}
                className="terms-card"
                style={{
                  background: "var(--color-surface, rgba(255,255,255,0.03))",
                  border: "1px solid var(--color-border, rgba(255,255,255,0.1))",
                  borderRadius: "12px",
                  padding: "1.75rem",
                  transition: "border-color 0.2s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontWeight: 700,
                      color: "var(--color-accent, #00d4ff)",
                      fontSize: "0.9rem",
                      padding: "0.2rem 0.5rem",
                      borderRadius: "4px",
                      background: "rgba(0, 212, 255, 0.1)",
                    }}
                  >
                    {item.num}
                  </span>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      opacity: 0.65,
                    }}
                  >
                    {item.section === "toddlers" ? "@toddlers_by_raavan" : "Raavan Studio’z"}
                  </span>
                </div>

                {(language === "en" || language === "both") && (
                  <div style={{ marginBottom: language === "both" ? "1rem" : 0 }}>
                    <h2 style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: "0.4rem", color: "#fff" }}>
                      {item.titleEn}
                    </h2>
                    <p style={{ opacity: 0.85, lineHeight: 1.6, fontSize: "0.95rem" }}>
                      {item.contentEn}
                    </p>
                  </div>
                )}

                {(language === "ta" || language === "both") && (
                  <div style={{ borderTop: language === "both" ? "1px dashed rgba(255,255,255,0.1)" : "none", paddingTop: language === "both" ? "1rem" : 0 }}>
                    <h2 style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: "0.4rem", color: "#7de3ff" }}>
                      {item.titleTa}
                    </h2>
                    <p style={{ opacity: 0.88, lineHeight: 1.7, fontSize: "0.95rem" }}>
                      {item.contentTa}
                    </p>
                  </div>
                )}
              </article>
            ))}
          </div>

          <div
            style={{
              marginTop: "3rem",
              padding: "2rem",
              background: "rgba(0, 212, 255, 0.05)",
              border: "1px solid rgba(0, 212, 255, 0.2)",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <h3 style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>Questions About Our Policies?</h3>
            <p style={{ opacity: 0.8, maxWidth: "600px", margin: "0 auto 1.5rem" }}>
              We are committed to clear and fair client relationships. Reach out to Mr. Gowtham Raj and our team directly for custom package enquiries or adjustments.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href={`https://wa.me/919500306696?text=Hi%20Raavan%20Studio%E2%80%99z!%20I%20have%20a%20question%20regarding%20the%20booking%20terms.`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
              >
                <span>Chat on WhatsApp (+91-9500306696)</span>
              </a>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => onNavigate("/contact")}
              >
                Open Enquiry Form
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

