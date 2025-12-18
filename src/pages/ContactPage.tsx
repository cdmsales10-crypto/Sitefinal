import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative bg-black py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 sm:mb-6 tracking-luxury animate-fade-in">
            Contact Sales & Support
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted leading-relaxed animate-slide-up">
            For trade enquiries, bulk orders, or franchise information, contact our sales and logistics team.
          </p>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-8 sm:mb-10 lg:mb-12 tracking-luxury">Contact Information</h2>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-4 sm:gap-6 p-6 sm:p-8 card-premium hover:scale-[1.02] transition-all duration-300">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-black rounded-full flex items-center justify-center flex-shrink-0 border border-[#2A2A2A]">
                      <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-cdm-yellow" />
                    </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-display font-semibold text-white mb-1 sm:mb-2 tracking-luxury">Phone</h3>
                    <a href="tel:9000805105" className="text-muted footer-link transition-colors text-base sm:text-lg min-h-[44px] flex items-center">+91 9000805105</a>
                  </div>
                </div>

                <div className="flex items-start gap-4 sm:gap-6 p-6 sm:p-8 card-premium hover:scale-[1.02] transition-all duration-300">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-black rounded-full flex items-center justify-center flex-shrink-0 border border-[#2A2A2A]">
                      <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-cdm-yellow" />
                    </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-display font-semibold text-white mb-1 sm:mb-2 tracking-luxury">Email</h3>
                    <a href="mailto:info@cdmonline.in" className="text-muted footer-link break-all transition-colors text-base sm:text-lg">sales@cdmonline.in</a>
                  </div>
                </div>

                <div className="flex items-start gap-4 sm:gap-6 p-6 sm:p-8 card-premium hover:scale-[1.02] transition-all duration-300">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-black rounded-full flex items-center justify-center flex-shrink-0 border border-[#2A2A2A]">
                      <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-cdm-yellow" />
                    </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-display font-semibold text-white mb-1 sm:mb-2 tracking-luxury">Address</h3>
                    <p className="text-muted leading-relaxed text-base sm:text-lg">
                      CDM (Car Detailing Mart)<br />
                      Opposite Mahatma Gandhi Bus Stand (MGBS)<br />
                      Hyderabad,<br />
                      Telangana-500024
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 sm:gap-6 p-6 sm:p-8 card-premium transition-all duration-300">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-black rounded-full flex items-center justify-center flex-shrink-0 border border-[#2A2A2A]">
                    <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-cdm-yellow" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-display font-semibold mb-2 tracking-luxury">WhatsApp</h3>
                    <p className="text-muted mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">Order assistance and sales coordination via WhatsApp</p>
                    <a href="https://wa.me/919000805105" target="_blank" rel="noopener noreferrer" className="btn-primary">
                      Order Assistance
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-8 sm:mb-10 lg:mb-12 tracking-luxury">Business Hours</h2>
              <div className="card-premium p-6 sm:p-8 lg:p-10 mb-6 sm:mb-8">
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex justify-between items-center py-3 sm:py-4 border-b-2 border-cdm">
                    <span className="font-semibold text-white text-base sm:text-lg tracking-luxury">Monday - Friday</span>
                    <span className="text-muted text-sm sm:text-lg">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-3 sm:py-4 border-b-2 border-cdm">
                    <span className="font-semibold text-white text-base sm:text-lg tracking-luxury">Saturday</span>
                    <span className="text-muted text-sm sm:text-lg">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-3 sm:py-4">
                    <span className="font-semibold text-white text-base sm:text-lg tracking-luxury">Sunday</span>
                    <span className="text-muted text-sm sm:text-lg">Closed</span>
                  </div>
                </div>
              </div>

              <div className="card-premium p-6 sm:p-8 rounded-xl">
                <h3 className="text-xl sm:text-2xl font-display font-semibold text-white mb-3 sm:mb-4 tracking-luxury">Quick Response</h3>
                <p className="text-muted leading-relaxed text-sm sm:text-base lg:text-lg">
                  We strive to respond to all inquiries within 24 hours during business days.
                  For urgent matters, please contact us via WhatsApp for the fastest response.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-4 sm:mb-6 tracking-luxury">Have Questions?</h2>
          <p className="text-base sm:text-lg text-muted mb-6 sm:mb-10 leading-relaxed">
            Whether you're curious about our services or want to schedule an appointment, our team is ready to help.
          </p>
            <a href="https://wa.me/919000805105" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 sm:gap-3 btn-primary">
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              Start a Conversation
            </a>
        </div>
      </section>
    </div>
  );
}
