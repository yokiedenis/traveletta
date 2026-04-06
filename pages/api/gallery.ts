import type { NextApiRequest, NextApiResponse } from 'next';
import { initializeDatabase } from '../../lib/backend/initDb';
import GalleryImage from '../../lib/backend/models/GalleryImage';

let dbInitialized = false;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!dbInitialized) {
      await initializeDatabase();
      dbInitialized = true;
    }

    if (req.method === 'GET') {
      const images = await GalleryImage.find().sort({ uploadedAt: -1 });
      return res.status(200).json(images);
    }

    if (req.method === 'POST') {
      try {
        const newImage = new GalleryImage({
          title: req.body.title,
          url: req.body.url,
          category: req.body.category,
        });

        const savedImage = await newImage.save();
        return res.status(201).json(savedImage);
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
