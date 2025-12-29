import { useState } from 'react';
import { MessageCircle, CheckCircle, Phone, CreditCard, Package, Truck } from 'lucide-react';
import { Link } from "react-router-dom";

interface WorkflowStep {
  id: string;
  step_number: number;
  title: string;
  description: string;
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: '1',
    step_number: 1,
    title: 'Browse Our Products',
    description: 'Explore our complete range of professional car detailing supplies. Find exactly what you need from our carefully curated collection of chemicals, tools, and accessories.'
  },
  {
    id: '2',
    step_number: 2,
    title: 'Send Your Order via WhatsApp',
    description: 'The orders will be received via WhatsApp with your product selection and quantity. Our team is available 24/7 to assist you with your order.'
  },
  {
    id: '3',
    step_number: 3,
    title: 'Confirm Details',
    description: 'We\'ll confirm your order details, check product availability, and finalize pricing with you. No surprises, just clear communication.'
  },
  {
    id: '4',
    step_number: 4,
    title: 'Payment',
    description: 'Choose your preferred payment method. We accept various payment options for your convenience and security.'
  },
  {
    id: '5',
    step_number: 5,
    title: 'Quick Delivery',
    description: 'Your order ships out quickly. Track your package and receive it in perfect condition at your doorstep.'
  }
];

export default function ProcessPage() {
  const [steps] = useState<WorkflowStep[]>(WORKFLOW_STEPS);

  const getStepIcon = (stepNumber: number) => {
    const icons = [MessageCircle, CheckCircle, Phone, CreditCard, Package, Truck];
    const Icon = icons[stepNumber - 1] || CheckCircle;
    return <Icon className="w-8 h-8" />;
  };

  return (
    <div className="bg-white overflow-x-hidden">
      <section className="bg-gray-50 py-12 md:py-20">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-anton mb-3 md:mb-6 text-red-600 leading-tight">How It Works</h1>
          <p className="text-sm md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-poppins font-bold px-2">
            Our simple WhatsApp-based ordering process makes getting your car detailing supplies quick and easy
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="max-w-5xl mx-auto">
            <div className="space-y-8 md:space-y-12">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex flex-col md:flex-row gap-4 md:gap-8 items-start md:items-center ${
                    index % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className="flex-shrink-0 md:min-w-fit">
                    <div className="relative">
                      <div className="bg-gradient-to-br from-red-600 to-yellow-400 w-20 md:w-24 h-20 md:h-24 rounded-full flex items-center justify-center">
                        <div className="bg-white w-16 md:w-20 h-16 md:h-20 rounded-full flex items-center justify-center">
                          <div className="text-red-600">
                            {getStepIcon(step.step_number)}
                          </div>
                        </div>
                      </div>
                      <div className="absolute -top-2 -right-2 bg-yellow-400 w-8 md:w-10 h-8 md:h-10 rounded-full flex items-center justify-center font-bold text-black border-4 border-white text-xs md:text-base">
                        {step.step_number}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 bg-gray-50 rounded-lg md:rounded-2xl p-4 md:p-8 hover:shadow-lg md:hover:shadow-xl transition-all">
                    <h3 className="text-lg md:text-2xl font-poppins font-bold mb-2 md:mb-4 text-red-600">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-lg font-montserrat">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-anton text-center mb-12 text-red-600">Why Our Process Works</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="bg-red-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold font-poppins mb-3 text-gray-800">WhatsApp Convenience</h3>
                <p className="text-gray-600 font-montserrat">
                  Order directly through WhatsApp - no need to create accounts or navigate complex websites. Just send a message and we'll take care of the rest.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="bg-yellow-400 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-xl font-bold font-poppins mb-3 text-gray-800">Personal Assistance</h3>
                <p className="text-gray-600 font-montserrat">
                  Our dedicated sales executives guide you through product selection, answer all your questions, and ensure you get exactly what you need.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="bg-red-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold font-poppins mb-3 text-gray-800">Quality Assured</h3>
                <p className="text-gray-600 font-montserrat">
                  Every product goes through quality checks before dispatch. We ensure you receive only the best, authentic detailing supplies.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="bg-yellow-400 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Truck className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-xl font-bold font-poppins mb-3 text-gray-800">Fast Delivery</h3>
                <p className="text-gray-600 font-montserrat">
                  Quick and reliable shipping to get your products when you need them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-yellow-400">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-anton mb-6 text-white">Ready to Place Your Order?</h2>
          <p className="text-xl text-white font-poppins font-bold mb-8 max-w-2xl mx-auto">
            Start your ordering process now through WhatsApp - it's quick, easy, and convenient!
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
