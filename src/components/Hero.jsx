import React from 'react';

const Hero = ({ title, subtitle, backgroundImage, showCTA = true }) => {
  return (
    <div className="relative bg-primary-700 overflow-hidden">
      {/* Content */}
      <div className="relative py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col xl:flex-row items-center justify-between gap-8 lg:gap-12 xl:gap-16">
            {/* Left Side - Full Ambedkar Image */}
            <div className="flex-shrink-0 order-2 xl:order-1 w-full xl:w-auto">
              <div className="relative flex justify-center xl:justify-start">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gold-400/20 rounded-lg blur-2xl xl:blur-3xl transform scale-95 xl:scale-105"></div>
                
                {/* Full image container without background */}
                <div className="relative">
                  <img
                    src="/mock-images/ambedkar-removebg-preview.png"
                    alt="Dr. B.R. Ambedkar"
                    className="w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 h-auto object-contain rounded"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjM4NCIgdmlld0JveD0iMCAwIDMyMCAzODQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMzg0IiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjE2MCIgeT0iMTkyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBjbGFzcz0iZm9udCIgc3R5bGU9ImZvbnQtc2l6ZTogMjBweDsgZmlsbDogIzlDQTNBRjsiPkFtYmVkamFyPC90ZXh0Pgo8L3N2Zz4K';
                    }}
                  />
                </div>

                              </div>
            </div>

            {/* Center - Main Title and Tagline */}
            <div className="flex-1 order-1 xl:order-2 text-center xl:text-left">
              {/* Power animation for title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 lg:mb-8 leading-tight">
                <span className="inline-block transform hover:scale-105 transition-transform duration-300">Mala</span>{' '}
                <span className="inline-block transform hover:scale-105 transition-transform duration-300 delay-100">Community</span>
              </h1>
              
              {/* Enhanced slogan with professional highlighting */}
              <div className="relative mb-6 sm:mb-8 lg:mb-10">
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white leading-relaxed font-medium">
                  <span className="inline-block">Rising</span>{' '}
                  <span className="inline-block bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent font-bold px-1 sm:px-2">With Dignity</span>,{' '}
                  <span className="inline-block">Leading</span>{' '}
                  <span className="inline-block bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent font-bold px-1 sm:px-2">With Strength</span>
                </p>
              </div>
              
              {showCTA && (
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center xl:justify-start mt-8 sm:mt-10 lg:mt-12">
                  <a
                    href="/about"
                    className="inline-block bg-gold-500 hover:bg-gold-600 text-white font-bold px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-lg sm:rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 sm:hover:-translate-y-2 hover:scale-105 text-sm sm:text-base lg:text-lg"
                  >
                    Discover More
                  </a>
                  <a
                    href="/key-persons"
                    className="inline-block bg-transparent hover:bg-white/20 text-white font-bold px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-lg sm:rounded-xl transition-all duration-300 border-2 border-white hover:border-white/80 shadow-lg hover:shadow-xl hover:scale-105 text-sm sm:text-base lg:text-lg"
                  >
                    Meet Our Leaders
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          className="w-full h-12 md:h-16" 
          viewBox="0 0 1440 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" 
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
};

export default Hero;
