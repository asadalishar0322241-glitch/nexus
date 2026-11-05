/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, CheckCircle2, Clock, FileCheck, Layers, BarChart, Zap, Shield } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SEOHead } from '../components/seo/SEOHead';

interface ProcessPageProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const ProcessPage: React.FC<ProcessPageProps> = ({ onNavigate, onOpenBooking }) => {
  const steps = [
    {
      num: '01',
      title: 'Discovery & Forensic Auditing',
      duration: 'Week 1',
      desc: 'We begin by conducting a forensic audit of your entire growth ecosystem: historical ad logs, Google Analytics 4 tracking integrity, organic search positions, and competitor positioning.',
      deliverables: [
        'Comprehensive Tracking & Tagging Health Report',
        'Competitor Ad Creative & Keyword Gap Analysis',
        'Historical Conversion Funnel Leak Diagnosis',
      ],
      clientCommitment: '60-minute kick-off call + temporary read-only account access.',
    },
    {
      num: '02',
      title: 'Research & Strategic Blueprint',
      duration: 'Week 2',
      desc: 'We construct an actionable growth blueprint detailing customer acquisition angles, target buyer psychology, channel budget distributions, and CAC/LTV targets.',
      deliverables: [
        '90-Day Channel Budget & Scaling Model',
        'High-Intent Customer Persona Playbook',
        'Direct-Response Creative Angles & Copy Wireframes',
      ],
      clientCommitment: 'Review and sign-off on strategic positioning.',
    },
    {
      num: '03',
      title: 'Infrastructure & Creative Production',
      duration: 'Week 3',
      desc: 'Our engineers deploy server-side CAPI/GTM and fix technical SEO crawl errors, while our creative studio produces 15+ bespoke motion graphics, carousels, and landing pages.',
      deliverables: [
        'Hardened Server-Side Tagging & Enhanced Conversions',
        '10-15 Production-Ready Direct Response Ad Variants',
        'Custom Landing Page / Checkout Optimization Sprints',
      ],
      clientCommitment: 'Creative asset approval via Figma/Frame.io.',
    },
    {
      num: '04',
      title: 'Controlled Launch & Algorithmic Calibration',
      duration: 'Weeks 4-5',
      desc: 'Campaigns go live under strict manual oversight. We pace budgets deliberately, testing multiple hook variations to gather clean statistical conversion density.',
      deliverables: [
        'Live Campaign Launch Across Search, Social, and Display',
        'Search Term Pruning & Negative Keyword Enforcement',
        'Daily Budget & CPA Bid Adjustments',
      ],
      clientCommitment: 'Asynchronous Slack check-ins.',
    },
    {
      num: '05',
      title: 'Continuous CRO & Scaling Sprints',
      duration: 'Ongoing',
      desc: 'Once winning creative angles and keywords are identified, we deploy budget scaling while simultaneously A/B testing on-site conversion funnels to keep CPA steady.',
      deliverables: [
        'Bi-Weekly Direct-Response Creative Refreshes',
        'On-Site A/B Checkout & Lead Form Experimentation',
        'Audience Expansion & Lookalike Layering',
      ],
      clientCommitment: 'Bi-weekly 30-minute sprint review calls.',
    },
    {
      num: '06',
      title: 'Boardroom Reporting & Long-Term Roadmap',
      duration: 'Monthly / Quarterly',
      desc: 'We provide executive-ready insights connecting marketing spend directly to closed pipeline, customer lifetime value, and profitability.',
      deliverables: [
        '24/7 Real-Time Executive Looker Studio Dashboard',
        'Monthly Strategic Boardroom Presentation',
        'Quarterly Growth Roadmap Recalibration',
      ],
      clientCommitment: 'Monthly strategic alignment session.',
    },
  ];

  return (
    <div className="py-12 sm:py-20">
      <SEOHead
        title="Our 6-Phase Data-Driven Marketing Methodology"
        description="Discover our battle-tested operational governance process: Discovery, Strategic Blueprint, Creative Launchpad, Algorithmic Optimization, CRO Sprints, and Boardroom Reporting."
        path="/process"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Our Working Process
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mt-2 leading-tight">
            How Predictable Growth Is Engineered
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
            Eliminating guesswork with a strict 6-phase operational governance model. Every milestone requires verified data before scaling spend.
          </p>
        </div>

        {/* Process Timeline Steps */}
        <div className="space-y-8">
          {steps.map((s, idx) => (
            <div
              key={s.num}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start shadow-sm"
            >
              <div className="lg:col-span-4 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">
                    {s.num}.
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {s.duration}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                  {s.desc}
                </p>
              </div>

              <div className="lg:col-span-5 space-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Key Deliverables
                </span>
                <ul className="space-y-2 pt-1">
                  {s.deliverables.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-3 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 text-xs space-y-1">
                <span className="font-semibold text-slate-900 dark:text-white block">
                  Client Requirement:
                </span>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  {s.clientCommitment}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 text-center space-y-4 border border-slate-800">
          <h3 className="text-2xl font-bold text-white">
            Experience the clarity of a disciplined marketing framework
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            Book a 30-minute introductory call to walk through how Phase 1 would look for your specific brand.
          </p>
          <div className="pt-2">
            <Button size="lg" onClick={onOpenBooking} className="bg-blue-600 hover:bg-blue-500 text-white">
              Schedule Your Discovery Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
