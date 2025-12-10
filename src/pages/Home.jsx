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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              About the Mala Community
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              The Mala community is one of the major Scheduled Caste (SC) groups predominantly found in Andhra Pradesh and Telangana. Historically, the community faced social discrimination and economic marginalisation due to the traditional caste structure. Over time, Malas have made significant advancements in education, government jobs, politics, and various professional fields, becoming one of the more upwardly mobile Dalit sub-castes in the region.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-gold-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-primary-800 mb-4">Vision</h3>
                <p className="text-gray-700">
                  Mala Mahanadu envisions a socially just and equitable society where members of the Mala community can fully realise their constitutional rights...
                </p>
              </div>
              <div className="bg-gold-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-primary-800 mb-4">Mission</h3>
                <p className="text-gray-700">
                  The mission of Mala Mahanadu is to mobilise and represent the Mala community through collective action, advocacy, and public engagement.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Link
                to="/about"
                className="inline-block bg-gold-500 hover:bg-gold-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
              >
                Discover More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Persons Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Key Persons
            </h2>
            <p className="text-lg text-gray-700 text-center mb-12 max-w-4xl mx-auto">
              Mala Mahanadu key persons—the National President, State President, and State General Secretary—stand together as the heart, voice, and strength of our community, guiding our people, uniting our families, and leading every step of our upliftment.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                  <img
                    src="/mock-images/chennaiah.jpg"
                    alt="Chennaiah"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.outerHTML = '<div class="w-24 h-24 bg-gold-100 rounded-full mx-auto mb-4 flex items-center justify-center"><svg class="w-16 h-16 text-gold-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></div>';
                    }}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Chennaiah</h3>
                <p className="text-gray-600 mb-4">National President</p>
                <p className="text-sm text-gray-500">
                  G. Chennaiah serves as the National President of Mala Mahanadu, a prominent organisation dedicated to the upliftment, rights
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                  <img
                    src="/mock-images/burgula-venkateswarlu.jpg"
                    alt="Burugula Venkateswarlu"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.outerHTML = '<div class="w-24 h-24 bg-gold-100 rounded-full mx-auto mb-4 flex items-center justify-center"><svg class="w-16 h-16 text-gold-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></div>';
                    }}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Burugula Venkateswarlu</h3>
                <p className="text-gray-600 mb-4">State President</p>
                <p className="text-sm text-gray-500">
                  Leading the state-level initiatives and representing our community at the regional level
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                  <img
                    src="/mock-images/Manda-Ranjith-Kumar.jpg"
                    alt="Dr. Manda Ranjith Kumar"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.outerHTML = '<div class="w-24 h-24 bg-gold-100 rounded-full mx-auto mb-4 flex items-center justify-center"><svg class="w-16 h-16 text-gold-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></div>';
                    }}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Dr. Manda Ranjith Kumar</h3>
                <p className="text-gray-600 mb-4">State General Secretary</p>
                <p className="text-sm text-gray-500">
                  Managing organizational operations and coordinating community development programs
                </p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link
                to="/key-persons"
                className="inline-block bg-gold-500 hover:bg-gold-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                About Mala Mahanadu
              </h2>
              <div className="prose prose-lg text-gray-600">
                <p>
                  {settings?.about_text || 'Mala Mahanadu is a prominent social organization dedicated to the welfare and empowerment of the Mala community. Founded with the vision of promoting social justice, education, and economic development, our organization has been at the forefront of advocating for the rights and interests of our community members across Telangana and beyond.'}
                </p>
              </div>
              <Link
                to="/about"
                className="inline-flex items-center space-x-2 mt-6 text-primary-600 hover:text-primary-700 font-medium"
              >
                <span>Learn More About Us</span>
                <FaArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              <img
                src="/assets/about/about1.jpg"
                alt="About Mala Mahanadu"
                className="w-full h-full object-cover"
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
