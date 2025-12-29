export default function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/919000805105', '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
  <button
    onClick={handleWhatsAppClick}
    className="transition-all hover:scale-110 opacity-60 hover:opacity-100"
    aria-label="Chat on WhatsApp"
  >
    <img src="wh.svg" alt="WhatsApp" className="w-10 h-10 md:w-20 md:h-20" />
  </button>

  {/* Tooltip */}
  <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 
                  bg-black text-white font-rajdhani font-bold text-lg px-3 py-2
                  opacity-0 group-hover:opacity-100
                  translate-x-2 group-hover:translate-x-0
                  transition-all duration-200
                  pointer-events-none whitespace-nowrap animate-fadeIn">
    Chat on WhatsApp
  </div>
</div>
  );
}
