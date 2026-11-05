/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
  }
}

export interface AnalyticsEventPayload {
  eventName: string;
  parameters?: Record<string, any>;
}

class AnalyticsService {
  private gaId: string | undefined;
  private gtmId: string | undefined;
  private metaPixelId: string | undefined;
  private isInitialized = false;

  constructor() {
    this.gaId = (import.meta as any).env?.VITE_GA_MEASUREMENT_ID;
    this.gtmId = (import.meta as any).env?.VITE_GTM_CONTAINER_ID;
    this.metaPixelId = (import.meta as any).env?.VITE_META_PIXEL_ID;
    this.initialize();
  }

  private initialize() {
    if (typeof window === 'undefined') return;

    // Ensure dataLayer exists
    window.dataLayer = window.dataLayer || [];

    // Initialize Meta Pixel if ID is configured
    if (this.metaPixelId && typeof window.fbq === 'undefined') {
      const fbqFunction: any = function (...args: any[]) {
        fbqFunction.callMethod ? fbqFunction.callMethod.apply(fbqFunction, args) : fbqFunction.queue.push(args);
      };
      fbqFunction.push = fbqFunction;
      fbqFunction.loaded = true;
      fbqFunction.version = '2.0';
      window.fbq = fbqFunction;
      fbqFunction('init', this.metaPixelId);
    }

    this.isInitialized = true;
  }

  /**
   * Track high-level event across GTM dataLayer, GA4, and Meta Pixel
   */
  public trackEvent(eventName: string, parameters: Record<string, any> = {}) {
    if (typeof window === 'undefined') return;

    const eventData = {
      event: eventName,
      timestamp: new Date().toISOString(),
      ...parameters,
    };

    // 1. Google Tag Manager dataLayer push
    window.dataLayer?.push(eventData);

    // 2. Google Analytics 4
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, parameters);
    }

    // 3. Meta Pixel (Standard & Custom Events)
    if (typeof window.fbq === 'function') {
      if (eventName === 'generate_lead') {
        window.fbq('track', 'Lead', {
          content_name: parameters.serviceRequired,
          currency: parameters.currency || 'USD',
          value: parameters.value || 0,
        });
      } else if (eventName === 'schedule_consultation') {
        window.fbq('track', 'Schedule', {
          content_name: parameters.primaryChallenge,
        });
      } else {
        window.fbq('trackCustom', eventName, parameters);
      }
    }

    // Diagnostic console logging in dev environment
    if ((import.meta as any).env?.DEV) {
      console.log(`[Analytics Event: ${eventName}]`, eventData);
    }
  }

  // Pre-configured conversion events
  public trackPageView(path: string) {
    this.trackEvent('page_view', { page_path: path });
  }

  public trackLeadSubmission(service: string, currency: string, budget: string) {
    this.trackEvent('generate_lead', {
      serviceRequired: service,
      currency,
      estimatedBudget: budget,
    });
  }

  public trackConsultationBooking(date: string, timeSlot: string, timezone: string, challenge: string) {
    this.trackEvent('schedule_consultation', {
      scheduledDate: date,
      scheduledTimeSlot: timeSlot,
      timezone,
      primaryChallenge: challenge,
    });
  }

  public trackMarketingAuditRequest(websiteUrl: string, goal: string) {
    this.trackEvent('request_audit', {
      websiteUrl,
      diagnosticGoal: goal,
    });
  }

  public trackNewsletterSubscription(email: string) {
    this.trackEvent('newsletter_subscribe', {
      subscriptionSource: 'footer_digest',
    });
  }

  public trackWhatsAppClick(serviceContext?: string) {
    this.trackEvent('click_whatsapp', {
      serviceContext: serviceContext || 'General Inquiry',
    });
  }

  public getStatus() {
    return {
      ga4: {
        configured: Boolean(this.gaId),
        id: this.gaId || 'Not Configured (Set VITE_GA_MEASUREMENT_ID)',
      },
      gtm: {
        configured: Boolean(this.gtmId),
        id: this.gtmId || 'Not Configured (Set VITE_GTM_CONTAINER_ID)',
      },
      metaPixel: {
        configured: Boolean(this.metaPixelId),
        id: this.metaPixelId || 'Not Configured (Set VITE_META_PIXEL_ID)',
      },
      dataLayerReady: Boolean(typeof window !== 'undefined' && window.dataLayer),
    };
  }
}

export const analytics = new AnalyticsService();
