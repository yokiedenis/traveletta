import type { NextApiRequest, NextApiResponse } from 'next';
import { initializeDatabase } from '../../lib/backend/initDb';
import ContactMessage from '../../lib/backend/models/ContactMessage';

let dbInitialized = false;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!dbInitialized) {
      await initializeDatabase();
      dbInitialized = true;
    }

    if (req.method === 'POST') {
      try {
        const newMessage = new ContactMessage({
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          subject: req.body.subject,
          message: req.body.message,
        });

        const savedMessage = await newMessage.save();
        console.log('New contact message received:', savedMessage);
        return res.status(201).json({ message: 'Message sent successfully', data: savedMessage });
      } catch (error: any) {
        if (error.name === 'ValidationError') {
          const messages = Object.values(error.errors).map((e: any) => e.message);
          return res.status(400).json({ error: messages.join(', ') });
        }
        throw error;
      }
    }

    if (req.method === 'GET') {
      const messages = await ContactMessage.find().sort({ createdAt: -1 });
      return res.status(200).json(messages);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
