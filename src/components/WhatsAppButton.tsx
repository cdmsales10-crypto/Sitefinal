import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <a href="https://wa.me/919000805105?text=Hello%20Card%20Detailing%20Mart!%20I%20would%20like%20to%20know%20more%20about%20your%20services." target="_blank" rel="noopener noreferrer" className="fixed bottom-4 left-4 sm:bottom-8 sm:left-8 header-cta rounded-full p-3 sm:p-4 transition-all duration-300 transform hover:scale-110 z-40 flex items-center justify-center group min-h-[52px] min-w-[52px] sm:min-h-[56px] sm:min-w-[56px]" aria-label="Chat on WhatsApp">
      <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
      <span className="absolute left-16 sm:left-20 bg-black text-white px-3 py-2 sm:px-4 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none hidden sm:block">
        Sales & Order Support
      </span>
    </a>
  );
}
