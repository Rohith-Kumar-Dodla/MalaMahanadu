import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { FaUsers, FaHandHoldingHeart, FaExclamationTriangle, FaSignOutAlt, FaBars, FaTimes, FaHome } from 'react-icons/fa';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FaHome, path: '/admin/dashboard' },
    { id: 'members', label: 'Members', icon: FaUsers, path: '/admin/members' },
    { id: 'donations', label: 'Donations', icon: FaHandHoldingHeart, path: '/admin/donations' },
    { id: 'complaints', label: 'Complaints', icon: FaExclamationTriangle, path: '/admin/complaints' }
  ];

  useEffect(() => {
    // Set active tab based on current path
    const currentPath = location.pathname;
    const activeItem = menuItems.find(item => item.path === currentPath);
    if (activeItem) {
      setActiveTab(activeItem.id);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    window.location.href = '/admin/login';
  };

  const handleNavigation = (itemId, path) => {
    setActiveTab(itemId);
    window.location.href = path;
  };

  return (
    <div className="min-h-screen bg-accent-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-primary-900 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-4 bg-primary-800">
          <h2 className="text-xl font-bold text-white">Admin Panel</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:text-gold-500"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="mt-8">
          <div className="px-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id, item.path)}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-gold-500 text-primary-900'
                      : 'text-white hover:bg-primary-800 hover:text-gold-500'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              <FaSignOutAlt className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Top Bar */}
        <div className="bg-primary-900 shadow-lg lg:hidden">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-white hover:text-gold-500"
            >
              <FaBars className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-white">Mala Mahanadu Admin</h1>
            <div className="w-8"></div>
          </div>
        </div>

        {/* Page Content */}
        <Outlet />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
