/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Router } from 'express';
import { store } from '../db/store';
import { notifications } from '../utils/notifications';

export const auditsRouter = Router();

auditsRouter.post('/', (req, res) => {
  try {
    const {
      websiteUrl,
      companyName,
      contactEmail,
      monthlyRevenueEstimate,
      primaryGoal,
      competitorUrl,
    } = req.body;

    if (!websiteUrl || !companyName || !contactEmail) {
      return res.status(400).json({ error: 'Website URL, company name, and contact email are required.' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
      return res.status(400).json({ error: 'Please enter a valid work email.' });
    }

    const audit = store.createAudit({
      websiteUrl: String(websiteUrl).trim(),
      companyName: String(companyName).trim(),
      contactEmail: String(contactEmail).trim().toLowerCase(),
      monthlyRevenueEstimate: monthlyRevenueEstimate || '$20k - $50k',
      primaryGoal: primaryGoal || 'Conversions',
      competitorUrl: competitorUrl ? String(competitorUrl).trim() : undefined,
      status: 'Pending Review',
      aiScore: Math.floor(Math.random() * 25) + 65, // Initial benchmark score 65-90
    });

    // Trigger automated audit queue notifications
    notifications.notifyNewAudit(audit);

    return res.status(201).json({
      success: true,
      message: 'Audit queued for inspection. Executive video analysis will arrive in 48 hours.',
      auditId: audit.id,
      audit,
    });
  } catch (error: any) {
    console.error('Failed to create audit request:', error);
    return res.status(500).json({ error: 'Internal server error while queueing audit.' });
  }
});

auditsRouter.get('/', (req, res) => {
  try {
    const audits = store.getAudits();
    return res.json({ success: true, count: audits.length, audits });
  } catch (error: any) {
    console.error('Failed to get audits:', error);
    return res.status(500).json({ error: 'Failed to retrieve audits.' });
  }
});

auditsRouter.patch('/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const allowed = ['Pending Review', 'Audit Generated', 'Sent to Client'];

    if (!allowed.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Allowed: ${allowed.join(', ')}` });
    }

    const updated = store.updateAuditStatus(id, status);
    if (!updated) {
      return res.status(404).json({ error: 'Audit not found.' });
    }

    return res.json({ success: true, audit: updated });
  } catch (error: any) {
    console.error('Failed to update audit status:', error);
    return res.status(500).json({ error: 'Failed to update audit status.' });
  }
});
