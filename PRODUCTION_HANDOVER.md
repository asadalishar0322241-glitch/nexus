# Nexus International Digital Marketing Agency
## Production Handover & Operations Master Guide
### Phase 10 Final Deliverable — Global Launch Readiness

---

## 1. Executive System Overview

**Nexus International Digital Marketing Agency** is a full-stack, enterprise-grade digital marketing agency web platform and lead conversion engine architected to serve high-growth businesses and enterprise clients across three key international hubs:
- **United States** (New York · EST / San Francisco · PST)
- **United Kingdom** (London · GMT)
- **United Arab Emirates** (Dubai · GST)
- **Worldwide International Clients**

The platform combines a multi-currency financial model (USD, GBP, AED), interactive growth simulations, real-time client project tracking, server-side Gemini 3.8 Flash AI marketing advisory, GDPR/CCPA data compliance, and an operational Admin CRM.

---

## 2. Complete 10-Phase Roadmap Summary

| Phase | Milestone Title | Key Deliverables & Systems |
| :--- | :--- | :--- |
| **Phase 1** | System Design & Architecture | `PROJECT_ARCHITECTURE.md`, strongly typed entity schemas, `metadata.json`, and Vite baseline. |
| **Phase 2** | Design System & Currency Engine | Global Navbar, Footer, dual-theme (Light/Dark), and live Multi-Currency Context (USD, GBP, AED). |
| **Phase 3** | Landing Page & Core Agency Hubs | High-converting Homepage, About Us manifesto, Services Directory, and 6-Phase Agency Process. |
| **Phase 4** | 10 Specialized Practice Pages & Portfolio | Dedicated pages for SEO, Google Ads, Meta Ads, Web Design & CRO, E-Commerce, Email, Content, Brand Identity; Filterable Case Studies. |
| **Phase 5** | High-Velocity Conversion Engines | Timezone-aware Consultation Calendar (`/book`), 60-Second Free Growth Audit (`/audit`), and Custom Quote Calculator. |
| **Phase 6** | Secure Admin CRM & CMS Back-Office | Authenticated Admin portal (`/admin`) with pipeline stage management, consultation review, notes audit trail, and CSV export. |
| **Phase 7** | Gemini 3.8 Flash AI Marketing Strategist | Server-side `@google/genai` integration via `POST /api/chat` with consultative persona focused on CAC, ROAS, and unit economics. |
| **Phase 8** | Compliance & Enterprise Security | GDPR/CCPA Cookie Banner, Data Subject Access Request Portal (`/dsar`), Sliding-window rate limiter, and Bot Shield. |
| **Phase 9** | Growth ROI Simulator & Client Portal | Interactive Multi-Market Campaign ROI Simulator (`/simulator`) + Real-Time Client Sprint & Deliverables Portal (`/portal`). |
| **Phase 10** | Production Polish & System Diagnostics | Automated System Diagnostics (`/api/admin/diagnostics`), full DB backup snapshots (`/api/admin/backup`), and final launch verification. |

---

## 3. Administrator Access & Operational Credentials

### Admin Dashboard Back-Office (`/admin`)
- **URL**: `https://<YOUR_APP_URL>/admin`
- **Default Email**: `admin@nexusagency.com`
- **Default Password**: `NexusAgency2026!`
- **Management Capabilities**:
  1. **Executive Overview**: Total pipeline value, lead velocity, and consultation scheduling stats.
  2. **Inbound Leads Pipeline**: Search, filter by status (`New`, `Contacted`, `Qualified`, `Proposal Sent`, `Converted`, `Lost`), add internal strategist notes, and export CSV.
  3. **Consultations Manager**: Review scheduled dates, timezone slots (EST, GMT, GST), and client challenges.
  4. **Marketing Audits Manager**: Review website submissions, monthly revenue estimates, and trigger AI scores.
  5. **Newsletter Directory**: List of active subscribers with one-click CSV export.
  6. **Compliance & DSAR**: Process Right-to-be-Forgotten data scrubbing and download machine-readable GDPR Article 20 JSON portability payloads.
  7. **System Health & Diagnostics**: Run real-time diagnostic pings and download full database snapshots.

