/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUpRight, TrendingUp, ShieldCheck } from 'lucide-react';

interface ClientSpotlight {
  name: string;
  category: string;
  metric: string;
  detail: string;
  location: string;
}

const CLIENTS: ClientSpotlight[] = [
  {
    name: 'AURORA CAPITAL & PAYMENTS',
    category: 'Global Fintech',
    metric: '+312% Pipeline',
    detail: 'Institutional CAPI & Paid Search',
    location: 'London & NYC',
  },
  {
    name: 'VALOIS LUXURY MAISON',
    category: 'Haute Horlogerie',
    metric: '4.8x ROAS',
    detail: 'High-Net-Worth Paid Social',
    location: 'Paris & Dubai',
  },
  {
    name: 'SYNAPSE CLINICAL AI',
    category: 'HealthTech SaaS',
    metric: '-44% CAC',
    detail: 'Enterprise Inbound Funnel',
    location: 'Boston & Zurich',
  },
  {
    name: 'VERTEX DATA PLATFORM',
    category: 'B2B Cloud Infrastructure',
    metric: '$18.5M Net ARR',
    detail: 'ABM & Search Intent Scaling',
    location: 'San Francisco',
  },
  {
    name: 'KINETIC MOBILITY EV',
    category: 'Automotive Innovation',
    metric: '+180% Lead Volume',
    detail: 'Multi-lingual Hreflang Network',
    location: 'Munich & London',
  },
  {
    name: 'ELEVATE BOTANICAL LABS',
    category: 'Scale-Up DTC',
    metric: '5.2x Blended ROAS',
    detail: 'Shopify Plus CRO & Server CAPI',
    location: 'Dubai & UK',
  },
];

export const ClientRosterMarquee: React.FC = () => {
  return (
    <section className="py-14 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Selected Commercial Engagements
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Trusted by Category Leaders Across 3 Continents
          </h3>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Strict Enterprise NDA Compliant</span>
        </div>
      </div>

      {/* Marquee Track */}
      <div className="relative w-full overflow-hidden">
        {/* Edge Gradient Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />

        <div className="flex gap-4 sm:gap-6 animate-[marquee_35s_linear_infinite] hover:[animation-play-state:paused] w-max">
          {[...CLIENTS, ...CLIENTS].map((client, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-72 sm:w-80 p-5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/50 transition-all shadow-sm space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  {client.category}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {client.location}
                </span>
              </div>

              <div className="font-bold text-sm tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center justify-between">
                <span>{client.name}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs">
                <div className="font-bold text-blue-600 dark:text-blue-400 tabular-nums">
                  {client.metric}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[170px]">
                  {client.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
