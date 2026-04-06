export default function SpecialExperiences() {
  const experiences = [
    {
      icon: '💖',
      title: 'Romantic Escapes',
      description: 'Perfect for couples looking for intimate getaways and unforgettable moments together.',
      color: 'from-pink-500 to-red-500'
    },
    {
      icon: '🎉',
      title: 'Birthday & Surprise Trips',
      description: 'Celebrate your special day in extraordinary destinations we curate just for you.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: '👯♀️',
      title: "Girls' Trips & Squad Vacations",
      description: 'Bond with your friends in paradise. Adventure, laughter, and lifelong memories await.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '🌸',
      title: 'Solo/Self-Love Retreats',
      description: 'Discover yourself. Rejuvenate your soul. Travel solo with confidence and purpose.',
      color: 'from-green-500 to-teal-500'
    }
  ];

  return (
    <section className="special-experiences py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">💕 SPECIAL EXPERIENCES</h2>
          <p className="text-xl text-gray-600 font-semibold italic">Because travel should feel personal...</p>
          <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-red-500 mx-auto mt-4"></div>
        </div>

        <div className="experiences-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((exp, idx) => (
            <div 
              key={idx}
              className="experience-card bg-white rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 overflow-hidden group"
            >
              <div className={`bg-gradient-to-br ${exp.color} h-32 flex items-center justify-center group-hover:scale-110 transition duration-300`}>
                <span className="text-6xl">{exp.icon}</span>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-3">{exp.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>
                <button className="mt-4 text-blue-600 font-semibold hover:text-blue-800 transition">
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl text-center border-2 border-blue-200">
          <p className="text-lg text-gray-700">
            ✨ <span className="font-bold">Don't see what you're looking for?</span> We create completely custom experiences tailored to your dreams and budget!
          </p>
          <button className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg transition">
            Design My Experience
          </button>
        </div>
      </div>
    </section>
  );
}
