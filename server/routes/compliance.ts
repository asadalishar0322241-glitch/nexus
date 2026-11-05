/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Router } from 'express';
import { store, DsarRequest } from '../db/store';

export const complianceRouter = Router();

// POST /api/compliance/dsar - Submit a Data Subject Access Request (GDPR / CCPA)
complianceRouter.post('/dsar', (req, res) => {
  try {
    const {
      requestType,
      fullName,
      email,
      companyName,
      country,
      details,
    } = req.body;

    if (!requestType || !fullName || !email) {
      return res.status(400).json({
        error: 'Request type, full name, and valid email address are required.',
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    const validTypes = ['access_export', 'erasure_deletion', 'rectification', 'opt_out_sale', 'restriction'];
    if (!validTypes.includes(requestType)) {
      return res.status(400).json({
        error: `Invalid request type. Allowed types: ${validTypes.join(', ')}`,
      });
    }

    const newDsar = store.createDsarRequest({
      requestType,
      fullName: String(fullName).trim(),
      email: String(email).trim().toLowerCase(),
      companyName: companyName ? String(companyName).trim() : undefined,
      country: country || 'International',
      details: details ? String(details).trim() : 'No additional specifics provided.',
    });

    return res.status(201).json({
      success: true,
      ticketId: newDsar.id,
      message: 'Your Data Subject Access Request has been registered. Under GDPR/CCPA statutory obligations, our Data Protection Officer will review and verify identity within 30 days.',
      request: newDsar,
    });
  } catch (error: any) {
    console.error('Failed to create DSAR request:', error);
    return res.status(500).json({ error: 'Internal server error while recording compliance request.' });
  }
});

// GET /api/compliance/dsar/status - Public lookup of DSAR status via Ticket ID + Email
complianceRouter.get('/dsar/status', (req, res) => {
  try {
    const { ticket, email } = req.query;

    if (!ticket || !email) {
      return res.status(400).json({ error: 'Ticket ID and email are required to check status.' });
    }

    const dsar = store.getDsarById(String(ticket).trim());
    if (!dsar || dsar.email.toLowerCase() !== String(email).trim().toLowerCase()) {
      return res.status(404).json({ error: 'No matching request found for the provided Ticket ID and Email.' });
    }

    return res.json({
      success: true,
      request: {
        id: dsar.id,
        requestType: dsar.requestType,
        status: dsar.status,
        createdAt: dsar.createdAt,
        resolvedAt: dsar.resolvedAt,
        resolutionNotes: dsar.resolutionNotes,
      },
    });
  } catch (error: any) {
    console.error('Failed to query DSAR status:', error);
    return res.status(500).json({ error: 'Failed to look up request status.' });
  }
});

// GET /api/compliance/dsar/export - Download GDPR JSON portability package
complianceRouter.get('/dsar/export', (req, res) => {
  try {
    const { ticket, email } = req.query;
    if (!ticket || !email) {
      return res.status(400).json({ error: 'Ticket ID and email required for export package.' });
    }

    const dsar = store.getDsarById(String(ticket).trim());
    if (!dsar || dsar.email.toLowerCase() !== String(email).trim().toLowerCase()) {
      return res.status(404).json({ error: 'Unauthorized or invalid ticket.' });
    }

    const packageData = store.exportUserData(dsar.email);
    res.setHeader('Content-Disposition', `attachment; filename="nexus-gdpr-export-${dsar.id}.json"`);
    res.setHeader('Content-Type', 'application/json');
    return res.send(JSON.stringify(packageData, null, 2));
  } catch (error: any) {
    console.error('Failed to export user data:', error);
    return res.status(500).json({ error: 'Failed to generate portability export.' });
  }
});

// GET /api/compliance/admin/dsar - List all requests (Admin)
complianceRouter.get('/admin/dsar', (req, res) => {
  try {
    const requests = store.getDsarRequests();
    return res.json({ success: true, count: requests.length, requests });
  } catch (error: any) {
    console.error('Failed to get DSAR requests:', error);
    return res.status(500).json({ error: 'Failed to retrieve DSAR requests.' });
  }
});

// PATCH /api/compliance/admin/dsar/:id - Update DSAR status
complianceRouter.patch('/admin/dsar/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { status, resolutionNotes } = req.body;

    const allowed = ['Pending Verification', 'Under Review', 'Fulfilled', 'Rejected'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Must be one of: ${allowed.join(', ')}` });
    }

    const updated = store.updateDsarStatus(id, status, resolutionNotes);
    if (!updated) {
      return res.status(404).json({ error: 'DSAR request not found.' });
    }

    return res.json({ success: true, request: updated });
  } catch (error: any) {
    console.error('Failed to update DSAR status:', error);
    return res.status(500).json({ error: 'Failed to update request.' });
  }
});

// POST /api/compliance/admin/dsar/:id/fulfill-erasure - Execute GDPR Right to be Forgotten
complianceRouter.post('/admin/dsar/:id/fulfill-erasure', (req, res) => {
  try {
    const { id } = req.params;
    const dsar = store.getDsarById(id);
    if (!dsar) {
      return res.status(404).json({ error: 'DSAR ticket not found.' });
    }

    const result = store.fulfillErasure(dsar.email);
    store.updateDsarStatus(
      id,
      'Fulfilled',
      `Data scrub executed: ${result.leadsAnonymized} leads redacted, ${result.bookingsAnonymized} consultations redacted, ${result.subscribersRemoved} subscriptions removed.`
    );

    return res.json({
      success: true,
      message: 'Personal identifying information scrubbed across all agency databases.',
      result,
    });
  } catch (error: any) {
    console.error('Failed to fulfill erasure:', error);
    return res.status(500).json({ error: 'Failed to execute data erasure.' });
  }
});

// GET /api/compliance/admin/security-logs - Security Audit Trail
complianceRouter.get('/admin/security-logs', (req, res) => {
  try {
    const logs = store.getSecurityLogs();
    return res.json({ success: true, count: logs.length, logs });
  } catch (error: any) {
    console.error('Failed to get security logs:', error);
    return res.status(500).json({ error: 'Failed to retrieve security logs.' });
  }
});
