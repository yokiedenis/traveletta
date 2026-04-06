'use client';

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Video Background */}
      <video 
        autoPlay 
        muted 
        loop 
        className="absolute inset-0 w-full h-full object-cover"
        poster="/assets/videos/hero-poster.jpg"
      >
        <source src="/assets/videos/vid.mp4" type="video/mp4" />
        <source src="/assets/videos/vid.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Video Overlay - Dark gradient for readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Decorative overlay elements */}
      <div className="absolute inset-0 opacity-12">
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full mix-blend-overlay filter blur-3xl" style={{ background: 'rgba(80,180,64,0.06)' }}></div>
        <div className="absolute top-40 right-10 w-72 h-72 rounded-full mix-blend-overlay filter blur-3xl" style={{ background: 'rgba(0,0,0,0.2)' }}></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 rounded-full mix-blend-overlay filter blur-3xl" style={{ background: 'rgba(255,255,255,0.02)' }}></div>
      </div>

      <div className="hero-content relative z-10 container mx-auto px-4 text-center text-white">
        <div className="mb-6 animate-bounce">
          <span className="text-6xl">🌍</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
          Explore Uganda & Beyond with Ariella Adventures
        </h1>
        <p className="hero-subtitle text-xl md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-md font-light">
          Discover breathtaking destinations, unforgettable experiences, and travel designed just for you.
          Whether you're seeking adventure, love, or relaxation—we've got your journey covered.
        </p>
        <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => scrollToSection('featured-packages')}
            className="btn btn-primary px-8 py-3 text-white rounded-lg transition transform hover:scale-105 shadow-lg"
          >
            View Packages
          </button>
          <button 
            onClick={() => scrollToSection('custom-trip-planner')}
            className="btn btn-success px-8 py-3 text-white rounded-lg transition transform hover:scale-105 shadow-lg"
          >
            Plan My Trip
          </button>
        </div>
        <div className="mt-12 text-sm opacity-80">
          ↓ Scroll to explore more ↓
        </div>
      </div>
    </section>
  );
}
