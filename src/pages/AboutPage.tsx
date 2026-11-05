/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Globe, Shield, Zap, Target, Users, MapPin } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { SEOHead } from '../components/seo/SEOHead';
import { AgencyOfficeMeetingShowcase } from '../components/common/AgencyOfficeMeetingShowcase';

interface AboutPageProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <div className="py-12 sm:py-20">
      <SEOHead
        title="About Our Agency & Global Leadership"
        description="Learn about Nexus International: our senior-led growth engineering culture, values, proven methodologies, and international hubs in New York, London, and Dubai."
        path="/about"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            About Nexus International
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mt-2 leading-tight">
            We Are Growth Architects for the World’s Most Ambitious Brands
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
            Founded by veteran digital strategists and technical growth engineers, Nexus was built to eliminate the mediocrity, vanity metrics, and junior delegation rampant in traditional marketing agencies.
          </p>
        </div>

        {/* Real Human Agency Office & Executive Meeting Interactive Experience */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Inside Our Global Studios & Boardrooms
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Live Agency Operations & Client Reviews
              </h2>
            </div>
            <div className="text-xs text-slate-500">
              Interactive View · Switch between Office Studio, Boardrooms, and War Rooms
            </div>
          </div>
          <AgencyOfficeMeetingShowcase />
        </div>

        {/* Core Principles */}
        <div className="space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Our Operating Constitution
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              The Principles That Guide Every Strategy
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="space-y-3">
              <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Revenue Over Vanity
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                We never celebrate clicks, impressions, or followers that don’t translate into qualified pipeline and bottom-line profit.
              </p>
            </Card>

            <Card className="space-y-3">
              <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Senior-Only Execution
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Your campaigns are never passed down to junior interns. Every campaign is built and managed by specialists with 7+ years of experience.
              </p>
            </Card>

            <Card className="space-y-3">
              <Zap className="w-6 h-6 text-amber-500" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                High-Velocity Iteration
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Markets reward rapid feedback loops. We deploy continuous A/B creative experiments, test new hooks, and iterate weekly.
              </p>
            </Card>

            <Card className="space-y-3">
              <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                100% Asset Ownership
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                You retain complete, permanent ownership of your ad accounts, pixel data, custom scripts, and creative files. Zero lock-in.
              </p>
            </Card>
          </div>
        </div>

        {/* Executive Leadership & Practice Directors */}
        <div className="space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Leadership & Practice Directors
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Senior Practitioners Who Own Your Account
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
              Every client engagement is directly architected, led, and reviewed weekly by a practice partner—not delegated to junior account coordinators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4 shadow-sm hover:border-blue-500/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-blue-500 text-white flex items-center justify-center font-bold text-sm">
                  JT
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Julian Thorne</h3>
                  <p className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">Founder & Managing Partner</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                14+ years scaling multi-region commercial brands. Formerly senior strategist at WPP and growth advisor to 22 venture-backed scale-ups in London & NYC.
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                <span>Location</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">London Hub</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4 shadow-sm hover:border-blue-500/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-indigo-500 text-white flex items-center justify-center font-bold text-sm">
                  ER
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Elena Rostova</h3>
                  <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">VP, Performance Media</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Ex-Omnicom media lead. Engineered over $45M in lifetime Google & Meta ad spend with strict incremental ROAS attribution and server-side tracking pipelines.
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                <span>Location</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">New York Hub</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4 shadow-sm hover:border-blue-500/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-emerald-500 text-white flex items-center justify-center font-bold text-sm">
                  MV
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Marcus Vance</h3>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Head of Search Architecture</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Technical SEO pioneer specializing in JavaScript web rendering, programmatic hreflang networks, and organic entity positioning for global enterprise catalogs.
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                <span>Location</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">London Hub</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4 shadow-sm hover:border-blue-500/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-amber-500 text-white flex items-center justify-center font-bold text-sm">
                  CC
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Chloe Chen</h3>
                  <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">Director of CRO & UX Research</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Behavioral economist and former IDEO fellow. Conducted 240+ statistically rigorous split tests resulting in an average +38% conversion velocity lift for clients.
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                <span>Location</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">Dubai Hub</span>
              </div>
            </div>
          </div>
        </div>

        {/* Global Operational Presence */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 border border-slate-800 space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              International Footprint
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Active Regional Hubs
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Our distributed structure guarantees localized cultural nuance and business hour overlap across all target timezones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-800/60 rounded-xl border border-slate-700/80 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>New York City, United States</span>
              </div>
              <p className="text-xs text-slate-400">
                One World Trade Center, Suite 8500, New York, NY 10007
              </p>
              <div className="text-xs font-mono text-slate-400">
                Timezone: EST (UTC-5)
              </div>
            </div>

            <div className="p-6 bg-slate-800/60 rounded-xl border border-slate-700/80 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>London, United Kingdom</span>
              </div>
              <p className="text-xs text-slate-400">
                30 St Mary Axe (The Gherkin), 28th Floor, London EC3A 8EP
              </p>
              <div className="text-xs font-mono text-slate-400">
                Timezone: GMT / BST (UTC+0 / +1)
              </div>
            </div>

            <div className="p-6 bg-slate-800/60 rounded-xl border border-slate-700/80 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>Dubai, United Arab Emirates</span>
              </div>
              <p className="text-xs text-slate-400">
                DIFC Gate Precinct 4, Level 5, Downtown Dubai
              </p>
              <div className="text-xs font-mono text-slate-400">
                Timezone: GST (UTC+4)
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4 pt-6">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            Ready to partner with a senior digital marketing team?
          </h3>
          <Button size="lg" onClick={onOpenBooking} rightIcon={<ArrowRight className="w-4 h-4" />}>
            Book a Strategic Consultation
          </Button>
        </div>
      </div>
    </div>
  );
};
