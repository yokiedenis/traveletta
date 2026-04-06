'use client';

import { useEffect, useState } from 'react';
import type { Testimonial } from '../types';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/testimonials')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTestimonials(data);
        } else {
          setError('Failed to load testimonials');
          setTestimonials([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching testimonials:', error);
        setError('Failed to load testimonials');
        setTestimonials([]);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="inline-block animate-spin text-4xl mb-4">⭐</div>
        <p className="text-gray-600 text-lg">Loading reviews...</p>
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
    <section id="testimonials" className="testimonials py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">⭐ TESTIMONIALS</h2>
          <p className="text-gray-600 text-lg">Hear from our amazing travelers</p>
          <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mt-4"></div>
        </div>

        <div className="testimonials-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial._id} 
              className="testimonial-card bg-white rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 p-8 relative overflow-hidden"
            >
              {/* Decorative quote mark */}
              <div className="absolute -top-4 -right-4 text-6xl text-blue-100 opacity-50">"</div>
              
              <div className="relative z-10">
                <p className="message text-gray-700 text-lg leading-relaxed mb-4 italic">"{testimonial.message}"</p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="client-name font-bold text-gray-800">– {testimonial.clientName}</p>
                    <p className="trip-type text-sm text-gray-600 mt-1">{testimonial.tripType}</p>
                  </div>
                </div>
                
                <p className="rating text-yellow-400 text-lg mt-3">{Array(testimonial.rating).fill('⭐').join('')}</p>
              </div>
            </div>
          ))}
        </div>

        {testimonials.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No testimonials yet. Be the first to share your experience!</p>
          </div>
        )}

        <div className="mt-12 text-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Share Your Experience!</h3>
          <p className="mb-6">Had an amazing trip with us? We'd love to hear about it!</p>
          <button className="px-6 py-3 bg-white text-blue-600 font-bold rounded-lg hover:shadow-lg transition transform hover:scale-105">
            Write a Review ✍️
          </button>
        </div>
      </div>
    </section>
  );
}
