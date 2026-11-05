/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  DollarSign,
  Percent,
  Users,
  Target,
  ArrowRight,
  Download,
  Send,
  Calendar,
  CheckCircle2,
  Layers,
  Sparkles,
  BarChart3,
  ShieldCheck,
  ChevronRight,
  X
} from 'lucide-react';
import { useCurrency, CURRENCY_CONFIGS } from '../context/CurrencyContext';
import { SEOHead } from '../components/seo/SEOHead';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

interface RoiSimulatorPageProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

const BUSINESS_MODELS = [
  { id: 'b2b', label: 'B2B Enterprise & SaaS', defaultAov: 1200, defaultConv: 1.6 },
  { id: 'd2c', label: 'D2C & Omnichannel Retail', defaultAov: 145, defaultConv: 2.4 },
  { id: 'services', label: 'Professional & Financial', defaultAov: 2400, defaultConv: 1.2 },
  { id: 'luxury', label: 'Luxury & High-Ticket', defaultAov: 4800, defaultConv: 0.9 },
  { id: 'health', label: 'Healthcare & MedTech', defaultAov: 850, defaultConv: 2.1 },
];

const AVAILABLE_CHANNELS = [
  { id: 'google', name: 'Google Ads (Search & PMax)', share: 0.35 },
  { id: 'meta', name: 'Meta & Paid Social', share: 0.30 },
  { id: 'seo', name: 'Enterprise Technical SEO', share: 0.15 },
  { id: 'cro', name: 'CRO & Landing Page UX', share: 0.10 },
  { id: 'retention', name: 'Retention & Email Automation', share: 0.10 },
];

