import React, { useState } from "react";
import {
  CmsSectionCard,
  CmsTextInput,
  DestinationSelect,
} from "./CmsComponents.jsx";

export default function KuttyCmsEditor({ content, onSave, onReset, saving }) {
  const [formData, setFormData] = useState(content || {});

  const updateHero = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      hero: { ...(prev.hero || {}), [field]: value },
    }));
  };

  const updateSafety = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      safety_banner: { ...(prev.safety_banner || {}), [field]: value },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave("kutty_chutties", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="cms-page-editor-form">
      <div className="cms-editor-header-bar">
        <div>
          <h2 className="cms-main-title">👶 Kutty Chutties Content Cockpit</h2>
          <p className="cms-main-desc">
            Edit the headlines, baby safety promises, package buttons, and WhatsApp booking prompts for your dedicated newborn and toddler studio.
          </p>
        </div>
        <div className="cms-action-buttons-group">
          <button type="button" className="cms-reset-btn" onClick={() => onReset("kutty_chutties")} disabled={saving}>
            🔄 Reset Defaults
          </button>
          <button type="submit" className="cms-save-btn" disabled={saving}>
            {saving ? "⏳ Saving Changes..." : "💾 Save Changes to Live Website"}
          </button>
        </div>
      </div>

      {/* 1. HERO */}
      <CmsSectionCard icon="🍼" title="Baby Studio Hero Headline" subtitle="The top hero section on the Kutty Chutties page">
        <CmsTextInput
          label="Brand Tag"
          value={formData.hero?.brandTag}
          onChange={(val) => updateHero("brandTag", val)}
          placeholder="e.g. RAAVAN KUTTY CHUTTIES"
        />
        <CmsTextInput
          label="Main Big Headline"
          value={formData.hero?.headline}
          onChange={(val) => updateHero("headline", val)}
          placeholder="e.g. Krishnagiri's Premier Baby Milestone Studio"
        />
        <CmsTextInput
          label="Subtitle / Story"
          value={formData.hero?.subheadline}
          onChange={(val) => updateHero("subheadline", val)}
          rows={3}
        />
        <div className="cms-two-col-grid">
          <CmsTextInput
            label="Packages Button Label"
            value={formData.hero?.primaryBtnLabel}
            onChange={(val) => updateHero("primaryBtnLabel", val)}
            placeholder="e.g. Explore Baby Packages ↗"
          />
          <CmsTextInput
            label="WhatsApp Button Label"
            value={formData.hero?.whatsappBtnLabel}
            onChange={(val) => updateHero("whatsappBtnLabel", val)}
            placeholder="e.g. Check Available Slots on WhatsApp"
          />
        </div>
      </CmsSectionCard>

      {/* 2. SAFETY BANNER */}
      <CmsSectionCard icon="🛡️" title="Baby Safety & Hygiene Guarantee" subtitle="Reassures new parents about clean and safe studio practices">
        <CmsTextInput
          label="Guarantee Headline"
          value={formData.safety_banner?.title}
          onChange={(val) => updateSafety("title", val)}
          placeholder="e.g. 100% Baby-Safe & Sanitized Environment"
        />
        <CmsTextInput
          label="Guarantee Description"
          value={formData.safety_banner?.description}
          onChange={(val) => updateSafety("description", val)}
          rows={3}
        />
      </CmsSectionCard>

      <div className="cms-bottom-save-bar">
        <span>Ready to publish changes to your live website?</span>
        <div style={{ display: "flex", gap: "12px" }}>
          <button type="button" className="cms-reset-btn" onClick={() => onReset("kutty_chutties")} disabled={saving}>
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
