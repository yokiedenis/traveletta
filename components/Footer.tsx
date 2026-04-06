export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
  <footer className="footer bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="footer-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div className="footer-section">
            <h4 className="text-2xl font-bold mb-4">🌍 Ariella Adventures</h4>
            <p className="text-gray-300 leading-relaxed">
              Creating unforgettable travel experiences across Uganda and beyond. We specialize in personalized journeys for adventurers, couples, and groups.
            </p>
            <div className="mt-4 flex gap-4">
              <a href="#" className="hover:text-primary transition">📱 Instagram</a>
              <a href="#" className="hover:text-primary transition">👍 Facebook</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="text-xl font-bold mb-4">🔗 Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#featured-packages" className="hover:text-white transition">Featured Packages</a></li>
              <li><a href="#about-us" className="hover:text-white transition">About Us</a></li>
              <li><a href="#gallery" className="hover:text-white transition">Gallery</a></li>
              <li><a href="#blog" className="hover:text-white transition">Blog</a></li>
              <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="text-xl font-bold mb-4">📞 Contact</h4>
            <div className="space-y-3 text-gray-300">
              <p>📍 <span className="text-white font-semibold">Kampala, Uganda</span></p>
              <p>📱 <a href="tel:+256703269028" className="hover:text-white transition">+256703269028</a></p>
              <p>📧 <a href="mailto:ariellaadventuressafari@gmail.com" className="hover:text-white transition">ariellaadventuressafari@gmail.com</a></p>
              <p>💬 <a href="https://wa.me/256773150749" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">WhatsApp +256773150749</a></p>
            </div>
          </div>

          {/* Community */}
          <div className="footer-section">
            <h4 className="text-xl font-bold mb-4">💖 Travel With Nuella Hearts</h4>
            <p className="text-gray-300 leading-relaxed mb-4">
              Join me on curated trips filled with fun, laughter, connection, and unforgettable vibes. Let's explore the world together—not just as travelers, but as a family 💖
            </p>
            <button className="px-4 py-2 bg-[var(--primary-color)] hover:brightness-90 text-black font-bold rounded-lg transition transform hover:scale-105">
              Join My Trip
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center md:text-left text-gray-400 text-sm">
            <p>&copy; {currentYear} Ariella Adventures. All rights reserved.</p>
            <p>Built with ❤️ for travelers who love adventure</p>
          </div>

          {/* Social Links */}
          <div className="mt-6 flex justify-center gap-6">
            <a href="#" className="text-gray-400 hover:text-primary transition">🌐 Website</a>
            <a href="#" className="text-gray-400 hover:text-primary transition">📸 Instagram</a>
            <a href="#" className="text-gray-400 hover:text-primary transition">👍 Facebook</a>
            <a href="https://wa.me/256773150749" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition">💬 WhatsApp</a>
          </div>

          {/* Terms */}
          <div className="mt-6 text-center text-xs text-gray-500 space-y-2">
            <p>
              <a href="#" className="hover:text-gray-400 transition">Privacy Policy</a> | 
              <a href="#" className="hover:text-gray-400 transition"> Terms of Service</a>
            </p>
            <p>Made with passion for the wanderers and dreamers 🌟</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
