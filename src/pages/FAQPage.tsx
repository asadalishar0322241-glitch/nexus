/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, HelpCircle, ArrowRight } from 'lucide-react';
import { Accordion, AccordionItem } from '../components/ui/Accordion';
import { Button } from '../components/ui/Button';
import { GENERAL_FAQS } from '../data/faqs';
import { SEOHead } from '../components/seo/SEOHead';
import { buildFAQSchema, buildBreadcrumbSchema } from '../utils/seoSchemas';

interface FAQPageProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onNavigate, onOpenBooking }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredFaqs = GENERAL_FAQS.filter((faq) => {
    const matchesSearch =
      faq.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat =
      selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const faqSchemaData = buildFAQSchema(
    GENERAL_FAQS.slice(0, 10).map((f) => ({
      question: f.title,
      answer: f.content,
    }))
  );

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'FAQ', path: '/faq' },
  ];

  return (
    <div className="py-12 sm:py-20">
      <SEOHead
        title="Frequently Asked Questions — Digital Marketing & Contracts"
        description="Clear answers regarding agency pricing models, contract terms, SLA response guarantees, tracking infrastructure, and multi-currency billing."
        path="/faq"
        jsonLd={[faqSchemaData, buildBreadcrumbSchema(breadcrumbs)]}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Knowledge Base
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Everything you need to know about our international billing, SLAs, client squad structures, and working processes.
          </p>

          {/* Search bar */}
          <div className="pt-4 max-w-lg mx-auto">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions (e.g. currency, contract, reporting)..."
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-3">
            {['All', 'Billing', 'Engagements', 'Team', 'Reporting', 'Operations'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordions */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
          {filteredFaqs.length > 0 ? (
            <Accordion items={filteredFaqs} defaultOpenId="pricing-currency" />
          ) : (
            <div className="text-center py-10 text-xs text-slate-500">
              No matching questions found for "{searchQuery}". Please reach out to our team directly.
            </div>
          )}
        </div>

        {/* Still have questions? */}
        <div className="bg-slate-50 dark:bg-slate-900/60 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-3">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Have a specific commercial question not covered here?
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Our team is available on live chat, email, or direct consultation calls to answer contract or operational inquiries.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Button variant="outline" onClick={() => onNavigate('/contact')}>
              Contact Agency Team
            </Button>
            <Button onClick={onOpenBooking}>
              Book Direct Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
