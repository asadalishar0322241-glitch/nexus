/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CurrencyProvider } from './context/CurrencyContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ConsultationModal } from './components/forms/ConsultationModal';
import { GeminiChatbotModal } from './components/ai/GeminiChatbotModal';
import { CookieConsentBanner } from './components/compliance/CookieConsentBanner';
import { MessageSquare, ArrowUp, Sparkles } from 'lucide-react';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { PricingPage } from './pages/PricingPage';
import { ProcessPage } from './pages/ProcessPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { ContactPage } from './pages/ContactPage';
import { BookConsultationPage } from './pages/BookConsultationPage';
import { AuditRequestPage } from './pages/AuditRequestPage';
import { FAQPage } from './pages/FAQPage';
import { LegalPage } from './pages/LegalPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { RoiSimulatorPage } from './pages/RoiSimulatorPage';
import { ClientDashboardPage } from './pages/ClientDashboardPage';

function AppRouter() {
  const [currentPath, setCurrentPath] = useState('/');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Listen for browser popstate
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);

    // Initial path from window
    if (window.location.pathname && window.location.pathname !== '/') {
      setCurrentPath(window.location.pathname);
    }

    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Route matching
  const renderPage = () => {
    if (currentPath === '/') {
      return (
        <HomePage
          onNavigate={handleNavigate}
          onOpenBooking={() => setIsBookingOpen(true)}
        />
      );
    }

    if (currentPath === '/about') {
      return (
        <AboutPage
          onNavigate={handleNavigate}
          onOpenBooking={() => setIsBookingOpen(true)}
        />
      );
    }

    if (currentPath === '/services') {
      return (
        <ServicesPage
          onNavigate={handleNavigate}
          onOpenBooking={() => setIsBookingOpen(true)}
        />
      );
    }

    if (currentPath.startsWith('/services/')) {
      const slug = currentPath.replace('/services/', '');
      return (
        <ServiceDetailPage
          slug={slug}
          onNavigate={handleNavigate}
          onOpenBooking={() => setIsBookingOpen(true)}
        />
      );
    }

    if (currentPath === '/portfolio') {
      return (
        <PortfolioPage
          onNavigate={handleNavigate}
          onOpenBooking={() => setIsBookingOpen(true)}
        />
      );
    }

    if (currentPath === '/pricing') {
      return (
        <PricingPage
          onNavigate={handleNavigate}
          onOpenBooking={() => setIsBookingOpen(true)}
        />
      );
    }

    if (currentPath === '/process') {
      return (
        <ProcessPage
          onNavigate={handleNavigate}
          onOpenBooking={() => setIsBookingOpen(true)}
        />
      );
    }

    if (currentPath === '/blog') {
      return (
        <BlogPage
          onNavigate={handleNavigate}
          onOpenBooking={() => setIsBookingOpen(true)}
        />
      );
    }

    if (currentPath.startsWith('/blog/')) {
      const slug = currentPath.replace('/blog/', '');
      return (
        <BlogPostPage
          slug={slug}
          onNavigate={handleNavigate}
          onOpenBooking={() => setIsBookingOpen(true)}
        />
      );
    }

    if (currentPath === '/contact') {
      return (
        <ContactPage
          onNavigate={handleNavigate}
          onOpenBooking={() => setIsBookingOpen(true)}
        />
      );
    }

    if (currentPath === '/book') {
      return <BookConsultationPage onNavigate={handleNavigate} />;
    }

    if (currentPath === '/audit') {
      return (
        <AuditRequestPage
          onNavigate={handleNavigate}
          onOpenBooking={() => setIsBookingOpen(true)}
        />
      );
    }

    if (currentPath === '/faq') {
      return (
        <FAQPage
          onNavigate={handleNavigate}
          onOpenBooking={() => setIsBookingOpen(true)}
        />
      );
    }

    if (currentPath === '/privacy' || currentPath === '/privacy-policy') {
      return <LegalPage initialTab="privacy" onNavigate={handleNavigate} />;
    }

    if (currentPath === '/terms') {
      return <LegalPage initialTab="terms" onNavigate={handleNavigate} />;
    }

    if (currentPath === '/cookies') {
      return <LegalPage initialTab="cookies" onNavigate={handleNavigate} />;
    }

    if (currentPath === '/dsar') {
      return <LegalPage initialTab="dsar" onNavigate={handleNavigate} />;
    }

    if (currentPath === '/admin') {
      return <AdminDashboardPage onNavigate={handleNavigate} />;
    }

    if (currentPath === '/simulator' || currentPath === '/roi-calculator') {
      return (
        <RoiSimulatorPage
          onNavigate={handleNavigate}
          onOpenBooking={() => setIsBookingOpen(true)}
        />
      );
    }

    if (
      currentPath === '/portal' ||
      currentPath === '/client-portal' ||
      currentPath === '/dashboard' ||
      currentPath === '/client-dashboard'
    ) {
      return (
        <ClientDashboardPage
          onNavigate={handleNavigate}
          onOpenBooking={() => setIsBookingOpen(true)}
        />
      );
    }

    // 404 Fallback
    return (
      <div className="py-28 text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
          404 — Page Not Found
        </h1>
        <p className="text-sm text-slate-500 max-w-sm mx-auto">
          The requested page could not be located on our agency platform.
        </p>
        <button
          onClick={() => handleNavigate('/')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold"
        >
          Return to Homepage
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Global Navigation */}
      <Navbar
        currentPath={currentPath}
        onNavigate={handleNavigate}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      {/* Main Dynamic Viewport */}
      <main className="flex-1">{renderPage()}</main>

      {/* Floating Senior Strategy Desk Advisory Trigger */}
      <button
        onClick={() => setIsChatOpen(true)}
        aria-label="Open Senior Strategy Advisory Desk"
        className="fixed bottom-22 right-6 z-40 px-3.5 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-full shadow-xl hover:shadow-slate-900/40 transition-all hover:scale-105 flex items-center gap-2 font-medium text-xs border border-slate-700/60"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span className="font-semibold tracking-wide">Strategy Desk</span>
      </button>

      {/* Floating WhatsApp Quick Connect Button */}
      <a
        href="https://wa.me/442079460991?text=Hello%20Nexus%20Agency%2C%20I%20would%20like%20to%20discuss%20a%20digital%20marketing%20strategy%20for%20my%20business."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Consultation"
        className="fixed bottom-6 right-6 z-40 p-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-xl hover:shadow-emerald-600/40 transition-all hover:scale-105 flex items-center justify-center"
      >
        <MessageSquare className="w-6 h-6" />
      </a>

      {/* Back to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="fixed bottom-6 left-6 z-40 p-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-full shadow-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-all hover:scale-105"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Global Consultation Modal */}
      <ConsultationModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      {/* Global Gemini 3.8 Flash AI Marketing Strategist Chatbot Modal */}
      <GeminiChatbotModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onOpenBooking={() => {
          setIsChatOpen(false);
          setIsBookingOpen(true);
        }}
      />

      {/* GDPR / CCPA Cookie Consent Banner & Preferences Manager */}
      <CookieConsentBanner />

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <CurrencyProvider>
      <AppRouter />
    </CurrencyProvider>
  );
}
