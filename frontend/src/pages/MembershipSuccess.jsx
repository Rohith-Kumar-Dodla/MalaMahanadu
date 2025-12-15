import React, { useEffect, useState } from 'react';
import SeoHead from '../components/SeoHead';
import { FaCheckCircle, FaHome, FaSpinner, FaPhone, FaEnvelope } from 'react-icons/fa';

const MembershipSuccess = () => {
  const [membershipData, setMembershipData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('membershipData');
    if (data) {
      setMembershipData(JSON.parse(data));
    }
  }, []);

  if (!membershipData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-accent-50">
        <div className="text-center">
          <FaSpinner className="h-8 w-8 animate-spin text-primary-900 mx-auto mb-4" />
          <p className="text-gray-600">Loading membership details...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SeoHead 
        title="Membership Success - Mala Mahanadu"
        description="Congratulations! Your membership has been successfully registered with Mala Mahanadu."
        keywords="Mala Mahanadu, membership success, registration complete"
      />
      
      {/* Hero Section */}
      <div className="relative h-64 bg-primary-900">
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center">
            <div className="mb-4">
              <FaCheckCircle className="h-16 w-16 text-gold-500 mx-auto" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Application Received!
            </h1>
            <p className="text-xl text-white max-w-2xl mx-auto px-4">
              Thank you for your interest in joining Mala Mahanadu
            </p>
          </div>
        </div>
      </div>

      {/* Success Content */}
      <section className="py-16 bg-accent-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Success Message Card */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 mb-8">
              <div className="text-center">
                <FaCheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-primary-900 mb-4">
                  Application Submitted Successfully!
                </h2>
                <p className="text-lg text-gray-600 mb-4">
                  Your membership application has been received and is currently under review.
                </p>
                <div className="bg-gold-50 rounded-lg p-6 mb-6">
                  <p className="text-lg text-gray-800 flex items-center justify-center">
                    <FaPhone className="mr-2 text-gold-500" />
                    Our team will contact you through your provided phone number or email
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="text-center mb-8">
              <a
                href="/"
                className="bg-primary-900 hover:bg-primary-800 text-white font-bold py-4 px-8 rounded-lg transition-colors flex items-center justify-center text-lg mx-auto"
                style={{ display: 'inline-flex' }}
              >
                <FaHome className="mr-2" />
                Back to Home
              </a>
            </div>

            {/* Important Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-primary-900 mb-3">Important Information</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-gold-500 mr-2">•</span>
                  Your application is currently under review by our admin team
                </li>
                <li className="flex items-start">
                  <span className="text-gold-500 mr-2">•</span>
                  Once approved, you will receive your membership ID card via email
                </li>
                <li className="flex items-start">
                  <span className="text-gold-500 mr-2">•</span>
                  Our team will contact you through your provided phone number or email
                </li>
                <li className="flex items-start">
                  <span className="text-gold-500 mr-2">•</span>
                  For any queries, contact us at membership@malamahanadu.org
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MembershipSuccess;
