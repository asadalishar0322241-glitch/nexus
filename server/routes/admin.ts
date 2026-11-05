/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Router } from 'express';
import { store } from '../db/store';
import { notifications } from '../utils/notifications';

export const adminRouter = Router();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@nexusagency.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'NexusAgency2026!';

// POST /api/admin/login
adminRouter.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    if (
      email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() &&
      password === ADMIN_PASSWORD
    ) {
      const token = store.createSession(email);
      return res.json({
        success: true,
        message: 'Authentication successful.',
        token,
        admin: {
          email: ADMIN_EMAIL,
          role: 'Agency Executive Admin',
        },
      });
    }

    return res.status(401).json({ error: 'Invalid administrator credentials.' });
  } catch (error: any) {
    console.error('Admin login failed:', error);
    return res.status(500).json({ error: 'Internal error during login.' });
  }
});

// GET /api/admin/me - Verify token
adminRouter.get('/me', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No authorization token provided.' });
    }

    const token = authHeader.replace('Bearer ', '').trim();
    const isValid = store.verifyToken(token);

    if (!isValid) {
      return res.status(401).json({ error: 'Session expired or invalid.' });
    }

    return res.json({
      success: true,
      authenticated: true,
      admin: {
        email: ADMIN_EMAIL,
        role: 'Agency Executive Admin',
      },
    });
  } catch (error: any) {
    console.error('Failed to verify token:', error);
    return res.status(500).json({ error: 'Session verification error.' });
  }
});

// GET /api/admin/stats - KPI aggregation
adminRouter.get('/stats', (req, res) => {
  try {
    const stats = store.getStats();
    return res.json({ success: true, stats });
  } catch (error: any) {
    console.error('Failed to get stats:', error);
    return res.status(500).json({ error: 'Failed to retrieve stats.' });
  }
});

// GET /api/admin/automations - Retrieve automation execution logs
adminRouter.get('/automations', (req, res) => {
  try {
    const logs = notifications.getLogs();
    return res.json({ success: true, count: logs.length, logs });
  } catch (error: any) {
    console.error('Failed to get automation logs:', error);
    return res.status(500).json({ error: 'Failed to retrieve automation logs.' });
  }
});

// GET /api/admin/diagnostics - Comprehensive System Health & Diagnostics
adminRouter.get('/diagnostics', (req, res) => {
  try {
    const leads = store.getLeads();
    const bookings = store.getBookings();
    const audits = store.getAudits();
    const subscribers = store.getSubscribers();
    const projects = store.getClientProjects();
    const simulations = store.getSimulations();
    const dsar = store.getDsarRequests();
    const logs = store.getSecurityLogs();

    const mem = process.memoryUsage();

    return res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.round(process.uptime()),
      environment: process.env.NODE_ENV || 'development',
      nodeVersion: process.version,
      memory: {
        rssMb: Math.round(mem.rss / (1024 * 1024)),
        heapUsedMb: Math.round(mem.heapUsed / (1024 * 1024)),
        heapTotalMb: Math.round(mem.heapTotal / (1024 * 1024)),
      },
      database: {
        status: 'healthy',
        records: {
          leads: leads.length,
          bookings: bookings.length,
          audits: audits.length,
          subscribers: subscribers.length,
          clientProjects: projects.length,
          simulations: simulations.length,
          dsarRequests: dsar.length,
          securityLogs: logs.length,
          total:
            leads.length +
            bookings.length +
            audits.length +
            subscribers.length +
            projects.length +
            simulations.length +
            dsar.length,
        },
      },
      services: {
        geminiAi: process.env.GEMINI_API_KEY ? 'connected' : 'fallback_mode',
        rateLimiting: 'active (80 req/min)',
        botShield: 'active (honeypot + velocity check)',
        securityHeaders: 'active (HSTS, CSP, X-Frame, Nosniff)',
        multiCurrency: 'active (USD, GBP, AED)',
        clientPortal: 'active (3 international client pods)',
        growthSimulator: 'active (multi-market financial model)',
      },
    });
  } catch (error: any) {
    console.error('Diagnostics check failed:', error);
    return res.status(500).json({ status: 'unhealthy', error: error.message });
  }
});

// GET /api/admin/backup - Download complete database snapshot
adminRouter.get('/backup', (req, res) => {
  try {
    const backupData = {
      agency: 'Nexus International Digital Marketing Agency LLC',
      backupCreatedAt: new Date().toISOString(),
      version: '2.0.0-phase10',
      data: {
        leads: store.getLeads(),
        bookings: store.getBookings(),
        audits: store.getAudits(),
        subscribers: store.getSubscribers(),
        clientProjects: store.getClientProjects(),
        simulations: store.getSimulations(),
        dsarRequests: store.getDsarRequests(),
        securityLogs: store.getSecurityLogs(),
      },
    };

    res.setHeader('Content-Disposition', `attachment; filename=nexus_backup_${Date.now()}.json`);
    res.setHeader('Content-Type', 'application/json');
    return res.send(JSON.stringify(backupData, null, 2));
  } catch (error: any) {
    console.error('Backup generation failed:', error);
    return res.status(500).json({ error: 'Failed to generate database backup' });
  }
});

