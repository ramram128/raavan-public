# Raavan Studio’z — Dynamic Full-Stack Web Application

**Tagline:** *“Make a count Click the moment”*  
**Founder:** Mr. Gowtham Raj (8+ Years Experience)  
**Founded:** 21st January 2021  
**Locations:** 
- **The Creative Space:** 3/470B RCC Moulding Building- Ground floor, Gandhi nagar, Opposite Gunam Hospital, Near Challenge Gym, Salem-Bangalore Highways, Krishnagiri- 635001 ([Google Maps](https://maps.app.goo.gl/13tnC9ZgRtQ5Ftje8))
- **Work Space:** 3/59-9, Gandhi Nagar, Near Pillayar Kovil (BATA Showroom down lane, backside central theatre), Krishnagiri- 635001 ([Google Maps](https://maps.app.goo.gl/e11f4M4RwXUbF1gcA))

**Contact:** +91-9500306696 | raavanstudioz24@gmail.com  
**Instagram:** [@raavan_studioz](https://instagram.com/raavan_studioz) | [@toddlers_by_raavan](https://instagram.com/toddlers_by_raavan) | [@photobooks_by_raavan](https://instagram.com/photobooks_by_raavan)

---

## Architecture Overview

- **Backend:** **Laravel 13 (PHP 8.3 + SQLite)**
  - RESTful API endpoints for Studio Profile, Services, Pricing Packages, Curated Works, Testimonials, Terms & Conditions, and Enquiries.
  - Automatic validation, SQLite database storage, email notification triggers, and prefilled WhatsApp URL generation for direct client conversations.
- **Frontend:** **React 18 + Vite**
  - Fully dynamic multi-page React application connected to Laravel API (`/api/...`).
  - Bilingual Terms & Conditions (English / தமிழ்).
  - Dual Enquiry modes: Wedding & Events + Newborn/Toddler sessions with specific parameters (baby age, weight, gender, packages, preferred slot).
  - High-resolution portfolio galleries and real brand imagery extracted from Google Drive.

---

## Running the Project

### 1. Start the Laravel Backend API (Port 8000)
```sh
npm run backend
# Or:
cd backend && php artisan serve --port=8000
```
Backend runs at `http://127.0.0.1:8000`

### 2. Start the React Frontend (Port 5173)
```sh
npm run dev
# Or:
cd frontend && npm run dev
```
Frontend runs at `http://localhost:5173` (with built-in Vite reverse proxy to `/api` at port 8000)

---

## API Endpoints

- `GET /api/studio` — Brand profile, founder details, 2 branches with map links, social handles, stats.
- `GET /api/services` — Complete visual disciplines (Weddings, Maternity, Newborn, Toddlers, Model portraits, Photobooks, Automotive).
- `GET /api/packages` — Kutty Chutties tier packages (Mini Memories ₹2,500, Sweet Beginnings ₹5,000, Little Stars ₹8,000, Tiny Royalty ₹12,000, Add-ons, Wedding quotes).
- `GET /api/gallery` — Curated works with categorized filtering.
- `GET /api/terms` — Bilingual English & Tamil legal policies and terms.
- `GET /api/testimonials` — Client testimonials and feedback.
- `POST /api/enquiries` — Stores new enquiry, sends notification to `raavanstudioz24@gmail.com`, and outputs preformatted direct WhatsApp link (`wa.me/919500306696`).
- `GET /api/enquiries` — Admin review of incoming bookings.
