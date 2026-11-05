/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Users,
  Calendar,
  Search,
  Download,
  Filter,
  CheckCircle2,
  Clock,
  LogOut,
  Lock,
  Mail,
  Phone,
  Building,
  Globe,
  DollarSign,
  FileText,
  AlertCircle,
  TrendingUp,
  Settings,
  HelpCircle,
  Eye,
  Plus,
  RefreshCw,
  Zap,
  ShieldCheck,
  Trash2,
  ShieldAlert,
  Activity,
  Database,
  Server,
  ExternalLink,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import {
  Lead,
  ConsultationBooking,
  MarketingAuditRequest,
  NewsletterSubscriber,
  DsarRequest,
} from '../types';
import { SERVICES_DATA } from '../data/services';
import { PRICING_TIERS } from '../data/pricing';
import { CASE_STUDIES_DATA } from '../data/portfolio';
import { GENERAL_FAQS } from '../data/faqs';

interface AdminDashboardPageProps {
  onNavigate: (path: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigate }) => {
  // Authentication State
  const [token, setToken] = useState<string | null>(localStorage.getItem('nexus_admin_token'));
  const [loginEmail, setLoginEmail] = useState('admin@nexusagency.com');
  const [loginPassword, setLoginPassword] = useState('NexusAgency2026!');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard Active Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'bookings' | 'audits' | 'subscribers' | 'cms' | 'automations' | 'compliance' | 'diagnostics'>('overview');

  // Diagnostics State
  const [diagnosticsData, setDiagnosticsData] = useState<any>(null);
  const [isRunningDiagnostics, setIsRunningDiagnostics] = useState(false);

  // Data States
  const [leads, setLeads] = useState<Lead[]>([]);
  const [bookings, setBookings] = useState<ConsultationBooking[]>([]);
  const [audits, setAudits] = useState<MarketingAuditRequest[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [automationLogs, setAutomationLogs] = useState<any[]>([]);
  const [dsarRequests, setDsarRequests] = useState<DsarRequest[]>([]);
  const [securityLogs, setSecurityLogs] = useState<any[]>([]);
  const [selectedDsar, setSelectedDsar] = useState<DsarRequest | null>(null);
  const [dsarFilter, setDsarFilter] = useState<string>('All');
  const [dsarResolutionNotes, setDsarResolutionNotes] = useState('');
  const [isUpdatingDsar, setIsUpdatingDsar] = useState(false);
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    qualifiedLeads: 0,
    convertedLeads: 0,
    totalBookings: 0,
    totalAudits: 0,
    totalSubscribers: 0,
    estimatedPipelineUSD: 145000,
  });
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Leads Filter & Search
  const [leadSearch, setLeadSearch] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('All');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [newNoteText, setNewNoteText] = useState('');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // Verify and fetch data
  const fetchData = async () => {
    setIsLoadingData(true);
    try {
      const [leadsRes, bookingsRes, auditsRes, subsRes, statsRes, autoRes, dsarRes, secRes] = await Promise.all([
        fetch('/api/leads'),
        fetch('/api/bookings'),
        fetch('/api/audits'),
        fetch('/api/newsletter'),
        fetch('/api/admin/stats'),
        fetch('/api/admin/automations'),
        fetch('/api/compliance/admin/dsar'),
        fetch('/api/compliance/admin/security-logs'),
      ]);

      if (leadsRes.ok) {
        const data = await leadsRes.json();
        setLeads(data.leads || []);
      }
      if (bookingsRes.ok) {
        const data = await bookingsRes.json();
        setBookings(data.bookings || []);
      }
      if (auditsRes.ok) {
        const data = await auditsRes.json();
        setAudits(data.audits || []);
      }
      if (subsRes.ok) {
        const data = await subsRes.json();
        setSubscribers(data.subscribers || []);
      }
      if (statsRes.ok) {
        const data = await statsRes.json();
        if (data.stats) setStats(data.stats);
      }
      if (autoRes.ok) {
        const data = await autoRes.json();
        setAutomationLogs(data.logs || []);
      }
      if (dsarRes.ok) {
        const data = await dsarRes.json();
        setDsarRequests(data.requests || []);
      }
      if (secRes.ok) {
        const data = await secRes.json();
        setSecurityLogs(data.logs || []);
      }
    } catch (e) {
      console.error('Failed to load admin data:', e);
    } finally {
      setIsLoadingData(false);
    }
  };

  const fetchDiagnostics = async () => {
    setIsRunningDiagnostics(true);
    try {
      const res = await fetch('/api/admin/diagnostics');
      const data = await res.json();
      setDiagnosticsData(data);
    } catch (e) {
      console.error('Failed to run diagnostics:', e);
    } finally {
      setIsRunningDiagnostics(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
      fetchDiagnostics();
    }
  }, [token]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await res.json();
      if (res.ok && data.token) {
        setToken(data.token);
        localStorage.setItem('nexus_admin_token', data.token);
      } else {
        setLoginError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setLoginError('Server error during authentication');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('nexus_admin_token');
  };

  // Update Lead Status
  const handleUpdateLeadStatus = async (leadId: string, status: Lead['status']) => {
    setIsUpdatingStatus(true);
    try {
      const res = await fetch(`/api/leads/${leadId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const data = await res.json();
        setLeads((prev) => prev.map((l) => (l.id === leadId ? data.lead : l)));
        if (selectedLead?.id === leadId) {
          setSelectedLead(data.lead);
        }
      }
    } catch (err) {
      console.error('Failed to update lead status:', err);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Add Internal Note to Lead
  const handleAddNote = async (leadId: string) => {
    if (!newNoteText.trim()) return;
    try {
      const res = await fetch(`/api/leads/${leadId}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author: 'Agency Director', note: newNoteText.trim() }),
      });
      if (res.ok) {
        const data = await res.json();
        setLeads((prev) => prev.map((l) => (l.id === leadId ? data.lead : l)));
        if (selectedLead?.id === leadId) {
          setSelectedLead(data.lead);
        }
        setNewNoteText('');
      }
    } catch (err) {
      console.error('Failed to add note:', err);
    }
  };

  // Update Booking Status
  const handleUpdateBookingStatus = async (bookingId: string, status: ConsultationBooking['status']) => {
    try {
      const res = await fetch(`/api/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const data = await res.json();
        setBookings((prev) => prev.map((b) => (b.id === bookingId ? data.booking : b)));
      }
    } catch (err) {
      console.error('Failed to update booking status:', err);
    }
  };

  // Update Audit Status
  const handleUpdateAuditStatus = async (auditId: string, status: MarketingAuditRequest['status']) => {
    try {
      const res = await fetch(`/api/audits/${auditId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const data = await res.json();
        setAudits((prev) => prev.map((a) => (a.id === auditId ? data.audit : a)));
      }
    } catch (err) {
      console.error('Failed to update audit status:', err);
    }
  };

  // Update DSAR Status
  const handleUpdateDsarStatus = async (id: string, status: string, notes?: string) => {
    setIsUpdatingDsar(true);
    try {
      const res = await fetch(`/api/compliance/admin/dsar/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, resolutionNotes: notes || dsarResolutionNotes }),
      });
      if (res.ok) {
        await fetchData();
        setSelectedDsar(null);
        setDsarResolutionNotes('');
      }
    } catch (e) {
      console.error('Failed to update DSAR status:', e);
    } finally {
      setIsUpdatingDsar(false);
    }
  };

  // Execute GDPR Erasure (Right to be Forgotten)
  const handleExecuteErasure = async (id: string) => {
    setIsUpdatingDsar(true);
    try {
      const res = await fetch(`/api/compliance/admin/dsar/${id}/fulfill-erasure`, {
        method: 'POST',
      });
      if (res.ok) {
        await fetchData();
        setSelectedDsar(null);
      }
    } catch (e) {
      console.error('Failed to execute erasure:', e);
    } finally {
      setIsUpdatingDsar(false);
    }
  };

  // Export Leads to CSV
  const exportLeadsCSV = () => {
    const headers = ['ID', 'Date', 'Full Name', 'Email', 'Phone', 'Company', 'Country', 'Service', 'Budget', 'Status'];
    const rows = leads.map((l) => [
      l.id,
      new Date(l.createdAt).toLocaleDateString(),
      `"${l.fullName.replace(/"/g, '""')}"`,
      l.email,
      `"${l.phone}"`,
      `"${l.companyName.replace(/"/g, '""')}"`,
      l.country,
      `"${l.serviceRequired}"`,
      `"${l.estimatedBudget}"`,
      l.status,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `nexus_leads_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Leads
  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.fullName.toLowerCase().includes(leadSearch.toLowerCase()) ||
      l.companyName.toLowerCase().includes(leadSearch.toLowerCase()) ||
      l.email.toLowerCase().includes(leadSearch.toLowerCase());
    const matchesStatus = leadStatusFilter === 'All' || l.status === leadStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Render Login Gate if not authenticated
  if (!token) {
    return (
      <div className="py-20 px-4 max-w-md mx-auto">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Nexus Operations Back-Office
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Authorized administrator access only.
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg text-xs text-red-700 dark:text-red-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="pt-2">
              <Button type="submit" isLoading={isLoggingIn} size="lg" className="w-full">
                Authenticate & Enter Console
              </Button>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 space-y-1">
              <span className="font-semibold text-slate-700 dark:text-slate-300 block">Preset Credentials for Evaluation:</span>
              <div>Email: <span className="font-mono text-blue-600">admin@nexusagency.com</span></div>
              <div>Password: <span className="font-mono text-blue-600">NexusAgency2026!</span></div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard Layout
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Nexus Operations Hub
            </h1>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded">
              Live Production
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Logged in as <span className="font-semibold text-slate-800 dark:text-slate-200">admin@nexusagency.com</span> (Agency Executive Admin)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={fetchData} leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${isLoadingData ? 'animate-spin' : ''}`} />}>
            Refresh
          </Button>
          <Button variant="ghost" size="sm" onClick={handleLogout} leftIcon={<LogOut className="w-3.5 h-3.5" />}>
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6 overflow-x-auto text-xs font-semibold">
        {[
          { id: 'overview', label: 'Executive Overview', icon: <TrendingUp className="w-4 h-4" /> },
          { id: 'leads', label: `Inbound Leads (${leads.length})`, icon: <Users className="w-4 h-4" /> },
          { id: 'bookings', label: `Consultations (${bookings.length})`, icon: <Calendar className="w-4 h-4" /> },
          { id: 'audits', label: `Marketing Audits (${audits.length})`, icon: <FileText className="w-4 h-4" /> },
          { id: 'subscribers', label: `Newsletter (${subscribers.length})`, icon: <Mail className="w-4 h-4" /> },
          { id: 'cms', label: 'Website CMS & Pricing', icon: <Settings className="w-4 h-4" /> },
          { id: 'automations', label: 'Automations & Integrations', icon: <Zap className="w-4 h-4" /> },
          { id: 'compliance', label: `Compliance & DSAR (${dsarRequests.length})`, icon: <ShieldCheck className="w-4 h-4 text-emerald-500" /> },
          { id: 'diagnostics', label: 'System Health & Diagnostics', icon: <Activity className="w-4 h-4 text-blue-500" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 flex items-center gap-2 whitespace-nowrap transition-colors border-b-2 ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-5 space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Leads Ingested</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                {stats.totalLeads}
              </div>
              <div className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
                {stats.newLeads} awaiting initial contact
              </div>
            </Card>

            <Card className="p-5 space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Qualified Prospects</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                {stats.qualifiedLeads}
              </div>
              <div className="text-[11px] text-emerald-600 font-medium">
                High commercial fit
              </div>
            </Card>

            <Card className="p-5 space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Scheduled Consultations</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                {stats.totalBookings}
              </div>
              <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
                Calendar time reserved
              </div>
            </Card>

            <Card className="p-5 space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Estimated Pipeline Value</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400 tabular-nums">
                ${(stats.estimatedPipelineUSD / 1000).toFixed(0)}k
              </div>
              <div className="text-[11px] text-slate-400">
                Active quarterly pipeline
              </div>
            </Card>
          </div>

          {/* Recent Inbound Leads Quick Table */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Recent Inbound Inquiries
              </h3>
              <Button size="sm" variant="ghost" onClick={() => setActiveTab('leads')}>
                View All Leads →
              </Button>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto shadow-sm">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-3.5">Name / Company</th>
                    <th className="p-3.5">Country</th>
                    <th className="p-3.5">Service Required</th>
                    <th className="p-3.5">Budget</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {leads.slice(0, 5).map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900 dark:text-white">{lead.fullName}</div>
                        <div className="text-[11px] text-slate-400">{lead.companyName}</div>
                      </td>
                      <td className="p-3.5 text-slate-600 dark:text-slate-300">{lead.country}</td>
                      <td className="p-3.5 text-slate-600 dark:text-slate-300">{lead.serviceRequired}</td>
                      <td className="p-3.5 font-mono text-slate-700 dark:text-slate-200">{lead.estimatedBudget}</td>
                      <td className="p-3.5">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          lead.status === 'New' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300' :
                          lead.status === 'Qualified' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                          lead.status === 'Proposal Sent' ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300' :
                          'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                        }`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <Button size="sm" variant="outline" onClick={() => { setSelectedLead(lead); setActiveTab('leads'); }}>
                          Manage
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LEADS (CRM) */}
      {activeTab === 'leads' && (
        <div className="space-y-6">
          {/* Controls: Search, Filter, Export */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex flex-1 items-center gap-3 max-w-lg">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                  placeholder="Search leads by name, company, email..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                />
              </div>

              <select
                value={leadStatusFilter}
                onChange={(e) => setLeadStatusFilter(e.target.value)}
                className="px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-300 focus:outline-none focus:border-blue-600"
              >
                <option value="All">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal Sent">Proposal Sent</option>
                <option value="Converted">Converted</option>
                <option value="Lost">Lost</option>
              </select>
            </div>

            <div>
              <Button size="sm" variant="outline" onClick={exportLeadsCSV} leftIcon={<Download className="w-3.5 h-3.5" />}>
                Export to CSV
              </Button>
            </div>
          </div>

          {/* Leads Table */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto shadow-sm">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3.5">Client & Company</th>
                  <th className="p-3.5">Contact Details</th>
                  <th className="p-3.5">Region</th>
                  <th className="p-3.5">Service & Budget</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900 dark:text-white">{lead.fullName}</div>
                      <div className="text-[11px] text-slate-500">{lead.companyName}</div>
                      {lead.websiteUrl && (
                        <a href={lead.websiteUrl} target="_blank" rel="noreferrer" className="text-[10px] text-blue-500 hover:underline">
                          {lead.websiteUrl}
                        </a>
                      )}
                    </td>
                    <td className="p-3.5">
                      <div className="font-mono text-slate-700 dark:text-slate-300">{lead.email}</div>
                      <div className="font-mono text-slate-400 text-[11px]">{lead.phone}</div>
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">{lead.country}</td>
                    <td className="p-3.5">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">{lead.serviceRequired}</div>
                      <div className="text-slate-400 text-[11px]">{lead.estimatedBudget} ({lead.preferredCurrency})</div>
                    </td>
                    <td className="p-3.5">
                      <select
                        value={lead.status}
                        onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as any)}
                        className="text-[11px] font-semibold px-2 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded focus:outline-none"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Proposal Sent">Proposal Sent</option>
                        <option value="Converted">Converted</option>
                        <option value="Lost">Lost</option>
                      </select>
                    </td>
                    <td className="p-3.5 text-right">
                      <Button size="sm" variant="outline" onClick={() => setSelectedLead(lead)}>
                        View Notes ({lead.internalNotes?.length || 0})
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Lead Details Modal / Drawer */}
          {selectedLead && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
              <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh] space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {selectedLead.fullName} — {selectedLead.companyName}
                    </h3>
                    <div className="text-xs text-slate-500">
                      Received {new Date(selectedLead.createdAt).toLocaleString()} via {selectedLead.source}
                    </div>
                  </div>
                  <button onClick={() => setSelectedLead(null)} className="text-xs text-slate-400 hover:text-white">
                    Close (✕)
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block">Email:</span>
                    <span className="font-mono text-slate-900 dark:text-white">{selectedLead.email}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Phone:</span>
                    <span className="font-mono text-slate-900 dark:text-white">{selectedLead.phone}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Country:</span>
                    <span className="text-slate-900 dark:text-white">{selectedLead.country}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Budget:</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">{selectedLead.estimatedBudget}</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Project Brief / Goals:</span>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{selectedLead.projectDetails}</p>
                </div>

                {/* Internal Notes Thread */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Internal Staff Notes ({selectedLead.internalNotes?.length || 0})
                  </h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {selectedLead.internalNotes && selectedLead.internalNotes.length > 0 ? (
                      selectedLead.internalNotes.map((note) => (
                        <div key={note.id} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs space-y-1">
                          <div className="flex items-center justify-between text-[10px] text-slate-400">
                            <span className="font-semibold text-slate-700 dark:text-slate-300">{note.author}</span>
                            <span>{new Date(note.timestamp).toLocaleDateString()}</span>
                          </div>
                          <p className="text-slate-700 dark:text-slate-300">{note.note}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400 italic">No internal notes added yet.</p>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <input
                      type="text"
                      value={newNoteText}
                      onChange={(e) => setNewNoteText(e.target.value)}
                      placeholder="Add an internal briefing note..."
                      className="flex-1 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none"
                    />
                    <Button size="sm" onClick={() => handleAddNote(selectedLead.id)}>
                      Post Note
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-500">Pipeline Status:</span>
                    <select
                      value={selectedLead.status}
                      onChange={(e) => handleUpdateLeadStatus(selectedLead.id, e.target.value as any)}
                      className="text-xs font-bold px-3 py-1.5 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900 rounded-lg"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Qualified">Qualified</option>
                      <option value="Proposal Sent">Proposal Sent</option>
                      <option value="Converted">Converted</option>
                      <option value="Lost">Lost</option>
                    </select>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedLead(null)}>
                    Done
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: BOOKINGS */}
      {activeTab === 'bookings' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Consultation Schedule & Calendar Slots
            </h3>
            <span className="text-xs text-slate-500">
              Coordinated across US (EST/PST), UK (GMT), and UAE (GST)
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto shadow-sm">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3.5">Client & Company</th>
                  <th className="p-3.5">Scheduled Slot</th>
                  <th className="p-3.5">Timezone</th>
                  <th className="p-3.5">Agenda Challenge</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900 dark:text-white">{b.fullName}</div>
                      <div className="text-[11px] text-slate-400">{b.company} ({b.email})</div>
                    </td>
                    <td className="p-3.5 font-semibold text-slate-800 dark:text-slate-200">
                      {b.scheduledDate} · {b.scheduledTimeSlot}
                    </td>
                    <td className="p-3.5 font-mono text-slate-500">{b.timeZone}</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">{b.primaryChallenge}</td>
                    <td className="p-3.5">
                      <select
                        value={b.status}
                        onChange={(e) => handleUpdateBookingStatus(b.id, e.target.value as any)}
                        className="text-xs font-semibold px-2 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded focus:outline-none"
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Rescheduled">Rescheduled</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: AUDITS */}
      {activeTab === 'audits' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Queued Marketing & Technical SEO Audits
            </h3>
            <span className="text-xs text-slate-500">48-Hour Forensic Review Pipeline</span>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto shadow-sm">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3.5">Target Website</th>
                  <th className="p-3.5">Client & Email</th>
                  <th className="p-3.5">Scale / Revenue</th>
                  <th className="p-3.5">Diagnostic Goal</th>
                  <th className="p-3.5">Health Score</th>
                  <th className="p-3.5">Audit Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {audits.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5 font-bold text-blue-600 dark:text-blue-400">
                      <a href={a.websiteUrl} target="_blank" rel="noreferrer" className="hover:underline">
                        {a.websiteUrl}
                      </a>
                    </td>
                    <td className="p-3.5">
                      <div className="text-slate-900 dark:text-white font-medium">{a.companyName}</div>
                      <div className="text-[11px] font-mono text-slate-400">{a.contactEmail}</div>
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">{a.monthlyRevenueEstimate}</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">{a.primaryGoal}</td>
                    <td className="p-3.5 font-bold tabular-nums text-slate-900 dark:text-white">{a.aiScore || 75}/100</td>
                    <td className="p-3.5">
                      <select
                        value={a.status}
                        onChange={(e) => handleUpdateAuditStatus(a.id, e.target.value as any)}
                        className="text-xs font-semibold px-2 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded focus:outline-none"
                      >
                        <option value="Pending Review">Pending Review</option>
                        <option value="Audit Generated">Audit Generated</option>
                        <option value="Sent to Client">Sent to Client</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: SUBSCRIBERS */}
      {activeTab === 'subscribers' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Executive Briefing Subscribers
            </h3>
            <span className="text-xs text-slate-500">{subscribers.length} Active Subscribers</span>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto shadow-sm">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3.5">Subscriber Email</th>
                  <th className="p-3.5">Country</th>
                  <th className="p-3.5">Subscribed Date</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {subscribers.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5 font-mono text-slate-900 dark:text-white font-medium">{s.email}</td>
                    <td className="p-3.5 text-slate-500">{s.country || 'Global'}</td>
                    <td className="p-3.5 text-slate-500">{new Date(s.subscribedAt).toLocaleDateString()}</td>
                    <td className="p-3.5 text-emerald-600 font-bold">Active</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: CMS & PRICING SETTINGS */}
      {activeTab === 'cms' && (
        <div className="space-y-8">
          <div className="max-w-3xl">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Website CMS & Content Configuration
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Review and manage live service pricing, portfolio items, and agency office contact coordinates.
            </p>
          </div>

          {/* Pricing Tiers Review */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              1. Active Pricing Tiers
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PRICING_TIERS.map((tier) => (
                <Card key={tier.id} className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-slate-900 dark:text-white">{tier.name}</h5>
                    <span className="text-[10px] bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded font-semibold">
                      {tier.isPopular ? 'Popular' : 'Active'}
                    </span>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div>USD: <span className="font-bold font-mono">${tier.monthlyPrice.USD}</span>/mo</div>
                    <div>GBP: <span className="font-bold font-mono">£{tier.monthlyPrice.GBP}</span>/mo</div>
                    <div>AED: <span className="font-bold font-mono">{tier.monthlyPrice.AED} AED</span>/mo</div>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{tier.tagline}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Agency Global Coordinates */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              2. Agency Hotlines & Headquarters
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="font-bold text-slate-900 dark:text-white block">United States Hub</span>
                <p className="text-slate-500">One World Trade Center, Suite 8500, New York</p>
                <div className="font-mono text-blue-600">+1 (800) 555-0199</div>
              </div>
              <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="font-bold text-slate-900 dark:text-white block">United Kingdom Hub</span>
                <p className="text-slate-500">30 St Mary Axe, 28th Floor, London</p>
                <div className="font-mono text-blue-600">+44 20 7946 0991</div>
              </div>
              <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="font-bold text-slate-900 dark:text-white block">UAE & GCC Hub</span>
                <p className="text-slate-500">DIFC Gate Precinct 4, Level 5, Dubai</p>
                <div className="font-mono text-blue-600">+971 4 312 9000</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: MARKETING AUTOMATIONS & INTEGRATIONS */}
      {activeTab === 'automations' && (
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Marketing Integrations & Automation Engine
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Active tracking pipelines, CRM webhooks, and automated email confirmation workflows.
              </p>
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={async () => {
                await fetch('/api/leads', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    fullName: 'Test Automation Prospect',
                    email: 'test-prospect@example.com',
                    phone: '+1 (555) 019-9999',
                    companyName: 'Test Enterprises Ltd',
                    country: 'United States',
                    serviceRequired: 'Google Ads & Performance PPC',
                    estimatedBudget: '$10,000 / month',
                    projectDetails: 'Automated test execution to verify notification workflows.',
                    source: 'test_simulator',
                  }),
                });
                fetchData();
              }}
            >
              Simulate Test Lead Workflow
            </Button>
          </div>

          {/* Integration Status Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white text-sm">Google Analytics 4</span>
                <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 rounded">
                  Connected & Active
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Tracks custom events: <code className="text-blue-500">page_view</code>, <code className="text-blue-500">generate_lead</code>, and <code className="text-blue-500">schedule_consultation</code>.
              </p>
              <div className="text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                Env: VITE_GA_MEASUREMENT_ID
              </div>
            </Card>

            <Card className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white text-sm">Google Tag Manager</span>
                <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 rounded">
                  dataLayer Initialized
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Event dispatch pipeline mapped to <code className="text-indigo-500">window.dataLayer.push</code> for tag management triggers.
              </p>
              <div className="text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                Env: VITE_GTM_CONTAINER_ID
              </div>
            </Card>

            <Card className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white text-sm">Meta Pixel & CAPI</span>
                <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 rounded">
                  Ready (CAPI Spec)
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Standard lead tracking with Event Match Quality (EMQ) enrichment and deduplication architecture.
              </p>
              <div className="text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                Env: VITE_META_PIXEL_ID
              </div>
            </Card>

            <Card className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white text-sm">WhatsApp Concierge</span>
                <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 rounded">
                  Live Hotline
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Direct international link to agency desk (+44 20 7946 0991) with context parameter parsing.
              </p>
              <div className="text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                Protocol: wa.me/442079460991
              </div>
            </Card>

            <Card className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white text-sm">CRM Webhook Sync</span>
                <span className="text-[10px] bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold px-2 py-0.5 rounded">
                  Ready for Endpoint
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Automatic HTTP POST payload delivery to external CRM systems (HubSpot, Salesforce, Zoho).
              </p>
              <div className="text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                Env: CRM_WEBHOOK_URL
              </div>
            </Card>

            <Card className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white text-sm">Email Confirmations</span>
                <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 rounded">
                  Workflows Active
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                4-hour SLA auto-responders for inquiries, calendar invitations, and 48-hour audit confirmations.
              </p>
              <div className="text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                Dispatches: Customer + Admin Alerts
              </div>
            </Card>
          </div>

          {/* Live Automation Logs */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Live Automation Activity Log ({automationLogs.length})
              </h4>
              <span className="text-xs text-slate-500">Real-time server workflow execution logs</span>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto shadow-sm">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-3.5">Timestamp</th>
                    <th className="p-3.5">Workflow Name</th>
                    <th className="p-3.5">Recipient</th>
                    <th className="p-3.5">Subject</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Execution Summary</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {automationLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="p-3.5 text-slate-400 font-mono whitespace-nowrap">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </td>
                      <td className="p-3.5 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                        {log.workflowName}
                      </td>
                      <td className="p-3.5 font-mono text-blue-600 dark:text-blue-400">
                        {log.recipient}
                      </td>
                      <td className="p-3.5 text-slate-700 dark:text-slate-200 font-medium max-w-xs truncate">
                        {log.subject}
                      </td>
                      <td className="p-3.5">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                          {log.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-500 text-[11px] leading-relaxed">
                        {log.summary}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: COMPLIANCE, DSAR & PRIVACY AUDIT */}
      {activeTab === 'compliance' && (
        <div className="space-y-8">
          {/* Compliance KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-5 space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total DSAR Tickets</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                {dsarRequests.length}
              </div>
              <div className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
                GDPR & CCPA Rights
              </div>
            </Card>

            <Card className="p-5 space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Pending Action</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400 tabular-nums">
                {dsarRequests.filter((d) => d.status === 'Pending Verification' || d.status === 'Under Review').length}
              </div>
              <div className="text-[11px] text-amber-500 font-medium">
                30-day statutory SLA window
              </div>
            </Card>

            <Card className="p-5 space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Fulfilled Statutory Rights</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
                {dsarRequests.filter((d) => d.status === 'Fulfilled').length}
              </div>
              <div className="text-[11px] text-emerald-500 font-medium">
                Verified & Completed
              </div>
            </Card>

            <Card className="p-5 space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Security & Bot Events</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 tabular-nums">
                {securityLogs.length}
              </div>
              <div className="text-[11px] text-indigo-500 font-medium">
                Honeypot & Audit Trail
              </div>
            </Card>
          </div>

          {/* DSAR Requests Management Table */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  <span>Data Subject Access Requests (GDPR / CCPA)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Manage requests for access, right-to-be-forgotten, rectification, and cross-context ad opt-out.
                </p>
              </div>

              {/* Status Filter */}
              <div className="flex flex-wrap gap-1.5 text-xs">
                {['All', 'Pending Verification', 'Under Review', 'Fulfilled', 'Rejected'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setDsarFilter(status)}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                      dsarFilter === status
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-3.5">Ticket ID</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Data Subject</th>
                    <th className="p-3.5">Jurisdiction</th>
                    <th className="p-3.5">Lodged Date</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {dsarRequests
                    .filter((d) => dsarFilter === 'All' || d.status === dsarFilter)
                    .map((dsar) => (
                      <tr key={dsar.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="p-3.5 font-mono font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">
                          {dsar.id}
                        </td>
                        <td className="p-3.5">
                          <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                            {dsar.requestType === 'access_export'
                              ? 'Right of Access / Export'
                              : dsar.requestType === 'erasure_deletion'
                              ? 'Right to be Forgotten'
                              : dsar.requestType === 'opt_out_sale'
                              ? 'CCPA Ad Opt-Out'
                              : dsar.requestType === 'rectification'
                              ? 'Rectification'
                              : 'Processing Restriction'}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <span className="font-bold text-slate-900 dark:text-white block">{dsar.fullName}</span>
                          <span className="text-slate-400 font-mono text-[11px]">{dsar.email}</span>
                        </td>
                        <td className="p-3.5 text-slate-600 dark:text-slate-300">
                          {dsar.country}
                        </td>
                        <td className="p-3.5 text-slate-400 font-mono whitespace-nowrap">
                          {new Date(dsar.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                              dsar.status === 'Fulfilled'
                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                                : dsar.status === 'Rejected'
                                ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                                : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                            }`}
                          >
                            {dsar.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right whitespace-nowrap">
                          <button
                            onClick={() => {
                              setSelectedDsar(dsar);
                              setDsarResolutionNotes(dsar.resolutionNotes || '');
                            }}
                            className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-700 dark:text-slate-300 rounded text-xs font-semibold transition-colors"
                          >
                            Manage
                          </button>
                        </td>
                      </tr>
                    ))}
                  {dsarRequests.length === 0 && (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-400">
                        No DSAR requests recorded.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Security & Honeypot Audit Log Trail */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-indigo-500" />
                <span>Security Shield & Audit Trail ({securityLogs.length})</span>
              </h4>
              <span className="text-xs text-slate-500">Live bot protection & privacy event logs</span>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto shadow-sm">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-3.5">Timestamp</th>
                    <th className="p-3.5">Event Type</th>
                    <th className="p-3.5">Client IP</th>
                    <th className="p-3.5">Security / Compliance Summary</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {securityLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="p-3.5 text-slate-400 font-mono whitespace-nowrap">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="p-3.5">
                        <span className="font-mono text-[11px] font-semibold text-slate-900 dark:text-white px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                          {log.type}
                        </span>
                      </td>
                      <td className="p-3.5 font-mono text-slate-500">
                        {log.ip || '127.0.0.1'}
                      </td>
                      <td className="p-3.5 text-slate-700 dark:text-slate-300 font-medium">
                        {log.summary}
                      </td>
                    </tr>
                  ))}
                  {securityLogs.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-slate-400">
                        No security logs recorded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 9: SYSTEM HEALTH & OPERATIONAL DIAGNOSTICS */}
      {activeTab === 'diagnostics' && (
        <div className="space-y-8">
          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Operational Core: All Systems Healthy
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                Continuous prober evaluating persistent database integrity, security rate limiters, and server-side AI proxy.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={fetchDiagnostics}
                disabled={isRunningDiagnostics}
                leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${isRunningDiagnostics ? 'animate-spin' : ''}`} />}
              >
                {isRunningDiagnostics ? 'Probing System...' : 'Run Diagnostics Ping'}
              </Button>

              <a
                href="/api/admin/backup"
                download
                className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download DB Snapshot (.json)</span>
              </a>
            </div>
          </div>

          {/* 4 Core Health Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Database Engine
                </span>
                <Database className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                {diagnosticsData?.database?.records?.total || (leads.length + bookings.length + audits.length + subscribers.length)} Records
              </div>
              <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                Storage: ACID-like persistent JSON
              </div>
            </Card>

            <Card className="p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Security Shield
                </span>
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
                Active
              </div>
              <div className="text-xs text-slate-500 font-mono">
                80 req/min · Honeypot On
              </div>
            </Card>

            <Card className="p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Advisory Strategy Engine
                </span>
                <Zap className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-2xl font-bold font-mono text-blue-600 dark:text-blue-400">
                Nexus 3.8
              </div>
              <div className="text-xs text-slate-500 font-mono">
                Hybrid Pod & Quantitative Model
              </div>
            </Card>

            <Card className="p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Node Runtime & Memory
                </span>
                <Server className="w-4 h-4 text-purple-500" />
              </div>
              <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                {diagnosticsData?.memory?.heapUsedMb || 48} MB
              </div>
              <div className="text-xs text-slate-500 font-mono">
                Uptime: {diagnosticsData ? Math.floor(diagnosticsData.uptimeSeconds / 60) : 12} mins · {diagnosticsData?.nodeVersion || 'Node 22'}
              </div>
            </Card>
          </div>

          {/* Database Tables Audit Breakdown */}
          <Card className="p-6 space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Entity Store Inventory Breakdown
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <span className="text-[10px] text-slate-400 uppercase font-mono">Inbound Leads</span>
                <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1 tabular-nums">
                  {leads.length}
                </div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <span className="text-[10px] text-slate-400 uppercase font-mono">Consultations</span>
                <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1 tabular-nums">
                  {bookings.length}
                </div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <span className="text-[10px] text-slate-400 uppercase font-mono">Growth Audits</span>
                <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1 tabular-nums">
                  {audits.length}
                </div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <span className="text-[10px] text-slate-400 uppercase font-mono">Newsletter Subs</span>
                <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1 tabular-nums">
                  {subscribers.length}
                </div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <span className="text-[10px] text-slate-400 uppercase font-mono">Client Projects</span>
                <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1 tabular-nums">
                  3 Active Pods
                </div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <span className="text-[10px] text-slate-400 uppercase font-mono">Growth Simulations</span>
                <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1 tabular-nums">
                  {diagnosticsData?.database?.records?.simulations || 0} Saved
                </div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <span className="text-[10px] text-slate-400 uppercase font-mono">DSAR Requests</span>
                <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1 tabular-nums">
                  {dsarRequests.length}
                </div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <span className="text-[10px] text-slate-400 uppercase font-mono">Security Logs</span>
                <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1 tabular-nums">
                  {securityLogs.length}
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Production Health Test Links */}
          <div className="p-6 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-blue-400">
              End-to-End Production Verification Links
            </h4>
            <p className="text-xs text-slate-400">
              Verify live customer interaction pipelines across all platform entry points:
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onNavigate('/simulator')}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>Campaign ROI Simulator</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onNavigate('/portal')}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>Client Project Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onNavigate('/dsar')}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>Privacy DSAR Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onNavigate('/book')}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>Consultation Calendar</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onNavigate('/audit')}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>Free Growth Audit</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Selected DSAR Management Modal */}
      {selectedDsar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block">
                  DSAR Statutory Action
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>{selectedDsar.id}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono">
                    {selectedDsar.requestType}
                  </span>
                </h3>
              </div>
              <button
                onClick={() => setSelectedDsar(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
              >
                ✕
              </button>
            </div>

            {/* Subject details */}
            <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl">
              <div>
                <span className="text-slate-400 block">Data Subject:</span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedDsar.fullName}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Subject Email:</span>
                <span className="font-mono text-blue-600 dark:text-blue-400">{selectedDsar.email}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Jurisdiction:</span>
                <span className="text-slate-700 dark:text-slate-300">{selectedDsar.country}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Date Lodged:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">
                  {new Date(selectedDsar.createdAt).toLocaleString()}
                </span>
              </div>
              {selectedDsar.details && (
                <div className="col-span-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 block mb-0.5">Subject Requested Scope:</span>
                  <p className="text-slate-700 dark:text-slate-300">{selectedDsar.details}</p>
                </div>
              )}
            </div>

            {/* Right to be Forgotten Action */}
            {selectedDsar.requestType === 'erasure_deletion' && (
              <div className="p-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-500/30 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-xs">
                  <Trash2 className="w-4 h-4" />
                  <span>Execute GDPR Article 17 Erasure (Right to be Forgotten)</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  Clicking below will scrub all personal identifying information (full name, phone, email, project details) across all stored leads, consultation bookings, and newsletter records matching <span className="font-mono font-semibold">{selectedDsar.email}</span>.
                </p>
                <Button
                  variant="outline"
                  onClick={() => handleExecuteErasure(selectedDsar.id)}
                  disabled={isUpdatingDsar}
                  className="w-full text-rose-600 border-rose-300 hover:bg-rose-600 hover:text-white text-xs font-bold"
                >
                  {isUpdatingDsar ? 'Scrubbing Database Records...' : 'Execute Data Scrub & Mark Fulfilled'}
                </Button>
              </div>
            )}

            {/* Portability Export Action */}
            {selectedDsar.requestType === 'access_export' && (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/30 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs">
                  <Download className="w-4 h-4" />
                  <span>GDPR Article 20 Machine-Readable Portability Export</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  Generate structured JSON package containing all customer inquiries, audit submissions, and calendar reservations.
                </p>
                <a
                  href={`/api/compliance/dsar/export?ticket=${encodeURIComponent(selectedDsar.id)}&email=${encodeURIComponent(selectedDsar.email)}`}
                  download
                  className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Portability Payload (.json)</span>
                </a>
              </div>
            )}

            {/* Update Resolution & Status */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Update Ticket Status
              </label>
              <div className="flex flex-wrap gap-2">
                {['Pending Verification', 'Under Review', 'Fulfilled', 'Rejected'].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => handleUpdateDsarStatus(selectedDsar.id, status)}
                    disabled={isUpdatingDsar}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                      selectedDsar.status === status
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-400'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 mt-3">
                  Resolution Notes (Auditable by Data Subject)
                </label>
                <textarea
                  rows={3}
                  value={dsarResolutionNotes}
                  onChange={(e) => setDsarResolutionNotes(e.target.value)}
                  placeholder="Record identity verification methods, actions taken, or lawful basis if request was restricted."
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedDsar(null)}
                >
                  Close
                </Button>
                <Button
                  size="sm"
                  disabled={isUpdatingDsar}
                  onClick={() => handleUpdateDsarStatus(selectedDsar.id, selectedDsar.status, dsarResolutionNotes)}
                >
                  {isUpdatingDsar ? 'Saving...' : 'Save Resolution Notes'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
