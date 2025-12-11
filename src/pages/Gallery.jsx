import React, { useState, useEffect } from 'react';
import { FaImages, FaSpinner, FaFilter } from 'react-icons/fa';
import GalleryGrid from '../components/GalleryGrid';
import SeoHead from '../components/SeoHead';
import { getGalleryItems } from '../api/mockApi';

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const response = await getGalleryItems();
        
        if (response.success) {
          setGalleryItems(response.data);
          setFilteredItems(response.data);
          setError(null);
        } else {
          setError('Failed to fetch gallery items');
        }
      } catch (err) {
        setError('Error loading gallery. Please try again later.');
        console.error('Error fetching gallery:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredItems(galleryItems);
    } else {
      setFilteredItems(galleryItems.filter(item => item.type === filter));
    }
  }, [filter, galleryItems]);

  const filters = [
    { value: 'all', label: 'All Items', count: galleryItems.length },
    { value: 'image', label: 'Images', count: galleryItems.filter(item => item.type === 'image').length },
    { value: 'video', label: 'Videos', count: galleryItems.filter(item => item.type === 'video').length },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="h-12 w-12 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading gallery...</p>
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
        title="Gallery - Mala Mahanadu"
        description="Browse photos and videos from Mala Mahanadu events, activities, and community celebrations."
        keywords="Mala Mahanadu, gallery, photos, videos, events, activities"
      />
      
      {/* Hero Section */}
      <div className="relative h-80 lg:h-96 xl:h-[32rem] bg-primary-600">
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center px-4 max-w-6xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 lg:mb-8">
              Gallery
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-white max-w-4xl mx-auto leading-relaxed">
              Visual journey of our events and activities
            </p>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <FaFilter className="h-5 w-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Filter:</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {filters.map((filterOption) => (
                <button
                  key={filterOption.value}
                  onClick={() => setFilter(filterOption.value)}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    filter === filterOption.value
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {filterOption.label} ({filterOption.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <FaImages className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {filter === 'all' ? 'No gallery items available' : `No ${filter}s found`}
              </h3>
              <p className="text-gray-600 mb-4">
                {filter === 'all' 
                  ? 'Check back later for photos and videos from our events' 
                  : `Try selecting a different filter`
                }
              </p>
              {filter !== 'all' && (
                <button
                  onClick={() => setFilter('all')}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Show All Items
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Results Count */}
              <div className="mb-8">
                <p className="text-gray-600">
                  Showing {filteredItems.length} {filter === 'all' ? 'item' : filter}
                  {filteredItems.length !== 1 ? 's' : ''}
                </p>
              </div>

              {/* Gallery Grid */}
              <GalleryGrid items={filteredItems} />
            </>
          )}
        </div>
      </section>

      {/* Gallery Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                About Our Gallery
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Photos</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Browse through our collection of photographs capturing memorable moments from 
                    our conferences, meetings, cultural events, and community service activities. 
                    Each image tells a story of our commitment to community development.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Videos</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Watch videos of our important events, speeches by community leaders, 
                    training programs, and cultural performances. These videos document our 
                    journey and showcase the impact of our work in the community.
                  </p>
                </div>
              </div>
              <div className="mt-8 text-center">
                <p className="text-gray-600 text-sm">
                  Have photos or videos from our events? Share them with us at 
                  <a href="mailto:info@malamahanadu.org" className="text-primary-600 hover:text-primary-700 ml-1">
                    info@malamahanadu.org
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Gallery;
