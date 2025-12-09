import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const DistrictCard = ({ district }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Photo */}
      <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
        <img
          src={district.photo || '/assets/districts/default.jpg'}
          alt={`${district.name} District President`}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBjbGFzcz0iZm9udCIgc3R5bGU9ImZvbnQtc2l6ZTogMTRweDsgZmlsbDogIzlDQTNBRjsiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3">
          <h3 className="text-white font-bold text-base sm:text-lg line-clamp-1">{district.name}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        {/* President Name */}
        <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-4 line-clamp-2">
          {district.president}
        </h4>
        <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">District President</p>

        {/* Contact Information */}
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <FaPhone className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600 flex-shrink-0" />
            <a
              href={`tel:${district.phone}`}
              className="text-gray-700 hover:text-primary-600 transition-colors text-sm sm:text-base break-all"
            >
              {district.phone}
            </a>
          </div>
          
          <div className="flex items-start space-x-2 sm:space-x-3">
            <FaEnvelope className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600 flex-shrink-0 mt-0.5" />
            <a
              href={`mailto:${district.email}`}
              className="text-gray-700 hover:text-primary-600 transition-colors text-sm sm:text-base break-all"
            >
              {district.email}
            </a>
          </div>
          
          <div className="flex items-start space-x-2 sm:space-x-3">
            <FaMapMarkerAlt className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700 text-sm sm:text-base">
              {district.name} District, Telangana
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
          <a
            href={`tel:${district.phone}`}
            className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg text-center transition-colors duration-200 text-sm sm:text-base"
          >
            Call Now
          </a>
          <a
            href={`mailto:${district.email}`}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg text-center transition-colors duration-200 text-sm sm:text-base"
          >
            Send Email
          </a>
        </div>
      </div>
    </div>
  );
};

export default DistrictCard;
