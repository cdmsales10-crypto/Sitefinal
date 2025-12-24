import { Target, Users, TrendingUp, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-white overflow-x-hidden">
      <section className="bg-gradient-to-b from-gray-900 to-black py-12 md:py-20">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-4 mb-3 md:mb-6 flex-wrap">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-anton text-red-600 leading-tight">About</h1>
            <img src="cmdlogo.svg" alt="CDM Logo" className="h-16 md:h-20 lg:h-28 animate-pulse -mt-6" />
          </div>
          <p className="text-sm md:text-lg lg:text-xl text-white font-archivo max-w-3xl mx-auto px-2">
            Building India's most trusted car detailing supply brand
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-4xl font-anton mb-3 md:mb-6 text-red-600">Who We Are</h2>
              <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4 leading-relaxed font-jakarta">
                Car Detailing Mart (CDM) is more than just a store - we're a one-stop destination for all car detailing supply needs. Serving detailing professionals, car wash centers, garages, showrooms, and passionate car enthusiasts across India.
              </p>
              <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4 leading-relaxed font-jakarta">
                Located opposite the iconic Mahatma Gandhi Bus Stand (MGBS) in Hyderabad, CDM offers a comprehensive range of chemicals, tools, accessories, and detailing essentials under one roof.
              </p>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed font-jakarta">
                We're not just a local shop - CDM is being built as a scalable national brand with a vision of establishing franchises and company-owned branches across India.
              </p>
            </div>
            <div>
              <img
                src="ab.png"
                alt="About CDM"
                className="rounded-lg md:rounded-2xl shadow-lg md:shadow-2xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-3 sm:px-4">
          <h2 className="text-2xl md:text-4xl font-anton text-center mb-8 md:mb-12 text-red-600">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            <div className="bg-white p-4 md:p-8 rounded-lg md:rounded-xl shadow-lg text-center">
              <div className="bg-red-600 w-14 md:w-16 h-14 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Target className="w-7 md:w-8 h-7 md:h-8 text-white" />
              </div>
              <h3 className="text-xl font-poppins font-bold mb-3 text-gray-800">Quality First</h3>
              <p className="text-gray-600 font-montserrat">
                We stock only professional-grade products that meet the highest industry standards
              </p>
            </div>

            <div className="bg-white p-4 md:p-8 rounded-lg md:rounded-xl shadow-lg text-center">
              <div className="bg-red-600 w-14 md:w-16 h-14 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Users className="w-7 md:w-8 h-7 md:h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold font-poppins mb-2 md:mb-3 text-gray-800">Customer Focus</h3>
              <p className="text-xs md:text-sm text-gray-600 font-montserrat">
                Your satisfaction and success is our priority. We're here to support your detailing journey
              </p>
            </div>

            <div className="bg-white p-4 md:p-8 rounded-lg md:rounded-xl shadow-lg text-center">
              <div className="bg-red-600 w-14 md:w-16 h-14 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <TrendingUp className="w-7 md:w-8 h-7 md:h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold font-poppins mb-2 md:mb-3 text-gray-800">Innovation</h3>
              <p className="text-xs md:text-sm text-gray-600 font-montserrat">
                Constantly expanding our product range with the latest detailing technologies
              </p>
            </div>

            <div className="bg-white p-4 md:p-8 rounded-lg md:rounded-xl shadow-lg text-center">
              <div className="bg-red-600 w-14 md:w-16 h-14 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Award className="w-7 md:w-8 h-7 md:h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold font-poppins mb-2 md:mb-3 text-gray-800">Trust</h3>
              <p className="text-xs md:text-sm text-gray-600 font-montserrat">
                Building long-term relationships through consistency, transparency, and reliability
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <img
                src="a2.png"
                alt="Our Vision"
                className="rounded-lg md:rounded-2xl shadow-lg md:shadow-2xl w-full h-auto object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-2xl md:text-4xl font-anton mb-3 md:mb-6 text-red-600">Our Vision</h2>
              <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4 leading-relaxed font-jakarta">
                To become India's leading car detailing supply brand, known for quality, reliability, and nationwide accessibility.
              </p>
              <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4 leading-relaxed font-jakarta">
                We envision a future where CDM has a presence in every major city across India, making professional-grade detailing supplies accessible to everyone - from individual enthusiasts to large-scale operations.
              </p>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed font-jakarta">
                Through franchises and company-owned branches, we're building a network that ensures consistent quality and service standards across the country.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
