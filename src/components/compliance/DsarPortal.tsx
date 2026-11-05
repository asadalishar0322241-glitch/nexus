/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ShieldCheck,
  FileText,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
  Copy,
  Lock,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { DsarRequestType } from '../../types';

export const DsarPortal: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'submit' | 'status'>('submit');

  // Submit Form State
  const [requestType, setRequestType] = useState<DsarRequestType>('access_export');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [country, setCountry] = useState('United States');
  const [details, setDetails] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Bot shield honeypot
  const [submissionTs] = useState<number>(Date.now()); // Bot shield timestamp
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<{
    ticketId: string;
    message: string;
  } | null>(null);
  const [submitError, setSubmitError] = useState('');
  const [copiedTicket, setCopiedTicket] = useState(false);

  // Status Lookup State
  const [lookupTicket, setLookupTicket] = useState('');
  const [lookupEmail, setLookupEmail] = useState('');
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [lookupResult, setLookupResult] = useState<any | null>(null);
  const [lookupError, setLookupError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch('/api/compliance/dsar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestType,
          fullName,
          email,
          companyName,
          country,
          details,
          _nexus_hp: honeypot,
          _submission_ts: submissionTs,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to lodge DSAR request.');
      }

      setSubmitSuccess({
        ticketId: data.ticketId,
        message: data.message,
      });
      // Reset form fields
      setFullName('');
      setEmail('');
      setCompanyName('');
      setDetails('');
    } catch (err: any) {
      setSubmitError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLookingUp(true);
    setLookupError('');
    setLookupResult(null);

    try {
      const query = new URLSearchParams({
        ticket: lookupTicket.trim(),
        email: lookupEmail.trim(),
      });
      const res = await fetch(`/api/compliance/dsar/status?${query.toString()}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'No matching request found.');
      }

      setLookupResult(data.request);
    } catch (err: any) {
      setLookupError(err.message || 'Failed to locate request record.');
    } finally {
      setIsLookingUp(false);
    }
  };

  const copyTicketId = (ticket: string) => {
    navigator.clipboard.writeText(ticket);
    setCopiedTicket(true);
    setTimeout(() => setCopiedTicket(false), 2000);
  };

  const triggerCookiePreferences = () => {
    window.dispatchEvent(new CustomEvent('nexus:open-cookie-settings'));
  };

  return (
    <div className="space-y-8">
      {/* Privacy Rights Overview Card */}
      <div className="bg-gradient-to-r from-blue-900/10 via-indigo-900/10 to-slate-900/10 dark:from-blue-950/40 dark:via-indigo-950/30 dark:to-slate-900/50 p-6 sm:p-8 rounded-2xl border border-blue-500/20 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-600 text-white shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Global Privacy Rights & DSAR Portal
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                EU GDPR (Articles 15–22), UK GDPR, and California Consumer Privacy Act (CCPA) compliance gateway.
              </p>
            </div>
          </div>
          <button
            onClick={triggerCookiePreferences}
            className="px-4 py-2 bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold rounded-xl border border-slate-700 transition-colors shrink-0 self-start sm:self-auto"
          >
            Manage Cookie Preferences
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-3 bg-white/60 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-slate-900 dark:text-white text-xs block">Right of Access</span>
            <span className="text-[11px] text-slate-500">Request a full machine-readable JSON package of your stored commercial records.</span>
          </div>
          <div className="p-3 bg-white/60 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-slate-900 dark:text-white text-xs block">Right to be Forgotten</span>
            <span className="text-[11px] text-slate-500">Permanently scrub or anonymize inquiries, bookings, and contact details.</span>
          </div>
          <div className="p-3 bg-white/60 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-slate-900 dark:text-white text-xs block">CCPA Do Not Sell</span>
            <span className="text-[11px] text-slate-500">Universal opt-out from advertising attribution and analytical pixels.</span>
          </div>
        </div>
      </div>

      {/* Tabs: Submit vs Track */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6">
        <button
          onClick={() => setActiveMode('submit')}
          className={`pb-3 text-sm font-semibold transition-colors border-b-2 ${
            activeMode === 'submit'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Lodge New Privacy Request
        </button>
        <button
          onClick={() => setActiveMode('status')}
          className={`pb-3 text-sm font-semibold transition-colors border-b-2 flex items-center gap-2 ${
            activeMode === 'status'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <span>Track Ticket Status</span>
          <Search className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Mode 1: Submit Form */}
      {activeMode === 'submit' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
          {submitSuccess ? (
            <div className="p-6 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/30 rounded-2xl space-y-4">
              <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-6 h-6 shrink-0" />
                <h3 className="text-base font-bold text-emerald-900 dark:text-emerald-200">
                  Data Subject Access Request Lodged Successfully
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {submitSuccess.message}
              </p>

              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] text-slate-500 block uppercase font-mono tracking-wider">
                    Official Reference Ticket ID
                  </span>
                  <span className="text-base font-bold font-mono text-blue-600 dark:text-blue-400">
                    {submitSuccess.ticketId}
                  </span>
                </div>
                <button
                  onClick={() => copyTicketId(submitSuccess.ticketId)}
                  className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedTicket ? 'Copied' : 'Copy ID'}</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setLookupTicket(submitSuccess.ticketId);
                    setActiveMode('status');
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition-colors"
                >
                  Track This Request Now
                </button>
                <button
                  onClick={() => setSubmitSuccess(null)}
                  className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-300 hover:bg-slate-300 rounded-xl text-xs font-semibold transition-colors"
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {submitError && (
                <div className="p-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-500/30 rounded-xl text-xs text-rose-600 dark:text-rose-400 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Bot Shield Honeypot (hidden from human visitors) */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <label htmlFor="_nexus_hp">Do not fill this field</label>
                <input
                  type="text"
                  id="_nexus_hp"
                  name="_nexus_hp"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Statutory Request Category *
                  </label>
                  <select
                    value={requestType}
                    onChange={(e) => setRequestType(e.target.value as DsarRequestType)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    required
                  >
                    <option value="access_export">Right of Access & Machine-Readable Export (GDPR Art. 15 / CCPA)</option>
                    <option value="erasure_deletion">Right to Erasure / "Right to be Forgotten" (GDPR Art. 17)</option>
                    <option value="rectification">Right to Rectification & Correction of Records (GDPR Art. 16)</option>
                    <option value="opt_out_sale">Opt-Out of Data Sale & Cross-Context Behavioral Ads (CCPA)</option>
                    <option value="restriction">Restriction of Automated Commercial Processing (GDPR Art. 18)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Marcus Vance"
                    required
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Subject Business / Personal Email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="marcus@company.com"
                    required
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Company / Organization (Optional)
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Vanguard Holdings Ltd"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Jurisdiction / Country *
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="United Kingdom">United Kingdom (UK GDPR / DPA 2018)</option>
                    <option value="European Union">European Union (EU GDPR)</option>
                    <option value="United States (California)">United States (California CCPA / CPRA)</option>
                    <option value="United States (Other)">United States (Other States)</option>
                    <option value="United Arab Emirates">United Arab Emirates (UAE Data Protection)</option>
                    <option value="Other International">Other International</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Specific Details / Requested Scope
                  </label>
                  <textarea
                    rows={3}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Provide any relevant context, such as prior consultation booking dates, specific website audits, or newsletter email addresses."
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-blue-500" />
                  <span>Submissions are encrypted via TLS 1.3 and audited by our Data Protection Officer.</span>
                </span>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Lodging Request...
                    </span>
                  ) : (
                    'Submit Statutory DSAR'
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Mode 2: Status Lookup */}
      {activeMode === 'status' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
          <form onSubmit={handleLookup} className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Lookup Existing Request Status
            </h3>
            <p className="text-xs text-slate-500">
              Enter the Ticket Reference ID generated during submission along with your registered email address.
            </p>

            {lookupError && (
              <div className="p-3 bg-rose-50 dark:bg-rose-950/30 border border-rose-500/30 rounded-xl text-xs text-rose-600 dark:text-rose-400">
                {lookupError}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Ticket Reference ID *
                </label>
                <input
                  type="text"
                  value={lookupTicket}
                  onChange={(e) => setLookupTicket(e.target.value)}
                  placeholder="e.g. DSAR-2026-8819"
                  required
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Associated Email *
                </label>
                <input
                  type="email"
                  value={lookupEmail}
                  onChange={(e) => setLookupEmail(e.target.value)}
                  placeholder="marcus@company.com"
                  required
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLookingUp}
              className="px-5 py-2 text-xs font-bold"
            >
              {isLookingUp ? 'Verifying with Registry...' : 'Search Ticket Status'}
            </Button>
          </form>

          {/* Results display */}
          {lookupResult && (
            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-in fade-in duration-200">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-700 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">
                    Ticket Reference
                  </span>
                  <span className="text-sm font-bold font-mono text-blue-600 dark:text-blue-400">
                    {lookupResult.id}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase text-slate-400">Current Status:</span>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      lookupResult.status === 'Fulfilled'
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30'
                        : lookupResult.status === 'Rejected'
                        ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-500/30'
                        : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {lookupResult.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block">Category:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {lookupResult.requestType.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Date Lodged:</span>
                  <span className="font-mono text-slate-800 dark:text-slate-200">
                    {new Date(lookupResult.createdAt).toLocaleString()}
                  </span>
                </div>
                {lookupResult.resolvedAt && (
                  <div>
                    <span className="text-slate-400 block">Date Resolved:</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400">
                      {new Date(lookupResult.resolvedAt).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              {lookupResult.resolutionNotes && (
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Resolution Findings & Actions:
                  </span>
                  <p className="text-slate-600 dark:text-slate-400">
                    {lookupResult.resolutionNotes}
                  </p>
                </div>
              )}

              {/* Download Export if Fulfilled & access_export */}
              {lookupResult.status === 'Fulfilled' && (
                <div className="pt-2">
                  <a
                    href={`/api/compliance/dsar/export?ticket=${encodeURIComponent(
                      lookupResult.id
                    )}&email=${encodeURIComponent(lookupEmail)}`}
                    download
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Machine-Readable GDPR Package (.json)</span>
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
