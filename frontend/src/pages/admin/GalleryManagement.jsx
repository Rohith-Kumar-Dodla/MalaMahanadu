import React, { useState, useEffect } from 'react';
import { FaImages, FaVideo, FaUpload, FaTrash, FaEdit, FaPlus, FaSpinner, FaEye, FaTimes } from 'react-icons/fa';
import { getGalleryItems, uploadGalleryItem, deleteGalleryItem, updateGalleryItem } from '../../api/api';
import { API_BASE_URL } from '../../config/api';

const GalleryManagement = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [previewItem, setPreviewItem] = useState(null);

  const getImageUrl = (path) => {
    if (path.startsWith('http')) {
      return path;
    }
    return `${API_BASE_URL}${path}`;
  };

  const [formData, setFormData] = useState({
    title: '',
    caption: '',
    type: 'image',
    file: null
  });

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const response = await getGalleryItems();
      if (response.items) {
        setGalleryItems(response.items);
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

  const handleUpload = async (e) => {
    e.preventDefault();
    
    // Debug: check form data before upload
    console.log('Form data before upload:', formData);
    
    if (!formData.file) {
      setError('Please select a file to upload');
      return;
    }

    if (!formData.title || formData.title.trim() === '') {
      setError('Please enter a title');
      return;
    }

    try {
      setUploading(true);
      const uploadData = new FormData();
      uploadData.append('file', formData.file);
      uploadData.append('title', formData.title.trim());
      uploadData.append('caption', formData.caption || '');
      uploadData.append('type', formData.type);
      uploadData.append('alt_text', formData.title.trim());
      uploadData.append('display_order', '0');

      // Debug: log FormData contents
      console.log('Uploading with data:');
      for (let [key, value] of uploadData.entries()) {
        console.log(key, value);
      }

      const response = await uploadGalleryItem(uploadData);
      if (response.id) {
        setGalleryItems([...galleryItems, response]);
        setShowUploadModal(false);
        resetForm();
        setError(null);
      } else {
        setError('Failed to upload item');
      }
    } catch (err) {
      setError('Error uploading item. Please try again.');
      console.error('Error uploading:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);
      const response = await updateGalleryItem(editingItem.id, {
        title: formData.title,
        caption: formData.caption,
        alt_text: formData.title
      });
      
      if (response.id) {
        setGalleryItems(galleryItems.map(item => 
          item.id === editingItem.id ? response : item
        ));
        setShowEditModal(false);
        resetForm();
        setError(null);
      } else {
        setError('Failed to update item');
      }
    } catch (err) {
      setError('Error updating item. Please try again.');
      console.error('Error updating:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      const response = await deleteGalleryItem(itemId);
      if (response.message) {
        setGalleryItems(galleryItems.filter(item => item.id !== itemId));
        setError(null);
      } else {
        setError('Failed to delete item');
      }
    } catch (err) {
      setError('Error deleting item. Please try again.');
      console.error('Error deleting:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      caption: '',
      type: 'image',
      file: null
    });
    setEditingItem(null);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      caption: item.caption,
      type: item.type,
      file: null
    });
    setShowEditModal(true);
  };

  const filteredItems = filter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.type === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <FaSpinner className="h-8 w-8 text-primary-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gallery Management</h1>
        <p className="text-gray-600">Manage photos and videos for the public gallery</p>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Actions Bar */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md transition-colors ${
                filter === 'all' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({galleryItems.length})
            </button>
            <button
              onClick={() => setFilter('image')}
              className={`px-4 py-2 rounded-md transition-colors ${
                filter === 'image' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Images ({galleryItems.filter(item => item.type === 'image').length})
            </button>
            <button
              onClick={() => setFilter('video')}
              className={`px-4 py-2 rounded-md transition-colors ${
                filter === 'video' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Videos ({galleryItems.filter(item => item.type === 'video').length})
            </button>
          </div>
          
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
          >
            <FaPlus className="h-4 w-4" />
            Add New Item
          </button>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-square relative bg-gray-100">
              {item.type === 'image' ? (
                <img
                  src={getImageUrl(item.file_path)}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FaVideo className="h-12 w-12 text-gray-400" />
                </div>
              )}
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => setPreviewItem(item)}
                  className="bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-700 p-2 rounded-md shadow-md transition-all"
                >
                  <FaEye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => openEditModal(item)}
                  className="bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-700 p-2 rounded-md shadow-md transition-all"
                >
                  <FaEdit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-white bg-opacity-90 hover:bg-opacity-100 text-red-600 p-2 rounded-md shadow-md transition-all"
                >
                  <FaTrash className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{item.caption}</p>
              <div className="mt-2 flex items-center gap-2">
                {item.type === 'image' ? (
                  <FaImages className="h-4 w-4 text-gray-400" />
                ) : (
                  <FaVideo className="h-4 w-4 text-gray-400" />
                )}
                <span className="text-xs text-gray-500 capitalize">{item.type}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <FaImages className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No gallery items found</h3>
          <p className="text-gray-600 mb-4">
            {filter === 'all' 
              ? 'Start by adding your first gallery item' 
              : `No ${filter}s found. Try a different filter.`
            }
          </p>
          {filter === 'all' && (
            <button
              onClick={() => setShowUploadModal(true)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              Add First Item
            </button>
          )}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Add Gallery Item</h2>
            <form onSubmit={handleUpload}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Caption
                </label>
                <textarea
                  value={formData.caption}
                  onChange={(e) => setFormData({...formData, caption: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows="3"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  File
                </label>
                <input
                  type="file"
                  onChange={(e) => setFormData({...formData, file: e.target.files[0]})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  accept={formData.type === 'image' ? 'image/*' : 'video/*'}
                  required
                />
              </div>
              
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition-colors disabled:opacity-50"
                >
                  {uploading ? <FaSpinner className="h-4 w-4 animate-spin mx-auto" /> : 'Upload'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowUploadModal(false);
                    resetForm();
                  }}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Edit Gallery Item</h2>
            <form onSubmit={handleEdit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Caption
                </label>
                <textarea
                  value={formData.caption}
                  onChange={(e) => setFormData({...formData, caption: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows="3"
                />
              </div>
              
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition-colors disabled:opacity-50"
                >
                  {uploading ? <FaSpinner className="h-4 w-4 animate-spin mx-auto" /> : 'Update'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    resetForm();
                  }}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewItem && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="max-w-4xl max-h-full bg-white rounded-lg overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">{previewItem.title}</h3>
              <button
                onClick={() => setPreviewItem(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              {previewItem.type === 'image' ? (
                <img
                  src={getImageUrl(previewItem.file_path)}
                  alt={previewItem.title}
                  className="w-full h-auto max-h-96 object-contain"
                />
              ) : (
                <div className="aspect-video bg-black flex items-center justify-center">
                  <FaVideo className="h-16 w-16 text-white" />
                </div>
              )}
              <p className="mt-4 text-gray-600">{previewItem.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryManagement;
