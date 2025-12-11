import React, { useState, useEffect } from 'react';
import { getMembers, getMemberStats, updateMemberStatus } from '../../api/api';
import SeoHead from '../../components/SeoHead';
import { FaUsers, FaSearch, FaDownload, FaEye, FaEnvelope, FaIdCard, FaFilter, FaSignOutAlt, FaSpinner, FaTimes, FaCheck } from 'react-icons/fa';

const MemberDashboard = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterState, setFilterState] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailForm, setEmailForm] = useState({
    to: '',
    subject: '',
    body: ''
  });

  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem('adminToken');
    if (!token) {
      window.location.href = '/admin/login';
      return;
    }

    fetchMembers();
  }, [currentPage, searchTerm, filterState]);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      // Use the imported API function with proper parameters
      const params = {
        skip: (currentPage - 1) * 10,
        limit: 10,
        search: searchTerm,
        state: filterState
      };

      const data = await getMembers(params);
      setMembers(data);
      setTotalPages(Math.ceil(data.length / 10));
      
    } catch (error) {
      console.error('Error fetching members:', error);
      
      // If backend is not available, try to load from localStorage
      if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
        const storedMembers = localStorage.getItem('membersData');
        if (storedMembers) {
          const parsedMembers = JSON.parse(storedMembers);
          setMembers(parsedMembers);
          setTotalPages(Math.ceil(parsedMembers.length / 10));
        } else {
          // Add sample data with photo for testing
          const sampleData = [
            {
              id: 1,
              membership_id: 'MMN-2025-000001',
              name: 'Rama Rao',
              father_name: 'Lakshmana Rao',
              gender: 'Male',
              phone: '9876543210',
              email: 'rama@example.com',
              village: 'Hyderabad',
              district: 'Hyderabad',
              state: 'Telangana',
              status: 'pending',
              photo_url: '/static/photos/test_member.jpg',
              created_at: '2025-01-01T10:00:00Z'
            },
            {
              id: 2,
              membership_id: 'MMN-2025-000002',
              name: 'Sita Devi',
              father_name: 'Janaka Rao',
              gender: 'Female',
              phone: '9876543211',
              email: 'sita@example.com',
              village: 'Warangal',
              district: 'Warangal',
              state: 'Telangana',
              status: 'pending',
              photo_url: '/static/photos/test_member2.jpg',
              created_at: '2025-01-02T11:00:00Z'
            }
          ];
          setMembers(sampleData);
          setTotalPages(Math.ceil(sampleData.length / 10));
          localStorage.setItem('membersData', JSON.stringify(sampleData));
        }
      } else {
        setMembers([]);
        setTotalPages(0);
        alert('Failed to load members from server. Please check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchMembers();
  };

  const handleExportCSV = () => {
    // Create CSV content
    const headers = ['Membership ID', 'Name', 'Father Name', 'Gender', 'Phone', 'Email', 'Village', 'District', 'State', 'Registration Date'];
    const csvContent = [
      headers.join(','),
      ...members.map(member => [
        member.membership_id,
        member.name,
        member.father_name,
        member.gender,
        member.phone,
        member.email,
        member.village,
        member.district,
        member.state,
        new Date(member.created_at).toLocaleDateString()
      ].join(','))
    ].join('\n');

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `members_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    window.location.href = '/admin/login';
  };

  const handleViewMember = (memberId) => {
    const member = members.find(m => m.id === memberId);
    setSelectedMember(member);
  };

  const handleSendEmail = (member) => {
    setSelectedMember(member);
    setEmailForm({
      to: '',
      subject: `Mala Mahanadu ID Card - ${member.name}`,
      body: `Dear ${member.name},\n\nPlease find your Mala Mahanadu ID Card attached.\n\nMembership ID: ${member.membership_id}\n\nThank you for being part of Mala Mahanadu.\n\nBest regards,\nMala Mahanadu Team`
    });
    setShowEmailModal(true);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call to send email with attachments
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/send-email-with-attachments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: emailForm.to,
          subject: emailForm.subject,
          body: emailForm.body,
          memberId: selectedMember.id,
          attachments: ['png', 'pdf'] // Send both PNG and PDF
        })
      });
      
      if (response.ok) {
        alert('Email sent successfully!');
        setShowEmailModal(false);
        setEmailForm({ to: '', subject: '', body: '' });
        
        // Update email sent count - could trigger a stats refresh
        if (window.location.pathname === '/admin/dashboard') {
          setTimeout(() => window.location.reload(), 1000);
        }
      } else {
        alert('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending email');
    }
  };

  const handleMemberStatusUpdate = async (memberId, status) => {
    const originalStatus = members.find(m => m.id === memberId)?.status;
    
    try {
      // Update member status immediately in UI for better UX
      const updatedMembers = members.map(member => 
        member.id === memberId ? { ...member, status } : member
      );
      setMembers(updatedMembers);
      
      // Store in localStorage immediately for persistence
      localStorage.setItem('membersData', JSON.stringify(updatedMembers));
      
      // Try to use the imported API function
      await updateMemberStatus(memberId, status);
      
      // Show success message
      alert(`Member ${status} successfully!`);
      
    } catch (error) {
      console.error('Error updating member status:', error);
      
      // If backend is not available, keep the local changes
      if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
        alert(`Member ${status} successfully! (Saved locally)`);
      } else {
        alert(`Failed to ${status} member. Please try again.`);
        
        // Revert the status change on error
        setMembers(prevMembers => 
          prevMembers.map(member => 
            member.id === memberId ? { ...member, status: originalStatus } : member
          )
        );
      }
    }
    // Don't call fetchMembers() here to avoid overwriting local changes
  };

  const handleDownloadIDCard = async (memberId, format) => {
    try {
      // Create ID card element for download
      const idCardElement = document.getElementById(`id-card-${memberId}`);
      if (!idCardElement) {
        alert('ID Card not found');
        return;
      }

      if (format === 'png') {
        // Use html2canvas library to convert to PNG
        const html2canvas = (await import('html2canvas')).default;
        const canvas = await html2canvas(idCardElement, {
          scale: 2,
          backgroundColor: '#ffffff'
        });
        
        // Convert to blob and download
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `ID-Card-${memberId}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        });
      } else if (format === 'pdf') {
        // Use jsPDF library to convert to PDF
        const jsPDF = (await import('jspdf')).default;
        const html2canvas = (await import('html2canvas')).default;
        
        const canvas = await html2canvas(idCardElement, {
          scale: 2,
          backgroundColor: '#ffffff'
        });
        
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('L', 'mm', [85.6, 53.98]); // Credit card size
        const imgWidth = 85.6;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save(`ID-Card-${memberId}.pdf`);
      }
    } catch (error) {
      console.error('Error downloading ID card:', error);
      alert('Failed to download ID card. Please try again.');
    }
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = !searchTerm || 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.membership_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesState = !filterState || member.state === filterState;
    
    return matchesSearch && matchesState;
  });

  return (
    <>
      <SeoHead 
        title="Admin Dashboard - Mala Mahanadu"
        description="Admin dashboard for managing Mala Mahanadu members"
        keywords="admin dashboard, member management, Mala Mahanadu"
      />
      
      <div className="min-h-screen bg-accent-50">
        {/* Header */}
        <div className="bg-primary-900 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 sm:py-6 gap-4">
              <div className="flex items-center">
                <FaUsers className="h-6 w-6 sm:h-8 sm:w-8 text-gold-500 mr-3" />
                <h1 className="text-xl sm:text-2xl font-bold text-white">Member Dashboard</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-white rounded-lg shadow border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center">
                <div className="p-2 sm:p-3 bg-gold-100 rounded-full">
                  <FaUsers className="h-5 w-5 sm:h-6 sm:w-6 text-gold-500" />
                </div>
                <div className="ml-3 sm:ml-4">
                  <p className="text-xs sm:text-sm text-gray-600">Total Members</p>
                  <p className="text-xl sm:text-2xl font-bold text-primary-900">{members.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center">
                <div className="p-2 sm:p-3 bg-green-100 rounded-full">
                  <FaIdCard className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
                </div>
                <div className="ml-3 sm:ml-4">
                  <p className="text-xs sm:text-sm text-gray-600">Approved Members</p>
                  <p className="text-xl sm:text-2xl font-bold text-primary-900">
                    {members.filter(m => m.status === 'approved').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center">
                <div className="p-2 sm:p-3 bg-yellow-100 rounded-full">
                  <FaEnvelope className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500" />
                </div>
                <div className="ml-3 sm:ml-4">
                  <p className="text-xs sm:text-sm text-gray-600">Pending Members</p>
                  <p className="text-xl sm:text-2xl font-bold text-primary-900">
                    {members.filter(m => m.status === 'pending').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex flex-col gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name, ID, phone, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex-1 sm:flex-none">
                  <select
                    value={filterState}
                    onChange={(e) => setFilterState(e.target.value)}
                    className="block w-full sm:w-auto px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent min-w-32"
                  >
                    <option value="">All States</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Karnataka">Karnataka</option>
                  </select>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    onClick={handleSearch}
                    className="flex-1 sm:flex-none bg-gold-500 hover:bg-gold-600 text-primary-900 font-medium py-2 px-3 sm:px-4 rounded-lg transition-colors text-sm"
                  >
                    Search
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm('');
                      setFilterState('');
                      setCurrentPage(1);
                    }}
                    className="px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
              <button
                onClick={handleExportCSV}
                className="flex items-center text-primary-900 hover:text-gold-600 transition-colors"
              >
                <FaDownload className="mr-2" />
                Export CSV
              </button>
            </div>
          </div>

          {/* Members Table */}
          <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <FaSpinner className="h-8 w-8 animate-spin text-primary-900" />
                <span className="ml-2 text-gray-600">Loading members...</span>
              </div>
            ) : (
              <>
                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Membership ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Location
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Registration Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Approval
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredMembers.map((member) => (
                        <tr key={member.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-900">
                            {member.membership_id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{member.name}</div>
                              <div className="text-sm text-gray-500">{member.father_name}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{member.phone}</div>
                            <div className="text-sm text-gray-500">{member.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              member.status === 'approved' ? 'bg-green-100 text-green-800' :
                              member.status === 'rejected' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {member.status || 'pending'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{member.village}</div>
                            <div className="text-sm text-gray-500">{member.district}, {member.state}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(member.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleMemberStatusUpdate(member.id, 'approved')}
                                className="text-green-600 hover:text-green-900"
                                title="Approve Member"
                              >
                                <FaCheck />
                              </button>
                              <button
                                onClick={() => handleMemberStatusUpdate(member.id, 'rejected')}
                                className="text-red-600 hover:text-red-900"
                                title="Reject Member"
                              >
                                <FaTimes />
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleViewMember(member.id)}
                                className="text-primary-600 hover:text-primary-900"
                                title="View Details"
                              >
                                <FaEye />
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
                  {filteredMembers.map((member) => (
                    <div key={member.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-gray-900">{member.name}</h3>
                          <p className="text-xs text-gray-500">{member.father_name}</p>
                          <p className="text-xs font-mono text-primary-600 mt-1">{member.membership_id}</p>
                        </div>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          member.status === 'approved' ? 'bg-green-100 text-green-800' :
                          member.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {member.status || 'pending'}
                        </span>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <span className="text-gray-500 w-16">Phone:</span>
                          <span className="text-gray-900">{member.phone}</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-gray-500 w-16 flex-shrink-0">Email:</span>
                          <span className="text-gray-900 text-xs break-all ml-2">{member.email}</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-gray-500 w-16">Location:</span>
                          <span className="text-gray-900 text-xs">
                            {member.village}, {member.district}, {member.state}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-500 w-16">Joined:</span>
                          <span className="text-gray-900 text-xs">
                            {new Date(member.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleMemberStatusUpdate(member.id, 'approved')}
                            className="text-green-600 hover:text-green-900 p-2"
                            title="Approve Member"
                          >
                            <FaCheck className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleMemberStatusUpdate(member.id, 'rejected')}
                            className="text-red-600 hover:text-red-900 p-2"
                            title="Reject Member"
                          >
                            <FaTimes className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => handleViewMember(member.id)}
                          className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-1 rounded text-xs font-medium"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredMembers.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No members found</p>
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="flex-1 flex justify-between sm:hidden">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Next
                      </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          Page <span className="font-medium">{currentPage}</span> of{' '}
                          <span className="font-medium">{totalPages}</span>
                        </p>
                      </div>
                      <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                          <button
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                          >
                            Previous
                          </button>
                          {[...Array(totalPages)].map((_, i) => (
                            <button
                              key={i + 1}
                              onClick={() => setCurrentPage(i + 1)}
                              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                currentPage === i + 1
                                  ? 'z-10 bg-gold-500 border-gold-500 text-primary-900'
                                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                              }`}
                            >
                              {i + 1}
                            </button>
                          ))}
                          <button
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                          >
                            Next
                          </button>
                        </nav>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Member Details Modal */}
        {selectedMember && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-4/5 shadow-lg rounded-md bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">Member Details & ID Card</h3>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Member Information */}
                <div className="space-y-4">
                  <h4 className="text-md font-semibold text-gray-800">Personal Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-medium">{selectedMember.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Membership ID</p>
                      <p className="font-medium font-mono">{selectedMember.membership_id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Father Name</p>
                      <p className="font-medium">{selectedMember.father_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Gender</p>
                      <p className="font-medium">{selectedMember.gender}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium">{selectedMember.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium text-xs break-all">{selectedMember.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Village</p>
                      <p className="font-medium">{selectedMember.village}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">District</p>
                      <p className="font-medium">{selectedMember.district}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">State</p>
                      <p className="font-medium">{selectedMember.state}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Registration Date</p>
                      <p className="font-medium">
                        {new Date(selectedMember.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="pt-4 border-t">
                    <h4 className="text-md font-semibold text-gray-800 mb-3">Actions</h4>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => handleSendEmail(selectedMember)}
                        className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <FaEnvelope className="mr-2" />
                        Send Email
                      </button>
                      <div className="relative group">
                        <button className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                          <FaDownload className="mr-2" />
                          Download ID Card
                        </button>
                        <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                          <div className="py-1">
                            <button 
                              onClick={() => handleDownloadIDCard(selectedMember.id, 'png')}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Download as PNG
                            </button>
                            <button 
                              onClick={() => handleDownloadIDCard(selectedMember.id, 'pdf')}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Download as PDF
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* ID Card Preview */}
                <div>
                  <h4 className="text-md font-semibold text-gray-800 mb-3">ID Card Preview</h4>
                  <div className="border-2 border-gray-300 rounded-lg p-4 bg-gradient-to-br from-blue-50 to-blue-100">
                    {/* ID Card Design */}
                    <div id={`id-card-${selectedMember.id}`} className="bg-white rounded-lg shadow-lg p-6">
                      <div className="text-center border-b-2 border-blue-600 pb-4 mb-4">
                        <h2 className="text-xl font-bold text-blue-900">Mala Mahanadu</h2>
                        <p className="text-sm text-gray-600">Membership Card</p>
                      </div>
                      
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="relative">
                          {selectedMember.photo_url && 
                           !selectedMember.photo_url.includes('photo_001.jpg') && 
                           !selectedMember.photo_url.includes('photo_002.jpg') &&
                           selectedMember.photo_url.trim() !== '' ? (
                            <img 
                              src={`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}${selectedMember.photo_url}`} 
                              alt={selectedMember.name}
                              className="w-20 h-20 rounded-full object-cover border-2 border-blue-600"
                              onError={(e) => {
                                console.log('Image failed to load:', e.target.src);
                                e.target.style.display = 'none';
                                e.target.parentElement.querySelector('.fallback-avatar').style.display = 'flex';
                              }}
                              onLoad={() => {
                                console.log('Image loaded successfully:', e.target.src);
                              }}
                            />
                          ) : (
                            console.log('Using fallback avatar. Photo URL:', selectedMember.photo_url)
                          )}
                          <div className="fallback-avatar w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center" style={{ display: (selectedMember.photo_url && 
                           !selectedMember.photo_url.includes('photo_001.jpg') && 
                           !selectedMember.photo_url.includes('photo_002.jpg') &&
                           selectedMember.photo_url.trim() !== '') ? 'none' : 'flex' }}>
                            <FaUsers className="w-10 h-10 text-gray-600" />
                          </div>
                        </div>
                        <div>
                          <p className="font-bold text-lg">{selectedMember.name}</p>
                          <p className="text-sm text-gray-600">{selectedMember.father_name}</p>
                          <p className="text-xs text-gray-500">{selectedMember.gender}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Membership ID:</span>
                          <span className="font-mono font-medium">{selectedMember.membership_id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Phone:</span>
                          <span>{selectedMember.phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Location:</span>
                          <span>{selectedMember.village}, {selectedMember.district}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">State:</span>
                          <span>{selectedMember.state}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t text-center">
                        <p className="text-xs text-gray-500">
                          Valid from: {new Date(selectedMember.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Email Modal */}
        {showEmailModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-2/3 shadow-lg rounded-md bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">Send Email with ID Card</h3>
                <button
                  onClick={() => setShowEmailModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    To Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={emailForm.to}
                    onChange={(e) => setEmailForm({...emailForm, to: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter recipient email"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={emailForm.subject}
                    onChange={(e) => setEmailForm({...emailForm, subject: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={emailForm.body}
                    onChange={(e) => setEmailForm({...emailForm, body: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> ID Card will be automatically attached as both PNG and PDF files.
                  </p>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowEmailModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  >
                    Send Email
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MemberDashboard;
