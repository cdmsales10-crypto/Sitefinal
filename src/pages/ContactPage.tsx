import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/919000805105', '_blank');
  };

  return (
    <div className="bg-white">
      <section className="bg-gray-50 py-12 md:py-20 overflow-x-hidden">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-anton mb-3 md:mb-6 text-red-600 leading-tight">Contact Us</h1>
          <p className="text-sm md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-poppins font-bold px-2">
            Get in touch with us for all your car detailing supply needs
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white overflow-x-hidden">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
            <div>
              <h2 className="text-2xl md:text-4xl font-anton mb-4 md:mb-8 text-red-600">Get In Touch</h2>

              <div className="space-y-4 md:space-y-6">
                <div className="flex items-start space-x-3 md:space-x-4 p-4 md:p-6 bg-gray-50 rounded-lg md:rounded-xl hover:shadow-lg transition-all">
                  <div className="bg-red-600 p-2 md:p-3 rounded-lg flex-shrink-0">
                    <Phone className="w-5 md:w-6 h-5 md:h-6 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold font-poppins text-base md:text-xl mb-1 md:mb-2 text-gray-800">Phone</h3>
                    <a href="tel:9000805105" className="text-gray-600 hover:text-red-600 text-sm md:text-lg font-urbanist break-all">
                      9000805105
                    </a>
                    <p className="text-xs md:text-sm text-gray-500 mt-1 font-rajdhani font-bold">Call us for immediate assistance</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 md:space-x-4 p-4 md:p-6 bg-gray-50 rounded-lg md:rounded-xl hover:shadow-lg transition-all">
                  <div className="bg-yellow-400 p-2 md:p-3 rounded-lg flex-shrink-0">
                    <Mail className="w-5 md:w-6 h-5 md:h-6 text-black" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold font-poppins text-base md:text-xl mb-1 md:mb-2 text-gray-800">Email</h3>
                    <a href="mailto:info@cdmonline.in" className="text-gray-600 hover:text-red-600 text-sm md:text-lg font-urbanist break-all">
                      info@cdmonline.in
                    </a>
                    <p className="text-xs md:text-sm text-gray-500 mt-1 font-rajdhani font-bold">Send us your inquiries anytime</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 md:space-x-4 p-4 md:p-6 bg-gray-50 rounded-lg md:rounded-xl hover:shadow-lg transition-all">
                  <div className="bg-red-600 p-2 md:p-3 rounded-lg flex-shrink-0">
                    <MapPin className="w-5 md:w-6 h-5 md:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold font-poppins text-base md:text-xl mb-1 md:mb-2 text-gray-800">Address</h3>
                    <p className="text-gray-600 text-sm md:text-lg font-urbanist leading-relaxed">
                      Telangana, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 md:space-x-4 p-4 md:p-6 bg-gray-50 rounded-lg md:rounded-xl hover:shadow-lg transition-all">
                  <div className="bg-yellow-400 p-2 md:p-3 rounded-lg flex-shrink-0">
                    <Clock className="w-5 md:w-6 h-5 md:h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-bold font-poppins text-base md:text-xl mb-1 md:mb-2 text-gray-800">Business Hours</h3>
                    <p className="text-gray-600 text-sm md:text-lg font-urbanist">9am - 5pm</p>
                    <p className="text-xs md:text-sm text-gray-500 mt-1 font-rajdhani font-bold">Both online and in-store available</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 md:mt-8">
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-yellow-400 hover:bg-red-600 text-white py-3 md:py-4 px-4 md:px-6 font-anton text-base md:text-lg flex items-center justify-center space-x-3 transition-all transform hover:scale-105 rounded min-h-12 md:min-h-auto"
                >
                  <MessageCircle className="w-5 md:w-6 h-5 md:h-6" />
                  <span>Chat on WhatsApp</span>
                </button>
                <p className="text-center text-gray-500 text-xs md:text-sm mt-2 md:mt-3 font-rajdhani font-bold">
                  Fastest way to reach us - Order directly through WhatsApp!
                </p>
              </div>
            </div>

            <div>
              <div className="bg-gray-100 rounded-lg md:rounded-2xl overflow-hidden shadow-lg md:shadow-2xl h-full min-h-[350px] md:min-h-[600px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.8826487832284!2d78.48273207516291!3d17.373058783521633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaeaaaab%3A0xae93b84234d2d112!2sMahatma%20Gandhi%20Bus%20Station!5e0!3m2!1sen!2sin!4v1703000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '350px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="CDM Location Map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
