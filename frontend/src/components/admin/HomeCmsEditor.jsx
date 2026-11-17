import React, { useState } from "react";
import {
  CmsSectionCard,
  CmsTextInput,
  CmsImageUploader,
  DestinationSelect,
} from "./CmsComponents.jsx";

export default function HomeCmsEditor({ content, onSave, onReset, saving }) {
  const [formData, setFormData] = useState(content || {});

  const updateField = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        [field]: value,
      },
    }));
  };

  const updateSlide = (index, field, value) => {
    setFormData((prev) => {
      const slides = [...(prev.hero_slides || [])];
      slides[index] = { ...(slides[index] || {}), [field]: value };
      return { ...prev, hero_slides: slides };
    });
  };

  const updateSlideCta = (slideIndex, ctaKey, field, value) => {
    setFormData((prev) => {
      const slides = [...(prev.hero_slides || [])];
      slides[slideIndex] = {
        ...(slides[slideIndex] || {}),
        [ctaKey]: {
          ...(slides[slideIndex]?.[ctaKey] || {}),
          [field]: value,
        },
      };
      return { ...prev, hero_slides: slides };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave("home", formData);
  };

  const heroSlides = formData.hero_slides || [];

  return (
    <form onSubmit={handleSubmit} className="cms-page-editor-form">
      {/* Top Action Bar */}
      <div className="cms-editor-header-bar">
        <div>
          <h2 className="cms-main-title">🏠 Home Page Content Cockpit</h2>
          <p className="cms-main-desc">
            Directly customize the widescreen hero banners, section headlines, storytelling text, and button labels across your homepage.
          </p>
        </div>
        <div className="cms-action-buttons-group">
          <button
            type="button"
            className="cms-reset-btn"
            onClick={() => onReset("home")}
            disabled={saving}
          >
            🔄 Reset Defaults
          </button>
          <button type="submit" className="cms-save-btn" disabled={saving}>
            {saving ? "⏳ Saving Changes..." : "💾 Save Changes to Live Website"}
          </button>
        </div>
      </div>

      {/* 1. HERO SLIDES */}
      <div className="cms-category-header">
        <h3>1. Widescreen Hero Banners (Slider)</h3>
        <p>These 3 slides auto-rotate at the very top of your homepage.</p>
      </div>

      {heroSlides.map((slide, idx) => (
        <CmsSectionCard
          key={idx}
          icon="🎞️"
          title={`Hero Banner Slide #${idx + 1}`}
          subtitle={slide.title || `Slide ${idx + 1}`}
          badge={idx === 0 ? "Default First Slide" : null}
        >
          <CmsImageUploader
            label="Banner Background Image"
            value={slide.image}
            onChange={(val) => updateSlide(idx, "image", val)}
            hint="Recommended: 16:9 widescreen photo (e.g. 1920x1080)"
          />

          <CmsTextInput
            label="Main Big Headline"
            value={slide.title}
            onChange={(val) => updateSlide(idx, "title", val)}
            placeholder="e.g. Preserving Every Precious Wedding Moment."
            hint="Keep under 10 words for high visual impact."
          />

          <CmsTextInput
            label="Subtitle / Story Description"
            value={slide.subtitle}
            onChange={(val) => updateSlide(idx, "subtitle", val)}
            placeholder="Describe your photography approach in 1–2 sentences."
            rows={2}
          />

          <div className="cms-two-col-grid">
            <div className="cms-nested-card">
              <h4>🔘 Primary Button (Highlighted)</h4>
              <CmsTextInput
                label="Button Label"
                value={slide.primaryCta?.label}
                onChange={(val) => updateSlideCta(idx, "primaryCta", "label", val)}
                placeholder="e.g. View Wedding Gallery ↗"
              />
              <DestinationSelect
                value={slide.primaryCta?.path}
                onChange={(val) => updateSlideCta(idx, "primaryCta", "path", val)}
              />
            </div>

            <div className="cms-nested-card">
              <h4>🔘 Secondary Button (Transparent)</h4>
              <CmsTextInput
                label="Button Label"
                value={slide.secondaryCta?.label}
                onChange={(val) => updateSlideCta(idx, "secondaryCta", "label", val)}
                placeholder="e.g. Book a Session"
              />
              <DestinationSelect
                value={slide.secondaryCta?.path}
                onChange={(val) => updateSlideCta(idx, "secondaryCta", "path", val)}
              />
            </div>
          </div>
        </CmsSectionCard>
      ))}

      {/* 2. WEDDING SHOWCASE BLOCK */}
      <div className="cms-category-header">
        <h3>2. Featured Service Blocks on Homepage</h3>
        <p>The 3 editorial story sections showcasing your core services.</p>
      </div>

      <CmsSectionCard
        icon="💍"
        title="Wedding Story Block"
        subtitle="Appears right under the about intro on homepage."
      >
        <CmsTextInput
          label="Small Category Tag"
          value={formData.wedding_block?.tag}
          onChange={(val) => updateField("wedding_block", "tag", val)}
          placeholder="e.g. NAMMA VEETU KALYANAM"
        />
        <CmsTextInput
          label="Section Title"
          value={formData.wedding_block?.title}
          onChange={(val) => updateField("wedding_block", "title", val)}
          placeholder="e.g. Preserving Every Precious Wedding Moment"
        />
        <CmsTextInput
          label="Detailed Description"
          value={formData.wedding_block?.description}
          onChange={(val) => updateField("wedding_block", "description", val)}
          rows={3}
        />
        <div className="cms-two-col-grid">
          <CmsTextInput
            label="Button Label"
            value={formData.wedding_block?.buttonLabel}
            onChange={(val) => updateField("wedding_block", "buttonLabel", val)}
            placeholder="e.g. View Wedding Collections ↗"
          />
          <DestinationSelect
            value={formData.wedding_block?.buttonPath}
            onChange={(val) => updateField("wedding_block", "buttonPath", val)}
          />
        </div>
      </CmsSectionCard>

      {/* 3. OUTDOOR BLOCK */}
      <CmsSectionCard
        icon="🌄"
        title="Outdoor & Pre-Wedding Block"
        subtitle="Highlights Krishnagiri hills and golden hour sessions."
      >
        <CmsTextInput
          label="Small Category Tag"
          value={formData.outdoor_block?.tag}
          onChange={(val) => updateField("outdoor_block", "tag", val)}
          placeholder="e.g. ROMANTIC HILLS & SUNSETS"
        />
        <CmsTextInput
          label="Section Title"
          value={formData.outdoor_block?.title}
          onChange={(val) => updateField("outdoor_block", "title", val)}
          placeholder="e.g. Krishnagiri Outdoor & Pre-Wedding Shoots"
        />
        <CmsTextInput
          label="Detailed Description"
          value={formData.outdoor_block?.description}
          onChange={(val) => updateField("outdoor_block", "description", val)}
          rows={3}
        />
        <div className="cms-two-col-grid">
          <CmsTextInput
            label="Button Label"
            value={formData.outdoor_block?.buttonLabel}
            onChange={(val) => updateField("outdoor_block", "buttonLabel", val)}
            placeholder="e.g. Explore Pre-Wedding Shoots ↗"
          />
          <DestinationSelect
            value={formData.outdoor_block?.buttonPath}
            onChange={(val) => updateField("outdoor_block", "buttonPath", val)}
          />
        </div>
      </CmsSectionCard>

      {/* 4. TODDLERS BLOCK */}
      <CmsSectionCard
        icon="👶"
        title="Toddlers & Baby Photography Block"
        subtitle="Direct showcase for @toddlers_by_raavan"
      >
        <CmsTextInput
          label="Small Category Tag"
          value={formData.toddler_block?.tag}
          onChange={(val) => updateField("toddler_block", "tag", val)}
          placeholder="e.g. TODDLERS BY RAAVAN"
        />
        <CmsTextInput
          label="Section Title"
          value={formData.toddler_block?.title}
          onChange={(val) => updateField("toddler_block", "title", val)}
          placeholder="e.g. Baby Milestones & Newborn Portraits"
        />
        <CmsTextInput
          label="Detailed Description"
          value={formData.toddler_block?.description}
          onChange={(val) => updateField("toddler_block", "description", val)}
          rows={3}
        />
        <div className="cms-two-col-grid">
          <CmsTextInput
            label="Button Label"
            value={formData.toddler_block?.buttonLabel}
            onChange={(val) => updateField("toddler_block", "buttonLabel", val)}
            placeholder="e.g. View Baby Packages ↗"
          />
          <DestinationSelect
            value={formData.toddler_block?.buttonPath}
            onChange={(val) => updateField("toddler_block", "buttonPath", val)}
          />
        </div>
      </CmsSectionCard>

      {/* 5. QUICK BOOKING BAR */}
      <div className="cms-category-header">
        <h3>3. Quick Booking Bar</h3>
        <p>The call-to-action bar at the bottom of the homepage.</p>
      </div>

      <CmsSectionCard
        icon="📋"
        title="Booking Bar & WhatsApp Prompt"
        subtitle="Controls the lead generator at the bottom of the page."
      >
        <CmsTextInput
          label="Section Title"
          value={formData.quick_booking?.title}
          onChange={(val) => updateField("quick_booking", "title", val)}
          placeholder="e.g. Plan Your Photography Session"
        />
        <CmsTextInput
          label="Subtitle Prompt"
          value={formData.quick_booking?.subtitle}
          onChange={(val) => updateField("quick_booking", "subtitle", val)}
          rows={2}
        />
        <CmsTextInput
          label="WhatsApp Button Text"
          value={formData.quick_booking?.whatsappBtnText}
          onChange={(val) => updateField("quick_booking", "whatsappBtnText", val)}
          placeholder="e.g. Book via WhatsApp Direct"
        />
      </CmsSectionCard>

      {/* Bottom Sticky Save Bar */}
      <div className="cms-bottom-save-bar">
        <span>Ready to publish changes to your live website?</span>
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            type="button"
            className="cms-reset-btn"
            onClick={() => onReset("home")}
            disabled={saving}
          >
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
