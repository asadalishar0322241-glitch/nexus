/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, Sparkles, HelpCircle } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Accordion } from '../components/ui/Accordion';
import { SERVICES_DATA } from '../data/services';
import { CASE_STUDIES_DATA } from '../data/portfolio';
import { SEOHead } from '../components/seo/SEOHead';
import { buildServiceSchema, buildBreadcrumbSchema } from '../utils/seoSchemas';

interface ServiceDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  slug,
  onNavigate,
  onOpenBooking,
}) => {
  const { formatPrice } = useCurrency();
  const service = SERVICES_DATA.find((s) => s.slug === slug) || SERVICES_DATA[0];

  const relevantCaseStudies = CASE_STUDIES_DATA.filter((cs) =>
    cs.servicesProvided.some(sp => sp.toLowerCase().includes(service.title.toLowerCase()) || service.title.toLowerCase().includes(sp.toLowerCase()))
  );

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: service.title, path: `/services/${service.slug}` },
  ];

  const combinedJsonLd = [
    buildServiceSchema(service),
    buildBreadcrumbSchema(breadcrumbs),
  ];

  return (
    <div className="py-12 sm:py-20">
      <SEOHead
        title={`${service.title} Services — International Growth Solutions`}
        description={service.shortDescription}
        path={`/services/${service.slug}`}
        type="service"
        jsonLd={combinedJsonLd}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Breadcrumb / Back button */}
        <div>
          <button
            onClick={() => onNavigate('/services')}
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white inline-flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to All Services
          </button>
        </div>

        {/* 1. Service Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              <span>Enterprise Capability</span>
              <span aria-hidden="true">·</span>
              <span>{service.category.toUpperCase()}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {service.title}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {service.tagline}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {service.shortDescription}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Button size="lg" onClick={onOpenBooking} rightIcon={<ArrowRight className="w-4 h-4" />}>
                Book a Strategy Call for {service.title}
              </Button>
              <div className="text-xs text-slate-500">
                Starting from <span className="font-bold text-slate-900 dark:text-white text-sm tabular-nums">{formatPrice(service.startingPrice.USD)}/month</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              Verified Performance Sample
            </h3>
            <div className="space-y-4 pt-2">
              {service.verifiedMetricsSample.map((metric, i) => (
                <div key={i} className="pb-3 border-b border-slate-800 last:border-none">
                  <div className="text-2xl font-bold text-blue-400 tabular-nums">
                    {metric.value}
                  </div>
                  <div className="text-xs font-medium text-slate-200 mt-0.5">
                    {metric.label}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {metric.context}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2 & 3. Problems We Solve vs Our Solutions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          <div className="bg-red-50/50 dark:bg-red-950/20 border border-red-200/80 dark:border-red-900/50 rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-base font-bold text-red-900 dark:text-red-300 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              Critical Business Problems We Solve
            </h3>
            <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
              {service.problemsSolved.map((prob, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-500 font-bold shrink-0">✕</span>
                  <span>{prob}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/50 rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-base font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Our Engineered Solutions
            </h3>
            <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
              {service.solutions.map((sol, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold shrink-0">✓</span>
                  <span>{sol}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 4 & 6. Key Benefits & Concrete Deliverables */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Strategic Advantages
            </span>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Why This Channel Transforms Growth
            </h3>
            <div className="space-y-3 pt-2">
              {service.keyBenefits.map((benefit, i) => (
                <div key={i} className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {benefit}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-4">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Tangible Assets
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Exact Deliverables Included
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {service.deliverables.map((item, i) => (
                <div key={i} className="flex items-start gap-2 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 7. Working Process for This Service */}
        <div className="space-y-6">
          <div>
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Step-by-Step Delivery
            </span>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              How We Execute {service.title}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.workingProcess.map((step) => (
              <div
                key={step.step}
                className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2"
              >
                <div className="text-xl font-bold text-blue-600 dark:text-blue-400 font-mono">
                  0{step.step}.
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 8. Relevant Case Studies */}
        {relevantCaseStudies.length > 0 && (
          <div className="space-y-6 pt-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Relevant Case Studies & Client Outcomes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relevantCaseStudies.map((cs) => (
                <Card key={cs.id} className="space-y-4">
                  <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 uppercase">
                    {cs.clientIndustry} · {cs.targetRegion}
                  </span>
                  <h4 className="font-bold text-base text-slate-900 dark:text-white">
                    {cs.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {cs.strategy}
                  </p>
                  <div className="pt-2 flex gap-4 text-xs font-bold text-blue-600 dark:text-blue-400">
                    {cs.outcomes.slice(0, 2).map((m, i) => (
                      <div key={i}>
                        <div className="text-base">{m.value}</div>
                        <div className="text-[10px] text-slate-400 font-normal">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* 9. FAQs */}
        {service.faq && service.faq.length > 0 && (
          <div className="space-y-6 max-w-4xl pt-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Questions About {service.title}
            </h3>
            <Accordion
              items={service.faq.map((f, i) => ({
                id: `service-faq-${i}`,
                title: f.question,
                content: f.answer,
              }))}
            />
          </div>
        )}

        {/* 10. Consultation CTA */}
        <div className="bg-slate-950 text-white rounded-2xl p-8 sm:p-12 text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            Ready to accelerate your {service.title}?
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            Speak directly with our practice director to analyze current metrics and structure a custom campaign sprint.
          </p>
          <div className="pt-2">
            <Button size="lg" onClick={onOpenBooking} className="bg-blue-600 hover:bg-blue-500 text-white">
              Book a Strategy Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
