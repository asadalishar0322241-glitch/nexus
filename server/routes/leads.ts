/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Router } from 'express';
import { store } from '../db/store';
import { notifications } from '../utils/notifications';

export const leadsRouter = Router();

// POST /api/leads - Create a new lead from contact form / quote calculator
leadsRouter.post('/', (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      companyName,
      websiteUrl,
      country,
      serviceRequired,
      estimatedBudget,
      projectDetails,
      preferredCurrency,
      source,
    } = req.body;

    if (!fullName || !email || !phone || !companyName) {
      return res.status(400).json({ error: 'Full name, email, phone, and company are required fields.' });
    }

    // Email format validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid business email address.' });
    }

    const lead = store.createLead({
      fullName: String(fullName).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone).trim(),
      companyName: String(companyName).trim(),
      websiteUrl: websiteUrl ? String(websiteUrl).trim() : undefined,
      country: country || 'United States',
      serviceRequired: serviceRequired || 'General Consultation',
      estimatedBudget: estimatedBudget || 'Standard Tier',
      projectDetails: projectDetails ? String(projectDetails).trim() : 'No initial notes provided.',
      status: 'New',
      source: source || 'contact_form',
      preferredCurrency: preferredCurrency || 'USD',
    });

    // Trigger automated notification and confirmation workflow
    notifications.notifyNewLead(lead);

    return res.status(201).json({
      success: true,
      message: 'Inquiry received. A senior growth strategist will contact you within 4 business hours.',
      leadId: lead.id,
    });
  } catch (error: any) {
    console.error('Failed to create lead:', error);
    return res.status(500).json({ error: 'Internal server error while storing lead.' });
  }
});

// GET /api/leads - List all leads
leadsRouter.get('/', (req, res) => {
  try {
    const leads = store.getLeads();
    return res.json({ success: true, count: leads.length, leads });
  } catch (error: any) {
    console.error('Failed to get leads:', error);
    return res.status(500).json({ error: 'Failed to retrieve leads.' });
  }
});

// PATCH /api/leads/:id/status - Update lead status
leadsRouter.patch('/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowed = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Converted', 'Lost'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Must be one of: ${allowed.join(', ')}` });
    }

    const updated = store.updateLeadStatus(id, status);
    if (!updated) {
      return res.status(404).json({ error: 'Lead not found.' });
    }

    notifications.notifyStatusUpdate(updated, status);

    return res.json({ success: true, lead: updated });
  } catch (error: any) {
    console.error('Failed to update lead status:', error);
    return res.status(500).json({ error: 'Failed to update lead status.' });
  }
});

// POST /api/leads/:id/notes - Add internal note
leadsRouter.post('/:id/notes', (req, res) => {
  try {
    const { id } = req.params;
    const { author, note } = req.body;

    if (!note || typeof note !== 'string') {
      return res.status(400).json({ error: 'Note text is required.' });
    }

    const updated = store.addLeadNote(id, author || 'Admin', note.trim());
    if (!updated) {
      return res.status(404).json({ error: 'Lead not found.' });
    }

    return res.json({ success: true, lead: updated });
  } catch (error: any) {
    console.error('Failed to add note to lead:', error);
    return res.status(500).json({ error: 'Failed to add internal note.' });
  }
});
