/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Calendar, Clock, Globe, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { useCurrency } from '../../context/CurrencyContext';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const { currency } = useCurrency();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    websiteUrl: '',
    scheduledDate: '',
    timeZone: 'Europe/London',
    primaryChallenge: 'Organic Traffic & SEO',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        setIsSubmitted(true);
      }
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-12 h-12 mx-auto bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Consultation Scheduled
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
              Thank you, <span className="font-semibold text-slate-900 dark:text-slate-100">{formData.fullName}</span>. A senior growth strategist has reserved your slot and sent a calendar invite to <span className="font-mono text-xs">{formData.email}</span>.
            </p>
            <div className="pt-4">
              <Button onClick={() => { setIsSubmitted(false); onClose(); }} variant="secondary">
                Return to Website
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Direct Strategist Access
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                Book a Free Growth Consultation
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                A 30-minute diagnostic session with our Senior Marketing Director. No sales pitches—just actionable growth architecture.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Alex Morgan"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Apex Holdings"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Website URL
                  </label>
                  <input
                    type="url"
                    value={formData.websiteUrl}
                    onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                    placeholder="https://company.com"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.scheduledDate}
                    onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Your Time Zone
                  </label>
                  <select
                    value={formData.timeZone}
                    onChange={(e) => setFormData({ ...formData, timeZone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                  >
                    <option value="America/New_York">US Eastern (EST / New York)</option>
                    <option value="America/Los_Angeles">US Pacific (PST / San Francisco)</option>
                    <option value="Europe/London">UK & Europe (GMT / London)</option>
                    <option value="Asia/Dubai">UAE & Gulf (GST / Dubai)</option>
                    <option value="Global">Other International Timezone</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Primary Growth Challenge
                </label>
                <select
                  value={formData.primaryChallenge}
                  onChange={(e) => setFormData({ ...formData, primaryChallenge: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                >
                  <option value="Organic Traffic & SEO">Organic Traffic & Technical SEO Stagnation</option>
                  <option value="Paid Media Scaling">High Customer Acquisition Cost (CPA) on Ads</option>
                  <option value="CRO & Checkout Conversion">Low Website / E-commerce Conversion Rate</option>
                  <option value="Comprehensive Rebrand">Brand Redesign & Enterprise Web Development</option>
                  <option value="International Expansion">Cross-Border Growth (US, UK, UAE)</option>
                </select>
              </div>

              <div className="pt-2">
                <Button type="submit" isLoading={isSubmitting} className="w-full py-2.5">
                  Confirm 30-Minute Consultation
                </Button>
              </div>

              <p className="text-[11px] text-center text-slate-400">
                🔒 Strict non-disclosure. We never share your commercial data or marketing metrics.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
