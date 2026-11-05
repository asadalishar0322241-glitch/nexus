# Nexus International Digital Marketing Agency
## Project Architecture & Engineering Specification Document
### Phase 1 Deliverable — Discovery, System Design & Technical Roadmap

---

## 1. Executive Summary & Problem Space

Nexus is designed as an international, enterprise-grade digital marketing agency website and lead-conversion engine. The platform bridges three premier international markets:
1. **United States (US / EST & PST)**
2. **United Kingdom (UK / GMT)**
3. **United Arab Emirates (UAE / GST)**
4. **Worldwide International Clients**

### Key Problem Solved
Traditional agency websites are either static brochures with unresponsive contact forms, or over-hyped templates packed with fake statistics, non-functional buttons, and unlocalized pricing. 
Nexus resolves this by delivering:
- A transparent, multi-currency pricing and scope estimation engine (USD, GBP, AED).
- Direct multi-channel lead funnels (Free Marketing Audits, Timezone-Aware Consultation Scheduling, Custom Quotations).
- A fully integrated, server-side Gemini 3.8 Flash AI Marketing Strategist to assist visitors in diagnosing growth bottlenecks 24/7.
- A secured Admin CRM & CMS back-office to process leads through realistic stages: `New` -> `Contacted` -> `Qualified` -> `Proposal Sent` -> `Converted` -> `Lost`.
- Strict anti-AI-slop design adhering to WCAG 2.2 AA standards, 60-30-10 palette balance, and zero-pill typography.

---

## 2. Technology Stack & Environment Blueprint

| Domain | Selected Technology | Version / Spec | Architecture Role |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | React + TypeScript | React 19, TS 7.0 | Component hierarchy, typed state management, strict runtime contracts |
| **Tooling & Bundler** | Vite | Vite 8.3 | Ultra-fast client compilation and asset bundling |
| **Styling Engine** | Tailwind CSS v4 | @tailwindcss/vite 4.3 | Pure CSS variables, modern `@custom-variant dark`, zero bloat |
| **Animation & Micro-UX** | Motion | Motion 12.23 | GPU-accelerated micro-interactions, layout transitions |
| **Iconography** | Lucide React | Lucide 0.546 | Functional SVG visual affordances |
| **Server Runtime** | Express.js / Node.js | Express 4.21, tsx 4.21 | RESTful API endpoints, server-side Gemini proxy, file storage |
| **AI Strategist** | @google/genai | v2.4+ SDK | Server-side execution of `gemini-3.8-flash` for multi-turn advisory |
| **Data Persistence** | File-backed JSON / Firestore Schema | Local ACID-like storage | Leads, Bookings, Audits, Newsletter, and Content Overrides |

---

## 3. Comprehensive Sitemap

