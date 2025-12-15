import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const DistrictCard = ({ district }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:scale-105">
      {/* Photo */}
      <div className="relative h-48 sm:h-52 md:h-56 lg:h-64 overflow-hidden">
        <img
          src={district.photo || '/assets/districts/default.jpg'}
          alt={`${district.name} District President`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBjbGFzcz0iZm9udCIgc3R5bGU9ImZvbnQtc2l6ZTogMTRweDsgZmlsbDogIzlDQTNBRjsiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
          <h3 className="text-white font-bold text-lg sm:text-xl lg:text-2xl line-clamp-1">{district.name}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 lg:p-7">
        {/* President Name */}
        <h4 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 mb-3 sm:mb-4 line-clamp-2">
          {district.president}
        </h4>
        <p className="text-gray-600 mb-4 sm:mb-5 text-base sm:text-lg lg:text-xl">District President</p>

        {/* Contact Information */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <FaPhone className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-primary-600 flex-shrink-0" />
            <a
              href={`tel:${district.phone}`}
              className="text-gray-700 hover:text-primary-600 transition-colors text-base sm:text-lg lg:text-xl break-all"
            >
              {district.phone}
            </a>
          </div>
          
          <div className="flex items-start space-x-3 sm:space-x-4">
            <FaEnvelope className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-primary-600 flex-shrink-0 mt-1" />
            <a
              href={`mailto:${district.email}`}
              className="text-gray-700 hover:text-primary-600 transition-colors text-base sm:text-lg lg:text-xl break-all"
            >
              {district.email}
            </a>
          </div>
          
          <div className="flex items-start space-x-3 sm:space-x-4">
            <FaMapMarkerAlt className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-primary-600 flex-shrink-0 mt-1" />
            <span className="text-gray-700 text-base sm:text-lg lg:text-xl">
              {district.name} District, Telangana
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <a
            href={`tel:${district.phone}`}
            className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 sm:py-3.5 lg:py-4 px-4 sm:px-5 lg:px-6 rounded-lg text-center transition-colors duration-200 text-base sm:text-lg lg:text-xl"
          >
            Call Now
          </a>
          <a
            href={`mailto:${district.email}`}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 sm:py-3.5 lg:py-4 px-4 sm:px-5 lg:px-6 rounded-lg text-center transition-colors duration-200 text-base sm:text-lg lg:text-xl"
          >
            Send Email
          </a>
        </div>
      </div>
    </div>
  );
};

export default DistrictCard;
