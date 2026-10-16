import { useEffect, useRef, useState } from "react";
import FollowCamera from "./FollowCamera.jsx";
import CustomCursor from "./CustomCursor.jsx";
import { studio } from "./content.js";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";
import PricingPage from "./pages/PricingPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";

const navLinks = [
  { label: "Home", path: "/", page: "home" },
  { label: "About", path: "/about", page: "about" },
  { label: "Services", path: "/services", page: "services" },
  { label: "Gallery", path: "/gallery", page: "gallery" },
  { label: "Pricing", path: "/pricing", page: "pricing" },
];

function BrandLogo() {
  const [available, setAvailable] = useState(true);
  return (
    <div className="brand-lockup">
      {available ? (
        <img
          className="brand-emblem-img"
          src="/raavan-logo-white-crisp.png"
          alt={studio.name}
          onError={() => setAvailable(false)}
        />
      ) : (
        <span className="brand-emblem-fallback" aria-hidden="true">✦</span>
      )}
      <div className="brand-meta">
        <span className="brand-title">RAAVAN</span>
        <span className="brand-sub">STUDIO’Z</span>
      </div>
    </div>
  );
}

function Header({ theme, onThemeChange, currentPage, onNavigate }) {
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

  function handleLink(e, path) {
    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
      e.preventDefault();
      setMenuOpen(false);
      onNavigate(path);
    }
  }

  return (
    <header className={`site-header eye-navbar${menuOpen ? " menu-is-open" : ""}`} ref={headerRef}>
      <div className="eye-navbar-row">
        <a
          className="wordmark"
          href="/"
          onClick={(e) => handleLink(e, "/")}
          aria-label={`${studio.name} home`}
        >
          <BrandLogo />
        </a>
        <div className="navbar-camera"><FollowCamera /></div>
        <div className="navbar-right">
          <nav className={`main-nav${menuOpen ? " open" : ""}`} id="main-nav" aria-label="Main navigation">
            {navLinks.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <a
                  href={item.path}
                  key={item.page}
                  className={isActive ? "active-link" : ""}
                  onClick={(e) => handleLink(e, item.path)}
                >
                  {item.label}
                </a>
              );
            })}
            <a
              className={`navbar-contact${currentPage === "contact" ? " active-link" : ""}`}
              href="/contact"
              onClick={(e) => handleLink(e, "/contact")}
            >
              Let’s talk <span aria-hidden="true">↗</span>
            </a>
          </nav>
          <button
            className="theme-toggle"
            type="button"
            onClick={onThemeChange}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? "\u263c" : "\u25d0"}
          </button>
          <button
            className="menu-toggle"
            type="button"
            ref={menuRef}
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer({ onNavigate }) {
  function handleLink(e, path) {
    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
      e.preventDefault();
      onNavigate(path);
    }
  }

  return (
    <footer>
      <div className="footer-main">
        <div className="footer-brand-block">
          <a
            className="footer-brand"
            href="/"
            onClick={(e) => handleLink(e, "/")}
            aria-label={`${studio.name} home`}
          >
            <BrandLogo />
          </a>
          <p className="footer-tagline">
            For the stories you’ll tell
            <br />
            for years to come.
          </p>
        </div>
        <div className="footer-column">
          <h3>Explore Pages</h3>
          <a href="/" onClick={(e) => handleLink(e, "/")}>Home</a>
          <a href="/about" onClick={(e) => handleLink(e, "/about")}>About Studio</a>
          <a href="/services" onClick={(e) => handleLink(e, "/services")}>Services & Craft</a>
          <a href="/gallery" onClick={(e) => handleLink(e, "/gallery")}>Stories Gallery</a>
          <a href="/pricing" onClick={(e) => handleLink(e, "/pricing")}>Pricing & Packages</a>
          <a href="/contact" onClick={(e) => handleLink(e, "/contact")}>Get in touch</a>
        </div>
        <div className="footer-column">
          <h3>Say hello</h3>
          <a href={`mailto:${studio.email}`}>Email the studio ↗</a>
          <a href={`tel:${studio.phone}`}>{studio.phone} ↗</a>
          <a href="https://instagram.com/" target="_blank" rel="noreferrer">Instagram ↗</a>
          <span>{studio.location}</span>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {studio.name} Studio</span>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          Back to the top ↑
        </a>
      </div>
    </footer>
  );
}

// Helper to determine page from path or hash
function parsePage(pathOrHash = "") {
  const clean = pathOrHash.replace(/^[/#]+/, "").split("/")[0].toLowerCase();
  switch (clean) {
    case "about":
      return "about";
    case "services":
      return "services";
    case "gallery":
      return "gallery";
    case "pricing":
      return "pricing";
    case "contact":
      return "contact";
    default:
      return "home";
  }
}

function pageToPath(page) {
  return page === "home" ? "/" : `/${page}`;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    return parsePage(window.location.pathname || window.location.hash);
  });

  const [theme, setTheme] = useState(() => {
    const savedTheme = window.localStorage.getItem("raavan-studioz-theme");
    return savedTheme === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("raavan-studioz-theme", theme);
  }, [theme]);

  // Handle browser back and forward button navigation
  useEffect(() => {
    function handlePopState() {
      const page = parsePage(window.location.pathname || window.location.hash);
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "instant" });
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Multi-page navigation function
  function handleNavigate(target) {
    const page = parsePage(target);
    const path = pageToPath(page);

    if (window.location.pathname !== path) {
      window.history.pushState({ page }, "", path);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  // Dynamic SEO page titles
  useEffect(() => {
    switch (currentPage) {
      case "about":
        document.title = "About Our Story & Craft — Raavan Studio’z";
        break;
      case "services":
        document.title = "Artisan Photography & Cinematic Motion Services — Raavan Studio’z";
        break;
      case "gallery":
        document.title = "Wedding Stories Gallery — Raavan Studio’z";
        break;
      case "pricing":
        document.title = "Pricing & Investment Collections — Raavan Studio’z";
        break;
      case "contact":
        document.title = "Reserve Your Date & Inquiries — Raavan Studio’z";
        break;
      default:
        document.title = "Raavan Studio’z — Wedding photography, honestly told";
    }
  }, [currentPage]);

  return (
    <>
      <CustomCursor />
      <Header
        theme={theme}
        onThemeChange={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />
      <div className="app-page-wrapper">
        <div key={currentPage} className="page-transition-wrap">
          {currentPage === "home" && <HomePage onNavigate={handleNavigate} />}
          {currentPage === "about" && <AboutPage onNavigate={handleNavigate} />}
          {currentPage === "services" && <ServicesPage onNavigate={handleNavigate} />}
          {currentPage === "gallery" && <GalleryPage onNavigate={handleNavigate} />}
          {currentPage === "pricing" && <PricingPage onNavigate={handleNavigate} />}
          {currentPage === "contact" && <ContactPage onNavigate={handleNavigate} />}
        </div>
      </div>
      <Footer onNavigate={handleNavigate} />
    </>
  );
}
