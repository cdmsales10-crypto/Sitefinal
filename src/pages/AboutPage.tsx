import { Leaf, Target, Heart, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative bg-black py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 sm:mb-6 tracking-luxury animate-fade-in">
            About Card Detailing Mart
          </h1>
            <p className="text-lg sm:text-xl text-muted mb-6 sm:mb-8 leading-relaxed">
              CDM is India’s professional car detailing supply brand — supplying professional-grade chemicals, tools, and consumables to detailers, workshops, showrooms, and fleets.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 sm:space-y-6 text-muted text-base sm:text-lg leading-relaxed">
            <p className="animate-fade-in">
              At Card Detailing Mart, we believe in delivering high-quality car detailing services. Our mission is to
              provide professional care and detailing that preserves and enhances your vehicle's appearance.
            </p>
            <p className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              We understand that in today's fast-paced world, maintaining a healthy lifestyle can be
              challenging. That's why we've created a range of organic powders that make it easy to
              incorporate essential nutrients into your daily routine. Each product is selected with care,
              ensuring the highest quality and maximum nutritional benefits.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-center text-white mb-8 sm:mb-12 md:mb-16 tracking-luxury">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="card-premium p-6 sm:p-8 hover:scale-[1.02] transition-all duration-300 text-center animate-slide-up">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 border border-[#2A2A2A]">
                <Leaf className="w-8 h-8 sm:w-10 sm:h-10 text-cdm-yellow" />
              </div>
              <h3 className="text-lg sm:text-xl font-display font-semibold text-white mb-3 sm:mb-4 tracking-luxury">100% Professional</h3>
              <p className="text-muted text-xs sm:text-sm leading-relaxed">
                We use professional-grade techniques and products to protect and enhance your vehicle.
              </p>
            </div>

            <div className="card-premium p-6 sm:p-8 hover:scale-[1.02] transition-all duration-300 text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 border border-[#2A2A2A]">
                <Target className="w-8 h-8 sm:w-10 sm:h-10 text-cdm-yellow" />
              </div>
                <h3 className="text-lg sm:text-xl font-display font-semibold text-white mb-3 sm:mb-4 tracking-luxury">Operational Quality</h3>
                <p className="text-muted text-xs sm:text-sm leading-relaxed">
                  Standardized QA and batch-tested products for consistent professional results.
              </p>
            </div>

            <div className="card-premium p-6 sm:p-8 hover:scale-[1.02] transition-all duration-300 text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 border border-[#2A2A2A]">
                <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-cdm-yellow" />
              </div>
                <h3 className="text-lg sm:text-xl font-display font-semibold text-white mb-3 sm:mb-4 tracking-luxury">Trade Support</h3>
                <p className="text-muted text-xs sm:text-sm leading-relaxed">
                  Dedicated sales and logistics support for commercial customers and partners.
              </p>
            </div>

            <div className="card-premium p-6 sm:p-8 hover:scale-[1.02] transition-all duration-300 text-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 border border-[#2A2A2A]">
                <Award className="w-8 h-8 sm:w-10 sm:h-10 text-cdm-yellow" />
              </div>
                <h3 className="text-lg sm:text-xl font-display font-semibold text-white mb-3 sm:mb-4 tracking-luxury">Operational Integrity</h3>
                <p className="text-muted text-xs sm:text-sm leading-relaxed">
                  Transparent sourcing, standardized pricing, and compliance-forward operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-center text-white mb-8 sm:mb-12 tracking-luxury">Our Story</h2>
          <div className="space-y-6 sm:space-y-8 text-muted text-base sm:text-lg leading-relaxed">
            <p className="animate-fade-in">
              Card Detailing Mart was born from a simple belief: that every vehicle deserves professional,
              attentive detailing to maintain its value and appearance.
            </p>
            <p className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              We offer a range of premium car detailing services including exterior wash and polish,
              interior deep-cleaning, paint protection, and ceramic coatings. Our team uses professional-grade
              products and techniques to deliver lasting results.
            </p>
            <p className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Today, we're proud to serve a growing community of vehicle owners who trust Card Detailing Mart
              for reliable, high-quality detailing and exceptional customer service.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-section text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4 sm:mb-6 tracking-luxury">Join Our Community</h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 leading-relaxed text-muted">
            Become part of the Card Detailing Mart family and experience professional car care today.
          </p>
        </div>
      </section>
    </div>
  );
}
