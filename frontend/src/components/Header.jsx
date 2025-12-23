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

          {/* Desktop Navigation - Hidden on tablet, shown on laptop and larger */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-1 px-2 lg:px-3 py-2 rounded-md text-sm lg:text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-primary-700 text-white'
                    : 'text-primary-100 hover:bg-primary-700 hover:text-white'
                }`}
              >
                <item.icon className="h-4 w-4 lg:h-5 lg:w-5" />
                <span className="hidden lg:block">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Tablet Navigation - Simplified version */}
          <nav className="hidden md:flex lg:hidden items-center space-x-1">
            {navigation.slice(0, 6).map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-1 px-1 md:px-2 py-2 rounded-md text-xs font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-primary-700 text-white'
                    : 'text-primary-100 hover:bg-primary-700 hover:text-white'
                }`}
              >
                <item.icon className="h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden md:block">{item.name}</span>
              </Link>
            ))}
            {/* More items dropdown for tablet */}
            <div className="relative group">
              <button className="flex items-center space-x-1 px-2 py-2 rounded-md text-xs font-medium text-primary-100 hover:bg-primary-700 hover:text-white transition-colors">
                <span>More</span>
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full right-0 mt-1 w-48 bg-primary-600 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {navigation.slice(6).map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-primary-700 text-white'
                        : 'text-primary-100 hover:bg-primary-700 hover:text-white'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Mobile menu button - Show on mobile and tablet */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-primary-100 hover:bg-primary-700 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes className="h-4 w-4 xs:h-5 xs:w-5 sm:h-5 sm:w-5" /> : <FaBars className="h-4 w-4 xs:h-5 xs:w-5 sm:h-5 sm:w-5" />}
          </button>
        </div>

        {/* Mobile & Tablet Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-3 xs:py-4 sm:py-4 border-t border-primary-700">
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
