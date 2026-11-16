import { useEffect, useState } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { fetchFromApi } from "../api.js";
import { gearCraft, philosophyPillars, studio as fallbackStudio, testimonials } from "../content.js";
import {
  BokehBackground,
  CountUp,
  TiltCard,
  SectionDivider,
  easing,
  durations,
  delays,
  staggers,
} from "../components/animations/index.js";

const heroHeadingWords = [
  "Capturing",
  "Authentic",
  "Emotions",
  "&",
  "Precious",
  "Family",
  "Milestones",
];

const viewportOnce = { once: true, margin: "-80px" };

const studioCards = [
  {
    pill: "STUDIO 01 · NEWBORN & TODDLERS",
    name: "The Creative Space",
    address:
      "Raavan Studio’z, 3/470B RCC Moulding Building, Ground Floor, Gandhi Nagar, Salem-Bangalore Highways, Krishnagiri - 635001",
    landmark: "Opposite Gunam Hospital, Near Challenge Gym",
    href: "https://maps.app.goo.gl/13tnC9ZgRtQ5Ftje8",
  },
  {
    pill: "STUDIO 02 · WEDDING CONSULTATIONS",
    name: "Work Space",
    address: "Raavan Studio’z, 3/59-9, Gandhi Nagar, Near Pillayar Kovil, Krishnagiri - 635001",
    landmark: "BATA Showroom lane, backside Central Theatre",
    href: "https://maps.app.goo.gl/e11f4M4RwXUbF1gcA",
  },
];

/* ------------------------------------------------------------------ */
/* Small reusable animated pieces                                      */
/* ------------------------------------------------------------------ */

function SectionHeader({ tag, title, sub }) {
  return (
    <motion.div
      className="clean-centered-header"
      initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={viewportOnce}
      transition={{ duration: durations.normal, ease: easing.cinematic }}
    >
      <span className="clean-section-tag">{tag}</span>
      <h2 className="clean-section-heading">{title}</h2>
      {sub && <p className="clean-section-sub">{sub}</p>}
    </motion.div>
  );
}

/* Slow-scrolling film strip with sprocket holes */
function FilmStripLine() {
  const holes =
    "repeating-linear-gradient(90deg, rgba(14,165,233,0.35) 0 12px, transparent 12px 26px)";
  const mask = "linear-gradient(90deg, transparent, #000 20%, #000 80%, transparent)";
  return (
    <div
      aria-hidden="true"
      style={{
        overflow: "hidden",
        maxWidth: 520,
        margin: "0 auto 22px",
        opacity: 0.55,
        pointerEvents: "none",
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    >
      <motion.div
        style={{ width: "200%", display: "flex", flexDirection: "column", gap: 4 }}
        animate={{ x: [0, -260] }}
        transition={{ repeat: Infinity, duration: 9, ease: "linear" }}
      >
        <div style={{ height: 6, background: holes, borderRadius: 2 }} />
        <div style={{ height: 1.5, background: "rgba(14,165,233,0.4)" }} />
        <div style={{ height: 6, background: holes, borderRadius: 2 }} />
      </motion.div>
    </div>
  );
}

/* SVG check mark that draws itself */
function DrawnCheck() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
      <motion.path
        d="M5 12.5l4.5 4.5L19 7.5"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
      />
    </svg>
  );
}

/* Five stars that light up one by one */
function StarRating() {
  return (
    <div className="inc-star-rating" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block" }}
          initial={{ color: "#d1d5db", scale: 0.7 }}
          whileInView={{ color: "#f59e0b", scale: [0.7, 1.3, 1] }}
          viewport={viewportOnce}
          transition={{ duration: 0.45, delay: 0.5 + i * 0.12 }}
        >
          ★
        </motion.span>
      ))}
    </div>
  );
}

const pillarCardVariants = {
  hidden: { opacity: 0, y: 36 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.14, ease: easing.cinematic },
  }),
  hover: { y: -8, transition: { duration: 0.3 } },
};

const gearCardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.95 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      delay: Math.floor(i / 3) * 0.15 + (i % 3) * 0.08,
      ease: easing.cinematic,
    },
  }),
  hover: { y: -5, transition: { duration: 0.25 } },
};

