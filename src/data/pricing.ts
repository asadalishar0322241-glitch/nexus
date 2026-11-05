/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PricingTier } from '../types';

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Ideal for ambitious startups and businesses establishing their initial growth engine.',
    monthlyPrice: {
      USD: 2900,
      GBP: 2280,
      AED: 10650,
    },
    annualDiscountPercent: 15,
    targetAudience: 'Early-stage startups, local service providers, single-market brands',
    deliverables: [
      '1 Core Focus Channel (SEO or Google Ads or Meta Ads)',
      'Bi-weekly performance review calls',
      'Technical tracking & conversion setup',
      'Dedicated Slack/Teams communication channel',
      'Custom monthly reporting dashboard',
      'Standard 24-business-hour response SLA'
    ],
    omittedFeatures: [
      'Multi-channel media attribution',
      'Creative studio video/motion production',
      'Dedicated Chief Marketing Officer (CMO) strategist',
      'International multi-region hreflang architecture'
    ],
    ctaText: 'Start with Starter'
  },
  {
    id: 'growth',
    name: 'Growth',
    tagline: 'For scaling companies requiring aggressive cross-channel acquisition and conversion optimization.',
    monthlyPrice: {
      USD: 5400,
      GBP: 4250,
      AED: 19800,
    },
    annualDiscountPercent: 20,
    targetAudience: 'Scaling e-commerce, high-growth B2B SaaS, mid-market enterprises',
    deliverables: [
      '2 Integrated Growth Channels (e.g. SEO + Paid Ads or Ads + CRO)',
      'Direct-response creative studio (10 fresh ad assets / month)',
      'Weekly strategy and sprint sync calls',
      'Full-funnel CRO heatmap & form experimentation',
      'Multi-market coverage (US, UK, or UAE targeting)',
      'Dedicated Senior Growth Lead & Media Buyer',
      'Priority 4-hour response SLA'
    ],
    omittedFeatures: [
      'Custom headless web engineering sprint',
      'On-site executive quarterly boardroom planning'
    ],
    isPopular: true,
    ctaText: 'Scale with Growth'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'Comprehensive marketing infrastructure and dedicated growth pod for market leaders.',
    monthlyPrice: {
      USD: 9800,
      GBP: 7750,
      AED: 36000,
    },
    annualDiscountPercent: 25,
    targetAudience: 'Established multi-market corporations, international e-commerce leaders',
    deliverables: [
      'Full-stack growth pod (SEO, Google Ads, Meta, CRO, Email Lifecycle)',
      'Unlimited direct-response creative production & motion design',
      'Dedicated Fractional CMO & Senior Analytics Architect',
      'Custom headless web development & continuous CRO sprints',
      'Cross-border international localization (US, UK, and UAE/GCC)',
      'Real-time server-side data warehouse & BigQuery sync',
      'Direct WhatsApp VIP hotline & guaranteed 1-hour SLA'
    ],
    omittedFeatures: [],
    ctaText: 'Partner with Enterprise'
  }
];
