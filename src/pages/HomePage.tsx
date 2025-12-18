import { Leaf, Shield, Sparkles, Heart, ShoppingCart } from 'lucide-react';
import { PRODUCTS } from '../types';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const { getTotalItems } = useCart();
  const hasItems = getTotalItems() > 0;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative bg-black py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden text-white">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-black/80"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <div className="flex justify-center mb-6 sm:mb-8">
              <img src="/cmdlogo.svg" alt="Card Detailing Mart Logo" className="w-60 h-60 sm:w-60 sm:h-60 animate-float" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold mb-4 sm:mb-6 tracking-luxury text-white">
              India’s Professional Car Detailing Supply Destination
            </h1>

            <p className="text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6 font-display font-medium tracking-luxury text-muted">
              Professional-grade products, nationwide distribution, built for businesses
            </p>

            <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 text-muted">
              Serving professional detailers, fleets, workshops, showrooms, and serious enthusiasts with industry-trusted chemicals, tools, and consumables.
            </p>

            <button onClick={() => { const productsSection = document.getElementById('products'); productsSection?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-primary inline-block min-h-[44px] px-6 sm:px-8 text-sm sm:text-base">
              View Catalog
            </button>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-center mb-8 sm:mb-12 md:mb-16 tracking-luxury text-white">
            Why Professionals Choose CDM
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">

            {/* Card 1 */}
            <div className="text-center p-6 sm:p-8 card-premium hover:scale-[1.02] transition-all duration-300 animate-slide-up">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 border border-[#2A2A2A]">
                <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-cdm-yellow" />
              </div>
                <h3 className="text-lg sm:text-xl font-display font-semibold text-white mb-2 sm:mb-3 tracking-luxury">
                Quality-Controlled Products
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                Batch-tested formulas for consistent professional performance
              </p>
            </div>

            {/* Card 2 */}
            <div
              className="text-center p-6 sm:p-8 card-premium hover:scale-[1.02] transition-all duration-300 animate-slide-up"
              style={{ animationDelay: '0.1s' }}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 border border-[#2A2A2A]">
                <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-cdm-yellow" />
              </div>
              <h3 className="text-lg sm:text-xl font-display font-semibold text-white mb-2 sm:mb-3 tracking-luxury">
                Reliable Availability
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                Nationwide distribution ensures steady supply and fast restocking
              </p>
            </div>

            {/* Card 3 */}
            <div
              className="text-center p-6 sm:p-8 card-premium hover:scale-[1.02] transition-all duration-300 animate-slide-up"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 border border-[#2A2A2A]">
                <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-cdm-yellow" />
              </div>
              <h3 className="text-lg sm:text-xl font-display font-semibold text-white mb-2 sm:mb-3 tracking-luxury">
                One-Stop Sourcing
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                Full range of chemicals, tools, and consumables for commercial operations
              </p>
            </div>

            {/* Card 4 */}
            <div
              className="text-center p-6 sm:p-8 card-premium hover:scale-[1.02] transition-all duration-300 animate-slide-up"
              style={{ animationDelay: '0.3s' }}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 border border-[#2A2A2A]">
                <Leaf className="w-8 h-8 sm:w-10 sm:h-10 text-cdm-yellow" />
              </div>
              <h3 className="text-lg sm:text-xl font-display font-semibold text-white mb-2 sm:mb-3 tracking-luxury">
                Industry-Trusted
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                Preferred by commercial detailers and service centers nationwide
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-12 sm:py-16 md:py-20 bg-section scroll-mt-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-center mb-8 sm:mb-12 md:mb-16 tracking-luxury text-white">
            Product Catalog
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {PRODUCTS.map((product, index) => (
              <div key={product.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Cart Button */}
      {hasItems && (
          <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-40">
          <button
            onClick={() => onNavigate('cart')}
            className="header-cta px-6 py-3 sm:px-10 sm:py-5 rounded-full font-semibold text-sm sm:text-lg flex items-center gap-2 sm:gap-3 transition-all duration-300 transform hover:scale-105 min-h-[44px] sm:min-h-[56px]"
          >
            <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            <span className="hidden sm:inline">Check Cart</span>
            <span className="sm:hidden">Cart</span>
          </button>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-section relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-black/80"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4 sm:mb-6 tracking-luxury text-white">
            Partner with CDM
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-10 leading-relaxed text-muted">
            Request trade pricing, bulk supply, or franchise information — built for business needs.
          </p>

          <button onClick={() => onNavigate('contact')} className="btn-primary px-6 sm:px-10 py-3 sm:py-4 rounded-xl font-semibold">
            Contact Sales
          </button>
        </div>
      </section>
    </div>
  );
}
