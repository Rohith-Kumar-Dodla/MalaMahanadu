import React, { useState, useEffect } from 'react';
import { FaHandHoldingHeart, FaUniversity, FaCreditCard, FaCheckCircle, FaSpinner, FaInfoCircle, FaPhone, FaEnvelope } from 'react-icons/fa';
import SeoHead from '../components/SeoHead';
import { getSettings, recordDonation } from '../api/mockApi';

const Donations = () => {
  const [settings, setSettings] = useState(null);
  const [donationForm, setDonationForm] = useState({
    name: '',
    email: '',
    phone: '',
    amount: '',
    payment_method: '',
    transaction_id: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAcknowledgment, setShowAcknowledgment] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await getSettings();
        if (response.success) {
          setSettings(response.data);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const donationAmounts = [500, 1000, 2500, 5000, 10000, 25000];
  const paymentMethods = ['Bank Transfer', 'UPI', 'Cash', 'Cheque', 'Online Payment'];

  const validateForm = () => {
    const newErrors = {};
    
    if (!donationForm.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!donationForm.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donationForm.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!donationForm.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(donationForm.phone.replace(/[-\s]/g, ''))) {
      newErrors.phone = 'Invalid phone number format';
    }
    
    if (!donationForm.amount || parseFloat(donationForm.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    
    if (!donationForm.payment_method) {
      newErrors.payment_method = 'Please select a payment method';
    }
    
    if (!donationForm.transaction_id.trim()) {
      newErrors.transaction_id = 'Transaction ID is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDonationForm(prev => ({
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

  const handleAmountSelect = (amount) => {
    setDonationForm(prev => ({
      ...prev,
      amount: amount.toString()
    }));
    if (errors.amount) {
      setErrors(prev => ({
        ...prev,
        amount: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const donationData = {
        ...donationForm,
        amount: parseFloat(donationForm.amount),
        donation_date: new Date().toISOString(),
        status: 'pending'
      };
      
      const response = await recordDonation(donationData);
      
      if (response.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you for your donation! We will acknowledge it shortly.'
        });
        setShowAcknowledgment(true);
        // Reset form
        setDonationForm({
          name: '',
          email: '',
          phone: '',
          amount: '',
          payment_method: '',
          transaction_id: '',
          notes: ''
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: 'Failed to record donation. Please try again later.'
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'An error occurred. Please try again later.'
      });
      console.error('Error recording donation:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="h-12 w-12 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading donation information...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SeoHead 
        title="Donations - Mala Mahanadu"
        description="Support Mala Mahanadu's mission through donations. Help us empower the community through education and social welfare."
        keywords="Mala Mahanadu, donate, contribution, support, charity, community service"
      />
      
      {/* Hero Section */}
      <div className="relative h-64 bg-primary-600">
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Support Our Mission
            </h1>
            <p className="text-xl text-white max-w-2xl mx-auto px-4">
              Your contribution helps empower our community
            </p>
          </div>
        </div>
      </div>

      {/* Donation Impact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <FaHandHoldingHeart className="h-8 w-8 text-primary-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">
                Your Donation Makes a Difference
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUniversity className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Education</h3>
                <p className="text-gray-600 text-sm">
                  Support scholarships and educational programs for deserving students
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaHandHoldingHeart className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Healthcare</h3>
                <p className="text-gray-600 text-sm">
                  Fund medical camps and healthcare initiatives for community members
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCreditCard className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Empowerment</h3>
                <p className="text-gray-600 text-sm">
                  Enable skill development and economic independence programs
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bank Details Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Bank Account Details
            </h2>
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Account Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bank Name:</span>
                      <span className="font-medium">{settings?.donation_info?.bank_name || 'State Bank of India'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Account Name:</span>
                      <span className="font-medium">{settings?.donation_info?.account_name || 'Mala Mahanadu'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Account Number:</span>
                      <span className="font-medium">{settings?.donation_info?.account_number || '1234567890123456'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">IFSC Code:</span>
                      <span className="font-medium">{settings?.donation_info?.ifsc_code || 'SBIN0001234'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Branch:</span>
                      <span className="font-medium">{settings?.donation_info?.branch || 'Hyderabad Main Branch'}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Payment Instructions</h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <FaInfoCircle className="h-5 w-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-blue-800 text-sm leading-relaxed">
                          {settings?.donation_info?.instructions || 'Please mention your name and mobile number in the payment reference for donation acknowledgment.'}
                        </p>
                        <p className="text-blue-800 text-sm mt-2">
                          After making the payment, please fill out the acknowledgment form below so we can properly record and acknowledge your contribution.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Donation Acknowledgment Form
            </h2>

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

            {/* Donation Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={donationForm.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={donationForm.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={donationForm.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="98765 43210"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="payment_method" className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Method *
                  </label>
                  <select
                    id="payment_method"
                    name="payment_method"
                    value={donationForm.payment_method}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.payment_method ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select payment method</option>
                    {paymentMethods.map(method => (
                      <option key={method} value={method}>{method}</option>
                    ))}
                  </select>
                  {errors.payment_method && (
                    <p className="mt-1 text-sm text-red-600">{errors.payment_method}</p>
                  )}
                </div>
              </div>

              {/* Amount Selection */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Donation Amount *
                </label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
                  {donationAmounts.map(amount => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handleAmountSelect(amount)}
                      className={`py-2 px-3 rounded-lg border transition-colors ${
                        donationForm.amount === amount.toString()
                          ? 'bg-primary-600 text-white border-primary-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      ₹{amount}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={donationForm.amount}
                  onChange={handleInputChange}
                  placeholder="Enter custom amount"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.amount ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.amount && (
                  <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label htmlFor="transaction_id" className="block text-sm font-medium text-gray-700 mb-2">
                    Transaction ID / Reference Number *
                  </label>
                  <input
                    type="text"
                    id="transaction_id"
                    name="transaction_id"
                    value={donationForm.transaction_id}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.transaction_id ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter transaction ID"
                  />
                  {errors.transaction_id && (
                    <p className="mt-1 text-sm text-red-600">{errors.transaction_id}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                    Notes (Optional)
                  </label>
                  <input
                    type="text"
                    id="notes"
                    name="notes"
                    value={donationForm.notes}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Any additional notes"
                  />
                </div>
              </div>

              <div className="mt-8 text-center">
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
                    'Submit Donation Details'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Need Help?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <FaPhone className="h-8 w-8 text-primary-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Call Us</h4>
                <p className="text-gray-600">{settings?.contact_phone || '+91 98765 43210'}</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <FaEnvelope className="h-8 w-8 text-primary-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Email Us</h4>
                <p className="text-gray-600">{settings?.contact_email || 'info@malamahanadu.org'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Donations;
