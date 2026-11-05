/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.resolve(__dirname, 'storage.json');

export interface Lead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  websiteUrl?: string;
  country: string;
  serviceRequired: string;
  estimatedBudget: string;
  projectDetails: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Proposal Sent' | 'Converted' | 'Lost';
  internalNotes: Array<{ id: string; timestamp: string; author: string; note: string }>;
  source: 'contact_form' | 'audit_request' | 'quote_calculator' | 'gemini_assistant';
  preferredCurrency: 'USD' | 'GBP' | 'AED';
  createdAt: string;
  updatedAt: string;
}

export interface ConsultationBooking {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  websiteUrl?: string;
  scheduledDate: string;
  scheduledTimeSlot: string;
  timeZone: string;
  primaryChallenge: string;
  status: 'Confirmed' | 'Completed' | 'Rescheduled' | 'Cancelled';
  createdAt: string;
}

export interface MarketingAuditRequest {
  id: string;
  websiteUrl: string;
  companyName: string;
  contactEmail: string;
  monthlyRevenueEstimate: string;
  primaryGoal: 'Traffic' | 'Conversions' | 'ROAS' | 'Rebranding';
  competitorUrl?: string;
  status: 'Pending Review' | 'Audit Generated' | 'Sent to Client';
  aiScore?: number;
  aiAuditNotes?: string;
  createdAt: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  country?: string;
  subscribedAt: string;
  active: boolean;
}

export interface DsarRequest {
  id: string; // e.g. "DSAR-2026-8819"
  requestType: 'access_export' | 'erasure_deletion' | 'rectification' | 'opt_out_sale' | 'restriction';
  fullName: string;
  email: string;
  companyName?: string;
  country: string;
  details?: string;
  status: 'Pending Verification' | 'Under Review' | 'Fulfilled' | 'Rejected';
  resolutionNotes?: string;
  createdAt: string;
  resolvedAt?: string;
}

export interface SecurityAuditEntry {
  id: string;
  type: 'dsar_submitted' | 'dsar_status_change' | 'data_erasure' | 'data_export' | 'bot_blocked' | 'rate_limited' | 'lead_updated';
  summary: string;
  ip?: string;
  timestamp: string;
  metadata?: any;
}

export interface ClientProject {
  id: string; // e.g. "NX-US-104", "NX-UAE-208", "NX-US-315"
  clientName: string;
  email: string;
  companyName: string;
  domain: string;
  market: string;
  tier: string;
  monthlyRetainer: number;
  currency: 'USD' | 'GBP' | 'AED';
  startDate: string;
  leadStrategist: {
    name: string;
    title: string;
    email: string;
    slackChannel: string;
    whatsappUrl: string;
  };
  kpis: {
    monthlySpend: number;
    blendedRoas: number;
    qualifiedLeads: number;
    cac: number;
    cacReductionPct: number;
    revenueGenerated: number;
    impressions: number;
    clickThroughRate: number;
  };
  sprints: Array<{
    id: string;
    title: string;
    category: 'SEO' | 'Paid Ads' | 'CRO' | 'Creative' | 'Tech';
    status: 'In Progress' | 'Under Review' | 'Approved' | 'Completed';
    targetDate: string;
    summary: string;
  }>;
  deliverables: Array<{
    id: string;
    title: string;
    category: string;
    status: 'Delivered' | 'Pending Approval' | 'Revision Requested' | 'Approved';
    date: string;
    fileSize: string;
    fileType: 'PDF' | 'Figma' | 'ZIP' | 'CSV';
  }>;
  activityLog: Array<{
    id: string;
    timestamp: string;
    author: string;
    message: string;
  }>;
}

export interface GrowthSimulationRecord {
  id: string; // e.g. "SIM-2026-9041"
  businessModel: string;
  currency: 'USD' | 'GBP' | 'AED';
  monthlyBudget: number;
  monthlyTraffic: number;
  baselineConversionRate: number;
  averageDealValue: number;
  selectedChannels: string[];
  scenario: 'Conservative' | 'Target' | 'Aggressive';
  projectedRoas: number;
  projectedMonthlyRevenue: number;
  projectedAnnualRevenue: number;
  projectedCac: number;
  cacReductionPct: number;
  contactName?: string;
  contactEmail?: string;
  companyName?: string;
  websiteUrl?: string;
  createdAt: string;
}

