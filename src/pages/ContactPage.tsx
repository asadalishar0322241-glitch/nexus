/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { Button } from '../components/ui/Button';
import { SEOHead } from '../components/seo/SEOHead';

interface ContactPageProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate, onOpenBooking }) => {
  const { currency, formatPrice } = useCurrency();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    websiteUrl: '',
    country: 'United States',
    serviceRequired: 'Search Engine Optimization (SEO)',
    estimatedBudget: '$5,000 - $10,000',
    projectDetails: '',
    honeypot: '', // Spam prevention
  });
  const [submissionTs] = useState<number>(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) {
      // Bot detected via honeypot
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // Attempt API submission with security bot shield headers & honeypot
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          _nexus_hp: formData.honeypot,
          _submission_ts: submissionTs,
          preferredCurrency: currency,
          source: 'contact_form',
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const data = await response.json().catch(() => ({}));
        if (data.error) {
          setErrorMessage(data.error);
        } else {
          setIsSubmitted(true);
        }
      }
    } catch {
      // Local fallback
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 sm:py-20">
      <SEOHead
        title="Contact Our Senior Strategy Team — Global Practice Offices"
        description="Initiate high-impact digital marketing engagement with Nexus International. Offices in New York, London, and Dubai with a guaranteed 4-hour response SLA."
        path="/contact"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Initiate Engagement
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mt-2 leading-tight">
            Let's Discuss Your Growth Trajectory
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
            Fill out the form below to connect directly with our regional practice directors in New York, London, or Dubai. Guaranteed reply within 4 business hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Comprehensive Form */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            {isSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 mx-auto bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Inquiry Received
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-slate-900 dark:text-white">{formData.fullName}</span>. Your project brief has been routed to our Senior Growth Director. We will review your website metrics and reply to <span className="font-mono text-xs">{formData.email}</span> within 4 business hours.
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <Button variant="secondary" onClick={() => setIsSubmitted(false)}>
                    Submit Another Inquiry
                  </Button>
                  <Button onClick={onOpenBooking}>
                    Book Live Calendar Slot
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {/* Honeypot hidden field for anti-spam */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="phone_verification_token"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Jonathan Vance"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jonathan@enterprise.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 019-2834"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Company / Brand Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="Apex Global Ltd"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Website URL
                    </label>
                    <input
                      type="url"
                      value={formData.websiteUrl}
                      onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                      placeholder="https://company.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Target Market / Country *
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                    >
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United Arab Emirates">United Arab Emirates & GCC</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Singapore">Singapore</option>
                      <option value="European Union">European Union</option>
                      <option value="Worldwide">Worldwide / International</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Service Required *
                    </label>
                    <select
                      value={formData.serviceRequired}
                      onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                    >
                      <option value="Search Engine Optimization (SEO)">Search Engine Optimization (SEO)</option>
                      <option value="Google Ads & Performance PPC">Google Ads & Performance PPC</option>
                      <option value="Meta & Social Advertising">Meta & Social Advertising</option>
                      <option value="Web Design & CRO Engineering">Web Design & CRO Engineering</option>
                      <option value="E-Commerce Omnichannel Growth">E-Commerce Omnichannel Growth</option>
                      <option value="Email Lifecycle Marketing">Email Lifecycle Marketing</option>
                      <option value="Brand Strategy & Identity">Brand Strategy & Identity</option>
                      <option value="Full-Funnel Growth Pod (Omnichannel)">Full-Funnel Growth Pod (Omnichannel)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Estimated Monthly Budget ({currency}) *
                    </label>
                    <select
                      value={formData.estimatedBudget}
                      onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                    >
                      <option value="Starter Tier">$3,000 - $5,000 / month (or local equivalent)</option>
                      <option value="Growth Tier">$5,000 - $10,000 / month</option>
                      <option value="Enterprise Tier">$10,000 - $25,000 / month</option>
                      <option value="Scale Tier">$25,000+ / month</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Project Goals & Current Bottlenecks *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.projectDetails}
                    onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                    placeholder="Tell us about your current CAC, traffic volume, timeline, and primary growth milestones..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <Button type="submit" isLoading={isSubmitting} size="lg" className="w-full">
                    Submit Business Brief
                  </Button>
                </div>

                <p className="text-[11px] text-center text-slate-400">
                  🔒 Strictly confidential. Non-disclosure protected.
                </p>
              </form>
            )}
          </div>

          {/* Right Column: Global Office Coordinates */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
              <h3 className="text-lg font-bold text-white">
                Global Operations Hubs
              </h3>

              <div className="space-y-4 text-xs">
                <div className="pb-4 border-b border-slate-800 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-slate-200 text-sm">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span>New York (Americas HQ)</span>
                  </div>
                  <p className="text-slate-400">One World Trade Center, Suite 8500, New York, NY</p>
                  <p className="text-blue-400 font-mono">+1 (800) 555-0199</p>
                </div>

                <div className="pb-4 border-b border-slate-800 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-slate-200 text-sm">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span>London (Europe HQ)</span>
                  </div>
                  <p className="text-slate-400">30 St Mary Axe (The Gherkin), 28th Floor, London</p>
                  <p className="text-blue-400 font-mono">+44 20 7946 0991</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-bold text-slate-200 text-sm">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span>Dubai (MENA & GCC HQ)</span>
                  </div>
                  <p className="text-slate-400">DIFC Gate Precinct 4, Level 5, Downtown Dubai</p>
                  <p className="text-blue-400 font-mono">+971 4 312 9000</p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="p-6 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
                <MessageSquare className="w-4 h-4" />
                <span>Instant WhatsApp Concierge</span>
              </div>
              <p className="text-xs text-emerald-700 dark:text-emerald-400 leading-relaxed">
                Need urgent media buying or campaign turnaround? Chat directly with our senior agency hotline on WhatsApp.
              </p>
              <a
                href="https://wa.me/442079460991?text=Hello%20Nexus%20team%2C%20I%20have%20an%20urgent%20marketing%20inquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 hover:underline pt-1"
              >
                <span>Launch WhatsApp Chat</span> <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
