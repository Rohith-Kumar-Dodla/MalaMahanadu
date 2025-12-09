import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCalendarAlt, FaUser, FaArrowLeft, FaShareAlt, FaSpinner } from 'react-icons/fa';
import SeoHead from '../components/SeoHead';
import { getPostById } from '../api/mockApi';

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await getPostById(id);
        
        if (response.success) {
          setPost(response.data);
          setError(null);
        } else {
          setError(response.error || 'Post not found');
        }
      } catch (err) {
        setError('Error loading post. Please try again later.');
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="h-12 w-12 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link
              to="/posts"
              className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <FaArrowLeft className="h-4 w-4" />
              <span>Back to Posts</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <>
      <SeoHead 
        title={`${post.title} - Mala Mahanadu`}
        description={post.excerpt}
        keywords="Mala Mahanadu, news, post, announcement"
        image={post.featured_image}
      />
      
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-primary-600">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link to="/posts" className="text-gray-600 hover:text-primary-600">
              Posts
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Post Header */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link
              to="/posts"
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-primary-600 mb-6"
            >
              <FaArrowLeft className="h-4 w-4" />
              <span>Back to Posts</span>
            </Link>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center text-gray-600 mb-8 space-x-6">
              <div className="flex items-center space-x-2">
                <FaCalendarAlt className="h-4 w-4" />
                <span>{formatDate(post.published_at)}</span>
              </div>
              {post.author && (
                <div className="flex items-center space-x-2">
                  <FaUser className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
              )}
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 text-gray-600 hover:text-primary-600"
              >
                <FaShareAlt className="h-4 w-4" />
                <span>Share</span>
              </button>
            </div>

            {/* Featured Image */}
            {post.featured_image && (
              <div className="mb-8">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-auto rounded-lg shadow-md"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDgwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjQwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBjbGFzcz0iZm9udCIgc3R5bGU9ImZvbnQtc2l6ZTogMjBweDsgZmlsbDogIzlDQTNBRjsiPkltYWdlIE5vdCBGb3VuZDwvdGV4dD4KPC9zdmc+Cg==';
                  }}
                />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {/* 
                WARNING: This uses dangerouslySetInnerHTML which can be unsafe.
                When moving to a real API, make sure to sanitize HTML content
                using a library like DOMPurify before rendering.
              */}
              <div 
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="text-gray-700 leading-relaxed"
              />
            </div>

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this post</h3>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleShare}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Share Post
                </button>
                <button
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Share on Facebook
                </button>
                <button
                  onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`, '_blank')}
                  className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Share on Twitter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePost;
