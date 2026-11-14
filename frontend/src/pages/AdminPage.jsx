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

  // Active Tab
  const [activeTab, setActiveTab] = useState("enquiries"); // 'enquiries', 'studio', 'services', 'packages', 'gallery', 'terms'

  // Data states
  const [enquiries, setEnquiries] = useState([]);
  const [studioProfile, setStudioProfile] = useState(defaultStudio);
  const [services, setServices] = useState([]);
  const [packages, setPackages] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [terms, setTerms] = useState([]);

  // UI state
  const [loadingData, setLoadingData] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  // Filter for enquiries
  const [enquiryFilter, setEnquiryFilter] = useState("all");

  // New Item Modals/Forms
  const [newService, setNewService] = useState({ title: "", category: "Weddings", starting_price: "₹", description: "", deliverables: "", image_url: "" });
  const [newPackage, setNewPackage] = useState({ name: "", category: "newborn_toddler", price_display: "₹", duration: "", badge: "", description: "", features: "" });
  const [newGallery, setNewGallery] = useState({ title: "", category: "Weddings", location: "Krishnagiri", description: "", image_url: "", aspect: "portrait" });
  const [newTerm, setNewTerm] = useState({ section_type: "general", section_number: "", title_en: "", title_ta: "", content_en: "", content_ta: "" });

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
        setLoginError(data.message || "Invalid login credentials");
      }
    } catch (err) {
      setLoginError("Failed to connect to backend server. Make sure Laravel is running.");
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
      const [resEnq, resStu, resServ, resPkg, resGal, resTrm] = await Promise.all([
        fetch("/api/enquiries").then((r) => (r.ok ? r.json() : [])),
        fetch("/api/studio").then((r) => (r.ok ? r.json() : null)),
        fetch("/api/services").then((r) => (r.ok ? r.json() : [])),
        fetch("/api/packages").then((r) => (r.ok ? r.json() : { all: [] })),
        fetch("/api/gallery").then((r) => (r.ok ? r.json() : [])),
        fetch("/api/terms").then((r) => (r.ok ? r.json() : { all: [] })),
      ]);

      setEnquiries(Array.isArray(resEnq) ? resEnq : []);
      if (resStu) setStudioProfile(resStu);
      setServices(Array.isArray(resServ) ? resServ : []);
      setPackages(resPkg.all || (Array.isArray(resPkg) ? resPkg : []));
      setGallery(Array.isArray(resGal) ? resGal : []);
      setTerms(resTrm.all || (Array.isArray(resTrm) ? resTrm : []));
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

  function flashMessage(msg) {
    setSaveStatus(msg);
    setTimeout(() => setSaveStatus(""), 3500);
  }

  // 1. Enquiries Actions
  async function handleStatusChange(id, newStatus) {
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setEnquiries((prev) => prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item)));
        flashMessage("Status updated!");
      }
    } catch (err) {
      alert("Error updating status");
    }
  }

  async function handleDeleteEnquiry(id) {
    if (!window.confirm("Delete this enquiry?")) return;
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

  // 2. Studio Profile Save
  async function handleSaveStudio(e) {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/studio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studioProfile),
      });
      if (res.ok) {
        flashMessage("Studio brand profile saved successfully!");
      }
    } catch (err) {
      alert("Error saving studio profile");
    }
  }

  // 3. Service Actions
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
        flashMessage("Service added!");
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

  // 4. Package Actions
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
        flashMessage("Package added!");
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

  // 5. Gallery Actions
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

  // 6. Terms Actions
  async function handleAddTerm(e) {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/terms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTerm),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setTerms([...terms, data.term]);
        setNewTerm({ section_type: "general", section_number: "", title_en: "", title_ta: "", content_en: "", content_ta: "" });
        flashMessage("Term added!");
      }
    } catch (err) {
      alert("Error adding term");
    }
  }

  async function handleDeleteTerm(id) {
    if (!window.confirm("Delete this term policy?")) return;
    try {
      const res = await fetch(`/api/admin/terms/${id}`, { method: "DELETE" });
      if (res.ok) {
        setTerms(terms.filter((t) => t.id !== id));
        flashMessage("Term policy deleted!");
      }
    } catch (err) {
      alert("Error deleting term");
    }
  }

  // ==========================================
  // RENDER LOGIN SCREEN (IF NOT AUTHENTICATED)
  // ==========================================
  if (!authToken) {
    return (
      <main className="page-container admin-login-wrapper">
        <div className="admin-login-card">
          <img
            src="/raavan-emblem-clean.png"
            alt="Raavan Studio'z"
            className="admin-login-logo"
          />
          <h1 className="admin-login-title">Raavan Studio’z</h1>
          <p className="admin-login-subtitle">
            Admin Control Center
          </p>

          {loginError && (
            <div className="admin-login-error">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="admin-field-group">
              <label className="admin-field-label">
                Admin Email
              </label>
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
              <label className="admin-field-label">
                Password
              </label>
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
              {loggingIn ? "Verifying..." : "Login to Admin Dashboard →"}
            </button>
          </form>

          <div className="admin-login-credentials">
            <p className="cred-title">Default Credentials:</p>
            <div className="cred-badges">
              <code>admin@raavanstudioz.com</code>
              <code>admin123</code>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ==========================================
  // RENDER AUTHENTICATED ADMIN DASHBOARD
  // ==========================================
  const filteredEnquiries = enquiries.filter((item) => {
    if (enquiryFilter === "all") return true;
    if (enquiryFilter === "new") return item.status === "new";
    return item.type === enquiryFilter;
  });

  return (
    <main className="page-container admin-dashboard" style={{ paddingTop: "95px", minHeight: "90vh", paddingBottom: "5rem" }}>
      {/* Admin Top Bar */}
      <div
        style={{
          background: "rgba(0, 20, 30, 0.7)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0, 212, 255, 0.2)",
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          borderRadius: "12px",
          marginBottom: "2rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <img src="/raavan-emblem-clean.png" alt="Logo" style={{ width: "36px", height: "36px", objectFit: "contain", filter: "drop-shadow(0 2px 8px rgba(56, 189, 248, 0.4))" }} />
          <div>
            <h2 style={{ fontSize: "1.2rem", margin: 0, color: "#fff" }}>Raavan Studio’z CMS</h2>
            <span style={{ fontSize: "0.8rem", color: "#00d4ff" }}>Logged in as {currentUser?.name || "Mr. Gowtham Raj"}</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {saveStatus && (
            <span style={{ background: "rgba(34, 197, 94, 0.15)", color: "#34d399", padding: "0.35rem 0.75rem", borderRadius: "6px", fontSize: "0.85rem", border: "1px solid rgba(34, 197, 94, 0.3)" }}>
              ✓ {saveStatus}
            </span>
          )}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={loadAllData}
            style={{ fontSize: "0.85rem", padding: "0.5rem 0.85rem" }}
          >
            🔄 Sync Data
          </button>
          <button
            type="button"
            onClick={handleLogout}
            style={{ background: "transparent", border: "1px solid rgba(239,68,68,0.5)", color: "#fca5a5", padding: "0.5rem 1rem", borderRadius: "8px", cursor: "pointer", fontSize: "0.85rem" }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Neat Navigation Tabs */}
      <div
        className="admin-nav-tabs"
        style={{
          display: "flex",
          gap: "0.5rem",
          flexWrap: "wrap",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          paddingBottom: "0.75rem",
          marginBottom: "2rem",
        }}
      >
        {[
          { id: "enquiries", label: "📋 Enquiries & Bookings", count: enquiries.filter((e) => e.status === "new").length },
          { id: "studio", label: "🏢 Studio Profile & Branches" },
          { id: "services", label: `📸 Services (${services.length})` },
          { id: "packages", label: `💰 Pricing Packages (${packages.length})` },
          { id: "gallery", label: `🖼️ Curated Works Gallery (${gallery.length})` },
          { id: "terms", label: `📜 Terms & Conditions (${terms.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "0.75rem 1.25rem",
              borderRadius: "8px",
              border: activeTab === tab.id ? "1px solid #00d4ff" : "1px solid transparent",
              background: activeTab === tab.id ? "rgba(0, 212, 255, 0.12)" : "rgba(255,255,255,0.03)",
              color: activeTab === tab.id ? "#00d4ff" : "rgba(255,255,255,0.8)",
              fontWeight: 600,
              fontSize: "0.92rem",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {tab.label}
            {tab.count !== undefined && tab.count > 0 && (
              <span style={{ marginLeft: "0.5rem", background: "#00d4ff", color: "#000", padding: "0.1rem 0.45rem", borderRadius: "10px", fontSize: "0.75rem", fontWeight: 800 }}>
                {tab.count} New
              </span>
            )}
          </button>
        ))}
      </div>

      {/* =========================================================
          TAB 1: ENQUIRIES & LEADS MANAGEMENT
          ========================================================= */}
      {activeTab === "enquiries" && (
        <section>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
            <h2 style={{ fontSize: "1.4rem", color: "#fff", margin: 0 }}>Client Bookings &amp; Inquiries</h2>
            <div className="segmented-control">
              <button className={`segmented-btn ${enquiryFilter === "all" ? "active" : ""}`} onClick={() => setEnquiryFilter("all")}>All ({enquiries.length})</button>
              <button className={`segmented-btn ${enquiryFilter === "new" ? "active" : ""}`} onClick={() => setEnquiryFilter("new")}>New ({enquiries.filter(e => e.status === "new").length})</button>
              <button className={`segmented-btn ${enquiryFilter === "wedding_event" ? "active" : ""}`} onClick={() => setEnquiryFilter("wedding_event")}>Weddings</button>
              <button className={`segmented-btn ${enquiryFilter === "newborn_toddler" ? "active" : ""}`} onClick={() => setEnquiryFilter("newborn_toddler")}>@toddlers</button>
            </div>
          </div>

          <div style={{ display: "grid", gap: "1.25rem" }}>
            {filteredEnquiries.map((item) => {
              const isBaby = item.type === "newborn_toddler";
              const cleanPhone = String(item.phone || "").replace(/\D/g, "");
              const waLink = `https://wa.me/${cleanPhone.startsWith("91") ? cleanPhone : "91" + cleanPhone}?text=Hi%20${encodeURIComponent(item.name)},%20thank%20you%20for%20contacting%20Raavan%20Studio%E2%80%99z!`;

              return (
                <div key={item.id} style={{ background: "rgba(255,255,255,0.03)", border: item.status === "new" ? "1.5px solid #00d4ff" : "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "1.5rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
                  <div>
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.5rem" }}>
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "0.2rem 0.5rem", borderRadius: "4px", background: isBaby ? "rgba(226,184,118,0.15)" : "rgba(0,212,255,0.15)", color: isBaby ? "#e2b876" : "#00d4ff" }}>
                        {isBaby ? "@toddlers_by_raavan" : "Wedding / Event"}
                      </span>
                      <span style={{ fontSize: "0.8rem", opacity: 0.5 }}>#{item.id} · {item.created_at ? new Date(item.created_at).toLocaleDateString() : ""}</span>
                    </div>

                    <h3 style={{ fontSize: "1.3rem", color: "#fff", marginBottom: "0.3rem" }}>{item.name}</h3>
                    <p style={{ color: "#00d4ff", fontSize: "0.95rem", fontWeight: 600 }}>📞 {item.phone} {item.email && <span style={{ opacity: 0.8, color: "#fff", marginLeft: "0.5rem" }}>✉️ {item.email}</span>}</p>

                    {isBaby ? (
                      <div style={{ fontSize: "0.88rem", background: "rgba(0,0,0,0.25)", padding: "0.75rem", borderRadius: "8px", marginTop: "0.5rem", lineHeight: 1.5 }}>
                        <div><strong>Parent:</strong> {item.parent_name || item.name}</div>
                        <div><strong>Baby Name:</strong> {item.baby_name || "N/A"} ({item.baby_gender || "N/A"})</div>
                        <div><strong>Age:</strong> {item.baby_age || "N/A"} {item.baby_weight && `· Weight: ${item.baby_weight}`}</div>
                        <div><strong>Package:</strong> {item.selected_package}</div>
                        <div><strong>Preferred Slot:</strong> {item.preferred_slot || "N/A"}</div>
                      </div>
                    ) : (
                      <div style={{ fontSize: "0.88rem", background: "rgba(0,0,0,0.25)", padding: "0.75rem", borderRadius: "8px", marginTop: "0.5rem", lineHeight: 1.5 }}>
                        <div><strong>Event:</strong> {item.event_type}</div>
                        <div><strong>Date:</strong> {item.event_date || "N/A"}</div>
                        <div><strong>Venue:</strong> {item.location || "N/A"}</div>
                      </div>
                    )}
                    {item.message && <p style={{ marginTop: "0.5rem", fontStyle: "italic", opacity: 0.85, fontSize: "0.88rem" }}>“{item.message}”</p>}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "1rem" }}>
                    <div>
                      <label style={{ fontSize: "0.8rem", opacity: 0.7, display: "block", marginBottom: "0.35rem" }}>Update Status:</label>
                      <select
                        value={item.status || "new"}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", fontWeight: 600 }}
                      >
                        <option value="new">● New Lead</option>
                        <option value="contacted">● Contacted / In Talk</option>
                        <option value="booked">✓ Confirmed / Booked</option>
                        <option value="completed">★ Completed</option>
                        <option value="cancelled">✕ Cancelled</option>
                      </select>
                    </div>

                    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                      <a href={waLink} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ flex: 1, textAlign: "center", padding: "0.6rem" }}>
                        💬 WhatsApp
                      </a>
                      <a href={`tel:${item.phone}`} className="btn btn-secondary" style={{ padding: "0.6rem 1rem" }}>
                        📞 Call
                      </a>
                      <button type="button" onClick={() => handleDeleteEnquiry(item.id)} style={{ background: "transparent", border: "1px solid rgba(239,68,68,0.4)", color: "#ef4444", borderRadius: "8px", padding: "0.6rem" }}>
                        🗑
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* =========================================================
          TAB 2: STUDIO PROFILE & BRANCHES
          ========================================================= */}
      {activeTab === "studio" && (
        <section style={{ maxWidth: "800px" }}>
          <h2 style={{ fontSize: "1.4rem", color: "#fff", marginBottom: "1.25rem" }}>Edit Studio Information</h2>
          <form onSubmit={handleSaveStudio} style={{ display: "grid", gap: "1.25rem", background: "rgba(255,255,255,0.03)", padding: "2rem", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.1)" }}>
            <div className="form-row two-col">
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", opacity: 0.8, marginBottom: "0.3rem" }}>Studio Brand Name</label>
                <input type="text" value={studioProfile.name || ""} onChange={(e) => setStudioProfile({ ...studioProfile, name: e.target.value })} style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", opacity: 0.8, marginBottom: "0.3rem" }}>Tagline</label>
                <input type="text" value={studioProfile.tagline || ""} onChange={(e) => setStudioProfile({ ...studioProfile, tagline: e.target.value })} style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }} />
              </div>
            </div>

            <div className="form-row two-col">
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", opacity: 0.8, marginBottom: "0.3rem" }}>Founder Name</label>
                <input type="text" value={studioProfile.founder_name || studioProfile.founder?.name || ""} onChange={(e) => setStudioProfile({ ...studioProfile, founder_name: e.target.value })} style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", opacity: 0.8, marginBottom: "0.3rem" }}>Founder Experience</label>
                <input type="text" value={studioProfile.founder_experience || studioProfile.founder?.experience || ""} onChange={(e) => setStudioProfile({ ...studioProfile, founder_experience: e.target.value })} style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }} />
              </div>
            </div>

            <div className="form-row two-col">
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", opacity: 0.8, marginBottom: "0.3rem" }}>Phone Number</label>
                <input type="text" value={studioProfile.phone || ""} onChange={(e) => setStudioProfile({ ...studioProfile, phone: e.target.value })} style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", opacity: 0.8, marginBottom: "0.3rem" }}>Email Address</label>
                <input type="email" value={studioProfile.email || ""} onChange={(e) => setStudioProfile({ ...studioProfile, email: e.target.value })} style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }} />
              </div>
            </div>

            <div className="form-row two-col">
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", opacity: 0.8, marginBottom: "0.3rem" }}>Main Instagram</label>
                <input type="text" value={studioProfile.instagram_main || studioProfile.instagram || ""} onChange={(e) => setStudioProfile({ ...studioProfile, instagram_main: e.target.value })} style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", opacity: 0.8, marginBottom: "0.3rem" }}>Toddlers Instagram</label>
                <input type="text" value={studioProfile.instagram_toddlers || studioProfile.instagramToddlers || ""} onChange={(e) => setStudioProfile({ ...studioProfile, instagram_toddlers: e.target.value })} style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }} />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", opacity: 0.8, marginBottom: "0.3rem" }}>Service Radius &amp; Travel Policy Note</label>
              <textarea rows="3" value={studioProfile.service_radius_note || studioProfile.serviceRadius || ""} onChange={(e) => setStudioProfile({ ...studioProfile, service_radius_note: e.target.value })} style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }} />
            </div>

            <button type="submit" className="btn btn-primary" style={{ padding: "0.85rem", fontWeight: 700 }}>
              Save Studio Information →
            </button>
          </form>
        </section>
      )}

      {/* =========================================================
          TAB 3: SERVICES MANAGEMENT
          ========================================================= */}
      {activeTab === "services" && (
        <section>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
            {/* Form to Add New Service */}
            <div style={{ background: "rgba(255,255,255,0.03)", padding: "1.75rem", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.1)" }}>
              <h3 style={{ fontSize: "1.2rem", color: "#00d4ff", marginBottom: "1rem" }}>+ Add New Service</h3>
              <form onSubmit={handleAddService} style={{ display: "grid", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", opacity: 0.8 }}>Service Title *</label>
                  <input type="text" required placeholder="e.g. Candid Videography" value={newService.title} onChange={(e) => setNewService({ ...newService, title: e.target.value })} style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", opacity: 0.8 }}>Starting Price / Badge</label>
                  <input type="text" placeholder="e.g. ₹5,000 or Custom Quote" value={newService.starting_price} onChange={(e) => setNewService({ ...newService, starting_price: e.target.value })} style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", opacity: 0.8 }}>Image (Upload from Computer or enter URL)</label>
                  <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e.target.files[0], (url) => setNewService({ ...newService, image_url: url }))} style={{ marginBottom: "0.3rem", fontSize: "0.85rem" }} />
                  <input type="text" placeholder="Or enter image URL" value={newService.image_url} onChange={(e) => setNewService({ ...newService, image_url: e.target.value })} style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", opacity: 0.8 }}>Description *</label>
                  <textarea rows="3" required placeholder="Describe what the studio crafts..." value={newService.description} onChange={(e) => setNewService({ ...newService, description: e.target.value })} style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", opacity: 0.8 }}>Deliverables (comma-separated)</label>
                  <input type="text" placeholder="4K Video, High-Res Photos, Drone Stills" value={newService.deliverables} onChange={(e) => setNewService({ ...newService, deliverables: e.target.value })} style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }} />
                </div>
                <button type="submit" className="btn btn-primary" style={{ padding: "0.75rem", fontWeight: 700 }}>Save Service</button>
              </form>
            </div>

            {/* List Existing Services */}
            <div>
              <h3 style={{ fontSize: "1.2rem", color: "#fff", marginBottom: "1rem" }}>Current Services ({services.length})</h3>
              <div style={{ display: "grid", gap: "1rem" }}>
                {services.map((s) => (
                  <div key={s.id} style={{ display: "flex", gap: "1rem", alignItems: "center", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "1rem" }}>
                    {s.image_url && <img src={s.image_url} alt={s.title} style={{ width: "70px", height: "70px", objectFit: "cover", borderRadius: "8px" }} />}
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: "0 0 0.2rem", color: "#fff" }}>{s.title}</h4>
                      <span style={{ fontSize: "0.8rem", color: "#00d4ff", fontWeight: 600 }}>{s.starting_price}</span>
                      <p style={{ margin: "0.2rem 0 0", fontSize: "0.82rem", opacity: 0.75 }}>{s.description?.slice(0, 80)}...</p>
                    </div>
                    <button type="button" onClick={() => handleDeleteService(s.id)} style={{ background: "transparent", border: "1px solid rgba(239,68,68,0.4)", color: "#ef4444", borderRadius: "6px", padding: "0.4rem 0.75rem" }}>
                      🗑
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          TAB 4: PRICING PACKAGES
          ========================================================= */}
      {activeTab === "packages" && (
        <section>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
            {/* Form to Add Package */}
            <div style={{ background: "rgba(255,255,255,0.03)", padding: "1.75rem", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.1)" }}>
              <h3 style={{ fontSize: "1.2rem", color: "#00d4ff", marginBottom: "1rem" }}>+ Add New Package</h3>
              <form onSubmit={handleAddPackage} style={{ display: "grid", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", opacity: 0.8 }}>Package Name *</label>
                  <input type="text" required placeholder="e.g. Royal Stars" value={newPackage.name} onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })} style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", opacity: 0.8 }}>Category</label>
                  <select value={newPackage.category} onChange={(e) => setNewPackage({ ...newPackage, category: e.target.value })} style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }}>
                    <option value="newborn_toddler">Kutty Chutties (Newborn &amp; Toddlers)</option>
                    <option value="wedding">Weddings &amp; Celebrations</option>
                    <option value="add_on">Optional Add-On</option>
                  </select>
                </div>
                <div className="form-row two-col">
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", opacity: 0.8 }}>Price Display *</label>
                    <input type="text" required placeholder="e.g. ₹9,500" value={newPackage.price_display} onChange={(e) => setNewPackage({ ...newPackage, price_display: e.target.value })} style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", opacity: 0.8 }}>Duration / Timing</label>
                    <input type="text" placeholder="e.g. 60-minute session" value={newPackage.duration} onChange={(e) => setNewPackage({ ...newPackage, duration: e.target.value })} style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", opacity: 0.8 }}>Badge (Optional)</label>
                  <input type="text" placeholder="e.g. Most Popular" value={newPackage.badge} onChange={(e) => setNewPackage({ ...newPackage, badge: e.target.value })} style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", opacity: 0.8 }}>Features (One per line)</label>
                  <textarea rows="4" placeholder="3 themed setups&#10;15 edited digital photos&#10;1 complimentary frame" value={newPackage.features} onChange={(e) => setNewPackage({ ...newPackage, features: e.target.value })} style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }} />
                </div>
                <button type="submit" className="btn btn-primary" style={{ padding: "0.75rem", fontWeight: 700 }}>Save Package</button>
              </form>
            </div>

            {/* List Existing Packages */}
            <div>
              <h3 style={{ fontSize: "1.2rem", color: "#fff", marginBottom: "1rem" }}>Active Packages ({packages.length})</h3>
              <div style={{ display: "grid", gap: "1rem" }}>
                {packages.map((pkg) => (
                  <div key={pkg.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                        <h4 style={{ margin: 0, color: "#fff" }}>{pkg.name}</h4>
                        {pkg.badge && <span style={{ fontSize: "0.7rem", background: "#00d4ff", color: "#000", fontWeight: 700, padding: "0.15rem 0.5rem", borderRadius: "10px" }}>{pkg.badge}</span>}
                      </div>
                      <span style={{ fontSize: "1.1rem", color: "#00d4ff", fontWeight: 700, display: "block", margin: "0.25rem 0" }}>{pkg.price_display || pkg.price}</span>
                      <p style={{ fontSize: "0.82rem", opacity: 0.7, margin: "0 0 0.5rem" }}>⏱ {pkg.duration || "Session"}</p>
                    </div>
                    <button type="button" onClick={() => handleDeletePackage(pkg.id)} style={{ background: "transparent", border: "1px solid rgba(239,68,68,0.4)", color: "#ef4444", borderRadius: "6px", padding: "0.4rem 0.75rem" }}>
                      🗑
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          TAB 5: GALLERY & CURATED WORKS (IMAGE UPLOAD & REMOVE)
          ========================================================= */}
      {activeTab === "gallery" && (
        <section>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
            {/* Form to Upload / Add Photo */}
            <div style={{ background: "rgba(255,255,255,0.03)", padding: "1.75rem", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.1)" }}>
              <h3 style={{ fontSize: "1.2rem", color: "#00d4ff", marginBottom: "1rem" }}>+ Add Photo to Curated Works</h3>
              <form onSubmit={handleAddGallery} style={{ display: "grid", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", opacity: 0.8 }}>Photo Title *</label>
                  <input type="text" required placeholder="e.g. Traditional Garland Exchange" value={newGallery.title} onChange={(e) => setNewGallery({ ...newGallery, title: e.target.value })} style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", opacity: 0.8 }}>Category *</label>
                  <select value={newGallery.category} onChange={(e) => setNewGallery({ ...newGallery, category: e.target.value })} style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }}>
                    <option value="Weddings">Weddings</option>
                    <option value="Couple portraits">Couple portraits</option>
                    <option value="Maternity">Maternity</option>
                    <option value="Newborns">Newborns</option>
                    <option value="Toddlers">Toddlers</option>
                    <option value="Model portraits">Model portraits</option>
                    <option value="Photobooks">Photobooks</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", opacity: 0.8 }}>Select Image File from Computer *</label>
                  <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e.target.files[0], (url) => setNewGallery({ ...newGallery, image_url: url }))} style={{ marginBottom: "0.4rem", fontSize: "0.85rem" }} />
                  <input type="text" required placeholder="Image URL (filled automatically on file select)" value={newGallery.image_url} onChange={(e) => setNewGallery({ ...newGallery, image_url: e.target.value })} style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }} />
                  {newGallery.image_url && <img src={newGallery.image_url} alt="Preview" style={{ marginTop: "0.5rem", width: "100%", height: "140px", objectFit: "cover", borderRadius: "6px" }} />}
                </div>
                <div className="form-row two-col">
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", opacity: 0.8 }}>Location / Client</label>
                    <input type="text" placeholder="e.g. Krishnagiri" value={newGallery.location} onChange={(e) => setNewGallery({ ...newGallery, location: e.target.value })} style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", opacity: 0.8 }}>Aspect Ratio</label>
                    <select value={newGallery.aspect} onChange={(e) => setNewGallery({ ...newGallery, aspect: e.target.value })} style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }}>
                      <option value="portrait">Portrait (Tall)</option>
                      <option value="wide">Landscape (Wide)</option>
                    </select>
                  </div>
                </div>
                <button type="submit" disabled={uploadingImage} className="btn btn-primary" style={{ padding: "0.75rem", fontWeight: 700 }}>
                  {uploadingImage ? "Uploading Image..." : "Add to Live Gallery →"}
                </button>
              </form>
            </div>

            {/* List Existing Gallery Items */}
            <div>
              <h3 style={{ fontSize: "1.2rem", color: "#fff", marginBottom: "1rem" }}>Current Gallery Images ({gallery.length})</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "1rem" }}>
                {gallery.map((g) => (
                  <div key={g.id} style={{ position: "relative", borderRadius: "8px", overflow: "hidden", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <img src={g.image_url || g.image} alt={g.title} style={{ width: "100%", height: "140px", objectFit: "cover", display: "block" }} />
                    <div style={{ padding: "0.5rem" }}>
                      <p style={{ margin: "0 0 0.2rem", fontSize: "0.78rem", fontWeight: 600, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{g.title}</p>
                      <span style={{ fontSize: "0.7rem", color: "#00d4ff" }}>{g.category}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteGallery(g.id)}
                      style={{ position: "absolute", top: "5px", right: "5px", background: "rgba(0,0,0,0.7)", border: "none", color: "#ef4444", borderRadius: "50%", width: "24px", height: "24px", cursor: "pointer", fontSize: "0.8rem", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          TAB 6: TERMS & CONDITIONS MANAGEMENT
          ========================================================= */}
      {activeTab === "terms" && (
        <section>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
            {/* Add Term Policy Form */}
            <div style={{ background: "rgba(255,255,255,0.03)", padding: "1.75rem", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.1)" }}>
              <h3 style={{ fontSize: "1.2rem", color: "#00d4ff", marginBottom: "1rem" }}>+ Add Policy Clause</h3>
              <form onSubmit={handleAddTerm} style={{ display: "grid", gap: "1rem" }}>
                <div className="form-row two-col">
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", opacity: 0.8 }}>Section Type</label>
                    <select value={newTerm.section_type} onChange={(e) => setNewTerm({ ...newTerm, section_type: e.target.value })} style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }}>
                      <option value="general">General Photography</option>
                      <option value="toddlers">Toddlers by Raavan</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", opacity: 0.8 }}>Clause Number</label>
                    <input type="text" placeholder="e.g. 06 or T-04" value={newTerm.section_number} onChange={(e) => setNewTerm({ ...newTerm, section_number: e.target.value })} style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", opacity: 0.8 }}>Title (English) *</label>
                  <input type="text" required placeholder="e.g. Rescheduling Policy" value={newTerm.title_en} onChange={(e) => setNewTerm({ ...newTerm, title_en: e.target.value })} style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", opacity: 0.8 }}>தலைப்பு (தமிழ்)</label>
                  <input type="text" placeholder="எ.கா. தேதி மாற்றும் விதி" value={newTerm.title_ta} onChange={(e) => setNewTerm({ ...newTerm, title_ta: e.target.value })} style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", opacity: 0.8 }}>Content (English) *</label>
                  <textarea rows="3" required placeholder="English clause content..." value={newTerm.content_en} onChange={(e) => setNewTerm({ ...newTerm, content_en: e.target.value })} style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", opacity: 0.8 }}>விளக்கம் (தமிழ்)</label>
                  <textarea rows="3" placeholder="தமிழில் உள்ள விதிமுறை விவரம்..." value={newTerm.content_ta} onChange={(e) => setNewTerm({ ...newTerm, content_ta: e.target.value })} style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }} />
                </div>
                <button type="submit" className="btn btn-primary" style={{ padding: "0.75rem", fontWeight: 700 }}>Save Policy</button>
              </form>
            </div>

            {/* List Existing Terms */}
            <div>
              <h3 style={{ fontSize: "1.2rem", color: "#fff", marginBottom: "1rem" }}>Current Policies ({terms.length})</h3>
              <div style={{ display: "grid", gap: "1rem" }}>
                {terms.map((t) => (
                  <div key={t.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <span style={{ fontSize: "0.75rem", color: "#00d4ff", fontWeight: 700 }}>{t.section_number || `Clause`} · {t.section_type}</span>
                      <h4 style={{ margin: "0.2rem 0", color: "#fff" }}>{t.title_en}</h4>
                      {t.title_ta && <p style={{ margin: "0 0 0.4rem", color: "#7de3ff", fontSize: "0.85rem" }}>{t.title_ta}</p>}
                      <p style={{ margin: 0, fontSize: "0.82rem", opacity: 0.75, lineHeight: 1.4 }}>{t.content_en?.slice(0, 100)}...</p>
                    </div>
                    <button type="button" onClick={() => handleDeleteTerm(t.id)} style={{ background: "transparent", border: "1px solid rgba(239,68,68,0.4)", color: "#ef4444", borderRadius: "6px", padding: "0.4rem 0.75rem" }}>
                      🗑
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
