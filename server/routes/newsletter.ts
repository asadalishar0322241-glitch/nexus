/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Router } from 'express';
import { store } from '../db/store';
import { notifications } from '../utils/notifications';

export const newsletterRouter = Router();

newsletterRouter.post('/', (req, res) => {
  try {
    const { email, country } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid business email address.' });
    }

    const { subscriber, isNew } = store.createSubscriber(String(email).trim().toLowerCase(), country);

    if (isNew) {
      notifications.notifyNewsletterSub(String(email).trim().toLowerCase());
    }

    return res.status(200).json({
      success: true,
      message: isNew
        ? 'Successfully subscribed to the Nexus Executive Marketing Briefing.'
        : 'Your email is already subscribed to the briefing.',
      subscriberId: subscriber.id,
    });
  } catch (error: any) {
    console.error('Failed to subscribe to newsletter:', error);
    return res.status(500).json({ error: 'Failed to process newsletter subscription.' });
  }
});

newsletterRouter.get('/', (req, res) => {
  try {
    const subscribers = store.getSubscribers();
    return res.json({ success: true, count: subscribers.length, subscribers });
  } catch (error: any) {
    console.error('Failed to get subscribers:', error);
    return res.status(500).json({ error: 'Failed to retrieve subscribers.' });
  }
});
