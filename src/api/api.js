// Real API calls to backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Donations API
export const createDonation = async (donationData) => {
  const formData = new FormData();
  
  Object.keys(donationData).forEach(key => {
    if (key !== 'file') {
      formData.append(key, donationData[key]);
    }
  });

  return apiCall('/api/donations/', {
    method: 'POST',
    body: formData,
    headers: {}, // Let browser set Content-Type for FormData
  });
};

export const getDonations = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  return apiCall(`/api/donations/?${queryString}`);
};

export const getDonation = async (id) => {
  return apiCall(`/api/donations/${id}`);
};

export const updateDonation = async (id, updateData) => {
  return apiCall(`/api/donations/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updateData),
  });
};

export const deleteDonation = async (id) => {
  return apiCall(`/api/donations/${id}`, {
    method: 'DELETE',
  });
};

export const getDonationStats = async () => {
  return apiCall('/api/donations/stats/summary');
};

// Complaints API
export const createComplaint = async (complaintData) => {
  const formData = new FormData();
  
  Object.keys(complaintData).forEach(key => {
    if (key !== 'file' && complaintData[key] !== null) {
      formData.append(key, complaintData[key]);
    }
  });

  if (complaintData.file) {
    formData.append('file', complaintData.file);
  }

  return apiCall('/api/complaints/', {
    method: 'POST',
    body: formData,
    headers: {}, // Let browser set Content-Type for FormData
  });
};

export const getComplaints = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  return apiCall(`/api/complaints/?${queryString}`);
};

export const getComplaint = async (id) => {
  return apiCall(`/api/complaints/${id}`);
};

export const updateComplaint = async (id, updateData) => {
  return apiCall(`/api/complaints/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updateData),
  });
};

export const deleteComplaint = async (id) => {
  return apiCall(`/api/complaints/${id}`, {
    method: 'DELETE',
  });
};

export const getComplaintStats = async () => {
  return apiCall('/api/complaints/stats/summary');
};

export const getComplaintTypes = async () => {
  return apiCall('/api/complaints/types/list');
};

// Members API
export const getMembers = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  return apiCall(`/api/membership/?${queryString}`);
};

export const getMemberStats = async () => {
  return apiCall('/api/membership/stats/summary');
};

export const updateMemberStatus = async (memberId, status) => {
  return apiCall(`/api/membership/${memberId}/status?status=${status}`, {
    method: 'PATCH',
  });
};
