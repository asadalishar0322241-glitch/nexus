/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Route handlers
import { leadsRouter } from './server/routes/leads';
import { bookingsRouter } from './server/routes/bookings';
import { auditsRouter } from './server/routes/audits';
import { newsletterRouter } from './server/routes/newsletter';
import { adminRouter } from './server/routes/admin';
import { chatRouter } from './server/routes/chat';
import { complianceRouter } from './server/routes/compliance';
import { portalRouter } from './server/routes/portal';
import { simulatorRouter } from './server/routes/simulator';

// Security and Protection Middleware
import {
  securityHeaders,
  createRateLimiter,
  sanitizeInputs,
  botShield,
} from './server/middleware/security';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Security response headers across all responses
app.use(securityHeaders);

// Body parsing with sanitization
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));
app.use(sanitizeInputs);

// General in-memory API rate limiter (80 requests / minute)
app.use('/api', createRateLimiter({
  windowMs: 60 * 1000,
  maxRequests: 80,
  message: 'API rate limit exceeded. Please wait 60 seconds before making additional requests.',
}));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    platform: 'Nexus International Digital Marketing Agency',
    timestamp: new Date().toISOString(),
    securityShield: 'active',
  });
});

// Serve robots.txt and sitemap.xml with strict headers
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.sendFile(path.resolve(__dirname, 'public', 'robots.txt'));
});

app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml');
  res.sendFile(path.resolve(__dirname, 'public', 'sitemap.xml'));
});

// Bot Shield honeypot & timing protection on inbound form submissions
app.use('/api/leads', botShield, leadsRouter);
app.use('/api/bookings', botShield, bookingsRouter);
app.use('/api/audits', botShield, auditsRouter);
app.use('/api/newsletter', botShield, newsletterRouter);
app.use('/api/compliance', botShield, complianceRouter);
app.use('/api/admin', adminRouter);
app.use('/api/chat', chatRouter);
app.use('/api/portal', portalRouter);
app.use('/api/simulator', botShield, simulatorRouter);

// Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static files
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Nexus Server] API & Full-Stack platform running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[Nexus Server] Failed to start:', err);
  process.exit(1);
});
