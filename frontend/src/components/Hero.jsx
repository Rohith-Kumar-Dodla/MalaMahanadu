import React from 'react';

const Hero = ({ title, subtitle, backgroundImage, showCTA = true }) => {
  return (
    <div className="relative bg-primary-700 overflow-hidden">
      {/* Content */}
      <div className="relative py-8 xs:py-10 sm:py-14 md:py-16 lg:py-20 xl:py-24 2xl:py-28 w-full overflow-hidden">
        <div className="w-full px-4 sm:px-6 md:px-4 lg:px-6 xl:px-8">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 xs:gap-8 sm:gap-8 lg:gap-10 xl:gap-16 w-full">
            {/* Left Side - Full Ambedkar Image */}
            <div className="flex-shrink-0 order-2 lg:order-1 w-full lg:w-auto flex justify-center lg:justify-start">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gold-400/20 rounded-lg blur-xl xs:blur-2xl lg:blur-3xl transform scale-90 xs:scale-95 lg:scale-105"></div>
                
                {/* Full image container without background */}
                <div className="relative">
                  <img
                    src="/mock-images/ambedkar-removebg-preview.png"
                    alt="Dr. B.R. Ambedkar"
                    className="w-24 xs:w-32 sm:w-40 md:w-52 lg:w-64 xl:w-80 2xl:w-96 h-auto object-contain rounded"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjM4NCIgdmlld0JveD0iMCAwIDMyMCAzODQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMzg0IiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjE2MCIgeT0iMTkyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBjbGFzcz0iZm9udCIgc3R5bGU9ImZvbnQtc2l6ZTogMjBweDsgZmlsbDogIzlDQTNBRjsiPkFtYmVkamFyPC90ZXh0Pgo8L3N2Zz4K';
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Center - Main Title and Tagline */}
            <div className="flex-1 order-1 lg:order-2 text-center lg:text-center xl:text-left">
              {/* Power animation for title */}
              <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white mb-2 xs:mb-3 sm:mb-4 lg:mb-6 leading-tight">
                <span className="inline-block transform hover:scale-105 transition-transform duration-300">Mala</span>{' '}
                <span className="inline-block transform hover:scale-105 transition-transform duration-300 delay-100">Community</span>
              </h1>
              
              {/* Enhanced slogan with professional highlighting */}
              <div className="relative mb-3 xs:mb-4 sm:mb-6 lg:mb-8">
                <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-white leading-relaxed font-medium">
                  <span className="inline-block">Rising</span>{' '}
                  <span className="inline-block bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent font-bold px-1 xs:px-1 sm:px-2">With Dignity</span>,{' '}
                  <span className="inline-block">Leading</span>{' '}
                  <span className="inline-block bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent font-bold px-1 xs:px-1 sm:px-2">With Strength</span>
                </p>
              </div>
              
              {showCTA && (
                <div className="flex flex-col xs:flex-row sm:flex-row gap-2 xs:gap-3 sm:gap-4 lg:gap-6 justify-center lg:justify-center xl:justify-start mt-4 xs:mt-6 sm:mt-8 lg:mt-10">
                  <a
                    href="/about"
                    className="inline-block bg-gold-500 hover:bg-gold-600 text-white font-bold px-3 xs:px-4 sm:px-6 lg:px-8 xl:px-10 py-2 xs:py-2.5 sm:py-3 lg:py-4 rounded-lg sm:rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 sm:hover:-translate-y-2 hover:scale-105 text-xs xs:text-sm sm:text-base lg:text-lg"
                  >
                    Discover More
                  </a>
                  <a
                    href="/key-persons"
                    className="inline-block bg-transparent hover:bg-white/20 text-white font-bold px-3 xs:px-4 sm:px-6 lg:px-8 xl:px-10 py-2 xs:py-2.5 sm:py-3 lg:py-4 rounded-lg sm:rounded-xl transition-all duration-300 border-2 border-white hover:border-white/80 shadow-lg hover:shadow-xl hover:scale-105 text-xs xs:text-sm sm:text-base lg:text-lg"
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
          className="w-full h-8 xs:h-10 sm:h-12 lg:h-16 xl:h-20" 
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
