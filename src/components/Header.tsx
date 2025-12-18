import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="site-header sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
            onClick={() => handleNavigate('home')}
          >
            <img src="/cmdlogo.svg" alt="Card Detailing Mart Logo" className="w-12 h-12 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:rotate-12" />
            <div className="flex flex-col">
              <span className="text-lg sm:text-2xl font-display font-bold text-white tracking-luxury">Card Detailing Mart</span>
              <span className="text-xs text-muted hidden sm:block">Professional-grade detailing supplies & nationwide distribution</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <button onClick={() => handleNavigate('home')} className={`text-sm font-medium transition-all duration-300 tracking-luxury min-h-[44px] px-2 nav-link ${currentPage === 'home' ? 'active' : ''}`}>
              Home
            </button>
            <button onClick={() => handleNavigate('about')} className={`text-sm font-medium transition-all duration-300 tracking-luxury min-h-[44px] px-2 nav-link ${currentPage === 'about' ? 'active' : ''}`}>
              About Us
            </button>
            <button onClick={() => handleNavigate('contact')} className={`text-sm font-medium transition-all duration-300 tracking-luxury min-h-[44px] px-2 nav-link ${currentPage === 'contact' ? 'active' : ''}`}>
              Contact Us
            </button>
            <button onClick={() => handleNavigate('policies')} className={`text-sm font-medium transition-all duration-300 tracking-luxury min-h-[44px] px-2 nav-link ${currentPage === 'policies' ? 'active' : ''}`}>
              Policies
            </button>
            <button onClick={() => handleNavigate('cart')} className="relative p-3 header-cta rounded-full transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-white" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 cart-badge text-xs font-bold rounded-full w-6 h-6">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button onClick={() => handleNavigate('cart')} className="relative p-2 header-cta rounded-full transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-white" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 cart-badge text-xs font-bold rounded-full w-5 h-5">
                  {totalItems}
                </span>
              )}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-lg transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="Toggle menu">
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-cdm animate-fade-in">
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => handleNavigate('home')}
                className={`text-left py-3 px-4 rounded-lg transition-all duration-300 tracking-luxury min-h-[44px] ${
                  currentPage === 'home'
                    ? 'header-cta font-semibold text-white'
                    : 'text-muted hover:bg-[rgba(255,255,255,0.02)]'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavigate('about')}
                className={`text-left py-3 px-4 rounded-lg transition-all duration-300 tracking-luxury min-h-[44px] ${
                  currentPage === 'about'
                    ? 'header-cta font-semibold text-white'
                    : 'text-muted hover:bg-[rgba(255,255,255,0.02)]'
                }`}
              >
                About Us
              </button>
              <button
                onClick={() => handleNavigate('contact')}
                className={`text-left py-3 px-4 rounded-lg transition-all duration-300 tracking-luxury min-h-[44px] ${
                  currentPage === 'contact'
                    ? 'header-cta font-semibold text-white'
                    : 'text-muted hover:bg-[rgba(255,255,255,0.02)]'
                }`}
              >
                Contact Us
              </button>
              <button
                onClick={() => handleNavigate('policies')}
                className={`text-left py-3 px-4 rounded-lg transition-all duration-300 tracking-luxury min-h-[44px] ${
                  currentPage === 'policies'
                    ? 'header-cta font-semibold text-white'
                    : 'text-muted hover:bg-[rgba(255,255,255,0.02)]'
                }`}
              >
                Policies
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