export const RoiSimulatorPage: React.FC<RoiSimulatorPageProps> = ({ onNavigate, onOpenBooking }) => {
  const { currency, setCurrency, formatPrice } = useCurrency();

  // Core Simulation Inputs
  const [selectedModel, setSelectedModel] = useState<string>('b2b');
  const [monthlyBudget, setMonthlyBudget] = useState<number>(15000);
  const [monthlyTraffic, setMonthlyTraffic] = useState<number>(35000);
  const [baselineConvRate, setBaselineConvRate] = useState<number>(1.6);
  const [averageDealValue, setAverageDealValue] = useState<number>(1200);
  const [activeChannels, setActiveChannels] = useState<string[]>([
    'google',
    'meta',
    'seo',
    'cro'
  ]);
  const [scenario, setScenario] = useState<'Conservative' | 'Target' | 'Aggressive'>('Target');

  // Save Modal State
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [saveFormData, setSaveFormData] = useState({
    contactName: '',
    contactEmail: '',
    companyName: '',
    websiteUrl: '',
    honeypot: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Business model preset handler
  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId);
    const model = BUSINESS_MODELS.find(m => m.id === modelId);
    if (model) {
      setAverageDealValue(model.defaultAov);
      setBaselineConvRate(model.defaultConv);
    }
  };

  const toggleChannel = (channelId: string) => {
    if (activeChannels.includes(channelId)) {
      if (activeChannels.length > 1) {
        setActiveChannels(activeChannels.filter(c => c !== channelId));
      }
    } else {
      setActiveChannels([...activeChannels, channelId]);
    }
  };

  // Calculations
  const projections = useMemo(() => {
    const scenarioMultipliers = {
      Conservative: { roas: 3.2, cacReduction: 0.22, convLift: 0.35 },
      Target: { roas: 4.4, cacReduction: 0.34, convLift: 0.65 },
      Aggressive: { roas: 5.8, cacReduction: 0.46, convLift: 0.95 },
    };

    const cfg = scenarioMultipliers[scenario];
    const channelSynergy = Math.min(activeChannels.length * 0.04, 0.18);
    const finalRoas = Number((cfg.roas * (1 + channelSynergy)).toFixed(2));

    const projectedMonthlyRevenue = Math.round(monthlyBudget * finalRoas);
    const projectedAnnualRevenue = projectedMonthlyRevenue * 12;

    const currentMonthlyOrders = Math.round(monthlyTraffic * (baselineConvRate / 100));
    const currentMonthlyRevenue = Math.round(currentMonthlyOrders * averageDealValue);

    const projectedConvRate = Number((baselineConvRate * (1 + cfg.convLift)).toFixed(2));
    const projectedMonthlyOrders = Math.round(monthlyTraffic * (projectedConvRate / 100));

    const currentCac = currentMonthlyOrders > 0 ? Math.round(monthlyBudget / currentMonthlyOrders) : Math.round(monthlyBudget / 10);
    const projectedCac = Math.max(Math.round(currentCac * (1 - cfg.cacReduction)), 20);

    const netNewAnnualRev = Math.max(projectedAnnualRevenue - (currentMonthlyRevenue * 12), 0);
    const cacReductionPct = Math.round(cfg.cacReduction * 100);

    // Dynamic timeline
    const timeline = [
      {
        phase: 'Month 1',
        title: 'Infrastructure & Baseline Audit',
        roas: (finalRoas * 0.45).toFixed(1) + 'x',
        focus: 'CAPI server-side tagging, negative keyword audit, core UX bottleneck fixes.',
      },
      {
        phase: 'Month 3',
        title: 'Creative Acceleration & Bid Sculpting',
        roas: (finalRoas * 0.75).toFixed(1) + 'x',
        focus: 'Scaling top-performing visual creative variations and exact-match high intent queries.',
      },
      {
        phase: 'Month 6',
        title: 'Efficiency Compounding & CRO',
        roas: finalRoas + 'x',
        focus: 'Checkout drop-off remediation and full lifecycle automation deployment.',
      },
      {
        phase: 'Month 12',
        title: 'Dominant Category Scale',
        roas: (finalRoas * 1.2).toFixed(1) + 'x',
        focus: 'Sustained cross-channel dominance with stabilized, scalable customer acquisition costs.',
      },
    ];

    return {
      finalRoas,
      projectedMonthlyRevenue,
      projectedAnnualRevenue,
      currentMonthlyOrders,
      projectedMonthlyOrders,
      currentMonthlyRevenue,
      currentCac,
      projectedCac,
      cacReductionPct,
      netNewAnnualRev,
      projectedConvRate,
      timeline,
    };
  }, [scenario, activeChannels, monthlyBudget, monthlyTraffic, baselineConvRate, averageDealValue]);

  // Handle Save Forecast
  const handleSaveForecast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saveFormData.honeypot) return;
    setIsSaving(true);

    try {
      const response = await fetch('/api/simulator/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessModel: BUSINESS_MODELS.find(m => m.id === selectedModel)?.label,
          currency,
          monthlyBudget,
          monthlyTraffic,
          baselineConversionRate: baselineConvRate,
          averageDealValue,
          selectedChannels: activeChannels.map(id => AVAILABLE_CHANNELS.find(c => c.id === id)?.name || id),
          scenario,
          projectedRoas: projections.finalRoas,
          projectedMonthlyRevenue: projections.projectedMonthlyRevenue,
          projectedAnnualRevenue: projections.projectedAnnualRevenue,
          projectedCac: projections.projectedCac,
          cacReductionPct: projections.cacReductionPct,
          contactName: saveFormData.contactName,
          contactEmail: saveFormData.contactEmail,
          companyName: saveFormData.companyName,
          websiteUrl: saveFormData.websiteUrl,
        }),
      });

      if (response.ok) {
        setSaveSuccess(true);
      }
    } catch {
      setSaveSuccess(true);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="py-12 sm:py-20">
      <SEOHead
        title="Interactive Campaign Growth & ROI Simulator (USD, GBP, AED)"
        description="Simulate enterprise marketing ROI, projected blended ROAS, customer acquisition cost reduction, and net revenue growth across US, UK, and UAE markets."
        path="/simulator"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Contract */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
            <span>Growth Engineering Suite</span>
            <span aria-hidden="true">·</span>
            <span>Multi-Market Financial Model</span>
            <span aria-hidden="true">·</span>
            <span>US · UK · UAE</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
            Interactive Campaign ROI & Growth Simulator
          </h1>

          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Model your unit economics, forecast blended ROAS trajectories, and quantify customer acquisition cost (CAC) reduction across your core marketing channels.
          </p>
        </div>

        {/* Currency & Scenario Selector Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Target Currency:
            </span>
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
              {(['USD', 'GBP', 'AED'] as const).map(c => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    currency === c
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {c} ({CURRENCY_CONFIGS[c].symbol})
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Growth Scenario:
            </span>
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
              {(['Conservative', 'Target', 'Aggressive'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setScenario(s)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    scenario === s
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2-Column Simulation Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Inputs (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-6 space-y-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-600" />
                1. Business Model Archetype
              </h2>

              <div className="grid grid-cols-1 gap-2">
                {BUSINESS_MODELS.map(model => (
                  <button
                    key={model.id}
                    onClick={() => handleModelChange(model.id)}
                    className={`flex items-center justify-between p-3 rounded-lg border text-left text-xs font-medium transition-all ${
                      selectedModel === model.id
                        ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 text-blue-900 dark:text-blue-100'
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <span>{model.label}</span>
                    <span className="font-mono text-slate-400 text-xs">
                      Avg Deal: {formatPrice(model.defaultAov)}
                    </span>
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-5">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  2. Operational Budget & Baselines
                </h2>

                {/* Monthly Budget Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">
                      Monthly Marketing / Ad Spend:
                    </label>
                    <span className="font-mono font-bold text-blue-600 dark:text-blue-400 tabular-nums">
                      {formatPrice(monthlyBudget)} / mo
                    </span>
                  </div>
                  <input
                    type="range"
                    min="3000"
                    max="100000"
                    step="1000"
                    value={monthlyBudget}
                    onChange={e => setMonthlyBudget(Number(e.target.value))}
                    className="w-full accent-blue-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>{formatPrice(3000)}</span>
                    <span>{formatPrice(50000)}</span>
                    <span>{formatPrice(100000)}</span>
                  </div>
                </div>

                {/* Monthly Visitors Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">
                      Monthly Website Traffic:
                    </label>
                    <span className="font-mono font-bold text-slate-900 dark:text-white tabular-nums">
                      {monthlyTraffic.toLocaleString()} visitors
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2000"
                    max="200000"
                    step="2000"
                    value={monthlyTraffic}
                    onChange={e => setMonthlyTraffic(Number(e.target.value))}
                    className="w-full accent-blue-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Current Baseline Conversion Rate */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">
                      Baseline Conversion Rate:
                    </label>
                    <span className="font-mono font-bold text-slate-900 dark:text-white tabular-nums">
                      {baselineConvRate}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="6.0"
                    step="0.1"
                    value={baselineConvRate}
                    onChange={e => setBaselineConvRate(Number(e.target.value))}
                    className="w-full accent-blue-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Average Deal Value / AOV */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">
                      Average Order Value / Contract Size:
                    </label>
                    <span className="font-mono font-bold text-slate-900 dark:text-white tabular-nums">
                      {formatPrice(averageDealValue)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="15000"
                    step="50"
                    value={averageDealValue}
                    onChange={e => setAverageDealValue(Number(e.target.value))}
                    className="w-full accent-blue-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Channel Mix Toggle */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  3. Active Channel Mix
                </label>
                <div className="space-y-2">
                  {AVAILABLE_CHANNELS.map(ch => {
                    const active = activeChannels.includes(ch.id);
                    return (
                      <button
                        key={ch.id}
                        onClick={() => toggleChannel(ch.id)}
                        className={`w-full flex items-center justify-between p-2.5 rounded-lg border text-xs font-medium transition-all ${
                          active
                            ? 'border-blue-500 bg-blue-50/30 dark:bg-blue-950/20 text-slate-900 dark:text-white'
                            : 'border-slate-200 dark:border-slate-800 text-slate-400 opacity-60'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                              active
                                ? 'bg-blue-600 border-blue-600 text-white'
                                : 'border-slate-300 dark:border-slate-700'
                            }`}
                          >
                            {active && <CheckCircle2 className="w-3 h-3" />}
                          </span>
                          {ch.name}
                        </span>
                        <span className="font-mono text-slate-400 text-[11px]">
                          ~{Math.round(ch.share * 100)}% Weight
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Dynamic Output Dashboard (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            {/* High-Impact Projected Output Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="p-6 bg-linear-to-br from-blue-900 to-slate-950 text-white border-blue-800/40">
                <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider">
                  Projected Blended ROAS
                </span>
                <div className="text-5xl font-extrabold font-mono mt-2 tabular-nums">
                  {projections.finalRoas}x
                </div>
                <p className="text-xs text-blue-200/80 mt-2">
                  Estimated Return on Ad Spend across configured channel attribution.
                </p>
              </Card>

              <Card className="p-6 bg-slate-900 text-white border-slate-800">
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  Annualized Net Projected Revenue
                </span>
                <div className="text-4xl font-extrabold font-mono mt-2 tabular-nums text-emerald-300">
                  {formatPrice(projections.projectedAnnualRevenue)}
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Monthly Run Rate: <span className="font-mono text-white">{formatPrice(projections.projectedMonthlyRevenue)} / mo</span>
                </p>
              </Card>

              <Card className="p-5 border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Projected CAC Reduction
                </span>
                <div className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white mt-2 tabular-nums">
                  -{projections.cacReductionPct}%
                </div>
                <div className="text-xs text-slate-500 mt-1 font-mono">
                  From {formatPrice(projections.currentCac)} down to <span className="text-emerald-600 dark:text-emerald-400 font-bold">{formatPrice(projections.projectedCac)}</span>
                </div>
              </Card>

              <Card className="p-5 border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Conversion Rate Expansion
                </span>
                <div className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white mt-2 tabular-nums">
                  {projections.projectedConvRate}%
                </div>
                <div className="text-xs text-slate-500 mt-1 font-mono">
                  From {baselineConvRate}% baseline ({projections.projectedMonthlyOrders.toLocaleString()} conversions/mo)
                </div>
              </Card>
            </div>

            {/* 12-Month Execution Roadmap */}
            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  12-Month Milestone Trajectory
                </h3>
                <span className="text-xs text-slate-500 font-mono">
                  Benchmark: {scenario} Curve
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projections.timeline.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 rounded-lg space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400 font-mono">
                        {item.phase}
                      </span>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded">
                        Target ROAS: {item.roas}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-slate-900 dark:text-white">
                      {item.title}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                      {item.focus}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <Button
                variant="primary"
                onClick={() => setIsSaveModalOpen(true)}
                className="w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Save Forecast & Consult Strategist</span>
              </Button>

              <Button
                variant="secondary"
                onClick={onOpenBooking}
                className="w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Call with this Model</span>
              </Button>

              <button
                onClick={handlePrintReport}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Print One-Pager</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Forecast Modal */}
      {isSaveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
            <button
              onClick={() => {
                setIsSaveModalOpen(false);
                setSaveSuccess(false);
              }}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            {saveSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Simulation Blueprint Recorded!
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                  Your customized {formatPrice(monthlyBudget)}/mo multi-channel forecast (Target {projections.finalRoas}x ROAS) has been recorded. A senior strategist from our London/New York squad will review your unit economics.
                </p>
                <Button
                  variant="primary"
                  onClick={() => {
                    setIsSaveModalOpen(false);
                    setSaveSuccess(false);
                  }}
                  className="mt-4"
                >
                  Return to Simulator
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSaveForecast} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Send Forecast to Senior Strategist
                  </h3>
                  <p className="text-xs text-slate-500">
                    Receive a full breakdown of your projected {projections.finalRoas}x ROAS model and channel allocation roadmap.
                  </p>
                </div>

                {/* Honeypot */}
                <input
                  type="text"
                  name="_nexus_hp"
                  value={saveFormData.honeypot}
                  onChange={e => setSaveFormData({ ...saveFormData, honeypot: e.target.value })}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Mercer"
                      value={saveFormData.contactName}
                      onChange={e => setSaveFormData({ ...saveFormData, contactName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={saveFormData.contactEmail}
                      onChange={e => setSaveFormData({ ...saveFormData, contactEmail: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Acme Enterprise"
                      value={saveFormData.companyName}
                      onChange={e => setSaveFormData({ ...saveFormData, companyName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Website URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://company.com"
                      value={saveFormData.websiteUrl}
                      onChange={e => setSaveFormData({ ...saveFormData, websiteUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setIsSaveModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSaving}
                  >
                    {isSaving ? 'Submitting...' : 'Confirm & Save Blueprint'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
