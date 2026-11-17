import React, { useState } from "react";

export function CmsImageUploader({ label, value, onChange, hint }) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("image", file);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (res.ok) {
        const data = await res.json();
        onChange(data.url);
      } else {
        alert("Upload failed. Please ensure file is an image under 10MB.");
      }
    } catch (err) {
      alert("Network error while uploading image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="cms-field-block">
      <div className="cms-label-row">
        <label className="cms-field-label">{label}</label>
        {hint && <span className="cms-field-hint">{hint}</span>}
      </div>
      <div className="cms-image-preview-row">
        <div className="cms-thumb-container">
          {value ? (
            <img src={value} alt="Preview" className="cms-preview-thumb" />
          ) : (
            <div className="cms-preview-placeholder">No Image</div>
          )}
        </div>
        <div className="cms-image-inputs">
          <input
            type="text"
            className="cms-text-input"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Image path or URL"
          />
          <label className={`cms-upload-pill-btn${uploading ? " disabled" : ""}`}>
            {uploading ? "⏳ Uploading..." : "📤 Upload New Photo"}
            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              disabled={uploading}
              style={{ display: "none" }}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export function DestinationSelect({ value, onChange, label = "Button Destination Page" }) {
  const destinations = [
    { label: "📸 Gallery Page", value: "/gallery" },
    { label: "💰 Pricing & Packages", value: "/pricing" },
    { label: "👶 Kutty Chutties (Baby Studio)", value: "/kutty-chutties" },
    { label: "✨ All Services", value: "/services" },
    { label: "ℹ️ About Our Studio", value: "/about" },
    { label: "📞 Contact & Booking Form", value: "/contact" },
    { label: "💬 WhatsApp Chat Direct", value: "https://wa.me/919500306696" },
  ];

  return (
    <div className="cms-field-block">
      <label className="cms-field-label">{label}</label>
      <select
        className="cms-select-input"
        value={value || "/contact"}
        onChange={(e) => onChange(e.target.value)}
      >
        {destinations.map((d) => (
          <option key={d.value} value={d.value}>
            {d.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function CmsTextInput({ label, value, onChange, placeholder, hint, rows = 1 }) {
  return (
    <div className="cms-field-block">
      <div className="cms-label-row">
        <label className="cms-field-label">{label}</label>
        {hint && <span className="cms-field-hint">{hint}</span>}
      </div>
      {rows > 1 ? (
        <textarea
          className="cms-textarea-input"
          rows={rows}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <input
          type="text"
          className="cms-text-input"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

export function CmsSectionCard({ icon, title, subtitle, badge, children }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="cms-section-card">
      <div className="cms-card-header" onClick={() => setOpen(!open)} role="button" tabIndex={0}>
        <div className="cms-header-left">
          <span className="cms-header-icon">{icon}</span>
          <div>
            <div className="cms-header-title-row">
              <h3 className="cms-card-title">{title}</h3>
              {badge && <span className="cms-badge">{badge}</span>}
            </div>
            {subtitle && <p className="cms-card-subtitle">{subtitle}</p>}
          </div>
        </div>
        <button type="button" className="cms-collapse-btn">
          {open ? "▲ Collapse" : "▼ Edit"}
        </button>
      </div>

      {open && <div className="cms-card-body">{children}</div>}
    </div>
  );
}
