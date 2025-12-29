import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Shield, Truck, HeadphonesIcon, Target, Users, TrendingUp, Award } from 'lucide-react';
import { supabase, Product, Testimonial } from '../lib/supabase';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    loadFeaturedProducts();
    loadTestimonials();
  }, []);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const heroVideoSrc = isMobile ? '/hvm.mp4' : '/hv.mp4';

  useEffect(() => {
    if (activeCategory === 'all') setDisplayProducts(products);
    else setDisplayProducts(products.filter((p) => p.category === activeCategory));
  }, [activeCategory, products]);

  const loadFeaturedProducts = async () => {
    try {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('featured', true)
        .limit(20);

      if (data) {
        const withMrp = data.map((p: any) => ({ ...p, mrp: p.mrp ?? Math.round(p.price * 1.2) }));
        setProducts(withMrp);
      }
    } catch (error) {
      console.log('Products not available');
    }
  };

  const loadTestimonials = async () => {
    try {
      const { data } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) setTestimonials(data);
    } catch (error) {
      console.log('Testimonials not available');
    }
  };

  

  return (
    <div className="bg-white overflow-x-hidden">
      <section className="relative bg-gray-200 py-6 md:py-20">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex justify-center">
            <div className="w-full max-w-full md:max-w-8xl">
              <div
                className="relative bg-black rounded-lg md:rounded-2xl shadow-lg md:shadow-2xl overflow-hidden border border-gray-200 md:border-2"
                style={{ 
                  aspectRatio: window.innerWidth < 768 ? '16/10' : '21/9',
                  minHeight: window.innerWidth < 768 ? '180px' : '200px'
                }}
              >
                {/* Background Video */}
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  poster="/hv-poster.jpg"
                  className="hero-video absolute inset-0 w-full h-full object-cover"
                  style={{ display: 'block' }}
                >
                  <source src={heroVideoSrc} type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="py-12 md:py-8 lg:py-12 bg-gray-50">
        <div className="container mx-auto px-3 sm:px-4">
          <h2 className="text-3xl md:text-5xl font-anton text-center mb-3 md:mb-4 text-red-600">How It Works</h2>
        <picture className="py-3 md:py-5 w-full max-w-4xl md:max-w-6xl mx-auto mb-8 md:mb-12 block">
          <source media="(max-width: 767px)" srcSet="/pm.png" />
          <img
            src="/process.png"
            alt="Diagram showing the WhatsApp ordering process"
            className="w-full h-auto object-contain block"
          />
        </picture>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-5xl font-anton mb-2 md:mb-4 text-red-600">Our Products</h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto font-poppins font-bold px-2">
              Premium quality detailing supplies trusted by professionals across India
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 md:px-6 py-2 md:py-3 font-anton text-sm md:text-base rounded ${
                activeCategory === 'all' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All products
            </button>
            <button
              onClick={() => setActiveCategory('car_chemicals')}
              className={`px-4 md:px-6 py-2 md:py-3 font-anton text-sm md:text-base rounded ${
                activeCategory === 'car_chemicals' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Detailing chem
            </button>
            <button
              onClick={() => setActiveCategory('car_accessories')}
              className={`px-4 md:px-6 py-2 md:py-3 font-anton text-sm md:text-base rounded ${
                activeCategory === 'car_accessories' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Accessories
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-8 md:mt-12">
            <button
              onClick={() => navigate('/products')}
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 hover:scale-105 text-white px-8 md:px-10 py-3 md:py-4 font-anton inline-flex items-center justify-center sm:justify-start space-x-2 transition-all animate-bounce text-2xl md:text-4xl min-h-12 md:min-h-auto"
            >
              <span>View all products</span>
              <ArrowRight className="w-7 md:w-10 h-7 md:h-10" />
            </button>
          </div>
        </div>
      </section>

      <div className="bg-white overflow-x-hidden">
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

      <section className="py-12 md:py-16 bg-white overflow-x-hidden">
        <div className="container mx-auto px-3 sm:px-4">
          <h2 className="text-2xl md:text-4xl font-anton text-center mb-8 md:mb-12 text-red-600">Why Choose CDM?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            <div className="text-center p-4 md:p-6 bg-gray-50 rounded-lg md:rounded-xl hover:shadow-lg md:hover:shadow-xl transition-all">
              <div className="bg-red-600 w-14 md:w-16 h-14 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Shield className="w-7 md:w-8 h-7 md:h-8 text-white" />
              </div>
              <h3 className="font-bold text-base md:text-xl mb-2 md:mb-3 text-gray-800">Premium Quality</h3>
              <p className="text-gray-600 text-sm md:text-base font-montserrat">
                Professional-grade products trusted by detailing experts nationwide
              </p>
            </div>

            <div className="text-center p-4 md:p-6 bg-gray-50 rounded-lg md:rounded-xl hover:shadow-lg md:hover:shadow-xl transition-all">
              <div className="bg-yellow-400 w-14 md:w-16 h-14 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Truck className="w-7 md:w-8 h-7 md:h-8 text-black" />
              </div>
              <h3 className="font-bold text-base md:text-xl mb-2 md:mb-3 text-gray-800">Fast Delivery</h3>
              <p className="text-gray-600 text-sm md:text-base font-montserrat">
                Quick and reliable shipping to get your products when you need them.
              </p>
            </div>

            <div className="text-center p-4 md:p-6 bg-gray-50 rounded-lg md:rounded-xl hover:shadow-lg md:hover:shadow-xl transition-all">
              <div className="bg-red-600 w-14 md:w-16 h-14 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <HeadphonesIcon className="w-7 md:w-8 h-7 md:h-8 text-white" />
              </div>
              <h3 className="font-bold text-base md:text-xl mb-2 md:mb-3 text-gray-800">Expert Support</h3>
              <p className="text-gray-600 text-sm md:text-base font-montserrat">
                Dedicated team to guide you through product selection and usage
              </p>
            </div>

            <div className="text-center p-4 md:p-6 bg-gray-50 rounded-lg md:rounded-xl hover:shadow-lg md:hover:shadow-xl transition-all">
              <div className="bg-yellow-400 w-14 md:w-16 h-14 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Star className="w-7 md:w-8 h-7 md:h-8 text-black" />
              </div>
              <h3 className="font-bold text-base md:text-xl mb-2 md:mb-3 text-gray-800">Trusted Brand</h3>
              <p className="text-gray-600 text-sm md:text-base font-montserrat">
                Growing national presence with plans for franchises across India
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gradient-to-br from-gray-900 to-black overflow-x-hidden">
        <div className="container mx-auto px-3 sm:px-4">
          <h2 className="text-2xl md:text-4xl font-anton text-center mb-8 md:mb-12 text-white">Testimonials</h2>

          <div className="relative overflow-hidden">
            <div className="flex animate-scroll space-x-4 md:space-x-6">
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${index}`}
                  className="flex-shrink-0 w-72 md:w-80 lg:w-96 bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-lg md:shadow-xl"
                >
                  <div className="flex items-center mb-3 md:mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 md:w-5 h-4 md:h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-3 md:mb-4 italic text-sm md:text-base">"{testimonial.comment}"</p>
                  <p className="font-bold text-gray-800 text-sm md:text-base">{testimonial.customer_name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-yellow-400">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-anton mb-6 text-white">Ready to Get Started?</h2>
          <p className="text-xl text-white font-poppins font-bold mb-8 max-w-3xl mx-auto">
            Join hundreds of satisfied customers and experience premium car detailing supplies
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="bg-black hover:bg-red-600 text-white px-12 py-5 font-anton text-lg inline-flex items-center space-x-3 transition-all transform hover:scale-105"
          >
            <span>Contact Us Today</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
