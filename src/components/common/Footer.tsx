/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { currency, setCurrency } = useCurrency();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      try {
        await fetch('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
      } catch (err) {
        console.warn('Newsletter submission fallback', err);
      }
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-5">
            <div className="text-2xl font-bold tracking-tight text-white">
              NEXUS<span className="text-blue-500">.</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              An international performance and digital marketing agency delivering data-backed organic growth, performance media acquisition, high-converting digital product design, and strategic consulting.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Executive Marketing Digest
              </span>
              <form onSubmit={handleSubscribe} className="flex max-w-md gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your business email"
                  required
                  className="bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 w-full"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors shrink-0"
                >
                  Subscribe
                </button>
              </form>
              {isSubscribed && (
                <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Subscribed. Welcome to the Nexus Briefing.</span>
                </div>
              )}
            </div>
          </div>

          {/* Core Services */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Services</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('/services/seo')} className="hover:text-white transition-colors">
                  Search Engine Optimization
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/services/google-ads-ppc')} className="hover:text-white transition-colors">
                  Google Ads & Performance PPC
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/services/meta-ads')} className="hover:text-white transition-colors">
                  Meta & Paid Social Media
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/services/web-development')} className="hover:text-white transition-colors">
                  Web Design & CRO Engineering
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/services/ecommerce-marketing')} className="hover:text-white transition-colors">
                  E-Commerce Omnichannel Growth
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/services/email-marketing')} className="hover:text-white transition-colors">
                  Retention & Lifecycle Marketing
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Resources */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('/about')} className="hover:text-white transition-colors">
                  About Our Agency
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/portfolio')} className="hover:text-white transition-colors">
                  Case Studies & Results
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/process')} className="hover:text-white transition-colors">
                  Our 6-Phase Process
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/pricing')} className="hover:text-white transition-colors">
                  Multi-Currency Pricing
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/simulator')} className="hover:text-white transition-colors">
                  Growth ROI Simulator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/portal')} className="hover:text-white transition-colors">
                  Client Project Portal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/blog')} className="hover:text-white transition-colors">
                  Growth Insights Blog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/faq')} className="hover:text-white transition-colors">
                  Knowledge Base & FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Global Coordinates */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Global Hubs</h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div>
                <span className="font-semibold text-slate-200">United States:</span>
                <p>One World Trade Center, Suite 8500, New York, NY</p>
                <p className="text-slate-500 font-mono">+1 (800) 555-0199</p>
              </div>
              <div>
                <span className="font-semibold text-slate-200">United Kingdom:</span>
                <p>30 St Mary Axe (The Gherkin), London EC3A 8EP</p>
                <p className="text-slate-500 font-mono">+44 20 7946 0991</p>
              </div>
              <div>
                <span className="font-semibold text-slate-200">United Arab Emirates:</span>
                <p>DIFC Gate Precinct 4, Level 5, Dubai</p>
                <p className="text-slate-500 font-mono">+971 4 312 9000</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Legal, Currency, Copyright */}
        <div className="pt-8 mt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>© {new Date().getFullYear()} Nexus International Agency. All rights reserved.</span>
            <button onClick={() => onNavigate('/privacy')} className="hover:text-slate-300 transition-colors">
              Privacy Policy (GDPR / CCPA)
            </button>
            <button onClick={() => onNavigate('/terms')} className="hover:text-slate-300 transition-colors">
              Terms of Service
            </button>
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent('nexus:open-cookie-settings'));
              }}
              className="hover:text-slate-300 transition-colors"
            >
              Cookie Preferences
            </button>
            <button onClick={() => onNavigate('/dsar')} className="hover:text-emerald-400 text-slate-400 transition-colors">
              DSAR Rights Portal
            </button>
            <button onClick={() => onNavigate('/admin')} className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1 font-semibold">
              <span>Admin Portal</span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Active Currency:</span>
              <span className="font-semibold text-slate-300">{currency}</span>
            </div>
            <button
              onClick={() => onNavigate('/contact')}
              className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1"
            >
              Contact Us <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
