/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Router } from 'express';
import { store } from '../db/store';
import { notifications } from '../utils/notifications';

export const bookingsRouter = Router();

bookingsRouter.post('/', (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      company,
      websiteUrl,
      scheduledDate,
      scheduledTimeSlot,
      timeZone,
      primaryChallenge,
    } = req.body;

    if (!fullName || !email || !phone || !company || !scheduledDate) {
      return res.status(400).json({ error: 'Full name, email, phone, company, and date are required.' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    const booking = store.createBooking({
      fullName: String(fullName).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone).trim(),
      company: String(company).trim(),
      websiteUrl: websiteUrl ? String(websiteUrl).trim() : undefined,
      scheduledDate: String(scheduledDate),
      scheduledTimeSlot: scheduledTimeSlot || '14:00 - 14:45',
      timeZone: timeZone || 'Europe/London',
      primaryChallenge: primaryChallenge || 'Paid Media Scaling',
      status: 'Confirmed',
    });

    // Trigger automated notifications and calendar workflow
    notifications.notifyNewBooking(booking);

    return res.status(201).json({
      success: true,
      message: 'Consultation reserved. Google Meet calendar invitation dispatched.',
      bookingId: booking.id,
      booking,
    });
  } catch (error: any) {
    console.error('Failed to create booking:', error);
    return res.status(500).json({ error: 'Internal server error while reserving consultation.' });
  }
});

bookingsRouter.get('/', (req, res) => {
  try {
    const bookings = store.getBookings();
    return res.json({ success: true, count: bookings.length, bookings });
  } catch (error: any) {
    console.error('Failed to get bookings:', error);
    return res.status(500).json({ error: 'Failed to retrieve bookings.' });
  }
});

bookingsRouter.patch('/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const allowed = ['Confirmed', 'Completed', 'Rescheduled', 'Cancelled'];

    if (!allowed.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Allowed: ${allowed.join(', ')}` });
    }

    const updated = store.updateBookingStatus(id, status);
    if (!updated) {
      return res.status(404).json({ error: 'Booking not found.' });
    }

    return res.json({ success: true, booking: updated });
  } catch (error: any) {
    console.error('Failed to update booking status:', error);
    return res.status(500).json({ error: 'Failed to update booking status.' });
  }
});
