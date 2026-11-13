const API_BASE = "/api";

export async function fetchFromApi(endpoint, fallbackData) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        Accept: "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(`API responded with ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.warn(`[API] Failed to fetch ${endpoint}, using fallback:`, err);
    return fallbackData;
  }
}

export async function postEnquiry(payload) {
  try {
    const res = await fetch(`${API_BASE}/enquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || `Error ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    // If backend is unavailable, construct a direct WhatsApp link so user is never blocked!
    console.warn("[API] Backend submission failed, generating client-side WhatsApp fallback", err);
    let waText = `Hi Raavan Studio’z! I have an upcoming event/project in mind and need your team to handle it.\n\n`;
    waText += `• Name: ${payload.name}\n• Phone: ${payload.phone}\n`;
    if (payload.email) waText += `• Email: ${payload.email}\n`;
    if (payload.type === 'newborn_toddler') {
      waText += `• Session: Newborn / Toddler Shoot\n`;
      if (payload.parent_name) waText += `• Parent: ${payload.parent_name}\n`;
      if (payload.baby_name) waText += `• Baby Name: ${payload.baby_name}\n`;
      if (payload.baby_age) waText += `• Baby Age: ${payload.baby_age}\n`;
      if (payload.baby_weight) waText += `• Baby Weight: ${payload.baby_weight}\n`;
      if (payload.selected_package) waText += `• Selected Package: ${payload.selected_package}\n`;
      if (payload.preferred_slot) waText += `• Preferred Slot: ${payload.preferred_slot}\n`;
    } else {
      if (payload.event_type) waText += `• Event: ${payload.event_type}\n`;
      if (payload.event_date) waText += `• Date: ${payload.event_date}\n`;
      if (payload.location) waText += `• Location: ${payload.location}\n`;
    }
    if (payload.message) waText += `\nNotes: ${payload.message}`;

    return {
      success: true,
      message: "Enquiry prepared! Click below to send directly via WhatsApp.",
      whatsapp_url: `https://wa.me/919500306696?text=${encodeURIComponent(waText)}`,
      fallback: true,
    };
  }
}

