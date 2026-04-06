export default function AboutUs() {
  return (
    <section id="about-us" className="about-us py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">✨ ABOUT US</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
        </div>

        <div className="space-y-6">
          <p className="intro text-2xl font-bold text-blue-600 text-center leading-relaxed">
            At Ariella Adventures, we don't just plan trips—we create memories that last a lifetime.
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg border-l-4 border-blue-500">
            <p className="text-lg text-gray-700 mb-4">
              Based in Kampala, Uganda, we specialize in local and international travel experiences for solo travelers, 
              couples, groups, and schools.
            </p>
            <p className="text-lg text-gray-700 font-semibold mb-3">
              🎯 <strong>Our mission is simple:</strong>
            </p>
            <p className="text-lg text-gray-700 ml-4 border-l-4 border-green-500 pl-4 italic">
              To help you escape, explore, and experience life in the most beautiful way.
            </p>
          </div>

          <p className="highlight text-center text-2xl font-bold bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent py-6">
            💖 With Ariella Adventures, every trip tells a story.
          </p>

          {/* Why Choose Us */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Why Choose Ariella Adventures?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-blue-50 rounded-lg text-center hover:shadow-lg transition">
                <div className="text-4xl mb-3">🌟</div>
                <h4 className="font-bold text-gray-800 mb-2">Personalized Service</h4>
                <p className="text-gray-600">Every trip is customized to your unique preferences and needs.</p>
              </div>
              <div className="p-6 bg-green-50 rounded-lg text-center hover:shadow-lg transition">
                <div className="text-4xl mb-3">💰</div>
                <h4 className="font-bold text-gray-800 mb-2">Affordable Packages</h4>
                <p className="text-gray-600">Premium experiences at prices that won't break the bank.</p>
              </div>
              <div className="p-6 bg-purple-50 rounded-lg text-center hover:shadow-lg transition">
                <div className="text-4xl mb-3">🤝</div>
                <h4 className="font-bold text-gray-800 mb-2">Expert Guides</h4>
                <p className="text-gray-600">Knowledgeable, passionate guides who love what they do.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
