/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Database, Search, Cpu, LineChart, CheckCircle2, ArrowRight, Shield, Zap } from 'lucide-react';
import { Button } from '../ui/Button';

interface ArchitecturePillar {
  id: string;
  number: string;
  title: string;
  tagline: string;
  icon: React.ReactNode;
  metrics: { label: string; value: string }[];
  overview: string;
  technicalCapabilities: string[];
  diagnosticDeliverable: string;
}

const PILLARS: ArchitecturePillar[] = [
  {
    id: 'capi',
    number: '01',
    title: 'Server-Side CAPI & First-Party Data',
    tagline: 'Cookieless Attribution Engineering',
    icon: <Database className="w-5 h-5 text-blue-500" />,
    metrics: [
      { label: 'Event Match Quality', value: '9.4 / 10' },
      { label: 'Attribution Signal Recovery', value: '+34%' },
      { label: 'iOS Data Loss Prevented', value: '99.8%' },
    ],
    overview: 'Direct server-to-server data pipelines bridging your Shopify, custom backend, or CRM directly to Meta Conversions API and Google Enhanced Conversions with complete GDPR compliance.',
    technicalCapabilities: [
      'Cloudflare Worker & AWS Lambda server-side event dispatchers',
      'Encrypted SHA-256 hashed customer identity matching',
      'Offline purchase & CRM milestone synchronization',
      'Real-time ad network feedback loop with deduping tokens',
    ],
    diagnosticDeliverable: 'Complete Event Schema & Attribution Signal Audit Report',
  },
  {
    id: 'seo',
    number: '02',
    title: 'Algorithmic Search & Entity Authority',
    tagline: 'Technical Headless & Multi-Market SEO',
    icon: <Search className="w-5 h-5 text-indigo-500" />,
    metrics: [
      { label: 'Average Organic Lift', value: '+140%' },
      { label: 'Core Web Vitals Pass Rate', value: '100%' },
      { label: 'International Hreflang Coverage', value: '38 Markets' },
    ],
    overview: 'Enterprise-grade search engineering designed for complex JavaScript catalogs, dynamic headless architectures, and programmatic multi-lingual international domain networks.',
    technicalCapabilities: [
      'Next.js / SSR pre-rendering & dynamic edge caching',
      'Entity-first semantic schema & Knowledge Graph clustering',
      'Automated programmatic hreflang validation for US, UK, and UAE',
      'Algorithmic internal PageRank distribution modeling',
    ],
    diagnosticDeliverable: 'Full-Stack JavaScript & Entity Indexing Blueprint',
  },
  {
    id: 'cro',
    number: '03',
    title: 'Behavioral CRO & Checkout Velocity',
    tagline: 'Unit Economics Funnel Optimization',
    icon: <Cpu className="w-5 h-5 text-emerald-500" />,
    metrics: [
      { label: 'Average CVR Uplift', value: '+38%' },
      { label: 'Checkout Abandonment Drop', value: '-22%' },
      { label: 'Statistically Verified Sprints', value: '240+' },
    ],
    overview: 'Rigorous Bayesian split testing and behavioral UX engineering across landing pages, product configuration matrices, and checkout funnels.',
    technicalCapabilities: [
      'Server-side split testing without layout shift (zero CLS penalty)',
      'Eye-tracking heatmaps & session friction telemetry',
      'Dynamic multi-currency cart & local payment gateway optimization',
      'Post-purchase upsell & recurring retention loop triggers',
    ],
    diagnosticDeliverable: 'Conversion Friction Map & 90-Day Experiment Roadmap',
  },
  {
    id: 'media',
    number: '04',
    title: 'Performance Media Allocation',
    tagline: 'Econometric Modeling & Scale',
    icon: <LineChart className="w-5 h-5 text-amber-500" />,
    metrics: [
      { label: 'Managed Annual Spend', value: '$45M+' },
      { label: 'Average Blended ROAS', value: '4.2x' },
      { label: 'CAC Payback Velocity', value: '< 90 Days' },
    ],
    overview: 'Disciplined capital deployment across Google Search, Performance Max, Meta Advantage+, YouTube, and LinkedIn with strict incremental margin targets.',
    technicalCapabilities: [
      'Media Mix Modeling (MMM) and marginal return forecasting',
      'High-velocity creative testing (30+ fresh hooks tested weekly)',
      'Automated bid rule safeguards against ad spend waste',
      'Multi-currency bidding strategies across USD, GBP, and AED',
    ],
    diagnosticDeliverable: 'Cross-Channel Marginal ROAS Budget Model',
  },
];

interface GrowthArchitectureMatrixProps {
  onOpenBooking: () => void;
  onNavigate: (path: string) => void;
}

export const GrowthArchitectureMatrix: React.FC<GrowthArchitectureMatrixProps> = ({
  onOpenBooking,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const current = PILLARS[activeTab];

  return (
    <section className="py-24 bg-slate-950 text-white border-y border-slate-800/80 relative overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-4xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
              <span>Enterprise Growth Infrastructure</span>
              <span aria-hidden="true">·</span>
              <span>Proprietary Methodology</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              The Architecture Behind World-Class Growth
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
              We replace guesswork with technical rigor. Explore how our senior engineering pods architect full-funnel systems for high-growth global enterprises.
            </p>
          </div>

          <div className="shrink-0">
            <Button
              onClick={onOpenBooking}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-blue-600/20"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Request Technical Audit
            </Button>
          </div>
        </div>

        {/* Tab Selector Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-1.5 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800">
          {PILLARS.map((pillar, idx) => {
            const isActive = idx === activeTab;
            return (
              <button
                key={pillar.id}
                onClick={() => setActiveTab(idx)}
                className={`p-4 rounded-xl text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xl'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono font-bold ${isActive ? 'text-blue-200' : 'text-slate-500'}`}>
                    {pillar.number}
                  </span>
                  <div className={isActive ? 'text-white' : 'text-slate-500'}>
                    {pillar.icon}
                  </div>
                </div>
                <div className="text-xs sm:text-sm font-bold leading-snug line-clamp-2">
                  {pillar.title}
                </div>
                <div className={`text-[11px] mt-1 truncate ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
                  {pillar.tagline}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Console & Deep-Dive Inspection Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Details Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2.5 py-0.5 rounded font-semibold">
                PILLAR {current.number} SPECIFICATION
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {current.tagline}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
              {current.title}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed">
              {current.overview}
            </p>

            {/* Technical Checklist */}
            <div className="space-y-2.5 pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                Deployment Protocol & Core Capabilities:
              </span>
              {current.technicalCapabilities.map((cap, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{cap}</span>
                </div>
              ))}
            </div>

            {/* Diagnostic Deliverable Tag */}
            <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="text-slate-400">Included Deliverable:</span>
                <span className="font-semibold text-white">{current.diagnosticDeliverable}</span>
              </div>
              <button
                onClick={onOpenBooking}
                className="font-bold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 hover:underline"
              >
                Inquire <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Right Metrics & KPI Benchmarks Column */}
          <div className="lg:col-span-5 bg-slate-950/80 rounded-xl border border-slate-800 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Audited Performance Benchmarks
              </span>
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Metric Pod
              </span>
            </div>

            <div className="space-y-5">
              {current.metrics.map((m, i) => (
                <div key={i} className="p-4 bg-slate-900/60 rounded-lg border border-slate-800/60 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-400">{m.label}</div>
                  </div>
                  <div className="text-2xl font-bold font-mono text-white tabular-nums">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => onNavigate('/simulator')}
                className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2 border border-slate-700"
              >
                <span>Run Interactive Campaign ROI Simulator</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
