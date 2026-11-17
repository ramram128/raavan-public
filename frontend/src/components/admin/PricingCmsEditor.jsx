import React, { useState } from "react";
import {
  CmsSectionCard,
  CmsTextInput,
} from "./CmsComponents.jsx";

export default function PricingCmsEditor({ content, onSave, onReset, saving }) {
  const [formData, setFormData] = useState(content || {});

  const updateBanner = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      banner: { ...(prev.banner || {}), [field]: value },
    }));
  };

  const updateSchedule = (idx, field, value) => {
    setFormData((prev) => {
      const items = [...(prev.payment_schedule || [])];
      items[idx] = { ...(items[idx] || {}), [field]: value };
      return { ...prev, payment_schedule: items };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave("pricing", formData);
  };

  const schedule = formData.payment_schedule || [];

  return (
    <form onSubmit={handleSubmit} className="cms-page-editor-form">
      <div className="cms-editor-header-bar">
        <div>
          <h2 className="cms-main-title">💰 Pricing & Policies Content Cockpit</h2>
          <p className="cms-main-desc">
            Manage your pricing page banner text, transparency notes, and payment milestone schedule.
          </p>
        </div>
        <div className="cms-action-buttons-group">
          <button type="button" className="cms-reset-btn" onClick={() => onReset("pricing")} disabled={saving}>
            🔄 Reset Defaults
          </button>
          <button type="submit" className="cms-save-btn" disabled={saving}>
            {saving ? "⏳ Saving Changes..." : "💾 Save Changes to Live Website"}
          </button>
        </div>
      </div>

      <CmsSectionCard icon="🏷️" title="Pricing Page Intro Banner" subtitle="The headline card at the top of the pricing page">
        <CmsTextInput
          label="Small Category Tag"
          value={formData.banner?.tag}
          onChange={(val) => updateBanner("tag", val)}
          placeholder="e.g. INVESTMENT & PACKAGES"
        />
        <CmsTextInput
          label="Main Headline"
          value={formData.banner?.title}
          onChange={(val) => updateBanner("title", val)}
          placeholder="e.g. Transparent Pricing With No Hidden Fees"
        />
        <CmsTextInput
          label="Subtitle / Inclusions Note"
          value={formData.banner?.subtitle}
          onChange={(val) => updateBanner("subtitle", val)}
          rows={2}
        />
      </CmsSectionCard>

      <div className="cms-category-header">
        <h3>Payment Milestones & Schedule</h3>
        <p>Outlines advance payment and delivery terms clearly to clients.</p>
      </div>

      {schedule.map((st, idx) => (
        <CmsSectionCard key={idx} icon="💳" title={`Payment Milestone #${st.step || idx + 1}: ${st.title || ""}`}>
          <div className="cms-two-col-grid">
            <CmsTextInput
              label="Percentage / Amount"
              value={st.pct}
              onChange={(val) => updateSchedule(idx, "pct", val)}
              placeholder="e.g. 25%"
            />
            <CmsTextInput
              label="Milestone Title"
              value={st.title}
              onChange={(val) => updateSchedule(idx, "title", val)}
              placeholder="e.g. Advance Booking"
            />
          </div>
          <CmsTextInput
            label="Explanation / Terms"
            value={st.desc}
            onChange={(val) => updateSchedule(idx, "desc", val)}
            rows={2}
          />
        </CmsSectionCard>
      ))}

      <div className="cms-bottom-save-bar">
        <span>Ready to publish changes to your live website?</span>
        <div style={{ display: "flex", gap: "12px" }}>
          <button type="button" className="cms-reset-btn" onClick={() => onReset("pricing")} disabled={saving}>
            Reset
          </button>
          <button type="submit" className="cms-save-btn" disabled={saving}>
            {saving ? "⏳ Saving Changes..." : "💾 Save Changes to Live Website"}
          </button>
        </div>
      </div>
    </form>
  );
}
