import type { NextApiRequest, NextApiResponse } from 'next';
import { initializeDatabase } from '../../lib/backend/initDb';
import Package from '../../lib/backend/models/Package';

// Initialize database on first request
let dbInitialized = false;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!dbInitialized) {
      await initializeDatabase();
      dbInitialized = true;
    }

    if (req.method === 'GET') {
      const packages = await Package.find().sort({ featured: -1, createdAt: -1 });
      return res.status(200).json(packages);
    }

    if (req.method === 'POST') {
      try {
        const newPackage = new Package({
          title: req.body.title,
          location: req.body.location,
          priceUGX: req.body.priceUGX,
          priceUSD: req.body.priceUSD,
          duration: req.body.duration,
          days: req.body.days,
          nights: req.body.nights,
          includes: req.body.includes || [],
          excludes: req.body.excludes || [],
          featured: req.body.featured || false,
        });

        const savedPackage = await newPackage.save();
        return res.status(201).json(savedPackage);
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
