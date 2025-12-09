import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaSpinner } from 'react-icons/fa';
import DistrictCard from '../components/DistrictCard';
import SeoHead from '../components/SeoHead';
import { getDistricts } from '../api/mockApi';

const DistrictPresidents = () => {
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        setLoading(true);
        const response = await getDistricts();
        
        if (response.success) {
          setDistricts(response.data);
          setError(null);
        } else {
          setError('Failed to fetch district presidents');
        }
      } catch (err) {
        setError('Error loading district presidents. Please try again later.');
        console.error('Error fetching districts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDistricts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="h-12 w-12 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading district presidents...</p>
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
        title="District Presidents - Mala Mahanadu"
        description="Contact information for Mala Mahanadu district presidents across Telangana."
        keywords="Mala Mahanadu, district presidents, contact, Telangana districts"
      />
      
      {/* Hero Section */}
      <div className="relative h-64 bg-primary-600">
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              District Presidents
            </h1>
            <p className="text-xl text-white max-w-2xl mx-auto px-4">
              Connect with your district leadership
            </p>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <FaMapMarkerAlt className="h-8 w-8 text-primary-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">
                Find Your District President
              </h2>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our district presidents work tirelessly at the grassroots level to address local issues, 
              organize community events, and ensure that the voices of our community members are heard 
              at the district level. Feel free to reach out to your district president for any 
              assistance or to get involved in local activities.
            </p>
          </div>
        </div>
      </section>

      {/* District Presidents Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {districts.length === 0 ? (
            <div className="text-center py-12">
              <FaMapMarkerAlt className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No district presidents available
              </h3>
              <p className="text-gray-600">
                Check back later for district president information
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {districts.map((district) => (
                <DistrictCard key={district.id} district={district} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                How to Get Involved
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaMapMarkerAlt className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Visit Office</h3>
                  <p className="text-gray-600 text-sm">
                    Visit your district president's office during working hours for in-person assistance.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
                  <p className="text-gray-600 text-sm">
                    Call your district president directly for urgent matters and quick assistance.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
                  <p className="text-gray-600 text-sm">
                    Send detailed queries and documents via email for proper documentation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DistrictPresidents;
