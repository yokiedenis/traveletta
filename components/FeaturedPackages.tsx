'use client';

import { useEffect, useState } from 'react';
import type { Package } from '../types';

export default function FeaturedPackages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleBookNow = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    fetch('/api/packages')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPackages(data);
        } else {
          setError('Failed to load packages');
          setPackages([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching packages:', error);
        setError('Failed to load packages');
        setPackages([]);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="inline-block animate-spin text-4xl mb-4">🌍</div>
        <p className="text-gray-600 text-lg">Loading amazing packages...</p>
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
    <section id="featured-packages" className="featured-packages py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">🧭 FEATURED PACKAGES</h2>
          <p className="text-gray-600 text-lg">Handpicked destinations to inspire your next adventure</p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4"></div>
        </div>

        <div className="packages-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div key={pkg._id} className="package-card bg-white rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                <h3 className="text-2xl font-bold">{pkg.title}</h3>
              </div>

              <div className="p-6 space-y-4">
                <div className="border-b pb-3">
                  <p className="location text-lg font-semibold text-gray-700">📍 {pkg.location}</p>
                </div>

                <div className="price-info space-y-2">
                  <p className="price-ugx text-2xl font-bold text-green-600">💰 UGX {pkg.priceUGX.toLocaleString()}</p>
                  <p className="price-usd text-lg text-gray-600 font-semibold">${pkg.priceUSD}</p>
                </div>

                <div className="border-b pb-3">
                  <p className="duration font-semibold text-gray-700">🗓 {pkg.duration}</p>
                </div>

                <div className="space-y-3">
                  <div className="includes">
                    <strong className="text-green-600 block mb-2">✅ Includes:</strong>
                    <ul className="space-y-1 ml-4">
                      {pkg.includes.map((item, idx) => (
                        <li key={idx} className="text-gray-600 text-sm">• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="excludes pt-2">
                    <strong className="text-red-600 block mb-2">❌ Excludes:</strong>
                    <ul className="space-y-1 ml-4">
                      {pkg.excludes.map((item, idx) => (
                        <li key={idx} className="text-gray-600 text-sm">• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => handleBookNow(pkg)}
                  className="w-full mt-6 btn btn-primary bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 rounded-lg transition transform hover:shadow-lg"
                >
                  👉 Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {packages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No packages available at the moment. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
}
