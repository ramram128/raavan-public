import React, { useState } from "react";
import {
  CmsSectionCard,
  CmsTextInput,
  DestinationSelect,
} from "./CmsComponents.jsx";

export default function AboutCmsEditor({ content, onSave, onReset, saving }) {
  const [formData, setFormData] = useState(content || {});

  const updateHero = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      hero: { ...(prev.hero || {}), [field]: value },
    }));
  };

  const updatePillar = (idx, field, value) => {
    setFormData((prev) => {
      const items = [...(prev.philosophy || [])];
      items[idx] = { ...(items[idx] || {}), [field]: value };
      return { ...prev, philosophy: items };
    });
  };

  const updateStep = (idx, field, value) => {
    setFormData((prev) => {
      const items = [...(prev.process_steps || [])];
      items[idx] = { ...(items[idx] || {}), [field]: value };
      return { ...prev, process_steps: items };
    });
  };

  const updateCta = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      cta: { ...(prev.cta || {}), [field]: value },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave("about", formData);
  };

  const pillars = formData.philosophy || [];
  const steps = formData.process_steps || [];

  return (
    <form onSubmit={handleSubmit} className="cms-page-editor-form">
      <div className="cms-editor-header-bar">
        <div>
          <h2 className="cms-main-title">ℹ️ About Us Page Content Cockpit</h2>
          <p className="cms-main-desc">
            Update your founder story, creative philosophy pillars, process milestones, and bottom booking call-to-action.
          </p>
        </div>
        <div className="cms-action-buttons-group">
          <button
            type="button"
            className="cms-reset-btn"
            onClick={() => onReset("about")}
            disabled={saving}
          >
            🔄 Reset Defaults
          </button>
          <button type="submit" className="cms-save-btn" disabled={saving}>
            {saving ? "⏳ Saving Changes..." : "💾 Save Changes to Live Website"}
          </button>
        </div>
      </div>

      {/* 1. HERO */}
      <CmsSectionCard icon="🏷️" title="About Page Hero Tagline" subtitle="Appears at the top of the About page">
        <CmsTextInput
          label="Small Tag"
          value={formData.hero?.tag}
          onChange={(val) => updateHero("tag", val)}
          placeholder="e.g. OUR ORIGIN STORY"
        />
        <CmsTextInput
          label="Main Headline"
          value={formData.hero?.title}
          onChange={(val) => updateHero("title", val)}
          placeholder="e.g. Crafting Cinematic Heirlooms From Unscripted Moments"
        />
        <CmsTextInput
          label="Hero Subtitle"
          value={formData.hero?.subtitle}
          onChange={(val) => updateHero("subtitle", val)}
          rows={2}
        />
      </CmsSectionCard>

      {/* 2. PHILOSOPHY PILLARS */}
      <div className="cms-category-header">
        <h3>Creative Philosophy Pillars</h3>
        <p>The 4 cards detailing what sets Raavan Studio'z apart.</p>
      </div>

      {pillars.map((p, idx) => (
        <CmsSectionCard key={idx} icon="✨" title={`Pillar #${idx + 1}: ${p.title || "Philosophy"}`}>
          <CmsTextInput
            label="Pillar Title"
            value={p.title}
            onChange={(val) => updatePillar(idx, "title", val)}
          />
          <CmsTextInput
            label="Pillar Description"
            value={p.description}
            onChange={(val) => updatePillar(idx, "description", val)}
            rows={2}
          />
        </CmsSectionCard>
      ))}

      {/* 3. PROCESS STEPS */}
      <div className="cms-category-header">
        <h3>Client Experience Process</h3>
        <p>The step-by-step milestones (01 First Hello, 02 Planning, etc.)</p>
      </div>

      {steps.map((st, idx) => (
        <CmsSectionCard key={idx} icon="👣" title={`Step #${st.step || idx + 1}: ${st.title || "Step"}`}>
          <div className="cms-two-col-grid">
            <CmsTextInput
              label="Step Number"
              value={st.step}
              onChange={(val) => updateStep(idx, "step", val)}
              placeholder="e.g. 01"
            />
            <CmsTextInput
              label="Step Title"
              value={st.title}
              onChange={(val) => updateStep(idx, "title", val)}
              placeholder="e.g. First Hello"
            />
          </div>
          <CmsTextInput
            label="Step Description"
            value={st.desc}
            onChange={(val) => updateStep(idx, "desc", val)}
            rows={2}
          />
        </CmsSectionCard>
      ))}

      {/* 4. BOTTOM CTA */}
      <CmsSectionCard icon="📣" title="Bottom Call-to-Action Banner" subtitle="The final invitation card before the footer">
        <CmsTextInput
          label="Banner Title"
          value={formData.cta?.title}
          onChange={(val) => updateCta("title", val)}
          placeholder="e.g. Let's Tell Your Visual Story Together"
        />
        <CmsTextInput
          label="Banner Subtitle"
          value={formData.cta?.subtitle}
          onChange={(val) => updateCta("subtitle", val)}
          rows={2}
        />
        <div className="cms-two-col-grid">
          <CmsTextInput
            label="Button Label"
            value={formData.cta?.buttonLabel}
            onChange={(val) => updateCta("buttonLabel", val)}
            placeholder="e.g. Start a Conversation"
          />
          <DestinationSelect
            value={formData.cta?.buttonPath}
            onChange={(val) => updateCta("buttonPath", val)}
          />
        </div>
      </CmsSectionCard>

      <div className="cms-bottom-save-bar">
        <span>Ready to publish changes to your live website?</span>
        <div style={{ display: "flex", gap: "12px" }}>
          <button type="button" className="cms-reset-btn" onClick={() => onReset("about")} disabled={saving}>
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