---

## 4. Client Project Portal Demo Credentials (`/portal`)

Clients access real-time sprint progress, file sign-offs, and strategist communication via `/portal`. Three international demo accounts are pre-seeded:

| Project ID | Client Name | Company & Market | Currency & Retainer |
| :--- | :--- | :--- | :--- |
| **`NX-US-104`** | David Sterling | Aetheria Luxury Goods Ltd (London, UK) | **£7,500/mo** · 4.3x ROAS · CAPI & Meta Scaling |
| **`NX-UAE-208`** | Tariq Al-Mansoor | GulfTech Enterprise Solutions (Dubai, UAE) | **AED 32,000/mo** · 5.2x ROAS · B2B GCC Search |
| **`NX-US-315`** | Sarah Jenkins | Vanguard Health & MedTech (New York, US) | **$12,000/mo** · 3.9x ROAS · Funnel CRO & Demos |

---

## 5. API Endpoints Directory

### Public Conversion Endpoints
- `POST /api/leads` — Inbound general business inquiries.
- `POST /api/bookings` — Timezone-aware consultation calendar bookings.
- `POST /api/audits` — 60-second technical domain marketing audit submissions.
- `POST /api/newsletter` — Newsletter subscription opt-ins.
- `POST /api/chat` — Server-side Gemini 3.8 Flash AI Marketing Strategist.

### Growth Simulator Endpoints
- `POST /api/simulator/calculate` — Algorithmic calculation of projected ROAS, net revenue, and CAC curves.
- `POST /api/simulator/save` — Stores simulation run and generates qualified inbound lead.
- `GET /api/simulator/history` — Retrieves recent saved simulations.

### Client Portal Endpoints
- `GET /api/portal/projects/:identifier` — Project lookup by ID or client email.
- `GET /api/portal/demo-accounts` — List of available demo accounts for testing.
- `POST /api/portal/projects/:id/deliverables/:deliverableId/feedback` — Client file approval or revision request.
- `POST /api/portal/projects/:id/scope-request` — Client channel expansion request.

### Compliance & Privacy Endpoints
- `POST /api/compliance/dsar/submit` — GDPR/CCPA data subject request submission.
- `GET /api/compliance/dsar/status/:ticket` — Self-serve ticket status lookup.
- `GET /api/compliance/dsar/export` — Article 20 JSON data portability export.

### Admin & Operations Endpoints
- `POST /api/admin/login` — Administrator authentication.
- `GET /api/admin/stats` — Executive KPI aggregations.
- `GET /api/admin/diagnostics` — Real-time database and service health check.
- `GET /api/admin/backup` — Full encrypted database JSON download.
- `GET /api/health` — Public health check prober.

---

## 6. Security, Privacy & Compliance Architecture

1. **Enterprise HTTP Headers**: Configured across all Express responses (`X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `X-XSS-Protection`, `Permissions-Policy`).
2. **In-Memory Sliding-Window Rate Limiter**: 80 requests/minute per client IP to safeguard API routes against scraping or denial of service.
3. **Bot Shield Protection**: Invisible honeypot field (`_nexus_hp`) and timestamp velocity analysis (`_submission_ts`) blocking automated headless form spammers.
4. **Input Sanitization**: HTML tag stripping on all incoming JSON payloads.
5. **GDPR / CCPA Standards**:
   - Granular Cookie Consent banner with category toggles (Necessary, Analytics, Marketing).
   - Right to Data Portability (Article 20): Machine-readable JSON download.
   - Right to be Forgotten (Article 17): Irreversible personal data redaction with audit logging.

---

## 7. Backup & Database Maintenance

- **Storage Location**: `/server/db/storage.json`
- **Instant Snapshot**: Admin can navigate to `/admin` -> `System Health & Diagnostics` and click **"Download DB Snapshot (.json)"** or execute `curl -s http://localhost:3000/api/admin/backup`.
- **Automatic Recovery**: If `storage.json` is corrupted or missing, the server automatically recovers from embedded schema seeds.

---

**Nexus International Digital Marketing Agency Platform is fully verified, operational, and launch-ready.**