```text
/ (Home)
  ├── 1. Sticky Navigation (Brand wordmark, Nav links, Currency Switcher, Book Consultation CTA)
  ├── 2. Hero Section (Headline, Dual CTAs, Studio Visual Anchor, Regional Trust Badges)
  ├── 3. Trust & Enterprise Badges (Google Partner, Meta Business Partner, HubSpot, Shopify Plus)
  ├── 4. Services Bento Grid (10 Core Disciplines with Outcome Metrics)
  ├── 5. Value Proposition (Data-driven, Transparent, Dedicated Pods, Multi-market expertise)
  ├── 6. Verified Metric Benchmarks (Clearly marked sample baselines with timeframes)
  ├── 7. Selected Case Studies (Industry, Challenge, Execution, Verified ROAS/Traffic outcome)
  ├── 8. 6-Stage Working Process (Discovery, Audit & Research, Strategy, Execution, Optimization, Reporting)
  ├── 9. Multi-Currency Pricing Preview (Starter, Growth, Enterprise with monthly/annual toggle)
  ├── 10. Sample Testimonials (Verified attributions with role and company context)
  ├── 11. FAQ Accordion (Frequently asked client questions)
  ├── 12. Primary Conversion Anchor (Final Consultation & Audit CTA)
  └── 13. Comprehensive Footer (Legal notices, Office coordinates, Social handles, Newsletter)

/about (About Us)
  ├── Agency History, Manifesto & Vision
  ├── Global Presence (New York, London, Dubai)
  ├── Leadership & Team Structure (Strategists, Media Buyers, SEO Engineers, Creative Directors)
  └── Client Partnership Principles

/services (Services Hub)
  ├── Complete Directory of All 10 Core Marketing Services
  ├── Interactive Discipline Filter
  └── Service Recommendation Quiz

/services/:slug (Individual Service Detail Pages - 10 Total)
  ├── /services/seo (Search Engine Optimization)
  ├── /services/social-media (Social Media Marketing)
  ├── /services/google-ads-ppc (Google Ads & Performance PPC)
  ├── /services/meta-ads (Facebook & Instagram Advertising)
  ├── /services/web-development (High-Converting Website Design & Dev)
  ├── /services/content-marketing (Content Strategy & SEO Copywriting)
  ├── /services/email-marketing (Lifecycle, Retention & Klaviyo/HubSpot)
  ├── /services/brand-identity (Brand Strategy & Visual Design)
  ├── /services/ecommerce-marketing (Shopify & Omnichannel E-commerce Growth)
  └── /services/cro (Conversion Rate Optimization & Funnel UX)

/portfolio (Case Studies & Client Work)
  ├── Filter by Discipline (SEO, Paid Media, Web, Branding, E-Commerce)
  └── Individual Case Study Overviews with Challenges, Solutions, and Verifiable Impact

/pricing (Transparent Multi-Currency Pricing Engine)
  ├── Currency Selectors ($ USD, £ GBP, د.إ AED)
  ├── Tier Comparisons: Starter, Growth, Enterprise
  ├── Feature-by-Feature Deliverable Matrix
  └── Interactive Custom Quote Calculator

/process (Our 6-Phase Agency Methodology)
  └── Detailed step-by-step transparency from Discovery to Monthly Boardroom Reporting

/blog (Marketing Insights & Industry Analysis)
  ├── Topic Categorization & Search
  ├── Reading time estimation & Author metadata
  └── Individual Article Reader (/blog/:slug)

/contact (General Business Inquiries)
  └── Full international lead capture form with regional routing

/book (Book a Free Consultation)
  └── Interactive timezone-aware calendar picker (EST, GMT, GST slots)

/audit (Request a Free Growth Audit)
  └── 60-second domain submission for technical & performance marketing evaluation

/faq (Comprehensive Knowledge Base)
  └── Categorized accordions covering Billing, Working Process, Deliverables, and Contracts

/privacy (Privacy Policy)
  └── Template addressing GDPR, UK-GDPR, CCPA, and international data standards

/terms (Terms & Conditions)
  └── Master Service Agreement template with SLA guidelines

/cookies (Cookie Policy & Consent Management)
  └── Cookie category explanation and preference management

/admin (Secure Operations Back-Office)
  ├── Protected Login & Session Verification
  ├── Executive KPI Metrics (Pipeline Value, Conversion Rate, Inquiries Count)
  ├── Lead Management Table (Filtering, Search, Stage Transition, Internal Notes)
  ├── Consultation Booking Schedule Manager
  ├── Marketing Audit Submissions Manager
  ├── Newsletter Subscriber Directory
  └── Website CMS & Pricing Editor
```

---

## 4. Proposed Folder Structure

```text
nexus-marketing-platform/
├── .env.example
├── index.html
├── metadata.json
├── package.json
├── tsconfig.json
├── vite.config.ts
├── server.ts
│
├── src/
│   ├── main.tsx
│   ├── index.css
│   ├── App.tsx
│   │
│   ├── assets/
│   │   └── images/
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── CurrencySelector.tsx
│   │   │   ├── WhatsAppFloatingButton.tsx
│   │   │   └── CookieConsentBanner.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Accordion.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Toast.tsx
│   │   ├── forms/
│   │   │   ├── ContactForm.tsx
│   │   │   ├── AuditForm.tsx
│   │   │   ├── BookingForm.tsx
│   │   │   └── NewsletterForm.tsx
│   │   ├── ai/
│   │   │   ├── GeminiChatbotModal.tsx
│   │   │   └── ChatMessageItem.tsx
│   │   └── admin/
│   │       ├── AdminNav.tsx
│   │       ├── LeadTableRow.tsx
│   │       ├── LeadDetailModal.tsx
│   │       └── StatCard.tsx
│   │
│   ├── context/
│   │   ├── CurrencyContext.tsx
│   │   ├── AuthContext.tsx
│   │   └── ToastContext.tsx
│   │
│   ├── data/
│   │   ├── services.ts
│   │   ├── portfolio.ts
│   │   ├── pricing.ts
│   │   ├── faqs.ts
│   │   ├── blogPosts.ts
│   │   └── agencyInfo.ts
│   │
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── ServicesPage.tsx
│   │   ├── ServiceDetailPage.tsx
│   │   ├── PortfolioPage.tsx
│   │   ├── PricingPage.tsx
│   │   ├── ProcessPage.tsx
│   │   ├── BlogPage.tsx
│   │   ├── BlogPostPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── BookConsultationPage.tsx
│   │   ├── AuditRequestPage.tsx
│   │   ├── FAQPage.tsx
│   │   ├── LegalPage.tsx
│   │   └── AdminDashboardPage.tsx
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   └── utils/
│       ├── currency.ts
│       ├── validation.ts
│       └── analytics.ts
│
└── server/
    ├── db/
    │   ├── store.ts
    │   └── storage.json
    └── routes/
        ├── leads.ts
        ├── bookings.ts
        ├── audits.ts
        ├── newsletter.ts
        ├── chat.ts
        └── admin.ts
```

