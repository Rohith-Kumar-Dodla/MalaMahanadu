import React, { useState, useEffect } from 'react';
import SeoHead from '../../components/SeoHead';
import { FaUsers, FaHandHoldingHeart, FaExclamationTriangle, FaChartLine, FaChartBar, FaChartPie, FaArrowUp, FaArrowDown, FaRupeeSign, FaCalendarAlt, FaUserFriends } from 'react-icons/fa';
import { getDonationStats, getComplaintStats, getMemberStats } from '../../api/api';

const AdminDashboard = () => {
  const [membershipStats, setMembershipStats] = useState(null);
  const [donationStats, setDonationStats] = useState(null);
  const [complaintStats, setComplaintStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem('adminToken');
    if (!token) {
      window.location.href = '/admin/login';
      return;
    }

    fetchAllStats();
  }, []);

  const fetchAllStats = async () => {
    setLoading(true);
    try {
      // Fetch all stats in parallel
      const [membershipData, donationData, complaintData] = await Promise.all([
        getMemberStats(),
        getDonationStats(),
        getComplaintStats()
      ]);

      setMembershipStats(membershipData);
      setDonationStats(donationData);
      setComplaintStats(complaintData);
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Set all stats to null to show no data state
      setMembershipStats(null);
      setDonationStats(null);
      setComplaintStats(null);
    } finally {
      setLoading(false);
    }
  };

  // Real-time data will be fetched from API
  const [monthlyData, setMonthlyData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [allMembers, setAllMembers] = useState([]);
  const [allDonations, setAllDonations] = useState([]);
  const [allComplaints, setAllComplaints] = useState([]);

  // Process real data for charts
  useEffect(() => {
    processChartData();
  }, [allMembers, allDonations, allComplaints]);

  const processChartData = () => {
    // Process monthly trends from real data
    const monthlyTrends = processMonthlyTrends();
    setMonthlyData(monthlyTrends);

    // Process district distribution from real data
    const districtDistribution = processDistrictDistribution();
    setDistrictData(districtDistribution);
  };

  const processMonthlyTrends = () => {
    const lastSixMonths = [];
    const now = new Date();
    
    // Generate last 6 months
    for (let i = 5; i >= 0; i--) {
      const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = monthDate.toLocaleDateString('en-US', { month: 'short' });
      const monthStart = monthDate.toISOString().split('T')[0];
      const monthEnd = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).toISOString().split('T')[0];
      
      // Count members registered in this month
      const membersInMonth = allMembers.filter(member => {
        const memberDate = new Date(member.created_at).toISOString().split('T')[0];
        return memberDate >= monthStart && memberDate <= monthEnd;
      }).length;

      // Sum donations in this month
      const donationsInMonth = allDonations
        .filter(donation => {
          const donationDate = new Date(donation.created_at).toISOString().split('T')[0];
          return donationDate >= monthStart && donationDate <= monthEnd;
        })
        .reduce((sum, donation) => sum + (parseFloat(donation.amount) || 0), 0);

      lastSixMonths.push({
        month: monthName,
        members: membersInMonth,
        donations: donationsInMonth
      });
    }

    return lastSixMonths;
  };

  const processDistrictDistribution = () => {
    // Group members by district
    const districtCounts = {};
    
    allMembers.forEach(member => {
      const district = member.district || 'Unknown';
      if (!districtCounts[district]) {
        districtCounts[district] = 0;
      }
      districtCounts[district]++;
    });

    // Convert to array and calculate percentages
    const totalMembers = allMembers.length;
    const distribution = Object.entries(districtCounts)
      .map(([district, members]) => ({
        district,
        members,
        percentage: totalMembers > 0 ? Math.round((members / totalMembers) * 100) : 0
      }))
      .sort((a, b) => b.members - a.members)
      .slice(0, 5); // Top 5 districts

    return distribution;
  };

  // Fetch real data from localStorage and APIs
  useEffect(() => {
    fetchRealData();
    
    // Set up periodic refresh to get latest data
    const interval = setInterval(fetchRealData, 5000); // Refresh every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  // Also refresh when window gains focus (user switches back to dashboard)
  useEffect(() => {
    const handleFocus = () => {
      fetchRealData();
    };
    
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const fetchRealData = async () => {
    try {
      // Get members data from MemberDashboard localStorage
      const storedMembers = localStorage.getItem('membersData');
      if (storedMembers) {
        const membersData = JSON.parse(storedMembers);
        setAllMembers(membersData);
        console.log('Loaded members data:', membersData.length, 'members');
      }

      // Get donations data - try localStorage first, then API
      try {
        const donationsResponse = await fetch('/api/donations/');
        if (donationsResponse.ok) {
          const donationsData = await donationsResponse.json();
          setAllDonations(donationsData);
          console.log('Loaded donations data from API:', donationsData.length, 'donations');
        }
      } catch (donationApiError) {
        // Try localStorage as fallback
        const storedDonations = localStorage.getItem('donations');
        if (storedDonations) {
          setAllDonations(JSON.parse(storedDonations));
          console.log('Loaded donations data from localStorage');
        }
      }

      // Get complaints data - try localStorage first, then API
      try {
        const complaintsResponse = await fetch('/api/complaints/');
        if (complaintsResponse.ok) {
          const complaintsData = await complaintsResponse.json();
          setAllComplaints(complaintsData);
          console.log('Loaded complaints data from API:', complaintsData.length, 'complaints');
        }
      } catch (complaintApiError) {
        // Try localStorage as fallback
        const storedComplaints = localStorage.getItem('complaints');
        if (storedComplaints) {
          setAllComplaints(JSON.parse(storedComplaints));
          console.log('Loaded complaints data from localStorage');
        }
      }
    } catch (error) {
      console.error('Error fetching real data:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-accent-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SeoHead 
        title="Admin Dashboard - Mala Mahanadu"
        description="Admin dashboard with statistics and analytics for Mala Mahanadu organization"
        keywords="admin dashboard, statistics, analytics, Mala Mahanadu"
      />
      
      <div className="min-h-screen bg-accent-50">
        {/* Header */}
        <div className="bg-primary-900 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-primary-200 mt-1">Overview and Analytics</p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={fetchAllStats}
                  className="hidden sm:block bg-gold-500 hover:bg-gold-600 text-primary-900 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Refresh Data
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Stats Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Membership Stats */}
            <div className="bg-white rounded-lg shadow border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 bg-blue-100 rounded-full">
                  <FaUsers className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                </div>
                {membershipStats ? (
                  <span className="text-xs sm:text-sm text-green-600 font-medium flex items-center">
                    <FaArrowUp className="mr-1" />
                    +12%
                  </span>
                ) : (
                  <span className="text-xs sm:text-sm text-gray-500 font-medium">No Data</span>
                )}
              </div>
              <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Total Members</h3>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {membershipStats?.total_members || '0'}
              </p>
              <p className="text-xs text-gray-500 mt-1 sm:mt-2">
                {membershipStats ? `+${membershipStats.new_members_this_month || 0} this month` : 'API not available'}
              </p>
            </div>

            {/* Donation Stats */}
            <div className="bg-white rounded-lg shadow border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 bg-green-100 rounded-full">
                  <FaHandHoldingHeart className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                </div>
                {donationStats ? (
                  <span className="text-xs sm:text-sm text-green-600 font-medium flex items-center">
                    <FaArrowUp className="mr-1" />
                    +18%
                  </span>
                ) : (
                  <span className="text-xs sm:text-sm text-gray-500 font-medium">No Data</span>
                )}
              </div>
              <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Total Raised</h3>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {donationStats ? (
                  <>
                    <FaRupeeSign className="inline w-4 h-4 sm:w-5 sm:h-5" />
                    {(donationStats.total_amount_raised || 0).toLocaleString('en-IN')}
                  </>
                ) : (
                  '0'
                )}
              </p>
              <p className="text-xs text-gray-500 mt-1 sm:mt-2">
                {donationStats ? `${donationStats.total_donations || 0} donations` : 'API not available'}
              </p>
            </div>

            {/* Complaint Stats */}
            <div className="bg-white rounded-lg shadow border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 bg-yellow-100 rounded-full">
                  <FaExclamationTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
                </div>
                {complaintStats ? (
                  <span className="text-xs sm:text-sm text-red-600 font-medium flex items-center">
                    <FaArrowDown className="mr-1" />
                    -5%
                  </span>
                ) : (
                  <span className="text-xs sm:text-sm text-gray-500 font-medium">No Data</span>
                )}
              </div>
              <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Total Complaints</h3>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {complaintStats?.total_complaints || '0'}
              </p>
              <p className="text-xs text-gray-500 mt-1 sm:mt-2">
                {complaintStats ? `${complaintStats.pending_complaints || 0} pending` : 'API not available'}
              </p>
            </div>

            {/* Active Members */}
            <div className="bg-white rounded-lg shadow border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 bg-purple-100 rounded-full">
                  <FaUserFriends className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                </div>
                {membershipStats ? (
                  <span className="text-xs sm:text-sm text-green-600 font-medium flex items-center">
                    <FaArrowUp className="mr-1" />
                    +8%
                  </span>
                ) : (
                  <span className="text-xs sm:text-sm text-gray-500 font-medium">No Data</span>
                )}
              </div>
              <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Active Members</h3>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {membershipStats?.active_members || '0'}
              </p>
              <p className="text-xs text-gray-500 mt-1 sm:mt-2">
                {membershipStats ? `${membershipStats.id_cards_generated || 0} ID cards generated` : 'API not available'}
              </p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Monthly Trends Chart */}
            <div className="bg-white rounded-lg shadow border border-gray-200 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center">
                  <FaChartLine className="mr-2 text-primary-600" />
                  Monthly Trends
                </h2>
                <select className="text-sm border border-gray-300 rounded px-3 py-1">
                  <option>Last 6 months</option>
                  <option>Last year</option>
                </select>
              </div>
              
              {/* Simple Bar Chart Representation */}
              <div className="space-y-4">
                {monthlyData.length > 0 ? (
                  monthlyData.map((data, index) => (
                    <div key={data.month} className="flex items-center">
                      <div className="w-12 text-sm text-gray-600">{data.month}</div>
                      <div className="flex-1 mx-4">
                        <div className="flex space-x-2">
                          <div className="flex-1 bg-gray-200 rounded relative">
                            <div 
                              className="bg-blue-500 h-6 rounded flex items-center justify-end pr-2"
                              style={{ width: `${(data.members / 200) * 100}%` }}
                            >
                              <span className="text-xs text-white font-medium">{data.members}</span>
                            </div>
                          </div>
                          <div className="flex-1 bg-gray-200 rounded relative">
                            <div 
                              className="bg-green-500 h-6 rounded flex items-center justify-end pr-2"
                              style={{ width: `${(data.donations / 500000) * 100}%` }}
                            >
                              <span className="text-xs text-white font-medium">{(data.donations / 1000).toFixed(0)}k</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No chart data available</p>
                    <p className="text-sm text-gray-400 mt-2">Charts will display when API data is available</p>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-center mt-6 space-x-6 text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                  <span>Members</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                  <span>Donations (k)</span>
                </div>
              </div>
            </div>

            {/* District Distribution Chart */}
            <div className="bg-white rounded-lg shadow border border-gray-200 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center">
                  <FaChartPie className="mr-2 text-primary-600" />
                  District Distribution
                </h2>
                <FaCalendarAlt className="text-gray-400" />
              </div>
              
              {/* Simple Pie Chart Representation */}
              <div className="space-y-3">
                {districtData.length > 0 ? (
                  districtData.map((district, index) => (
                    <div key={district.district} className="flex items-center">
                      <div className="w-24 text-sm text-gray-600 truncate">{district.district}</div>
                      <div className="flex-1 mx-4">
                        <div className="bg-gray-200 rounded-full relative">
                          <div 
                            className={`h-6 rounded-full flex items-center justify-end pr-2 ${
                              index === 0 ? 'bg-blue-500' :
                              index === 1 ? 'bg-green-500' :
                              index === 2 ? 'bg-yellow-500' :
                              index === 3 ? 'bg-red-500' :
                              index === 4 ? 'bg-purple-500' :
                              'bg-gray-500'
                            }`}
                            style={{ width: `${district.percentage}%` }}
                          >
                            <span className="text-xs text-white font-medium">{district.percentage}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-12 text-sm text-gray-900 font-medium text-right">{district.members}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No district data available</p>
                    <p className="text-sm text-gray-400 mt-2">District distribution will display when API data is available</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow p-4 sm:p-6 text-white">
              <FaUsers className="h-6 w-6 sm:h-8 sm:w-8 mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold mb-2">Membership Management</h3>
              <p className="text-blue-100 text-xs sm:text-sm mb-3 sm:mb-4">Manage member registrations and verifications</p>
              <button 
                onClick={() => window.location.href = '/admin/members'}
                className="bg-white text-blue-600 px-3 sm:px-4 py-2 rounded font-medium hover:bg-blue-50 transition-colors text-sm sm:text-base"
              >
                View Members
              </button>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow p-4 sm:p-6 text-white">
              <FaHandHoldingHeart className="h-6 w-6 sm:h-8 sm:w-8 mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold mb-2">Donation Management</h3>
              <p className="text-green-100 text-xs sm:text-sm mb-3 sm:mb-4">Track and verify donation transactions</p>
              <button 
                onClick={() => window.location.href = '/admin/donations'}
                className="bg-white text-green-600 px-3 sm:px-4 py-2 rounded font-medium hover:bg-green-50 transition-colors text-sm sm:text-base"
              >
                View Donations
              </button>
            </div>

            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg shadow p-4 sm:p-6 text-white">
              <FaExclamationTriangle className="h-6 w-6 sm:h-8 sm:w-8 mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold mb-2">Complaint Management</h3>
              <p className="text-yellow-100 text-xs sm:text-sm mb-3 sm:mb-4">Handle and resolve member complaints</p>
              <button 
                onClick={() => window.location.href = '/admin/complaints'}
                className="bg-white text-yellow-600 px-3 sm:px-4 py-2 rounded font-medium hover:bg-yellow-50 transition-colors text-sm sm:text-base"
              >
                View Complaints
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
