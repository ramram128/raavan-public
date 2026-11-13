import { useEffect, useState } from "react";
import { fetchFromApi } from "../api.js";
import {
  faqs,
  paymentSchedule,
  serviceAddons as fallbackAddons,
  servicePackages as fallbackPackages,
  studio,
} from "../content.js";

export default function PricingPage({ onNavigate }) {
  const [packages, setPackages] = useState(fallbackPackages);
  const [addons, setAddons] = useState(fallbackAddons);
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchFromApi("/packages", null).then((data) => {
      if (data && data.all && data.all.length > 0) {
        const formatted = data.all.map((p) => ({
          id: `pkg-${p.id}`,
          name: p.name,
          category: p.category,
          tagline: p.description,
          price: p.price_display,
          duration: p.duration,
          badge: p.badge,
          isFeatured: p.is_featured,
          features: Array.isArray(p.features) ? p.features : (p.features ? [p.features] : []),
        }));
        setPackages(formatted);
      }
    });
  }, []);

  const filteredPackages = packages.filter((p) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "toddlers") return p.category === "newborn_toddler";
    if (selectedCategory === "weddings") return p.category === "wedding";
    return true;
  });

  return (
    <main className="page-container pricing-page" id="pricing-page">
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-badge">Investment &amp; Packages</div>
        <h1>Transparent, Honest Investment.</h1>
        <p className="page-subtitle">
          {studio.tagline} · Clear tier packages for newborns &amp; toddlers with @toddlers_by_raavan, and custom quotes for weddings and grand celebrations. Free travel within 20km radius of Krishnagiri.
        </p>

        {/* Filter Switcher */}
        <div className="segmented-control" style={{ marginTop: "24px", display: "inline-flex" }}>
          <button
            type="button"
            className={`segmented-btn ${selectedCategory === "all" ? "active" : ""}`}
            onClick={() => setSelectedCategory("all")}
          >
            All Collections
          </button>
          <button
            type="button"
            className={`segmented-btn ${selectedCategory === "toddlers" ? "active" : ""}`}
            onClick={() => setSelectedCategory("toddlers")}
          >
            Kutty Chutties (Newborn &amp; Toddlers)
          </button>
          <button
            type="button"
            className={`segmented-btn ${selectedCategory === "weddings" ? "active" : ""}`}
            onClick={() => setSelectedCategory("weddings")}
          >
            Weddings &amp; Celebrations
          </button>
        </div>
      </section>

      {/* Main Packages Grid */}
      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="content-wrapper">
          <div className="packages-grid">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id || pkg.name}
                className={`package-card ${pkg.badge === "Most Popular" || pkg.isFeatured ? "featured" : ""}`}
                style={{
                  position: "relative",
                  background: "var(--color-surface, rgba(255,255,255,0.03))",
                  border: pkg.badge === "Most Popular" ? "1.5px solid #00d4ff" : "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "14px",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {pkg.badge && (
                  <div
                    className="package-badge"
                    style={{
                      position: "absolute",
                      top: "-12px",
                      right: "20px",
                      background: pkg.badge === "Most Popular" ? "#00d4ff" : "rgba(255,255,255,0.15)",
                      color: pkg.badge === "Most Popular" ? "#000" : "#fff",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      padding: "0.25rem 0.75rem",
                      borderRadius: "20px",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    {pkg.badge}
                  </div>
                )}

                <div>
                  <h3 style={{ fontSize: "1.4rem", marginBottom: "0.25rem", color: "#fff" }}>{pkg.name}</h3>
                  <p style={{ fontSize: "0.88rem", opacity: 0.75, minHeight: "2.4em", marginBottom: "1rem" }}>
                    {pkg.tagline}
                  </p>

                  <div className="package-price" style={{ margin: "1rem 0" }}>
                    <span style={{ fontSize: "2rem", fontWeight: 700, color: "#00d4ff" }}>{pkg.price}</span>
                    {pkg.duration && (
                      <span style={{ display: "block", fontSize: "0.85rem", opacity: 0.7, marginTop: "0.2rem" }}>
                        ⏱ {pkg.duration}
                      </span>
                    )}
                  </div>

                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: "1.5rem 0",
                      display: "grid",
                      gap: "0.6rem",
                      fontSize: "0.9rem",
                    }}
                  >
                    {(pkg.features || []).map((feat, idx) => (
                      <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                        <span style={{ color: "#00d4ff", fontWeight: "bold" }}>✓</span>
                        <span style={{ opacity: 0.9 }}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginTop: "1.5rem" }}>
                  <button
                    type="button"
                    className={`btn ${pkg.badge === "Most Popular" ? "btn-primary" : "btn-secondary"}`}
                    style={{ width: "100%", padding: "0.85rem", fontWeight: 600 }}
                    onClick={() => onNavigate("/contact")}
                  >
                    {pkg.price === "Get a Quote" ? "Request Bespoke Quote" : "Book This Session"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-Ons Section */}
      <section className="section" style={{ background: "rgba(0,0,0,0.2)" }}>
        <div className="content-wrapper">
          <div className="section-head-wrap" style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div className="page-badge">Custom Tailoring</div>
            <h2>Add-Ons &amp; Enhancements</h2>
            <p className="section-head-subtitle">
              Enhance any newborn, toddler, or wedding collection with our bespoke additions.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {addons.map((add, idx) => (
              <div
                key={idx}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "10px",
                  padding: "1.5rem",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" }}>
                  <h4 style={{ fontSize: "1.05rem", color: "#fff" }}>{add.name}</h4>
                  <span style={{ color: "#00d4ff", fontWeight: 700, fontSize: "0.95rem" }}>{add.price}</span>
                </div>
                <p style={{ fontSize: "0.85rem", opacity: 0.75, lineHeight: 1.4 }}>{add.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Milestones */}
      <section className="section">
        <div className="content-wrapper">
          <div className="section-head-wrap" style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div className="page-badge">Studio Policy</div>
            <h2>Payment Milestones &amp; Structure</h2>
            <p className="section-head-subtitle">
              Fair, straightforward payments as documented in our client agreement.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
            {paymentSchedule.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: "rgba(0, 212, 255, 0.04)",
                  border: "1px solid rgba(0, 212, 255, 0.15)",
                  borderRadius: "12px",
                  padding: "1.75rem",
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "2rem",
                    fontWeight: 800,
                    color: "#00d4ff",
                    marginBottom: "0.25rem",
                  }}
                >
                  {item.pct}
                </span>
                <h4 style={{ fontSize: "1.1rem", marginBottom: "0.4rem", color: "#fff" }}>{item.label}</h4>
                <p style={{ fontSize: "0.85rem", opacity: 0.8, lineHeight: 1.4 }}>{item.detail}</p>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "2rem",
              padding: "1rem 1.5rem",
              background: "rgba(255,255,255,0.02)",
              borderRadius: "8px",
              border: "1px dashed rgba(255,255,255,0.15)",
              textAlign: "center",
              fontSize: "0.9rem",
              opacity: 0.85,
            }}
          >
            📄 Read full details on extra sheets (₹550/sheet) and cancellation rights on our{" "}
            <a href="/terms" onClick={(e) => { e.preventDefault(); onNavigate("/terms"); }} style={{ color: "#00d4ff", textDecoration: "underline" }}>
              Terms &amp; Conditions Page
            </a>.
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section" style={{ background: "rgba(0,0,0,0.15)" }}>
        <div className="content-wrapper" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div className="section-head-wrap" style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div className="page-badge">Common Questions</div>
            <h2>Everything you need to know</h2>
          </div>

          <div style={{ display: "grid", gap: "1rem" }}>
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    style={{
                      width: "100%",
                      padding: "1.25rem 1.5rem",
                      background: "transparent",
                      border: "none",
                      color: "#fff",
                      fontSize: "1.05rem",
                      fontWeight: 600,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span>{faq.question}</span>
                    <span style={{ fontSize: "1.2rem", color: "#00d4ff", transform: isOpen ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <div style={{ padding: "0 1.5rem 1.25rem", opacity: 0.85, fontSize: "0.95rem", lineHeight: 1.6 }}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
