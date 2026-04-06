'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">📞 CONTACT US</h2>
          <p className="text-gray-600">Let's plan your next adventure together!</p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="contact-info space-y-6">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Ariella Adventures</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">📍</span>
                  <div>
                    <p className="font-semibold text-gray-800">Location</p>
                    <p className="text-gray-600">Kampala, Uganda</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-3xl">📱</span>
                  <div>
                    <p className="font-semibold text-gray-800">Phone</p>
                    <p className="text-gray-600">+256703269028</p>
                    <p className="text-gray-600">0773150749</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-3xl">📧</span>
                  <div>
                    <p className="font-semibold text-gray-800">Email</p>
                    <p className="text-gray-600">ariellaadventuressafari@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-3xl">💬</span>
                  <div>
                    <p className="font-semibold text-gray-800">WhatsApp</p>
                    <a 
                      href="https://wa.me/256773150749" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 font-semibold"
                    >
                      +256773150749 (Chat with us)
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <p className="text-gray-700">
                  <span className="font-bold text-blue-600">✨ Tip:</span> Reach out via WhatsApp for the fastest response!
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">👤 Your Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">📧 Your Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">📱 Phone (Optional)</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">📝 Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="e.g., Trip Inquiry, General Question"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">💬 Message</label>
                <textarea
                  name="message"
                  placeholder="Tell us about your travel dreams..."
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition resize-none"
                />
              </div>

              <button 
                type="submit" 
                className="w-full btn btn-primary bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 rounded-lg transition transform hover:shadow-lg disabled:opacity-50"
                disabled={loading}
              >
                {loading ? '⏳ Sending...' : '🚀 Send Message'}
              </button>

              {submitted && (
                <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 text-center">
                  <p className="text-green-700 font-semibold">✅ Message sent successfully!</p>
                  <p className="text-green-600 text-sm mt-2">We'll get back to you soon!</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
