'use client';

import { useEffect, useState } from 'react';
import type { GalleryImage } from '../types';

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/gallery')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setImages(data);
        } else {
          setError('Failed to load gallery');
          setImages([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching gallery:', error);
        setError('Failed to load gallery');
        setImages([]);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="inline-block animate-spin text-4xl mb-4">📸</div>
        <p className="text-gray-600 text-lg">Loading memories...</p>
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
    <section id="gallery" className="gallery py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">📸 GALLERY</h2>
          <p className="gallery-subtitle text-xl text-gray-600 font-semibold">Real moments. Real memories.</p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4"></div>
        </div>

        <div className="gallery-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((img) => (
            <div key={img._id} className="gallery-item group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105">
              <div className="gallery-image w-full h-64 bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-6xl group-hover:scale-110 transition duration-300">
                {img.category === 'safari' && '🐾'}
                {img.category === 'beach' && '🌊'}
                {img.category === 'group' && '🧳'}
                {img.category === 'clients' && '😄'}
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition flex items-end">
                <div className="w-full p-4 text-white translate-y-full group-hover:translate-y-0 transition">
                  <p className="gallery-title font-bold text-lg">{img.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {images.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Gallery coming soon! Check back for amazing travel moments.</p>
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-gray-600 text-lg mb-4">Want to be featured in our gallery?</p>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg transition transform hover:scale-105">
            Share Your Story 📸
          </button>
        </div>
      </div>
    </section>
  );
}
