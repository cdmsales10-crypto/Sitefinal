import { Shield, Lock, FileText, HelpCircle } from 'lucide-react';

export default function SupportPage() {
  return (
    <div className="bg-white">
      <section className="bg-gray-50 py-8 md:py-20">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-anton mb-2 sm:mb-4 md:mb-6 text-red-600">Support & Policies</h1>
          <p className="text-xs sm:text-base md:text-xl text-gray-600 max-w-3xl mx-auto font-poppins font-bold px-2">
            Your trust and privacy are our top priorities
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gray-50 p-8 rounded-xl hover:shadow-xl transition-all">
              <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-poppins font-bold mb-4 text-gray-800">Shipping & Delivery Policy</h3>
              <p className="text-gray-600 font-montserrat">
                Learn how we collect, use, and protect your personal information
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl hover:shadow-xl transition-all">
              <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-poppins font-bold mb-4 text-gray-800">Terms of Service</h3>
              <p className="text-gray-600 font-montserrat ">
                Review our terms and conditions for using CDM services
              </p>
            </div>
          </div>

          <div className="space-y-12">
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-8">
              <div className="flex items-center space-x-4 mb-6">
                <Lock className="w-8 h-8 text-red-600" />
                <h2 className="text-3xl font-bold text-red-600">Shipping &amp; Delivery Policy</h2>
                </div>

                <div className="space-y-6 text-gray-600">
                  <div>
                    <p className="leading-relaxed mb-2">
                      At CDM, we are committed to delivering premium car care products across India with speed, transparency, and reliable communication.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Order Processing</h3>
                    <p className="leading-relaxed mb-2">All orders are processed after confirmation via WhatsApp.</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Orders are usually confirmed within 20 minutes of checkout during working hours.</li>
                      <li>Once confirmed, orders are prepared for dispatch as per product availability.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Shipping &amp; Delivery</h3>
                    <p className="leading-relaxed mb-2">CDM delivers PAN India.</p>
                    <p className="leading-relaxed mb-2">Delivery timelines depend on the destination, courier partner, and service availability.</p>
                    <p className="leading-relaxed mb-2">Dispatch and tracking details will be shared after order confirmation.</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Service Areas</h3>
                    <p className="leading-relaxed mb-2">We currently ship to most serviceable pincodes across India.</p>
                    <p className="leading-relaxed mb-2">In rare cases where courier service is unavailable, our team will inform the customer.</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Delays</h3>
                    <p className="leading-relaxed mb-2">Delivery delays may occur due to weather conditions, transportation issues, or operational reasons.</p>
                    <p className="leading-relaxed mb-2">Customers will be notified promptly in case of any unexpected delay.</p>
                  </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Contact Privacy Team</h3>
                  <p className="leading-relaxed">
                    For privacy-related queries, contact us at <a href="mailto:info@cdmonline.in" className="text-red-600 hover:underline font-urbanist font-bold">info@cdmonline.in</a> or call <a href="tel:9000805105" className="text-red-600 hover:underline font-urbanist font-bold">9000805105</a>.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-gray-100 rounded-2xl p-8">
              <div className="flex items-center space-x-4 mb-6">
                <FileText className="w-8 h-8 text-red-600" />
                <h2 className="text-3xl font-bold text-red-600">Terms of Service</h2>
              </div>

              <div className="space-y-6 text-gray-600">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Ordering Process</h3>
                  <p className="leading-relaxed">
                    Orders are placed via WhatsApp. All orders are subject to product availability and confirmation by our sales team. Prices are subject to change without notice, but confirmed orders will be honored at the agreed price.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Payment Terms</h3>
                  <p className="leading-relaxed">
                    Payment methods and terms are discussed and agreed upon with our sales executive during order confirmation. We accept various payment methods for customer convenience. Payment must be completed before order dispatch unless credit terms have been explicitly agreed upon.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Delivery Policy</h3>
                  <p className="leading-relaxed mb-2">
                    Nationwide delivery timelines vary based on destination.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Returns & Refunds</h3>
                  <p className="leading-relaxed mb-2">
                    We stand behind the quality of our products. Returns are accepted for:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Damaged or defective products (report within 48 hours of delivery)</li>
                    <li>Wrong products delivered</li>
                    <li>Expired or near-expiry chemical products</li>
                  </ul>
                  <p className="leading-relaxed mt-3">
                    Returns must be initiated via WhatsApp with photos of the issue. Refunds or replacements will be processed after verification.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Product Usage</h3>
                  <p className="leading-relaxed">
                    All car detailing chemicals must be used as per manufacturer instructions. CDM is not liable for misuse of products or damage caused by improper application. Always test products on a small area first. Use appropriate safety equipment when handling chemicals.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Warranty</h3>
                  <p className="leading-relaxed">
                    Products carry manufacturer warranties where applicable. Warranty terms vary by product and brand. Contact us for specific warranty information on any product.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Limitation of Liability</h3>
                  <p className="leading-relaxed">
                    CDM's liability is limited to the purchase price of products sold. We are not liable for indirect, consequential, or incidental damages arising from product use.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center space-x-4 mb-6">
                <HelpCircle className="w-8 h-8 text-red-600" />
                <h2 className="text-3xl font-poppins font-bold text-red-600">Need Help?</h2>
              </div>
              <p className="text-gray-600 mb-6 text-lg font-montserrat">
                Have questions about our policies or need clarification? Our support team is here to help.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="tel:9000805105"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 font-rajdhani font-bold transition-all"
                >
                  Call Us: 9000805105
                </a>
                <a
                  href="mailto:info@cdmonline.in"
                  className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 font-rajdhani font-bold transition-all"
                >
                  Email: info@cdmonline.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
