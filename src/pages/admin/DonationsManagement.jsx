import React, { useState, useEffect } from 'react';
import SeoHead from '../../components/SeoHead';
import { FaHandHoldingHeart, FaSearch, FaFilter, FaEdit, FaEye, FaCheckCircle, FaClock, FaSpinner, FaDownload, FaRupeeSign } from 'react-icons/fa';
import { getDonations, getDonationStats, updateDonation } from '../../api/api';

const DonationsManagement = () => {
  const [donations, setDonations] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('donations');

  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem('adminToken');
    if (!token) {
      window.location.href = '/admin/login';
      return;
    }

    fetchDonations();
    fetchStats();
  }, [currentPage, statusFilter]);

  const fetchDonations = async () => {
    setLoading(true);
    try {
      const params = {
        skip: (currentPage - 1) * 10,
        limit: 10,
      };
      
      if (statusFilter !== 'all') {
        params.status = statusFilter;
      }

      const data = await getDonations(params);
      setDonations(data);
    } catch (error) {
      console.error('Error fetching donations:', error);
      setDonations([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await getDonationStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Show 0 instead of mock data until real API data is available
      setStats({
        total_donations: 0,
        pending_donations: 0,
        verified_donations: 0,
        acknowledged_donations: 0,
        total_amount_raised: 0
      });
    }
  };

  const handleStatusUpdate = async (donationId, newStatus) => {
    setActionLoading(true);
    try {
      await updateDonation(donationId, { status: newStatus });
      await fetchDonations();
      await fetchStats();
    } catch (error) {
      console.error('Error updating donation status:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const filteredDonations = donations.filter(donation =>
    donation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donation.transaction_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: FaClock },
      verified: { bg: 'bg-blue-100', text: 'text-blue-800', icon: FaEye },
      acknowledged: { bg: 'bg-green-100', text: 'text-green-800', icon: FaCheckCircle }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading && donations.length === 0) {
    return (
      <div className="min-h-screen bg-accent-50 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="h-8 w-8 animate-spin text-primary-900 mx-auto mb-4" />
          <p className="text-gray-600">Loading donations...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SeoHead 
        title="Donations Management - Mala Mahanadu"
        description="Manage and track donations for Mala Mahanadu organization"
        keywords="donations, management, Mala Mahanadu, admin"
      />
      
      <div className="min-h-screen bg-accent-50">
        {/* Header */}
        <div className="bg-primary-900 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 sm:py-6 gap-4">
              <div className="flex items-center">
                <FaHandHoldingHeart className="h-6 w-6 sm:h-8 sm:w-8 text-gold-500 mr-3" />
                <h1 className="text-xl sm:text-2xl font-bold text-white">Donations Management</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6">
              <div className="bg-white rounded-lg shadow border border-gray-200 p-3 sm:p-6">
                <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">Total Donations</h3>
                <p className="text-lg sm:text-2xl font-bold text-primary-900">{stats.total_donations}</p>
              </div>
              <div className="bg-white rounded-lg shadow border border-gray-200 p-3 sm:p-6">
                <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">Pending</h3>
                <p className="text-lg sm:text-2xl font-bold text-yellow-600">{stats.pending_donations}</p>
              </div>
              <div className="bg-white rounded-lg shadow border border-gray-200 p-3 sm:p-6">
                <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">Verified</h3>
                <p className="text-lg sm:text-2xl font-bold text-blue-600">{stats.verified_donations}</p>
              </div>
              <div className="bg-white rounded-lg shadow border border-gray-200 p-3 sm:p-6">
                <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">Acknowledged</h3>
                <p className="text-lg sm:text-2xl font-bold text-green-600">{stats.acknowledged_donations}</p>
              </div>
              <div className="bg-white rounded-lg shadow border border-gray-200 p-3 sm:p-6">
                <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">Total Raised</h3>
                <p className="text-lg sm:text-2xl font-bold text-gold-600">
                  <FaRupeeSign className="inline w-4 h-4 sm:w-5 sm:h-5" />
                  {(stats.total_amount_raised || 0).toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Filters and Search */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
          <div className="bg-white rounded-lg shadow border border-gray-200 p-4 sm:p-6">
            <div className="flex flex-col gap-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder="Search by name, email, or transaction ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex items-center">
                  <FaFilter className="text-gray-400 mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm focus:ring-2 focus:ring-gold-500 focus:border-transparent min-w-32"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="verified">Verified</option>
                    <option value="acknowledged">Acknowledged</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Donations Table */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Donor Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Method
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDonations.map((donation) => (
                    <tr key={donation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{donation.name}</div>
                          <div className="text-sm text-gray-500">{donation.email}</div>
                          <div className="text-sm text-gray-500">{donation.phone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          <FaRupeeSign className="inline w-3 h-3" />
                          {donation.amount.toLocaleString('en-IN')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{donation.payment_method}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{donation.transaction_id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(donation.donation_date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(donation.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {donation.status === 'pending' && (
                            <button
                              onClick={() => handleStatusUpdate(donation.id, 'verified')}
                              disabled={actionLoading}
                              className="text-blue-600 hover:text-blue-900 disabled:text-gray-400"
                            >
                              <FaEye className="w-4 h-4" />
                            </button>
                          )}
                          {donation.status === 'verified' && (
                            <button
                              onClick={() => handleStatusUpdate(donation.id, 'acknowledged')}
                              disabled={actionLoading}
                              className="text-green-600 hover:text-green-900 disabled:text-gray-400"
                            >
                              <FaCheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setSelectedDonation(donation);
                              setShowModal(true);
                            }}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            <FaEdit className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4 p-4">
              {filteredDonations.map((donation) => (
                <div key={donation.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-900">{donation.name}</h3>
                      <p className="text-xs text-gray-500">{donation.email}</p>
                      <p className="text-xs text-gray-500">{donation.phone}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-primary-900">
                        <FaRupeeSign className="inline w-3 h-3" />
                        {donation.amount.toLocaleString('en-IN')}
                      </div>
                      {getStatusBadge(donation.status)}
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <span className="text-gray-500 w-20 text-xs">Method:</span>
                      <span className="text-gray-900 text-xs">{donation.payment_method}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-gray-500 w-20 text-xs">Transaction:</span>
                      <span className="text-gray-900 text-xs font-mono break-all">
                        {donation.transaction_id}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-500 w-20 text-xs">Date:</span>
                      <span className="text-gray-900 text-xs">
                        {new Date(donation.donation_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                    <div className="flex space-x-2">
                      {donation.status === 'pending' && (
                        <button
                          onClick={() => handleStatusUpdate(donation.id, 'verified')}
                          disabled={actionLoading}
                          className="text-blue-600 hover:text-blue-900 disabled:text-gray-400 p-2"
                          title="Verify Donation"
                        >
                          <FaEye className="w-4 h-4" />
                        </button>
                      )}
                      {donation.status === 'verified' && (
                        <button
                          onClick={() => handleStatusUpdate(donation.id, 'acknowledged')}
                          disabled={actionLoading}
                          className="text-green-600 hover:text-green-900 disabled:text-gray-400 p-2"
                          title="Acknowledge Donation"
                        >
                          <FaCheckCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setSelectedDonation(donation);
                        setShowModal(true);
                      }}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-xs font-medium"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredDonations.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No donations found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );

};

export default DonationsManagement;
