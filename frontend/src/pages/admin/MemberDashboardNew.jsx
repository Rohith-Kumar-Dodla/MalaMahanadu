import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../config/api';
import SeoHead from '../../components/SeoHead';
import AdminLayout from '../../components/AdminLayout';
import { FaUsers, FaSearch, FaDownload, FaEye, FaWhatsapp, FaIdCard, FaFilter, FaSpinner } from 'react-icons/fa';

const MemberDashboardNew = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterState, setFilterState] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('members');
  const [selectedMember, setSelectedMember] = useState(null);

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
      const params = new URLSearchParams({
        skip: (currentPage - 1) * 10,
        limit: 10,
        search: searchTerm,
        state: filterState
      });

      // Add cache-busting timestamp to force fresh data
      const timestamp = new Date().getTime();
      const response = await fetch(`/api/membership/?${params}&_t=${timestamp}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched members data:', data); // Debug log
        setMembers(data);
        // For demo purposes, set total pages
        setTotalPages(Math.ceil(data.length / 10));
      } else {
        console.error('Failed to fetch members');
      }
    } catch (error) {
      console.error('Error fetching members:', error);
      // For demo, show sample data with photo URLs and proper ID structure
      setMembers([
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
          photo_url: '/mock-images/chennaiah.jpg',
          id_card_url: '/static/idcards/ID_MMN_2025_000001.png',
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
          photo_url: '/mock-images/burgula-venkateswarlu.jpg',
          id_card_url: '/static/idcards/ID_MMN_2025_000002.png',
          created_at: '2025-01-02T11:00:00Z'
        }
      ]);
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

    // Create download link
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

  const handleViewDetails = (memberId) => {
    // Find the member by numeric ID to get membership_id
    const member = members.find(m => m.id === memberId);
    if (member) {
      window.location.href = `/admin/members/${member.membership_id}`;
    } else {
      console.error('Member not found:', memberId);
    }
  };

  const handleSendWhatsApp = async (memberId) => {
    try {
      // Get member details
      const member = members.find(m => m.id === memberId);
      if (!member) {
        alert('Member not found');
        return;
      }

      // Create WhatsApp message
      const message = `Dear ${member.name},\n\nThank you for joining Mala Mahanadu! Your membership has been confirmed.\n\nMembership ID: ${member.membership_id}\n\nYour official ID card is attached. Please keep it safe for future reference.\n\nFor any queries, please contact us.\n\nMala Mahanadu Team\nEmpowering Community, Building Future`;
      
      // Create WhatsApp URL
      const whatsappUrl = `https://wa.me/91${member.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
      
      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');
      
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      alert('Error sending WhatsApp message');
    }
  };

  const handleViewIdCard = (member) => {
    setSelectedMember(member);
  };

  const handleRegenerateIdCard = async (member) => {
    if (!member) {
      alert('Member not found');
      return;
    }
    
    try {
      const response = await fetch(`/api/membership/${member.id}/regenerate-idcard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        alert('ID card regenerated successfully!');
        
        // Update the member's ID card URL in the state
        setMembers(prevMembers => 
          prevMembers.map(m => 
            m.id === member.id 
              ? { ...m, id_card_url: data.id_card_url }
              : m
          )
        );
        
        // Update the selected member as well
        setSelectedMember(prev => 
          prev?.id === member.id 
            ? { ...prev, id_card_url: data.id_card_url }
            : prev
        );
        
        // Refresh the members list
        fetchMembers();
      } else {
        const errorData = await response.json();
        alert(`Failed to regenerate ID card: ${errorData.detail || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error regenerating ID card:', error);
      alert('Failed to regenerate ID card. Please try again.');
    }
  };

  const handleDownloadIdCard = async (member) => {
    if (!member) {
      alert('Member not found');
      return;
    }
    
    try {
      // Get the ID card URL from the member data or generate it
      let idCardUrl = member.id_card_url;
      
      // If no ID card URL exists, try to construct it
      if (!idCardUrl) {
        idCardUrl = `/static/idcards/ID_${member.membership_id.replace('-', '_')}.png`;
      }

      // Download the PNG directly from server
      try {
        const response = await fetch(idCardUrl);
        if (!response.ok) {
          throw new Error('ID card not found on server');
        }
        
        const blob = await response.blob();
        
        // Ensure we have the correct MIME type
        const mimeType = blob.type || 'image/png';
        const correctedBlob = new Blob([blob], { type: mimeType });
        
        const url = window.URL.createObjectURL(correctedBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ID-Card-${member.membership_id}.png`;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        // Clean up the URL after a short delay
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
        }, 100);
        
        console.log('ID Card downloaded successfully');
      } catch (fetchError) {
        console.error('Error fetching ID card from server:', fetchError);
        alert('ID card not found on server. Please regenerate the ID card first.');
      }
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download ID card. Please try again.');
    }
  };

  if (loading && members.length === 0) {
    return (
      <AdminLayout activeTab="members" setActiveTab={setActiveTab}>
        <div className="flex items-center justify-center h-64">
          <FaSpinner className="h-8 w-8 animate-spin text-primary-900 mr-3" />
          <span className="text-gray-600">Loading members...</span>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout activeTab="members" setActiveTab={setActiveTab}>
      <SeoHead 
        title="Members Dashboard - Mala Mahanadu"
        description="Admin dashboard for managing Mala Mahanadu members"
        keywords="admin, members, dashboard, Mala Mahanadu"
      />
      
      {/* Header */}
      <div className="bg-primary-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <FaUsers className="h-8 w-8 text-gold-500 mr-3" />
              <h1 className="text-2xl font-bold text-white">Members Management</h1>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleExportCSV}
                className="flex items-center px-4 py-2 bg-gold-500 hover:bg-gold-600 text-primary-900 rounded-lg transition-colors"
              >
                <FaDownload className="mr-2" />
                Export CSV
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, membership ID, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <FaFilter className="text-gray-400 mr-2" />
                  <select
                    value={filterState}
                    onChange={(e) => setFilterState(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                  >
                    <option value="">All States</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FaFilter className="mr-2" />
                  Filters
                </button>
                <button
                  type="submit"
                  className="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                >
                  <FaSearch className="mr-2" />
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Members Table */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Member Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registration Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {members.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <FaUsers className="h-6 w-6 text-gray-400" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{member.name}</div>
                          <div className="text-sm text-gray-500">{member.membership_id}</div>
                          <div className="text-sm text-gray-500">{member.gender}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{member.phone}</div>
                      <div className="text-sm text-gray-500">{member.email}</div>
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
                          onClick={() => handleViewDetails(member.id)}
                          className="text-primary-600 hover:text-primary-900"
                          title="View Details"
                        >
                          <FaEye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleSendWhatsApp(member.id)}
                          className="text-green-600 hover:text-green-900"
                          title="Send WhatsApp"
                        >
                          <FaWhatsapp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleViewIdCard(member)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View ID Card"
                        >
                          <FaIdCard className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDownloadIdCard(member)}
                          className="text-purple-600 hover:text-purple-900"
                          title="Download ID Card"
                        >
                          <FaDownload className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {members.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No members found</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    currentPage === i + 1
                      ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* ID Card Preview Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 xs:top-20 mx-auto p-3 xs:p-5 border w-11/12 xs:w-11/12 md:w-3/4 lg:w-4/5 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-3 xs:mb-4">
              <h3 className="text-base xs:text-lg font-bold text-gray-900">ID Card Preview - {selectedMember.name}</h3>
              <button
                onClick={() => setSelectedMember(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes className="w-4 h-4 xs:w-6 xs:h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 xs:grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-6">
              {/* ID Card Preview */}
              <div>
                <h4 className="text-md font-semibold text-gray-800 mb-3">ID Card Preview</h4>
                <div className="border-2 border-gray-300 rounded-lg p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
                  {/* Display actual generated ID card */}
                  <div className="relative">
                    {selectedMember.id_card_url ? (
                      <img 
                        src={selectedMember.id_card_url.startsWith('http') 
                          ? selectedMember.id_card_url 
                          : selectedMember.id_card_url.startsWith('/static/')
                            ? `http://localhost:8000${selectedMember.id_card_url}`
                            : `${API_BASE_URL}${selectedMember.id_card_url}`
                        } 
                        alt={`ID Card for ${selectedMember.name}`}
                        className="w-full h-auto rounded-lg shadow-lg"
                        onError={(e) => {
                          console.error('Failed to load ID card:', selectedMember.id_card_url);
                          e.target.style.display = 'none';
                          const fallback = e.target.parentElement.querySelector('.fallback-preview');
                          if (fallback) fallback.style.display = 'block';
                        }}
                        onLoad={() => {
                          console.log('Successfully loaded ID card for:', selectedMember.name);
                        }}
                      />
                    ) : (
                      <div className="fallback-preview">
                        <p className="text-center text-gray-600 mb-4">ID Card not generated yet</p>
                        <button
                          onClick={() => handleRegenerateIdCard(selectedMember)}
                          className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        >
                          <FaIdCard className="mr-2" />
                          Generate ID Card
                        </button>
                      </div>
                    )}
                    <div className="fallback-preview" style={{ display: 'none' }}>
                      <p className="text-center text-red-600 mb-4">Failed to load ID card</p>
                      <button
                        onClick={() => handleRegenerateIdCard(selectedMember)}
                        className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        <FaIdCard className="mr-2" />
                        Regenerate ID Card
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div>
                <h4 className="text-md font-semibold text-gray-800 mb-3">Actions</h4>
                <div className="space-y-3">
                  <button
                    onClick={() => handleDownloadIdCard(selectedMember)}
                    className="w-full flex items-center justify-center px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    <FaDownload className="mr-2" />
                    Download ID Card
                  </button>
                  <button
                    onClick={() => handleRegenerateIdCard(selectedMember)}
                    className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <FaIdCard className="mr-2" />
                    Regenerate ID Card
                  </button>
                  <button
                    onClick={() => handleSendWhatsApp(selectedMember.id)}
                    className="w-full flex items-center justify-center px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    <FaWhatsapp className="mr-2" />
                    Send WhatsApp with ID Card
                  </button>
                  <button
                    onClick={() => {
                      setSelectedMember(null);
                      handleViewDetails(selectedMember.id);
                    }}
                    className="w-full flex items-center justify-center px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                  >
                    <FaEye className="mr-2" />
                    View Full Member Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default MemberDashboardNew;
