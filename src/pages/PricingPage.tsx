/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CheckCircle2, Minus, ArrowRight, HelpCircle } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { PRICING_TIERS } from '../data/pricing';
import { SEOHead } from '../components/seo/SEOHead';

interface PricingPageProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate, onOpenBooking }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const { formatPrice, currency } = useCurrency();

  // Custom Quote Calculator State
  const [channelsSelected, setChannelsSelected] = useState<string[]>(['SEO', 'Google Ads']);
  const [adSpendBracket, setAdSpendBracket] = useState<number>(10000); // USD base

  const toggleChannel = (ch: string) => {
    setChannelsSelected(prev =>
      prev.includes(ch) ? (prev.length > 1 ? prev.filter(c => c !== ch) : prev) : [...prev, ch]
    );
  };

  const calculatedQuoteUSD = Math.round(
    1800 + channelsSelected.length * 1200 + (adSpendBracket > 15000 ? 1000 : 0)
  );

  return (
    <div className="py-12 sm:py-20">
      <SEOHead
        title="Transparent Pricing & Retainer Packages (USD, GBP, AED)"
        description="Clear, performance-driven digital marketing agency pricing in USD, GBP, and AED. Starter, Growth, and Enterprise tiers with an interactive quote calculator."
        path="/pricing"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Predictable Investment Models
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
            Transparent Pricing in {currency}
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Choose a structured engagement package or configure custom channel requirements. Backed by dedicated senior specialists and guaranteed SLAs.
          </p>

          {/* Billing Switcher */}
          <div className="inline-flex items-center gap-2 p-1 bg-slate-200/80 dark:bg-slate-800 rounded-lg mt-4">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Monthly Retainer
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                billingCycle === 'annual'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Annual Commitment (Save Up to 25%)
            </button>
          </div>
        </div>

        {/* Tier Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_TIERS.map((tier) => {
            const baseMonthly = tier.monthlyPrice.USD;
            const finalMonthly =
              billingCycle === 'annual'
                ? Math.round(baseMonthly * (1 - tier.annualDiscountPercent / 100))
                : baseMonthly;

            return (
              <Card
                key={tier.id}
                className={`relative flex flex-col justify-between ${
                  tier.isPopular ? 'border-blue-600 dark:border-blue-500 shadow-xl' : ''
                }`}
              >
                {tier.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm">
                    Most Popular
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 min-h-[32px]">
                      {tier.tagline}
                    </p>
                  </div>

                  <div className="pt-2">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                        {formatPrice(finalMonthly)}
                      </span>
                      <span className="text-xs text-slate-500">/month</span>
                    </div>
                    {billingCycle === 'annual' && (
                      <div className="text-[11px] text-emerald-600 font-semibold mt-1">
                        Includes {tier.annualDiscountPercent}% annual discount
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                    <span className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
                      Included Scope:
                    </span>
                    <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                      {tier.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8">
                  <Button
                    onClick={onOpenBooking}
                    variant={tier.isPopular ? 'primary' : 'outline'}
                    className="w-full py-2.5"
                  >
                    {tier.ctaText}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Granular Deliverable Comparison Matrix */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Package Deliverable Matrix
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Direct comparison of capabilities across Starter, Growth, and Enterprise tiers.
            </p>
          </div>

          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900">
            <table className="w-full text-xs text-left divide-y divide-slate-200 dark:divide-slate-800">
              <thead className="bg-slate-50 dark:bg-slate-800/60 font-semibold text-slate-700 dark:text-slate-200">
                <tr>
                  <th className="p-4 sm:p-5">Feature & Deliverable</th>
                  <th className="p-4 sm:p-5 text-center">Starter</th>
                  <th className="p-4 sm:p-5 text-center bg-blue-50/50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400">Growth</th>
                  <th className="p-4 sm:p-5 text-center">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                <tr>
                  <td className="p-4 font-medium text-slate-900 dark:text-white">Active Core Marketing Channels</td>
                  <td className="p-4 text-center">1 Focus Channel</td>
                  <td className="p-4 text-center bg-blue-50/20 dark:bg-blue-950/10 font-semibold">2 Integrated Channels</td>
                  <td className="p-4 text-center font-bold">Full Omnichannel Pod</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-900 dark:text-white">Direct-Response Ad Creative Production</td>
                  <td className="p-4 text-center text-slate-400"><Minus className="w-4 h-4 mx-auto" /></td>
                  <td className="p-4 text-center bg-blue-50/20 dark:bg-blue-950/10">10 assets / month</td>
                  <td className="p-4 text-center font-semibold">Unlimited Monthly Sprints</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-900 dark:text-white">Server-Side Tracking (CAPI / GTM)</td>
                  <td className="p-4 text-center">Standard Pixel</td>
                  <td className="p-4 text-center bg-blue-50/20 dark:bg-blue-950/10"><CheckCircle2 className="w-4 h-4 text-blue-600 mx-auto" /></td>
                  <td className="p-4 text-center"><CheckCircle2 className="w-4 h-4 text-blue-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-900 dark:text-white">Dedicated Fractional CMO Strategist</td>
                  <td className="p-4 text-center text-slate-400"><Minus className="w-4 h-4 mx-auto" /></td>
                  <td className="p-4 text-center bg-blue-50/20 dark:bg-blue-950/10 text-slate-400"><Minus className="w-4 h-4 mx-auto" /></td>
                  <td className="p-4 text-center"><CheckCircle2 className="w-4 h-4 text-blue-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-900 dark:text-white">Guaranteed Communication SLA</td>
                  <td className="p-4 text-center">24 Business Hours</td>
                  <td className="p-4 text-center bg-blue-50/20 dark:bg-blue-950/10 font-semibold">4 Hours (Priority)</td>
                  <td className="p-4 text-center font-bold text-blue-600">1 Hour (VIP WhatsApp)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Custom Quotation Calculator */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 border border-slate-800 space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              Interactive Scope Modeler
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Custom Quotation Calculator
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Select your required growth channels to estimate your monthly agency investment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Channel Selection */}
            <div className="lg:col-span-8 space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-3">
                  1. Select Channels to Combine
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    'SEO',
                    'Google Ads',
                    'Meta Ads',
                    'CRO & Web',
                    'Email Lifecycle',
                    'Content & PR',
                  ].map((ch) => {
                    const isSelected = channelsSelected.includes(ch);
                    return (
                      <button
                        key={ch}
                        onClick={() => toggleChannel(ch)}
                        className={`p-3 rounded-lg text-xs font-medium text-left border transition-all ${
                          isSelected
                            ? 'bg-blue-600/20 border-blue-500 text-white shadow-sm'
                            : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-600'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{ch}</span>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-400 mb-2">
                  <span>2. Estimated Monthly Media Budget</span>
                  <span className="text-white font-mono">{formatPrice(adSpendBracket)}/mo</span>
                </div>
                <input
                  type="range"
                  min="3000"
                  max="50000"
                  step="1000"
                  value={adSpendBracket}
                  onChange={(e) => setAdSpendBracket(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Calculated Estimate Box */}
            <div className="lg:col-span-4 bg-slate-800/80 rounded-xl p-6 border border-slate-700 text-center space-y-4">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Estimated Retainer
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-400 tabular-nums">
                {formatPrice(calculatedQuoteUSD)}
                <span className="text-xs text-slate-400 font-normal">/mo</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Includes {channelsSelected.length} active channels, dedicated senior media buyers, and real-time reporting.
              </p>
              <div className="pt-2">
                <Button onClick={onOpenBooking} className="w-full bg-blue-600 hover:bg-blue-500 text-white">
                  Lock In Proposal
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Banner to Full Campaign ROI Simulator */}
        <div className="p-8 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Looking for full revenue forecasting?
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Launch the Interactive Campaign Growth & ROI Simulator
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              Model your unit economics, projected 12-month blended ROAS curves, and CAC reduction across US, UK, and UAE markets in USD, GBP, or AED.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/simulator')}
            className="px-5 py-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-sm shrink-0 flex items-center gap-2 transition-colors"
          >
            <span>Open Growth Simulator</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
