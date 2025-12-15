import React, { useState, useEffect } from 'react';
import SeoHead from '../../components/SeoHead';
import { FaExclamationTriangle, FaSearch, FaFilter, FaEdit, FaEye, FaCheckCircle, FaClock, FaSpinner, FaFileDownload, FaTimesCircle } from 'react-icons/fa';
import { getComplaints, getComplaintStats, getComplaintTypes, updateComplaint } from '../../api/api';

const ComplaintsManagement = () => {
  const [complaints, setComplaints] = useState([]);
  const [stats, setStats] = useState(null);
  const [complaintTypes, setComplaintTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('complaints');

  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem('adminToken');
    if (!token) {
      window.location.href = '/admin/login';
      return;
    }

    fetchComplaints();
    fetchStats();
    fetchComplaintTypes();
  }, [currentPage, statusFilter, typeFilter]);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const params = {
        skip: (currentPage - 1) * 10,
        limit: 10,
      };
      
      if (statusFilter !== 'all') {
        params.status = statusFilter;
      }
      
      if (typeFilter !== 'all') {
        params.complaint_type = typeFilter;
      }

      const data = await getComplaints(params);
      setComplaints(data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
      // For demo, show sample data
      setComplaints([
        {
          id: 1,
          name: 'Rama Rao',
          email: 'rama@example.com',
          phone: '9876543210',
          address: 'Hyderabad, Telangana',
          complaint_type: 'Educational Issues',
          subject: 'Scholarship Problem',
          description: 'Facing issues with scholarship application...',
          reference_id: 'MMN-CMP-20250115-ABC12345',
          status: 'pending',
          created_at: '2025-01-15T10:30:00Z'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await getComplaintStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Demo stats
      setStats({
        total_complaints: 89,
        pending_complaints: 23,
        in_progress_complaints: 31,
        resolved_complaints: 28,
        closed_complaints: 7
      });
    }
  };

  const fetchComplaintTypes = async () => {
    try {
      const data = await getComplaintTypes();
      setComplaintTypes(data);
    } catch (error) {
      console.error('Error fetching complaint types:', error);
      // Demo types
      setComplaintTypes([
        'Educational Issues',
        'Employment Problems',
        'Healthcare Access',
        'Housing Issues',
        'Legal Assistance',
        'Social Discrimination',
        'Infrastructure',
        'Other'
      ]);
    }
  };

  const handleStatusUpdate = async (complaintId, newStatus) => {
    setActionLoading(true);
    try {
      await updateComplaint(complaintId, { status: newStatus });
      await fetchComplaints();
      await fetchStats();
    } catch (error) {
      console.error('Error updating complaint status:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const filteredComplaints = complaints.filter(complaint =>
    complaint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.reference_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: FaClock },
      in_progress: { bg: 'bg-blue-100', text: 'text-blue-800', icon: FaEye },
      resolved: { bg: 'bg-green-100', text: 'text-green-800', icon: FaCheckCircle },
      closed: { bg: 'bg-gray-100', text: 'text-gray-800', icon: FaTimesCircle }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <Icon className="w-3 h-3 mr-1" />
        {status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
      </span>
    );
  };

  if (loading && complaints.length === 0) {
    return (
      <div className="min-h-screen bg-accent-50 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="h-8 w-8 animate-spin text-primary-900 mx-auto mb-4" />
          <p className="text-gray-600">Loading complaints...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SeoHead 
        title="Complaints Management - Mala Mahanadu"
        description="Manage and track complaints for Mala Mahanadu organization"
        keywords="complaints, management, Mala Mahanadu, admin"
      />
      
      <div className="min-h-screen bg-accent-50">
        {/* Header */}
        <div className="bg-primary-900 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 sm:py-6 gap-4">
              <div className="flex items-center">
                <FaExclamationTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-gold-500 mr-3" />
                <h1 className="text-xl sm:text-2xl font-bold text-white">Complaints Management</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6">
              <div className="bg-white rounded-lg shadow border border-gray-200 p-3 sm:p-6">
                <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">Total Complaints</h3>
                <p className="text-lg sm:text-2xl font-bold text-primary-900">{stats.total_complaints}</p>
              </div>
              <div className="bg-white rounded-lg shadow border border-gray-200 p-3 sm:p-6">
                <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">Pending</h3>
                <p className="text-lg sm:text-2xl font-bold text-yellow-600">{stats.pending_complaints}</p>
              </div>
              <div className="bg-white rounded-lg shadow border border-gray-200 p-3 sm:p-6">
                <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">In Progress</h3>
                <p className="text-lg sm:text-2xl font-bold text-blue-600">{stats.in_progress_complaints}</p>
              </div>
              <div className="bg-white rounded-lg shadow border border-gray-200 p-3 sm:p-6">
                <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">Resolved</h3>
                <p className="text-lg sm:text-2xl font-bold text-green-600">{stats.resolved_complaints}</p>
              </div>
              <div className="bg-white rounded-lg shadow border border-gray-200 p-3 sm:p-6">
                <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">Closed</h3>
                <p className="text-lg sm:text-2xl font-bold text-gray-600">{stats.closed_complaints}</p>
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
                  placeholder="Search by name, email, reference ID, or subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <div className="flex items-center">
                  <FaFilter className="text-gray-400 mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm focus:ring-2 focus:ring-gold-500 focus:border-transparent min-w-32"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm focus:ring-2 focus:ring-gold-500 focus:border-transparent min-w-32"
                  >
                    <option value="all">All Types</option>
                    {complaintTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Complaints Table */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Complainant Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reference ID
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
                  {filteredComplaints.map((complaint) => (
                    <tr key={complaint.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{complaint.name}</div>
                          <div className="text-sm text-gray-500">{complaint.email}</div>
                          <div className="text-sm text-gray-500">{complaint.phone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{complaint.complaint_type}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate" title={complaint.subject}>
                          {complaint.subject}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-mono text-gray-900">{complaint.reference_id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(complaint.created_at).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(complaint.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {complaint.status === 'pending' && (
                            <button
                              onClick={() => handleStatusUpdate(complaint.id, 'in_progress')}
                              disabled={actionLoading}
                              className="text-blue-600 hover:text-blue-900 disabled:text-gray-400"
                              title="Mark as In Progress"
                            >
                              <FaEye className="w-4 h-4" />
                            </button>
                          )}
                          {complaint.status === 'in_progress' && (
                            <button
                              onClick={() => handleStatusUpdate(complaint.id, 'resolved')}
                              disabled={actionLoading}
                              className="text-green-600 hover:text-green-900 disabled:text-gray-400"
                              title="Mark as Resolved"
                            >
                              <FaCheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          {(complaint.status === 'resolved' || complaint.status === 'in_progress') && (
                            <button
                              onClick={() => handleStatusUpdate(complaint.id, 'closed')}
                              disabled={actionLoading}
                              className="text-gray-600 hover:text-gray-900 disabled:text-gray-400"
                              title="Close Complaint"
                            >
                              <FaTimesCircle className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setSelectedComplaint(complaint);
                              setShowModal(true);
                            }}
                            className="text-gray-600 hover:text-gray-900"
                            title="View Details"
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
              {filteredComplaints.map((complaint) => (
                <div key={complaint.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-900">{complaint.name}</h3>
                      <p className="text-xs text-gray-500">{complaint.email}</p>
                      <p className="text-xs text-gray-500">{complaint.phone}</p>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(complaint.status)}
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm mb-3">
                    <div className="flex items-start">
                      <span className="text-gray-500 w-16 text-xs">Type:</span>
                      <span className="text-gray-900 text-xs">{complaint.complaint_type}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-gray-500 w-16 text-xs">Subject:</span>
                      <span className="text-gray-900 text-xs line-clamp-2">
                        {complaint.subject}
                      </span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-gray-500 w-16 text-xs">Ref ID:</span>
                      <span className="text-gray-900 text-xs font-mono break-all">
                        {complaint.reference_id}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-500 w-16 text-xs">Date:</span>
                      <span className="text-gray-900 text-xs">
                        {new Date(complaint.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <div className="flex space-x-2">
                      {complaint.status === 'pending' && (
                        <button
                          onClick={() => handleStatusUpdate(complaint.id, 'in_progress')}
                          disabled={actionLoading}
                          className="text-blue-600 hover:text-blue-900 disabled:text-gray-400 p-2"
                          title="Mark as In Progress"
                        >
                          <FaEye className="w-4 h-4" />
                        </button>
                      )}
                      {complaint.status === 'in_progress' && (
                        <button
                          onClick={() => handleStatusUpdate(complaint.id, 'resolved')}
                          disabled={actionLoading}
                          className="text-green-600 hover:text-green-900 disabled:text-gray-400 p-2"
                          title="Mark as Resolved"
                        >
                          <FaCheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      {(complaint.status === 'resolved' || complaint.status === 'in_progress') && (
                        <button
                          onClick={() => handleStatusUpdate(complaint.id, 'closed')}
                          disabled={actionLoading}
                          className="text-gray-600 hover:text-gray-900 disabled:text-gray-400 p-2"
                          title="Close Complaint"
                        >
                          <FaTimesCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setSelectedComplaint(complaint);
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
            
            {filteredComplaints.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No complaints found</p>
              </div>
            )}
          </div>
        </div>

        {/* Detail Modal */}
        {showModal && selectedComplaint && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">Complaint Details</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimesCircle className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">{selectedComplaint.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Reference ID</p>
                    <p className="font-medium font-mono">{selectedComplaint.reference_id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{selectedComplaint.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{selectedComplaint.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Complaint Type</p>
                    <p className="font-medium">{selectedComplaint.complaint_type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <div>{getStatusBadge(selectedComplaint.status)}</div>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-medium">{selectedComplaint.address}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Subject</p>
                  <p className="font-medium">{selectedComplaint.subject}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Description</p>
                  <p className="font-medium text-gray-700 bg-gray-50 p-3 rounded">
                    {selectedComplaint.description}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Submitted On</p>
                  <p className="font-medium">
                    {new Date(selectedComplaint.created_at).toLocaleString()}
                  </p>
                </div>
                
                {selectedComplaint.file_name && (
                  <div>
                    <p className="text-sm text-gray-600">Attached File</p>
                    <button className="flex items-center text-blue-600 hover:text-blue-800">
                      <FaFileDownload className="w-4 h-4 mr-2" />
                      {selectedComplaint.file_name}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ComplaintsManagement;
