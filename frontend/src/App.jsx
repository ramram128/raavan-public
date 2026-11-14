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
import TermsPage from "./pages/TermsPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";

const navLinks = [
  { label: "Home", path: "/", page: "home" },
  { label: "About", path: "/about", page: "about" },
  { label: "Services", path: "/services", page: "services" },
  { label: "Gallery", path: "/gallery", page: "gallery" },
  { label: "Pricing", path: "/pricing", page: "pricing" },
  { label: "Terms", path: "/terms", page: "terms" },
  { label: "Admin", path: "/admin", page: "admin" },
];

function FloatingWhatsApp() {
  const [hovered, setHovered] = useState(false);
  const message = encodeURIComponent(
    "Hi Gowtham Raj! I am looking to book a photography session with Raavan Studio’z."
  );

  return (
    <aside
      className="floating-whatsapp-container"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Direct WhatsApp Concierge"
    >
      <div className={`whatsapp-tooltip-card ${hovered ? "visible" : ""}`}>
        <div className="whatsapp-tooltip-header">
          <span className="online-indicator" />
          <div>
            <strong>Gowtham Raj</strong>
            <span className="tooltip-role">Founder &amp; Creative Director</span>
          </div>
        </div>
        <p className="whatsapp-tooltip-msg">
          Need quick date availability or package details? Chat with us instantly on WhatsApp!
        </p>
        <div className="whatsapp-tooltip-phone">
          <span>💬 +91 9500306696</span>
          <span className="response-time">Krishnagiri Studios</span>
        </div>
      </div>

      <a
        href={`https://wa.me/919500306696?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-btn"
        aria-label="Chat directly on WhatsApp with Mr. Gowtham Raj"
      >
        <span className="whatsapp-pulse-wave" />
        <svg
          className="whatsapp-svg-icon"
          viewBox="0 0 448 512"
          width="32"
          height="32"
          fill="#ffffff"
          aria-hidden="true"
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
      </a>
    </aside>
  );
}

function TopAnnouncementBar() {
  return (
    <div className="top-luxury-ticker" aria-label="Studio Announcement">
      <div className="ticker-inner">
        <span className="ticker-highlight">✨ RAAVAN STUDIO’Z · KRISHNAGIRI</span>
        <span className="ticker-dot">•</span>
        <span>FOUNDED BY MR. GOWTHAM RAJ (8+ YEARS EXP)</span>
        <span className="ticker-dot">•</span>
        <span>NOW RESERVING DATES FOR 2026 &amp; 2027</span>
        <span className="ticker-dot">•</span>
        <a href="tel:+919500306696" className="ticker-phone">
          📞 +91 9500306696
        </a>
      </div>
    </div>
  );
}

function BrandLogo() {
  return (
    <div className="brand-emblem-pure" aria-label="Raavan Studio'z">
      <img
        src="/raavan-logo-only.png"
        alt="Raavan Studio'z Emblem"
        className="brand-emblem-clean-img"
      />
      <div className="navbar-brand-text-block">
        <span className="navbar-brand-title footer-brand-title">RAAVAN STUDIO’Z</span>
        <span className="navbar-brand-subtitle footer-brand-sub">PHOTOGRAPHY · KRISHNAGIRI</span>
      </div>
    </div>
  );
}

function Header({ theme, currentPage, onNavigate }) {
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
    <header className={`clean-studio-navbar${menuOpen ? " menu-is-open" : ""}`} ref={headerRef}>
      <div className="navbar-inner-wrapper">
        <a
          className="navbar-brand-emblem-link"
          href="/"
          onClick={(e) => handleLink(e, "/")}
          aria-label={`${studio.name} home`}
        >
          <img
            src="/raavan-logo-only.png"
            alt={studio.name}
            className="navbar-emblem-image"
          />
          <div className="navbar-brand-text-block">
            <span className="navbar-brand-title">RAAVAN STUDIO’Z</span>
            <span className="navbar-brand-subtitle">PHOTOGRAPHY · KRISHNAGIRI</span>
          </div>
        </a>

        <div className="navbar-right-group">
          <nav className={`navbar-links-menu${menuOpen ? " open" : ""}`} id="main-nav" aria-label="Main navigation">
            {navLinks.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <a
                  href={item.path}
                  key={item.page}
                  className={`nav-link-item${isActive ? " active" : ""}`}
                  onClick={(e) => handleLink(e, item.path)}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <button
            className="navbar-cta-pill-button"
            type="button"
            onClick={() => onNavigate("/contact")}
          >
            <span>Book a Session ↗</span>
          </button>

          <button
            className="navbar-hamburger-btn"
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
            “Make a count Click the moment”
            <br />
            Founder: Mr. Gowtham Raj (8+ Years Experience)
            <br />
            Founded 21st January 2021 · Krishnagiri
          </p>
        </div>
        <div className="footer-column">
          <h3>Explore Pages</h3>
          <a href="/" onClick={(e) => handleLink(e, "/")}>Home</a>
          <a href="/about" onClick={(e) => handleLink(e, "/about")}>About Studio &amp; Founder</a>
          <a href="/services" onClick={(e) => handleLink(e, "/services")}>Services &amp; Expertise</a>
          <a href="/gallery" onClick={(e) => handleLink(e, "/gallery")}>Curated Works</a>
          <a href="/pricing" onClick={(e) => handleLink(e, "/pricing")}>Packages &amp; Pricing</a>
          <a href="/terms" onClick={(e) => handleLink(e, "/terms")}>Terms &amp; Conditions</a>
          <a href="/admin" onClick={(e) => handleLink(e, "/admin")} style={{ color: "#00d4ff", fontWeight: 600 }}>Admin Dashboard ↗</a>
          <a href="/contact" onClick={(e) => handleLink(e, "/contact")}>Contact &amp; Enquiry</a>
        </div>
        <div className="footer-column">
          <h3>Say hello</h3>
          <a href={`tel:${studio.phone}`}>{studio.phone} ↗</a>
          <a href={`mailto:${studio.email}`}>{studio.email} ↗</a>
          <a href="https://instagram.com/raavan_studioz" target="_blank" rel="noreferrer">@raavan_studioz ↗</a>
          <a href="https://instagram.com/toddlers_by_raavan" target="_blank" rel="noreferrer">@toddlers_by_raavan ↗</a>
          <a href="https://instagram.com/photobooks_by_raavan" target="_blank" rel="noreferrer">@photobooks_by_raavan ↗</a>
        </div>
        <div className="footer-column">
          <h3>Our 2 Branches</h3>
          <span style={{ fontSize: "0.85rem", opacity: 0.85 }}>
            <strong>Creative Space:</strong> 3/470B RCC Moulding Bldg, Gandhi Nagar, Salem-Bangalore Hwy, Krishnagiri
          </span>
          <a href="https://maps.app.goo.gl/13tnC9ZgRtQ5Ftje8" target="_blank" rel="noreferrer" style={{ fontSize: "0.8rem", color: "#00d4ff" }}>
            View Creative Space on Map ↗
          </a>
          <span style={{ fontSize: "0.85rem", opacity: 0.85, marginTop: "0.5rem" }}>
            <strong>Work Space:</strong> 3/59-9, Gandhi Nagar, Near Pillayar Kovil (BATA down lane), Krishnagiri
          </span>
          <a href="https://maps.app.goo.gl/e11f4M4RwXUbF1gcA" target="_blank" rel="noreferrer" style={{ fontSize: "0.8rem", color: "#00d4ff" }}>
            View Work Space on Map ↗
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {studio.name} · All rights reserved</span>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          Back to top ↑
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
    case "terms":
      return "terms";
    case "admin":
      return "admin";
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

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.dataset.theme = "light";
    try {
      window.localStorage.setItem("raavan-studioz-theme", "light");
    } catch (e) {}
  }, []);

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
        document.title = "About Our Founder & Craft — Raavan Studio’z";
        break;
      case "services":
        document.title = "Our Expertise & Services — Raavan Studio’z";
        break;
      case "gallery":
        document.title = "Our Curated Works & Gallery — Raavan Studio’z";
        break;
      case "pricing":
        document.title = "Pricing Packages & Investments — Raavan Studio’z";
        break;
      case "terms":
        document.title = "Terms & Conditions — Raavan Studio’z";
        break;
      case "admin":
        document.title = "Admin Dashboard & Leads — Raavan Studio’z";
        break;
      case "contact":
        document.title = "Contact & Booking Enquiries — Raavan Studio’z";
        break;
      default:
        document.title = "Raavan Studio’z — Make a count Click the moment";
    }
  }, [currentPage]);

  return (
    <>
      <CustomCursor />
      <Header
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
          {currentPage === "terms" && <TermsPage onNavigate={handleNavigate} />}
          {currentPage === "admin" && <AdminPage onNavigate={handleNavigate} />}
          {currentPage === "contact" && <ContactPage onNavigate={handleNavigate} />}
        </div>
      </div>
      <Footer onNavigate={handleNavigate} />
      <FloatingWhatsApp />
    </>
  );
}
