import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaUsers, FaEnvelope, FaPhone, FaGraduationCap, FaAward, FaSpinner } from 'react-icons/fa';
import SeoHead from '../components/SeoHead';
import { getKeyPersons } from '../api/mockApi';

const KeyPersons = () => {
  const { personId } = useParams();
  const [keyPersons, setKeyPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Check if mobile device
    const checkMobile = () => {
      const wasMobile = isMobile;
      const nowMobile = window.innerWidth < 768;
      setIsMobile(nowMobile);
      
      // Cleanup wrapper when switching from mobile to desktop
      if (wasMobile && !nowMobile) {
        const scrollWrapper = document.querySelector('[data-scroll-wrapper]');
        if (scrollWrapper) {
          const keyPersonsSection = scrollWrapper.querySelector('[data-key-persons-section]');
          if (keyPersonsSection) {
            // Move the key persons section back to its original position
            scrollWrapper.parentNode.insertBefore(keyPersonsSection, scrollWrapper);
          }
          // Remove the wrapper
          scrollWrapper.remove();
        }
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile && keyPersons.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % Math.ceil(keyPersons.length / 2));
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [isMobile, keyPersons.length]);

  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    const fetchKeyPersons = async () => {
      try {
        setLoading(true);
        const response = await getKeyPersons();
        
        if (response.success) {
          setKeyPersons(response.data);
          setError(null);
        } else {
          setError('Failed to fetch key persons');
        }
      } catch (err) {
        setError('Error loading key persons. Please try again later.');
        console.error('Error fetching key persons:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchKeyPersons();
  }, []);

  const getRoleIcon = (role) => {
    if (role.toLowerCase().includes('president')) return FaAward;
    if (role.toLowerCase().includes('education')) return FaGraduationCap;
    return FaUsers;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="h-12 w-12 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading key persons...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SeoHead 
        title="Key Persons - Mala Mahanadu"
        description="Meet the key leaders and office bearers of Mala Mahanadu organization."
        keywords="Mala Mahanadu, key persons, leaders, office bearers, committee"
      />
      
      {/* Hero Section */}
      <div className="relative h-64 lg:h-80 xl:h-96 bg-primary-600">
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center px-4 max-w-6xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6">
              Key Persons
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white max-w-4xl mx-auto leading-relaxed">
              Meet our dedicated leadership team
            </p>
          </div>
        </div>
      </div>

      {/* Key Persons Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          {keyPersons.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <FaUsers className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                No key persons available
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Check back later for information about our leadership team
              </p>
            </div>
          ) : (
            <div>
              {/* Mobile Carousel View */}
              {isMobile ? (
                <div className="overflow-hidden">
                  <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 50}%)` }}
                  >
                    {keyPersons.map((person) => {
                      const IconComponent = getRoleIcon(person.role);
                      return (
                        <div key={person.id} className="w-1/2 flex-shrink-0 px-2">
                          <div
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group cursor-pointer"
                            onClick={() => {
                              setSelectedPerson(person);
                              // Smooth scroll to details section
                              setTimeout(() => {
                                const detailsSection = document.getElementById('details-section');
                                if (detailsSection) {
                                  detailsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                              }, 100);
                            }}
                          >
                            {/* Photo */}
                            <div className="relative aspect-[3/4] overflow-hidden">
                              <img
                                src={person.photo}
                                alt={person.name}
                                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBjbGFzcz0iZm9udCIgc3R5bGU9ImZvbnQtc2l6ZTogMjBweDsgZmlsbDogIzlDQTNBRjsiPlBob3RvPC90ZXh0Pgo8L3N2Zz4K';
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            {/* Content */}
                            <div className="p-3">
                              {/* Icon and Role */}
                              <div className="flex items-center justify-center mb-2">
                                <div className="flex items-center justify-center w-8 h-8 bg-primary-100 rounded-full">
                                  <IconComponent className="h-4 w-4 text-primary-600" />
                                </div>
                              </div>

                              {/* Name and Role */}
                              <h3 className="text-sm font-bold text-gray-900 mb-1 text-center">
                                {person.name}
                              </h3>
                              <p className="text-primary-600 font-medium text-center mb-2 text-xs">
                                {person.role}
                              </p>

                              {/* Bio */}
                              <p className="text-gray-600 text-xs leading-relaxed text-center line-clamp-2">
                                {person.bio}
                              </p>

                              {/* Contact Actions */}
                              <div className="mt-3 flex justify-center">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // In a real app, this would open a contact form or email client
                                    console.log('Contact:', person.name);
                                  }}
                                  className="flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-md transition-colors text-xs"
                                  title="Contact"
                                >
                                  <FaEnvelope className="h-3 w-3" />
                                  <span>Contact</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Carousel Indicators */}
                  <div className="flex justify-center mt-6 space-x-2">
                    {Array.from({ length: Math.ceil(keyPersons.length / 2) }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                          currentSlide === index ? 'bg-primary-600' : 'bg-gray-300'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                /* Desktop Grid View */
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
                  {keyPersons.map((person) => {
                    const IconComponent = getRoleIcon(person.role);
                    return (
                      <div
                        key={person.id}
                        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:scale-105"
                        onClick={() => {
                          setSelectedPerson(person);
                          // Smooth scroll to details section
                          setTimeout(() => {
                            const detailsSection = document.getElementById('details-section');
                            if (detailsSection) {
                              detailsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          }, 100);
                        }}
                      >
                        {/* Photo */}
                        <div className="relative aspect-[3/4] lg:aspect-[2/3] overflow-hidden">
                          <img
                            src={person.photo}
                            alt={person.name}
                            className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBjbGFzcz0iZm9udCIgc3R5bGU9ImZvbnQtc2l6ZTogMjBweDsgZmlsbDogIzlDQTNBRjsiPlBob3RvPC90ZXh0Pgo8L3N2Zz4K';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        {/* Content */}
                        <div className="p-4 md:p-5 lg:p-6">
                          {/* Icon and Role */}
                          <div className="flex items-center justify-center mb-3 md:mb-4">
                            <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-primary-100 rounded-full">
                              <IconComponent className="h-5 w-5 md:h-6 md:w-6 text-primary-600" />
                            </div>
                          </div>

                          {/* Name and Role */}
                          <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-2 lg:mb-3 text-center">
                            {person.name}
                          </h3>
                          <p className="text-primary-600 font-medium text-center mb-3 lg:mb-4 text-sm md:text-base">
                            {person.role}
                          </p>

                          {/* Bio */}
                          <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed text-center line-clamp-3">
                            {person.bio}
                          </p>

                          {/* Contact Actions */}
                          <div className="mt-4 lg:mt-6 flex justify-center">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // In a real app, this would open a contact form or email client
                                console.log('Contact:', person.name);
                              }}
                              className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 md:px-4 lg:px-5 rounded-lg transition-colors text-xs sm:text-sm md:text-base"
                              title="Contact"
                            >
                              <FaEnvelope className="h-3 w-3 sm:h-4 sm:w-4" />
                              <span>Contact</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Detailed Information Section */}
      {selectedPerson && selectedPerson.details && (
        <section id="details-section" className="py-12 sm:py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4 sm:mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{selectedPerson.name}</h2>
                  <button
                    onClick={() => setSelectedPerson(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl sm:text-3xl font-bold self-end sm:self-auto"
                  >
                    ×
                  </button>
                </div>
                
                <p className="text-primary-600 font-medium text-base sm:text-lg mb-6 sm:mb-8">{selectedPerson.role}</p>
                
                <div className="space-y-6 sm:space-y-8">
                  {selectedPerson.details.roleAndLeadership && (
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Role & Leadership</h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                        {selectedPerson.details.roleAndLeadership}
                      </p>
                    </div>
                  )}
                  
                  {selectedPerson.details.educationAndQualifications && (
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Education & Qualifications</h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                        {selectedPerson.details.educationAndQualifications}
                      </p>
                    </div>
                  )}
                  
                  {selectedPerson.details.leadershipJourney && (
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Leadership Journey</h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                        {selectedPerson.details.leadershipJourney}
                      </p>
                    </div>
                  )}
                  
                  {selectedPerson.details.personalDetails && (
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Personal Details</h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                        {selectedPerson.details.personalDetails}
                      </p>
                    </div>
                  )}
                  
                  {selectedPerson.details.communityImpact && (
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Community Impact</h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                        {selectedPerson.details.communityImpact}
                      </p>
                    </div>
                  )}
                  
                  {selectedPerson.details.missionAndVision && (
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Mission & Vision</h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                        {selectedPerson.details.missionAndVision}
                      </p>
                    </div>
                  )}
                  
                  {selectedPerson.details.earlyLifeAndBackground && (
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Early Life & Background</h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                        {selectedPerson.details.earlyLifeAndBackground}
                      </p>
                    </div>
                  )}
                  
                  {selectedPerson.details.primaryAndSecondaryEducation && (
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Primary & Secondary Education</h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                        {selectedPerson.details.primaryAndSecondaryEducation}
                      </p>
                    </div>
                  )}
                  
                  {selectedPerson.details.intermediateEducation && (
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Intermediate Education</h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                        {selectedPerson.details.intermediateEducation}
                      </p>
                    </div>
                  )}
                  
                  {selectedPerson.details.engineeringJourney && (
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Engineering Journey (B.Tech – EEE)</h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                        {selectedPerson.details.engineeringJourney}
                      </p>
                    </div>
                  )}
                  
                  {selectedPerson.details.mtechExcellence && (
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">M.Tech Excellence (JNTUH)</h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                        {selectedPerson.details.mtechExcellence}
                      </p>
                    </div>
                  )}
                  
                  {selectedPerson.details.doctoralResearch && (
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Doctoral Research (Ph.D – JNTUH)</h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                        {selectedPerson.details.doctoralResearch}
                      </p>
                    </div>
                  )}
                  
                  {selectedPerson.details.leadershipInStudentMovements && (
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Leadership in Student & University Movements</h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                        {selectedPerson.details.leadershipInStudentMovements}
                      </p>
                    </div>
                  )}
                  
                  {selectedPerson.details.serviceInJNTUHJAC && (
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Service in JNTUH JAC</h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                        {selectedPerson.details.serviceInJNTUHJAC}
                      </p>
                    </div>
                  )}
                  
                  {selectedPerson.details.socialCommitment && (
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Social Commitment & Community Service</h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                        {selectedPerson.details.socialCommitment}
                      </p>
                    </div>
                  )}
                  
                  {selectedPerson.details.personalityAndValues && (
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Personality & Values</h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                        {selectedPerson.details.personalityAndValues}
                      </p>
                    </div>
                  )}
                  
                  {selectedPerson.details.honoursAndRecognition && (
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Honours & Recognition</h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                        {selectedPerson.details.honoursAndRecognition}
                      </p>
                    </div>
                  )}
                  
                  {selectedPerson.details.conclusion && (
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Conclusion</h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                        {selectedPerson.details.conclusion}
                      </p>
                    </div>
                  )}
                  
                  {selectedPerson.details.advocacyAndPublicWork && (
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Advocacy & Public Work</h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                        {selectedPerson.details.advocacyAndPublicWork}
                      </p>
                    </div>
                  )}
                  
                  {selectedPerson.details.publicPositionsAndInitiatives && (
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Public Positions & Initiatives</h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                        {selectedPerson.details.publicPositionsAndInitiatives}
                      </p>
                    </div>
                  )}
                  
                  {selectedPerson.details.mediaAndOrganisationalPresence && (
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Media & Organisational Presence</h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                        {selectedPerson.details.mediaAndOrganisationalPresence}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Leadership Message Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Leadership Message
            </h2>
            <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6">
                "Our leadership team is committed to serving the Mala community with dedication, 
                integrity, and passion. We work tirelessly to ensure that every community member 
                has access to education, healthcare, and economic opportunities. Together, we are 
                building a stronger, more prosperous future for our community."
              </p>
              <p className="text-primary-600 font-medium text-sm sm:text-base">
                — Mala Mahanadu Leadership Team
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default KeyPersons;
