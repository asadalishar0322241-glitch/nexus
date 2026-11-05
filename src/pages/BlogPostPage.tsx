/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft, Clock, Calendar, User, Share2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { BLOG_POSTS } from '../data/blogPosts';
import { SEOHead } from '../components/seo/SEOHead';
import { buildArticleSchema, buildBreadcrumbSchema } from '../utils/seoSchemas';

interface BlogPostPageProps {
  slug: string;
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ slug, onNavigate, onOpenBooking }) => {
  const post = BLOG_POSTS.find((p) => p.slug === slug) || BLOG_POSTS[0];

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Insights', path: '/blog' },
    { name: post.title, path: `/blog/${post.slug}` },
  ];

  const jsonLd = [
    buildArticleSchema(post),
    buildBreadcrumbSchema(breadcrumbs),
  ];

  return (
    <article className="py-12 sm:py-20">
      <SEOHead
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        image={post.coverImage}
        type="article"
        jsonLd={jsonLd}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Navigation Back */}
        <div>
          <button
            onClick={() => onNavigate('/blog')}
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white inline-flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to All Insights
          </button>
        </div>

        {/* Article Header */}
        <header className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            <span>{post.category}</span>
            <span aria-hidden="true">·</span>
            <span>{post.publishedAt}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTimeMinutes} min read
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center font-bold text-blue-600 dark:text-blue-400">
                {post.author.name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-slate-900 dark:text-white">{post.author.name}</div>
                <div className="text-[11px] text-slate-400">{post.author.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {post.tags.map((t, idx) => (
                <span key={idx} className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[11px]">
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg">
          <img
            src={post.coverImage}
            alt={post.title}
            loading="lazy"
            decoding="async"
            className="w-full h-72 sm:h-96 object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Article Body Content */}
        <div className="prose dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300 space-y-6">
          {post.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white pt-4">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('#### ')) {
              return (
                <h4 key={idx} className="text-lg font-bold text-slate-900 dark:text-white pt-2">
                  {paragraph.replace('#### ', '')}
                </h4>
              );
            }
            if (paragraph.startsWith('- ')) {
              const items = paragraph.split('\n- ');
              return (
                <ul key={idx} className="list-disc pl-5 space-y-2">
                  {items.map((it, i) => (
                    <li key={i}>{it.replace('- ', '')}</li>
                  ))}
                </ul>
              );
            }
            if (paragraph.startsWith('1. ')) {
              const items = paragraph.split('\n');
              return (
                <ol key={idx} className="list-decimal pl-5 space-y-2">
                  {items.map((it, i) => (
                    <li key={i}>{it.replace(/^\d+\.\s/, '')}</li>
                  ))}
                </ol>
              );
            }
            return <p key={idx}>{paragraph}</p>;
          })}
        </div>

        {/* Author Bio Box */}
        <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-lg shrink-0">
            {post.author.name.charAt(0)}
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">Written by {post.author.name}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{post.author.role} at Nexus International Agency</div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              Advising international brands on enterprise data architecture, algorithmic acquisition, and scalable organic growth.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-slate-950 text-white rounded-2xl p-8 sm:p-10 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Need guidance deploying this architecture?
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Book a 30-minute technical review with our engineering and performance directors.
          </p>
          <Button onClick={onOpenBooking} className="bg-blue-600 hover:bg-blue-500 text-white">
            Schedule Technical Consultation
          </Button>
        </div>
      </div>
    </article>
  );
};
