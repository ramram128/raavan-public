import { useEffect, useState } from "react";
import { fetchFromApi } from "../api.js";
import { termsConditions as fallbackTerms, studio } from "../content.js";

export default function TermsPage({ onNavigate }) {
  const [terms, setTerms] = useState(fallbackTerms);
  const [language, setLanguage] = useState("ta"); // 'ta', 'en', 'both'
  const [activeTab, setActiveTab] = useState("all"); // 'all', 'general', 'toddlers'

  useEffect(() => {
    fetchFromApi("/terms", null).then((data) => {
      if (data && data.all && data.all.length > 0) {
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
    <div className="clean-subpage-root terms-page-root" id="terms-page">
      {/* ============================================================== */}
      {/* 1. HERO HEADER                                                 */}
      {/* ============================================================== */}
      <section className="clean-page-hero">
        <div className="inc-container">
          <div className="clean-hero-badge-wrap">
            <span className="clean-eyebrow-tag">STUDIO TRANSPARENCY &amp; CLIENT AGREEMENT</span>
          </div>
          <h1 className="clean-page-title">
            Terms &amp; Conditions <span className="title-ta-sub">(விதிமுறைகள் மற்றும் நிபந்தனைகள்)</span>
          </h1>
          <p className="clean-page-subtitle">
            Clear, honest policies for all wedding photography commissions, newborn sessions by <strong>@toddlers_by_raavan</strong>, and handcrafted photobooks.
          </p>

          {/* Controls: Language and Section Filters */}
          <div className="terms-controls-row">
            {/* Language Selector */}
            <div className="terms-pill-group" role="group" aria-label="Language selector">
              <button
                type="button"
                className={`terms-toggle-pill${language === "ta" ? " active" : ""}`}
                onClick={() => setLanguage("ta")}
              >
                தமிழ் (Tamil)
              </button>
              <button
                type="button"
                className={`terms-toggle-pill${language === "en" ? " active" : ""}`}
                onClick={() => setLanguage("en")}
              >
                English
              </button>
              <button
                type="button"
                className={`terms-toggle-pill${language === "both" ? " active" : ""}`}
                onClick={() => setLanguage("both")}
              >
                Bilingual (இருமொழிகளிலும்)
              </button>
            </div>

            {/* Category Selector */}
            <div className="terms-pill-group" role="group" aria-label="Section selector">
              <button
                type="button"
                className={`terms-toggle-pill${activeTab === "all" ? " active" : ""}`}
                onClick={() => setActiveTab("all")}
              >
                All Policies
              </button>
              <button
                type="button"
                className={`terms-toggle-pill${activeTab === "general" ? " active" : ""}`}
                onClick={() => setActiveTab("general")}
              >
                Weddings &amp; General
              </button>
              <button
                type="button"
                className={`terms-toggle-pill${activeTab === "toddlers" ? " active" : ""}`}
                onClick={() => setActiveTab("toddlers")}
              >
                Toddlers &amp; Babies
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. TERMS CARDS LIST                                            */}
      {/* ============================================================== */}
      <section className="inc-section-wrap terms-content-section">
        <div className="inc-container">
          <div className="terms-cards-stack">
            {filteredTerms.map((item, idx) => (
              <article
                key={item.id}
                className={`clean-terms-card reveal-on-scroll stagger-${(idx % 3) + 1}`}
              >
                <div className="terms-card-header">
                  <span className="terms-number-badge">{item.num}</span>
                  <div className="terms-card-titles">
                    {(language === "en" || language === "both") && (
                      <h3 className="terms-title-en">{item.titleEn}</h3>
                    )}
                    {(language === "ta" || language === "both") && (
                      <h4 className="terms-title-ta">{item.titleTa}</h4>
                    )}
                  </div>
                  <span className="terms-section-tag">
                    {item.section === "toddlers" ? "Toddlers / Babies" : "Weddings & General"}
                  </span>
                </div>

                <div className="terms-card-body">
                  {(language === "ta" || language === "both") && (
                    <div className="terms-text-pane terms-text-ta">
                      <p>{item.contentTa}</p>
                    </div>
                  )}

                  {(language === "en" || language === "both") && (
                    <div className="terms-text-pane terms-text-en">
                      <p>{item.contentEn}</p>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* Questions Callout */}
          <div className="clean-cta-box reveal-scale" style={{ marginTop: "48px" }}>
            <h3 className="clean-cta-title">Have Questions About Any Policy?</h3>
            <p className="clean-cta-desc">
              We believe in complete transparency. Feel free to discuss any specific clause with Mr. Gowtham Raj.
            </p>
            <div className="clean-cta-buttons-row">
              <a
                href={`https://wa.me/919500306696?text=${encodeURIComponent(
                  "Hi Gowtham Raj! I have a question regarding Raavan Studio’z booking terms."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="clean-cta-whatsapp-btn"
              >
                <span>Clarify on WhatsApp →</span>
              </a>
              <button
                type="button"
                className="clean-cta-contact-btn"
                onClick={() => onNavigate("/contact")}
              >
                <span>Contact Studio Office ↗</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
