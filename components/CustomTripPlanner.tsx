'use client';

import { useState } from 'react';

export default function CustomTripPlanner() {
  const [formData, setFormData] = useState({
    name: '',
    destination: '',
    budget: '',
    startDate: '',
    endDate: '',
    numberOfPeople: 1,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          subject: `Custom Trip Request - ${formData.destination}`,
          message: `Destination: ${formData.destination}\nBudget: ${formData.budget}\nTravel Dates: ${formData.startDate} to ${formData.endDate}\nNumber of People: ${formData.numberOfPeople}`,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: '',
          destination: '',
          budget: '',
          startDate: '',
          endDate: '',
          numberOfPeople: 1,
        });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="custom-trip-planner" className="custom-trip-planner py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">📅 PLAN YOUR OWN TRIP</h2>
          <p className="text-lg text-gray-600 font-semibold">Want something custom? We've got you!</p>
          <p className="text-gray-500 mt-2">Submit your dream trip details and get a personalized itinerary within 24 hours</p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4"></div>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="trip-form space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">👤 Your Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">🌍 Your Dream Destination</label>
              <input
                type="text"
                name="destination"
                placeholder="e.g., Mount Kilimanjaro, Seychelles, Rwanda"
                value={formData.destination}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">💰 Budget</label>
              <input
                type="text"
                name="budget"
                placeholder="e.g., UGX 2,000,000 or $500"
                value={formData.budget}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">📅 Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">📅 End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">👥 Number of Travelers</label>
              <select 
                name="numberOfPeople" 
                value={formData.numberOfPeople} 
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
              >
                <option value={1}>1 Person (Solo Adventure)</option>
                <option value={2}>2 People (Couple)</option>
                <option value={3}>3 People</option>
                <option value={4}>4 People</option>
                <option value={5}>5+ People (Group)</option>
              </select>
            </div>

            <button 
              type="submit" 
              className="w-full btn btn-success bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 rounded-lg transition transform hover:shadow-lg disabled:opacity-50"
              disabled={loading}
            >
              {loading ? '⏳ Submitting...' : '👉 Get Personalized Itinerary'}
            </button>

            {submitted && (
              <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 text-center">
                <p className="text-green-700 font-semibold">✅ Request submitted successfully!</p>
                <p className="text-green-600 text-sm mt-2">Check your email for our personalized response within 24 hours.</p>
              </div>
            )}
          </form>
        </div>

        <div className="mt-8 bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
          <p className="text-gray-700">
            <span className="font-bold text-blue-600">💡 Tip:</span> Be specific about your interests and preferences! 
            The more details you provide, the better we can tailor your experience.
          </p>
        </div>
      </div>
    </section>
  );
}
