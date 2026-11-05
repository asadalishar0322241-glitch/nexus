/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CaseStudy } from '../types';

export const CASE_STUDIES_DATA: CaseStudy[] = [
  {
    id: 'nordic-luxe-ecommerce',
    slug: 'nordic-luxe-ecommerce',
    title: 'Scaling an International DTC Lifestyle Brand to £3.8M Inbound Sales',
    clientIndustry: 'Luxury E-Commerce & Retail',
    servicesProvided: ['Meta Advertising', 'Google Performance Max', 'Klaviyo Lifecycle', 'CRO'],
    targetRegion: 'UK',
    heroImage: '/src/assets/images/ecommerce_case_study_1793771912703.jpg',
    challenge: 'High customer acquisition costs on paid social and a 68% mobile cart abandonment rate preventing profitable European scaling.',
    strategy: 'Restructured the paid funnel with creative-first UGC angles, deployed a 3-step checkout redesign, and launched VIP retention automations.',
    execution: [
      'Engineered server-side Meta Conversions API (CAPI) restoring attribution visibility to 9.2 Match Quality.',
      'A/B tested mobile checkout flows, eliminating unnecessary address fields and enabling instant Apple Pay.',
      'Created 8 automated retention flows in Klaviyo producing 29% of store monthly gross revenue.'
    ],
    outcomes: [
      { label: 'Return on Ad Spend (ROAS)', value: '4.6x', context: 'Blended cross-channel ROAS' },
      { label: 'Conversion Rate Uplift', value: '+48%', context: 'Mobile checkout completion' },
      { label: 'Customer LTV (90-Day)', value: '+35%', context: 'Repeat purchase frequency' }
    ],
    technologiesUsed: ['Shopify Plus', 'Meta CAPI', 'Google Ads', 'Klaviyo', 'Hotjar'],
    isFeatured: true
  },
  {
    id: 'apex-cloud-enterprise-saas',
    slug: 'apex-cloud-enterprise-saas',
    title: 'Generating $2.4M Qualified Pipeline for an Enterprise DevOps Platform',
    clientIndustry: 'B2B Software / SaaS',
    servicesProvided: ['Technical SEO', 'Google Search Ads', 'Content Strategy', 'CRO'],
    targetRegion: 'US',
    heroImage: '/src/assets/images/saas_growth_case_study_1793771913163.jpg',
    challenge: 'Invisible for bottom-of-funnel technical search keywords and burning ad spend on irrelevant student and hobbyist searches.',
    strategy: 'Cleaned search query architecture with exact intent match grouping, built comparison pillar assets, and rebuilt the demo request funnel.',
    execution: [
      'Audited and deployed 1,400+ targeted negative keywords, instantly cutting wasted ad spend by 34%.',
      'Engineered 6 authoritative technical competitor comparison pages that now rank #1 on Google US.',
      'Rebuilt demo booking flow with real-time calendar selection, increasing lead-to-held-meeting rate by 52%.'
    ],
    outcomes: [
      { label: 'Sales Pipeline Generated', value: '$2.4M', context: 'In qualified demo opportunities' },
      { label: 'Cost Per Qualified Demo', value: '-41%', context: 'Efficiency increase over 6 months' },
      { label: 'Organic Inbound Leads', value: '+165%', context: 'From technical comparison hubs' }
    ],
    technologiesUsed: ['React', 'HubSpot CRM', 'Google Ads', 'Ahrefs', 'Clearbit'],
    isFeatured: true
  },
  {
    id: 'mirage-real-estate-dubai',
    slug: 'mirage-real-estate-dubai',
    title: 'Acquiring Ultra-High-Net-Worth Buyers for Dubai Luxury Waterfront Estates',
    clientIndustry: 'Real Estate & Wealth',
    servicesProvided: ['Meta Ads', 'Google Ads', 'Brand Identity', 'WhatsApp CRM Funnel'],
    targetRegion: 'UAE',
    heroImage: '/src/assets/images/executive_client_meeting_1793895404256.jpg',
    challenge: 'Extremely crowded Dubai property advertising landscape with low-intent clickers and high lead disqualification rates.',
    strategy: 'Deployed multi-lingual Arabic and English high-end video tours paired with instant VIP WhatsApp concierge qualification.',
    execution: [
      'Segmented campaigns targeting verified high-net-worth investors across GCC, UK, and European capitals.',
      'Built a frictionless interactive brochure request funnel connected directly to private WhatsApp brokers.',
      'Refined visual presentation with cinematic 4K drone cinematography and bespoke typographic branding.'
    ],
    outcomes: [
      { label: 'Direct Property Transactions', value: 'AED 84M', context: 'Attributed closed sales volume' },
      { label: 'Qualified Investor Inquiries', value: '420+', context: 'Vetted with verified capital' },
      { label: 'Lead Contact Rate', value: '92%', context: 'Via instant WhatsApp routing' }
    ],
    technologiesUsed: ['Meta Ads', 'Google Ads', 'WhatsApp Business API', 'Zoho CRM'],
    isFeatured: true
  }
];
