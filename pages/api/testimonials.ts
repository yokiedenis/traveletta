import type { NextApiRequest, NextApiResponse } from 'next';
import { initializeDatabase } from '../../lib/backend/initDb';
import Testimonial from '../../lib/backend/models/Testimonial';

let dbInitialized = false;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!dbInitialized) {
      await initializeDatabase();
      dbInitialized = true;
    }

    if (req.method === 'GET') {
      const testimonials = await Testimonial.find().sort({ createdAt: -1 });
      return res.status(200).json(testimonials);
    }

    if (req.method === 'POST') {
      try {
        const newTestimonial = new Testimonial({
          clientName: req.body.clientName,
          message: req.body.message,
          rating: req.body.rating,
          tripType: req.body.tripType,
        });

        const savedTestimonial = await newTestimonial.save();
        return res.status(201).json(savedTestimonial);
      } catch (error: any) {
        if (error.name === 'ValidationError') {
          const messages = Object.values(error.errors).map((e: any) => e.message);
          return res.status(400).json({ error: messages.join(', ') });
        }
        throw error;
      }
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
