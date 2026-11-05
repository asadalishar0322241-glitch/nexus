/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Layers,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  MessageSquare,
  Send,
  Calendar,
  Sparkles,
  Download,
  ShieldCheck,
  TrendingUp,
  User,
  PlusCircle,
  Check,
  RotateCcw
} from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

interface ClientPortalPageProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const ClientPortalPage: React.FC<ClientPortalPageProps> = ({ onNavigate, onOpenBooking }) => {
  const [identifierInput, setIdentifierInput] = useState('');
  const [activeProject, setActiveProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'sprints' | 'deliverables' | 'squad' | 'scope' | 'activity'>('sprints');

  // Deliverable review action state
  const [selectedDeliverable, setSelectedDeliverable] = useState<any>(null);
  const [feedbackNote, setFeedbackNote] = useState('');
  const [isUpdatingDeliverable, setIsUpdatingDeliverable] = useState(false);

  // Scope Expansion state
  const [scopeForm, setScopeForm] = useState({
    newChannel: 'Meta Ads Retargeting & UGC Scaling',
    additionalBudget: '$5,000 / mo',
    notes: '',
  });
  const [isSubmittingScope, setIsSubmittingScope] = useState(false);
  const [scopeSuccess, setScopeSuccess] = useState(false);

  // Auto-login to default demo project if first load
  useEffect(() => {
    fetchProject('NX-US-104');
  }, []);

  const fetchProject = async (idOrEmail: string) => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch(`/api/portal/projects/${encodeURIComponent(idOrEmail)}`);
      const data = await res.json();
      if (res.ok && data.project) {
        setActiveProject(data.project);
        setIdentifierInput(data.project.id);
      } else {
        setErrorMsg(data.error || 'Project not found. Please try a demo account.');
      }
    } catch {
      setErrorMsg('Failed to connect to Client Portal service. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifierInput.trim()) return;
    fetchProject(identifierInput.trim());
  };

  const handleDeliverableStatusUpdate = async (status: 'Approved' | 'Revision Requested') => {
    if (!activeProject || !selectedDeliverable) return;
    setIsUpdatingDeliverable(true);
    try {
      const res = await fetch(
        `/api/portal/projects/${activeProject.id}/deliverables/${selectedDeliverable.id}/feedback`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status, note: feedbackNote }),
        }
      );
      const data = await res.json();
      if (res.ok && data.project) {
        setActiveProject(data.project);
        setSelectedDeliverable(null);
        setFeedbackNote('');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsUpdatingDeliverable(false);
    }
  };

  const handleScopeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeProject) return;
    setIsSubmittingScope(true);
    try {
      const res = await fetch(`/api/portal/projects/${activeProject.id}/scope-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(scopeForm),
      });
      const data = await res.json();
      if (res.ok && data.project) {
        setActiveProject(data.project);
        setScopeSuccess(true);
        setTimeout(() => setScopeSuccess(false), 4000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmittingScope(false);
    }
  };

  return (
    <div className="py-12 sm:py-20">
      <SEOHead
        title="Enterprise Client Portal & Sprint Delivery Hub"
        description="Real-time marketing campaign dashboard for Nexus clients: live blended ROAS tracking, sprint deliverables, file sign-offs, and dedicated senior strategist access."
        path="/portal"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Header & Demo Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Nexus Private Client Portal</span>
              <span aria-hidden="true">·</span>
              <span>Encrypted Retainer Workspace</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Client Operations & Campaign Dashboard
            </h1>
            <p className="text-xs text-slate-500 max-w-xl">
              Inspect active delivery sprints, verify real-time performance milestones, review strategic files, and communicate directly with your dedicated Senior Squad.
            </p>
          </div>

          {/* Quick Demo Account Selector */}
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-xl space-y-2 shrink-0">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Quick Switch Demo Accounts:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'NX-US-104', label: 'Aetheria Luxury (UK · £)' },
                { id: 'NX-UAE-208', label: 'GulfTech (UAE · AED)' },
                { id: 'NX-US-315', label: 'Vanguard MedTech (US · $)' },
              ].map(demo => (
                <button
                  key={demo.id}
                  onClick={() => fetchProject(demo.id)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                    activeProject?.id === demo.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {demo.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Search / Login Form */}
        <form onSubmit={handleLookup} className="flex gap-2 max-w-md">
          <input
            type="text"
            placeholder="Enter Project ID (e.g. NX-US-104) or Work Email"
            value={identifierInput}
            onChange={e => setIdentifierInput(e.target.value)}
            className="flex-1 px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
          />
          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? 'Accessing...' : 'Access Portal'}
          </Button>
        </form>

        {errorMsg && (
          <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-800 dark:text-amber-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Authenticated Client Dashboard */}
        {activeProject && (
          <div className="space-y-8">
            {/* Project Overview Card */}
            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                      ID: {activeProject.id}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{activeProject.market}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      Active Retainer
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                    {activeProject.companyName}
                  </h2>

                  <p className="text-xs text-slate-500 mt-0.5">
                    Tier: <span className="font-medium text-slate-700 dark:text-slate-300">{activeProject.tier}</span> · Managed by <span className="font-medium text-slate-700 dark:text-slate-300">{activeProject.leadStrategist.name}</span>
                  </p>
                </div>

                {/* Direct Hotline CTAs */}
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={activeProject.leadStrategist.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Squad</span>
                  </a>

                  <button
                    onClick={onOpenBooking}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Schedule Sprint Review</span>
                  </button>
                </div>
              </div>

              {/* Real-Time KPI Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Ad Spend Paced
                  </span>
                  <div className="text-base font-bold font-mono text-slate-900 dark:text-white mt-1 tabular-nums">
                    {activeProject.currency} {activeProject.kpis.monthlySpend.toLocaleString()}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Blended ROAS
                  </span>
                  <div className="text-base font-bold font-mono text-blue-600 dark:text-blue-400 mt-1 tabular-nums">
                    {activeProject.kpis.blendedRoas}x
                  </div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Qualified Inbound
                  </span>
                  <div className="text-base font-bold font-mono text-slate-900 dark:text-white mt-1 tabular-nums">
                    {activeProject.kpis.qualifiedLeads} Leads
                  </div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                    CAC Reduction
                  </span>
                  <div className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1 tabular-nums">
                    -{activeProject.kpis.cacReductionPct}%
                  </div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Attributed Revenue
                  </span>
                  <div className="text-base font-bold font-mono text-slate-900 dark:text-white mt-1 tabular-nums">
                    {activeProject.currency} {activeProject.kpis.revenueGenerated.toLocaleString()}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Avg CTR
                  </span>
                  <div className="text-base font-bold font-mono text-slate-900 dark:text-white mt-1 tabular-nums">
                    {activeProject.kpis.clickThroughRate}%
                  </div>
                </div>
              </div>
            </div>

            {/* Segmented Tab Navigation Controls */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-x-auto">
              {[
                { id: 'sprints', label: 'Active Sprints & Milestones' },
                { id: 'deliverables', label: 'Strategic Deliverables & Sign-offs' },
                { id: 'squad', label: 'Senior Squad Contacts' },
                { id: 'scope', label: 'Request Scope Expansion' },
                { id: 'activity', label: 'Activity Audit Log' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab 1: Sprints */}
            {activeTab === 'sprints' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeProject.sprints.map((sprint: any) => (
                  <Card key={sprint.id} className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded">
                        {sprint.category}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                          sprint.status === 'Completed'
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                            : sprint.status === 'Under Review'
                            ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                            : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                        }`}
                      >
                        {sprint.status}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {sprint.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {sprint.summary}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 font-mono">
                      <span>Target: {sprint.targetDate}</span>
                      <span>Squad: Performance Pod</span>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Tab 2: Strategic Deliverables */}
            {activeTab === 'deliverables' && (
              <div className="space-y-4">
                <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase tracking-wider text-[10px] font-semibold">
                      <tr>
                        <th className="py-3 px-4">Deliverable Title</th>
                        <th className="py-3 px-4">Discipline</th>
                        <th className="py-3 px-4">Format / Size</th>
                        <th className="py-3 px-4">Delivery Date</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {activeProject.deliverables.map((del: any) => (
                        <tr key={del.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                          <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                            {del.title}
                          </td>
                          <td className="py-3.5 px-4 text-slate-500">
                            {del.category}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-slate-500">
                            {del.fileType} · {del.fileSize}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-slate-500">
                            {del.date}
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                                del.status === 'Approved'
                                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                                  : del.status === 'Revision Requested'
                                  ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                                  : 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                              }`}
                            >
                              {del.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => setSelectedDeliverable(del)}
                              className="px-2.5 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              Review / Sign-off
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Review Modal */}
                {selectedDeliverable && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-blue-600 uppercase font-bold">
                          Client Review & Sign-Off
                        </span>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                          {selectedDeliverable.title}
                        </h3>
                        <p className="text-xs text-slate-500 font-mono">
                          Format: {selectedDeliverable.fileType} ({selectedDeliverable.fileSize}) · Delivered {selectedDeliverable.date}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          Feedback or Revision Notes (Optional)
                        </label>
                        <textarea
                          rows={3}
                          placeholder="e.g. Approved copy headline, please test version 2 in London geo-target..."
                          value={feedbackNote}
                          onChange={e => setFeedbackNote(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white"
                        />
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-2">
                        <Button
                          variant="secondary"
                          onClick={() => setSelectedDeliverable(null)}
                        >
                          Cancel
                        </Button>
                        <button
                          onClick={() => handleDeliverableStatusUpdate('Revision Requested')}
                          disabled={isUpdatingDeliverable}
                          className="px-3 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold"
                        >
                          Request Revision
                        </button>
                        <button
                          onClick={() => handleDeliverableStatusUpdate('Approved')}
                          disabled={isUpdatingDeliverable}
                          className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold"
                        >
                          Approve Deliverable
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Squad */}
            {activeTab === 'squad' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 text-white font-bold rounded-full flex items-center justify-center text-sm">
                      {activeProject.leadStrategist.name.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {activeProject.leadStrategist.name}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {activeProject.leadStrategist.title}
                      </p>
                      <p className="text-xs font-mono text-blue-600 dark:text-blue-400 mt-0.5">
                        {activeProject.leadStrategist.email}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Directly oversees your account's weekly media buying pacing, high-intent SEO keyword sculpting, and conversion rate optimization test sprints.
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2">
                    <a
                      href={activeProject.leadStrategist.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-emerald-600 text-white rounded-md text-xs font-semibold flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Direct WhatsApp</span>
                    </a>
                    <button
                      onClick={onOpenBooking}
                      className="px-3 py-1.5 bg-slate-900 dark:bg-slate-700 text-white rounded-md text-xs font-semibold flex items-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Sprint Review</span>
                    </button>
                  </div>
                </Card>

                <Card className="p-6 space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Dedicated Retainer SLAs
                  </h3>
                  <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Slack & WhatsApp response SLA: under 90 minutes (Mon - Fri).</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Weekly sprint status calls with VP-level pod directors.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Full ownership of creative ad files and raw data warehouses.</span>
                    </li>
                  </ul>
                </Card>
              </div>
            )}

            {/* Tab 4: Scope Expansion */}
            {activeTab === 'scope' && (
              <Card className="p-6 max-w-2xl space-y-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Request Channel Expansion or Ad Scaling
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Add new channels to your active retainer (e.g. YouTube PMax, TikTok Ads, CRO Sprint) without renegotiating master agreements.
                  </p>
                </div>

                {scopeSuccess && (
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Expansion request submitted! Your Lead Strategist will respond within 4 hours.</span>
                  </div>
                )}

                <form onSubmit={handleScopeSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Target Discipline / Channel
                    </label>
                    <select
                      value={scopeForm.newChannel}
                      onChange={e => setScopeForm({ ...scopeForm, newChannel: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    >
                      <option>Meta Ads Retargeting & UGC Scaling</option>
                      <option>Google Search Exact-Match & PMax Scaling</option>
                      <option>Full-Funnel CRO & Checkout Optimization</option>
                      <option>Omnichannel E-Commerce Klaviyo Retention</option>
                      <option>International GCC & European SEO Expansion</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Proposed Additional Monthly Budget
                    </label>
                    <input
                      type="text"
                      value={scopeForm.additionalBudget}
                      onChange={e => setScopeForm({ ...scopeForm, additionalBudget: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                      placeholder="e.g. $5,000 / mo"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Strategic Goals & Timeline
                    </label>
                    <textarea
                      rows={3}
                      value={scopeForm.notes}
                      onChange={e => setScopeForm({ ...scopeForm, notes: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                      placeholder="Outline target markets, expected deadlines, or specific KPI benchmarks..."
                    />
                  </div>

                  <Button type="submit" variant="primary" disabled={isSubmittingScope}>
                    {isSubmittingScope ? 'Submitting...' : 'Submit Channel Request'}
                  </Button>
                </form>
              </Card>
            )}

            {/* Tab 5: Activity Log */}
            {activeTab === 'activity' && (
              <Card className="p-6 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Real-Time Audit Trail & Milestone History
                </h3>
                <div className="space-y-3">
                  {activeProject.activityLog.map((log: any) => (
                    <div
                      key={log.id}
                      className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="font-semibold text-slate-900 dark:text-white">
                          {log.message}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          Logged by: {log.author}
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 shrink-0">
                        {new Date(log.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
