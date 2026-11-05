/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { CASE_STUDIES_DATA } from '../data/portfolio';
import { CaseStudy } from '../types';
import { SEOHead } from '../components/seo/SEOHead';

interface PortfolioPageProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onNavigate, onOpenBooking }) => {
  const [selectedRegion, setSelectedRegion] = useState<'ALL' | 'US' | 'UK' | 'UAE'>('ALL');
  const [activeModalStudy, setActiveModalStudy] = useState<CaseStudy | null>(null);

  const filteredStudies = CASE_STUDIES_DATA.filter(
    (cs) => selectedRegion === 'ALL' || cs.targetRegion === selectedRegion
  );

  return (
    <div className="py-12 sm:py-20">
      <SEOHead
        title="Portfolio & Case Studies — Verified Client Growth Campaigns"
        description="Review transparent, verified client growth case studies across SaaS, luxury e-commerce, and enterprise B2B spanning US, UK, and UAE international markets."
        path="/portfolio"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Verified Outcomes & Case Studies
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mt-2 leading-tight">
            How We Deliver Compounding Growth Across Borders
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
            Every case study below represents real campaign architectures, technical executions, and audited business results for international clients.
          </p>

          {/* Region Filter */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 dark:bg-slate-800/80 rounded-lg mt-8 w-fit">
            {[
              { id: 'ALL', label: 'All Regions' },
              { id: 'US', label: 'United States' },
              { id: 'UK', label: 'United Kingdom' },
              { id: 'UAE', label: 'UAE & GCC' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedRegion(tab.id as any)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  selectedRegion === tab.id
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredStudies.map((study) => (
            <div
              key={study.id}
              className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
            >
              <div className="h-64 sm:h-72 overflow-hidden relative">
                <img
                  src={study.heroImage}
                  alt={study.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                  {study.clientIndustry}
                </div>
                <div className="absolute top-4 right-4 bg-blue-600 text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                  Target: {study.targetRegion}
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {study.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {study.challenge}
                  </p>

                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    {study.outcomes.map((metric, idx) => (
                      <div key={idx}>
                        <div className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400 tabular-nums">
                          {metric.value}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-500">
                    {study.servicesProvided.map((s, i) => (
                      <span key={i} className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setActiveModalStudy(study)}
                    rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
                  >
                    Read Breakdown
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Case Study Detail Modal */}
        {activeModalStudy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh] space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase">
                  {activeModalStudy.clientIndustry} · {activeModalStudy.targetRegion}
                </span>
                <button
                  onClick={() => setActiveModalStudy(null)}
                  className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  Close (✕)
                </button>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {activeModalStudy.title}
                </h3>
              </div>

              <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
                    The Business Challenge
                  </h4>
                  <p className="leading-relaxed">{activeModalStudy.challenge}</p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
                    Our Growth Strategy
                  </h4>
                  <p className="leading-relaxed">{activeModalStudy.strategy}</p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2">
                    Execution Milestones
                  </h4>
                  <ul className="space-y-2">
                    {activeModalStudy.execution.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-3">
                    Audited Outcomes
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {activeModalStudy.outcomes.map((m, idx) => (
                      <div key={idx}>
                        <div className="text-xl font-bold text-blue-600 dark:text-blue-400 tabular-nums">
                          {m.value}
                        </div>
                        <div className="text-[11px] text-slate-500">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                <Button variant="ghost" onClick={() => setActiveModalStudy(null)}>
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setActiveModalStudy(null);
                    onOpenBooking();
                  }}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Consult on Similar Strategy
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
