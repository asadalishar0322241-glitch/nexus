/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Supported Target Currencies
export type CurrencyCode = 'USD' | 'GBP' | 'AED';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  exchangeRateFromUSD: number; // e.g. 1 USD = 0.79 GBP, 3.67 AED
  flag: string;
}

// Target Markets
export type TargetMarket = 'US' | 'UK' | 'UAE' | 'GLOBAL';

// ----------------------------------------------------
// Core Services
// ----------------------------------------------------
export interface ServiceMetric {
  label: string;
  value: string;
  context: string;
}

export interface ServiceDetail {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  shortDescription: string;
  iconName: string;
  category: 'performance' | 'creative' | 'organic' | 'tech';
  problemsSolved: string[];
  solutions: string[];
  keyBenefits: string[];
  deliverables: string[];
  workingProcess: Array<{ step: number; title: string; description: string }>;
  verifiedMetricsSample: ServiceMetric[];
  faq: Array<{ question: string; answer: string }>;
  startingPrice: {
    USD: number;
    GBP: number;
    AED: number;
  };
}

// ----------------------------------------------------
// Portfolio & Case Studies
// ----------------------------------------------------
export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  clientIndustry: string;
  servicesProvided: string[];
  targetRegion: TargetMarket;
  heroImage: string;
  challenge: string;
  strategy: string;
  execution: string[];
  outcomes: ServiceMetric[];
  technologiesUsed: string[];
  isFeatured: boolean;
}

// ----------------------------------------------------
// Pricing Packages
// ----------------------------------------------------
export interface PricingTier {
  id: 'starter' | 'growth' | 'enterprise';
  name: string;
  tagline: string;
  monthlyPrice: {
    USD: number;
    GBP: number;
    AED: number;
  };
  annualDiscountPercent: number;
  targetAudience: string;
  deliverables: string[];
  omittedFeatures: string[];
  isPopular?: boolean;
  ctaText: string;
}

// ----------------------------------------------------
// Leads & Inquiries
// ----------------------------------------------------
export type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'Qualified'
  | 'Proposal Sent'
  | 'Converted'
  | 'Lost';

export interface LeadInternalNote {
  id: string;
  timestamp: string;
  author: string;
  note: string;
}

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
  status: LeadStatus;
  internalNotes: LeadInternalNote[];
  source: 'contact_form' | 'audit_request' | 'quote_calculator' | 'gemini_assistant';
  preferredCurrency: CurrencyCode;
  createdAt: string;
  updatedAt: string;
}

// ----------------------------------------------------
// Consultation Bookings
// ----------------------------------------------------
export interface ConsultationBooking {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  websiteUrl?: string;
  scheduledDate: string; // YYYY-MM-DD
  scheduledTimeSlot: string; // e.g. "14:00 - 14:45"
  timeZone: string; // e.g. "America/New_York", "Europe/London", "Asia/Dubai"
  primaryChallenge: string;
  status: 'Confirmed' | 'Completed' | 'Rescheduled' | 'Cancelled';
  createdAt: string;
}

// ----------------------------------------------------
// Marketing Audits
// ----------------------------------------------------
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

// ----------------------------------------------------
// Newsletter Subscribers
// ----------------------------------------------------
export interface NewsletterSubscriber {
  id: string;
  email: string;
  country?: string;
  subscribedAt: string;
  active: boolean;
}

// ----------------------------------------------------
// Blog Articles
// ----------------------------------------------------
export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown or rich text
  category: 'SEO' | 'Performance Media' | 'CRO & UX' | 'AI & Automation' | 'International Growth';
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTimeMinutes: number;
  tags: string[];
  coverImage: string;
  metaDescription: string;
}

// ----------------------------------------------------
// Global Agency Contact Info & CMS Config
// ----------------------------------------------------
export interface AgencyContactInfo {
  agencyName: string;
  legalEntityName: string;
  mainEmail: string;
  supportEmail: string;
  phoneUS: string;
  phoneUK: string;
  phoneUAE: string;
  whatsappNumber: string;
  headquartersAddress: string;
  officeLocations: Array<{
    city: string;
    country: string;
    address: string;
    timeZone: string;
  }>;
  socials: {
    linkedin?: string;
    x?: string;
    instagram?: string;
    youtube?: string;
  };
}

// ----------------------------------------------------
// Gemini Chatbot Multi-Turn Thread
// ----------------------------------------------------
export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  recommendedService?: string;
  leadCaptured?: boolean;
}

// ----------------------------------------------------
// Compliance, DSAR & Cookie Preferences
// ----------------------------------------------------
export type DsarRequestType =
  | 'access_export'
  | 'erasure_deletion'
  | 'rectification'
  | 'opt_out_sale'
  | 'restriction';

export type DsarStatus =
  | 'Pending Verification'
  | 'Under Review'
  | 'Fulfilled'
  | 'Rejected';

export interface DsarRequest {
  id: string; // e.g. "DSAR-2026-4821"
  requestType: DsarRequestType;
  fullName: string;
  email: string;
  companyName?: string;
  country: string;
  details?: string;
  status: DsarStatus;
  resolutionNotes?: string;
  createdAt: string;
  resolvedAt?: string;
}

export interface CookieConsentPreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
}