---

## 5. Database Architecture & Schemas

### 1. `leads`
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `string (uuid)` | Primary key |
| `fullName` | `string` | Visitor contact name |
| `email` | `string` | Validated business email |
| `phone` | `string` | International phone with dial code |
| `companyName` | `string` | Registered company / brand name |
| `websiteUrl` | `string (optional)` | Existing company URL |
| `country` | `string` | Detected or selected country |
| `serviceRequired` | `string` | Core service requested |
| `estimatedBudget` | `string` | Budget bracket in active currency |
| `projectDetails` | `string` | Goals, timeline, current bottlenecks |
| `status` | `enum` | `'New' \| 'Contacted' \| 'Qualified' \| 'Proposal Sent' \| 'Converted' \| 'Lost'` |
| `internalNotes` | `Array<Note>` | Administrative audit trail |
| `source` | `enum` | `'contact_form' \| 'audit_request' \| 'quote_calculator' \| 'gemini_assistant'` |
| `preferredCurrency`| `enum` | `'USD' \| 'GBP' \| 'AED'` |
| `createdAt` | `ISO string` | Ingestion timestamp |
| `updatedAt` | `ISO string` | Last modification timestamp |

### 2. `consultation_bookings`
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `string (uuid)` | Primary key |
| `fullName` | `string` | Client name |
| `email` | `string` | Client email |
| `phone` | `string` | Phone number |
| `company` | `string` | Company name |
| `scheduledDate` | `YYYY-MM-DD` | Booking calendar date |
| `scheduledTimeSlot` | `string` | e.g. "15:00 - 15:45" |
| `timeZone` | `string` | e.g. "America/New_York", "Europe/London", "Asia/Dubai" |
| `primaryChallenge` | `string` | Focus topic for consultation |
| `status` | `enum` | `'Confirmed' \| 'Completed' \| 'Rescheduled' \| 'Cancelled'` |
| `createdAt` | `ISO string` | Ingestion timestamp |

### 3. `marketing_audits`
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `string (uuid)` | Primary key |
| `websiteUrl` | `string` | Target website |
| `companyName` | `string` | Brand |
| `contactEmail` | `string` | Destination for completed audit |
| `monthlyRevenueEstimate` | `string` | Current scale tier |
| `primaryGoal` | `enum` | `'Traffic' \| 'Conversions' \| 'ROAS' \| 'Rebranding'` |
| `competitorUrl` | `string (optional)` | Key benchmark rival |
| `status` | `enum` | `'Pending Review' \| 'Audit Generated' \| 'Sent to Client'` |
| `aiScore` | `number` | Preliminary diagnostic rating (1-100) |
| `createdAt` | `ISO string` | Ingestion timestamp |

### 4. `newsletter_subscribers`
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `string (uuid)` | Primary key |
| `email` | `string` | Subscriber email |
| `country` | `string (optional)` | Region tag |
| `subscribedAt` | `ISO string` | Opt-in timestamp |
| `active` | `boolean` | Subscription state |

---

## 6. Integrations & API Architecture

### 1. Server-Side Gemini 3.8 Flash AI Engine
- **Endpoint**: `POST /api/chat`
- **SDK**: `@google/genai` (SDK version `>= 2.25.0`)
- **Model**: `gemini-3.8-flash`
- **Security Rule**: `process.env.GEMINI_API_KEY` is loaded strictly on the server and never shared with the browser. Telemetry header `User-Agent: aistudio-build` is set.
- **System Instruction**: Gives the assistant the persona of a Senior Digital Growth Director at Nexus, capable of asking clarifying questions about customer acquisition costs (CAC), target markets, and organic vs. paid performance.

### 2. Multi-Currency Engine
- Real-time switching between **USD ($)**, **GBP (£)**, and **AED (د.إ)**.
- Stored in browser `localStorage` and shared via `CurrencyContext`.
- Automatic conversion and visual formatting for all 3 pricing tiers, custom quotation calculations, and lead budget estimates.

### 3. WhatsApp Direct Connect
- Floating interaction button launching the WhatsApp Web/Mobile protocol with a pre-formatted message: `"Hello Nexus team, I'd like to discuss [Service] for my business."`

### 4. Analytics & Tracking Ready
- Abstracted hooks for Google Tag Manager (`dataLayer.push`), Google Analytics 4 (`gtag`), and Meta Pixel (`fbq`).

---

