/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, CheckCircle2, ShieldCheck, ArrowRight, Zap, AlertTriangle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SEOHead } from '../components/seo/SEOHead';

interface AuditRequestPageProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const AuditRequestPage: React.FC<AuditRequestPageProps> = ({ onNavigate, onOpenBooking }) => {
  const [formData, setFormData] = useState({
    websiteUrl: '',
    companyName: '',
    contactEmail: '',
    monthlyRevenueEstimate: '$20k - $50k',
    primaryGoal: 'Conversions',
    competitorUrl: '',
  });
  const [honeypot, setHoneypot] = useState('');
  const [submissionTs] = useState<number>(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Silent reject for bots

    setIsSubmitting(true);
    try {
      await fetch('/api/audits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          _nexus_hp: honeypot,
          _submission_ts: submissionTs,
        }),
      });
      setIsSubmitted(true);
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 sm:py-20">
      <SEOHead
        title="Claim Your Free 60-Second Digital Marketing & SEO Audit"
        description="Receive a rigorous, analyst-led audit of your website's organic SEO rankability, speed metrics, conversion friction, and paid ad efficiency within 48 hours."
        path="/audit"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Diagnostic Forensics
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
            Request a Free Growth & Technical Audit
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Submit your domain for a comprehensive, human-led teardown of your SEO crawlability, conversion leaks, and paid media efficiency. Delivered within 48 hours.
          </p>
        </div>

        {isSubmitted ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-sm">
            <div className="w-14 h-14 mx-auto bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Audit Queued for Technical Inspection
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              Our engineering and performance media directors are analyzing <span className="font-semibold text-slate-900 dark:text-white">{formData.websiteUrl}</span>. We will compile the forensic audit and deliver the executive video walkthrough to <span className="font-mono text-xs text-blue-600">{formData.contactEmail}</span> within 48 hours.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <Button onClick={() => onNavigate('/')}>
                Return to Homepage
              </Button>
              <Button variant="outline" onClick={onOpenBooking}>
                Fast-Track Consultation
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-6 border-b border-slate-100 dark:border-slate-800 text-xs">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-1">
                <span className="font-bold text-slate-900 dark:text-white block">1. Technical SEO</span>
                <p className="text-slate-500">Core Web Vitals, indexability, JavaScript rendering, and hreflang errors.</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-1">
                <span className="font-bold text-slate-900 dark:text-white block">2. CRO & UX Leaks</span>
                <p className="text-slate-500">Form friction, mobile checkout drop-offs, and micro-copy barriers.</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-1">
                <span className="font-bold text-slate-900 dark:text-white block">3. Media Economics</span>
                <p className="text-slate-500">Query waste, negative keyword gaps, and tracking signal quality.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Bot Shield Honeypot */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <input
                  type="text"
                  name="_nexus_hp"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Target Website URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.websiteUrl}
                    onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                    placeholder="https://yourbrand.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Your Brand Ltd"
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Work Email (For Audit Delivery) *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    placeholder="founder@yourbrand.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Primary Goal to Diagnose *
                  </label>
                  <select
                    value={formData.primaryGoal}
                    onChange={(e) => setFormData({ ...formData, primaryGoal: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                  >
                    <option value="Conversions">On-Site Conversion & Checkout Uplift (CRO)</option>
                    <option value="Traffic">Organic Search Visibility & Technical SEO</option>
                    <option value="ROAS">Paid Media Efficiency & CAC Reduction</option>
                    <option value="Rebranding">Brand Positioning & Enterprise Modernization</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Approximate Monthly Revenue Tier
                  </label>
                  <select
                    value={formData.monthlyRevenueEstimate}
                    onChange={(e) => setFormData({ ...formData, monthlyRevenueEstimate: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                  >
                    <option value="Under $20k">Pre-Revenue / Under $20,000 / month</option>
                    <option value="$20k - $50k">$20,000 - $50,000 / month</option>
                    <option value="$50k - $200k">$50,000 - $200,000 / month</option>
                    <option value="$200k+">$200,000+ / month (Mid-Market / Enterprise)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Primary Rival / Competitor URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={formData.competitorUrl}
                    onChange={(e) => setFormData({ ...formData, competitorUrl: e.target.value })}
                    placeholder="https://rival.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button type="submit" isLoading={isSubmitting} size="lg" className="w-full">
                  Generate My 48-Hour Forensic Audit
                </Button>
              </div>

              <p className="text-[11px] text-center text-slate-400">
                🔒 100% human-compiled by senior directors. We do not generate generic automated PDF scans.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
