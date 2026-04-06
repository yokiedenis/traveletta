'use client';

import { useEffect, useState } from 'react';
import type { BlogPost } from '../types';

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/blog')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          setError('Failed to load blog posts');
          setPosts([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching blog posts:', error);
        setError('Failed to load blog posts');
        setPosts([]);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="inline-block animate-spin text-4xl mb-4">📖</div>
        <p className="text-gray-600 text-lg">Loading travel stories...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-red-600 text-lg">⚠️ {error}</p>
        <p className="text-gray-600 text-sm mt-2">Please check that MongoDB is running</p>
      </div>
    </div>
  );

  return (
    <section id="blog" className="blog-section py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">📖 BLOG SECTION</h2>
          <p className="text-gray-600 text-lg">Travel tips, destination guides, and inspiring stories</p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4"></div>
        </div>

        <div className="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article 
              key={post._id} 
              className="blog-card bg-white rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 overflow-hidden group"
            >
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-48 flex items-center justify-center text-6xl group-hover:scale-110 transition duration-300">
                📝
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition">{post.title}</h3>
                
                <p className="excerpt text-gray-600 text-sm line-clamp-3">{post.excerpt}</p>

                <div className="blog-meta flex justify-between text-sm text-gray-500 border-t border-b py-3">
                  <span className="author">By <strong>{post.author}</strong></span>
                  <span className="date">{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>

                <div className="tags flex flex-wrap gap-2">
                  {post.tags.map((tag, idx) => (
                    <span key={idx} className="tag bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold hover:bg-blue-200 transition">
                      #{tag}
                    </span>
                  ))}
                </div>

                <button className="btn btn-secondary w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 rounded-lg transition transform hover:shadow-lg">
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Blog posts coming soon! Stay tuned for travel tips and destination guides.</p>
          </div>
        )}

        <div className="mt-12 text-center bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl border-2 border-green-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">📰 Subscribe to Our Newsletter</h3>
          <p className="text-gray-600 mb-4">Get travel tips, destination guides, and special offers delivered to your inbox</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none flex-1"
            />
            <button className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition">
              Subscribe ✉️
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