interface DatabaseSchema {
  leads: Lead[];
  bookings: ConsultationBooking[];
  audits: MarketingAuditRequest[];
  subscribers: NewsletterSubscriber[];
  sessions: Array<{ token: string; email: string; expiresAt: string }>;
  dsarRequests: DsarRequest[];
  securityLogs: SecurityAuditEntry[];
  clientProjects: ClientProject[];
  simulations: GrowthSimulationRecord[];
}

const INITIAL_SEED: DatabaseSchema = {
  leads: [
    {
      id: 'lead-1',
      fullName: 'David Sterling',
      email: 'd.sterling@aetheria-retail.co.uk',
      phone: '+44 20 7946 0812',
      companyName: 'Aetheria Luxury Goods Ltd',
      websiteUrl: 'https://aetheria-retail.co.uk',
      country: 'United Kingdom',
      serviceRequired: 'Meta & Social Advertising',
      estimatedBudget: '£5,000 - £10,000',
      projectDetails: 'Looking to expand into European DTC markets and optimize our Meta ROAS from 2.1x to 4x.',
      status: 'Qualified',
      internalNotes: [
        {
          id: 'note-1',
          timestamp: '2026-11-01T10:14:00Z',
          author: 'Senior Strategist',
          note: 'Client verified high average order value (£180). Strong candidate for CAPI server-side testing.'
        }
      ],
      source: 'contact_form',
      preferredCurrency: 'GBP',
      createdAt: '2026-11-01T09:40:00Z',
      updatedAt: '2026-11-01T10:14:00Z',
    },
    {
      id: 'lead-2',
      fullName: 'Tariq Al-Mansoor',
      email: 'tariq@gulftech-holdings.ae',
      phone: '+971 50 123 4567',
      companyName: 'GulfTech Enterprise Solutions',
      websiteUrl: 'https://gulftech-holdings.ae',
      country: 'United Arab Emirates',
      serviceRequired: 'Search Engine Optimization (SEO)',
      estimatedBudget: 'AED 25,000+ / month',
      projectDetails: 'Need dual-language Arabic/English B2B authority ranking across GCC for corporate cloud security keywords.',
      status: 'Proposal Sent',
      internalNotes: [
        {
          id: 'note-2',
          timestamp: '2026-11-02T14:20:00Z',
          author: 'Head of SEO',
          note: 'Enterprise tier proposal dispatched. Regional office in Dubai scheduled review call.'
        }
      ],
      source: 'quote_calculator',
      preferredCurrency: 'AED',
      createdAt: '2026-11-02T11:22:00Z',
      updatedAt: '2026-11-02T14:20:00Z',
    },
    {
      id: 'lead-3',
      fullName: 'Jessica Miller',
      email: 'jessica@synapseflow.io',
      phone: '+1 (415) 890-1234',
      companyName: 'SynapseFlow SaaS',
      websiteUrl: 'https://synapseflow.io',
      country: 'United States',
      serviceRequired: 'Web Design & CRO Engineering',
      estimatedBudget: '$10,000 - $25,000 / month',
      projectDetails: 'Our self-serve trial-to-paid conversion is lagging at 3.2%. We need a high-converting web and checkout overhaul.',
      status: 'New',
      internalNotes: [],
      source: 'contact_form',
      preferredCurrency: 'USD',
      createdAt: '2026-11-03T18:05:00Z',
      updatedAt: '2026-11-03T18:05:00Z',
    }
  ],
  bookings: [
    {
      id: 'book-1',
      fullName: 'Alexander Wright',
      email: 'a.wright@cortexbiotech.com',
      phone: '+1 (212) 555-0144',
      company: 'Cortex Biotech',
      websiteUrl: 'https://cortexbiotech.com',
      scheduledDate: '2026-11-08',
      scheduledTimeSlot: '14:00 - 14:45',
      timeZone: 'America/New_York',
      primaryChallenge: 'Paid Media & High CAC',
      status: 'Confirmed',
      createdAt: '2026-11-02T16:00:00Z',
    }
  ],
  audits: [
    {
      id: 'audit-1',
      websiteUrl: 'https://novabrew-roasters.com',
      companyName: 'NovaBrew Specialty Coffee',
      contactEmail: 'founder@novabrew-roasters.com',
      monthlyRevenueEstimate: '$50k - $200k',
      primaryGoal: 'Conversions',
      competitorUrl: 'https://bluebottlecoffee.com',
      status: 'Pending Review',
      aiScore: 72,
      createdAt: '2026-11-03T12:00:00Z',
    }
  ],
  subscribers: [
    {
      id: 'sub-1',
      email: 'growth-director@fintech-ventures.com',
      country: 'United States',
      subscribedAt: '2026-10-25T11:00:00Z',
      active: true,
    }
  ],
  sessions: [],
  dsarRequests: [
    {
      id: 'DSAR-2026-8819',
      requestType: 'access_export',
      fullName: 'Marcus Vance',
      email: 'm.vance@vanguard-holdings.co.uk',
      companyName: 'Vanguard Holdings Ltd',
      country: 'United Kingdom',
      details: 'Requesting export of all marketing performance audit inquiries and personal contact records under UK GDPR Article 15.',
      status: 'Fulfilled',
      resolutionNotes: 'Verified requester identity via email challenge token. Export payload delivered.',
      createdAt: '2026-11-01T14:30:00Z',
      resolvedAt: '2026-11-02T09:15:00Z',
    },
    {
      id: 'DSAR-2026-9244',
      requestType: 'opt_out_sale',
      fullName: 'Elena Rostova',
      email: 'elena@novatech-eu.com',
      companyName: 'NovaTech EU',
      country: 'Germany',
      details: 'Opt-out of cross-context behavioral ad targeting and third-party advertising cookies under GDPR & CCPA.',
      status: 'Fulfilled',
      resolutionNotes: 'Tracking identifiers flagged for universal exclusion in CRM and ad pixels.',
      createdAt: '2026-11-02T16:20:00Z',
      resolvedAt: '2026-11-02T16:25:00Z',
    }
  ],
  securityLogs: [
    {
      id: 'sec-1',
      type: 'dsar_submitted',
      summary: 'New DSAR Request DSAR-2026-8819 received (Right of Access)',
      ip: '82.165.197.1',
      timestamp: '2026-11-01T14:30:00Z',
    },
    {
      id: 'sec-2',
      type: 'data_export',
      summary: 'Portability export compiled for m.vance@vanguard-holdings.co.uk',
      ip: '127.0.0.1',
      timestamp: '2026-11-02T09:15:00Z',
    }
  ],
  clientProjects: [
    {
      id: 'NX-US-104',
      clientName: 'David Sterling',
      email: 'd.sterling@aetheria-retail.co.uk',
      companyName: 'Aetheria Luxury Goods Ltd',
      domain: 'https://aetheria-retail.co.uk',
      market: 'United Kingdom (London)',
      tier: 'Enterprise Omnichannel Retainer',
      monthlyRetainer: 7500,
      currency: 'GBP',
      startDate: '2026-08-15',
      leadStrategist: {
        name: 'Elena Rostova',
        title: 'VP Performance Marketing',
        email: 'e.rostova@nexusagency.com',
        slackChannel: '#nexus-aetheria-pod',
        whatsappUrl: 'https://wa.me/442079460991',
      },
      kpis: {
        monthlySpend: 18500,
        blendedRoas: 4.3,
        qualifiedLeads: 412,
        cac: 44.9,
        cacReductionPct: 31,
        revenueGenerated: 79550,
        impressions: 620000,
        clickThroughRate: 3.24,
      },
      sprints: [
        {
          id: 'sp-1',
          title: 'Meta Conversions API (CAPI) Gateway Setup',
          category: 'Tech',
          status: 'Completed',
          targetDate: '2026-10-18',
          summary: 'Cloud-hosted server-side event tracking capturing 98.4% of purchase signals bypassing iOS ad blockers.',
        },
        {
          id: 'sp-2',
          title: 'Q4 High-AOV Holiday Creative Batch (12 Concepts)',
          category: 'Creative',
          status: 'Under Review',
          targetDate: '2026-11-06',
          summary: 'Studio editorial video hooks & dynamic catalog carousels targeting UK and European luxury shoppers.',
        },
        {
          id: 'sp-3',
          title: 'Shopify Plus Cart Drawer & Checkout CRO Revamp',
          category: 'CRO',
          status: 'In Progress',
          targetDate: '2026-11-12',
          summary: 'Dynamic threshold free shipping bar, 1-click upsells, and Apple Pay zero-friction drawer.',
        },
        {
          id: 'sp-4',
          title: 'Google Performance Max Asset Group Restructure',
          category: 'Paid Ads',
          status: 'Approved',
          targetDate: '2026-11-20',
          summary: 'Separation of high-margin brand queries from prospecting feed campaigns with ROAS bidding at 450%.',
        },
      ],
      deliverables: [
        {
          id: 'del-1',
          title: 'Technical SEO Forensic Audit & Schema Report',
          category: 'Search Strategy',
          status: 'Delivered',
          date: '2026-10-22',
          fileSize: '4.2 MB',
          fileType: 'PDF',
        },
        {
          id: 'del-2',
          title: 'Meta Ad Creative Variations (Batch 4)',
          category: 'Creative Studio',
          status: 'Pending Approval',
          date: '2026-11-02',
          fileSize: '28.4 MB',
          fileType: 'Figma',
        },
        {
          id: 'del-3',
          title: 'Conversion Funnel Drop-off Analysis',
          category: 'CRO & UX',
          status: 'Delivered',
          date: '2026-10-29',
          fileSize: '2.1 MB',
          fileType: 'PDF',
        },
        {
          id: 'del-4',
          title: 'Monthly Performance & ROAS Board Deck',
          category: 'Executive Reporting',
          status: 'Delivered',
          date: '2026-11-01',
          fileSize: '6.8 MB',
          fileType: 'PDF',
        },
      ],
      activityLog: [
        {
          id: 'act-1',
          timestamp: '2026-11-03T16:20:00Z',
          author: 'Elena Rostova',
          message: 'Pushed Batch 4 creative previews to client review. Meta ROAS reached 4.3x this week.',
        },
        {
          id: 'act-2',
          timestamp: '2026-11-01T11:00:00Z',
          author: 'David Sterling',
          message: 'Approved October sprint summary and confirmed Q4 additional £5,000 spend scaling.',
        },
      ],
    },
    {
      id: 'NX-UAE-208',
      clientName: 'Tariq Al-Mansoor',
      email: 'tariq@gulftech-holdings.ae',
      companyName: 'GulfTech Enterprise Solutions',
      domain: 'https://gulftech-holdings.ae',
      market: 'United Arab Emirates (Dubai)',
      tier: 'GCC High-Growth Authority Retainer',
      monthlyRetainer: 32000,
      currency: 'AED',
      startDate: '2026-09-01',
      leadStrategist: {
        name: 'Marcus Vance',
        title: 'Head of SEO & B2B Strategy',
        email: 'm.vance@nexusagency.com',
        slackChannel: '#nexus-gulftech-pod',
        whatsappUrl: 'https://wa.me/971501234567',
      },
      kpis: {
        monthlySpend: 45000,
        blendedRoas: 5.2,
        qualifiedLeads: 86,
        cac: 523,
        cacReductionPct: 38,
        revenueGenerated: 234000,
        impressions: 480000,
        clickThroughRate: 4.12,
      },
      sprints: [
        {
          id: 'sp-10',
          title: 'Dual Arabic/English B2B Topic Clusters',
          category: 'SEO',
          status: 'Completed',
          targetDate: '2026-10-25',
          summary: 'Targeting regional enterprise cybersecurity keywords across UAE, KSA, and Qatar.',
        },
        {
          id: 'sp-11',
          title: 'Google Search Exact-Match High-Intent C-Suite Campaigns',
          category: 'Paid Ads',
          status: 'In Progress',
          targetDate: '2026-11-10',
          summary: 'Negative keyword sculpting and LinkedIn Matched Audience targeting for Gulf enterprise buyers.',
        },
      ],
      deliverables: [
        {
          id: 'del-10',
          title: 'GCC Enterprise Search Market Share Report',
          category: 'Search Strategy',
          status: 'Delivered',
          date: '2026-10-28',
          fileSize: '5.1 MB',
          fileType: 'PDF',
        },
        {
          id: 'del-11',
          title: 'Executive Landing Page Wireframes (Arabic/English)',
          category: 'CRO & UX',
          status: 'Pending Approval',
          date: '2026-11-03',
          fileSize: '14.2 MB',
          fileType: 'Figma',
        },
      ],
      activityLog: [
        {
          id: 'act-10',
          timestamp: '2026-11-02T10:15:00Z',
          author: 'Marcus Vance',
          message: 'Top-3 ranking achieved for 14 target B2B IT keywords in Dubai and Abu Dhabi.',
        },
      ],
    },
    {
      id: 'NX-US-315',
      clientName: 'Sarah Jenkins',
      email: 's.jenkins@vanguard-medtech.com',
      companyName: 'Vanguard Health & MedTech',
      domain: 'https://vanguard-medtech.com',
      market: 'United States (New York)',
      tier: 'Performance Scale & CRO Retainer',
      monthlyRetainer: 12000,
      currency: 'USD',
      startDate: '2026-07-10',
      leadStrategist: {
        name: 'Chloe Chen',
        title: 'Director of CRO & Funnel Optimization',
        email: 'c.chen@nexusagency.com',
        slackChannel: '#nexus-vanguard-pod',
        whatsappUrl: 'https://wa.me/15550198421',
      },
      kpis: {
        monthlySpend: 28000,
        blendedRoas: 3.9,
        qualifiedLeads: 174,
        cac: 160.9,
        cacReductionPct: 26,
        revenueGenerated: 109200,
        impressions: 890000,
        clickThroughRate: 2.85,
      },
      sprints: [
        {
          id: 'sp-20',
          title: 'HIPAA-Compliant Conversion Tracking & Server Tagging',
          category: 'Tech',
          status: 'Completed',
          targetDate: '2026-09-30',
          summary: 'Secure GTM server container routing telemetry with zero patient health information leakage.',
        },
        {
          id: 'sp-21',
          title: 'Interactive Clinician ROI Calculator Redesign',
          category: 'CRO',
          status: 'In Progress',
          targetDate: '2026-11-15',
          summary: 'Interactive widget driving +42% more scheduled demo appointments.',
        },
      ],
      deliverables: [
        {
          id: 'del-20',
          title: 'Q3 Funnel Conversion & Demo Rate Review',
          category: 'Analytics',
          status: 'Delivered',
          date: '2026-10-15',
          fileSize: '3.6 MB',
          fileType: 'PDF',
        },
      ],
      activityLog: [
        {
          id: 'act-20',
          timestamp: '2026-11-01T15:40:00Z',
          author: 'Chloe Chen',
          message: 'A/B test on pricing table variant B showed +18% lift in enterprise quote requests.',
        },
      ],
    },
  ],
  simulations: [],
};

