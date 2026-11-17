import React, { useState } from "react";
import {
  CmsSectionCard,
  CmsTextInput,
} from "./CmsComponents.jsx";

export default function ContactCmsEditor({ content, onSave, onReset, saving }) {
  const [formData, setFormData] = useState(content || {});

  const updateHeader = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      header: { ...(prev.header || {}), [field]: value },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave("contact", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="cms-page-editor-form">
      <div className="cms-editor-header-bar">
        <div>
          <h2 className="cms-main-title">📞 Contact & Booking Page Cockpit</h2>
          <p className="cms-main-desc">
            Edit the contact page invitation, studio operating hours, and WhatsApp chat prompt.
          </p>
        </div>
        <div className="cms-action-buttons-group">
          <button type="button" className="cms-reset-btn" onClick={() => onReset("contact")} disabled={saving}>
            🔄 Reset Defaults
          </button>
          <button type="submit" className="cms-save-btn" disabled={saving}>
            {saving ? "⏳ Saving Changes..." : "💾 Save Changes to Live Website"}
          </button>
        </div>
      </div>

      <CmsSectionCard icon="📍" title="Contact Header & Intro" subtitle="Appears at the top of the Contact page">
        <CmsTextInput
          label="Small Category Tag"
          value={formData.header?.tag}
          onChange={(val) => updateHeader("tag", val)}
          placeholder="e.g. GET IN TOUCH"
        />
        <CmsTextInput
          label="Main Headline"
          value={formData.header?.title}
          onChange={(val) => updateHeader("title", val)}
          placeholder="e.g. Visit Our Krishnagiri Studios or Message Us"
        />
        <CmsTextInput
          label="Subtitle / Welcome Note"
          value={formData.header?.subtitle}
          onChange={(val) => updateHeader("subtitle", val)}
          rows={2}
        />
      </CmsSectionCard>

      <CmsSectionCard icon="⏰" title="Studio Timings & Messaging CTA" subtitle="Guides clients on when and how to reach Gowtham Raj">
        <CmsTextInput
          label="Studio Operating Hours"
          value={formData.hours}
          onChange={(val) => setFormData((prev) => ({ ...prev, hours: val }))}
          placeholder="e.g. Monday to Sunday: 9:00 AM – 9:00 PM"
        />
        <CmsTextInput
          label="WhatsApp Prompt Button Text"
          value={formData.whatsapp_cta}
          onChange={(val) => setFormData((prev) => ({ ...prev, whatsapp_cta: val }))}
          placeholder="e.g. Chat Directly with Gowtham Raj on WhatsApp"
        />
      </CmsSectionCard>

      <div className="cms-bottom-save-bar">
        <span>Ready to publish changes to your live website?</span>
        <div style={{ display: "flex", gap: "12px" }}>
          <button type="button" className="cms-reset-btn" onClick={() => onReset("contact")} disabled={saving}>
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
