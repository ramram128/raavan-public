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
        <svg className="whatsapp-svg-icon" viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.128-.521-1.615-.669-2.716-2.28-2.797-2.39-.081-.11-.671-.892-.671-1.701 0-.809.424-1.206.574-1.37.151-.164.33-.205.441-.205.11 0 .221.002.317.007.101.005.237-.038.371.285.144.344.492 1.201.536 1.288.044.088.073.191.015.306-.058.115-.088.19-.176.294-.088.104-.185.232-.264.312-.089.09-.181.189-.078.366.103.176.458.756.984 1.224.678.604 1.25.79 1.427.878.177.088.279.077.382-.041.103-.118.441-.515.559-.691.118-.176.236-.147.397-.088.162.059 1.026.484 1.203.573.176.088.294.132.338.206.044.074.044.428-.1 1.033z"/>
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
    <header className={`site-header studio-header${currentPage === "home" ? " home-header" : ""}${menuOpen ? " menu-is-open" : ""}`} ref={headerRef}>
      <div className="studio-header-container">
        <a
          className="studio-brand-link"
          href="/"
          onClick={(e) => handleLink(e, "/")}
          aria-label={`${studio.name} home`}
        >
          <BrandLogo />
        </a>

        <div className="studio-header-right">
          <nav className={`studio-nav${menuOpen ? " open" : ""}`} id="main-nav" aria-label="Main navigation">
            {navLinks.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <a
                  href={item.path}
                  key={item.page}
                  className={`studio-nav-link${isActive ? " active" : ""}`}
                  onClick={(e) => handleLink(e, item.path)}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <button
            className="luxury-nav-cta-btn"
            type="button"
            onClick={() => onNavigate("/contact")}
          >
            <span>Book a Session ↗</span>
          </button>

          <button
            className="menu-toggle studio-menu-toggle"
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
      <TopAnnouncementBar />
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
