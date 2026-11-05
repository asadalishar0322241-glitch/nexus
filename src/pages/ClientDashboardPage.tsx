/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  ShieldCheck,
  Lock,
  LogOut,
  TrendingUp,
  DollarSign,
  Users,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Calendar,
  MessageSquare,
  Send,
  ExternalLink,
  Download,
  Layers,
  ChevronRight,
  RefreshCw,
  Zap,
  ArrowUpRight,
  Check,
  X
} from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

interface ClientDashboardPageProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const ClientDashboardPage: React.FC<ClientDashboardPageProps> = ({ onNavigate, onOpenBooking }) => {
  // Session & Auth
  const [token, setToken] = useState<string | null>(localStorage.getItem('nexus_client_token'));
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('ClientPass2026!');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active Project Data
  const [project, setProject] = useState<any>(null);
  const [isLoadingProject, setIsLoadingProject] = useState(false);

  // Timeframe Filter: 7d, 30d, 90d, all
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d' | 'all'>('30d');

  // Direct Message Composer State
  const [clientMessage, setClientMessage] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [messageSentFeedback, setMessageSentFeedback] = useState(false);

  // Deliverable Review Modal State
  const [selectedDeliverable, setSelectedDeliverable] = useState<any>(null);
  const [reviewNote, setReviewNote] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // Scope Request State
  const [scopeModalOpen, setScopeModalOpen] = useState(false);
  const [scopeChannel, setScopeChannel] = useState('Meta Ads High-Intent Scaling');
  const [scopeBudget, setScopeBudget] = useState('$5,000 / mo');
  const [scopeNotes, setScopeNotes] = useState('');
  const [isSubmittingScope, setIsSubmittingScope] = useState(false);
  const [scopeSuccess, setScopeSuccess] = useState(false);

  // Initial Load / Session Verification
  useEffect(() => {
    if (token) {
      verifySession();
    } else {
      // Check if previously logged-in client ID was saved
      const savedId = localStorage.getItem('nexus_client_id');
      if (savedId) {
        setLoginEmail(savedId);
      } else {
        setLoginEmail('NX-US-104');
      }
    }
  }, [token]);

  const verifySession = async () => {
    setIsLoadingProject(true);
    try {
      const res = await fetch('/api/portal/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.project) {
        setProject(data.project);
      } else {
        // Fallback to demo project lookup if session expired
        handleLogout();
      }
    } catch {
      handleLogout();
    } finally {
      setIsLoadingProject(false);
    }
  };

