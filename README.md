# 🌌 FandomVerse — Portal for Fandom World
> **TechWiz 7 — The World Tech Championship**  
> **Theme:** Fandom Universe | **Category:** Web Innovation Unleashed  
> **Organizer:** Aptech Limited | **Version:** 1.0.0

FandomVerse is a centralized, visually rich Single Page Application (SPA) designed to unite the world's most vibrant fan communities across **Anime, Gaming, Movies, TV Shows, K-Pop, Comics, and Manga**.

---

## 🌟 Key Highlights & Feature Matrix

### 1. The 7 Fandom Category Hubs
- **Anime Realm:** Shonen, Seinen, Studio Ghibli, seasonal tier lists, breaking news.
- **Gaming Realm:** Elden Ring, Cyberpunk 2077, Tears of the Kingdom, speedrun competitions.
- **Movies Realm:** Dune 2, Spider-Verse, Marvel Avengers, 4K theatrical trailers.
- **TV Shows Realm:** Stranger Things, Arcane, House of the Dragon, prestige drama retrospectives.
- **K-Pop Realm:** BTS, BLACKPINK, NewJeans, Stray Kids, world tour trackers, lightsticks.
- **Comics Realm:** Marvel, DC, Image Comics, indie graphic novel spotlights.
- **Manga Realm:** Berserk, Chainsaw Man, Solo Leveling, mangaka ink retrospectives.

### 2. Rich Pre-Populated Client-Side Datasets
- 🧑 **35+ Character Profiles** (At least 5 per category) with role, power ratings, quotes, abilities, voice actors, and debut info.
- 📅 **21+ Event Highlights** (At least 3 per category) including conventions, watch parties, venue coordinates, and countdowns.
- 📰 **14+ Long-Form Featured Articles** with read times, authors, and related content suggestions.
- 🎬 **14+ Video Trailers & Audio Podcasts** with 4K embed player and interactive persistent bottom podcast player.
- 🖼️ **17+ High-Resolution Galleries** with interactive Lightbox (zoom in/out, keyboard navigation, full captions).
- 🛍️ **14+ Merchandise Items** with price calculation, rating, item types, and temporary shopping cart.
- 🚀 **12+ Upcoming Releases** with hype scores, platforms, and release timeline radar.

### 3. Cross-Category Features & Core SRS Requirements
- 🔍 **Global Instant Search (`Ctrl+K`):** Real-time client-side search across all 7 categories and all content types with category & type filtering.
- 🔖 **Dual Storage Bookmarks System:**
  - Bookmarks stored permanently in browser `LocalStorage`.
  - Personal notes attached to bookmarks stored strictly in `SessionStorage` (session-only).
  - One-click **Export Bookmarks as Formatted List (.md)** download.
- 🛍️ **Temporary Shopping Cart:** Adds items, adjusts quantities, and computes live **Subtotal**, **Tax (8%)**, **Shipping (Free over $50)**, and **Total Billing Amount** via JavaScript. (Checkout and payment simulated per SRS Page 12).
- 🤖 **AI-Powered Chatbot (VerseBot):** Built-in floating assistant operating on a pre-scripted rule-based knowledge engine with suggested prompt pills and navigation actions.
- 🧭 **UI Enhancements (SRS Page 14):**
  - **Simulated Visitor Counter:** Digital odometer display persisted in `LocalStorage`.
  - **Live Real-Time Clock:** Real-time ticking date and time in the top utility bar.
  - **Breadcrumb Navigation:** Dynamic breadcrumb trail across all hubs and detail views.
  - **Dummy Login/Signup:** Interactive modal simulating guest authentication.
  - **Contact Us:** Team contact information, feedback form, embedded Google Map, and simulated GPS locator.
  - **About Us:** Complete team roster, TechWiz 7 credentials, and technology stack breakdown.

---

## 🚀 Quick Start / Installation Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18+ or 20+ recommended)
- Modern web browser (Chrome, Edge, Firefox, Safari)

### Run in Development Mode
```powershell
# Navigate into the project folder
cd d:\fandom

# Install all dependencies
npm install

# Start Vite development server
npm run dev
```
Open **`http://localhost:5173`** in your browser.

### Build for Production
```powershell
npm run build
npm run preview
```

---

## 📁 Project Architecture & Structure

