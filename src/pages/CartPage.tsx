import { Trash2, ShoppingBag, Plus, Minus, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';

interface CartPageProps {
  onNavigate: (page: string) => void;
}

export default function CartPage({ onNavigate }: CartPageProps) {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerPincode, setCustomerPincode] = useState('');
  const [errors, setErrors] = useState<{name?: string; phone?: string; address?: string; pincode?: string}>({});

  useEffect(() => {
    // Prevent background scrolling when modal is open
    if (showCheckout) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showCheckout]);

  const handleSubmitOrder = () => {
    // If checkout form is not shown yet, open it
    if (!showCheckout) {
      setShowCheckout(true);
      return;
    }

    // validate
    const newErrors: {name?: string; phone?: string; address?: string; pincode?: string} = {};
    if (!customerName.trim()) newErrors.name = 'Please enter your name';
    if (!customerPhone.trim() || customerPhone.replace(/\D/g, '').length < 7) newErrors.phone = 'Please enter a valid phone number';
    if (!customerAddress.trim()) newErrors.address = 'Please enter your full address';
    if (!customerPincode.trim() || customerPincode.replace(/\D/g, '').length < 5) newErrors.pincode = 'Please enter a valid pincode';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);

    const orderDetails = cart.map(item =>
      `${item.product.name} (${item.size}) - Qty: ${item.quantity} - ₹${item.price * item.quantity}`
    ).join('\n');

    const total = getTotalPrice();

    const messageLines = [
      '*New Order from Card Detailing Mart*',
      '',
      `Name: ${customerName}`,
      `Phone: ${customerPhone}`,
      `Address: ${customerAddress}`,
      `Pincode: ${customerPincode}`,
      '',
      'Order Details:',
      orderDetails,
      '',
      `Total: ₹${total}`
    ];

    const message = encodeURIComponent(messageLines.join('\n'));
    const whatsappUrl = `https://wa.me/919000805105?text=${message}`;
    window.open(whatsappUrl, '_blank');

    setTimeout(() => {
      clearCart();
      setIsSubmitting(false);
      setShowCheckout(false);
      setCustomerName('');
      setCustomerPhone('');
      setCustomerAddress('');
      setCustomerPincode('');
      onNavigate('home');
    }, 1000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center py-12 sm:py-16 md:py-20 px-4 animate-fade-in">
          <ShoppingBag className="w-24 h-24 sm:w-32 sm:h-32 text-cdm-yellow mx-auto mb-6 sm:mb-8" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-4 sm:mb-6 tracking-luxury">Your Order Cart is Empty</h2>
          <p className="text-muted text-base sm:text-lg mb-6 sm:mb-10">Add items to create an order for commercial purchase or bulk supply.</p>
          <button onClick={() => onNavigate('home')} className="btn-primary min-h-[44px] px-6 sm:px-8 text-sm sm:text-base">View Catalog</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 sm:py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-8 sm:mb-10 md:mb-12 tracking-luxury animate-fade-in">Shopping Cart</h1>

        <div className="card-premium overflow-hidden mb-6 sm:mb-8 animate-slide-up">
          {cart.map((item, index) => (
            <div
              key={`${item.product.id}-${item.size}`}
              className={`p-4 sm:p-6 md:p-8 ${index !== cart.length - 1 ? 'border-b-2 border-cdm' : ''} transition-colors duration-300`}
            >
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full sm:w-24 md:w-32 h-32 object-cover rounded-xl"
                />

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-3 sm:mb-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-display font-semibold text-white tracking-luxury">{item.product.name}</h3>
                      <p className="text-muted mt-1 text-base sm:text-lg">Size: <span className="font-medium text-white">{item.size}</span></p>
                    </div>
                    <button onClick={() => removeFromCart(item.product.id, item.size)} className="text-[#C1271A] hover:text-[#A21A15] transition-colors p-2 sm:p-3 rounded-xl mt-2 sm:mt-0 min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="Remove item">
                      <Trash2 className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
                    <div className="flex items-center gap-3 sm:gap-4 bg-black rounded-xl p-2 border border-cdm">
                      <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)} className="w-10 h-10 rounded-xl bg-black border-2 border-cdm text-white hover:bg-[#C1271A] hover:text-white transition-all duration-300 flex items-center justify-center font-bold text-lg sm:text-xl min-w-[44px] min-h-[44px]" aria-label="Decrease quantity">
                        <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      <span className="text-lg sm:text-xl font-display font-semibold w-12 sm:w-16 text-center text-white">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)} className="w-10 h-10 rounded-xl bg-black border-2 border-cdm text-white hover:bg-[#C1271A] hover:text-white transition-all duration-300 flex items-center justify-center font-bold text-lg sm:text-xl min-w-[44px] min-h-[44px]" aria-label="Increase quantity">
                        <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>

                    <div className="text-left sm:text-right">
                      <p className="text-xs sm:text-sm text-muted mb-1"><span className="font-sans font-normal">₹{item.price}</span> each</p>
                      <p className="text-xl sm:text-2xl text-[#C1271A]"><span className="font-sans font-normal">₹{item.price * item.quantity}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="card-premium p-6 sm:p-8 mb-6 sm:mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex justify-between items-center mb-4 sm:mb-6 pb-4 sm:pb-6 border-b-2 border-cdm">
            <span className="text-lg sm:text-xl text-muted font-medium tracking-luxury">Subtotal</span>
            <span className="text-lg sm:text-xl text-white font-semibold"><span className="font-sans font-normal">₹{getTotalPrice()}</span></span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-2xl sm:text-3xl font-display font-bold text-white tracking-luxury">Total</span>
            <span className="text-2xl sm:text-3xl font-display font-bold text-[#C1271A]"><span className="font-sans font-normal">₹{getTotalPrice()}</span></span>
          </div>
        </div>

        {showCheckout && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => { setShowCheckout(false); setErrors({}); }}
            />
            <div className="relative z-10 w-full max-w-2xl mx-4">
              <div className="card-premium p-6 sm:p-8 mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-display font-semibold text-white mb-3">Enter your details</h3>
                <div className="grid grid-cols-1 gap-3">
                  <label className="text-sm text-muted">Name</label>
                  <input
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className={`w-full p-3 rounded-xl border-2 ${errors.name ? 'border-[#C1271A]' : 'border-cdm'} bg-black text-white focus:outline-none`}
                    placeholder="Full name"
                  />
                  {errors.name && <span className="text-[#C1271A] text-sm">{errors.name}</span>}

                  <label className="text-sm text-muted">Phone</label>
                  <input
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className={`w-full p-3 rounded-xl border-2 ${errors.phone ? 'border-[#C1271A]' : 'border-cdm'} bg-black text-white focus:outline-none`}
                    placeholder="Phone number"
                  />
                  {errors.phone && <span className="text-[#C1271A] text-sm">{errors.phone}</span>}

                  <label className="text-sm text-muted">Full address</label>
                  <textarea
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className={`w-full p-3 rounded-xl border-2 ${errors.address ? 'border-[#C1271A]' : 'border-cdm'} bg-black text-white focus:outline-none`}
                    placeholder="House number, street, city, state"
                    rows={3}
                  />
                  {errors.address && <span className="text-[#C1271A] text-sm">{errors.address}</span>}

                  <label className="text-sm text-muted">Pincode</label>
                  <input
                    value={customerPincode}
                    onChange={(e) => setCustomerPincode(e.target.value)}
                    className={`w-full p-3 rounded-xl border-2 ${errors.pincode ? 'border-[#C1271A]' : 'border-cdm'} bg-black text-white focus:outline-none`}
                    placeholder="Postal code"
                  />
                  {errors.pincode && <span className="text-[#C1271A] text-sm">{errors.pincode}</span>}

                  <div className="flex gap-3">
                    <button onClick={() => { setShowCheckout(false); setErrors({}); }} type="button" className="flex-1 btn-secondary py-3 rounded-xl font-semibold transition-all duration-300 text-center">
                      Cancel
                    </button>
                    <button onClick={handleSubmitOrder} disabled={isSubmitting} className="flex-1 btn-primary py-3 rounded-xl font-semibold transition-all duration-300">
                      {isSubmitting ? 'Processing...' : 'Confirm & Send Order'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <button onClick={() => onNavigate('home')} className="flex-1 btn-secondary py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 min-h-[48px] sm:min-h-[56px] tracking-luxury text-sm sm:text-base">
            Continue Shopping
          </button>
          <button onClick={handleSubmitOrder} disabled={isSubmitting} className="flex-1 btn-primary py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base">
            {isSubmitting ? (
              'Processing...'
            ) : (
              <>
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="hidden sm:inline">Finalize Order via WhatsApp</span>
                <span className="sm:hidden">Order via WhatsApp</span>
              </>
            )}
          </button>
        </div>

        <p className="text-center text-xs sm:text-sm text-muted mt-4 sm:mt-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          You'll be redirected to WhatsApp to complete your order
        </p>
      </div>
    </div>
  );
}
