/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Shield, Cookie, Settings, Check, X, Info } from 'lucide-react';
import { Button } from '../ui/Button';
import { CookieConsentPreferences } from '../../types';

const STORAGE_KEY = 'nexus_cookie_consent';

export const CookieConsentBanner: React.FC = () => {
  const [preferences, setPreferences] = useState<CookieConsentPreferences | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Form draft state for custom preferences
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(true);

  useEffect(() => {
    // Check existing stored preferences
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: CookieConsentPreferences = JSON.parse(stored);
        setPreferences(parsed);
        setAnalyticsEnabled(parsed.analytics);
        setMarketingEnabled(parsed.marketing);
        setShowBanner(false);
      } else {
        // No preferences stored yet, display banner after a brief 1-second delay
        const timer = setTimeout(() => setShowBanner(true), 800);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.warn('Failed to read cookie preferences from localStorage', e);
      setShowBanner(true);
    }

    // Global listener so Footer & Legal pages can trigger preferences modal anytime
    const handleOpenSettings = () => {
      setShowModal(true);
    };

    window.addEventListener('nexus:open-cookie-settings', handleOpenSettings);
    return () => {
      window.removeEventListener('nexus:open-cookie-settings', handleOpenSettings);
    };
  }, []);

  const savePreferences = (analytics: boolean, marketing: boolean) => {
    const newPrefs: CookieConsentPreferences = {
      necessary: true,
      analytics,
      marketing,
      updatedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newPrefs));
    } catch (e) {
      console.warn('Failed to store cookie preferences', e);
    }
    setPreferences(newPrefs);
    setAnalyticsEnabled(analytics);
    setMarketingEnabled(marketing);
    setShowBanner(false);
    setShowModal(false);
  };

  const handleAcceptAll = () => {
    savePreferences(true, true);
  };

  const handleRejectNonEssential = () => {
    savePreferences(false, false);
  };

  const handleSaveCustom = () => {
    savePreferences(analyticsEnabled, marketingEnabled);
  };

  return (
    <>
      {/* 1. Bottom Slide-up Banner */}
      {showBanner && !showModal && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-xl z-50 animate-in fade-in slide-in-from-bottom duration-300">
          <div className="bg-slate-900/95 dark:bg-slate-900/95 backdrop-blur-md text-slate-200 border border-slate-700/80 rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 shrink-0">
                <Cookie className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <span>Privacy & Cookie Consent</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-900/60 text-blue-300 border border-blue-700/50">
                    GDPR / CCPA
                  </span>
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  We use cookies and telemetry strictly to protect platform security, remember your multi-currency preferences, analyze aggregate traffic, and measure marketing campaigns.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2 pt-1 border-t border-slate-800">
              <button
                onClick={() => setShowModal(true)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 font-medium"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Customize</span>
              </button>
              <button
                onClick={handleRejectNonEssential}
                className="px-3.5 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors font-medium"
              >
                Reject Non-Essential
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-1.5 text-xs bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors font-semibold shadow-sm"
              >
                Accept All Cookies
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Granular Preference Manager Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Cookie & Privacy Preferences
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Manage consent settings under EU GDPR, UK GDPR, and California CCPA regulations.
                </p>
              </div>
            </div>

            {/* Granular Categories */}
            <div className="space-y-4">
              {/* Category 1: Strictly Necessary */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      1. Strictly Necessary Cookies
                    </span>
                    <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400">
                      Always Active
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={true}
                    disabled
                    className="w-4 h-4 text-blue-600 rounded opacity-70 cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Required for site security, CSRF protection, remembering your selected currency (USD/GBP/AED), and authenticated access to the admin client portal.
                </p>
              </div>

              {/* Category 2: Performance & Analytics */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      2. Performance & Analytics Cookies
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Google Analytics 4 & Core Web Vitals
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={analyticsEnabled}
                      onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Enables us to measure anonymous traffic patterns, page load times, and conversion funnels to continuously improve user experience.
                </p>
              </div>

              {/* Category 3: Marketing & Retargeting */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      3. Marketing & Advertising Attribution
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Meta Pixel, LinkedIn Tag, Google Ads
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={marketingEnabled}
                      onChange={(e) => setMarketingEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Used by our media channels to track ad campaign efficacy and serve relevant B2B marketing insights.
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={handleRejectNonEssential}
                className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Reject All Non-Essential
              </button>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 sm:flex-initial px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  Accept All
                </button>
                <button
                  onClick={handleSaveCustom}
                  className="flex-1 sm:flex-initial px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-sm"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
