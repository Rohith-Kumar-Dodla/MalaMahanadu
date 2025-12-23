import React, { useState } from 'react';
import { FaPlay, FaExpand, FaTimes } from 'react-icons/fa';
import { API_BASE_URL } from '../config/api';

const GalleryGrid = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const getImageUrl = (path) => {
    if (path.startsWith('http')) {
      return path;
    }
    return `${API_BASE_URL}${path}`;
  };

  const openModal = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 max-w-4xl">
          {items.map((item) => (
          <div
            key={item.id}
            className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            onClick={() => openModal(item)}
          >
            <div className="aspect-square">
              {item.type === 'video' ? (
                <div className="relative w-full h-full">
                  <video
                    src={getImageUrl(item.file_path)}
                    className="w-full h-full object-cover"
                    controls
                    preload="metadata"
                    playsInline
                    muted={false}
                    onError={(e) => {
                      console.error('Video error:', e);
                      e.target.poster = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBjbGFzcz0iZm9udCIgc3R5bGU9ImZvbnQtc2l6ZTogMTRweDsgZmlsbDogIzlDQTNBRjsiPlZpZGVvPC90ZXh0Pgo8L3N2Zz4K';
                    }}
                  >
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="bg-primary-600 rounded-full p-4 md:p-5 lg:p-6">
                      <FaPlay className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 text-white" />
                    </div>
                  </div>
                </div>
              ) : (
                <img
                  src={getImageUrl(item.file_path)}
                  alt={item.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBjbGFzcz0iZm9udCIgc3R5bGU9ImZvbnQtc2l6ZTogMTRweDsgZmlsbDogIzlDQTNBRjsiTm8gSW1hZ2U8L3RleHQ+Cjwvc3ZnPgo=';
                  }}
                />
              )}
            </div>
            
            {/* Overlay with expand icon */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
              <FaExpand className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 md:p-4">
              <p className="text-white text-sm md:text-base lg:text-lg font-medium line-clamp-2">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-2 sm:p-4"
          onClick={closeModal}
        >
          <div 
            className="relative max-w-4xl max-h-full w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-10 sm:-top-12 right-0 text-white hover:text-gray-300 transition-colors p-1"
              aria-label="Close modal"
            >
              <FaTimes className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {/* Content */}
            {selectedItem.type === 'video' ? (
              <div className="aspect-video">
                <video
                  src={getImageUrl(selectedItem.file_path)}
                  className="w-full h-full rounded-lg"
                  controls
                  preload="metadata"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <img
                src={getImageUrl(selectedItem.file_path)}
                alt={selectedItem.caption}
                className="w-full h-full object-contain rounded-lg max-h-[70vh] sm:max-h-[80vh]"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBjbGFzcz0iZm9udCIgc3R5bGU9ImZvbnQtc2l6ZTogMjBweDsgZmlsbDogIzlDQTNBRjsiPkltYWdlIE5vdCBGb3VuZDwvdGV4dD4KPC9zdmc+Cg==';
                }}
              />
            )}

            {/* Caption */}
            <div className="mt-3 sm:mt-4 text-center px-2">
              <p className="text-white text-sm sm:text-base lg:text-lg">{selectedItem.caption}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryGrid;
