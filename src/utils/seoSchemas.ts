/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceDetail, BlogArticle } from '../types';

export const BASE_URL = 'https://nexus-agency.com';

/**
 * ProfessionalService / Organization Schema.org JSON-LD
 */
export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${BASE_URL}/#organization`,
    name: 'Nexus International Digital Marketing Agency',
    alternateName: 'Nexus Marketing Agency',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    image: `${BASE_URL}/og-cover.jpg`,
    description: 'Premier international digital marketing agency providing data-driven SEO, PPC, paid social advertising, high-conversion web engineering, CRO, and strategic brand consulting.',
    priceRange: '$$$$',
    currenciesAccepted: 'USD, GBP, AED',
    paymentAccepted: 'Credit Card, Wire Transfer, ACH',
    telephone: '+1-555-019-8421',
    email: 'contact@nexusagency.com',
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: '350 5th Avenue, Suite 4800',
        addressLocality: 'New York',
        addressRegion: 'NY',
        postalCode: '10118',
        addressCountry: 'US',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: '25 Bank Street, Canary Wharf',
        addressLocality: 'London',
        postalCode: 'E14 5JP',
        addressCountry: 'GB',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'Level 14, Boulevard Plaza Tower 1, Downtown',
        addressLocality: 'Dubai',
        addressCountry: 'AE',
      },
    ],
    areaServed: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'United Arab Emirates' },
      { '@type': 'Country', name: 'Worldwide' },
    ],
    sameAs: [
      'https://www.linkedin.com/company/nexus-agency',
      'https://twitter.com/nexus_agency',
      'https://instagram.com/nexus_agency',
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '19:00',
      },
    ],
  };
}

/**
 * Service Schema.org JSON-LD
 */
export function buildServiceSchema(service: ServiceDetail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${BASE_URL}/services/${service.slug}#service`,
    name: service.title,
    serviceType: service.title,
    provider: {
      '@type': 'ProfessionalService',
      name: 'Nexus International Digital Marketing Agency',
      url: BASE_URL,
    },
    description: service.shortDescription,
    category: service.category,
    offers: {
      '@type': 'Offer',
      price: service.startingPrice.USD,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `${BASE_URL}/services/${service.slug}`,
    },
    termsOfService: `${BASE_URL}/terms`,
  };
}

/**
 * FAQPage Schema.org JSON-LD
 */
export function buildFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * BlogPosting Schema.org JSON-LD
 */
export function buildArticleSchema(post: BlogArticle) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${BASE_URL}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Nexus International Digital Marketing Agency',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${post.slug}`,
    },
  };
}

/**
 * BreadcrumbList Schema.org JSON-LD
 */
export function buildBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.path}`,
    })),
  };
}
