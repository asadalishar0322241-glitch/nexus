/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Lead, ConsultationBooking, MarketingAuditRequest } from '../db/store';

export interface AutomationLog {
  id: string;
  timestamp: string;
  workflowName: string;
  recipient: string;
  subject: string;
  status: 'Dispatched' | 'Simulated' | 'Failed';
  summary: string;
}

class NotificationEngine {
  private logs: AutomationLog[] = [];

  constructor() {
    // Initial activity logs
    this.logs.push(
      {
        id: 'log-1',
        timestamp: '2026-11-03T18:05:05Z',
        workflowName: 'New Lead Auto-Responder',
        recipient: 'jessica@synapseflow.io',
        subject: 'Inquiry Confirmation — Nexus International Growth Advisory',
        status: 'Dispatched',
        summary: 'Customer acknowledgment sent with 4-hour SLA guarantee.',
      },
      {
        id: 'log-2',
        timestamp: '2026-11-03T18:05:06Z',
        workflowName: 'Internal Lead Alert',
        recipient: 'directors@nexusagency.com',
        subject: 'URGENT: New Inbound Brief from SynapseFlow SaaS ($10k-$25k/mo)',
        status: 'Dispatched',
        summary: 'Lead summary dispatched to US growth squad Slack webhook.',
      }
    );
  }

  public getLogs(): AutomationLog[] {
    return [...this.logs].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  private addLog(log: Omit<AutomationLog, 'id' | 'timestamp'>) {
    const entry: AutomationLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      timestamp: new Date().toISOString(),
      ...log,
    };
    this.logs.unshift(entry);
    if (this.logs.length > 50) this.logs.pop();
    console.log(`[Automation Workflow: ${log.workflowName}]`, entry);
  }

  // Workflow 1: New Lead Notification & Customer Confirmation
  public async notifyNewLead(lead: Lead) {
    // 1. Admin Alert
    this.addLog({
      workflowName: 'Internal Inbound Lead Alert',
      recipient: 'directors@nexusagency.com',
      subject: `[NEW INQUIRY] ${lead.companyName} (${lead.country}) — ${lead.estimatedBudget}`,
      status: 'Dispatched',
      summary: `Prospect ${lead.fullName} requested ${lead.serviceRequired} with budget ${lead.estimatedBudget} (${lead.preferredCurrency}).`,
    });

    // 2. Customer Confirmation Email
    this.addLog({
      workflowName: 'Customer Inquiry Confirmation',
      recipient: lead.email,
      subject: `We've Received Your Marketing Brief — Nexus International`,
      status: 'Dispatched',
      summary: `Confirmed receipt for ${lead.fullName}. Guaranteed response within 4 business hours from New York/London/Dubai hub.`,
    });

    // 3. Webhook Dispatch if configured
    const webhookUrl = process.env.CRM_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ event: 'lead.created', lead }),
        });
        this.addLog({
          workflowName: 'CRM Webhook Sync',
          recipient: webhookUrl,
          subject: 'External CRM HTTP POST',
          status: 'Dispatched',
          summary: `Lead ${lead.id} forwarded to enterprise CRM webhook.`,
        });
      } catch (err: any) {
        this.addLog({
          workflowName: 'CRM Webhook Sync',
          recipient: webhookUrl,
          subject: 'External CRM HTTP POST',
          status: 'Failed',
          summary: `Failed to post to CRM webhook: ${err?.message}`,
        });
      }
    }
  }

  // Workflow 2: Consultation Booking Confirmation
  public async notifyNewBooking(booking: ConsultationBooking) {
    // 1. Internal Strategist Alert
    this.addLog({
      workflowName: 'Consultation Calendar Alert',
      recipient: 'calendar@nexusagency.com',
      subject: `[CONFIRMED] Consultation with ${booking.fullName} (${booking.company}) on ${booking.scheduledDate}`,
      status: 'Dispatched',
      summary: `Slot reserved for ${booking.scheduledTimeSlot} (${booking.timeZone}) on challenge: ${booking.primaryChallenge}.`,
    });

    // 2. Client Calendar Invite Confirmation
    this.addLog({
      workflowName: 'Client Calendar Invitation',
      recipient: booking.email,
      subject: `Confirmed: 45-Minute Growth Consultation with Nexus Director`,
      status: 'Dispatched',
      summary: `Google Meet link & agenda briefing dispatched to ${booking.fullName}.`,
    });
  }

  // Workflow 3: Marketing Audit Request
  public async notifyNewAudit(audit: MarketingAuditRequest) {
    this.addLog({
      workflowName: 'Technical Audit Queue Alert',
      recipient: 'audits@nexusagency.com',
      subject: `[AUDIT QUEUED] ${audit.websiteUrl} (${audit.primaryGoal})`,
      status: 'Dispatched',
      summary: `Domain queued for 48-hour forensic inspection. Initial score: ${audit.aiScore}/100.`,
    });

    this.addLog({
      workflowName: 'Client Audit Confirmation',
      recipient: audit.contactEmail,
      subject: `Your Forensic Audit for ${audit.websiteUrl} Is Underway`,
      status: 'Dispatched',
      summary: `Confirmed 48-hour video walkthrough delivery timeline for ${audit.companyName}.`,
    });
  }

  // Workflow 4: Status Update Notification
  public notifyStatusUpdate(lead: Lead, newStatus: string) {
    if (newStatus === 'Qualified' || newStatus === 'Proposal Sent' || newStatus === 'Converted') {
      this.addLog({
        workflowName: 'Lead Pipeline Progression Alert',
        recipient: 'directors@nexusagency.com',
        subject: `[PIPELINE ${newStatus.toUpperCase()}] ${lead.companyName} by ${lead.fullName}`,
        status: 'Dispatched',
        summary: `Lead ${lead.id} progressed to ${newStatus}. Value: ${lead.estimatedBudget}.`,
      });
    }
  }

  // Workflow 5: Newsletter Subscriber
  public notifyNewsletterSub(email: string) {
    this.addLog({
      workflowName: 'Newsletter Welcome Sequence',
      recipient: email,
      subject: `Welcome to the Nexus Executive Marketing Briefing`,
      status: 'Dispatched',
      summary: 'Delivered Edition #1: Server-Side Meta CAPI & International SEO Architectures.',
    });
  }
}

export const notifications = new NotificationEngine();
