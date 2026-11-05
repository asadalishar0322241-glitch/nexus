/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Router } from 'express';
import { GoogleGenAI } from '@google/genai';

export const chatRouter = Router();

const SYSTEM_INSTRUCTION = `You are the Senior Digital Marketing Strategist and Growth Director at Nexus International Digital Marketing Agency.
Your mission is to provide expert, data-driven, and consultative marketing advice to ambitious founders, CMOs, and marketing leaders from the United States, United Kingdom, United Arab Emirates, and around the world.

Agency Context & Capabilities:
- We specialize in Search Engine Optimization (SEO), Google Ads & Performance PPC, Meta & Instagram Advertising, High-Converting Web Design & CRO Engineering, E-Commerce Omnichannel Growth, Lifecycle Email Marketing, and Brand Identity.
- We support multi-currency billing: USD ($), GBP (£), and AED (د.إ).
- Our operational hubs are in New York (EST), London (GMT), and Dubai (GST).
- We maintain a strictly senior-led squad model with zero junior delegation.

Guidelines for Your Responses:
1. Be direct, authoritative, and consultative. Avoid generic marketing fluff or lazy buzzwords (like "supercharge" or "unlock potential").
2. Focus on unit economics: CAC (Customer Acquisition Cost), LTV (Lifetime Value), ROAS (Return on Ad Spend), CAPI (Conversions API), Core Web Vitals, and conversion rate bottlenecks.
3. Recommend specific channels based on their business type (e.g. B2B SaaS -> Technical SEO + Google Search Ads + Comparison Hubs; Luxury E-Commerce -> Meta CAPI UGC + Performance Max + Klaviyo Lifecycle Flows).
4. When relevant, invite the user to schedule a free 30-minute diagnostic session with our Senior Practice Director or submit their domain for a 48-hour forensic audit.
5. Keep your tone executive, polished, and helpful.`;

chatRouter.post('/', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message text is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.json({
        reply: `Thank you for reaching the Nexus Senior Advisory Desk. Our Practice Directors in London, New York, and Dubai are currently leading active client sprint reviews. For immediate strategic evaluation of your channel mix, unit economics, or market expansion, please click "Book Consultation" to reserve a direct 30-minute diagnostic session with our leadership team.`
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    // Format chat history for @google/genai chats
    const formattedHistory = Array.isArray(history)
      ? history.map((item: any) => ({
          role: item.role === 'assistant' ? 'model' : item.role,
          parts: Array.isArray(item.parts) ? item.parts : [{ text: String(item.text || '') }],
        }))
      : [];

    const chat = ai.chats.create({
      model: 'gemini-3.8-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: formattedHistory,
    });

    const response = await chat.sendMessage({
      message,
    });

    const reply = response.text || 'Thank you for your inquiry. Our strategist is analyzing your request.';
    return res.json({ reply });
  } catch (error: any) {
    console.error('Error executing Gemini API chat:', error);
    return res.status(500).json({
      error: 'Failed to process AI strategist conversation',
      details: error?.message || 'Internal server error',
    });
  }
});
