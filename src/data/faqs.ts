/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AccordionItem } from '../components/ui/Accordion';

export const GENERAL_FAQS: AccordionItem[] = [
  {
    id: 'pricing-currency',
    title: 'How does billing work across different countries and currencies?',
    content: 'We support international billing in USD ($), GBP (£), and AED (د.إ). All contracts specify clear deliverables with no hidden retainers. Invoices can be processed via international wire transfer, credit card, or corporate ACH.',
    category: 'Billing'
  },
  {
    id: 'contract-length',
    title: 'What is your minimum contract term?',
    content: 'Our initial engagement term is typically 3 to 6 months. This allows adequate time for algorithmic learning in paid media and technical indexing in SEO to compound and deliver measurable ROI. Following the initial period, agreements transition to flexible month-to-month terms.',
    category: 'Engagements'
  },
  {
    id: 'dedicated-team',
    title: 'Who will manage my account day-to-day?',
    content: 'Every client is paired with a dedicated Growth Squad: a Senior Strategist as your primary point of contact, supported by a Technical Media Buyer/SEO Engineer and a Direct-Response Creative Designer. You have direct access via dedicated Slack or Microsoft Teams channels.',
    category: 'Team'
  },
  {
    id: 'reporting-frequency',
    title: 'How do you track and report on campaign performance?',
    content: 'You receive 24/7 access to a custom real-time Looker Studio dashboard connected to your Google Analytics 4, ad accounts, and CRM. In addition, we conduct weekly sprint check-ins and formal monthly strategic reviews comparing performance against pipeline benchmarks.',
    category: 'Reporting'
  },
  {
    id: 'guarantees-metrics',
    title: 'Do you offer revenue or ranking guarantees?',
    content: 'Ethical agencies cannot guarantee specific Google algorithmic rankings or third-party ad auction outcomes. What we do guarantee is complete transparency, rigorous scientific experimentation, strict adherence to agreed deliverables, and daily optimization by senior specialists.',
    category: 'Guarantees'
  },
  {
    id: 'timezones',
    title: 'How do you coordinate across US, UK, and UAE time zones?',
    content: 'Our distributed squads maintain dedicated coverage hubs in New York (EST), London (GMT), and Dubai (GST). Meetings and reviews are scheduled within your regional business hours, and urgent support is covered across overlapping time windows.',
    category: 'Operations'
  }
];
