/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Router } from 'express';
import { store } from '../db/store';

export const simulatorRouter = Router();

// Benchmark multipliers and CAC improvements by scenario
const SCENARIO_MULTIPLIERS = {
  Conservative: { roasMultiplier: 3.2, cacReductionPct: 22, convLiftPct: 35 },
  Target: { roasMultiplier: 4.4, cacReductionPct: 34, convLiftPct: 65 },
  Aggressive: { roasMultiplier: 5.8, cacReductionPct: 46, convLiftPct: 95 },
};

// Calculate projected growth curves
simulatorRouter.post('/calculate', (req, res) => {
  try {
    const {
      businessModel = 'B2B Enterprise & SaaS',
      currency = 'USD',
      monthlyBudget = 10000,
      monthlyTraffic = 25000,
      baselineConversionRate = 1.8,
      averageDealValue = 450,
      selectedChannels = ['Google Ads (PMax & Search)', 'Technical SEO'],
      scenario = 'Target',
    } = req.body;

    const budget = Number(monthlyBudget) || 10000;
    const traffic = Number(monthlyTraffic) || 25000;
    const baseConv = Number(baselineConversionRate) || 1.8;
    const aov = Number(averageDealValue) || 450;
    const activeScenario = (scenario in SCENARIO_MULTIPLIERS ? scenario : 'Target') as keyof typeof SCENARIO_MULTIPLIERS;

    const config = SCENARIO_MULTIPLIERS[activeScenario];

    // Channel synergy bonus (each added channel adds ~4% attribution lift up to 20%)
    const channelBonus = Math.min((selectedChannels.length || 1) * 0.04, 0.20);
    const projectedRoas = Number((config.roasMultiplier * (1 + channelBonus)).toFixed(2));

    const projectedMonthlyRevenue = Math.round(budget * projectedRoas);
    const projectedAnnualRevenue = projectedMonthlyRevenue * 12;

    const currentMonthlyConv = Math.round(traffic * (baseConv / 100));
    const optimizedConvRate = Number((baseConv * (1 + config.convLiftPct / 100)).toFixed(2));
    const projectedConversions = Math.round(traffic * (optimizedConvRate / 100));

    const currentCac = currentMonthlyConv > 0 ? Math.round(budget / currentMonthlyConv) : Math.round(budget / 10);
    const projectedCac = Math.max(Math.round(currentCac * (1 - config.cacReductionPct / 100)), 15);

    // Timeline milestones
    const timeline = [
      {
        month: 'Month 1',
        title: 'Diagnostic & Tracking Infrastructure',
        deliverables: 'Server-side CAPI tagging, Core Web Vitals audit, and negative keyword sculpting.',
        projectedMonthlyRev: Math.round(budget * 1.8),
        expectedRoas: 1.8,
      },
      {
        month: 'Month 3',
        title: 'Creative Scaling & High-Intent Bidding',
        deliverables: 'Winning creative variations scaled, smart bidding calibrated, high-intent SEO cluster indexed.',
        projectedMonthlyRev: Math.round(budget * (projectedRoas * 0.7)),
        expectedRoas: Number((projectedRoas * 0.7).toFixed(1)),
      },
      {
        month: 'Month 6',
        title: 'Funnel CRO & Efficiency Compounding',
        deliverables: 'Checkout drop-off remediation, automated lifecycle email flows, and international market expansion.',
        projectedMonthlyRev: projectedMonthlyRevenue,
        expectedRoas: projectedRoas,
      },
      {
        month: 'Month 12',
        title: 'Full Omnichannel Market Authority',
        deliverables: 'Dominant organic position for core category terms, automated ROAS safeguarding, and scalable unit economics.',
        projectedMonthlyRev: Math.round(projectedMonthlyRevenue * 1.25),
        expectedRoas: Number((projectedRoas * 1.25).toFixed(1)),
      },
    ];

    res.json({
      currency,
      businessModel,
      scenario: activeScenario,
      budget,
      projectedRoas,
      projectedMonthlyRevenue,
      projectedAnnualRevenue,
      currentMonthlyConv,
      projectedConversions,
      optimizedConvRate,
      currentCac,
      projectedCac,
      cacReductionPct: config.cacReductionPct,
      timeline,
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Calculation failed', details: error.message });
  }
});

// Save simulation and optionally create high-intent lead
simulatorRouter.post('/save', (req, res) => {
  try {
    const {
      businessModel,
      currency = 'USD',
      monthlyBudget,
      monthlyTraffic,
      baselineConversionRate,
      averageDealValue,
      selectedChannels = [],
      scenario = 'Target',
      projectedRoas,
      projectedMonthlyRevenue,
      projectedAnnualRevenue,
      projectedCac,
      cacReductionPct,
      contactName,
      contactEmail,
      companyName,
      websiteUrl,
    } = req.body;

    if (!monthlyBudget) {
      return res.status(400).json({ error: 'Monthly budget is required' });
    }

    const saved = store.saveSimulation({
      businessModel: businessModel || 'B2B Enterprise',
      currency: currency || 'USD',
      monthlyBudget: Number(monthlyBudget),
      monthlyTraffic: Number(monthlyTraffic) || 20000,
      baselineConversionRate: Number(baselineConversionRate) || 1.8,
      averageDealValue: Number(averageDealValue) || 400,
      selectedChannels: Array.isArray(selectedChannels) ? selectedChannels : ['Google Ads', 'SEO'],
      scenario: scenario || 'Target',
      projectedRoas: Number(projectedRoas) || 4.2,
      projectedMonthlyRevenue: Number(projectedMonthlyRevenue) || 42000,
      projectedAnnualRevenue: Number(projectedAnnualRevenue) || 504000,
      projectedCac: Number(projectedCac) || 95,
      cacReductionPct: Number(cacReductionPct) || 34,
      contactName,
      contactEmail,
      companyName,
      websiteUrl,
    });

    res.json({
      message: 'Growth simulation blueprint successfully saved and recorded',
      simulation: saved,
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to save simulation', details: error.message });
  }
});

// Get recent simulations
simulatorRouter.get('/history', (req, res) => {
  const sims = store.getSimulations();
  res.json({ simulations: sims });
});
