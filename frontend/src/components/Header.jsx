import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaInfoCircle, FaUsers, FaMapMarkerAlt, FaImages, FaNewspaper, FaPhone, FaExclamationTriangle, FaHandHoldingHeart, FaFacebook, FaTwitter, FaInstagram, FaUserFriends, FaUserShield } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: FaHome },
    { name: 'About', href: '/about', icon: FaInfoCircle },
    { name: 'Key Persons', href: '/key-persons', icon: FaUsers },
    { name: 'District Persons', href: '/district-persons', icon: FaMapMarkerAlt },
    { name: 'Donations', href: '/donations', icon: FaHandHoldingHeart },
    { name: 'Complaints', href: '/complaints', icon: FaExclamationTriangle },
    { name: 'Gallery', href: '/gallery', icon: FaImages },
    { name: 'Membership', href: '/membership', icon: FaUserFriends },
    { name: 'Admin Login', href: '/admin/login', icon: FaUserShield },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-primary-600 text-white shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 xs:h-16 sm:h-16 md:h-16 lg:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 xs:space-x-3 sm:space-x-3">
            <img 
              src="/assets/logo.png" 
              alt="Mala Mahanadu Logo" 
              className="h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 lg:h-12 lg:w-12 rounded-full"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNGRkYiLz4KPHRleHQgeD0iMjAiIHk9IjI1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBjbGFzcz0iZm9udCIgc3R5bGU9ImZvbnQtc2l6ZTogMTJweDsgZmlsbDogIzAwMDsiPk1NPC90ZXh0Pgo8L3N2Zz4K';
              }}
            />
            <span className="font-bold text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl">Mala Mahanadu</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 xl:space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-1 px-1 md:px-2 lg:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-primary-700 text-white'
                    : 'text-primary-100 hover:bg-primary-700 hover:text-white'
                }`}
              >
                <item.icon className="h-3 w-3 xs:h-4 xs:w-4 sm:h-4 sm:w-4" />
                <span className="hidden lg:block">{item.name}</span>
                <span className="md:hidden lg:block text-xs">{item.name.length > 8 ? item.name.split(' ')[0] : item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-primary-100 hover:bg-primary-700 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes className="h-4 w-4 xs:h-5 xs:w-5 sm:h-5 sm:w-5" /> : <FaBars className="h-4 w-4 xs:h-5 xs:w-5 sm:h-5 sm:w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-3 xs:py-4 sm:py-4 border-t border-primary-700">
            <div className="grid grid-cols-1 gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-primary-700 text-white'
                      : 'text-primary-100 hover:bg-primary-700 hover:text-white'
                  }`}
                >
                  <item.icon className="h-4 w-4 xs:h-5 xs:w-5 flex-shrink-0" />
                  <span className="text-xs xs:text-sm">{item.name}</span>
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
