/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, FileText, Cookie, ArrowLeft, Settings } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SEOHead } from '../components/seo/SEOHead';
import { DsarPortal } from '../components/compliance/DsarPortal';

interface LegalPageProps {
  initialTab?: 'privacy' | 'terms' | 'cookies' | 'dsar';
  onNavigate: (path: string) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ initialTab = 'privacy', onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'cookies' | 'dsar'>(initialTab);

  const metaTitle =
    activeTab === 'privacy'
      ? 'Privacy Policy & Data Protection (GDPR / CCPA)'
      : activeTab === 'terms'
      ? 'Client Service Terms & Agreement'
      : activeTab === 'cookies'
      ? 'Cookie Policy & Consent Settings'
      : 'GDPR / CCPA Data Subject Access Rights (DSAR) Portal';

  const triggerCookiePreferences = () => {
    window.dispatchEvent(new CustomEvent('nexus:open-cookie-settings'));
  };

  return (
    <div className="py-12 sm:py-20">
      <SEOHead
        title={metaTitle}
        description="Review Nexus International Digital Marketing Agency's Privacy Policy, Master Client Service Agreement, Cookie Usage, and Data Subject Access Request (DSAR) portal."
        path={`/${activeTab === 'privacy' ? 'privacy-policy' : activeTab === 'terms' ? 'terms' : activeTab === 'cookies' ? 'cookies' : 'dsar'}`}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div>
          <button
            onClick={() => onNavigate('/')}
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white inline-flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Homepage
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap border-b border-slate-200 dark:border-slate-800 gap-4 sm:gap-8">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`pb-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 ${
              activeTab === 'privacy'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`pb-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 ${
              activeTab === 'terms'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Terms & Conditions
          </button>
          <button
            onClick={() => setActiveTab('cookies')}
            className={`pb-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 ${
              activeTab === 'cookies'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Cookie Policy
          </button>
          <button
            onClick={() => setActiveTab('dsar')}
            className={`pb-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'dsar'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>DSAR / Privacy Rights Portal</span>
          </button>
        </div>

        {/* Tab 1: Privacy Policy */}
        {activeTab === 'privacy' && (
          <div className="space-y-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Global Privacy Policy (GDPR / UK GDPR / CCPA)
            </h1>
            <p className="text-slate-400 text-xs">
              Last Updated: November 2026 · Nexus International Digital Agency
            </p>

            <h3 className="text-base font-bold text-slate-900 dark:text-white pt-2">
              1. Information We Collect
            </h3>
            <p>
              When you submit a contact inquiry, request a marketing audit, or schedule a consultation, we collect personal identifying information including your full name, business email address, phone number, company name, website URL, and estimated budget.
            </p>

            <h3 className="text-base font-bold text-slate-900 dark:text-white pt-2">
              2. How We Use Your Data
            </h3>
            <p>
              We process your data strictly to fulfill consulting requests, analyze client website performance, prepare marketing proposals, and communicate regarding strategic engagements. We never sell, rent, or trade your commercial data to third parties.
            </p>

            <h3 className="text-base font-bold text-slate-900 dark:text-white pt-2">
              3. Data Retention and Security
            </h3>
            <p>
              All customer data is encrypted in transit via TLS 1.3 and stored in secured cloud environments adhering to SOC 2 Type II and ISO 27001 standards. Access is restricted exclusively to authorized agency partners.
            </p>

            <h3 className="text-base font-bold text-slate-900 dark:text-white pt-2">
              4. International Transfers & Data Subject Rights
            </h3>
            <p>
              Under the GDPR, UK GDPR, and California CCPA/CPRA, you have the right to request access, machine-readable portability, rectification, or deletion of your personal data at any time without commercial retaliation.
            </p>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl flex items-center justify-between gap-4">
              <span className="text-xs text-slate-600 dark:text-slate-300">
                Exercise your statutory data privacy rights or submit an erasure request directly via our self-serve DSAR portal:
              </span>
              <button
                onClick={() => setActiveTab('dsar')}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shrink-0"
              >
                Open DSAR Portal
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Terms of Service */}
        {activeTab === 'terms' && (
          <div className="space-y-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Terms & Conditions (Master Service Agreement Template)
            </h1>
            <p className="text-slate-400 text-xs">
              Last Updated: November 2026 · Nexus International Digital Agency
            </p>

            <h3 className="text-base font-bold text-slate-900 dark:text-white pt-2">
              1. Scope of Engagement
            </h3>
            <p>
              Nexus agrees to perform the digital marketing, SEO, paid media, or engineering deliverables specified in the agreed client Statement of Work (SOW). All deliverables are governed by industry-standard reasonable care and skill.
            </p>

            <h3 className="text-base font-bold text-slate-900 dark:text-white pt-2">
              2. Intellectual Property & Asset Ownership
            </h3>
            <p>
              Upon receipt of full payment for agreed invoices, the client retains 100% full commercial ownership of all custom ad creatives, written copy, website code, and tracking architectures developed during the engagement.
            </p>

            <h3 className="text-base font-bold text-slate-900 dark:text-white pt-2">
              3. Payment Terms & Currencies
            </h3>
            <p>
              Monthly retainer fees are invoiced in the client's selected currency (USD, GBP, or AED) on the 1st of each calendar month. Payments are due within 14 days of invoice issuance.
            </p>

            <h3 className="text-base font-bold text-slate-900 dark:text-white pt-2">
              4. Confidentiality & Non-Disclosure
            </h3>
            <p>
              Both parties agree to hold all commercial metrics, customer lists, profit margins, and proprietary campaign architectures in strict confidence.
            </p>
          </div>
        )}

        {/* Tab 3: Cookie Policy */}
        {activeTab === 'cookies' && (
          <div className="space-y-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Cookie Policy & Consent Management
                </h1>
                <p className="text-slate-400 text-xs mt-1">
                  Last Updated: November 2026 · Nexus International Digital Agency
                </p>
              </div>
              <button
                onClick={triggerCookiePreferences}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto transition-colors shadow-sm"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Adjust Cookie Preferences</span>
              </button>
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-white pt-2">
              1. What Are Cookies?
            </h3>
            <p>
              Cookies are small text files stored on your device that enable websites to remember user preferences, maintain session state, and understand traffic patterns.
            </p>

            <h3 className="text-base font-bold text-slate-900 dark:text-white pt-2">
              2. Categories of Cookies We Use
            </h3>
            <div className="space-y-3">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">Strictly Necessary Cookies</span>
                  <span className="text-[10px] font-mono uppercase bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                    Required
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Essential for site security, currency selection, CSRF bot protection, and admin authentication. Cannot be disabled.
                </p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-1">
                <span className="font-bold text-slate-900 dark:text-white block">Analytics Cookies (GA4)</span>
                <p className="text-xs text-slate-500">Help us measure visitor counts, bounce rates, and traffic sources anonymously.</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-1">
                <span className="font-bold text-slate-900 dark:text-white block">Marketing & Conversion Cookies</span>
                <p className="text-xs text-slate-500">Enable attribution measurement across Google Ads, LinkedIn, and Meta campaigns.</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Interactive DSAR Portal */}
        {activeTab === 'dsar' && <DsarPortal />}
      </div>
    </div>
  );
};
