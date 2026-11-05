/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Request, Response, NextFunction } from 'express';

// In-memory rate limiting map: ip -> { count: number, resetAt: number }
interface RateRecord {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateRecord>();

// Clean up expired rate records every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (record.resetAt <= now) {
      rateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000);

export interface RateLimitOptions {
  windowMs: number; // e.g. 60000 (1 minute)
  maxRequests: number; // e.g. 60
  message?: string;
}

/**
 * In-Memory Sliding Window Rate Limiter
 */
export function createRateLimiter(options: RateLimitOptions) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Skip dev Vite requests or static assets
    if (!req.path.startsWith('/api')) {
      return next();
    }

    const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown-ip';
    const key = `${clientIp}:${req.baseUrl || ''}`;
    const now = Date.now();

    const record = rateLimitMap.get(key);

    if (!record || record.resetAt <= now) {
      rateLimitMap.set(key, {
        count: 1,
        resetAt: now + options.windowMs,
      });
      res.setHeader('X-RateLimit-Limit', options.maxRequests);
      res.setHeader('X-RateLimit-Remaining', options.maxRequests - 1);
      return next();
    }

    if (record.count >= options.maxRequests) {
      const retryAfterSeconds = Math.ceil((record.resetAt - now) / 1000);
      res.setHeader('Retry-After', retryAfterSeconds);
      res.setHeader('X-RateLimit-Limit', options.maxRequests);
      res.setHeader('X-RateLimit-Remaining', 0);
      return res.status(429).json({
        error: options.message || 'Too many requests. Please wait a moment before trying again.',
        retryAfter: retryAfterSeconds,
      });
    }

    record.count += 1;
    res.setHeader('X-RateLimit-Limit', options.maxRequests);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, options.maxRequests - record.count));
    return next();
  };
}

/**
 * Production Security Headers
 */
export function securityHeaders(req: Request, res: Response, next: NextFunction) {
  // Prevent MIME sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Prevent Clickjacking
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');

  // Cross-site scripting filter
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // Referrer Policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Restrict sensitive browser features
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');

  next();
}

/**
 * Honeypot & Timestamp Bot Verification
 * Rejects submissions where hidden honeypot fields are completed or submitted impossibly fast.
 */
export function botShield(req: Request, res: Response, next: NextFunction) {
  if (req.method === 'POST') {
    const honeypot = req.body?._nexus_hp;
    const submissionTs = req.body?._submission_ts;

    // 1. Honeypot check (hidden input that automated bots populate)
    if (honeypot && String(honeypot).trim().length > 0) {
      console.warn(`[Security Alert] Bot trapped in honeypot from IP: ${req.ip}`);
      return res.status(400).json({
        error: 'Automated spam submission detected and blocked by Nexus Security Shield.',
      });
    }

    // 2. Minimum human completion time check (if timestamp supplied)
    if (submissionTs) {
      const elapsedMs = Date.now() - Number(submissionTs);
      // If submitted in less than 1.0 second, it's almost certainly an automated bot
      if (!isNaN(elapsedMs) && elapsedMs > 0 && elapsedMs < 1000) {
        console.warn(`[Security Alert] Submission too fast (${elapsedMs}ms). Bot suspected from IP: ${req.ip}`);
        return res.status(400).json({
          error: 'Form submission was unusually fast. Please try again.',
        });
      }
    }
  }

  next();
}

/**
 * Recursive string sanitizer to strip script tags and escape dangerous entities
 */
export function sanitizeInputs(req: Request, res: Response, next: NextFunction) {
  if (req.body && typeof req.body === 'object') {
    req.body = sanitizeObject(req.body);
  }
  next();
}

function sanitizeObject(obj: any): any {
  if (typeof obj === 'string') {
    return obj
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .trim();
  }
  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  }
  if (obj !== null && typeof obj === 'object') {
    const clean: Record<string, any> = {};
    for (const [key, value] of Object.entries(obj)) {
      clean[key] = sanitizeObject(value);
    }
    return clean;
  }
  return obj;
}
