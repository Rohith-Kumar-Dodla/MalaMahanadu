import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Key Persons', href: '/key-persons' },
    { name: 'District Presidents', href: '/district-presidents' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'News & Posts', href: '/posts' },
    { name: 'Contact', href: '/contact' },
    { name: 'Complaints', href: '/complaints' },
    { name: 'Donations', href: '/donations' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Sitemap', href: '/sitemap.xml' },
  ];

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="container mx-auto px-4 py-6 xs:py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-6 sm:gap-8">
          {/* Organization Info */}
          <div className="space-y-3 xs:space-y-4">
            <div className="flex items-center space-x-2 xs:space-x-3">
              <img 
                src="/assets/logo.png" 
                alt="Mala Mahanadu Logo" 
                className="h-8 w-8 xs:h-10 xs:w-10 sm:h-12 sm:w-12 rounded-full"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiNGRkYiLz4KPHRleHQgeD0iMjQiIHk9IjI5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBjbGFzcz0iZm9udCIgc3R5bGU9ImZvbnQtc2l6ZTogMTRweDsgZmlsbDogIzAwMDsiPk1NPC90ZXh0Pgo8L3N2Zz4K';
                }}
              />
              <div>
                <h3 className="font-bold text-base xs:text-lg sm:text-xl">Mala Mahanadu</h3>
                <p className="text-secondary-400 text-xs xs:text-sm sm:text-sm">Empowering Communities</p>
              </div>
            </div>
            <p className="text-secondary-300 text-xs xs:text-sm sm:text-sm leading-relaxed">
              Dedicated to the welfare and empowerment of the Mala community through education, 
              social justice, and economic development initiatives.
            </p>
            <div className="flex space-x-2 xs:space-x-3 sm:space-x-4">
              <a 
                href="https://facebook.com/malamahanadu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-secondary-400 hover:text-white transition-colors p-1 xs:p-1.5 sm:p-0"
                aria-label="Facebook"
              >
                <FaFacebook className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5" />
              </a>
              <a 
                href="https://twitter.com/malamahanadu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-secondary-400 hover:text-white transition-colors p-1 xs:p-1.5 sm:p-0"
                aria-label="Twitter"
              >
                <FaTwitter className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5" />
              </a>
              <a 
                href="https://instagram.com/malamahanadu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-secondary-400 hover:text-white transition-colors p-1 xs:p-1.5 sm:p-0"
                aria-label="Instagram"
              >
                <FaInstagram className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5" />
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-secondary-400 hover:text-white transition-colors p-1 xs:p-1.5 sm:p-0"
                aria-label="YouTube"
              >
                <FaYoutube className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm xs:text-base sm:text-lg mb-2 xs:mb-3 sm:mb-4">Quick Links</h4>
            <ul className="space-y-1 xs:space-y-1.5 sm:space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-secondary-300 hover:text-white transition-colors text-xs xs:text-sm sm:text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-sm xs:text-base sm:text-lg mb-2 xs:mb-3 sm:mb-4">Contact Info</h4>
            <div className="space-y-2 xs:space-y-2 sm:space-y-3">
              <div className="flex items-start space-x-2 xs:space-x-2 sm:space-x-3">
                <FaPhone className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 text-primary-500 mt-0.5 xs:mt-0.5 sm:mt-1 flex-shrink-0" />
                <div>
                  <p className="text-secondary-300 text-xs xs:text-sm sm:text-sm">Phone</p>
                  <p className="text-white text-xs xs:text-sm sm:text-sm">+91 63039 77720</p>
                </div>
              </div>
              <div className="flex items-start space-x-2 xs:space-x-2 sm:space-x-3">
                <FaEnvelope className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 text-primary-500 mt-0.5 xs:mt-0.5 sm:mt-1 flex-shrink-0" />
                <div>
                  <p className="text-secondary-300 text-xs xs:text-sm sm:text-sm">Email</p>
                  <p className="text-white text-xs xs:text-sm sm:text-sm break-all">info@malamahanadu.org</p>
                </div>
              </div>
              <div className="flex items-start space-x-2 xs:space-x-2 sm:space-x-3">
                <FaMapMarkerAlt className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 text-primary-500 mt-0.5 xs:mt-0.5 sm:mt-1 flex-shrink-0" />
                <div>
                  <p className="text-secondary-300 text-xs xs:text-sm sm:text-sm">Address</p>
                  <p className="text-white text-xs xs:text-sm sm:text-sm">8-2-682-32/125, Road No. 13,</p>
                  <p className="text-white text-xs xs:text-sm sm:text-sm">Opp: Ministers Quarters, Banjara Hills,</p>
                  <p className="text-white text-xs xs:text-sm sm:text-sm">Hyderabad – 500034</p>
                </div>
              </div>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-sm xs:text-base sm:text-lg mb-2 xs:mb-3 sm:mb-4">Legal</h4>
            <ul className="space-y-1 xs:space-y-1.5 sm:space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-secondary-300 hover:text-white transition-colors text-xs xs:text-sm sm:text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-4 xs:mt-6 sm:mt-8 pt-4 xs:pt-6 sm:pt-8 border-t border-secondary-800">
          <div className="flex flex-col xs:flex-col sm:flex-row justify-between items-center space-y-2 xs:space-y-2 sm:space-y-0">
            <p className="text-secondary-400 text-xs xs:text-sm sm:text-sm text-center xs:text-center sm:text-left">
              {currentYear} Mala Mahanadu. All rights reserved.
            </p>
            <p className="text-secondary-400 text-xs xs:text-sm sm:text-sm text-center xs:text-center sm:text-right">
              Designed and developed with for community service
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
