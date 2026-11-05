/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceDetail } from '../types';

export const SERVICES_DATA: ServiceDetail[] = [
  {
    id: 'seo',
    slug: 'seo',
    title: 'Search Engine Optimization',
    tagline: 'Dominate organic search with data-backed technical and semantic SEO.',
    shortDescription: 'Technical site architecture, entity optimization, authoritative digital PR, and international multi-lingual indexing.',
    iconName: 'Search',
    category: 'organic',
    problemsSolved: [
      'Stagnant organic traffic and invisible high-intent keyword rankings.',
      'Core Web Vitals crawlability bottlenecks and JavaScript indexing failures.',
      'Drop in search visibility following Google core algorithm updates.',
      'Lack of international multi-region hreflang architecture.'
    ],
    solutions: [
      'Comprehensive architectural crawl analysis and semantic schema engineering.',
      'Editorial content cluster production grounded in commercial search intent.',
      'White-hat authoritative digital PR earning genuine editorial backlinks.',
      'Multi-regional localized SEO for US, UK, and UAE/GCC markets.'
    ],
    keyBenefits: [
      'Sustainable compounding inbound pipeline without rising ad costs.',
      'Top 3 search positioning for mission-critical commercial terms.',
      'Measurable qualified organic demo and sales pipeline.'
    ],
    deliverables: [
      'Monthly technical crawl health & speed audit.',
      '12x optimized long-form editorial authority articles per quarter.',
      'Custom JSON-LD structured data and knowledge graph entity mapping.',
      'Executive real-time Looker Studio ranking and conversion dashboard.'
    ],
    workingProcess: [
      { step: 1, title: 'Technical Crawl & Log Audit', description: 'Deep inspection of indexation status, robots directives, and rendering bottlenecks.' },
      { step: 2, title: 'Competitor Semantic Gap Analysis', description: 'Reverse-engineering top ranking rivals in your target countries.' },
      { step: 3, title: 'On-Page & Entity Optimization', description: 'Restructuring information architecture, metadata, and topical depth.' },
      { step: 4, title: 'Digital PR & Authority Acquisition', description: 'Distributing journalistic assets to Tier 1 industry publications.' }
    ],
    verifiedMetricsSample: [
      { label: 'Organic Inbound Revenue', value: '+184%', context: 'Over 9-month campaign cycle' },
      { label: 'Top 3 Keyword Placements', value: '340+', context: 'High-intent commercial terms' }
    ],
    faq: [
      { question: 'How long before we see measurable organic growth?', answer: 'Technical fixes often yield crawl improvements within 3-4 weeks. Competitive keyword movements typically compound significantly between months 3 and 6.' },
      { question: 'Do you manage international and multilingual SEO?', answer: 'Yes. We specialize in cross-border hreflang configurations and cultural localization for US, UK, and Arabic-speaking UAE/GCC markets.' }
    ],
    startingPrice: {
      USD: 3500,
      GBP: 2750,
      AED: 12800
    }
  },
  {
    id: 'google-ads-ppc',
    slug: 'google-ads-ppc',
    title: 'Google Ads & Performance PPC',
    tagline: 'High-intent paid search, Performance Max, and YouTube demand capture.',
    shortDescription: 'Profitable customer acquisition architectures combining granular audience layering, first-party data, and automated bidding.',
    iconName: 'TrendingUp',
    category: 'performance',
    problemsSolved: [
      'Bloated cost per acquisition (CPA) and low return on ad spend (ROAS).',
      'Irrelevant search query spend caused by broad match algorithmic drift.',
      'Inaccurate offline conversion tracking and broken attribution modeling.'
    ],
    solutions: [
      'Single-intent ad group structuring and strict negative keyword filtering.',
      'Enhanced conversions tracking integrated with CRM pipeline stages.',
      'Dynamic creative testing across Search, YouTube, and Performance Max.'
    ],
    keyBenefits: [
      'Immediate capture of users actively searching for your high-value offerings.',
      'Transparent attribution connecting ad clicks to closed enterprise revenue.',
      'Guaranteed cost controls with strict negative query governance.'
    ],
    deliverables: [
      'Full account audit and restructuring.',
      'Conversion tracking verification with server-side GTM.',
      'Ad copy variants with dynamic keyword insertion.',
      'Weekly bid optimizations and budget pacing control.'
    ],
    workingProcess: [
      { step: 1, title: 'Account Forensics', description: 'Auditing wasted spend, conversion accuracy, and historical search query logs.' },
      { step: 2, title: 'Tracking Hardening', description: 'Implementing Google Enhanced Conversions and CRM offline sync.' },
      { step: 3, title: 'Campaign Architecture', description: 'Deploying high-intent Search, Demand Gen, and Performance Max pods.' },
      { step: 4, title: 'Algorithmic Scaling', description: 'Transitioning to tCPA/tROAS bidding once data density is established.' }
    ],
    verifiedMetricsSample: [
      { label: 'Average ROAS Achieved', value: '4.8x', context: 'Across targeted B2B and E-commerce accounts' },
      { label: 'CPA Reduction', value: '-38%', context: 'Within 60 days of account restructure' }
    ],
    faq: [
      { question: 'What is your recommended minimum monthly ad budget?', answer: 'For meaningful algorithmic optimization in competitive US, UK, or UAE markets, we suggest an ad spend of at least $4,000 / £3,000 / AED 15,000 per month.' }
    ],
    startingPrice: {
      USD: 3000,
      GBP: 2400,
      AED: 11000
    }
  },
  {
    id: 'meta-ads',
    slug: 'meta-ads',
    title: 'Meta & Paid Social Advertising',
    tagline: 'Creative-led paid acquisition across Instagram, Facebook, and TikTok.',
    shortDescription: 'High-volume creative testing, Conversions API (CAPI) infrastructure, and full-funnel retention campaigns.',
    iconName: 'Share2',
    category: 'performance',
    problemsSolved: [
      'Ad fatigue, declining ROAS, and erratic Meta auction volatility.',
      'Signal loss from privacy changes and signal decay on iOS devices.',
      'Inability to produce enough high-converting video and image ad creatives.'
    ],
    solutions: [
      'Direct-response creative engine producing static and UGC concepts weekly.',
      'Server-side Meta Conversions API (CAPI) with 9.0+ Event Match Quality.',
      'Broad targeting paired with creative-as-targeting architecture.'
    ],
    keyBenefits: [
      'Predictable customer acquisition at scale.',
      'High-velocity creative library built specifically for your ideal client profiles.',
      'Omnichannel remarketing capturing high-intent drop-offs.'
    ],
    deliverables: [
      '10-15 net-new creative variations produced monthly.',
      'Full CAPI server-side event pipeline implementation.',
      'Audience testing and lookalike modeling.',
      'Creative breakdown reports by hook rate, hold rate, and conversion.'
    ],
    workingProcess: [
      { step: 1, title: 'Creative Research', description: 'Deconstructing competitor ads and customer review sentiment.' },
      { step: 2, title: 'Infrastructure Setup', description: 'Deploying server-side CAPI and verified domain settings.' },
      { step: 3, title: 'Sprint 1 Launch', description: 'Testing 4 distinct creative angles to find winning hooks.' },
      { step: 4, title: 'Scale & Iterate', description: 'Deploying variations of winners and scaling budgets profitably.' }
    ],
    verifiedMetricsSample: [
      { label: 'Blended Acquisition ROAS', value: '3.9x', context: 'Across international DTC & service clients' },
      { label: 'Monthly Creative Output', value: '20+ assets', context: 'Motion, carousel, and static hooks' }
    ],
    faq: [
      { question: 'Do you create the ad creative assets in-house?', answer: 'Yes. Our design and video team creates custom motion graphics, carousels, and scripts direct-response video hooks.' }
    ],
    startingPrice: {
      USD: 3200,
      GBP: 2500,
      AED: 11800
    }
  },
  {
    id: 'web-development',
    slug: 'web-development',
    title: 'Web Design & CRO Engineering',
    tagline: 'Engineered for speed, aesthetics, and maximum conversion rates.',
    shortDescription: 'High-performance React/Next.js and Shopify Plus websites optimized for sub-second load times and high conversions.',
    iconName: 'Code',
    category: 'tech',
    problemsSolved: [
      'Slow mobile load speeds causing high bounce rates and lost ad dollars.',
      'Cluttered, outdated interfaces failing to build international credibility.',
      'Non-responsive checkout funnels with confusing steps and abandonment.'
    ],
    solutions: [
      'Custom headless or modern Jamstack frontend engineering.',
      'Rigorous WCAG 2.2 accessibility, responsive layouts, and lightning load speeds.',
      'Conversion-centered UI design backed by behavioral heatmap insights.'
    ],
    keyBenefits: [
      'Sub-second first contentful paint (FCP) across mobile devices globally.',
      'Direct uplift in visitor-to-lead and visitor-to-sale conversion rates.',
      'Enterprise security and clean codebase maintainability.'
    ],
    deliverables: [
      'Custom UI/UX Figma prototypes with interactive component states.',
      'Production-ready React/TypeScript/Tailwind build.',
      'Core Web Vitals 95+ score optimization.',
      'CRM and marketing pixel integration.'
    ],
    workingProcess: [
      { step: 1, title: 'UX Discovery', description: 'Mapping user journeys, conversion barriers, and brand positioning.' },
      { step: 2, title: 'Figma Prototyping', description: 'Crafting responsive mobile and desktop wireframes with client review.' },
      { step: 3, title: 'Clean Development', description: 'Building modular TypeScript components with zero external layout shifts.' },
      { step: 4, title: 'Speed & QA Launch', description: 'Stress-testing cross-device performance and cross-browser stability.' }
    ],
    verifiedMetricsSample: [
      { label: 'Lighthouse Performance Score', value: '98/100', context: 'Mobile & Desktop average' },
      { label: 'Average Conversion Uplift', value: '+42%', context: 'Post-launch redesign benchmark' }
    ],
    faq: [
      { question: 'What technology stack do you use?', answer: 'We build modern frontend platforms using React, Next.js, TypeScript, Tailwind CSS, and headless e-commerce integrations with Shopify Plus.' }
    ],
    startingPrice: {
      USD: 6000,
      GBP: 4700,
      AED: 22000
    }
  },
  {
    id: 'ecommerce-marketing',
    slug: 'ecommerce-marketing',
    title: 'E-Commerce Marketing',
    tagline: 'Scale customer lifetime value and omnichannel sales velocity.',
    shortDescription: 'Full-funnel growth for DTC brands: Google Shopping, retention lifecycle flows, and average order value optimization.',
    iconName: 'ShoppingBag',
    category: 'performance',
    problemsSolved: [
      'High single-purchase churn and unprofitable first-order economics.',
      'Merchant Center disapprovals and degraded Google Shopping feed quality.',
      'Underperforming email welcome flows and cart recovery abandonment.'
    ],
    solutions: [
      'Custom product feed enrichment with optimized titles and attributes.',
      'High-converting Klaviyo lifecycle flows (Welcome, Abandoned Cart, Winback).',
      'Post-purchase upsells and subscription tier optimization.'
    ],
    keyBenefits: [
      'Higher customer lifetime value (LTV) that supports aggressive ad scaling.',
      'Increased Google Shopping impression share against competitors.',
      'Automated email/SMS revenue accounting for 25-35% of total sales.'
    ],
    deliverables: [
      'Product feed optimization and custom label segmentation.',
      '6 Core Klaviyo lifecycle retention automated flows.',
      'On-site average order value (AOV) bundle implementation.',
      'Comprehensive cohort retention reporting.'
    ],
    workingProcess: [
      { step: 1, title: 'Unit Economics Audit', description: 'Calculating CAC, LTV, AOV, and margin thresholds per SKU.' },
      { step: 2, title: 'Feed & Flow Optimization', description: 'Restructuring shopping feeds and deploying retention automations.' },
      { step: 3, title: 'Acquisition Scaling', description: 'Pairing Meta dynamic product ads with Google Performance Max.' },
      { step: 4, title: 'LTV Acceleration', description: 'Launching VIP loyalty tiers and automated repurchase reminders.' }
    ],
    verifiedMetricsSample: [
      { label: 'Email Revenue Contribution', value: '31%', context: 'Of total monthly store sales' },
      { label: 'AOV Increase', value: '+26%', context: 'Via smart checkout cross-sells' }
    ],
    faq: [
      { question: 'Do you work with Shopify and WooCommerce?', answer: 'Yes, with particular expertise in Shopify Plus, headless Shopify, and enterprise WooCommerce architectures.' }
    ],
    startingPrice: {
      USD: 4000,
      GBP: 3100,
      AED: 14700
    }
  },
  {
    id: 'cro',
    slug: 'cro',
    title: 'Conversion Rate Optimization',
    tagline: 'Turn existing traffic into paying clients and qualified pipeline.',
    shortDescription: 'Quantitative heuristic evaluations, session recordings, A/B experimentation, and friction elimination.',
    iconName: 'Zap',
    category: 'tech',
    problemsSolved: [
      'High ad traffic driving clicks but disappointing on-site form completions.',
      'Mobile checkout drop-offs and unintuitive navigation hierarchies.',
      'Subjective internal debates about layout design instead of scientific data.'
    ],
    solutions: [
      'Heatmap and session recording analysis isolating drop-off friction points.',
      'Scientific A/B split-testing with statistical significance thresholds.',
      'Micro-copy refinement and multi-step form progressive disclosure.'
    ],
    keyBenefits: [
      'Lower effective cost per lead without spending an extra dollar on ads.',
      'Concrete behavioral data explaining why visitors do or do not convert.',
      'Compounding baseline conversion rates month-over-month.'
    ],
    deliverables: [
      'Bi-weekly A/B test deployments.',
      'Comprehensive heuristic UX & psychological friction audit.',
      'Session recording synthesis and user feedback polls.',
      'Post-test statistical analysis reports with actionable learnings.'
    ],
    workingProcess: [
      { step: 1, title: 'Quantitative Data Mining', description: 'Analyzing Google Analytics funnel leaks and exit pages.' },
      { step: 2, title: 'Qualitative Session Review', description: 'Watching user recordings to spot confusing elements and dead clicks.' },
      { step: 3, title: 'Hypothesis Formulation', description: 'Prioritizing test concepts by potential business impact and effort.' },
      { step: 4, title: 'Controlled A/B Testing', description: 'Deploying experiments until 95%+ statistical significance is met.' }
    ],
    verifiedMetricsSample: [
      { label: 'Median Conversion Lift', value: '+34%', context: 'Across primary lead and sales funnels' },
      { label: 'Form Completion Rate', value: '+49%', context: 'Via progressive disclosure rebuild' }
    ],
    faq: [
      { question: 'How much traffic is needed to run meaningful CRO tests?', answer: 'We typically recommend a minimum of 20,000 monthly unique visitors or 500 conversions per month for clean statistical significance.' }
    ],
    startingPrice: {
      USD: 3500,
      GBP: 2750,
      AED: 12800
    }
  },
  {
    id: 'content-marketing',
    slug: 'content-marketing',
    title: 'Content Strategy & Inbound Marketing',
    tagline: 'Authoritative, research-backed editorial that drives business decisions.',
    shortDescription: 'Industry whitepapers, SEO-optimized thought leadership, executive ghostwriting, and multi-channel asset repurposing.',
    iconName: 'FileText',
    category: 'organic',
    problemsSolved: [
      'Generic superficial blog posts that fail to generate pipeline.',
      'Inconsistent publishing cadence and lack of cohesive content strategy.',
      'Zero distribution plan for valuable brand assets.'
    ],
    solutions: [
      'Subject-matter expert interviews transforming insights into authority assets.',
      'Systematic distribution playbook across LinkedIn, newsletters, and digital PR.',
      'Full-funnel content matching buyer journey stages (Awareness to Decision).'
    ],
    keyBenefits: [
      'Positioning your brand as the undisputed authority in your niche.',
      'High-intent organic traffic that pre-sells prospects before sales calls.',
      'Evergreen lead assets that generate inquiries for years.'
    ],
    deliverables: [
      'Quarterly editorial calendar mapped to buyer personas.',
      '4x in-depth technical / research articles per month.',
      'Custom infographic and visual charts for social syndication.',
      'Lead magnet whitepaper creation and landing page copy.'
    ],
    workingProcess: [
      { step: 1, title: 'Buyer Persona Mapping', description: 'Identifying the exact questions and challenges keeping your buyers up at night.' },
      { step: 2, title: 'Editorial Architecture', description: 'Building pillar-and-spoke topic clusters with strong internal linking.' },
      { step: 3, title: 'Expert Content Production', description: 'Drafting authoritative copy reviewed by subject specialists.' },
      { step: 4, title: 'Multi-Channel Syndication', description: 'Repurposing articles into LinkedIn threads, executive emails, and press angles.' }
    ],
    verifiedMetricsSample: [
      { label: 'Organic Inbound Leads', value: '+112%', context: 'From editorial pillar articles' },
      { label: 'Avg Time on Page', value: '4m 38s', context: 'Reflecting high engagement depth' }
    ],
    faq: [
      { question: 'Do you use generic AI to write the articles?', answer: 'Never. While we use AI tools for research and topic modeling, all content is written and edited by senior human industry journalists and technical copywriters.' }
    ],
    startingPrice: {
      USD: 2800,
      GBP: 2200,
      AED: 10300
    }
  },
  {
    id: 'email-marketing',
    slug: 'email-marketing',
    title: 'Lifecycle & Retention Marketing',
    tagline: 'Turn subscribers into repeat purchasers and brand advocates.',
    shortDescription: 'Advanced segmentation, automated behavioral triggers, deliverability monitoring, and personalized email journeys.',
    iconName: 'Mail',
    category: 'organic',
    problemsSolved: [
      'Emails landing in the spam folder or promotions tab.',
      'Generic batch-and-blast newsletters with poor open and click rates.',
      'Uncaptured subscriber lifetime value and zero post-purchase retention.'
    ],
    solutions: [
      'Dedicated IP warming, SPF/DKIM/DMARC authentication, and list hygiene.',
      'Hyper-targeted behavioral segmentation based on purchase frequency and RFM.',
      'Compelling storytelling copy and mobile-optimized modular templates.'
    ],
    keyBenefits: [
      'Owned revenue stream completely immune to ad algorithm changes.',
      'Repeat purchase rate increase across existing customer bases.',
      'Consistent 40%+ open rates with pristine domain sender reputation.'
    ],
    deliverables: [
      'Full technical email deliverability and DNS authentication audit.',
      '8 targeted campaign sends per month.',
      'Continuous A/B subject line and preview text experimentation.',
      'Cohort repeat-order rate analysis.'
    ],
    workingProcess: [
      { step: 1, title: 'Domain Sender Audit', description: 'Securing DKIM, SPF, DMARC, and Google/Yahoo sender compliance.' },
      { step: 2, title: 'List Pruning & Hygiene', description: 'Removing dormant subscribers to revive engagement rates.' },
      { step: 3, title: 'Automation Deployment', description: 'Building dynamic behavioral triggers tailored to browsing actions.' },
      { step: 4, title: 'Campaign Execution', description: 'Designing high-converting editorial broadcasts and promotional offers.' }
    ],
    verifiedMetricsSample: [
      { label: 'Average Open Rate', value: '44.2%', context: 'Across client base retention lists' },
      { label: 'Flow Revenue Share', value: '28%', context: 'Of total digital revenue' }
    ],
    faq: [
      { question: 'Which email platforms do you support?', answer: 'We specialize in Klaviyo, HubSpot, ActiveCampaign, and Braze.' }
    ],
    startingPrice: {
      USD: 2500,
      GBP: 1950,
      AED: 9200
    }
  },
  {
    id: 'brand-identity',
    slug: 'brand-identity',
    title: 'Brand Strategy & Identity Design',
    tagline: 'Distinctive visual systems that command premium market pricing.',
    shortDescription: 'Comprehensive identity systems: typography, color hierarchy, brand guidelines, and high-impact collateral.',
    iconName: 'Palette',
    category: 'creative',
    problemsSolved: [
      'Generic branding indistinguishable from low-cost competitors.',
      'Fragmented marketing collateral with no consistent visual guidelines.',
      'Inability to justify premium enterprise pricing due to amateur presentation.'
    ],
    solutions: [
      'Strategic brand positioning isolating your unique commercial advantage.',
      'Complete typography, color system, and asset library for digital and print.',
      'Comprehensive brand guidelines manual for team and partner alignment.'
    ],
    keyBenefits: [
      'Instantly perceived credibility and prestige in international markets.',
      'Consistency across digital ads, website, presentations, and product packaging.',
      'Clear differentiation that supports higher pricing power.'
    ],
    deliverables: [
      'Primary wordmark, secondary marks, and responsive favicons.',
      'Comprehensive design system in Figma with color and typography scales.',
      'Digital ad templates, presentation deck, and stationery kit.',
      '40+ page Brand Identity Bible.'
    ],
    workingProcess: [
      { step: 1, title: 'Brand Archetype Discovery', description: 'Aligning mission, competitive positioning, and target psychology.' },
      { step: 2, title: 'Design Concept Directions', description: 'Presenting 3 distinct visual systems with real-world applications.' },
      { step: 3, title: 'Refinement & Expansion', description: 'Fleshing out iconography, typography pairings, and layout grids.' },
      { step: 4, title: 'Asset Handover & Systemization', description: 'Delivering production SVG, print, and Figma component libraries.' }
    ],
    verifiedMetricsSample: [
      { label: 'Perceived Value Index', value: '+65%', context: 'Customer survey post-rebrand' },
      { label: 'Brand Guidelines Adoption', value: '100%', context: 'Across international marketing teams' }
    ],
    faq: [
      { question: 'What files are provided upon project completion?', answer: 'You receive vector SVG, EPS, PDF, web-ready PNG, and a master Figma design system file with full commercial rights.' }
    ],
    startingPrice: {
      USD: 5000,
      GBP: 3900,
      AED: 18400
    }
  },
  {
    id: 'social-media',
    slug: 'social-media',
    title: 'Social Media Strategy & Management',
    tagline: 'Build an engaged, active community around your brand.',
    shortDescription: 'Data-informed organic content, executive LinkedIn management, community engagement, and viral social formatting.',
    iconName: 'Users',
    category: 'creative',
    problemsSolved: [
      'Dead social channels that look abandoned and hurt brand credibility.',
      'Wasted hours posting generic stock graphics with zero engagement.',
      'Executives who want a visible LinkedIn presence but lack the time.'
    ],
    solutions: [
      'Content planning tailored to algorithms across LinkedIn, X, and Instagram.',
      'Executive thought-leadership ghostwriting for founders and C-suite.',
      'Active community management responding to prospect questions in comments.'
    ],
    keyBenefits: [
      'Active brand presence signaling market leadership to potential partners.',
      'Inbound partnership and press opportunities arriving directly via DMs.',
      'Nurtured audience ready to convert when new offerings launch.'
    ],
    deliverables: [
      'Monthly content calendar with 16-20 bespoke visual and written posts.',
      'Weekly engagement sprints connecting with key industry leaders.',
      'Executive LinkedIn profile optimization.',
      'Monthly sentiment and audience growth analytics report.'
    ],
    workingProcess: [
      { step: 1, title: 'Social Voice Calibration', description: 'Defining tone, themes, and engagement boundaries.' },
      { step: 2, title: 'Editorial Scheduling', description: 'Batch-creating high-value carousels and insightful commentary.' },
      { step: 3, title: 'Community Interaction', description: 'Engaging with relevant industry discussions to amplify reach.' },
      { step: 4, title: 'Performance Analysis', description: 'Optimizing posting times and content formats based on algorithmic reach.' }
    ],
    verifiedMetricsSample: [
      { label: 'Follower Growth Rate', value: '+310%', context: 'In first 6 months of active cadence' },
      { label: 'Inbound Executive Inquiries', value: '18/mo', context: 'Generated directly through LinkedIn' }
    ],
    faq: [
      { question: 'Do you manage comments and direct messages?', answer: 'Yes, we provide community management within defined hours and escalate high-value sales inquiries directly to your team.' }
    ],
    startingPrice: {
      USD: 2400,
      GBP: 1900,
      AED: 8800
    }
  }
];