  const handleLogin = async (e?: React.FormEvent, directIdentifier?: string) => {
    if (e) e.preventDefault();
    const identifier = directIdentifier || loginEmail;
    if (!identifier.trim()) return;

    setIsLoggingIn(true);
    setLoginError('');

    try {
      const res = await fetch('/api/portal/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: identifier.trim(), password: loginPassword }),
      });
      const data = await res.json();

      if (res.ok && data.token && data.project) {
        localStorage.setItem('nexus_client_token', data.token);
        localStorage.setItem('nexus_client_id', data.project.id);
        setToken(data.token);
        setProject(data.project);
      } else {
        setLoginError(data.error || 'Failed to authenticate client account.');
      }
    } catch {
      setLoginError('Network error connecting to client portal. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('nexus_client_token');
    setToken(null);
    setProject(null);
  };

  // Deliverable Status Update
  const handleUpdateDeliverable = async (status: 'Approved' | 'Revision Requested') => {
    if (!project || !selectedDeliverable) return;
    setIsSubmittingReview(true);

    try {
      const res = await fetch(
        `/api/portal/projects/${project.id}/deliverables/${selectedDeliverable.id}/feedback`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status, note: reviewNote }),
        }
      );
      const data = await res.json();
      if (res.ok && data.project) {
        setProject(data.project);
        setSelectedDeliverable(null);
        setReviewNote('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  // Direct Message to Squad
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project || !clientMessage.trim()) return;
    setIsSendingMessage(true);

    try {
      const res = await fetch(`/api/portal/projects/${project.id}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: clientMessage.trim(),
          author: project.clientName,
        }),
      });
      const data = await res.json();
      if (res.ok && data.project) {
        setProject(data.project);
        setClientMessage('');
        setMessageSentFeedback(true);
        setTimeout(() => setMessageSentFeedback(false), 3500);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSendingMessage(false);
    }
  };

  // Scope Expansion Submit
  const handleScopeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project) return;
    setIsSubmittingScope(true);

    try {
      const res = await fetch(`/api/portal/projects/${project.id}/scope-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          newChannel: scopeChannel,
          additionalBudget: scopeBudget,
          notes: scopeNotes,
        }),
      });
      const data = await res.json();
      if (res.ok && data.project) {
        setProject(data.project);
        setScopeSuccess(true);
        setTimeout(() => {
          setScopeSuccess(false);
          setScopeModalOpen(false);
        }, 2000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingScope(false);
    }
  };

  // Dynamic calculations based on timeframe multiplier
  const dynamicMetrics = useMemo(() => {
    if (!project) return null;
    const base = project.kpis;
    const multipliers: Record<string, { spend: number; leads: number; rev: number }> = {
      '7d': { spend: 0.25, leads: 0.24, rev: 0.26 },
      '30d': { spend: 1.0, leads: 1.0, rev: 1.0 },
      '90d': { spend: 2.85, leads: 2.92, rev: 2.95 },
      'all': { spend: 4.8, leads: 4.95, rev: 5.1 },
    };

    const m = multipliers[timeframe];
    const adjustedSpend = Math.round(base.monthlySpend * m.spend);
    const adjustedRev = Math.round(base.revenueGenerated * m.rev);
    const adjustedLeads = Math.round(base.qualifiedLeads * m.leads);
    const adjustedRoas = Number((adjustedRev / adjustedSpend).toFixed(2));

    // Pacing calculation
    const monthlyTarget = project.monthlyRetainer * 2.5; // Estimated monthly ad cap
    const pacingPct = Math.min(Math.round((base.monthlySpend / monthlyTarget) * 100), 100);

    return {
      spend: adjustedSpend,
      revenue: adjustedRev,
      leads: adjustedLeads,
      roas: adjustedRoas,
      pacingPct,
      cac: base.cac,
      cacReductionPct: base.cacReductionPct,
      ctr: base.clickThroughRate,
    };
  }, [project, timeframe]);

  // If NOT logged in: Show Secure Client Authentication Gate
  if (!token || !project) {
    return (
      <div className="py-20 px-4 max-w-lg mx-auto">
        <SEOHead
          title="Secure Client Portal Login — Nexus International"
          description="Log in to your private client dashboard to inspect active sprint updates, real-time performance metrics, and deliverable sign-offs."
          path="/portal"
        />

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Nexus Client Portal
            </h1>
            <p className="text-xs text-slate-500">
              Encrypted workspace for verified retainer clients.
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg text-xs text-red-700 dark:text-red-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={e => handleLogin(e)} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Client Email or Project ID
              </label>
              <input
                type="text"
                required
                placeholder="e.g. NX-US-104 or client@company.com"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Portal Password / Key
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Default pre-configured demo password: <code className="font-mono text-blue-600 dark:text-blue-400">ClientPass2026!</code>
              </span>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full justify-center py-2.5"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? 'Authenticating...' : 'Sign In to Client Portal'}
            </Button>
          </form>

          {/* 1-Click Demo Accounts Selector */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              One-Click Evaluation Accounts:
            </span>
            <div className="grid grid-cols-1 gap-2">
              {[
                {
                  id: 'NX-US-104',
                  name: 'David Sterling',
                  company: 'Aetheria Luxury Goods Ltd',
                  market: 'UK (London) · £ GBP',
                },
                {
                  id: 'NX-UAE-208',
                  name: 'Tariq Al-Mansoor',
                  company: 'GulfTech Enterprise Solutions',
                  market: 'UAE (Dubai) · AED',
                },
                {
                  id: 'NX-US-315',
                  name: 'Sarah Jenkins',
                  company: 'Vanguard Health & MedTech',
                  market: 'US (New York) · $ USD',
                },
              ].map(demo => (
                <button
                  key={demo.id}
                  type="button"
                  onClick={() => {
                    setLoginEmail(demo.id);
                    handleLogin(undefined, demo.id);
                  }}
                  className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg text-left hover:border-blue-500 transition-colors"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      {demo.company}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {demo.name} · {demo.market}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400">
                    {demo.id} →
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // LOGGED-IN CLIENT DASHBOARD VIEW
  return (
    <div className="py-10 sm:py-16">
      <SEOHead
        title={`${project.companyName} — Client Performance & Sprint Dashboard`}
        description="Live client dashboard tracking project sprint status, real-time blended ROAS, ad spend pacing, and deliverable sign-offs."
        path="/portal"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Header Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-mono font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                {project.id}
              </span>
              <span className="text-slate-400" aria-hidden="true">·</span>
              <span className="text-slate-500">{project.market}</span>
              <span className="text-slate-400" aria-hidden="true">·</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Active Retainer
              </span>
            </div>

            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {project.companyName}
              </h1>
              <a
                href={project.domain}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                title="Open client website"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <p className="text-xs text-slate-500">
              Tier: <span className="font-semibold text-slate-700 dark:text-slate-300">{project.tier}</span> · Client Contact: <span className="font-medium text-slate-700 dark:text-slate-300">{project.clientName}</span> ({project.email})
            </p>
          </div>

          {/* Quick Action Cluster */}
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={project.leadStrategist.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Pod</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Sprint Review</span>
            </button>

            <button
              onClick={() => setScopeModalOpen(true)}
              className="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Request Scale</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Sign Out of Client Portal"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* SECTION 1: REAL-TIME PERFORMANCE METRICS ENGINE */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Real-Time Performance Engine
              </h2>
              <p className="text-xs text-slate-500">
                Live campaign telemetry and return on ad spend (ROAS) tracked against agreed monthly targets.
              </p>
            </div>

            {/* Timeframe Segmented Control */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
              {[
                { id: '7d', label: 'Last 7 Days' },
                { id: '30d', label: 'Last 30 Days' },
                { id: '90d', label: 'Quarterly (90d)' },
                { id: 'all', label: 'All-Time' },
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setTimeframe(t.id as any)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    timeframe === t.id
                      ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* 6 Core Metric Cards */}
          {dynamicMetrics && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              <Card className="p-4 space-y-1 bg-gradient-to-br from-blue-900/10 via-transparent to-transparent border-blue-500/20">
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                  Blended ROAS
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 dark:text-white tabular-nums">
                  {dynamicMetrics.roas}x
                </div>
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>+0.6x vs target</span>
                </div>
              </Card>

              <Card className="p-4 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Attributed Revenue
                </span>
                <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                  {project.currency} {dynamicMetrics.revenue.toLocaleString()}
                </div>
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  +24.2% MoM lift
                </div>
              </Card>

              <Card className="p-4 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Ad Spend Paced
                </span>
                <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                  {project.currency} {dynamicMetrics.spend.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  {dynamicMetrics.pacingPct}% of budget cap
                </div>
              </Card>

              <Card className="p-4 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Blended CAC
                </span>
                <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
                  {project.currency} {dynamicMetrics.cac}
                </div>
                <div className="text-[11px] text-emerald-600 font-semibold">
                  -{dynamicMetrics.cacReductionPct}% cost reduction
                </div>
              </Card>

              <Card className="p-4 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Conversions / Orders
                </span>
                <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                  {dynamicMetrics.leads}
                </div>
                <div className="text-[11px] text-slate-500">
                  Qualified high-intent
                </div>
              </Card>

              <Card className="p-4 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Average CTR
                </span>
                <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                  {dynamicMetrics.ctr}%
                </div>
                <div className="text-[11px] text-slate-500">
                  Benchmark: 1.8%
                </div>
              </Card>
            </div>
          )}

          {/* Spend Pacing Meter & Channel Attribution Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left: Monthly Pacing Meter (5 Cols) */}
            <Card className="lg:col-span-5 p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Monthly Ad Spend Pacing Meter
                  </h3>
                  <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                    {dynamicMetrics?.pacingPct}% Paced
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Pacing is actively calibrated to prevent budget burn while scaling bidding volume during peak buyer demand hours.
                </p>

                {/* Visual Bar */}
                <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700">
                  <div
                    className="h-full bg-linear-to-r from-blue-600 to-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${dynamicMetrics?.pacingPct}%` }}
                  />
                </div>

                <div className="flex justify-between text-[11px] font-mono text-slate-400 pt-1">
                  <span>Spend: {project.currency} {dynamicMetrics?.spend.toLocaleString()}</span>
                  <span>Target Cap: {project.currency} {(project.monthlyRetainer * 2.5).toLocaleString()}</span>
                </div>
              </div>

              {/* Senior Squad Pod Card */}
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                    {project.leadStrategist.name.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      {project.leadStrategist.name}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {project.leadStrategist.title}
                    </div>
                  </div>
                </div>

                <button
                  onClick={onOpenBooking}
                  className="px-2.5 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 rounded-md transition-colors"
                >
                  Book 1-on-1
                </button>
              </div>
            </Card>

            {/* Right: Channel Breakdown (7 Cols) */}
            <Card className="lg:col-span-7 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Channel Attribution & ROAS Breakdown
                </h3>
                <span className="text-[11px] text-slate-400 font-mono">
                  Active Sprint 5 Matrix
                </span>
              </div>

              <div className="space-y-3">
                {[
                  { channel: 'Meta & Instagram Ads (CAPI Server Tagging)', share: 45, roas: '4.8x', rev: '£38,200', spend: '£7,950' },
                  { channel: 'Google Search & Performance Max (High Intent)', share: 35, roas: '4.2x', rev: '£26,400', spend: '£6,280' },
                  { channel: 'Technical SEO & B2B Category Authority', share: 12, roas: '6.4x', rev: '£9,800', spend: '£1,530' },
                  { channel: 'Lifecycle Klaviyo / Retention Email Automation', share: 8, roas: '8.1x', rev: '£5,150', spend: '£640' },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {item.channel}
                      </span>
                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-slate-500 text-[11px]">Spend: {item.spend}</span>
                        <span className="text-slate-400">·</span>
                        <span className="font-bold text-blue-600 dark:text-blue-400">ROAS: {item.roas}</span>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${item.share}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* SECTION 2: PROJECT STATUS UPDATES & ACTIVE SPRINTS */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-600" />
                Project Status & Sprint Execution Roadmap
              </h2>
              <p className="text-xs text-slate-500">
                Track ongoing deliverables, asset sign-offs, and weekly execution milestones.
              </p>
            </div>

            <button
              onClick={() => setScopeModalOpen(true)}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>+ Request New Scope / Channel</span>
            </button>
          </div>

          {/* Sprints Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {project.sprints.map((sprint: any) => (
              <Card key={sprint.id} className="p-4 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
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

                  <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                    {sprint.title}
                  </h3>

                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                    {sprint.summary}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>Target: {sprint.targetDate}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-300" />
                </div>
              </Card>
            ))}
          </div>

          {/* Deliverables Hub & Sign-off Table */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Strategic Deliverables & Approval Sign-offs
                </h3>
                <p className="text-xs text-slate-500">
                  Inspect files, approve creative assets, or request revisions directly to your squad.
                </p>
              </div>

              <span className="text-xs font-mono text-slate-400">
                {project.deliverables.filter((d: any) => d.status === 'Pending Approval').length} Pending Review
              </span>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Deliverable Asset</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Format / Size</th>
                    <th className="py-3 px-4">Delivery Date</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {project.deliverables.map((del: any) => (
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
                          className="px-2.5 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Review & Sign-Off
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Activity Feed & Direct Message Composer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Real-Time Status Feed (7 Cols) */}
            <Card className="lg:col-span-7 p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Live Squad Updates & Status Feed
              </h3>

              <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                {project.activityLog.map((log: any) => (
                  <div
                    key={log.id}
                    className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white">
                        {log.author}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {log.message}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Right: Direct Message Composer to Squad (5 Cols) */}
            <Card className="lg:col-span-5 p-6 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Direct Line to Lead Strategist
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Send a priority note to {project.leadStrategist.name}. Typical response time is under 90 minutes.
                </p>
              </div>

              {messageSentFeedback && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Message delivered directly to your squad!</span>
                </div>
              )}

              <form onSubmit={handleSendMessage} className="space-y-3 text-xs">
                <textarea
                  rows={4}
                  required
                  placeholder="e.g. Please allocate additional budget to winning ad set #3, and prepare performance deck for Monday board review..."
                  value={clientMessage}
                  onChange={e => setClientMessage(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full justify-center"
                  disabled={isSendingMessage}
                >
                  {isSendingMessage ? 'Sending...' : 'Send Message to Squad'}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>

      {/* DELIVERABLE REVIEW & SIGN-OFF MODAL */}
      {selectedDeliverable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setSelectedDeliverable(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-blue-600 uppercase font-bold">
                Client Review & Verification
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {selectedDeliverable.title}
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                {selectedDeliverable.category} · {selectedDeliverable.fileType} ({selectedDeliverable.fileSize}) · Delivered {selectedDeliverable.date}
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                Feedback or Revision Instructions (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Creative approved for rollout. Please test headline variant B with UK luxury audiences..."
                value={reviewNote}
                onChange={e => setReviewNote(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
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
                onClick={() => handleUpdateDeliverable('Revision Requested')}
                disabled={isSubmittingReview}
                className="px-3 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold"
              >
                Request Revision
              </button>
              <button
                onClick={() => handleUpdateDeliverable('Approved')}
                disabled={isSubmittingReview}
                className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold"
              >
                Approve Deliverable
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REQUEST SCOPE EXPANSION MODAL */}
      {scopeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setScopeModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Request Scope Expansion or Ad Spend Scaling
              </h3>
              <p className="text-xs text-slate-500">
                Add marketing channels or increase monthly budget pacing without contract renegotiation.
              </p>
            </div>

            {scopeSuccess ? (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Scope expansion recorded! Your Lead Strategist will respond within 4 business hours.</span>
              </div>
            ) : (
              <form onSubmit={handleScopeSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Channel / Service to Add
                  </label>
                  <select
                    value={scopeChannel}
                    onChange={e => setScopeChannel(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option>Meta Ads High-Intent Scaling & UGC Sprints</option>
                    <option>Google Performance Max & Brand Defense Bidding</option>
                    <option>Full Checkout & Cart Drawer CRO Revamp</option>
                    <option>Omnichannel Klaviyo & SMS Retention Automation</option>
                    <option>International European & GCC SEO Expansion</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Proposed Additional Monthly Spend
                  </label>
                  <input
                    type="text"
                    required
                    value={scopeBudget}
                    onChange={e => setScopeBudget(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Notes & Targets for Strategist Pod
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. We want to capture high-margin Q4 holiday demand across London and New York..."
                    value={scopeNotes}
                    onChange={e => setScopeNotes(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setScopeModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmittingScope}
                  >
                    {isSubmittingScope ? 'Submitting...' : 'Submit Expansion Request'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
