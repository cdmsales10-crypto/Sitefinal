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
              <img src="/cmdlogo.svg" alt="CDM Logo" className="w-20 md:w-28 h-20 md:h-28" />
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
              <a href="https://x.com" aria-label="X" className="bg-yellow-400 p-2.5 md:p-2 rounded-lg hover:bg-red-600 hover:scale-105 transition-colors min-h-11 min-w-11 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 300 300.251"
                  className="w-5 h-5"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66" />
                </svg>
              </a>
            </div>
            <h4 className="text-white font-anton text-xs md:text-sm mb-2">Business Hours</h4>
            <p className="text-gray-400 text-xs md:text-sm font-montserrat font-semibold leading-relaxed">
              Open 24/7<br />
              <span className="text-green-600 font-rajdhani font-bold">Online & In-Store</span>
            </p>
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
