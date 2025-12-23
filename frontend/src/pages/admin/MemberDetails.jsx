import React, { useState, useEffect } from 'react';
import SeoHead from '../../components/SeoHead';
import { FaArrowLeft, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaIdCard, FaCalendarAlt, FaVenusMars, FaSpinner, FaDownload, FaEdit } from 'react-icons/fa';

const MemberDetails = () => {
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    // Get member ID from URL - could be numeric or membership_id
    const pathParts = window.location.pathname.split('/');
    const memberId = pathParts[pathParts.length - 1];
    
    // Check if admin is logged in
    const token = localStorage.getItem('adminToken');
    if (!token) {
      window.location.href = '/admin/login';
      return;
    }

    fetchMemberDetails(memberId);
  }, []);

  const fetchMemberDetails = async (memberId) => {
    setLoading(true);
    try {
      // Try both numeric ID and membership ID
      let response;
      
      // First try as membership_id (MMN-2025-000001 format)
      response = await fetch(`/api/membership/${memberId}`);
      
      // If that fails, try as numeric ID
      if (!response.ok) {
        response = await fetch(`/api/membership/?id=${memberId}`);
      }
      
      if (response.ok) {
        const data = await response.json();
        // If we got an array, take the first element
        const member = Array.isArray(data) ? data[0] : data;
        setMember(member);
        console.log('Fetched member details:', member);
      } else {
        console.error('Failed to fetch member details');
        // For demo, show sample data
        setMember({
          id: memberId,
          membership_id: 'MMN-2025-000001',
          name: 'Rama Rao',
          father_name: 'Lakshmana Rao',
          gender: 'Male',
          dob: '1990-01-15',
          caste: 'Mala',
          phone: '9876543210',
          email: 'rama@example.com',
          state: 'Telangana',
          district: 'Hyderabad',
          mandal: 'Secunderabad',
          village: 'Hyderabad',
          address: 'H.No. 123, Main Street, Hyderabad, Telangana - 500001',
          status: 'pending',
          photo_url: '/static/photos/photo_001.jpg',
          id_card_url: '/static/idcards/ID_MMN_2025_000001.png',
          created_at: '2025-01-01T10:00:00Z'
        });
      }
    } catch (error) {
      console.error('Error fetching member details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadIdCard = async () => {
    if (!member?.id_card_url) return;
    
    setActionLoading(true);
    try {
      // Use proper URL construction for ID card download
      const idCardUrl = member.id_card_url.startsWith('http') 
        ? member.id_card_url 
        : member.id_card_url.startsWith('/static/')
          ? `http://localhost:8000${member.id_card_url}`
          : member.id_card_url;
          
      const response = await fetch(idCardUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ID_${member.membership_id}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download ID card');
    } finally {
      setActionLoading(false);
    }
  };

  const handleResendEmail = async () => {
    if (!member) return;
    
    setActionLoading(true);
    try {
      const response = await fetch(`/api/membership/resend-email/${member.id}`, {
        method: 'POST'
      });
      
      if (response.ok) {
        alert(`Email sent successfully to ${member.email}`);
      } else {
        alert('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending email');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRegenerateIdCard = async () => {
    if (!member) return;
    
    setActionLoading(true);
    try {
      const response = await fetch(`/api/membership/${member.id}/regenerate-idcard`, {
        method: 'POST'
      });
      
      if (response.ok) {
        const data = await response.json();
        alert('ID card regenerated successfully');
        // Update member with new ID card URL
        setMember(prev => ({
          ...prev,
          id_card_url: data.id_card_url
        }));
      } else {
        alert('Failed to regenerate ID card');
      }
    } catch (error) {
      console.error('Error regenerating ID card:', error);
      alert('Error regenerating ID card');
    } finally {
      setActionLoading(false);
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-accent-50 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="h-8 w-8 animate-spin text-primary-900 mx-auto mb-4" />
          <p className="text-gray-600">Loading member details...</p>
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-accent-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Member not found</p>
          <button
            onClick={handleGoBack}
            className="mt-4 text-primary-900 hover:text-gold-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SeoHead 
        title={`Member Details - ${member.name} - Mala Mahanadu`}
        description={`View details for ${member.name}, member of Mala Mahanadu`}
        keywords="member details, Mala Mahanadu, membership information"
      />
      
      <div className="min-h-screen bg-accent-50">
        {/* Header */}
        <div className="bg-primary-900 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 space-y-3 sm:space-y-0">
              <div className="flex items-center w-full sm:w-auto">
                <button
                  onClick={handleGoBack}
                  className="flex items-center text-white hover:text-gold-500 transition-colors mr-4"
                >
                  <FaArrowLeft className="mr-2" />
                  Back
                </button>
                <h1 className="text-xl sm:text-2xl font-bold text-white">Member Details</h1>
              </div>
              <div className="flex space-x-2 w-full sm:w-auto">
                <button
                  onClick={handleRegenerateIdCard}
                  disabled={actionLoading}
                  className="flex items-center justify-center px-3 sm:px-4 py-2 bg-gold-500 hover:bg-gold-600 text-primary-900 rounded-lg transition-colors disabled:bg-gray-400 text-sm sm:text-base"
                >
                  <FaEdit className="mr-2" />
                  <span className="hidden sm:inline">Regenerate ID</span>
                  <span className="sm:hidden">Regen</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
            {/* Left Column - Photo and Basic Info */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-6">
                <div className="text-center">
                  {member.photo_url ? (
                    <img
                      src={member.photo_url}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-gold-500"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <FaUser className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                  
                  <h2 className="text-2xl font-bold text-primary-900 mb-2">{member.name}</h2>
                  <p className="text-lg text-gold-600 font-semibold mb-4">{member.membership_id}</p>
                  
                  <div className="space-y-2 text-left">
                    <div className="flex items-center justify-center text-sm text-gray-600">
                      <FaVenusMars className="mr-2 text-gold-500" />
                      {member.gender}
                    </div>
                    <div className="flex items-center justify-center text-sm text-gray-600">
                      <FaCalendarAlt className="mr-2 text-gold-500" />
                      {new Date(member.dob).toLocaleDateString()}
                    </div>
                    <div className="flex items-center justify-center text-sm text-gray-600">
                      <FaMapMarkerAlt className="mr-2 text-gold-500" />
                      {member.village}, {member.district}
                    </div>
                  </div>
                </div>
              </div>

              {/* ID Card Preview */}
              {member.id_card_url && (
                <div className="bg-white rounded-lg shadow border border-gray-200 p-4 sm:p-6">
                  <h3 className="text-lg font-semibold text-primary-900 mb-4">ID Card Preview</h3>
                  <div className="relative w-full">
                    <img
                      src={member.id_card_url.startsWith('http') 
                        ? member.id_card_url 
                        : member.id_card_url.startsWith('/static/')
                          ? `http://localhost:8000${member.id_card_url}`
                          : member.id_card_url
                      }
                      alt="ID Card"
                      className="w-full h-auto rounded-lg border border-gray-300 mb-4"
                      onError={(e) => {
                        console.error('Failed to load ID card:', member.id_card_url);
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                      onLoad={() => {
                        console.log('Successfully loaded ID card for:', member.name);
                      }}
                    />
                    <div className="w-full bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center p-8" style={{ display: 'none' }}>
                      <div className="text-center">
                        <FaIdCard className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">Failed to load ID Card</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleDownloadIdCard}
                    disabled={actionLoading}
                    className="w-full flex items-center justify-center px-4 py-2 bg-gold-500 hover:bg-gold-600 text-primary-900 rounded-lg transition-colors disabled:bg-gray-400 text-sm sm:text-base"
                  >
                    <FaDownload className="mr-2" />
                    <span className="hidden sm:inline">Download ID Card</span>
                    <span className="sm:hidden">Download</span>
                  </button>
                </div>
              )}
            </div>

            {/* Right Column - Detailed Information */}
            <div className="lg:col-span-2">
              {/* Personal Information */}
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-6">
                <h3 className="text-xl font-semibold text-primary-900 mb-6 flex items-center">
                  <FaUser className="mr-2 text-gold-500" />
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Full Name</p>
                    <p className="font-medium text-gray-900">{member.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Father's/Husband's Name</p>
                    <p className="font-medium text-gray-900">{member.father_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Gender</p>
                    <p className="font-medium text-gray-900">{member.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Date of Birth</p>
                    <p className="font-medium text-gray-900">{new Date(member.dob).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Caste</p>
                    <p className="font-medium text-gray-900">{member.caste}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Registration Date</p>
                    <p className="font-medium text-gray-900">{new Date(member.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-6">
                <h3 className="text-xl font-semibold text-primary-900 mb-6 flex items-center">
                  <FaPhone className="mr-2 text-gold-500" />
                  Contact Information
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Phone Number</p>
                    <p className="font-medium text-gray-900">{member.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Email Address</p>
                    <p className="font-medium text-gray-900 break-all text-sm">{member.email}</p>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-6">
                <h3 className="text-xl font-semibold text-primary-900 mb-6 flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-gold-500" />
                  Address Information
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">State</p>
                    <p className="font-medium text-gray-900">{member.state}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">District</p>
                    <p className="font-medium text-gray-900">{member.district}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Mandal</p>
                    <p className="font-medium text-gray-900">{member.mandal}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Village</p>
                    <p className="font-medium text-gray-900">{member.village}</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <p className="text-sm text-gray-600 mb-1">Full Address</p>
                  <p className="font-medium text-gray-900">{member.address}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-primary-900 mb-6">Actions</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={handleDownloadIdCard}
                    disabled={actionLoading}
                    className="flex items-center justify-center px-4 py-3 bg-gold-500 hover:bg-gold-600 text-primary-900 rounded-lg transition-colors disabled:bg-gray-400 text-sm sm:text-base"
                  >
                    <FaDownload className="mr-2" />
                    <span className="hidden sm:inline">Download ID Card</span>
                    <span className="sm:hidden">Download</span>
                  </button>
                  <button
                    onClick={handleResendEmail}
                    disabled={actionLoading}
                    className="flex items-center justify-center px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors disabled:bg-gray-400 text-sm sm:text-base"
                  >
                    <FaEnvelope className="mr-2" />
                    <span className="hidden sm:inline">Resend Email</span>
                    <span className="sm:hidden">Email</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberDetails;
