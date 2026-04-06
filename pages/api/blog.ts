import type { NextApiRequest, NextApiResponse } from 'next';
import { initializeDatabase } from '../../lib/backend/initDb';
import BlogPost from '../../lib/backend/models/BlogPost';

let dbInitialized = false;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!dbInitialized) {
      await initializeDatabase();
      dbInitialized = true;
    }

    if (req.method === 'GET') {
      const posts = await BlogPost.find({ published: true }).sort({ createdAt: -1 });
      return res.status(200).json(posts);
    }

    if (req.method === 'POST') {
      try {
        const newPost = new BlogPost({
          title: req.body.title,
          slug: req.body.slug,
          content: req.body.content,
          excerpt: req.body.excerpt,
          author: req.body.author,
          tags: req.body.tags || [],
          published: req.body.published || false,
        });

        const savedPost = await newPost.save();
        return res.status(201).json(savedPost);
      } catch (error: any) {
        if (error.name === 'ValidationError') {
          const messages = Object.values(error.errors).map((e: any) => e.message);
          return res.status(400).json({ error: messages.join(', ') });
        }
        if (error.code === 11000) {
          return res.status(400).json({ error: 'Slug already exists' });
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