class Store {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.load();
  }

  private load(): DatabaseSchema {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        // Ensure new arrays exist
        parsed.dsarRequests = parsed.dsarRequests || INITIAL_SEED.dsarRequests;
        parsed.securityLogs = parsed.securityLogs || INITIAL_SEED.securityLogs;
        parsed.clientProjects = parsed.clientProjects || INITIAL_SEED.clientProjects;
        parsed.simulations = parsed.simulations || INITIAL_SEED.simulations;
        return parsed;
      }
    } catch (e) {
      console.warn('Failed to read storage.json, initializing fresh seed', e);
    }
    this.save(INITIAL_SEED);
    return JSON.parse(JSON.stringify(INITIAL_SEED));
  }

  private save(data: DatabaseSchema) {
    try {
      const dir = path.dirname(DB_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) {
      console.error('Failed to save storage.json', e);
    }
  }

  // Leads
  getLeads(): Lead[] {
    return [...this.data.leads].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  getLeadById(id: string): Lead | undefined {
    return this.data.leads.find((l) => l.id === id);
  }

  createLead(leadData: Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'internalNotes'>): Lead {
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      internalNotes: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.data.leads.unshift(newLead);
    this.save(this.data);
    return newLead;
  }

  updateLeadStatus(id: string, status: Lead['status']): Lead | null {
    const lead = this.data.leads.find((l) => l.id === id);
    if (!lead) return null;
    lead.status = status;
    lead.updatedAt = new Date().toISOString();
    this.save(this.data);
    return lead;
  }

  addLeadNote(id: string, author: string, note: string): Lead | null {
    const lead = this.data.leads.find((l) => l.id === id);
    if (!lead) return null;
    lead.internalNotes.push({
      id: `note-${Date.now()}`,
      timestamp: new Date().toISOString(),
      author,
      note,
    });
    lead.updatedAt = new Date().toISOString();
    this.save(this.data);
    return lead;
  }

  // Bookings
  getBookings(): ConsultationBooking[] {
    return [...this.data.bookings].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  createBooking(bookingData: Omit<ConsultationBooking, 'id' | 'createdAt'>): ConsultationBooking {
    const newBooking: ConsultationBooking = {
      ...bookingData,
      id: `book-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
    };
    this.data.bookings.unshift(newBooking);
    this.save(this.data);
    return newBooking;
  }

  updateBookingStatus(id: string, status: ConsultationBooking['status']): ConsultationBooking | null {
    const booking = this.data.bookings.find((b) => b.id === id);
    if (!booking) return null;
    booking.status = status;
    this.save(this.data);
    return booking;
  }

  // Audits
  getAudits(): MarketingAuditRequest[] {
    return [...this.data.audits].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  createAudit(auditData: Omit<MarketingAuditRequest, 'id' | 'createdAt'>): MarketingAuditRequest {
    const newAudit: MarketingAuditRequest = {
      ...auditData,
      id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
    };
    this.data.audits.unshift(newAudit);
    this.save(this.data);
    return newAudit;
  }

  updateAuditStatus(id: string, status: MarketingAuditRequest['status']): MarketingAuditRequest | null {
    const audit = this.data.audits.find((a) => a.id === id);
    if (!audit) return null;
    audit.status = status;
    this.save(this.data);
    return audit;
  }

  // Newsletter
  getSubscribers(): NewsletterSubscriber[] {
    return [...this.data.subscribers];
  }

  createSubscriber(email: string, country?: string): { subscriber: NewsletterSubscriber; isNew: boolean } {
    const existing = this.data.subscribers.find((s) => s.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return { subscriber: existing, isNew: false };
    }
    const newSub: NewsletterSubscriber = {
      id: `sub-${Date.now()}`,
      email,
      country,
      subscribedAt: new Date().toISOString(),
      active: true,
    };
    this.data.subscribers.unshift(newSub);
    this.save(this.data);
    return { subscriber: newSub, isNew: true };
  }

  // Sessions & Authentication
  createSession(email: string): string {
    const token = `nexus_sess_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 days
    this.data.sessions.push({ token, email, expiresAt });
    this.save(this.data);
    return token;
  }

  verifyToken(token: string): boolean {
    const session = this.data.sessions.find((s) => s.token === token);
    if (!session) return false;
    if (new Date(session.expiresAt).getTime() < Date.now()) {
      return false;
    }
    return true;
  }

  getSessionEmail(token: string): string | null {
    const session = this.data.sessions.find((s) => s.token === token);
    if (!session) return null;
    if (new Date(session.expiresAt).getTime() < Date.now()) {
      return null;
    }
    return session.email;
  }

  // Overview Stats
  getStats() {
    const totalLeads = this.data.leads.length;
    const newLeads = this.data.leads.filter((l) => l.status === 'New').length;
    const qualifiedLeads = this.data.leads.filter((l) => l.status === 'Qualified').length;
    const convertedLeads = this.data.leads.filter((l) => l.status === 'Converted').length;
    const totalBookings = this.data.bookings.length;
    const totalAudits = this.data.audits.length;
    const totalSubscribers = this.data.subscribers.length;

    return {
      totalLeads,
      newLeads,
      qualifiedLeads,
      convertedLeads,
      totalBookings,
      totalAudits,
      totalSubscribers,
      estimatedPipelineUSD: 145000,
    };
  }

  // DSAR (Data Subject Access Requests - GDPR / CCPA)
  getDsarRequests(): DsarRequest[] {
    return [...(this.data.dsarRequests || [])].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  getDsarById(id: string): DsarRequest | undefined {
    return (this.data.dsarRequests || []).find((d) => d.id === id);
  }

  createDsarRequest(dsarData: Omit<DsarRequest, 'id' | 'createdAt' | 'status'>): DsarRequest {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newRequest: DsarRequest = {
      ...dsarData,
      id: `DSAR-2026-${randomSuffix}`,
      status: 'Pending Verification',
      createdAt: new Date().toISOString(),
    };
    if (!this.data.dsarRequests) this.data.dsarRequests = [];
    this.data.dsarRequests.unshift(newRequest);

    this.logSecurityEvent({
      type: 'dsar_submitted',
      summary: `DSAR Request ${newRequest.id} (${newRequest.requestType}) lodged for ${newRequest.email}`,
      metadata: { requestId: newRequest.id, type: newRequest.requestType },
    });

    this.save(this.data);
    return newRequest;
  }

  updateDsarStatus(id: string, status: DsarRequest['status'], resolutionNotes?: string): DsarRequest | null {
    const request = (this.data.dsarRequests || []).find((d) => d.id === id);
    if (!request) return null;
    request.status = status;
    if (resolutionNotes) request.resolutionNotes = resolutionNotes;
    if (status === 'Fulfilled' || status === 'Rejected') {
      request.resolvedAt = new Date().toISOString();
    }

    this.logSecurityEvent({
      type: 'dsar_status_change',
      summary: `DSAR Request ${id} status updated to ${status}`,
      metadata: { requestId: id, status, resolutionNotes },
    });

    this.save(this.data);
    return request;
  }

  // GDPR Right-to-be-Forgotten: Anonymize or redact personal identifying data
  fulfillErasure(email: string): { leadsAnonymized: number; bookingsAnonymized: number; subscribersRemoved: number } {
    const targetEmail = email.toLowerCase().trim();
    let leadsAnonymized = 0;
    let bookingsAnonymized = 0;
    let subscribersRemoved = 0;

    // Anonymize leads
    this.data.leads.forEach((l) => {
      if (l.email.toLowerCase() === targetEmail) {
        l.fullName = 'REDACTED [GDPR Request]';
        l.email = `anonymized-${l.id}@privacy.nexusagency.internal`;
        l.phone = '+00 000 000 0000';
        l.companyName = 'Redacted Commercial Entity';
        l.projectDetails = '[Redacted pursuant to GDPR Article 17 Erasure request]';
        l.status = 'Lost';
        l.internalNotes.push({
          id: `note-${Date.now()}`,
          timestamp: new Date().toISOString(),
          author: 'Data Privacy System',
          note: 'Record anonymized following verified Right to be Forgotten request.',
        });
        leadsAnonymized += 1;
      }
    });

    // Anonymize bookings
    this.data.bookings.forEach((b) => {
      if (b.email.toLowerCase() === targetEmail) {
        b.fullName = 'REDACTED [GDPR Request]';
        b.email = `anonymized-${b.id}@privacy.nexusagency.internal`;
        b.phone = '+00 000 000 0000';
        b.primaryChallenge = '[Redacted pursuant to GDPR Article 17]';
        b.status = 'Cancelled';
        bookingsAnonymized += 1;
      }
    });

    // Remove from subscribers
    const initialSubCount = this.data.subscribers.length;
    this.data.subscribers = this.data.subscribers.filter(
      (s) => s.email.toLowerCase() !== targetEmail
    );
    subscribersRemoved = initialSubCount - this.data.subscribers.length;

    this.logSecurityEvent({
      type: 'data_erasure',
      summary: `GDPR Erasure completed for ${targetEmail}: ${leadsAnonymized} leads, ${bookingsAnonymized} bookings, ${subscribersRemoved} subs scrubbed.`,
    });

    this.save(this.data);
    return { leadsAnonymized, bookingsAnonymized, subscribersRemoved };
  }

  // GDPR Right to Data Portability (Article 20): Export structured JSON
  exportUserData(email: string): {
    exportDate: string;
    requesterEmail: string;
    dataController: string;
    records: {
      leads: Lead[];
      bookings: ConsultationBooking[];
      audits: MarketingAuditRequest[];
      newsletter: NewsletterSubscriber[];
    };
  } {
    const targetEmail = email.toLowerCase().trim();
    const leads = this.data.leads.filter((l) => l.email.toLowerCase() === targetEmail);
    const bookings = this.data.bookings.filter((b) => b.email.toLowerCase() === targetEmail);
    const audits = this.data.audits.filter((a) => a.contactEmail.toLowerCase() === targetEmail);
    const newsletter = this.data.subscribers.filter((s) => s.email.toLowerCase() === targetEmail);

    this.logSecurityEvent({
      type: 'data_export',
      summary: `GDPR Portability export generated for ${targetEmail}`,
    });

    return {
      exportDate: new Date().toISOString(),
      requesterEmail: email,
      dataController: 'Nexus International Digital Marketing Agency LLC',
      records: {
        leads,
        bookings,
        audits,
        newsletter,
      },
    };
  }

  // Security Audit Logging
  logSecurityEvent(event: Omit<SecurityAuditEntry, 'id' | 'timestamp'>): SecurityAuditEntry {
    if (!this.data.securityLogs) this.data.securityLogs = [];
    const entry: SecurityAuditEntry = {
      id: `sec-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      ...event,
    };
    this.data.securityLogs.unshift(entry);
    // Keep max 500 audit logs
    if (this.data.securityLogs.length > 500) {
      this.data.securityLogs = this.data.securityLogs.slice(0, 500);
    }
    this.save(this.data);
    return entry;
  }

  getSecurityLogs(): SecurityAuditEntry[] {
    return [...(this.data.securityLogs || [])];
  }

  // Client Portal & Projects
  getClientProjects(): ClientProject[] {
    return [...(this.data.clientProjects || [])];
  }

  getClientProject(idOrEmail: string): ClientProject | undefined {
    const term = idOrEmail.toLowerCase().trim();
    return (this.data.clientProjects || []).find(
      (p) => p.id.toLowerCase() === term || p.email.toLowerCase() === term
    );
  }

  updateDeliverableStatus(
    projectId: string,
    deliverableId: string,
    status: 'Delivered' | 'Pending Approval' | 'Revision Requested' | 'Approved',
    note?: string
  ): boolean {
    const project = this.getClientProject(projectId);
    if (!project) return false;
    const deliverable = project.deliverables.find((d) => d.id === deliverableId);
    if (!deliverable) return false;
    deliverable.status = status;
    if (note) {
      project.activityLog.unshift({
        id: `act-${Date.now()}`,
        timestamp: new Date().toISOString(),
        author: project.clientName,
        message: `Status updated on "${deliverable.title}" to "${status}". Note: ${note}`,
      });
    }
    this.save(this.data);
    return true;
  }

  requestScopeExpansion(
    projectId: string,
    newChannel: string,
    additionalBudget: string,
    notes: string
  ): boolean {
    const project = this.getClientProject(projectId);
    if (!project) return false;
    project.activityLog.unshift({
      id: `act-${Date.now()}`,
      timestamp: new Date().toISOString(),
      author: project.clientName,
      message: `Scope expansion requested: ${newChannel} (${additionalBudget}). Note: ${notes}`,
    });
    // Create new inbound high-priority lead for senior squad
    this.createLead({
      fullName: project.clientName,
      email: project.email,
      phone: '+44 20 7946 0812',
      companyName: project.companyName,
      websiteUrl: project.domain,
      country: project.market,
      serviceRequired: `Scope Expansion: ${newChannel}`,
      estimatedBudget: additionalBudget,
      projectDetails: `Existing Client [${project.id}] scope expansion request: ${notes}`,
      status: 'Qualified',
      source: 'contact_form',
      preferredCurrency: project.currency,
    });
    this.save(this.data);
    return true;
  }

  addProjectMessage(projectId: string, author: string, message: string): boolean {
    const project = this.getClientProject(projectId);
    if (!project) return false;
    project.activityLog.unshift({
      id: `msg-${Date.now()}`,
      timestamp: new Date().toISOString(),
      author,
      message,
    });
    this.save(this.data);
    return true;
  }

  // Growth & ROI Simulations
  saveSimulation(record: Omit<GrowthSimulationRecord, 'id' | 'createdAt'>): GrowthSimulationRecord {
    if (!this.data.simulations) this.data.simulations = [];
    const sim: GrowthSimulationRecord = {
      id: `SIM-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      ...record,
    };
    this.data.simulations.unshift(sim);

    // If contact email was provided, auto-create a qualified inbound lead
    if (record.contactEmail) {
      this.createLead({
        fullName: record.contactName || 'Growth Simulation User',
        email: record.contactEmail,
        phone: '',
        companyName: record.companyName || 'Unknown Commercial Entity',
        websiteUrl: record.websiteUrl,
        country: record.currency === 'GBP' ? 'United Kingdom' : record.currency === 'AED' ? 'United Arab Emirates' : 'United States',
        serviceRequired: record.selectedChannels.join(', ') || 'Multi-Channel Campaign Growth',
        estimatedBudget: `${record.currency} ${record.monthlyBudget.toLocaleString()}/mo`,
        projectDetails: `Growth Simulator Run (${record.scenario} Scenario): Model: ${record.businessModel}, Projected ROAS: ${record.projectedRoas}x, Annual Projected Revenue: ${record.currency} ${Math.round(record.projectedAnnualRevenue).toLocaleString()}, Projected CAC: ${record.currency} ${Math.round(record.projectedCac)} (-${record.cacReductionPct}%).`,
        status: 'New',
        source: 'quote_calculator',
        preferredCurrency: record.currency,
      });
    }

    this.save(this.data);
    return sim;
  }

  getSimulations(): GrowthSimulationRecord[] {
    return [...(this.data.simulations || [])];
  }
}

export const store = new Store();
