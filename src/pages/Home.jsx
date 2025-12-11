import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaHandHoldingHeart, FaNewspaper, FaImages, FaPhone, FaArrowRight, FaCalendarAlt, FaMapMarkerAlt, FaUserCircle } from 'react-icons/fa';
import Hero from '../components/Hero';
import SeoHead from '../components/SeoHead';
import Testimonials from '../components/Testimonials';
import { getSettings } from '../api/mockApi';

const Home = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const keyPersons = [
    {
      id: "1",
      name: "Chennaiah",
      role: "National President",
      photo: "/mock-images/chennaiah.jpg",
      description: "G. Chennaiah serves as the National President of Mala Mahanadu, a prominent organisation dedicated to the upliftment, rights"
    },
    {
      id: "2",
      name: "Burugula Venkateswarlu",
      role: "State President", 
      photo: "/mock-images/burgula-venkateswarlu.jpg",
      description: "Leading the state-level initiatives and representing our community at the regional level"
    },
    {
      id: "3",
      name: "Dr. Manda Ranjith Kumar",
      role: "State General Secretary",
      photo: "/mock-images/Manda-Ranjith-Kumar.jpg",
      description: "Managing organizational operations and coordinating community development programs"
    },
    {
      id: "4",
      name: "Bhaindla Srinivas",
      role: "Greater Hyderabad President",
      photo: "/mock-images/bhaindla-srinivas.jpg",
      description: "Leading Hyderabad region initiatives and community development programs."
    },
    {
      id: "5",
      name: "P. Koteswara Rao",
      role: "National Employees Association President",
      photo: "/mock-images/koteswara-rao.jpg",
      description: "Representing and advocating for employee rights and welfare at national level."
    }
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isMobile) {
        // Mobile: Show 2 cards per slide
        setCurrentSlide((prev) => (prev + 1) % Math.ceil(keyPersons.length / 2));
      } else {
        // Desktop: Show 3 cards per slide
        setCurrentSlide((prev) => (prev + 1) % Math.ceil(keyPersons.length / 3));
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isMobile, keyPersons.length]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const settingsRes = await getSettings();
        
        if (settingsRes.success) {
          setSettings(settingsRes.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <>
      <SeoHead 
        title="Mala Mahanadu - Community"
        description="Mala Mahanadu is dedicated to the welfare and empowerment of the Mala community through social justice and economic development."
        keywords="Mala Mahanadu, community, social justice, education, empowerment, Telangana"
      />
      
      <Hero />

      
      {/* About the Mala Community Section */}
      <section className="py-8 xs:py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-900 mb-6 xs:mb-8 text-center">
              About the Mala Community
            </h2>
            <p className="text-base xs:text-lg sm:text-xl text-gray-700 leading-relaxed mb-6 xs:mb-8">
              The Mala community is one of the major Scheduled Caste (SC) groups predominantly found in Andhra Pradesh and Telangana. Historically, the community faced social discrimination and economic marginalisation due to the traditional caste structure. Over time, Malas have made significant advancements in education, government jobs, politics, and various professional fields, becoming one of the more upwardly mobile Dalit sub-castes in the region.
            </p>
            
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 gap-6 xs:gap-8 mt-8 xs:mt-12">
              <div className="bg-gold-50 p-4 xs:p-6 rounded-lg">
                <h3 className="text-lg xs:text-xl font-bold text-primary-800 mb-3 xs:mb-4">Vision</h3>
                <p className="text-sm xs:text-base text-gray-700">
                  Mala Mahanadu envisions a socially just and equitable society where members of the Mala community can fully realise their constitutional rights...
                </p>
              </div>
              <div className="bg-gold-50 p-4 xs:p-6 rounded-lg">
                <h3 className="text-lg xs:text-xl font-bold text-primary-800 mb-3 xs:mb-4">Mission</h3>
                <p className="text-sm xs:text-base text-gray-700">
                  The mission of Mala Mahanadu is to mobilise and represent the Mala community through collective action, advocacy, and public engagement.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-6 xs:mt-8">
              <Link
                to="/about"
                className="inline-block bg-gold-500 hover:bg-gold-600 text-white font-semibold px-6 xs:px-8 py-2 xs:py-3 rounded-lg transition-colors duration-200 text-sm xs:text-base"
              >
                Discover More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Persons Section */}
      <section className="py-8 xs:py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-900 mb-6 xs:mb-8 text-center">
              Key Persons
            </h2>
            <p className="text-base xs:text-lg sm:text-xl text-gray-700 text-center mb-8 xs:mb-12 max-w-4xl mx-auto">
              Mala Mahanadu key persons—the National President, State President, and State General Secretary—stand together as the heart, voice, and strength of our community, guiding our people, uniting our families, and leading every step of our upliftment.
            </p>
            
            <div className="relative">
            {/* Mobile/Tablet Carousel View */}
            {isMobile ? (
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 50}%)` }}
                >
                  {keyPersons.map((person, index) => (
                    <div key={index} className="w-1/2 flex-shrink-0 px-2">
                      <Link to="/key-persons" className="block">
                        <div className="bg-white p-3 xs:p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer mx-auto">
                          <div className="w-16 xs:w-20 h-16 xs:h-20 rounded-full mx-auto mb-2 xs:mb-3 overflow-hidden">
                            <img
                              src={person.photo}
                              alt={person.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.outerHTML = '<div class="w-16 xs:w-20 h-16 xs:h-20 bg-gold-100 rounded-full mx-auto mb-2 xs:mb-3 flex items-center justify-center"><svg class="w-8 xs:w-12 h-8 xs:h-12 text-gold-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></div>';
                              }}
                            />
                          </div>
                          <h3 className="text-sm xs:text-lg font-bold text-gray-900 mb-1">{person.name}</h3>
                          <p className="text-xs xs:text-sm text-gray-600 mb-2">{person.role}</p>
                          <p className="text-xs text-gray-500 line-clamp-2">
                            {person.description}
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
                
                {/* Carousel Indicators */}
                <div className="flex justify-center mt-4 xs:mt-6 space-x-2">
                  {Array.from({ length: Math.ceil(keyPersons.length / 2) }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                        currentSlide === index ? 'bg-gold-500' : 'bg-gray-300'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              /* Desktop Grid View */
              <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8">
                {keyPersons.map((person, index) => (
                  <Link key={index} to="/key-persons" className="block">
                    <div className="bg-white p-4 xs:p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                      <div className="w-20 xs:w-24 h-20 xs:h-24 rounded-full mx-auto mb-3 xs:mb-4 overflow-hidden">
                        <img
                          src={person.photo}
                          alt={person.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.outerHTML = '<div class="w-20 xs:w-24 h-20 xs:h-24 bg-gold-100 rounded-full mx-auto mb-3 xs:mb-4 flex items-center justify-center"><svg class="w-12 xs:w-16 h-12 xs:h-16 text-gold-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></div>';
                          }}
                        />
                      </div>
                      <h3 className="text-lg xs:text-xl font-bold text-gray-900 mb-2">{person.name}</h3>
                      <p className="text-sm xs:text-base text-gray-600 mb-3 xs:mb-4">{person.role}</p>
                      <p className="text-xs xs:text-sm text-gray-500">
                        {person.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
              
              {/* Carousel Indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: Math.ceil(keyPersons.length / (isMobile ? 2 : 3)) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                      currentSlide === index ? 'bg-gold-500' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
            
            <div className="text-center mt-8 xs:mt-12">
              <Link
                to="/key-persons"
                className="inline-block bg-gold-500 hover:bg-gold-600 text-white font-semibold px-6 xs:px-8 py-2 xs:py-3 rounded-lg transition-colors duration-200 text-sm xs:text-base"
              >
                Read more
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* About Preview Section */}
      <section className="py-8 xs:py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid xs:grid-cols-1 lg:grid-cols-2 gap-8 xs:gap-12 items-center">
            <div>
              <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-900 mb-4 xs:mb-6">
                About Mala Mahanadu
              </h2>
              <div className="prose prose-sm xs:prose-lg text-gray-600">
                <p>
                  {settings?.about_text || 'Mala Mahanadu is a prominent social organization dedicated to the welfare and empowerment of the Mala community. Founded with the vision of promoting social justice, education, and economic development, our organization has been at the forefront of advocating for the rights and interests of our community members across Telangana and beyond.'}
                </p>
              </div>
              <Link
                to="/about"
                className="inline-flex items-center space-x-2 mt-4 xs:mt-6 text-primary-600 hover:text-primary-700 font-medium text-sm xs:text-base"
              >
                <span>Learn More About Us</span>
                <FaArrowRight className="h-3 w-3 xs:h-4 xs:w-4" />
              </Link>
            </div>
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img
                src="/assets/about/about-pic-2.png"
                alt="About Mala Mahanadu"
                className="w-full h-full object-contain"
                style={{ maxHeight: '400px xs:max-h-500px sm:max-h-600px' }}
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjMwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBjbGFzcz0iZm9udCIgc3R5bGU9ImZvbnQtc2l6ZTogMjBweDsgZmlsbDogIzlDQTNBRjsiPkFib3V0IFVzIEltYWdlPC90ZXh0Pgo8L3N2Zz4K';
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
