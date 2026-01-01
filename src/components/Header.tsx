import { Menu, X, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../lib/CartContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About Us', path: '/about' },
    { name: 'Process', path: '/process' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Support', path: '/support' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="bg-black text-white fixed top-0 left-0 w-full z-50 shadow-lg">
        <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between py-2 sm:py-3">
          <Link
            to="/"
            className="flex items-center space-x-2 cursor-pointer flex-shrink-0"
          >
            <img src="/cmdlogo.svg" alt="CDM Logo" className="w-16 sm:w-35 md:w-40 h-16 sm:h-8 md:h-20" />
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 md:px-4 py-2 md:py-3 rounded-lg transition-all min-h-11 flex items-center text-sm md:text-base ${
                  isActive(item.path)
                    ? 'font-archivo font-bold text-green-500'
                    : ' font-montserrat font-semibold text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link to="/cart" className="ml-2 px-3 md:px-4 py-2 md:py-3 rounded-lg transition-all min-h-11 flex items-center text-sm md:text-base text-gray-300 hover:bg-gray-800">
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                {/* cart count badge */}
                <CartCount />
              </div>
            </Link>
          </nav>

          <div className="flex items-center space-x-2 lg:hidden">
            <Link to="/cart" className="p-2 rounded-lg hover:bg-gray-800 min-h-11 min-w-11 flex items-center justify-center text-gray-300">
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                <CartCount />
              </div>
            </Link>

            <button
              className="p-2 rounded-lg hover:bg-gray-800 min-h-11 min-w-11 flex items-center justify-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="lg:hidden py-3 sm:py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 text-left rounded-lg transition-all font-heading text-sm sm:text-base min-h-11 flex items-center ${
                    isActive(item.path)
                      ? 'text-white font-semibold bg-green-600'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
      </header>
      <div className="h-16 sm:h-16 md:h-24" />
    </>
  );
}

function CartCount() {
  try {
    const { totalItems } = useCart();
    if (totalItems <= 0) return null;
    return (
      <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {totalItems}
      </span>
    );
  } catch (e) {
    return null;
  }
}