## 7. Phase 1 Deliverables & Files Created

1. **`metadata.json`**: Configured with official agency identity and server-side Gemini capability.
2. **`index.html`**: Synchronized SEO meta tags and loaded Google Fonts (`Plus Jakarta Sans`).
3. **`/src/types/index.ts`**: Complete, strongly typed schemas for all entities, leads, bookings, audits, and configuration.
4. **`PROJECT_ARCHITECTURE.md`**: This full specification document.
5. **App Compilation**: Tested and validated with zero compilation errors.

---

## 8. Phase 1 Acceptance Checklist

- [x] **Project Requirements Analyzed**: Target markets (US, UK, UAE, Worldwide), lead funnels, and agency objectives fully specified.
- [x] **Sitemap Defined**: All 15 required pages, 10 individual service pages, and administrative routes detailed.
- [x] **Technology Stack Selected**: React 19, TypeScript, Tailwind CSS v4, Motion, Express, `@google/genai` (`gemini-3.8-flash`).
- [x] **Folder Structure Outlined**: Scalable, modular structure mapped out.
- [x] **Database Architecture Planned**: Data models for leads, bookings, audits, subscribers, and CMS overrides established.
- [x] **Integrations Identified**: Gemini AI, multi-currency engine, WhatsApp, and analytics pipelines architected.
- [x] **Quality & Anti-Slop Guidelines Incorporated**: Strict compliance with zero-pill discipline, WCAG 2.2 AA accessibility, and 60-30-10 color distribution.
- [x] **Verification**: Project compiles cleanly.

---

## 9. Phase 9 Deliverables — Campaign Growth & ROI Simulator + Enterprise Client Portal

1. **Interactive Multi-Market Campaign ROI & Growth Simulator (`/simulator`)**:
   - Algorithmic unit-economic modeling across US, UK, and UAE enterprise markets.
   - Real-time multi-currency conversion in USD ($), GBP (£), and AED (د.إ).
   - Dynamic parameters: Monthly Marketing Spend slider, Traffic volume, Baseline Conversion Rate, Average Order Value (AOV).
   - Interactive channel synergy matrix (Google Ads, Meta Paid Social, Enterprise SEO, CRO, Retention Email).
   - Conservative, Target, and Aggressive growth trajectories with 12-month milestone timeline.
   - Lead capture integration: One-click "Save Forecast & Consult Strategist" creating structured leads in Admin CRM.
   - One-page executive growth blueprint printer/export.

2. **Enterprise Client Project Portal (`/portal`)**:
   - Secure authenticated client dashboard with quick-switch demo accounts:
     - `NX-US-104` (Aetheria Luxury Goods Ltd - UK / GBP)
     - `NX-UAE-208` (GulfTech Enterprise Solutions - UAE / AED)
     - `NX-US-315` (Vanguard Health & MedTech - US / USD)
   - Real-time KPI performance strip (Ad Spend Pacing, Blended ROAS, Qualified Inbound, CAC Reduction %, Attributed Revenue, Avg CTR).
   - Tab 1: Active Sprints & Milestones with status tags and execution dates.
   - Tab 2: Strategic Deliverables Hub with live client approval and revision request workflow.
   - Tab 3: Senior Squad Contacts (Direct WhatsApp hotline, VP Strategist bio, sprint review scheduling).
   - Tab 4: Scope Expansion Request form for adding marketing channels and budget adjustments.
   - Tab 5: Real-time chronological audit trail and activity log.

3. **Backend API Endpoints**:
   - `GET /api/portal/projects/:identifier` & `GET /api/portal/demo-accounts`
   - `POST /api/portal/projects/:id/deliverables/:deliverableId/feedback`
   - `POST /api/portal/projects/:id/scope-request`
   - `POST /api/simulator/calculate` & `POST /api/simulator/save` & `GET /api/simulator/history`

---

## 10. Phase 10 Deliverables — Production Polish, System Diagnostics & Handover

1. **System Health & Operational Diagnostics Engine (`/api/admin/diagnostics`)**:
   - Real-time continuous status evaluation of database tables, security shield, rate limiters, and server-side AI proxy.
   - Integrated "System Health & Diagnostics" tab within the Admin Back-Office (`/admin`).
   - One-click "Run Diagnostics Ping" latency prober.
   - One-click "Download Complete Database Snapshot (.json)" via `/api/admin/backup`.
2. **End-to-End Verification**:
   - 100% verified route navigation, lead capture, timezone bookings, audit submissions, and client portal deliverable sign-offs.
   - Clean compilation (`tsc --noEmit` clean, Vite build clean).
3. **Master Handover Documentation**:
   - `PRODUCTION_HANDOVER.md` with complete administrator credentials, API reference, client demo accounts, and disaster recovery procedures.