/* Camera-flash overlay used on the stat cards */
function FlashOverlay({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at center, rgba(255, 255, 255, 0.92) 0%, rgba(224, 242, 254, 0.35) 60%, transparent 85%)",
            pointerEvents: "none",
            zIndex: 5,
          }}
        />
      )}
    </AnimatePresence>
  );
}

/* Underline that draws in under bold hero text */
function DrawnUnderline({ delay }) {
  return (
    <motion.span
      aria-hidden="true"
      style={{
        position: "absolute",
        left: 0,
        bottom: 0,
        width: "100%",
        height: "2.5px",
        background: "linear-gradient(90deg, #0284c7, #38bdf8)",
        borderRadius: "2px",
        transformOrigin: "left",
      }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay, duration: 0.7, ease: easing.cinematic }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function AboutPage({ onNavigate }) {
  const [studioData, setStudioData] = useState(fallbackStudio);
  const [flashedCards, setFlashedCards] = useState({ 0: false, 1: false, 2: false });

  function handleCountComplete(index) {
    setFlashedCards((prev) => ({ ...prev, [index]: true }));
    setTimeout(() => {
      setFlashedCards((prev) => ({ ...prev, [index]: false }));
    }, 500);
  }

  useEffect(() => {
    fetchFromApi("/studio", null).then((data) => {
      if (data && data.name) {
        setStudioData((prev) => ({
          ...prev,
          name: data.name,
          tagline: data.tagline,
          phone: data.phone,
          email: data.email,
          foundedDate: data.founded_date,
          founder: {
            name: data.founder_name || prev.founder.name,
            title: "Founder & Creative Director",
            experience: data.founder_experience || prev.founder.experience,
            bio: data.founder_bio || prev.founder.bio,
          },
          branches: data.branches || prev.branches,
          stats: data.stats || prev.stats,
          serviceRadius: data.service_radius_note || prev.serviceRadius,
        }));
      }
    });
  }, []);

  const bracketBase = { position: "absolute", width: 24, height: 24 };
  const bracketLine = "2px solid #0ea5e9";

  return (
    <MotionConfig reducedMotion="user">
      <div className="clean-subpage-root about-page-root" id="about-page">
        {/* ============================================================== */}
        {/* 1. HERO HEADER                                                 */}
        {/* ============================================================== */}
        <section className="clean-page-hero" style={{ position: "relative", overflow: "hidden" }}>
          <BokehBackground count={5} />

          <div className="inc-container" style={{ position: "relative", zIndex: 1 }}>
            <div
              className="viewfinder-frame-container"
              style={{
                position: "relative",
                maxWidth: "960px",
                margin: "0 auto",
                padding: "28px 24px",
              }}
            >
              {/* Viewfinder corner brackets with focus-lock pulse */}
              <motion.div
                className="viewfinder-brackets-wrap"
                aria-hidden="true"
                initial={{ scale: 1.05, opacity: 0 }}
                animate={{ scale: [1.05, 1, 1], opacity: [0, 0.95, 0.45] }}
                transition={{ duration: 1.15, delay: 0.2, ease: easing.cinematic }}
                style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
              >
                <span
                  style={{
                    ...bracketBase,
                    top: 0,
                    left: 0,
                    borderTop: bracketLine,
                    borderLeft: bracketLine,
                    borderRadius: "2px 0 0 0",
                  }}
                />
                <span
                  style={{
                    ...bracketBase,
                    top: 0,
                    right: 0,
                    borderTop: bracketLine,
                    borderRight: bracketLine,
                    borderRadius: "0 2px 0 0",
                  }}
                />
                <span
                  style={{
                    ...bracketBase,
                    bottom: 0,
                    left: 0,
                    borderBottom: bracketLine,
                    borderLeft: bracketLine,
                    borderRadius: "0 0 0 2px",
                  }}
                />
                <span
                  style={{
                    ...bracketBase,
                    bottom: 0,
                    right: 0,
                    borderBottom: bracketLine,
                    borderRight: bracketLine,
                    borderRadius: "0 0 2px 0",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    width: 8,
                    height: 1.5,
                    background: "rgba(14, 165, 233, 0.45)",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: 0,
                    width: 8,
                    height: 1.5,
                    background: "rgba(14, 165, 233, 0.45)",
                  }}
                />
              </motion.div>

              {/* Eyebrow pill: slide-down + shimmer sweep */}
              <motion.div
                className="clean-hero-badge-wrap"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: durations.normal, ease: easing.cinematic }}
              >
                <span
                  className="clean-eyebrow-tag"
                  style={{ position: "relative", overflow: "hidden" }}
                >
                  ABOUT RAAVAN STUDIO’Z
                  <motion.span
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.75) 50%, transparent 100%)",
                      pointerEvents: "none",
                    }}
                    initial={{ x: "-100%" }}
                    animate={{ x: "200%" }}
                    transition={{ duration: 1.4, delay: 0.45, ease: "easeInOut" }}
                  />
                </span>
              </motion.div>

              {/* Word-by-word lens-focus reveal */}
              <h1
                className="clean-page-title"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "0.26em",
                }}
              >
                {heroHeadingWords.map((word, idx) => (
                  <motion.span
                    key={idx}
                    style={{ display: "inline-block", willChange: "transform, opacity, filter" }}
                    initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: durations.slow,
                      delay: delays.short + idx * staggers.tight,
                      ease: easing.cinematic,
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              {/* Paragraph with drawn cyan underlines */}
              <motion.p
                className="clean-page-subtitle"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: durations.normal,
                  delay: delays.long + 0.35,
                  ease: easing.cinematic,
                }}
              >
                Founded on{" "}
                <span style={{ position: "relative", display: "inline-block" }}>
                  <strong>21st January 2021</strong>
                  <DrawnUnderline delay={1.15} />
                </span>{" "}
                by{" "}
                <span style={{ position: "relative", display: "inline-block" }}>
                  <strong>Mr. Gowtham Raj</strong>
                  <DrawnUnderline delay={1.4} />
                </span>{" "}
                with over 8 years of specialized craftsmanship. We operate two dedicated studios in
                Krishnagiri, preserving real family legacies across Tamil Nadu, Bangalore, and
                worldwide.
              </motion.p>
            </div>
          </div>
        </section>

        <SectionDivider showSpark={true} />

        {/* ============================================================== */}
        {/* 2. FOUNDER EDITORIAL NARRATIVE                                 */}
        {/* ============================================================== */}
        <section className="inc-section-wrap about-founder-section">
          <div className="inc-container">
            <div className="inc-two-col-grid align-center">
              {/* Left: founder card */}
              <motion.div
                className="about-founder-visual-col"
                initial={{ opacity: 0, x: -45 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{ duration: durations.slow, ease: easing.cinematic }}
              >
                <TiltCard maxTilt={6} glow={true}>
                  <div className="founder-portrait-card">
                    <div className="founder-avatar-wrap" style={{ position: "relative" }}>
                      <motion.div
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          inset: -9,
                          borderRadius: "50%",
                          border: "1.5px dashed rgba(14, 165, 233, 0.65)",
                          pointerEvents: "none",
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
                      />
                      <motion.img
                        src="/raavan-emblem-clean.png"
                        alt="Mr. Gowtham Raj - Founder of Raavan Studio'z"
                        className="founder-portrait-img"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
                      />
                    </div>
                    <div className="founder-info-block">
                      <h3 className="founder-name">Mr. Gowtham Raj</h3>
                      <p className="founder-designation">Founder &amp; Creative Director</p>
                      <span className="founder-exp-pill">8+ Years Industry Mastery</span>
                    </div>
                    <div className="founder-tagline-quote">“Make a count Click the moment”</div>
                  </div>
                </TiltCard>
              </motion.div>

              {/* Right: story */}
              <motion.div
                className="about-founder-story-col"
                initial={{ opacity: 0, x: 45 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{ duration: durations.slow, delay: 0.18, ease: easing.cinematic }}
              >
                <span className="clean-section-tag">OUR ORIGIN &amp; CRAFT</span>
                <h2 className="clean-section-heading">
                  Heartfelt Photography Without Forced Choreography
                </h2>
                <p className="clean-body-text">
                  Raavan Studio’z was established on <strong>21st January 2021</strong> in
                  Krishnagiri with a simple, enduring conviction: the most meaningful photography
                  comes from authentic, unforced emotions.
                </p>
                <p className="clean-body-text">
                  Under the creative direction of <strong>Mr. Gowtham Raj</strong>, our team has
                  documented over 250 grand weddings and more than 1,500 happy families. Whether
                  framing a sacred muhurtham ritual or capturing the gentle laughter of a newborn in
                  our dedicated baby studio, we bring patience, natural lighting, and dedicated care
                  to every commission.
                </p>

                {/* Quote block: green border draws top -> bottom */}
                <div className="clean-quote-box" style={{ position: "relative", borderLeft: "none" }}>
                  <motion.span
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: "3px",
                      background: "#10b981",
                      borderRadius: "2px",
                      transformOrigin: "top",
                    }}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.65, delay: 0.35, ease: easing.cinematic }}
                  />
                  <motion.p
                    style={{ margin: 0 }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.6, delay: 0.65, ease: easing.cinematic }}
                  >
                    “Our major strength is listening closely to each client’s unique family vision.
                    We deliver our work in the absolute highest quality — from masterfully graded
                    photos to archival heirloom albums.”
                  </motion.p>
                </div>

                {/* Checklist pills */}
                <div className="founder-wings-row">
                  {[
                    "Wedding Photography & 4K Cinema",
                    "@toddlers_by_raavan Baby Studio",
                    "@photobooks_by_raavan Albums",
                  ].map((text, idx) => (
                    <motion.span
                      key={idx}
                      className="wing-pill"
                      style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={viewportOnce}
                      transition={{
                        duration: 0.45,
                        delay: 0.75 + idx * 0.14,
                        ease: easing.cinematic,
                      }}
                    >
                      <motion.span
                        style={{ color: "#10b981", fontWeight: 800, display: "inline-block" }}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: [0, 1.4, 1] }}
                        viewport={viewportOnce}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 12,
                          delay: 0.9 + idx * 0.14,
                        }}
                      >
                        ✓
                      </motion.span>
                      <span>{text}</span>
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <SectionDivider showSpark={true} />

        {/* ============================================================== */}
        {/* 3. STAT CARDS                                                  */}
        {/* ============================================================== */}
        <section className="inc-section-wrap inc-alt-bg about-stats-section">
          <div className="inc-container">
            <div className="about-stats-container">
              {/* 8+ Years */}
              <motion.div
                className="about-stat-card"
                style={{ position: "relative", overflow: "hidden" }}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: durations.normal, delay: 0, ease: easing.cinematic }}
              >
                <FlashOverlay show={flashedCards[0]} />
                <div className="about-stat-value">
                  <CountUp
                    target={8}
                    suffix="+"
                    duration={1.8}
                    onComplete={() => handleCountComplete(0)}
                  />
                </div>
                <div className="about-stat-text">Years Experience</div>
              </motion.div>

              {/* 1,500+ Clients */}
              <motion.div
                className="about-stat-card"
                style={{ position: "relative", overflow: "hidden" }}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: durations.normal, delay: 0.15, ease: easing.cinematic }}
              >
                <FlashOverlay show={flashedCards[1]} />
                <div className="about-stat-value">
                  <CountUp
                    target={1500}
                    suffix="+"
                    duration={2.2}
                    onComplete={() => handleCountComplete(1)}
                  />
                </div>
                <div className="about-stat-text">Happy Clients</div>
              </motion.div>

              {/* 5.0 Reviews */}
              <motion.div
                className="about-stat-card"
                style={{ position: "relative", overflow: "hidden" }}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: durations.normal, delay: 0.3, ease: easing.cinematic }}
              >
                <FlashOverlay show={flashedCards[2]} />
                <div className="about-stat-value">
                  <CountUp
                    target={5.0}
                    decimals={1}
                    duration={2.0}
                    onComplete={() => handleCountComplete(2)}
                  />{" "}
                  <motion.span
                    style={{ display: "inline-block", color: "#f59e0b", marginLeft: "4px" }}
                    initial={{ rotate: 0, scale: 1 }}
                    whileInView={{
                      rotate: [0, -18, 18, 0],
                      scale: [1, 1.35, 1],
                      filter: [
                        "drop-shadow(0 0 0px #f59e0b)",
                        "drop-shadow(0 0 8px rgba(245, 158, 11, 0.8))",
                        "drop-shadow(0 0 2px rgba(245, 158, 11, 0.4))",
                      ],
                    }}
                    viewport={viewportOnce}
                    transition={{ delay: 0.8, duration: 0.65, ease: easing.cinematic }}
                  >
                    ★
                  </motion.span>
                </div>
                <div className="about-stat-text">Client Reviews</div>
              </motion.div>
            </div>
          </div>
        </section>

        <SectionDivider showSpark={true} />

        {/* ============================================================== */}
        {/* 4. TWO DEDICATED STUDIOS IN KRISHNAGIRI                        */}
        {/* ============================================================== */}
        <section className="inc-section-wrap about-studios-section">
          <div className="inc-container">
            <SectionHeader
              tag="OUR FACILITIES"
              title="Visit Our Studios in Krishnagiri"
              sub="Equipped with specialized light stages, 15+ themed baby sets, and digital editing suites."
            />

            <div className="studios-cards-grid">
              {studioCards.map((s, idx) => (
                <motion.div
                  key={s.name}
                  className="clean-studio-card"
                  style={{ position: "relative", overflow: "hidden" }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{
                    duration: durations.slow,
                    delay: idx * 0.18,
                    ease: easing.cinematic,
                  }}
                  whileHover={{ y: -6, boxShadow: "0 20px 44px rgba(2, 132, 199, 0.18)" }}
                >
                  {/* Top blue line draws left -> right */}
                  <motion.span
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 3,
                      background: "linear-gradient(90deg, #0284c7, #38bdf8)",
                      transformOrigin: "left",
                    }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.9, delay: 0.3 + idx * 0.18, ease: easing.cinematic }}
                  />

                  <div className="studio-card-top">
                    <span
                      className="studio-branch-pill"
                      style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
                    >
                      <motion.svg
                        viewBox="0 0 24 24"
                        width="13"
                        height="13"
                        aria-hidden="true"
                        fill="currentColor"
                        animate={{ y: [0, -3, 0] }}
                        transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                      >
                        <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
                      </motion.svg>
                      {s.pill}
                    </span>
                    <h3 className="studio-name">{s.name}</h3>
                    <p className="studio-address">{s.address}</p>
                    <div className="studio-landmark">
                      <strong>Landmark:</strong> {s.landmark}
                    </div>
                  </div>

                  <div className="studio-card-actions">
                    <motion.a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="studio-map-btn"
                      style={{ position: "relative", overflow: "hidden" }}
                      whileHover="hover"
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Fill sweep */}
                      <motion.span
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "rgba(14, 165, 233, 0.16)",
                          transformOrigin: "left",
                        }}
                        initial={{ scaleX: 0 }}
                        variants={{ hover: { scaleX: 1 } }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                      />
                      <span style={{ position: "relative", display: "inline-flex", gap: 6 }}>
                        Open in Google Maps
                        <motion.span
                          style={{ display: "inline-block" }}
                          variants={{ hover: { x: 4, y: -3 } }}
                          transition={{ duration: 0.25 }}
                        >
                          ↗
                        </motion.span>
                      </span>
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 5. CORE CREATIVE PHILOSOPHY                                    */}
        {/* ============================================================== */}
        <section className="inc-section-wrap inc-alt-bg about-philosophy-section">
          <div className="inc-container">
            <FilmStripLine />
            <SectionHeader
              tag="WHAT SETS US APART"
              title="Our Core Creative Philosophy"
              sub="Three pillars that define every wedding and portrait commission we undertake."
            />

            <div className="philosophy-cards-grid">
              {philosophyPillars.map((pillar, idx) => (
                <motion.div
                  className="clean-pillar-card"
                  key={pillar.number}
                  custom={idx}
                  variants={pillarCardVariants}
                  initial="hidden"
                  whileInView="show"
                  whileHover="hover"
                  viewport={viewportOnce}
                >
                  <motion.div
                    className="pillar-num-badge"
                    variants={{ hover: { textShadow: "0 0 18px rgba(14, 165, 233, 0.6)" } }}
                  >
                    {pillar.number}
                  </motion.div>
                  <h3 className="pillar-title">{pillar.title}</h3>
                  <div className="pillar-tagline-text">
                    {pillar.tagline}
                    <motion.span
                      aria-hidden="true"
                      style={{
                        display: "block",
                        height: 2,
                        marginTop: 4,
                        background: "#10b981",
                        borderRadius: 2,
                        transformOrigin: "left",
                      }}
                      initial={{ scaleX: 0.15 }}
                      variants={{ hover: { scaleX: 1 } }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    />
                  </div>
                  <p className="pillar-body-text">{pillar.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 6. CRAFTSMANSHIP & GEAR STANDARDS                              */}
        {/* ============================================================== */}
        <section className="inc-section-wrap about-gear-section">
          <div className="inc-container">
            <SectionHeader
              tag="PROFESSIONAL EXCELLENCE"
              title="Camera Craft & Client Standards"
              sub="Premium cinema gear, dual backup redundancy, and sanitized baby environments."
            />

            <div className="gear-standards-grid">
              {gearCraft.map((item, idx) => (
                <motion.div
                  className="clean-gear-card"
                  key={item.name}
                  custom={idx}
                  variants={gearCardVariants}
                  initial="hidden"
                  whileInView="show"
                  whileHover="hover"
                  viewport={viewportOnce}
                >
                  <motion.div
                    className="gear-check-icon"
                    style={{ position: "relative" }}
                    variants={{ hover: { rotate: 180, scale: 1.12 } }}
                    transition={{ duration: 0.45, ease: easing.cinematic }}
                  >
                    <DrawnCheck />
                    {/* Ripple */}
                    <motion.span
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "50%",
                        border: "2px solid rgba(14, 165, 233, 0.6)",
                        pointerEvents: "none",
                      }}
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: [0.8, 1.9], opacity: [0.7, 0] }}
                      viewport={viewportOnce}
                      transition={{ duration: 0.9, delay: 0.9 }}
                    />
                  </motion.div>
                  <div className="gear-card-content">
                    <h4 className="gear-name">{item.name}</h4>
                    <p className="gear-detail">{item.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 7. CLIENT TESTIMONIALS                                         */}
        {/* ============================================================== */}
        <section className="inc-section-wrap inc-alt-bg">
          <div className="inc-container">
            <SectionHeader tag="REAL CLIENT WORDS" title="What Families Say About Us" />

            <div className="inc-testimonials-grid">
              {testimonials.map((t, idx) => (
                <motion.div
                  className="inc-testimonial-card"
                  key={t.couple}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{
                    duration: durations.slow,
                    delay: idx * 0.15,
                    ease: easing.cinematic,
                  }}
                  whileHover={{ y: -6, boxShadow: "0 18px 40px rgba(2, 132, 199, 0.16)" }}
                >
                  <StarRating />
                  <motion.p
                    className="inc-testimonial-quote"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.8, delay: 0.5 + idx * 0.15 }}
                  >
                    “{t.quote}”
                  </motion.p>
                  <div className="inc-testimonial-author">
                    <div style={{ position: "relative", display: "inline-flex", flexShrink: 0 }}>
                      <motion.span
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          inset: -4,
                          borderRadius: "50%",
                          border: "2px solid rgba(14, 165, 233, 0.55)",
                          pointerEvents: "none",
                        }}
                        animate={{ scale: [1, 1.22], opacity: [0.7, 0] }}
                        transition={{ repeat: Infinity, duration: 2.4, ease: "easeOut" }}
                      />
                      <img src={t.image} alt={t.couple} className="inc-author-avatar" />
                    </div>
                    <div className="inc-author-info">
                      <strong className="inc-author-name">{t.couple}</strong>
                      <span className="inc-author-loc">{t.location}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 8. DIRECT BOOKING CTA                                          */}
        {/* ============================================================== */}
        <section className="inc-section-wrap about-cta-section">
          <div className="inc-container">
            <motion.div
              className="clean-cta-box"
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: durations.slow, ease: easing.cinematic }}
            >
              <h2 className="clean-cta-title">Ready to Document Your Special Milestone?</h2>
              <p className="clean-cta-desc">
                Speak directly with Mr. Gowtham Raj or schedule an album consultation at our
                Krishnagiri studio.
              </p>
              <div className="clean-cta-buttons-row">
                <motion.a
                  href={`https://wa.me/919500306696?text=${encodeURIComponent(
                    "Hi Gowtham Raj! I visited your About page and would like to learn more about booking Raavan Studio’z."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clean-cta-whatsapp-btn"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span>Chat on WhatsApp →</span>
                </motion.a>
                <motion.button
                  type="button"
                  className="clean-cta-contact-btn"
                  onClick={() => onNavigate("/contact")}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span>View Contact Details ↗</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </MotionConfig>
  );
}