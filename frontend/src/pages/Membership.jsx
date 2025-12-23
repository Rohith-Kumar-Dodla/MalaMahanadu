import React, { useState, useRef } from 'react';
import { API_BASE_URL } from '../config/api';
import SeoHead from '../components/SeoHead';
import { FaUserFriends, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheckCircle, FaSpinner, FaCamera, FaIdCard, FaCalendarAlt, FaUser, FaVenusMars } from 'react-icons/fa';

const Membership = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    gender: '',
    dob: '',
    caste: '',
    aadhar: '',
    phone: '',
    email: '',
    state: '',
    district: '',
    mandal: '',
    village: '',
    fullAddress: '',
    photo: null
  });
  const [errors, setErrors] = useState({});
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoRemove = () => {
    setFormData({ ...formData, photo: null });
    setPhotoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.fatherName.trim()) {
      newErrors.fatherName = 'Father\'s/Husband name is required';
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }
    
    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    } else {
      const age = new Date().getFullYear() - new Date(formData.dob).getFullYear();
      if (age < 18) {
        newErrors.dob = 'You must be at least 18 years old';
      }
    }
    
    if (!formData.caste.trim()) {
      newErrors.caste = 'Caste is required';
    }
    
    if (!formData.aadhar.trim()) {
      newErrors.aadhar = 'Aadhar card number is required';
    } else if (!/^\d{12}$/.test(formData.aadhar.replace(/\s/g, ''))) {
      newErrors.aadhar = 'Please enter a valid 12-digit Aadhar card number';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (formData.email && !formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    
    if (!formData.district.trim()) {
      newErrors.district = 'District is required';
    }
    
    if (!formData.mandal.trim()) {
      newErrors.mandal = 'Mandal is required';
    }
    
    if (!formData.village.trim()) {
      newErrors.village = 'Village is required';
    }
    
    if (!formData.fullAddress.trim()) {
      newErrors.fullAddress = 'Full address is required';
    }
    
    if (!formData.photo) {
      newErrors.photo = 'Photo is required';
    } else if (formData.photo.size > 5 * 1024 * 1024) {
      newErrors.photo = 'Photo size should be less than 5MB';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous error and any stored membership data
    setErrorMessage('');
    localStorage.removeItem('membershipData');
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'photo') {
          formDataToSend.append('photo', formData.photo);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });
      
      // Debug: Log what's being sent
      console.log('Form data being sent:', formData);
      console.log('FormData entries:');
      for (let [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }
      
      const response = await fetch(`${API_BASE_URL}/api/membership/register`, {
        method: 'POST',
        body: formDataToSend,
        headers: {} // Let browser set Content-Type for FormData
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server response:', response.status, errorText);
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        localStorage.setItem('membershipData', JSON.stringify({
          ...formData,
          membershipId: result.membership_id,
          idCardUrl: result.id_card_url,
          submitted_at: new Date().toISOString()
        }));
        window.location.href = '/membership-success';
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      
      // Check if it's a network/backend unavailable error
      if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
        setErrorMessage('Unable to connect to the server. Please try again later or contact support.');
      } else {
        setErrorMessage('Registration failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SeoHead 
        title="Membership - Mala Mahanadu"
        description="Join Mala Mahanadu and become part of our community movement for social justice and empowerment."
        keywords="Mala Mahanadu, membership, join, community, social justice"
      />
      
      {/* Hero Section */}
      <div className="relative h-64 bg-primary-900">
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Become a Member
            </h1>
            <p className="text-xl text-white max-w-2xl mx-auto px-4">
              Join our community and contribute to social change
            </p>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <section className="py-12 bg-accent-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <FaUserFriends className="h-8 w-8 text-primary-900 mr-3" />
              <h2 className="text-2xl font-bold text-primary-900">
                Why Join Mala Mahanadu?
              </h2>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              By becoming a member of Mala Mahanadu, you join a powerful community dedicated to social justice, 
              equality, and empowerment. Together, we can make a difference in our society.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <FaCheckCircle className="h-8 w-8 text-gold-500 mx-auto mb-3" />
                <h3 className="font-semibold text-primary-900 mb-2">Community Support</h3>
                <p className="text-gray-600 text-sm">
                  Get support from a strong community network and access to resources
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <FaCheckCircle className="h-8 w-8 text-gold-500 mx-auto mb-3" />
                <h3 className="font-semibold text-primary-900 mb-2">Leadership Opportunities</h3>
                <p className="text-gray-600 text-sm">
                  Develop leadership skills and contribute to community development
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <FaCheckCircle className="h-8 w-8 text-gold-500 mx-auto mb-3" />
                <h3 className="font-semibold text-primary-900 mb-2">Social Impact</h3>
                <p className="text-gray-600 text-sm">
                  Be part of meaningful social change and empowerment initiatives
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-accent-50 rounded-lg shadow-lg border border-gray-200 p-8">
              <div className="text-center mb-8">
                <FaIdCard className="h-12 w-12 text-primary-900 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-primary-900 mb-2">
                  Membership Application
                </h2>
                <p className="text-gray-600">
                  Fill in your details to become a member of Mala Mahanadu
                </p>
              </div>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                  <p className="text-center">
                    <strong>Thank you for your application!</strong> We will contact you soon.
                  </p>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg">
                  <p className="text-center">
                    <strong>Warning!</strong> {errorMessage}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information Section */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold text-primary-900 mb-6 flex items-center">
                    <FaUser className="mr-2 text-gold-500" />
                    Personal Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent ${
                          errors.fullName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your full name"
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Father's / Husband's Name *
                      </label>
                      <input
                        type="text"
                        name="fatherName"
                        value={formData.fatherName}
                        onChange={(e) => setFormData({...formData, fatherName: e.target.value})}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent ${
                          errors.fatherName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter father's or husband's name"
                      />
                      {errors.fatherName && (
                        <p className="mt-1 text-sm text-red-600">{errors.fatherName}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FaVenusMars className="inline mr-1 text-gold-500" />
                        Gender *
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={(e) => setFormData({...formData, gender: e.target.value})}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent ${
                          errors.gender ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.gender && (
                        <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FaCalendarAlt className="inline mr-1 text-gold-500" />
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={(e) => setFormData({...formData, dob: e.target.value})}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent ${
                          errors.dob ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.dob && (
                        <p className="mt-1 text-sm text-red-600">{errors.dob}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Caste *
                      </label>
                      <input
                        type="text"
                        name="caste"
                        value={formData.caste}
                        onChange={(e) => setFormData({...formData, caste: e.target.value})}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent ${
                          errors.caste ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your caste"
                      />
                      {errors.caste && (
                        <p className="mt-1 text-sm text-red-600">{errors.caste}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Aadhar Card Number *
                      </label>
                      <input
                        type="text"
                        name="aadhar"
                        value={formData.aadhar}
                        onChange={(e) => setFormData({...formData, aadhar: e.target.value})}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent ${
                          errors.aadhar ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="1234 5678 9012"
                        maxLength={14}
                      />
                      {errors.aadhar && (
                        <p className="mt-1 text-sm text-red-600">{errors.aadhar}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact Information Section */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold text-primary-900 mb-6 flex items-center">
                    <FaPhone className="mr-2 text-gold-500" />
                    Contact Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FaPhone className="inline mr-1 text-gold-500" />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="98765 43210"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FaEnvelope className="inline mr-1 text-gold-500" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Address Information Section */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold text-primary-900 mb-6 flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-gold-500" />
                    Address Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={(e) => setFormData({...formData, state: e.target.value})}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent ${
                          errors.state ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select state</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Maharashtra">Maharashtra</option>
                      </select>
                      {errors.state && (
                        <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        District *
                      </label>
                      <input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={(e) => setFormData({...formData, district: e.target.value})}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent ${
                          errors.district ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your district"
                      />
                      {errors.district && (
                        <p className="mt-1 text-sm text-red-600">{errors.district}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mandal *
                      </label>
                      <input
                        type="text"
                        name="mandal"
                        value={formData.mandal}
                        onChange={(e) => setFormData({...formData, mandal: e.target.value})}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent ${
                          errors.mandal ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your mandal"
                      />
                      {errors.mandal && (
                        <p className="mt-1 text-sm text-red-600">{errors.mandal}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Village *
                      </label>
                      <input
                        type="text"
                        name="village"
                        value={formData.village}
                        onChange={(e) => setFormData({...formData, village: e.target.value})}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent ${
                          errors.village ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your village"
                      />
                      {errors.village && (
                        <p className="mt-1 text-sm text-red-600">{errors.village}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Address *
                    </label>
                    <textarea
                      name="fullAddress"
                      value={formData.fullAddress}
                      onChange={(e) => setFormData({...formData, fullAddress: e.target.value})}
                      rows={3}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent ${
                        errors.fullAddress ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your complete address with house number, street, etc."
                    />
                    {errors.fullAddress && (
                      <p className="mt-1 text-sm text-red-600">{errors.fullAddress}</p>
                    )}
                  </div>
                </div>

                {/* Photo Upload Section */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold text-primary-900 mb-6 flex items-center">
                    <FaCamera className="mr-2 text-gold-500" />
                    Photo Upload
                  </h3>
                  
                  <div className="flex flex-col items-center">
                    {photoPreview ? (
                      <div className="mb-4">
                        <img
                          src={photoPreview}
                          alt="Photo preview"
                          className="w-32 h-32 object-cover rounded-lg border-2 border-gold-500"
                        />
                        <button
                          type="button"
                          onClick={handlePhotoRemove}
                          className="mt-2 text-sm text-red-600 hover:text-red-800"
                        >
                          Remove Photo
                        </button>
                      </div>
                    ) : (
                      <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center mb-4 border-2 border-dashed border-gray-400">
                        <FaCamera className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                    
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-gold-500 hover:bg-gold-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                    >
                      Choose Photo
                    </button>
                    
                    <p className="mt-2 text-sm text-gray-600">
                      Upload a clear photo (Max size: 5MB)
                    </p>
                    
                    {errors.photo && (
                      <p className="mt-1 text-sm text-red-600">{errors.photo}</p>
                    )}
                  </div>
                </div>
                {/* Submit Button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gold-500 hover:bg-gold-600 disabled:bg-gray-400 text-primary-900 font-bold py-3 px-8 rounded-lg transition-colors flex items-center justify-center text-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="h-5 w-5 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 bg-accent-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-primary-900 mb-8 text-center">
              Need More Information?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center bg-white p-6 rounded-lg border border-gray-200">
                <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaPhone className="h-8 w-8 text-gold-500" />
                </div>
                <h3 className="font-semibold text-primary-900 mb-2">Call Us</h3>
                <p className="text-gray-600 text-sm">
                  +91 98765 43210
                </p>
              </div>
              <div className="text-center bg-white p-6 rounded-lg border border-gray-200">
                <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaEnvelope className="h-8 w-8 text-gold-500" />
                </div>
                <h3 className="font-semibold text-primary-900 mb-2">Email Us</h3>
                <p className="text-gray-600 text-sm">
                  membership@malamahanadu.org
                </p>
              </div>
              <div className="text-center bg-white p-6 rounded-lg border border-gray-200">
                <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaMapMarkerAlt className="h-8 w-8 text-gold-500" />
                </div>
                <h3 className="font-semibold text-primary-900 mb-2">Visit Us</h3>
                <p className="text-gray-600 text-sm">
                  Hyderabad, Telangana
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Membership;
