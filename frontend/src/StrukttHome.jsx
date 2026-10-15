import { useEffect, useRef, useState } from "react";
import { heroSlides, stories, studio } from "./content.js";
import "./struktt.css";

const links = [
  ["About", "/#about"], ["Work", "/#work"],
  ["Approach", "/#approach"], ["Stories", "/gallery"], ["Contact", "/#contact"],
];

export function StrukttHeader({ gallery = false }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const root = useRef(null);
  const toggle = useRef(null);
  const [logoAvailable, setLogoAvailable] = useState(true);
  useEffect(() => {
    function scroll() { setScrolled(window.scrollY > 100); }
    function dismiss(event) {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
    }
    function outside(event) { if (!root.current?.contains(event.target)) setOpen(false); }
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    document.addEventListener("keydown", dismiss);
    document.addEventListener("pointerdown", outside);
    return () => {
      window.removeEventListener("scroll", scroll);
      document.removeEventListener("keydown", dismiss);
      document.removeEventListener("pointerdown", outside);
    };
  }, []);
  return (
    <header className={`struktt-header${scrolled || gallery ? " on-paper" : ""}`} ref={root}>
      <a className="struktt-brand" href="/" aria-label={`${studio.name} home`}>
        {logoAvailable ? <svg viewBox="2100 830 1750 1350" role="img" aria-label={studio.name}>
          <image href="/raavan-logo.png" width="5700" height="3000" onError={() => setLogoAvailable(false)} />
        </svg> : <><span>RAAVAN</span><small>STUDIO’Z</small></>}
      </a>
      <div className={`struktt-nav-shell${open ? " is-open" : ""}`}>
        <button ref={toggle} className="struktt-menu-toggle" aria-expanded={open} aria-controls="struktt-navigation" onClick={() => setOpen(!open)}>
          <span>{open ? "Close" : "Menu"}</span><i /><i />
        </button>
        <nav id="struktt-navigation" aria-label="Main navigation">
          {links.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}><span>{label}</span><span aria-hidden="true">{label}</span></a>)}
        </nav>
      </div>
    </header>
  );
}

function FullscreenHero() {
  const root = useRef(null);
  useEffect(() => {
    const element = root.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame;
    function update() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const top = element.getBoundingClientRect().top;
        element.style.setProperty("--hero-drift", `${reduced.matches ? 0 : Math.max(-150, Math.min(0, top)) * -.2}px`);
      });
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", update); };
  }, []);
  return (
    <section className="struktt-hero" ref={root} aria-label="Raavan wedding photography">
      <img className="struktt-hero-image" src={heroSlides[0].image} alt={heroSlides[0].alt} fetchPriority="high" />
      <div className="struktt-hero-shade" />
      <div className="struktt-hero-copy">
        <h1>Love. Light. Story.</h1>
        <p>We document your day the way<br className="desktop-break" /> it deserves to be remembered.</p>
        <a className="struktt-button" href="#contact">Work with us <span aria-hidden="true">↗</span></a>
      </div>
      <a className="struktt-scroll" href="#work"><span>Scroll</span><i /></a>
      <span className="struktt-hero-note">WEDDINGS &amp; STORIES / {new Date().getFullYear()}</span>
    </section>
  );
}

function WorkGrid() {
  return (
    <section className="struktt-work" id="work">
      <div className="struktt-section-label"><h2>Recent Work</h2><span>(01 — 06)</span></div>
      <div className="struktt-work-grid">
        {stories.map((story, index) => (
          <a className="struktt-project" href={`/gallery#${story.id}`} key={story.id}>
            <div className="struktt-project-image"><img src={story.image} alt={story.alt} loading="lazy" /><span className="struktt-project-arrow" aria-hidden="true">↗</span></div>
            <div className="struktt-project-label"><h3>{story.title}</h3><span>{story.category} / {String(index + 1).padStart(2, "0")}</span></div>
          </a>
        ))}
      </div>
      <a className="struktt-all" href="/gallery">All Stories <span aria-hidden="true">↗</span></a>
    </section>
  );
}

const specialisms = [
  ["Weddings", "The feeling of your day, held in every frame.", stories[0]],
  ["Couples", "Honest connection. Nothing forced.", stories[2]],
  ["Celebrations", "For the moments that bring everyone together.", stories[4]],
  ["Portraits", "A little light. A little time. Just you.", stories[1]],
  ["Details", "The little things that tell the whole story.", stories[5]],
];

function Specialisms() {
  const [active, setActive] = useState(null);
  return (
    <section className="struktt-services" id="approach">
      <p className="struktt-services-intro">Every story deserves to be seen at its best.<br />We bring the same care to every kind of moment.</p>
      <div className="struktt-service-list" onMouseLeave={() => setActive(null)}>
        {specialisms.map(([name, description, story], index) => (
          <a className={`struktt-service${active === index ? " active" : ""}`} href="/gallery" key={name}
            onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onBlur={() => setActive(null)}>
            <span className="struktt-service-number">0{index + 1}</span><h3>{name}</h3><span className="struktt-service-arrow" aria-hidden="true">↗</span>
            <figure className="struktt-service-preview"><img src={story.image} alt="" /><figcaption>{description}</figcaption></figure>
          </a>
        ))}
      </div>
    </section>
  );
}

export default function StrukttHome({ contact }) {
  const root = useRef(null);
  useEffect(() => {
    const elements = root.current.querySelectorAll(".struktt-project, .struktt-about, .struktt-services-intro, .struktt-quote");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("is-revealed"); observer.unobserve(entry.target); }
      });
    }, { threshold: .08 });
    elements.forEach((element) => { element.classList.add("will-reveal"); observer.observe(element); });
    return () => observer.disconnect();
  }, []);
  return (
    <div className="struktt-home" ref={root}>
      <main id="home">
        <FullscreenHero />
        <WorkGrid />
        <section className="struktt-about" id="about">
          <p className="struktt-kicker">THE WAY WE SEE IT</p>
          <h2>We find the light<br />in the moments<br /><em>you want to keep.</em></h2>
          <div className="struktt-about-note"><p>Every story has a feeling. A quiet glance, a room full of laughter, the light just before the day becomes evening. Our work is finding those moments and holding them still.</p><a className="struktt-story-link" href="#approach">Our approach <span aria-hidden="true">↗</span></a></div>
        </section>
        <Specialisms />
        <section className="struktt-quote"><span className="struktt-kicker">OUR PROMISE</span><h2>Photographs that bring<br />you back to <em>the feeling.</em></h2><p>Unhurried. Thoughtful. Honestly yours.</p></section>
        <div className="struktt-contact">{contact}</div>
      </main>
      <footer className="struktt-footer">
        <div className="struktt-footer-top"><a href="/#contact">Let’s make<br /><em>something lasting.</em><span aria-hidden="true">↗</span></a><div><span>EMAIL</span><a href={`mailto:${studio.email}`}>{studio.email}</a></div></div>
        <div className="struktt-footer-bottom"><a href="/">RAAVAN STUDIO’Z</a><nav aria-label="Footer navigation">{links.map(([label, href]) => <a href={href} key={label}>{label}</a>)}</nav><span>© {new Date().getFullYear()} {studio.name}</span></div>
      </footer>
    </div>
  );
}
