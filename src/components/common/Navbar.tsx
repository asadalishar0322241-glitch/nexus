/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { useCurrency, CURRENCY_CONFIGS } from '../../context/CurrencyContext';
import { CurrencyCode } from '../../types';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  onOpenBooking,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const { currency, setCurrency } = useCurrency();

  useEffect(() => {
    // Check initial dark mode preference
    const isDark = document.documentElement.classList.contains('dark') ||
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDark) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  };

  const navLinks = [
    { label: 'Services', path: '/services' },
    { label: 'Case Studies', path: '/portfolio' },
    { label: 'Process', path: '/process' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Simulator', path: '/simulator' },
    { label: 'About', path: '/about' },
    { label: 'Insights', path: '/blog' },
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-slate-950/90 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleLinkClick('/')}
            className="text-xl font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 text-left focus-visible:outline-none"
          >
            NEXUS<span className="text-blue-600">.</span>
          </button>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
            {navLinks.map(link => {
              const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
              return (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 font-semibold'
                      : 'border-transparent hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Currency selector, Dark mode toggle & Primary Action */}
          <div className="hidden sm:flex items-center gap-4 shrink-0">
            {/* Currency Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title="Select Currency (USD, GBP, AED)"
                aria-label="Currency Selector"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span className="tabular-nums font-semibold">{currency}</span>
              </button>

              {isCurrencyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-lg py-1 z-50">
                  {(['USD', 'GBP', 'AED'] as CurrencyCode[]).map(c => (
                    <button
                      key={c}
                      onClick={() => {
                        setCurrency(c);
                        setIsCurrencyDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${
                        currency === c
                          ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-semibold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <span>{CURRENCY_CONFIGS[c].flag}</span>
                        <span>{c}</span>
                      </span>
                      <span className="text-slate-400">{CURRENCY_CONFIGS[c].symbol.trim()}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle visual theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Client Portal Link */}
            <button
              onClick={() => handleLinkClick('/portal')}
              className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 whitespace-nowrap shrink-0 transition-colors"
            >
              Client Portal
            </button>

            {/* Zone 3 Primary Action */}
            <button
              onClick={onOpenBooking}
              className="px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-500/20 transition-colors whitespace-nowrap shrink-0"
            >
              Book Consultation
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-3 pb-6 space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs text-slate-500 font-medium">Currency</span>
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-md">
              {(['USD', 'GBP', 'AED'] as CurrencyCode[]).map(c => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-2 py-1 text-xs rounded font-medium transition-colors ${
                    currency === c
                      ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-1">
            {navLinks.map(link => (
              <button
                key={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  currentPath === link.path
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 font-semibold'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 space-y-2">
            <button
              onClick={() => handleLinkClick('/portal')}
              className="w-full py-2 text-center text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Client Portal Access
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 text-center text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
            >
              Book Free Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
