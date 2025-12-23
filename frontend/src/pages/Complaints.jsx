import React, { useState, useEffect } from 'react';
import { FaExclamationTriangle, FaFileUpload, FaCheckCircle, FaSpinner, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import SeoHead from '../components/SeoHead';
import { createComplaint } from '../api/api';

const Complaints = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    complaint_type: '',
    subject: '',
    description: '',
    file: null
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  const complaintTypes = [
    'Educational Issues',
    'Employment Problems',
    'Healthcare Access',
    'Housing Issues',
    'Legal Assistance',
    'Social Discrimination',
    'Infrastructure',
    'Other'
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (formData.email && !formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[-\s]/g, ''))) {
      newErrors.phone = 'Invalid phone number format';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.complaint_type) {
      newErrors.complaint_type = 'Please select a complaint type';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          file: 'File size must be less than 5MB'
        }));
        return;
      }

      // Check file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          file: 'Only images, PDF, and text files are allowed'
        }));
        return;
      }

      setFormData(prev => ({
        ...prev,
        file: file
      }));

      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFilePreview(e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }

      // Clear file error
      if (errors.file) {
        setErrors(prev => ({
          ...prev,
          file: ''
        }));
      }
    }
  };

  const removeFile = () => {
    setFormData(prev => ({
      ...prev,
      file: null
    }));
    setFilePreview(null);
    document.getElementById('file-upload').value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const submissionData = {
        ...formData,
        file: formData.file
      };
      
      const response = await createComplaint(submissionData);
      
      setSubmitStatus({
        type: 'success',
        message: `Your complaint has been submitted successfully! We will review it and get back to you soon. Reference ID: ${response.reference_id}`
      });
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        complaint_type: '',
        subject: '',
        description: '',
        file: null
      });
      setFilePreview(null);
      document.getElementById('file-upload').value = '';
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error.message || 'An error occurred. Please try again later.'
      });
      console.error('Error submitting complaint:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SeoHead 
        title="File Complaint - Mala Mahanadu"
        description="Submit complaints and grievances to Mala Mahanadu organization for assistance and resolution."
        keywords="Mala Mahanadu, complaint, grievance, assistance, support"
      />
      
      {/* Hero Section */}
      <div className="relative h-64 bg-primary-600">
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              File a Complaint
            </h1>
            <p className="text-xl text-white max-w-2xl mx-auto px-4">
              Share your concerns and we'll help you find solutions
            </p>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <FaExclamationTriangle className="h-8 w-8 text-primary-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">
                How We Can Help
              </h2>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              Mala Mahanadu is committed to addressing the concerns and grievances of our community members. 
              Whether you're facing educational barriers, employment discrimination, or any other issues, 
              we're here to provide support and work towards resolution. Your complaints are handled with 
              confidentiality and urgency.
            </p>
          </div>
        </div>
      </section>

      {/* Complaint Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Submit Your Complaint
              </h2>
              <p className="text-lg text-gray-600">
                Fill out the form below with detailed information about your concern
              </p>
            </div>

            {/* Success/Error Message */}
            {submitStatus && (
              <div className={`mb-8 p-4 rounded-lg ${
                submitStatus.type === 'success' 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-center">
                  <FaCheckCircle className={`h-5 w-5 mr-3 ${
                    submitStatus.type === 'success' ? 'text-green-600' : 'text-red-600'
                  }`} />
                  <p className={`${
                    submitStatus.type === 'success' ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {submitStatus.message}
                  </p>
                </div>
              </div>
            )}

            {/* Complaint Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Your full name"
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="your.email@example.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="98765 43210"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                      Address *
                    </label>
                    <div className="relative">
                      <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          errors.address ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Your complete address"
                      />
                    </div>
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Complaint Details */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Complaint Details</h3>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="complaint_type" className="block text-sm font-medium text-gray-700 mb-2">
                      Complaint Type *
                    </label>
                    <select
                      id="complaint_type"
                      name="complaint_type"
                      value={formData.complaint_type}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.complaint_type ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select complaint type</option>
                      {complaintTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.complaint_type && (
                      <p className="mt-1 text-sm text-red-600">{errors.complaint_type}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.subject ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Brief subject of your complaint"
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                      Detailed Description *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={6}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.description ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Please provide a detailed description of your complaint, including dates, locations, and any relevant information..."
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* File Upload */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Supporting Documents (Optional)</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">
                      Upload File (Max 5MB)
                    </label>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                        <FaFileUpload className="h-5 w-5 mr-2 text-gray-600" />
                        <span className="text-gray-700">Choose File</span>
                        <input
                          type="file"
                          id="file-upload"
                          onChange={handleFileChange}
                          className="hidden"
                          accept="image/*,.pdf,.txt"
                        />
                      </label>
                      {formData.file && (
                        <span className="text-sm text-gray-600">
                          {formData.file.name}
                        </span>
                      )}
                    </div>
                    {errors.file && (
                      <p className="mt-1 text-sm text-red-600">{errors.file}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-2">
                      Supported formats: Images (JPG, PNG, GIF), PDF, Text files
                    </p>
                  </div>

                  {/* File Preview */}
                  {filePreview && (
                    <div className="relative inline-block">
                      <img
                        src={filePreview}
                        alt="File preview"
                        className="max-w-xs max-h-48 rounded-lg shadow-md"
                      />
                      <button
                        type="button"
                        onClick={removeFile}
                        className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 text-sm"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-medium px-8 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center mx-auto"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="h-5 w-5 animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Complaint'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Important Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Important Information</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  All complaints are treated with strict confidentiality
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  False or malicious complaints may lead to legal action
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  We will contact you within 3-5 working days regarding your complaint
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Provide accurate contact information for follow-up
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Include all relevant details and supporting documents
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Complaints;
