/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowRight, Search, TrendingUp, Share2, Code, ShoppingBag, Zap, FileText, Mail, Palette, Users } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { SERVICES_DATA } from '../data/services';
import { SEOHead } from '../components/seo/SEOHead';

const iconMap: Record<string, React.ReactNode> = {
  Search: <Search className="w-5 h-5" />,
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  Share2: <Share2 className="w-5 h-5" />,
  Code: <Code className="w-5 h-5" />,
  ShoppingBag: <ShoppingBag className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  FileText: <FileText className="w-5 h-5" />,
  Mail: <Mail className="w-5 h-5" />,
  Palette: <Palette className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
};

interface ServicesPageProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate, onOpenBooking }) => {
  const [filter, setFilter] = useState<'all' | 'performance' | 'organic' | 'tech' | 'creative'>('all');
  const { formatPrice } = useCurrency();

  const filteredServices = SERVICES_DATA.filter(
    (s) => filter === 'all' || s.category === filter
  );

  return (
    <div className="py-12 sm:py-20">
      <SEOHead
        title="Digital Marketing Services — Full-Funnel Growth Solutions"
        description="Explore 10 specialized digital marketing services: Enterprise SEO, PPC advertising, paid social, conversion optimization, high-converting web engineering, and brand strategy."
        path="/services"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Specialized Practice Areas
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mt-2 leading-tight">
            Integrated Marketing Capabilities for High-Velocity Growth
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
            Every service is engineered around measurable revenue outcomes, transparent unit economics, and senior specialist execution.
          </p>

          {/* Category Filter Controls */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/80 dark:bg-slate-800/80 rounded-lg mt-8 w-fit">
            {[
              { id: 'all', label: 'All 10 Services' },
              { id: 'performance', label: 'Performance Media' },
              { id: 'organic', label: 'SEO & Inbound' },
              { id: 'tech', label: 'Web & CRO' },
              { id: 'creative', label: 'Branding & Social' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  filter === tab.id
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} hoverEffect className="flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5">
                  {iconMap[service.iconName] || <Zap className="w-5 h-5" />}
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 font-medium">
                  {service.tagline}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {service.shortDescription}
                </p>

                <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-100 dark:border-slate-800/80 mb-4">
                  <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Problems We Solve:
                  </span>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {service.problemsSolved[0]}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400">Starting from</span>
                  <div className="font-bold text-slate-900 dark:text-white tabular-nums">
                    {formatPrice(service.startingPrice.USD)}/mo
                  </div>
                </div>
                <button
                  onClick={() => onNavigate(`/services/${service.slug}`)}
                  className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1 group"
                >
                  <span>Detailed Scope</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">
            Unsure which channel combination aligns with your goals?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Our Senior Marketing Director offers free 30-minute growth audits to inspect your current funnels and recommend high-ROI channels.
          </p>
          <div className="pt-2">
            <Button onClick={onOpenBooking} className="bg-blue-600 hover:bg-blue-500 text-white">
              Request Free Strategic Audit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
