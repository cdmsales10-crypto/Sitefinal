import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import { supabase, Testimonial } from "../lib/supabase";
import { Link } from "react-router-dom";

// Default fallback data if database is empty
const defaultTestimonials: Testimonial[] = [
  {
    id: "default-1",
    customer_name: "Rajesh Kumar",
    comment:
      "The quality of car shampoos is unmatched. My detailing business has seen better customer retention since I switched to CDM products.",
    rating: 5,
    created_at: new Date().toISOString(),
  },
  {
    id: "default-2",
    customer_name: "Amit Patel",
    comment:
      "Super fast delivery and the microfiber cloths are extremely durable. Highly recommended for professionals.",
    rating: 5,
    created_at: new Date().toISOString(),
  },
  {
    id: "default-3",
    customer_name: "Suresh Reddy",
    comment:
      "Best prices in the market for bulk orders. The foam cannon works like a charm!",
    rating: 4,
    created_at: new Date().toISOString(),
  },
];

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      const { data } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (data && data.length > 0) {
        setTestimonials(data);
      } else {
        // Fallback to defaults if DB is empty
        setTestimonials(defaultTestimonials);
      }
    } catch (error) {
      console.log("Testimonials not available, loading defaults");
      setTestimonials(defaultTestimonials);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gray-50 py-8 md:py-20">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-anton mb-2 sm:mb-4 md:mb-6 text-red-600">
            Customer Testimonials
          </h1>
          <p className="text-xs sm:text-base md:text-xl text-gray-600 max-w-3xl mx-auto font-poppins font-bold px-2">
            See what our customers have to say about their experience with CDM
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white border-2 border-gray-100 rounded-2xl p-8 hover:shadow-2xl transition-all transform hover:scale-105"
                >
                  <div className="flex justify-between items-start mb-6">
                    <Quote className="w-12 h-12 text-red-600 opacity-50" />
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 italic leading-relaxed">
                    "{testimonial.comment}"
                  </p>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="font-bold text-gray-800 text-lg">
                      {testimonial.customer_name}
                    </p>
                    <p className="text-sm text-gray-500">Verified Customer</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-anton text-center mb-8 text-red-600">
              Customer Satisfaction Stats
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                <div className="text-5xl font-urbanist text-red-600 mb-2">
                  98%
                </div>
                <p className="text-gray-600 font-montserrat">
                  Customer Satisfaction
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                <div className="text-5xl font-urbanist text-yellow-400">
                  4.9
                </div>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600 font-montserrat">Average Rating</p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                <div className="text-5xl font-urbanist text-red-600 mb-2">
                  500+
                </div>
                <p className="text-gray-600 font-montserrat">Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-yellow-400">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-anton mb-6 text-white">
            Join Our Happy Customers
          </h2>
          <p className="text-xl text-white font-poppins font-bold mb-8 max-w-2xl mx-auto">
            Experience the CDM difference and see why professionals trust us for
            their detailing needs
          </p>
          <Link
            to="/products"
            className="inline-flex items-center space-x-3 bg-black hover:bg-red-600 text-white px-10 py-5 font-anton text-lg transition-all transform hover:scale-105"
          >
            <span>Explore Products</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
