/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BASE_URL } from '../../utils/seoSchemas';

export interface SEOHeadProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article' | 'service';
  jsonLd?: Record<string, any> | Array<Record<string, any>>;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description = 'Premier international digital marketing agency delivering data-driven SEO, performance marketing, social media strategy, CRO, and consultation booking for US, UK, and UAE enterprises.',
  path = '',
  image = '/og-cover.jpg',
  type = 'website',
  jsonLd,
}) => {
  useEffect(() => {
    // 1. Document Title
    const formattedTitle = title
      ? `${title} | Nexus International Marketing`
      : 'Nexus International Digital Marketing Agency';
    document.title = formattedTitle;

    // Helper to safely set meta tag content
    const setMetaTag = (selector: string, attr: string, value: string) => {
      let element = document.querySelector(selector) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        if (selector.startsWith('meta[name=')) {
          element.setAttribute('name', selector.match(/meta\[name="([^"]+)"\]/)?.[1] || '');
        } else if (selector.startsWith('meta[property=')) {
          element.setAttribute('property', selector.match(/meta\[property="([^"]+)"\]/)?.[1] || '');
        }
        document.head.appendChild(element);
      }
      element.setAttribute(attr, value);
    };

    // Helper for canonical link tag
    const currentCanonicalUrl = `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentCanonicalUrl);

    // 2. Primary Meta Tags
    setMetaTag('meta[name="description"]', 'content', description);

    // 3. OpenGraph Social Share Card Tags
    setMetaTag('meta[property="og:title"]', 'content', formattedTitle);
    setMetaTag('meta[property="og:description"]', 'content', description);
    setMetaTag('meta[property="og:type"]', 'content', type);
    setMetaTag('meta[property="og:url"]', 'content', currentCanonicalUrl);
    setMetaTag('meta[property="og:site_name"]', 'content', 'Nexus International Digital Marketing Agency');
    setMetaTag('meta[property="og:image"]', 'content', image.startsWith('http') ? image : `${BASE_URL}${image}`);

    // 4. Twitter / X Card Tags
    setMetaTag('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'content', formattedTitle);
    setMetaTag('meta[name="twitter:description"]', 'content', description);
    setMetaTag('meta[name="twitter:image"]', 'content', image.startsWith('http') ? image : `${BASE_URL}${image}`);

    // 5. Schema.org JSON-LD structured data script
    if (jsonLd) {
      let scriptTag = document.getElementById('seo-json-ld') as HTMLScriptElement | null;
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'seo-json-ld';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(jsonLd);
    }

    return () => {
      // Optional cleanup on unmount
    };
  }, [title, description, path, image, type, jsonLd]);

  return null;
};
