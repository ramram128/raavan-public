import { useEffect, useState } from "react";
import { studio as defaultStudio } from "../content.js";

export default function AdminPage({ onNavigate }) {
  // Auth state
  const [authToken, setAuthToken] = useState(() => localStorage.getItem("raavan_admin_token") || null);
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("raavan_admin_user");
    return saved ? JSON.parse(saved) : null;
  });

  // Login form state
  const [loginEmail, setLoginEmail] = useState("admin@raavanstudioz.com");
  const [loginPassword, setLoginPassword] = useState("admin123");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  // Active Tab: 'overview', 'enquiries', 'services', 'packages', 'gallery', 'studio'
  const [activeTab, setActiveTab] = useState("overview");

  // Data states
  const [enquiries, setEnquiries] = useState([]);
  const [studioProfile, setStudioProfile] = useState(defaultStudio);
  const [services, setServices] = useState([]);
  const [packages, setPackages] = useState([]);
  const [gallery, setGallery] = useState([]);

  // UI state
  const [loadingData, setLoadingData] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [enquiryFilter, setEnquiryFilter] = useState("all");

  // Add Item States
  const [showAddService, setShowAddService] = useState(false);
  const [newService, setNewService] = useState({ title: "", category: "Weddings", starting_price: "₹", description: "", deliverables: "", image_url: "" });

  const [showAddPackage, setShowAddPackage] = useState(false);
  const [newPackage, setNewPackage] = useState({ name: "", category: "newborn_toddler", price_display: "Rs. ", duration: "", badge: "", description: "", features: "" });
  const [editingPkgId, setEditingPkgId] = useState(null);
  const [editPkgData, setEditPkgData] = useState({});

  const [showAddGallery, setShowAddGallery] = useState(false);
  const [newGallery, setNewGallery] = useState({ title: "", category: "Weddings", location: "Krishnagiri", description: "", image_url: "", aspect: "portrait" });

  // Handle Login
  async function handleLogin(e) {
    if (e) e.preventDefault();
    setLoggingIn(true);
    setLoginError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setAuthToken(data.token);
        setCurrentUser(data.user);
        localStorage.setItem("raavan_admin_token", data.token);
        localStorage.setItem("raavan_admin_user", JSON.stringify(data.user));
      } else {
        setLoginError(data.message || "Invalid credentials. Please use admin@raavanstudioz.com / admin123");
      }
    } catch (err) {
      setLoginError("Failed to connect to backend server. Make sure Laravel is running on port 8000.");
    } finally {
      setLoggingIn(false);
    }
  }

  // Handle Logout
  function handleLogout() {
    setAuthToken(null);
    setCurrentUser(null);
    localStorage.removeItem("raavan_admin_token");
    localStorage.removeItem("raavan_admin_user");
  }

  // Load all data when logged in
  async function loadAllData() {
    if (!authToken) return;
    setLoadingData(true);

    try {
      const [resEnq, resStu, resServ, resPkg, resGal] = await Promise.all([
        fetch("/api/enquiries").then((r) => (r.ok ? r.json() : [])),
        fetch("/api/studio").then((r) => (r.ok ? r.json() : null)),
        fetch("/api/services").then((r) => (r.ok ? r.json() : [])),
        fetch("/api/packages").then((r) => (r.ok ? r.json() : { all: [] })),
        fetch("/api/gallery").then((r) => (r.ok ? r.json() : [])),
      ]);

      setEnquiries(Array.isArray(resEnq) ? resEnq : []);
      if (resStu) setStudioProfile(resStu);
      setServices(Array.isArray(resServ) ? resServ : []);
      setPackages(resPkg.all || (Array.isArray(resPkg) ? resPkg : []));
      setGallery(Array.isArray(resGal) ? resGal : []);
      flashMessage("Data synchronized with MySQL!");
    } catch (err) {
      console.error("Error loading admin data:", err);
    } finally {
      setLoadingData(false);
    }
  }

  useEffect(() => {
    if (authToken) {
      loadAllData();
    }
  }, [authToken]);

  function flashMessage(msg) {
    setSaveStatus(msg);
    setTimeout(() => setSaveStatus(""), 4000);
  }

  // Helper for initials
  function getInitials(name) {
    if (!name) return "RS";
    const parts = name.replace(/&/g, "").trim().split(/\s+/);
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  }

  // Image Uploader Helper
  async function handleFileUpload(file, onUploaded) {
    if (!file) return;
    setUploadingImage(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.success) {
        onUploaded(data.url);
        flashMessage("Image uploaded successfully!");
      } else {
        alert(data.message || "Upload failed");
      }
    } catch (err) {
      alert("Error uploading image");
    } finally {
      setUploadingImage(false);
    }
  }

  // Enquiries Actions
  async function handleStatusChange(id, newStatus) {
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setEnquiries((prev) => prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item)));
        flashMessage("Lead status updated!");
      }
    } catch (err) {
      alert("Error updating status");
    }
  }

  async function handleDeleteEnquiry(id) {
    if (!window.confirm("Delete this client enquiry?")) return;
    try {
      const res = await fetch(`/api/enquiries/${id}`, { method: "DELETE" });
      if (res.ok) {
        setEnquiries((prev) => prev.filter((item) => item.id !== id));
        flashMessage("Enquiry deleted!");
      }
    } catch (err) {
      alert("Error deleting enquiry");
    }
  }

  // Studio Profile Save
  async function handleSaveStudio(e) {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/studio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studioProfile),
      });
      if (res.ok) {
        flashMessage("Studio brand profile saved to MySQL!");
      }
    } catch (err) {
      alert("Error saving studio profile");
    }
  }

  // Service Actions
  async function handleAddService(e) {
    e.preventDefault();
    const payload = {
      ...newService,
      deliverables: newService.deliverables ? newService.deliverables.split(",").map((s) => s.trim()) : [],
    };
    try {
      const res = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setServices([...services, data.service]);
        setNewService({ title: "", category: "Weddings", starting_price: "₹", description: "", deliverables: "", image_url: "" });
        setShowAddService(false);
        flashMessage("Service added successfully!");
      }
    } catch (err) {
      alert("Error adding service");
    }
  }

  async function handleDeleteService(id) {
    if (!window.confirm("Delete this service?")) return;
    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
      if (res.ok) {
        setServices(services.filter((s) => s.id !== id));
        flashMessage("Service deleted!");
      }
    } catch (err) {
      alert("Error deleting service");
    }
  }

  // Package Actions
  async function handleAddPackage(e) {
    e.preventDefault();
    const payload = {
      ...newPackage,
      features: newPackage.features ? newPackage.features.split("\n").filter(Boolean) : [],
    };
    try {
      const res = await fetch("/api/admin/packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPackages([...packages, data.package]);
        setNewPackage({ name: "", category: "newborn_toddler", price_display: "₹", duration: "", badge: "", description: "", features: "" });
        setShowAddPackage(false);
        flashMessage("Package created successfully!");
      }
    } catch (err) {
      alert("Error adding package");
    }
  }

  async function handleDeletePackage(id) {
    if (!window.confirm("Delete this package?")) return;
    try {
      const res = await fetch(`/api/admin/packages/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPackages(packages.filter((p) => p.id !== id));
        flashMessage("Package deleted!");
      }
    } catch (err) {
      alert("Error deleting package");
    }
  }

  async function handleUpdatePackage(id, updatedFields) {
    try {
      const res = await fetch(`/api/admin/packages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPackages((prev) => prev.map((p) => (p.id === id ? data.package : p)));
        setEditingPkgId(null);
        flashMessage("Package updated successfully in MySQL!");
      } else {
        alert(data.message || "Failed to update package");
      }
    } catch (err) {
      alert("Error updating package");
    }
  }

  // Gallery Actions
  async function handleAddGallery(e) {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGallery),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setGallery([data.gallery, ...gallery]);
        setNewGallery({ title: "", category: "Weddings", location: "Krishnagiri", description: "", image_url: "", aspect: "portrait" });
        setShowAddGallery(false);
        flashMessage("Photo added to Curated Works gallery!");
      }
    } catch (err) {
      alert("Error adding photo");
    }
  }

  async function handleDeleteGallery(id) {
    if (!window.confirm("Remove this image from gallery?")) return;
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
      if (res.ok) {
        setGallery(gallery.filter((g) => g.id !== id));
        flashMessage("Image removed!");
      }
    } catch (err) {
      alert("Error removing photo");
    }
  }

  // ==========================================
  // RENDER LOGIN SCREEN (IF NOT AUTHENTICATED)
  // ==========================================
  if (!authToken) {
    return (
      <main className="admin-login-wrapper">
        <div className="admin-login-card">
          <img
            src="/raavan-logo-only.png"
            alt="Raavan Studio'z"
            className="admin-login-logo"
          />
          <h1 className="admin-login-title">Raavan Studio’z</h1>
          <p className="admin-login-subtitle">
            Admin CMS Cockpit
          </p>

          {loginError && (
            <div className="admin-login-error">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="admin-field-group">
              <label className="admin-field-label">Admin Email</label>
              <input
                type="email"
                required
                autoComplete="username"
                placeholder="admin@raavanstudioz.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="admin-login-input"
              />
            </div>

            <div className="admin-field-group">
              <label className="admin-field-label">Password</label>
              <input
                type="password"
                required
                autoComplete="current-password"
                placeholder="Enter password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="admin-login-input"
              />
            </div>

            <button
              type="submit"
              disabled={loggingIn}
              className="admin-login-submit-btn"
            >
              {loggingIn ? "Verifying with MySQL..." : "Login to Admin Dashboard →"}
            </button>
          </form>

          <div className="admin-login-credentials">
            <p className="cred-title">Default Admin Credentials:</p>
            <div className="cred-badges">
              <code>admin@raavanstudioz.com</code>
              <code>admin123</code>
            </div>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <button
              type="button"
              onClick={() => onNavigate("/")}
              style={{ background: "transparent", border: "none", color: "#0284c7", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}
            >
              ← Return to Public Website
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ==========================================
  // METRICS & FILTER CALCULATIONS
  // ==========================================
  const confirmedCount = enquiries.filter((e) => e.status === "confirmed" || e.status === "booked").length;
  const newCount = enquiries.filter((e) => e.status === "new").length;
  const contactedCount = enquiries.filter((e) => e.status === "contacted").length;

  const filteredEnquiries = enquiries.filter((item) => {
    const matchesFilter =
      enquiryFilter === "all" ? true : enquiryFilter === "new" ? item.status === "new" : enquiryFilter === "confirmed" ? (item.status === "confirmed" || item.status === "booked") : item.status === enquiryFilter;

    if (!matchesFilter) return false;
    if (!searchQuery.trim()) return true;

    const q = searchQuery.toLowerCase();
    return (
      (item.name && item.name.toLowerCase().includes(q)) ||
      (item.phone && item.phone.toLowerCase().includes(q)) ||
      (item.event_type && item.event_type.toLowerCase().includes(q)) ||
      (item.location && item.location.toLowerCase().includes(q))
    );
  });

  // Seasonal Bar Chart Heights (representing Jan - Dec inquiry distribution)
  const monthlyChartData = [
    { month: "Jan", height: 72, inquiries: 14 },
    { month: "Feb", height: 80, inquiries: 16 },
    { month: "Mar", height: 55, inquiries: 10 },
    { month: "Apr", height: 65, inquiries: 12 },
    { month: "May", height: 90, inquiries: 18 },
    { month: "Jun", height: 50, inquiries: 9 },
    { month: "Jul", height: 60, inquiries: 11 },
    { month: "Aug", height: 75, inquiries: 15 },
    { month: "Sep", height: 70, inquiries: 13 },
    { month: "Oct", height: 92, inquiries: 19 },
    { month: "Nov", height: 98, inquiries: 21 },
    { month: "Dec", height: 100, inquiries: 24 },
  ];

  return (
    <div className="admin-white-layout">
      {/* Toast Feedback */}
      {saveStatus && (
        <div className="admin-toast-banner">
          ✓ {saveStatus}
        </div>
      )}

      {/* ============================================================== */}
      {/* 1. LEFT SIDEBAR (MATCHING REFERENCE LAYOUT)                     */}
      {/* ============================================================== */}
      <aside className="admin-sidebar">
        <div>
          {/* Brand Box */}
          <div className="sidebar-brand-box">
            <img src="/raavan-logo-only.png" alt="Raavan Studio'z" className="sidebar-emblem" />
            <div className="sidebar-brand-text">
              <span className="sidebar-title">Raavan Studio’z</span>
              <span className="sidebar-subtitle">CMS Control</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="sidebar-nav-list" aria-label="Admin Navigation">
            <button
              type="button"
              className={`sidebar-nav-item${activeTab === "overview" ? " active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              <div className="sidebar-nav-left">
                <span className="sidebar-nav-icon">📊</span>
                <span>Overview</span>
              </div>
            </button>

            <button
              type="button"
              className={`sidebar-nav-item${activeTab === "enquiries" ? " active" : ""}`}
              onClick={() => setActiveTab("enquiries")}
            >
              <div className="sidebar-nav-left">
                <span className="sidebar-nav-icon">📋</span>
                <span>Bookings &amp; Leads</span>
              </div>
              <span className="sidebar-badge-count">{enquiries.length}</span>
            </button>

            <button
              type="button"
              className={`sidebar-nav-item${activeTab === "kutty_chutties" ? " active" : ""}`}
              onClick={() => setActiveTab("kutty_chutties")}
            >
              <div className="sidebar-nav-left">
                <span className="sidebar-nav-icon">👶</span>
                <span>Kutty Chutties</span>
              </div>
              <span className="sidebar-badge-count">
                {packages.filter((p) => p.category === "newborn_toddler" || p.category === "add_on").length || 4}
              </span>
            </button>

            <button
              type="button"
              className={`sidebar-nav-item${activeTab === "services" ? " active" : ""}`}
              onClick={() => setActiveTab("services")}
            >
              <div className="sidebar-nav-left">
                <span className="sidebar-nav-icon">📸</span>
                <span>Services</span>
              </div>
              <span className="sidebar-badge-count">{services.length}</span>
            </button>

            <button
              type="button"
              className={`sidebar-nav-item${activeTab === "packages" ? " active" : ""}`}
              onClick={() => setActiveTab("packages")}
            >
              <div className="sidebar-nav-left">
                <span className="sidebar-nav-icon">💰</span>
                <span>Pricing Packages</span>
              </div>
              <span className="sidebar-badge-count">{packages.length}</span>
            </button>

            <button
              type="button"
              className={`sidebar-nav-item${activeTab === "gallery" ? " active" : ""}`}
              onClick={() => setActiveTab("gallery")}
            >
              <div className="sidebar-nav-left">
                <span className="sidebar-nav-icon">🖼️</span>
                <span>Curated Works</span>
              </div>
              <span className="sidebar-badge-count">{gallery.length}</span>
            </button>

            <button
              type="button"
              className={`sidebar-nav-item${activeTab === "studio" ? " active" : ""}`}
              onClick={() => setActiveTab("studio")}
            >
              <div className="sidebar-nav-left">
                <span className="sidebar-nav-icon">🏢</span>
                <span>Studio Profile</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="sidebar-footer-box">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("/");
            }}
            className="sidebar-website-link"
          >
            <span>🌐 View Live Website ↗</span>
          </a>

          <div className="sidebar-profile-card">
            <div className="profile-avatar-box">
              <div className="profile-avatar-circle">GR</div>
              <div>
                <div className="profile-name-text">{currentUser?.name || "Mr. Gowtham Raj"}</div>
                <div className="profile-role-sub">Admin Owner</div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="profile-logout-btn"
              title="Logout"
            >
              🚪
            </button>
          </div>
        </div>
      </aside>

      {/* ============================================================== */}
      {/* 2. MAIN VIEWPORT                                               */}
      {/* ============================================================== */}
      <main className="admin-main-viewport">
        {/* Top Header */}
        <header className="admin-top-bar">
          <div className="admin-greeting-block">
            <h1>Hi, Welcome back 👋</h1>
            <p>Here is what’s happening with Raavan Studio’z bookings today.</p>
          </div>

          <div className="admin-top-actions">
            <div className="admin-date-pill">
              <span>📅 Nov 16, 2026</span>
            </div>

            <button
              type="button"
              className="admin-sync-btn"
              onClick={loadAllData}
              title="Refresh and sync data from MySQL database"
            >
              <span>{loadingData ? "Syncing..." : "🔄 Sync MySQL"}</span>
            </button>

            <button
              type="button"
              className="admin-quick-add-btn"
              onClick={() => setActiveTab("enquiries")}
            >
              <span>+ View Inquiries</span>
            </button>
          </div>
        </header>

        {/* Quick Filter Pills Row (matching reference) */}
        <div className="admin-tab-pills-row">
          {[
            { id: "overview", label: "Overview" },
            { id: "enquiries", label: `Bookings (${enquiries.length})` },
            { id: "kutty_chutties", label: `👶 Kutty Chutties (${packages.filter((p) => p.category === "newborn_toddler" || p.category === "add_on").length || 4})` },
            { id: "services", label: `Services (${services.length})` },
            { id: "packages", label: `All Packages (${packages.length})` },
            { id: "gallery", label: `Curated Works (${gallery.length})` },
            { id: "studio", label: "Studio Info" },
          ].map((pill) => (
            <button
              key={pill.id}
              type="button"
              className={`admin-tab-pill${activeTab === pill.id ? " active" : ""}`}
              onClick={() => setActiveTab(pill.id)}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* ============================================================== */}
        {/* TAB 1: OVERVIEW DASHBOARD (MATCHING REFERENCE UI)             */}
        {/* ============================================================== */}
        {activeTab === "overview" && (
          <section className="admin-overview-view">
            {/* KPI Cards Row (4 Cards) */}
            <div className="kpi-cards-grid">
              {/* Card 1: Total Leads */}
              <div className="kpi-stat-card">
                <div className="kpi-card-top">
                  <span className="kpi-card-label">Total Inquiries</span>
                  <span className="kpi-card-icon">📋</span>
                </div>
                <div className="kpi-card-value">{enquiries.length} Leads</div>
                <div className="kpi-card-trend">
                  <span>+20.1%</span>
                  <span className="kpi-card-sub">from last month</span>
                </div>
              </div>

              {/* Card 2: Confirmed Shoots */}
              <div className="kpi-stat-card">
                <div className="kpi-card-top">
                  <span className="kpi-card-label">Confirmed Shoots</span>
                  <span className="kpi-card-icon">🤝</span>
                </div>
                <div className="kpi-card-value">{confirmedCount} Active</div>
                <div className="kpi-card-trend">
                  <span>+180%</span>
                  <span className="kpi-card-sub">wedding peak season</span>
                </div>
              </div>

              {/* Card 3: Active Studio Services */}
              <div className="kpi-stat-card">
                <div className="kpi-card-top">
                  <span className="kpi-card-label">Active Services</span>
                  <span className="kpi-card-icon">📸</span>
                </div>
                <div className="kpi-card-value">{services.length} Categories</div>
                <div className="kpi-card-trend">
                  <span>+19%</span>
                  <span className="kpi-card-sub">Weddings &amp; Toddlers</span>
                </div>
              </div>

              {/* Card 4: Curated Works */}
              <div className="kpi-stat-card">
                <div className="kpi-card-top">
                  <span className="kpi-card-label">Curated Works</span>
                  <span className="kpi-card-icon">🖼️</span>
                </div>
                <div className="kpi-card-value">{gallery.length}+ Photos</div>
                <div className="kpi-card-trend">
                  <span style={{ color: "#0284c7" }}>100% Active</span>
                  <span className="kpi-card-sub">in live portfolio</span>
                </div>
              </div>
            </div>

            {/* Main Two-Column Row (Bar Chart + Recent Sales/Leads) */}
            <div className="admin-dashboard-two-col">
              {/* Left Column: Interactive Bar Chart */}
              <div className="admin-white-card">
                <div className="card-head-row">
                  <div>
                    <h3 className="card-title-main">Seasonal Inquiries Bar Chart</h3>
                    <p className="card-subtitle-sub">Showing client inquiry volume across peak wedding &amp; baby shoot months</p>
                  </div>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0284c7", background: "#e0f2fe", padding: "4px 10px", borderRadius: "6px" }}>
                    2026 Season
                  </span>
                </div>

                {/* Discipline Indicators */}
                <div className="chart-discipline-chips">
                  <div className="chart-chip">
                    <span className="chip-dot blue" />
                    <span>Weddings (52%)</span>
                  </div>
                  <div className="chart-chip">
                    <span className="chip-dot cyan" />
                    <span>Toddlers by Raavan (34%)</span>
                  </div>
                  <div className="chart-chip">
                    <span className="chip-dot emerald" />
                    <span>Maternity &amp; Couples (14%)</span>
                  </div>
                </div>

                {/* Animated Gradient Bar Chart */}
                <div className="interactive-bar-chart-wrap">
                  {monthlyChartData.map((bar) => (
                    <div className="bar-col" key={bar.month}>
                      <span className="bar-tooltip">{bar.inquiries} Shoots</span>
                      <div
                        className="bar-pillar"
                        style={{ height: `${bar.height}%` }}
                      />
                    </div>
                  ))}
                </div>

                {/* X-Axis Labels */}
                <div className="chart-bottom-axis-row">
                  {monthlyChartData.map((bar) => (
                    <span className="bar-x-label" key={bar.month}>
                      {bar.month}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Recent Inquiries List */}
              <div className="admin-white-card">
                <div className="card-head-row">
                  <div>
                    <h3 className="card-title-main">Recent Client Inquiries</h3>
                    <p className="card-subtitle-sub">Latest leads submitted via website</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab("enquiries")}
                    style={{ background: "transparent", border: "none", color: "#0284c7", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer" }}
                  >
                    View All →
                  </button>
                </div>

                <div className="recent-leads-list">
                  {enquiries.slice(0, 5).map((enq) => (
                    <div className="recent-lead-item" key={enq.id}>
                      <div className="lead-left-group">
                        <div className="lead-avatar-circle">
                          {getInitials(enq.name)}
                        </div>
                        <div>
                          <h4 className="lead-name-text">{enq.name}</h4>
                          <p className="lead-event-sub">{enq.event_type || enq.type} · {enq.event_date || "Date flexible"}</p>
                        </div>
                      </div>

                      <div className="lead-right-group">
                        <span className={`lead-status-pill ${enq.status}`}>
                          ● {enq.status}
                        </span>
                        {enq.phone && (
                          <a
                            href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="lead-whatsapp-btn"
                          >
                            <span>WhatsApp ↗</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}

                  {enquiries.length === 0 && (
                    <p style={{ textAlign: "center", color: "#64748b", padding: "2rem 0" }}>
                      No client enquiries yet. Submissions from the contact form will appear here in real time.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ============================================================== */}
        {/* TAB 2: BOOKINGS & LEADS MANAGEMENT                             */}
        {/* ============================================================== */}
        {activeTab === "enquiries" && (
          <section className="admin-tab-content-panel">
            <div className="admin-white-card">
              <div className="card-head-row">
                <div>
                  <h2 className="admin-card-section-title">Client Bookings &amp; Inquiries</h2>
                  <p className="card-subtitle-sub">Manage customer enquiries, update booking statuses, and chat directly via WhatsApp.</p>
                </div>
              </div>

              {/* Filter & Search Bar */}
              <div className="admin-filter-bar">
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {[
                    { id: "all", label: `All (${enquiries.length})` },
                    { id: "new", label: `New (${newCount})` },
                    { id: "confirmed", label: `Confirmed (${confirmedCount})` },
                    { id: "contacted", label: `Contacted (${contactedCount})` },
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      type="button"
                      className={`admin-tab-pill${enquiryFilter === filter.id ? " active" : ""}`}
                      onClick={() => setEnquiryFilter(filter.id)}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  placeholder="🔍 Search client or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="admin-search-input"
                />
              </div>

              {/* Table of Leads */}
              <div className="clean-admin-table-wrap">
                <table className="clean-admin-table">
                  <thead>
                    <tr>
                      <th>Client Name</th>
                      <th>Contact Info</th>
                      <th>Shoot / Event Details</th>
                      <th>Location &amp; Notes</th>
                      <th>Status Action</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEnquiries.map((enq) => (
                      <tr key={enq.id}>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <div className="lead-avatar-circle" style={{ width: "32px", height: "32px", fontSize: "0.75rem" }}>
                              {getInitials(enq.name)}
                            </div>
                            <div>
                              <strong>{enq.name}</strong>
                              {enq.parent_name && <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Parent: {enq.parent_name}</div>}
                              {enq.baby_name && <div style={{ fontSize: "0.75rem", color: "#0284c7" }}>Baby: {enq.baby_name} ({enq.baby_age})</div>}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div><strong>{enq.phone}</strong></div>
                          {enq.email && <div style={{ fontSize: "0.78rem", color: "#64748b" }}>{enq.email}</div>}
                          <a
                            href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ fontSize: "0.78rem", color: "#10b981", fontWeight: 700 }}
                          >
                            💬 Chat on WhatsApp ↗
                          </a>
                        </td>
                        <td>
                          <div><strong>{enq.event_type || enq.type}</strong></div>
                          <div style={{ fontSize: "0.78rem", color: "#0284c7" }}>📅 {enq.event_date || "Date flexible"}</div>
                          {enq.selected_package && <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Pkg: {enq.selected_package}</div>}
                        </td>
                        <td>
                          <div>{enq.location || "Krishnagiri"}</div>
                          {enq.message && <div style={{ fontSize: "0.75rem", color: "#64748b", maxWidth: "200px" }}>"{enq.message}"</div>}
                        </td>
                        <td>
                          <select
                            value={enq.status}
                            onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                            className="admin-status-select"
                          >
                            <option value="new">● New</option>
                            <option value="contacted">● Contacted</option>
                            <option value="confirmed">● Confirmed</option>
                            <option value="booked">● Booked</option>
                            <option value="cancelled">● Cancelled</option>
                          </select>
                        </td>
                        <td>
                          <button
                            type="button"
                            onClick={() => handleDeleteEnquiry(enq.id)}
                            className="admin-action-btn-del"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}

                    {filteredEnquiries.length === 0 && (
                      <tr>
                        <td colSpan="6" style={{ textAlign: "center", padding: "2rem", color: "#64748b" }}>
                          No enquiries found matching your filter criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* ============================================================== */}
        {/* TAB 3: SERVICES MANAGEMENT                                     */}
        {/* ============================================================== */}
        {activeTab === "services" && (
          <section className="admin-tab-content-panel">
            <div className="admin-white-card">
              <div className="card-head-row">
                <div>
                  <h2 className="admin-card-section-title">Studio Services &amp; Specialties ({services.length})</h2>
                  <p className="card-subtitle-sub">Manage your photography services, starting prices, and promotional cards.</p>
                </div>
                <button
                  type="button"
                  className="admin-quick-add-btn"
                  onClick={() => setShowAddService(!showAddService)}
                >
                  {showAddService ? "✕ Cancel" : "+ Add New Service"}
                </button>
              </div>

              {/* Add Service Form */}
              {showAddService && (
                <div className="admin-form-card" style={{ background: "#f8fafc", border: "1.5px solid #bae6fd" }}>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0284c7", margin: "0 0 16px" }}>+ New Service Details</h3>
                  <form onSubmit={handleAddService} style={{ display: "grid", gap: "16px" }}>
                    <div className="admin-form-grid">
                      <div className="admin-form-field">
                        <label className="admin-form-label">Service Title *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Traditional Wedding Cinema"
                          value={newService.title}
                          onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                          className="admin-form-input"
                        />
                      </div>
                      <div className="admin-form-field">
                        <label className="admin-form-label">Category</label>
                        <select
                          value={newService.category}
                          onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                          className="admin-form-select"
                        >
                          <option value="Weddings">Weddings</option>
                          <option value="Babies">Toddlers &amp; Newborns</option>
                          <option value="Motherhood">Maternity</option>
                          <option value="Couples">Couple Portraits</option>
                          <option value="Heirlooms">Photobooks</option>
                        </select>
                      </div>
                    </div>

                    <div className="admin-form-grid">
                      <div className="admin-form-field">
                        <label className="admin-form-label">Starting Price Display</label>
                        <input
                          type="text"
                          placeholder="e.g. Custom Quote or ₹8,000"
                          value={newService.starting_price}
                          onChange={(e) => setNewService({ ...newService, starting_price: e.target.value })}
                          className="admin-form-input"
                        />
                      </div>
                      <div className="admin-form-field">
                        <label className="admin-form-label">Deliverables (comma separated)</label>
                        <input
                          type="text"
                          placeholder="4K Cinema Film, Raw Stills, Handcrafted Album"
                          value={newService.deliverables}
                          onChange={(e) => setNewService({ ...newService, deliverables: e.target.value })}
                          className="admin-form-input"
                        />
                      </div>
                    </div>

                    <div className="admin-form-field">
                      <label className="admin-form-label">Image Cover URL / Path</label>
                      <input
                        type="text"
                        placeholder="/banners/banner_wedding.jpg or https://..."
                        value={newService.image_url}
                        onChange={(e) => setNewService({ ...newService, image_url: e.target.value })}
                        className="admin-form-input"
                      />
                    </div>

                    <div className="admin-form-field">
                      <label className="admin-form-label">Short Description</label>
                      <textarea
                        rows="3"
                        placeholder="Explain the coverage and artistic approach..."
                        value={newService.description}
                        onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                        className="admin-form-textarea"
                      />
                    </div>

                    <button type="submit" className="admin-submit-btn-primary" style={{ alignSelf: "flex-start" }}>
                      Save Service to MySQL →
                    </button>
                  </form>
                </div>
              )}

              {/* Service Cards Grid */}
              <div className="admin-items-grid">
                {services.map((srv) => (
                  <div className="admin-item-card" key={srv.id}>
                    {srv.image_url && (
                      <img
                        src={srv.image_url}
                        alt={srv.title}
                        className="admin-item-img"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/kalyanam/page_4_img_1.png";
                        }}
                      />
                    )}
                    <div className="admin-item-body">
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0284c7", textTransform: "uppercase" }}>{srv.category}</span>
                      <h4 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 800, color: "#0a192f" }}>{srv.title}</h4>
                      <p style={{ margin: 0, fontSize: "0.84rem", color: "#64748b", lineHeight: 1.5 }}>
                        {srv.description?.slice(0, 90)}...
                      </p>
                      <div style={{ marginTop: "auto", paddingTop: "8px", fontWeight: 800, color: "#0a192f", fontSize: "0.95rem" }}>
                        {srv.starting_price}
                      </div>
                    </div>
                    <div className="admin-item-footer">
                      <span style={{ fontSize: "0.78rem", color: "#64748b" }}>Order #{srv.order || srv.id}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteService(srv.id)}
                        className="admin-action-btn-del"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============================================================== */}
        {/* TAB: RAAVAN KUTTY CHUTTIES MANAGEMENT                           */}
        {/* ============================================================== */}
        {activeTab === "kutty_chutties" && (
          <section className="admin-tab-content-panel">
            <div className="admin-white-card">
              <div className="card-head-row">
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "1.4rem" }}>👶</span>
                    <h2 className="admin-card-section-title">RAAVAN KUTTY CHUTTIES — Price &amp; Package Cockpit</h2>
                  </div>
                  <p className="card-subtitle-sub">
                    Direct pricing and package controls for <strong>@toddlers_by_raavan</strong> (Newborns 5–30 days &amp; Toddlers 1–3 years).
                  </p>
                </div>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <button
                    type="button"
                    className="admin-sync-btn"
                    onClick={() => onNavigate("kutty-chutties")}
                    style={{ background: "#f0f9ff", border: "1px solid #bae6fd", color: "#0284c7" }}
                  >
                    🌐 View Live Page ↗
                  </button>
                  <button
                    type="button"
                    className="admin-quick-add-btn"
                    onClick={() => {
                      setNewPackage({
                        name: "",
                        category: "newborn_toddler",
                        price_display: "Rs. ",
                        duration: "",
                        badge: "",
                        description: "",
                        features: "",
                      });
                      setShowAddPackage(!showAddPackage);
                    }}
                  >
                    {showAddPackage ? "✕ Close Form" : "+ Add Kutty Theme / Package"}
                  </button>
                </div>
              </div>

              {/* Add New Kutty Package Form */}
              {showAddPackage && (
                <div className="admin-form-card" style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0", marginBottom: "24px" }}>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#16a34a", margin: "0 0 16px" }}>
                    + Add New Kutty Chutties Package / Tier
                  </h3>
                  <form onSubmit={handleAddPackage} style={{ display: "grid", gap: "16px" }}>
                    <div className="admin-form-grid">
                      <div className="admin-form-field">
                        <label className="admin-form-label">Package Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Tiny Royalty Plus"
                          value={newPackage.name}
                          onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
                          className="admin-form-input"
                        />
                      </div>
                      <div className="admin-form-field">
                        <label className="admin-form-label">Price Display *</label>
                        <input
                          type="text"
                          required
                          placeholder="Rs. 15,000"
                          value={newPackage.price_display}
                          onChange={(e) => setNewPackage({ ...newPackage, price_display: e.target.value })}
                          className="admin-form-input"
                        />
                      </div>
                    </div>

                    <div className="admin-form-grid">
                      <div className="admin-form-field">
                        <label className="admin-form-label">Category</label>
                        <select
                          value={newPackage.category}
                          onChange={(e) => setNewPackage({ ...newPackage, category: e.target.value })}
                          className="admin-form-select"
                        >
                          <option value="newborn_toddler">Kutty Chutties (Newborn &amp; Toddler)</option>
                          <option value="add_on">Optional Add-On</option>
                        </select>
                      </div>
                      <div className="admin-form-field">
                        <label className="admin-form-label">Duration</label>
                        <input
                          type="text"
                          placeholder="e.g. 60-minute session"
                          value={newPackage.duration}
                          onChange={(e) => setNewPackage({ ...newPackage, duration: e.target.value })}
                          className="admin-form-input"
                        />
                      </div>
                    </div>

                    <div className="admin-form-field">
                      <label className="admin-form-label">Badge (e.g. Most Popular, Luxury)</label>
                      <input
                        type="text"
                        placeholder="Most Popular"
                        value={newPackage.badge}
                        onChange={(e) => setNewPackage({ ...newPackage, badge: e.target.value })}
                        className="admin-form-input"
                      />
                    </div>

                    <div className="admin-form-field">
                      <label className="admin-form-label">Features / Deliverables (1 per line)</label>
                      <textarea
                        rows="4"
                        placeholder="3 themed setups&#10;3 outfits / props provided&#10;15 edited digital photos&#10;Family portrait included&#10;1 complimentary frame"
                        value={newPackage.features}
                        onChange={(e) => setNewPackage({ ...newPackage, features: e.target.value })}
                        className="admin-form-textarea"
                      />
                    </div>

                    <button type="submit" className="admin-submit-btn-primary" style={{ alignSelf: "flex-start" }}>
                      Save to Kutty Chutties →
                    </button>
                  </form>
                </div>
              )}

              {/* Kutty Chutties 4 Primary Packages Grid */}
              <div style={{ marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", marginBottom: "1rem" }}>
                  📦 Active Investment Tiers
                </h3>
                <div className="admin-items-grid">
                  {packages
                    .filter((p) => p.category === "newborn_toddler" || p.id === "mini-memories" || p.id === "sweet-beginnings" || p.id === "little-stars" || p.id === "tiny-royalty")
                    .map((pkg) => {
                      const isEditing = editingPkgId === pkg.id;

                      if (isEditing) {
                        return (
                          <div
                            key={pkg.id}
                            className="admin-item-card"
                            style={{ border: "2px solid #0284c7", background: "#f8fafc" }}
                          >
                            <div className="admin-item-body">
                              <h4 style={{ margin: "0 0 12px", fontSize: "1rem", color: "#0284c7" }}>
                                ✏️ Editing: {pkg.name}
                              </h4>
                              <div style={{ display: "grid", gap: "8px" }}>
                                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#475569" }}>
                                  Price Display
                                </label>
                                <input
                                  type="text"
                                  value={editPkgData.price_display ?? pkg.price_display}
                                  onChange={(e) => setEditPkgData({ ...editPkgData, price_display: e.target.value })}
                                  className="admin-form-input"
                                />

                                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#475569" }}>
                                  Duration
                                </label>
                                <input
                                  type="text"
                                  value={editPkgData.duration ?? pkg.duration ?? ""}
                                  onChange={(e) => setEditPkgData({ ...editPkgData, duration: e.target.value })}
                                  className="admin-form-input"
                                />

                                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#475569" }}>
                                  Badge (optional)
                                </label>
                                <input
                                  type="text"
                                  value={editPkgData.badge ?? pkg.badge ?? ""}
                                  onChange={(e) => setEditPkgData({ ...editPkgData, badge: e.target.value })}
                                  className="admin-form-input"
                                />

                                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#475569" }}>
                                  Features (1 per line)
                                </label>
                                <textarea
                                  rows="4"
                                  value={
                                    editPkgData.features !== undefined
                                      ? editPkgData.features
                                      : (Array.isArray(pkg.features) ? pkg.features.join("\n") : pkg.features || "")
                                  }
                                  onChange={(e) => setEditPkgData({ ...editPkgData, features: e.target.value })}
                                  className="admin-form-textarea"
                                />
                              </div>
                            </div>
                            <div className="admin-item-footer" style={{ gap: "8px" }}>
                              <button
                                type="button"
                                onClick={() => {
                                  const payload = {
                                    ...editPkgData,
                                    features:
                                      typeof editPkgData.features === "string"
                                        ? editPkgData.features.split("\n").filter(Boolean)
                                        : pkg.features,
                                  };
                                  handleUpdatePackage(pkg.id, payload);
                                }}
                                className="admin-action-btn-view"
                                style={{ background: "#0284c7", color: "#fff", border: "none" }}
                              >
                                Save Changes
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingPkgId(null);
                                  setEditPkgData({});
                                }}
                                className="admin-action-btn-del"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div className="admin-item-card" key={pkg.id}>
                          <div className="admin-item-body">
                            {pkg.badge && (
                              <span
                                style={{
                                  fontSize: "0.72rem",
                                  fontWeight: 800,
                                  background: "#e0f2fe",
                                  color: "#0284c7",
                                  padding: "3px 8px",
                                  borderRadius: "999px",
                                  alignSelf: "flex-start",
                                }}
                              >
                                {pkg.badge}
                              </span>
                            )}
                            <h4 style={{ margin: "4px 0 0", fontSize: "1.15rem", fontWeight: 800, color: "#0f172a" }}>
                              {pkg.name}
                            </h4>
                            <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#0284c7", margin: "6px 0" }}>
                              {pkg.price_display || pkg.price}
                            </div>
                            {pkg.duration && (
                              <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>
                                ⏱ {pkg.duration}
                              </div>
                            )}
                            <ul style={{ paddingLeft: "18px", margin: "14px 0 0", fontSize: "0.84rem", color: "#334155", lineHeight: 1.6 }}>
                              {(Array.isArray(pkg.features) ? pkg.features : []).map((feat, idx) => (
                                <li key={idx}>{feat}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="admin-item-footer">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingPkgId(pkg.id);
                                setEditPkgData({
                                  price_display: pkg.price_display || pkg.price,
                                  duration: pkg.duration || "",
                                  badge: pkg.badge || "",
                                  features: Array.isArray(pkg.features) ? pkg.features.join("\n") : pkg.features || "",
                                });
                              }}
                              className="admin-action-btn-view"
                            >
                              ✏️ Edit Details
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeletePackage(pkg.id)}
                              className="admin-action-btn-del"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Optional Add-Ons Section */}
              <div style={{ borderTop: "1.5px solid #f1f5f9", paddingTop: "2rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                      🎂 Optional Add-Ons
                    </h3>
                    <p style={{ margin: "2px 0 0", fontSize: "0.82rem", color: "#64748b" }}>
                      Cake smash setup, extra digital images, and framed canvas extensions.
                    </p>
                  </div>
                </div>

                <div className="admin-items-grid">
                  {packages
                    .filter((p) => p.category === "add_on")
                    .map((addon) => (
                      <div className="admin-item-card" key={addon.id}>
                        <div className="admin-item-body">
                          <span style={{ fontSize: "1.6rem" }}>
                            {addon.name.toLowerCase().includes("cake") ? "🎂" : "📸"}
                          </span>
                          <h4 style={{ margin: "6px 0 0", fontSize: "1.05rem", fontWeight: 800, color: "#0f172a" }}>
                            {addon.name}
                          </h4>
                          <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "#0284c7", margin: "4px 0" }}>
                            {addon.price_display}
                          </div>
                          <p style={{ fontSize: "0.82rem", color: "#64748b", margin: 0 }}>
                            {addon.description || "High-end archival addon"}
                          </p>
                        </div>
                        <div className="admin-item-footer">
                          <button
                            type="button"
                            onClick={() => {
                              const newPrice = prompt(`Enter new price display for ${addon.name}:`, addon.price_display);
                              if (newPrice && newPrice !== addon.price_display) {
                                handleUpdatePackage(addon.id, { price_display: newPrice });
                              }
                            }}
                            className="admin-action-btn-view"
                          >
                            ✏️ Edit Price
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeletePackage(addon.id)}
                            className="admin-action-btn-del"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Kutty Chutties Photo Collection in Admin */}
              <div style={{ borderTop: "1.5px solid #f1f5f9", paddingTop: "2rem", marginTop: "2rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "10px" }}>
                  <div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                      📸 Photo Collection ({gallery.filter((g) => g.category === "Newborns" || g.category === "Toddlers").length} Photos)
                    </h3>
                    <p style={{ margin: "2px 0 0", fontSize: "0.82rem", color: "#64748b" }}>
                      All extracted client portfolio photographs active across the studio catalog.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab("gallery")}
                    className="admin-sync-btn"
                    style={{ background: "#f0f9ff", border: "1px solid #bae6fd", color: "#0284c7" }}
                  >
                    View in Full Gallery Manager →
                  </button>
                </div>

                <div className="admin-items-grid">
                  {gallery
                    .filter((g) => g.category === "Newborns" || g.category === "Toddlers")
                    .map((photo) => (
                      <div className="admin-item-card" key={photo.id}>
                        <img
                          src={photo.image_url}
                          alt={photo.title}
                          className="admin-item-img"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/banners/banner_toddler.jpg";
                          }}
                        />
                        <div className="admin-item-body">
                          <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#0284c7", textTransform: "uppercase" }}>
                            {photo.category}
                          </span>
                          <h4 style={{ margin: "2px 0 0", fontSize: "0.95rem", fontWeight: 800, color: "#0f172a" }}>
                            {photo.title}
                          </h4>
                          <span style={{ fontSize: "0.76rem", color: "#64748b" }}>
                            📍 {photo.location || "Flagship Studio"}
                          </span>
                        </div>
                        <div className="admin-item-footer">
                          <span style={{ fontSize: "0.75rem", color: "#64748b" }}>#{photo.order || photo.id}</span>
                          <button
                            type="button"
                            onClick={() => handleDeleteGallery(photo.id)}
                            className="admin-action-btn-del"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ============================================================== */}
        {/* TAB 4: PRICING PACKAGES                                        */}
        {/* ============================================================== */}
        {activeTab === "packages" && (
          <section className="admin-tab-content-panel">
            <div className="admin-white-card">
              <div className="card-head-row">
                <div>
                  <h2 className="admin-card-section-title">Pricing Packages &amp; Investments ({packages.length})</h2>
                  <p className="card-subtitle-sub">Manage transparent pricing for Kutty Chutties milestones and wedding collections.</p>
                </div>
                <button
                  type="button"
                  className="admin-quick-add-btn"
                  onClick={() => setShowAddPackage(!showAddPackage)}
                >
                  {showAddPackage ? "✕ Cancel" : "+ Add New Package"}
                </button>
              </div>

              {/* Add Package Form */}
              {showAddPackage && (
                <div className="admin-form-card" style={{ background: "#f8fafc", border: "1.5px solid #bae6fd" }}>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0284c7", margin: "0 0 16px" }}>+ New Pricing Package</h3>
                  <form onSubmit={handleAddPackage} style={{ display: "grid", gap: "16px" }}>
                    <div className="admin-form-grid">
                      <div className="admin-form-field">
                        <label className="admin-form-label">Package Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Little Stars (3 Themes)"
                          value={newPackage.name}
                          onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
                          className="admin-form-input"
                        />
                      </div>
                      <div className="admin-form-field">
                        <label className="admin-form-label">Price Display *</label>
                        <input
                          type="text"
                          required
                          placeholder="₹8,000"
                          value={newPackage.price_display}
                          onChange={(e) => setNewPackage({ ...newPackage, price_display: e.target.value })}
                          className="admin-form-input"
                        />
                      </div>
                    </div>

                    <div className="admin-form-grid">
                      <div className="admin-form-field">
                        <label className="admin-form-label">Badge Label (optional)</label>
                        <input
                          type="text"
                          placeholder="e.g. Most Popular"
                          value={newPackage.badge}
                          onChange={(e) => setNewPackage({ ...newPackage, badge: e.target.value })}
                          className="admin-form-input"
                        />
                      </div>
                      <div className="admin-form-field">
                        <label className="admin-form-label">Shoot Duration</label>
                        <input
                          type="text"
                          placeholder="e.g. 2.5 - 3 Hours"
                          value={newPackage.duration}
                          onChange={(e) => setNewPackage({ ...newPackage, duration: e.target.value })}
                          className="admin-form-input"
                        />
                      </div>
                    </div>

                    <div className="admin-form-field">
                      <label className="admin-form-label">Features (1 per line)</label>
                      <textarea
                        rows="4"
                        placeholder="3 Custom Creative Themes&#10;25 Retouched High-Res Photos&#10;Parents & Siblings Included&#10;Props & Costumes Provided"
                        value={newPackage.features}
                        onChange={(e) => setNewPackage({ ...newPackage, features: e.target.value })}
                        className="admin-form-textarea"
                      />
                    </div>

                    <button type="submit" className="admin-submit-btn-primary" style={{ alignSelf: "flex-start" }}>
                      Save Package →
                    </button>
                  </form>
                </div>
              )}

              {/* Packages Cards Grid */}
              <div className="admin-items-grid">
                {packages.map((pkg) => (
                  <div className="admin-item-card" key={pkg.id || pkg.name}>
                    <div className="admin-item-body">
                      {pkg.badge && (
                        <span style={{ fontSize: "0.72rem", fontWeight: 800, background: "#e0f2fe", color: "#0284c7", padding: "3px 8px", borderRadius: "999px", alignSelf: "flex-start" }}>
                          {pkg.badge}
                        </span>
                      )}
                      <h4 style={{ margin: "4px 0 0", fontSize: "1.1rem", fontWeight: 800, color: "#0a192f" }}>{pkg.name}</h4>
                      <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0284c7", margin: "6px 0" }}>
                        {pkg.price_display || pkg.price}
                      </div>
                      {pkg.duration && <div style={{ fontSize: "0.78rem", color: "#64748b" }}>⏱ {pkg.duration}</div>}
                      <ul style={{ paddingLeft: "18px", margin: "12px 0 0", fontSize: "0.82rem", color: "#475569", lineHeight: 1.6 }}>
                        {(Array.isArray(pkg.features) ? pkg.features : []).slice(0, 4).map((feat, idx) => (
                          <li key={idx}>{feat}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="admin-item-footer">
                      <span style={{ fontSize: "0.75rem", color: "#64748b" }}>{pkg.category}</span>
                      <button
                        type="button"
                        onClick={() => handleDeletePackage(pkg.id)}
                        className="admin-action-btn-del"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============================================================== */}
        {/* TAB 5: CURATED WORKS GALLERY                                   */}
        {/* ============================================================== */}
        {activeTab === "gallery" && (
          <section className="admin-tab-content-panel">
            <div className="admin-white-card">
              <div className="card-head-row">
                <div>
                  <h2 className="admin-card-section-title">Curated Works Gallery ({gallery.length})</h2>
                  <p className="card-subtitle-sub">Manage high-resolution photo showcases that appear on the public Gallery page.</p>
                </div>
                <button
                  type="button"
                  className="admin-quick-add-btn"
                  onClick={() => setShowAddGallery(!showAddGallery)}
                >
                  {showAddGallery ? "✕ Cancel" : "+ Add Photo to Gallery"}
                </button>
              </div>

              {/* Add Gallery Photo Form */}
              {showAddGallery && (
                <div className="admin-form-card" style={{ background: "#f8fafc", border: "1.5px solid #bae6fd" }}>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0284c7", margin: "0 0 16px" }}>+ Add Photo Showcase</h3>
                  <form onSubmit={handleAddGallery} style={{ display: "grid", gap: "16px" }}>
                    <div className="admin-form-grid">
                      <div className="admin-form-field">
                        <label className="admin-form-label">Photo Title *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Sacred Muhurtham Garlands"
                          value={newGallery.title}
                          onChange={(e) => setNewGallery({ ...newGallery, title: e.target.value })}
                          className="admin-form-input"
                        />
                      </div>
                      <div className="admin-form-field">
                        <label className="admin-form-label">Category</label>
                        <select
                          value={newGallery.category}
                          onChange={(e) => setNewGallery({ ...newGallery, category: e.target.value })}
                          className="admin-form-select"
                        >
                          <option value="Weddings">Weddings</option>
                          <option value="Toddlers">Toddlers</option>
                          <option value="Newborns">Newborns</option>
                          <option value="Couple portraits">Couple portraits</option>
                          <option value="Maternity">Maternity</option>
                          <option value="Photobooks">Photobooks</option>
                        </select>
                      </div>
                    </div>

                    <div className="admin-form-grid">
                      <div className="admin-form-field">
                        <label className="admin-form-label">Image URL / Path *</label>
                        <input
                          type="text"
                          required
                          placeholder="/kalyanam/page_4_img_1.png or https://..."
                          value={newGallery.image_url}
                          onChange={(e) => setNewGallery({ ...newGallery, image_url: e.target.value })}
                          className="admin-form-input"
                        />
                      </div>
                      <div className="admin-form-field">
                        <label className="admin-form-label">Location / Couple</label>
                        <input
                          type="text"
                          placeholder="Krishnagiri, Tamil Nadu"
                          value={newGallery.location}
                          onChange={(e) => setNewGallery({ ...newGallery, location: e.target.value })}
                          className="admin-form-input"
                        />
                      </div>
                    </div>

                    <div className="admin-form-field">
                      <label className="admin-form-label">Story / Caption (optional)</label>
                      <textarea
                        rows="2"
                        placeholder="Sacred rituals, joyous tears and raw emotion..."
                        value={newGallery.description}
                        onChange={(e) => setNewGallery({ ...newGallery, description: e.target.value })}
                        className="admin-form-textarea"
                      />
                    </div>

                    <button type="submit" className="admin-submit-btn-primary" style={{ alignSelf: "flex-start" }}>
                      Upload to Gallery →
                    </button>
                  </form>
                </div>
              )}

              {/* Gallery Grid */}
              <div className="admin-items-grid">
                {gallery.map((item) => (
                  <div className="admin-item-card" key={item.id}>
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="admin-item-img"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/kalyanam/page_4_img_1.png";
                      }}
                    />
                    <div className="admin-item-body">
                      <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#0284c7", textTransform: "uppercase" }}>{item.category}</span>
                      <h4 style={{ margin: "2px 0 0", fontSize: "0.98rem", fontWeight: 800, color: "#0a192f" }}>{item.title}</h4>
                      {item.location && <p style={{ margin: "2px 0 0", fontSize: "0.78rem", color: "#64748b" }}>📍 {item.location}</p>}
                    </div>
                    <div className="admin-item-footer">
                      <span style={{ fontSize: "0.75rem", color: "#64748b" }}>{item.aspect || "portrait"}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteGallery(item.id)}
                        className="admin-action-btn-del"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============================================================== */}
        {/* TAB 6: STUDIO PROFILE & BRANCHES                               */}
        {/* ============================================================== */}
        {activeTab === "studio" && (
          <section className="admin-tab-content-panel">
            <div className="admin-white-card">
              <div className="card-head-row">
                <div>
                  <h2 className="admin-card-section-title">Studio Brand Profile &amp; Facilities</h2>
                  <p className="card-subtitle-sub">Update Mr. Gowtham Raj's founder details, phone, email, and Krishnagiri physical studio branches.</p>
                </div>
              </div>

              <form onSubmit={handleSaveStudio} style={{ display: "grid", gap: "20px" }}>
                <div className="admin-form-grid">
                  <div className="admin-form-field">
                    <label className="admin-form-label">Studio Name</label>
                    <input
                      type="text"
                      value={studioProfile.name || ""}
                      onChange={(e) => setStudioProfile({ ...studioProfile, name: e.target.value })}
                      className="admin-form-input"
                    />
                  </div>
                  <div className="admin-form-field">
                    <label className="admin-form-label">Brand Tagline</label>
                    <input
                      type="text"
                      value={studioProfile.tagline || ""}
                      onChange={(e) => setStudioProfile({ ...studioProfile, tagline: e.target.value })}
                      className="admin-form-input"
                    />
                  </div>
                </div>

                <div className="admin-form-grid">
                  <div className="admin-form-field">
                    <label className="admin-form-label">Founder Name</label>
                    <input
                      type="text"
                      value={studioProfile.founder_name || "Mr. Gowtham Raj"}
                      onChange={(e) => setStudioProfile({ ...studioProfile, founder_name: e.target.value })}
                      className="admin-form-input"
                    />
                  </div>
                  <div className="admin-form-field">
                    <label className="admin-form-label">Experience Badge</label>
                    <input
                      type="text"
                      value={studioProfile.founder_experience || "8+ Years"}
                      onChange={(e) => setStudioProfile({ ...studioProfile, founder_experience: e.target.value })}
                      className="admin-form-input"
                    />
                  </div>
                </div>

                <div className="admin-form-grid">
                  <div className="admin-form-field">
                    <label className="admin-form-label">Contact Phone</label>
                    <input
                      type="text"
                      value={studioProfile.phone || ""}
                      onChange={(e) => setStudioProfile({ ...studioProfile, phone: e.target.value })}
                      className="admin-form-input"
                    />
                  </div>
                  <div className="admin-form-field">
                    <label className="admin-form-label">WhatsApp Number</label>
                    <input
                      type="text"
                      value={studioProfile.whatsapp || ""}
                      onChange={(e) => setStudioProfile({ ...studioProfile, whatsapp: e.target.value })}
                      className="admin-form-input"
                    />
                  </div>
                </div>

                <div className="admin-form-field">
                  <label className="admin-form-label">Official Email</label>
                  <input
                    type="email"
                    value={studioProfile.email || ""}
                    onChange={(e) => setStudioProfile({ ...studioProfile, email: e.target.value })}
                    className="admin-form-input"
                  />
                </div>

                <div className="admin-form-field">
                  <label className="admin-form-label">Founder Philosophy &amp; Story</label>
                  <textarea
                    rows="3"
                    value={studioProfile.founder_bio || ""}
                    onChange={(e) => setStudioProfile({ ...studioProfile, founder_bio: e.target.value })}
                    className="admin-form-textarea"
                  />
                </div>

                {/* Branches Preview */}
                <div style={{ marginTop: "12px", borderTop: "1px solid #e2e8f0", paddingTop: "16px" }}>
                  <h4 style={{ margin: "0 0 12px", fontSize: "0.95rem", color: "#0a192f", fontWeight: 800 }}>Physical Branches in Krishnagiri:</h4>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                      <strong>1. The Creative Space (Flagship Studio)</strong>
                      <p style={{ margin: "4px 0 0", fontSize: "0.8rem", color: "#64748b" }}>
                        3/470B RCC Moulding Building, Gandhi Nagar, Salem-Bangalore Highways, Krishnagiri
                      </p>
                    </div>
                    <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                      <strong>2. Work Space (Production &amp; Editing Hub)</strong>
                      <p style={{ margin: "4px 0 0", fontSize: "0.8rem", color: "#64748b" }}>
                        3/59-9, Gandhi Nagar, Near Pillayar Kovil, Krishnagiri
                      </p>
                    </div>
                  </div>
                </div>

                <button type="submit" className="admin-submit-btn-primary" style={{ justifySelf: "start", marginTop: "12px" }}>
                  💾 Save Studio Profile to Database
                </button>
              </form>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