```
d:\fandom\
├── index.html                   # Entry HTML with FandomVerse branding & fonts
├── package.json                 # Dependencies (React 19, Tailwind CSS v4, Lucide React)
├── vite.config.js               # Vite config with @tailwindcss/vite plugin
├── PROJECT_REPORT.md            # Comprehensive TechWiz 7 Project Report & Diagrams
├── src/
│   ├── main.jsx                 # Application entry point with FandomProvider
│   ├── App.jsx                  # Main SPA router & layout orchestrator
│   ├── index.css                # Galaxy neon theme, glassmorphism & scrollbar styles
│   ├── context/
│   │   └── FandomContext.jsx    # Central State: Navigation, Bookmarks, Cart, Search
│   ├── data/                    # Pre-populated JSON Datasets (Zero Backend)
│   │   ├── categories.json      # 7 Fandom Realms metadata
│   │   ├── characters.json      # 35+ Detailed Character dossiers
│   │   ├── events.json          # 21+ Conventions, tournaments & watch parties
│   │   ├── articles.json        # 14+ In-depth editorial features
│   │   ├── media.json           # 14+ Trailers, interviews & podcast streams
│   │   ├── galleries.json       # 17+ Curated 4K gallery visuals
│   │   ├── merchandise.json     # 14+ Apparel, figures & collectible products
│   │   ├── releases.json        # 12+ Upcoming releases timeline
│   │   ├── faq_chatbot.json     # 12+ Pre-scripted chatbot rules & prompts
│   │   └── team.json            # TechWiz team profile & tech stack
│   └── components/
│       ├── layout/              # Navbar, Footer, Breadcrumbs, RealTimeClock
│       ├── home/                # HeroBanner, CategoryGrid, VisitorCounter
│       ├── category/            # CategoryHub, ContentCard
│       ├── characters/          # CharacterProfiles, CharacterDetailModal
│       ├── media/               # MediaHub, VideoModal, AudioPlayer
│       ├── articles/            # ArticlesSection, ArticleDetailModal
│       ├── events/              # EventHighlights
│       ├── releases/            # ReleaseRadar
│       ├── gallery/             # GallerySection, LightboxModal
│       ├── merchandise/         # MerchandiseShowcase, ProductDetailModal, ShoppingCartDrawer
│       ├── bookmarks/           # BookmarksDrawer
│       ├── chatbot/             # FandomChatbot (VerseBot)
│       ├── search/              # GlobalSearchModal
│       ├── auth/                # AuthModal (Dummy login/signup)
│       └── contact/             # ContactUs (Google Maps & GPS), AboutUs
```

---

## 🏆 TechWiz 7 Compliance Summary

| Requirement Item | SRS Ref | Implementation Status | Notes |
| :--- | :--- | :--- | :--- |
| **7 Category Hubs** | Page 4, 6, 8, 9 | ✅ Implemented | Anime, Gaming, Movies, TV Shows, K-Pop, Comics, Manga |
| **No Backend / JSON Only** | Page 4, 7, 16 | ✅ Implemented | 100% Client-side React SPA with pre-populated JSON files |
| **Character Profiles (≥5/cat)** | Page 11 | ✅ Implemented | 35 profiles with full biographies, traits, quotes & stats |
| **Event Highlights (≥3/cat)** | Page 11 | ✅ Implemented | 21 events with upcoming/past status, dates & GPS coords |
| **Image Galleries & Lightbox** | Page 9 | ✅ Implemented | Dedicated gallery per category with full-screen Lightbox |
| **Videos & Audio Podcasts** | Page 10 | ✅ Implemented | Embedded 4K trailers + persistent bottom audio player |
| **Merchandise & Temporary Cart** | Page 12 | ✅ Implemented | Live JS calculations: Subtotal, 8% Tax, Shipping & Total |
| **Rule-Based Chatbot** | Page 12, 13 | ✅ Implemented | Floating VerseBot with keyword engine & suggested quick replies |
| **Dual Storage Bookmarks** | Page 13 | ✅ Implemented | LocalStorage favorites + SessionStorage notes + .md export |
| **Contact Us & Google Map** | Page 13 | ✅ Implemented | Team contacts, message form, Google Map & GPS telemetry |
| **UI Clock & Visitor Counter** | Page 14 | ✅ Implemented | Live ticking clock & digital odometer visitor counter |
| **Dummy Login/Signup** | Page 14 | ✅ Implemented | Modal with quick login presets and registration demo UI |
| **Project Documentation** | Page 17 | ✅ Implemented | Complete `PROJECT_REPORT.md` with Mermaid DFDs & flowcharts |

---
*© Aptech Limited — FandomVerse Portal for Fandom World — All rights reserved.*
