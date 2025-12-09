import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUser, FaArrowRight } from 'react-icons/fa';

const PostCard = ({ post, showExcerpt = true }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Featured Image */}
      <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
        <img
          src={post.featured_image || '/assets/posts/default.jpg'}
          alt={post.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBjbGFzcz0iZm9udCIgc3R5bGU9ImZvbnQtc2l6ZTogMTRweDsgZmlsbDogIzlDQTNBRjsiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2">
          <Link 
            to={`/posts/${post.id}`}
            className="hover:text-primary-600 transition-colors"
          >
            {post.title}
          </Link>
        </h3>

        {/* Meta */}
        <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 gap-x-3 sm:gap-x-4 gap-y-1">
          <div className="flex items-center space-x-1">
            <FaCalendarAlt className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>{formatDate(post.published_at)}</span>
          </div>
          {post.author && (
            <div className="flex items-center space-x-1">
              <FaUser className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>{post.author}</span>
            </div>
          )}
        </div>

        {/* Excerpt */}
        {showExcerpt && post.excerpt && (
          <p className="text-gray-600 mb-3 sm:mb-4 line-clamp-3 text-sm sm:text-base">
            {post.excerpt}
          </p>
        )}

        {/* Read More */}
        <Link
          to={`/posts/${post.id}`}
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium transition-colors text-sm sm:text-base"
        >
          <span>Read More</span>
          <FaArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
