import { Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const go = (page: string) => {
    if (onNavigate) onNavigate(page);
    else window.location.hash = `#${page}`;
  };

  return (
    <footer className="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <img src="/cmdlogo.svg" alt="Card Detailing Mart Logo" className="w-7 h-7 sm:w-8 sm:h-8" />
              <span className="text-lg sm:text-xl font-display font-bold footer-heading tracking-luxury">Card Detailing Mart</span>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-muted">
              Card Detailing Mart — India’s professional supplier of detailing chemicals, tools, and consumables for commercial operators and serious enthusiasts.
            </p>
          </div>

          <div>
            <h3 className="footer-heading font-display font-semibold text-base sm:text-lg mb-4 sm:mb-6 tracking-luxury">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <li>
                <button onClick={() => go('home')} className="footer-link transition-colors duration-300 inline-block min-h-[44px] flex items-center">Home</button>
              </li>
              <li>
                <button onClick={() => go('about')} className="footer-link transition-colors duration-300 inline-block min-h-[44px] flex items-center">About Us</button>
              </li>
              <li>
                <button onClick={() => go('contact')} className="footer-link transition-colors duration-300 inline-block min-h-[44px] flex items-center">Contact Us</button>
              </li>
              <li>
                <button onClick={() => go('policies')} className="footer-link transition-colors duration-300 inline-block min-h-[44px] flex items-center">Policies</button>
              </li>
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="footer-heading font-display font-semibold text-base sm:text-lg mb-4 sm:mb-6 tracking-luxury">Contact Us</h3>
            <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mt-1 flex-shrink-0 footer-icon" />
                <a href="tel:9000805105" className="text-muted footer-link transition-colors min-h-[44px] flex items-center">9000805105</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 mt-1 flex-shrink-0 footer-icon" />
                <a href="mailto:info@cdmonline.in" className="text-muted footer-link break-all transition-colors">info@cdmonline.in</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mt-1 flex-shrink-0 footer-icon" />
                <span className="text-muted leading-relaxed">CDM (Car Detailing Mart) · Opposite Mahatma Gandhi Bus Stand (MGBS) · Hyderabad, Telangana-500024</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cdm mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-xs sm:text-sm">
          <p className="text-muted">&copy; {new Date().getFullYear()} <span className="footer-heading">Card Detailing Mart</span>. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
