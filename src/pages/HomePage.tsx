/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ArrowRight,
  TrendingUp,
  Search,
  Share2,
  Code,
  ShoppingBag,
  Zap,
  CheckCircle2,
  ShieldCheck,
  Award,
  Globe2,
  Users2,
  BarChart3,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Accordion } from '../components/ui/Accordion';
import { SERVICES_DATA } from '../data/services';
import { PRICING_TIERS } from '../data/pricing';
import { CASE_STUDIES_DATA } from '../data/portfolio';
import { GENERAL_FAQS } from '../data/faqs';
import { SEOHead } from '../components/seo/SEOHead';
import { buildOrganizationSchema } from '../utils/seoSchemas';
import { AgencyOfficeMeetingShowcase } from '../components/common/AgencyOfficeMeetingShowcase';
import { GrowthArchitectureMatrix } from '../components/home/GrowthArchitectureMatrix';
import { ClientRosterMarquee } from '../components/home/ClientRosterMarquee';

const iconMap: Record<string, React.ReactNode> = {
  Search: <Search className="w-5 h-5" />,
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  Share2: <Share2 className="w-5 h-5" />,
  Code: <Code className="w-5 h-5" />,
  ShoppingBag: <ShoppingBag className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
};

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenBooking }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const { formatPrice, currency } = useCurrency();

  return (
    <div>
      <SEOHead
        title="Transform Your Business with Powerful Digital Marketing"
        description="Nexus International is an elite digital marketing agency driving revenue through strategic SEO, performance PPC, paid social advertising, and CRO for US, UK, and UAE brands."
        path="/"
        jsonLd={buildOrganizationSchema()}
      />
      {/* 1. Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 tracking-wide uppercase">
                <span>International Digital Marketing Agency</span>
                <span aria-hidden="true">·</span>
                <span>US · UK · UAE</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] text-balance">
                Data-Engineered Performance Marketing for High-Growth Enterprises
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                We deploy senior-led growth pods to scale Customer Acquisition, Enterprise Search Authority, and Conversion Rate Engineering with strict unit economics across the US, UK, and UAE.
              </p>

              {/* Primary CTA Cluster */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Button
                  size="lg"
                  onClick={onOpenBooking}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Get a Free Consultation
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => onNavigate('/simulator')}
                >
                  Simulate Campaign ROI
                </Button>
              </div>

              {/* Quantitative Value Baseline */}
              <div className="pt-8 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-3 gap-4 max-w-lg">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tabular-nums">
                    4.2x
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Average Client ROAS
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tabular-nums">
                    +140%
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Organic Traffic Lift
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tabular-nums">
                    $45M+
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Managed Ad Spend
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Animated Real Human Agency Office & Meeting Showcase */}
            <div className="lg:col-span-5 relative">
              <AgencyOfficeMeetingShowcase compact />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust & Credentials Bar */}
      <section className="py-10 bg-white dark:bg-slate-900/50 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-400 mb-6">
            Certified Enterprise Platform Partners & Marketing Credentials
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center justify-items-center opacity-75">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-700 dark:text-slate-300">
              <Award className="w-5 h-5 text-blue-600" />
              <span>Google Premier Partner</span>
            </div>
            <div className="flex items-center gap-2 font-bold text-sm text-slate-700 dark:text-slate-300">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              <span>Meta Business Partner</span>
            </div>
            <div className="flex items-center gap-2 font-bold text-sm text-slate-700 dark:text-slate-300">
              <ShoppingBag className="w-5 h-5 text-emerald-600" />
              <span>Shopify Plus Partner</span>
            </div>
            <div className="flex items-center gap-2 font-bold text-sm text-slate-700 dark:text-slate-300">
              <Zap className="w-5 h-5 text-orange-500" />
              <span>HubSpot Platinum Partner</span>
            </div>
          </div>
        </div>
      </section>

      {/* Global Client Roster & Industry Impact Marquee */}
      <ClientRosterMarquee />

      {/* 3. Services Overview (Bento Grid) */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Full-Funnel Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
              Engineered for Sustainable Business Scale
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400 mt-3">
              We eliminate fragmented marketing vendors by integrating technical search, creative paid media, high-converting web engineering, and retention lifecycle funnels under one unified strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_DATA.slice(0, 6).map((service) => (
              <Card key={service.id} hoverEffect className="flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5">
                    {iconMap[service.iconName] || <Zap className="w-5 h-5" />}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {service.shortDescription}
                  </p>
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/80 p-2.5 rounded-lg mb-4">
                    Key Benefit: <span className="font-normal text-slate-600 dark:text-slate-400">{service.keyBenefits[0]}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
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
                    <span>View Service</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              variant="outline"
              onClick={() => onNavigate('/services')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Explore All 10 Specialized Disciplines
            </Button>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us */}
      <section className="py-20 bg-slate-900 text-white border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                Our Uncompromising Standard
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Why International Leaders Choose Nexus
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                We don't sell vanity impressions or generic automated reports. We operate as your embedded executive growth partner, taking full ownership of revenue targets, CAC efficiency, and pipeline velocity.
              </p>
              <div className="pt-2">
                <Button
                  onClick={onOpenBooking}
                  className="bg-blue-600 hover:bg-blue-500 text-white"
                >
                  Speak with a Senior Partner
                </Button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-slate-800/60 rounded-xl border border-slate-700/80 space-y-2">
                <BarChart3 className="w-6 h-6 text-blue-400 mb-2" />
                <h4 className="font-bold text-base text-white">Data-Driven Precision</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every budget allocation is validated by econometric modeling and first-party conversion attribution.
                </p>
              </div>

              <div className="p-6 bg-slate-800/60 rounded-xl border border-slate-700/80 space-y-2">
                <Users2 className="w-6 h-6 text-indigo-400 mb-2" />
                <h4 className="font-bold text-base text-white">Dedicated Growth Squads</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Direct access to seasoned media buyers, SEO architects, and creative directors in your regional timezone.
                </p>
              </div>

              <div className="p-6 bg-slate-800/60 rounded-xl border border-slate-700/80 space-y-2">
                <Globe2 className="w-6 h-6 text-emerald-400 mb-2" />
                <h4 className="font-bold text-base text-white">Cross-Border Fluency</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Native campaigns tailored to cultural nuances across the US, United Kingdom, and the UAE/GCC region.
                </p>
              </div>

              <div className="p-6 bg-slate-800/60 rounded-xl border border-slate-700/80 space-y-2">
                <ShieldCheck className="w-6 h-6 text-purple-400 mb-2" />
                <h4 className="font-bold text-base text-white">100% Attribution Transparency</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  No black-box markups. You own your ad accounts, pixel assets, data feeds, and source code completely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Growth Architecture Matrix */}
      <GrowthArchitectureMatrix onOpenBooking={onOpenBooking} onNavigate={onNavigate} />

      {/* 5. Featured Case Studies */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Proven Case Studies
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
                Verifiable Outcomes in Competitive Markets
              </h2>
            </div>
            <button
              onClick={() => onNavigate('/portfolio')}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 inline-flex items-center gap-1"
            >
              View Full Portfolio <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {CASE_STUDIES_DATA.slice(0, 2).map((study) => (
              <div
                key={study.id}
                className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
              >
                <div className="h-64 sm:h-72 overflow-hidden relative">
                  <img
                    src={study.heroImage}
                    alt={study.title}
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
                    <button
                      onClick={() => onNavigate('/portfolio')}
                      className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1 shrink-0"
                    >
                      Case Breakdown <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Our 6-Stage Working Process */}
      <section className="py-20 bg-white dark:bg-slate-900/60 border-y border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Systematic Execution
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
              Our 6-Phase Agency Methodology
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-3">
              Predictable growth requires disciplined project governance. Every account follows our battle-tested milestone framework.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Discovery & Forensic Audit', desc: 'Deep dive into historical ad data, organic rankings, tracking integrity, and competitor unit economics.' },
              { step: '02', title: 'Strategy & Media Architecture', desc: 'Formulating customer persona angles, funnel wireframes, keyword clusters, and budgetary allocations.' },
              { step: '03', title: 'Creative & Technical Setup', desc: 'Deploying server-side CAPI/GTM, authoring direct-response ad variants, and configuring technical SEO.' },
              { step: '04', title: 'Controlled Launch & Calibration', desc: 'Deploying campaigns under strict manual pacing, gathering statistical conversion density.' },
              { step: '05', title: 'Continuous CRO & Algorithmic Scale', desc: 'A/B testing ad hooks and checkout flows, transitioning winning campaigns into automated scaling.' },
              { step: '06', title: 'Executive Boardroom Reporting', desc: 'Weekly sprint reviews, 24/7 Looker Studio dashboards, and quarterly strategic roadmap recalibration.' }
            ].map((phase, i) => (
              <div
                key={i}
                className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 space-y-3"
              >
                <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">
                  {phase.step}
                </div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white">
                  {phase.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {phase.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button variant="outline" onClick={() => onNavigate('/process')}>
              View Detailed Process & Deliverables
            </Button>
          </div>
        </div>
      </section>

      {/* 7. Multi-Currency Pricing Preview */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Transparent Engagements
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
              Investment Plans Scaled to Your Ambition
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-3">
              No hidden setup fees or opaque retainers. Select your currency: <span className="font-bold text-blue-600">{currency}</span>.
            </p>

            {/* Billing Cycle Toggle */}
            <div className="inline-flex items-center gap-2 p-1 bg-slate-200/80 dark:bg-slate-800 rounded-lg mt-6">
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
                      Most Popular for Growth
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
                          Includes {tier.annualDiscountPercent}% annual partner savings
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                      <span className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
                        What is included:
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

          <div className="mt-12 text-center">
            <Button variant="ghost" onClick={() => onNavigate('/pricing')}>
              View Detailed Scope Comparison Matrix →
            </Button>
          </div>
        </div>
      </section>

      {/* 8. FAQ Section */}
      <section className="py-20 bg-white dark:bg-slate-900/60 border-t border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Clear Answers
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <Accordion items={GENERAL_FAQS} defaultOpenId="pricing-currency" />

          <div className="mt-8 text-center">
            <Button variant="ghost" onClick={() => onNavigate('/faq')}>
              Search All Agency FAQs →
            </Button>
          </div>
        </div>
      </section>

      {/* 9. Final Call to Action */}
      <section className="py-20 bg-slate-950 text-white relative overflow-hidden border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
            Immediate Capacity Available
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white text-balance">
            Let's Build Something That Grows Your Business.
          </h2>
          <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Book a 30-minute diagnostic session with our Senior Growth Strategist. We'll examine your historical performance, dissect current bottlenecks, and map out a high-ROI growth roadmap.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              onClick={onOpenBooking}
              className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 w-full sm:w-auto"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Book a Free Consultation
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onNavigate('/contact')}
              className="border-slate-700 text-white hover:bg-slate-900 w-full sm:w-auto"
            >
              Start Your Project
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
