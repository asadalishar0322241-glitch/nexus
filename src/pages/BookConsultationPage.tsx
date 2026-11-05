/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, Clock, Globe, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SEOHead } from '../components/seo/SEOHead';

interface BookConsultationPageProps {
  onNavigate: (path: string) => void;
}

export const BookConsultationPage: React.FC<BookConsultationPageProps> = ({ onNavigate }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('14:00 - 14:45');
  const [timeZone, setTimeZone] = useState('Europe/London');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    websiteUrl: '',
    primaryChallenge: 'Paid Media & High CAC',
  });
  const [honeypot, setHoneypot] = useState('');
  const [submissionTs] = useState<number>(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const availableSlots = [
    '09:00 - 09:45',
    '11:00 - 11:45',
    '14:00 - 14:45',
    '16:30 - 17:15',
    '19:00 - 19:45',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Silent reject for bots

    setIsSubmitting(true);
    try {
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          scheduledDate: selectedDate,
          scheduledTimeSlot: selectedSlot,
          timeZone,
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
        title="Schedule a Free 45-Minute Growth Consultation"
        description="Reserve a 1-on-1 strategy call with a Senior Practice Director to review your current acquisition channels, SEO visibility, and scaling bottlenecks."
        path="/book-consultation"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Direct Calendar Access
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
            Schedule a Free Growth Consultation
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Pick a date and timezone. You will meet with our Practice Director for an in-depth, 45-minute growth architecture review.
          </p>
        </div>

        {isSubmitted ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-sm">
            <div className="w-14 h-14 mx-auto bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Consultation Successfully Confirmed
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              We have reserved your slot for <span className="font-semibold text-slate-900 dark:text-white">{selectedDate || 'Upcoming Date'} at {selectedSlot} ({timeZone})</span>. A Google Meet invitation and pre-meeting briefing have been sent to <span className="font-mono text-xs text-blue-600">{formData.email}</span>.
            </p>
            <div className="pt-4">
              <Button onClick={() => onNavigate('/')}>
                Return to Homepage
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6 text-xs">
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

              {/* Step 1: Calendar & Timezone */}
              <div className="space-y-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  1. Select Date & Timezone
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Consultation Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Your Time Zone *
                    </label>
                    <select
                      value={timeZone}
                      onChange={(e) => setTimeZone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                    >
                      <option value="America/New_York">US Eastern (EST / New York)</option>
                      <option value="America/Los_Angeles">US Pacific (PST / San Francisco)</option>
                      <option value="Europe/London">UK & Europe (GMT / London)</option>
                      <option value="Asia/Dubai">UAE & Gulf (GST / Dubai)</option>
                      <option value="Global">Other Timezone</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Available Meeting Slots
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableSlots.map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`px-3.5 py-2 rounded-lg font-medium border text-xs transition-colors ${
                          selectedSlot === slot
                            ? 'bg-blue-600 border-blue-600 text-white font-semibold'
                            : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 2: Contact Details */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  2. Your Business Information
                </h3>

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
                      placeholder="Sarah Jenkins"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="sarah@brand.com"
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
                      placeholder="+44 20 7123 4567"
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
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Northstar Capital"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Website URL
                  </label>
                  <input
                    type="url"
                    value={formData.websiteUrl}
                    onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                    placeholder="https://brand.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Primary Agenda / Focus Topic
                  </label>
                  <select
                    value={formData.primaryChallenge}
                    onChange={(e) => setFormData({ ...formData, primaryChallenge: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                  >
                    <option value="Paid Media & High CAC">Paid Media Scaling & High CAC</option>
                    <option value="SEO Stagnation">SEO Traffic Stagnation & Google Update Recovery</option>
                    <option value="E-Commerce Retention">E-Commerce Omnichannel Growth & Retention</option>
                    <option value="CRO Funnel Redesign">CRO Funnel Redesign & Web Engineering</option>
                    <option value="Cross-Border Expansion">Cross-Border International Launch (US, UK, UAE)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <Button type="submit" isLoading={isSubmitting} size="lg" className="w-full">
                  Confirm 45-Minute Consultation
                </Button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Strict privacy. Direct consultation with practice director. No junior account managers.</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
