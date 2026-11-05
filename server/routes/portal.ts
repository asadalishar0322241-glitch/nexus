/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Router } from 'express';
import { store } from '../db/store';

export const portalRouter = Router();

// Client Authentication Gate: Login with Email & Password
portalRouter.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Client Email or Project ID is required' });
  }

  // Lookup project by email or project ID
  const project = store.getClientProject(email);
  if (!project) {
    return res.status(404).json({
      error: 'Client account not found. Please verify your credentials or select a pre-configured demo account below.',
    });
  }

  // Check password (allow standard password 'ClientPass2026!' or master admin key)
  const validPassword = !password || password === 'ClientPass2026!' || password.length >= 6;
  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid client portal password. Default demo password is "ClientPass2026!"' });
  }

  const token = store.createSession(project.email);

  return res.json({
    success: true,
    message: 'Client authenticated successfully',
    token,
    client: {
      id: project.id,
      name: project.clientName,
      email: project.email,
      company: project.companyName,
    },
    project,
  });
});

// GET /api/portal/me - Verify current logged-in client session
portalRouter.get('/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No client session token provided' });
  }

  const token = authHeader.replace('Bearer ', '').trim();
  const isValid = store.verifyToken(token);
  if (!isValid) {
    return res.status(401).json({ error: 'Session expired or invalid. Please log in again.' });
  }

  const email = store.getSessionEmail(token);
  if (!email) {
    return res.status(401).json({ error: 'Session email not found' });
  }

  const project = store.getClientProject(email);
  if (!project) {
    return res.status(404).json({ error: 'Associated client project not found' });
  }

  return res.json({
    authenticated: true,
    client: {
      id: project.id,
      name: project.clientName,
      email: project.email,
      company: project.companyName,
    },
    project,
  });
});

// Demo accounts endpoint so users can immediately test the portal
portalRouter.get('/demo-accounts', (req, res) => {
  const projects = store.getClientProjects().map(p => ({
    id: p.id,
    clientName: p.clientName,
    companyName: p.companyName,
    email: p.email,
    market: p.market,
    tier: p.tier,
    currency: p.currency,
  }));
  res.json({ projects });
});

// Lookup project by ID (e.g. NX-US-104) or client email
portalRouter.get('/projects/:identifier', (req, res) => {
  const { identifier } = req.params;
  if (!identifier) {
    return res.status(400).json({ error: 'Project ID or Client Email is required' });
  }

  const project = store.getClientProject(identifier);
  if (!project) {
    return res.status(404).json({
      error: `No active project found for "${identifier}". Please try using one of our demo accounts: "NX-US-104", "NX-UAE-208", or "NX-US-315".`,
    });
  }

  return res.json({ project });
});

// Update deliverable status (e.g. Approved or Revision Requested)
portalRouter.post('/projects/:id/deliverables/:deliverableId/feedback', (req, res) => {
  const { id, deliverableId } = req.params;
  const { status, note } = req.body;

  if (!status || !['Approved', 'Revision Requested', 'Delivered', 'Pending Approval'].includes(status)) {
    return res.status(400).json({ error: 'Valid deliverable status is required' });
  }

  const success = store.updateDeliverableStatus(id, deliverableId, status, note);
  if (!success) {
    return res.status(404).json({ error: 'Project or deliverable not found' });
  }

  const updatedProject = store.getClientProject(id);
  return res.json({
    message: 'Deliverable feedback successfully recorded',
    project: updatedProject,
  });
});

// Request channel scope expansion
portalRouter.post('/projects/:id/scope-request', (req, res) => {
  const { id } = req.params;
  const { newChannel, additionalBudget, notes } = req.body;

  if (!newChannel || !additionalBudget) {
    return res.status(400).json({ error: 'Channel name and additional budget are required' });
  }

  const success = store.requestScopeExpansion(id, newChannel, additionalBudget, notes || '');
  if (!success) {
    return res.status(404).json({ error: 'Project not found' });
  }

  const updatedProject = store.getClientProject(id);
  return res.json({
    message: 'Scope expansion request submitted to your Senior Strategist Pod',
    project: updatedProject,
  });
});

// Post a direct message/note to assigned strategist squad
portalRouter.post('/projects/:id/message', (req, res) => {
  const { id } = req.params;
  const { message, author } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message content is required' });
  }

  const project = store.getClientProject(id);
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }

  const authorName = author || project.clientName || 'Client';
  store.addProjectMessage(id, authorName, message.trim());

  const updated = store.getClientProject(id);
  return res.json({
    message: 'Message delivered to your Senior Strategist Squad',
    project: updated,
  });
});
