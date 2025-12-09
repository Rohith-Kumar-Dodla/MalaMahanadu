import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaArrowLeft, FaSearch } from 'react-icons/fa';
import SeoHead from '../components/SeoHead';

const NotFound = () => {
  return (
    <>
      <SeoHead 
        title="Page Not Found - Mala Mahanadu"
        description="The page you are looking for could not be found."
        keywords="404, page not found, error"
      />
      
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-primary-600">404</h1>
          </div>

          {/* Error Message */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Page Not Found
            </h2>
            <p className="text-gray-600 mb-8">
              Sorry, the page you are looking for doesn't exist or has been moved. 
              Let's get you back on track.
            </p>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Link
                to="/"
                className="w-full flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
              >
                <FaHome className="h-4 w-4" />
                <span>Go to Home</span>
              </Link>
              
              <button
                onClick={() => window.history.back()}
                className="w-full flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-6 py-3 rounded-lg transition-colors duration-200"
              >
                <FaArrowLeft className="h-4 w-4" />
                <span>Go Back</span>
              </button>
            </div>
          </div>

          {/* Search Suggestion */}
          <div className="mt-8">
            <p className="text-gray-600 text-sm mb-4">
              Or try searching for what you're looking for:
            </p>
            <Link
              to="/posts"
              className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium text-sm"
            >
              <FaSearch className="h-4 w-4" />
              <span>Browse News & Posts</span>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Pages</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <Link
                to="/about"
                className="text-gray-600 hover:text-primary-600 transition-colors"
              >
                About Us
              </Link>
              <Link
                to="/key-persons"
                className="text-gray-600 hover:text-primary-600 transition-colors"
              >
                Key Persons
              </Link>
              <Link
                to="/district-presidents"
                className="text-gray-600 hover:text-primary-600 transition-colors"
              >
                District Presidents
              </Link>
              <Link
                to="/gallery"
                className="text-gray-600 hover:text-primary-600 transition-colors"
              >
                Gallery
              </Link>
              <Link
                to="/contact"
                className="text-gray-600 hover:text-primary-600 transition-colors"
              >
                Contact
              </Link>
              <Link
                to="/donations"
                className="text-gray-600 hover:text-primary-600 transition-colors"
              >
                Donations
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
