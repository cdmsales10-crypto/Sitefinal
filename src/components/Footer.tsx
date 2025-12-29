import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white overflow-x-hidden">
      <div className="container mx-auto px-3 sm:px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <img src="/cmdlogo.svg" alt="CDM Logo" className="w-20 md:w-40 h-10 md:h-20" />
            </Link>
            <p className="text-gray-400 text-xs md:text-sm mb-4 font-montserrat font-semibold leading-relaxed">
              Your trusted partner for professional car detailing supplies. Serving professionals and enthusiasts across India.
            </p>
          </div>

          <div>
            <h4 className="text-white font-anton text-base md:text-lg mb-3 md:mb-4">Quick Links</h4>
            <ul className="space-y-2 font-montserrat font-semibold">
              <li>
                <Link to="/" className="text-gray-400 hover:text-yellow-400 transition-colors text-xs md:text-sm py-1 block min-h-9 flex items-center">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-yellow-400 transition-colors text-xs md:text-sm py-1 block min-h-9 flex items-center">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-yellow-400 transition-colors text-xs md:text-sm py-1 block min-h-9 flex items-center">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/process" className="text-gray-400 hover:text-yellow-400 transition-colors text-xs md:text-sm py-1 block min-h-9 flex items-center">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-gray-400 hover:text-yellow-400 transition-colors text-xs md:text-sm py-1 block min-h-9 flex items-center">
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-anton text-base md:text-lg mb-3 md:mb-4">Contact Info</h4>
            <ul className="space-y-2 md:space-y-3 font-montserrat font-semibold">
              <li>
                <a href="tel:9000805105" className="flex items-start space-x-2 text-gray-400 hover:text-yellow-400 transition-colors text-xs md:text-sm py-1 min-h-9 flex items-center">
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>9000805105</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@cdmonline.in" className="flex items-start space-x-2 text-gray-400 hover:text-yellow-400 transition-colors text-xs md:text-sm py-1 min-h-9 flex items-center">
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>info@cdmonline.in</span>
                </a>
              </li>
              <li>
                <div className="flex items-start space-x-2 text-gray-400 text-xs md:text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>
                    CDM (Car Detailing Mart)<br />
                    Opposite MGBS<br />
                    Hyderabad, Telangana-500024
                  </span>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-anton text-base md:text-lg mb-3 md:mb-4">Follow Us</h4>
            <div className="flex space-x-3 md:space-x-4 mb-4 md:mb-6">
              <a href="#" className="bg-yellow-400 p-2.5 md:p-2 rounded-lg hover:bg-red-600 hover:scale-105 transition-colors min-h-11 min-w-11 flex items-center justify-center" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-yellow-400 p-2.5 md:p-2 rounded-lg hover:bg-red-600 hover:scale-105 transition-colors min-h-11 min-w-11 flex items-center justify-center" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/" aria-label="YouTube" className="bg-yellow-400 p-2.5 md:p-2 rounded-lg hover:bg-red-600 hover:scale-105 transition-colors min-h-11 min-w-11 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
                  <path d="M23.498 6.186a2.99 2.99 0 0 0-2.107-2.12C19.44 3.5 12 3.5 12 3.5s-7.44 0-9.391.566A2.99 2.99 0 0 0 .502 6.186 31.38 31.38 0 0 0 0 12a31.38 31.38 0 0 0 .502 5.814 2.99 2.99 0 0 0 2.107 2.12C4.56 20.5 12 20.5 12 20.5s7.44 0 9.391-.566a2.99 2.99 0 0 0 2.107-2.12A31.38 31.38 0 0 0 24 12a31.38 31.38 0 0 0-.502-5.814zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 md:mt-8 pt-4 md:pt-6 font-rajdhani font-bold">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 text-center md:text-left">
            <p className="text-gray-400 text-xs md:text-sm">
              &copy; {currentYear} Car Detailing Mart. All rights reserved.
            </p>
            <div className="flex gap-3 md:gap-6 font-rajdhani font-bold flex-wrap justify-center md:justify-start">
              <Link to="/support" className="text-gray-400 hover:text-yellow-400 text-xs md:text-sm transition-colors py-1 min-h-9 flex items-center">
                Privacy Policy
              </Link>
              <Link to="/support" className="text-gray-400 hover:text-yellow-400 text-xs md:text-sm transition-colors py-1 min-h-9 flex items-center">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
