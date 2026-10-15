import { useEffect, useRef, useState } from "react";
import FollowCamera from "./FollowCamera.jsx";
import { heroSlides, processSteps, stories, studio } from "./content.js";

const homeNavigation = [
  { label: "Stories", href: "/gallery" },
  { label: "Our approach", href: "/#approach" },
  { label: "The studio", href: "/#about" },
  { label: "Get in touch", href: "/#contact" },
];

function BrandLogo() {
  const [available, setAvailable] = useState(true);
  return available ? (
    <svg className="brand-logo" viewBox="2100 830 1750 1350" role="img" aria-label={studio.name}>
      <image href="/raavan-logo.png" width="5700" height="3000" onError={() => setAvailable(false)} />
    </svg>
  ) : <span className="brand-name">{studio.name}</span>;
}

function Header({ theme, onThemeChange }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  useEffect(() => {
    function dismiss(event) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuRef.current?.focus();
      }
    }
    function outside(event) {
      if (!headerRef.current?.contains(event.target)) setMenuOpen(false);
    }
    if (menuOpen) {
      document.addEventListener("keydown", dismiss);
      document.addEventListener("pointerdown", outside);
    }
    return () => {
      document.removeEventListener("keydown", dismiss);
      document.removeEventListener("pointerdown", outside);
    };
  }, [menuOpen]);
  return (
    <header className={`site-header eye-navbar${menuOpen ? " menu-is-open" : ""}`} ref={headerRef}>
      <div className="eye-navbar-row">
        <a className="wordmark" href="/" aria-label={`${studio.name} home`}><BrandLogo /></a>
        <div className="navbar-camera"><FollowCamera /></div>
        <div className="navbar-right">
          <nav className={`main-nav${menuOpen ? " open" : ""}`} id="main-nav" aria-label="Main navigation">
            {homeNavigation.slice(0, 3).map((item) => (
              <a href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
            ))}
            <a className="navbar-contact" href="/#contact" onClick={() => setMenuOpen(false)}>Let’s talk <span aria-hidden="true">↗</span></a>
          </nav>
          <button className="theme-toggle" type="button" onClick={onThemeChange}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
            {theme === "dark" ? "\u263c" : "\u25d0"}
          </button>
          <button className="menu-toggle" type="button" ref={menuRef} aria-expanded={menuOpen}
            aria-controls="main-nav" aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = heroSlides[activeSlide];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="hero" aria-label="Wedding photography highlights">
      <div className="hero-frame">
        {heroSlides.map((item, index) => (
          <img
            className={`hero-image${index === activeSlide ? " active" : ""}`}
            key={item.image}
            src={item.image}
            alt={item.alt}
            fetchpriority={index === 0 ? "high" : "auto"}
            aria-hidden={index !== activeSlide}
          />
        ))}
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow">Weddings, remembered as they felt</p>
          <h1>
            Make room
            <br />
            for the moment.
          </h1>
        </div>
        <div className="hero-caption">
          <span>{slide.location}</span>
          <div className="slide-controls" role="group" aria-label="Featured photographs">
            {heroSlides.map((item, index) => (
              <button
                type="button"
                key={item.image}
                aria-label={`Show photograph ${index + 1}`}
                aria-current={index === activeSlide}
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="intro" id="about">
      <div>
        <p className="eyebrow">A little less posing</p>
        <h2>
          Keep the feeling.
          <br />
          Let the day unfold.
        </h2>
      </div>
      <div className="intro-note">
        <p>
          We’re a small photography studio for people who want to be fully there.
          The quiet glances, the happy chaos, the dance floor that lasts one song
          longer — we’ll keep it all, just as it happened.
        </p>
        <a className="text-link" href="#approach">
          Get to know us <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}

function Lightbox({ story, onClose, onMove }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onMove(1);
      if (event.key === "ArrowLeft") onMove(-1);
    }
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onMove]);

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${story.title} photograph`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button className="lightbox-close" type="button" onClick={onClose} aria-label="Close photograph">
        ×
      </button>
      <button className="lightbox-arrow previous" type="button" onClick={() => onMove(-1)} aria-label="Previous photograph">
        ←
      </button>
      <figure>
        <img src={story.image} alt={story.alt} />
        <figcaption>
          <span>{story.title}</span>
          <span>{story.location}</span>
        </figcaption>
      </figure>
      <button className="lightbox-arrow next" type="button" onClick={() => onMove(1)} aria-label="Next photograph">
        →
      </button>
    </div>
  );
}

function StoryCarousel({ items, onSelect, suspended }) {
  const viewportRef = useRef(null);
  const movementRef = useRef(0);
  const [paused, setPaused] = useState(false);
  const settingsRef = useRef({ paused, suspended });
  settingsRef.current = { paused, suspended };
  // Fill a whole viewport even when a filter only contains one photograph.
  const sequence = Array.from({ length: Math.max(items.length, 8) }, (_, index) => items[index % items.length]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const cards = [...viewport.querySelectorAll(".carousel-card")];
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame;
    let previousTime = 0;
    let period = 0;
    let visible = true;
    let focused = false;
    let touching = false;
    let manualUntil = 0;
    let carry = 0;
    function measure() {
      period = viewport.scrollWidth / 3;
      viewport.scrollLeft = period;
    }
    const resize = new ResizeObserver(measure);
    resize.observe(viewport);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(viewport);
    function wheel(event) {
      if (event.ctrlKey || settingsRef.current.suspended) return;
      event.preventDefault();
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? viewport.clientWidth : 1;
      movementRef.current += delta * unit;
      manualUntil = performance.now() + 1200;
    }
    function focusIn() { focused = true; }
    function focusOut(event) { focused = viewport.contains(event.relatedTarget); }
    function touchStart() { touching = true; }
    function touchEnd() { touching = false; manualUntil = performance.now() + 1200; }
    function tick(time) {
      const elapsed = Math.min(time - (previousTime || time), 50);
      previousTime = time;
      if (visible && !document.hidden && period) {
        if (!touching && !focused && !settingsRef.current.suspended) {
          const manual = movementRef.current * (motion.matches ? 1 : 1 - Math.exp(-elapsed / 85));
          movementRef.current -= manual;
          carry += manual;
          if (!settingsRef.current.paused && !motion.matches && time > manualUntil) carry += elapsed * .022;
          const pixels = Math.trunc(carry);
          viewport.scrollLeft += pixels;
          carry -= pixels;
          if (viewport.scrollLeft >= period * 2) viewport.scrollLeft -= period;
          if (viewport.scrollLeft < period * .5) viewport.scrollLeft += period;
        }
        const center = viewport.scrollLeft + viewport.clientWidth / 2;
        for (const card of cards) {
          const distance = Math.max(-1.3, Math.min(1.3, (card.offsetLeft + card.offsetWidth / 2 - center) / (viewport.clientWidth / 2)));
          card.style.transform = `perspective(1100px) rotateY(${-distance * 22}deg) translateY(${-Math.abs(distance) * 18}px)`;
        }
      }
      frame = requestAnimationFrame(tick);
    }
    measure();
    movementRef.current = 0;
    viewport.addEventListener("wheel", wheel, { passive: false });
    viewport.addEventListener("focusin", focusIn);
    viewport.addEventListener("focusout", focusOut);
    viewport.addEventListener("touchstart", touchStart, { passive: true });
    viewport.addEventListener("touchend", touchEnd);
    viewport.addEventListener("touchcancel", touchEnd);
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      observer.disconnect();
      viewport.removeEventListener("wheel", wheel);
      viewport.removeEventListener("focusin", focusIn);
      viewport.removeEventListener("focusout", focusOut);
      viewport.removeEventListener("touchstart", touchStart);
      viewport.removeEventListener("touchend", touchEnd);
      viewport.removeEventListener("touchcancel", touchEnd);
    };
  }, [items]);

  return (
    <>
      <div className="story-carousel" ref={viewportRef} role="region" aria-roledescription="carousel" aria-label="Wedding stories" tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            viewportRef.current.scrollLeft += (event.key === "ArrowRight" ? 1 : -1) * 320;
          }
        }}>
        <div className="carousel-track">
          {[0, 1, 2].flatMap((copy) => sequence.map((story, index) => (
            <button className="story-card carousel-card" type="button" key={`${copy}-${index}-${story.id}`}
              tabIndex={copy === 1 && index < items.length ? 0 : -1}
              aria-hidden={copy !== 1 || index >= items.length ? true : undefined}
              onClick={() => onSelect(story.id)} aria-label={`View ${story.title}: ${story.description}`}>
              <img src={story.image} alt={story.alt} draggable="false" />
              <span className="story-label"><span>
                <span className="story-category">{story.category}</span>
                <span className="story-title">{story.title}</span>
              </span></span>
            </button>
          )))}
        </div>
      </div>
      <div className="carousel-controls">
        <span>Scroll over the photographs to explore</span>
        <button type="button" aria-label="Previous stories" onClick={() => { movementRef.current -= 340; }}>?</button>
        <button type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? "Play" : "Pause"}</button>
        <button type="button" aria-label="Next stories" onClick={() => { movementRef.current += 340; }}>?</button>
      </div>
    </>
  );
}

function Stories() {
  const categories = ["All stories", "Couples", "Celebrations", "Details"];
  const [category, setCategory] = useState("All stories");
  const [selectedStoryId, setSelectedStoryId] = useState(null);
  const filteredStories =
    category === "All stories"
      ? stories
      : stories.filter((story) => story.category === category);
  const selectedStory = stories.find((story) => story.id === selectedStoryId);

  function moveLightbox(direction) {
    const index = stories.findIndex((story) => story.id === selectedStoryId);
    const nextIndex = (index + direction + stories.length) % stories.length;
    setSelectedStoryId(stories[nextIndex].id);
  }

  return (
    <section className="stories" id="stories">
      <div className="section-heading">
        <div>
          <p className="eyebrow">A few favourite days</p>
          <h2>Gathered in good company</h2>
        </div>
        <p>Scenes from celebrations near and far</p>
      </div>
      <div className="gallery-filters" role="group" aria-label="Filter wedding stories">
        {categories.map((item) => (
          <button
            type="button"
            className={category === item ? "selected" : ""}
            aria-pressed={category === item}
            key={item}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <StoryCarousel key={category} items={filteredStories} onSelect={setSelectedStoryId} suspended={Boolean(selectedStory)} />
      {selectedStory && (
        <Lightbox
          story={selectedStory}
          onClose={() => setSelectedStoryId(null)}
          onMove={moveLightbox}
        />
      )}
    </section>
  );
}

function Approach() {
  return (
    <section className="manifesto" id="approach">
      <div className="manifesto-inner">
        <div className="manifesto-top">
          <p className="eyebrow">How it feels to work together</p>
          <h2>
            Thoughtful photographs.
            <br />
            Easy company.
          </h2>
        </div>
        <div className="steps">
          {processSteps.map((step) => (
            <div className="step" key={step.number}>
              <small>{step.number} — {step.moment}</small>
              <p>{step.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InquiryForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const date = formData.get("date") || "Not decided yet";
    const location = formData.get("location") || "Not decided yet";
    const message = formData.get("message") || "No additional details";
    const subject = encodeURIComponent(`Wedding enquiry from ${name}`);
    const body = encodeURIComponent(
      `Hello ${studio.name},\n\n${message}\n\nName: ${name}\nEmail: ${email}\nDate: ${date}\nLocation: ${location}`,
    );
    window.location.href = `mailto:${studio.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <section className="contact-section" id="contact">
      <div className="contact-intro">
        <p className="eyebrow">Have a date in mind?</p>
        <h2>We’d love to hear it.</h2>
        <p className="contact-copy">
          Tell us a little about your plans. We’ll get back to you with availability
          and all the details.
        </p>
        <a className="contact-email" href={`mailto:${studio.email}`}>{studio.email} ↗</a>
      </div>
      <form className="inquiry-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>
            Your name <span aria-hidden="true">*</span>
            <input name="name" autoComplete="name" required placeholder="Your name" />
          </label>
          <label>
            Email address <span aria-hidden="true">*</span>
            <input name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
          </label>
        </div>
        <div className="form-row">
          <label>
            Wedding date
            <input name="date" type="date" />
          </label>
          <label>
            Where are you celebrating?
            <input name="location" placeholder="Town, country" />
          </label>
        </div>
        <label>
          A little about your day
          <textarea name="message" rows="4" placeholder="The things you’re looking forward to most..." />
        </label>
        <div className="form-submit">
          <button className="submit-button" type="submit">Send an enquiry <span aria-hidden="true">↗</span></button>
          <span className="form-note" aria-live="polite">
            {submitted
              ? "Your email app should open with your enquiry ready to send."
              : "This opens your email app with your details filled in."}
          </span>
        </div>
      </form>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-brand-block">
          <a className="footer-brand" href="/" aria-label={`${studio.name} home`}><BrandLogo /></a>
          <p className="footer-tagline">For the stories you’ll tell<br />for years to come.</p>
        </div>
        <div className="footer-column">
          <h3>Find your way</h3>
          <a href="/">Home</a>
          <a href="/gallery">Wedding stories</a>
          <a href="/#approach">Our approach</a>
          <a href="/#contact">Get in touch</a>
        </div>
        <div className="footer-column">
          <h3>Say hello</h3>
          <a href={`mailto:${studio.email}`}>Email the studio ↗</a>
          <a href="https://instagram.com/" target="_blank" rel="noreferrer">Instagram ↗</a>
          <span>{studio.location}</span>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {studio.name} Studio</span>
        <a href="/">Back to the beginning ↑</a>
      </div>
    </footer>
  );
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = window.localStorage.getItem("raavan-studioz-theme");
    return savedTheme === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("raavan-studioz-theme", theme);
  }, [theme]);

  const isGallery = window.location.pathname.replace(/\/+$/, "") === "/gallery";

  useEffect(() => {
    document.title = isGallery
      ? "Wedding stories — Raavan Studio’z"
      : "Raavan Studio’z — Wedding photography, honestly told";
  }, [isGallery]);

  return (
    <>
      <Header theme={theme} onThemeChange={() => setTheme((current) => current === "dark" ? "light" : "dark")} />
      {isGallery ? (
        <>
          <GalleryPage />
          <Footer />
        </>
      ) : (
        <>
          <main id="home">
            <Hero />
            <Intro />
            <Stories />
            <Approach />
            <InquiryForm />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

function GalleryPage() {
  return (
    <main className="gallery-page">
      <section className="gallery-journey" aria-label="Wedding story gallery">
        {stories.map((story, index) => (
          <section
            className={`gallery-panel ${index === 0 ? "start" : index === stories.length - 1 ? "end" : "centre"}`}
            key={story.id}
            aria-label={`${index + 1} of ${stories.length}: ${story.title}`}
          >
            <img className="gallery-backdrop" src={story.image} alt="" aria-hidden="true" />
            <div className="gallery-vignette" aria-hidden="true" />
            <div className="gallery-track">
              <div className="gallery-content">
                <div className="gallery-meta">
                  <span>LOVE STORIES</span>
                  <span>/ {String(index + 1).padStart(2, "0")}</span>
                </div>
                <figure className="gallery-image-wrap">
                  <img src={story.image} alt={story.alt} decoding="async" />
                </figure>
                <div className="gallery-story-caption">
                  <span aria-hidden="true">{"/".repeat(index + 1)}</span>
                  <h1>{story.title}</h1>
                </div>
              </div>
            </div>
          </section>
        ))}
      </section>
      <section className="gallery-end">
        <p className="eyebrow">A little more about your day</p>
        <h2>Your story,<br />beautifully remembered.</h2>
        <a className="text-link" href="/#contact">Tell us what you’re dreaming of <span aria-hidden="true">↗</span></a>
      </section>
    </main>
  );
}
