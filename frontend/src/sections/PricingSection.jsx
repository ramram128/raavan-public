import { useEffect, useState } from "react";
import { fetchFromApi } from "../api.js";
import { paymentSchedule, servicePackages as fallbackPackages, studio } from "../content.js";

export default function PricingSection({ onNavigate }) {
  const [packages, setPackages] = useState(fallbackPackages);

  useEffect(() => {
    fetchFromApi("/packages", null).then((data) => {
      if (data && data.all && data.all.length > 0) {
        const formatted = data.all.map((p) => ({
          id: `pkg-${p.id}`,
          name: p.name,
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

  return (
    <section className="home-section section-pricing" id="pricing" aria-label="Pricing and Packages">
      <div className="section-head-wrap">
        <div className="page-badge" style={{ color: "#00d4ff", borderColor: "rgba(0, 212, 255, 0.4)" }}>
          Transparent Investment
        </div>
        <h2>Make a count, Click the moment.</h2>
        <p className="section-head-subtitle">
          Transparent collections starting from ₹2,500/- for newborn &amp; toddler sessions, up to bespoke wedding documentation. Free travel within 20km from Krishnagiri.
        </p>
      </div>

      <div className="content-wrapper">
        <div className="packages-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
          {packages.slice(0, 4).map((pkg) => (
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
                  }}
                >
                  {pkg.badge}
                </div>
              )}

              <div>
                <h3 style={{ fontSize: "1.35rem", marginBottom: "0.3rem", color: "#fff" }}>{pkg.name}</h3>
                <div className="package-price" style={{ margin: "1rem 0" }}>
                  <span style={{ fontSize: "1.85rem", fontWeight: 700, color: "#00d4ff" }}>{pkg.price}</span>
                  {pkg.duration && (
                    <span style={{ display: "block", fontSize: "0.82rem", opacity: 0.7, marginTop: "0.2rem" }}>
                      ⏱ {pkg.duration}
                    </span>
                  )}
                </div>

                <ul style={{ listStyle: "none", padding: 0, margin: "1.25rem 0", display: "grid", gap: "0.5rem", fontSize: "0.88rem" }}>
                  {(pkg.features || []).map((feat, idx) => (
                    <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "0.4rem" }}>
                      <span style={{ color: "#00d4ff" }}>✓</span>
                      <span style={{ opacity: 0.85 }}>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: "1rem" }}>
                <button
                  type="button"
                  className={`btn ${pkg.badge === "Most Popular" ? "btn-primary" : "btn-secondary"}`}
                  style={{ width: "100%", padding: "0.75rem" }}
                  onClick={() => onNavigate("/contact")}
                >
                  Book Session
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => onNavigate("/pricing")}
          >
            Explore All Packages &amp; Add-Ons →
          </button>
        </div>
      </div>
    </section>
  );
}
