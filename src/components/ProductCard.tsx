import { useState } from 'react';
import { Plus, Check } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0]?.id || '');
  const [quantity, setQuantity] = useState(1);
  const [showAdded, setShowAdded] = useState(false);

  const handleAddToCart = () => {
    const sizeObj = product.sizes?.find(s => s.id === selectedSize) || product.sizes?.[0];
    const price = sizeObj ? sizeObj.price : 0;
    addToCart(product, selectedSize, quantity, price);
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 2000);
    setQuantity(1);
  };

  return (
    <div className="card-premium overflow-hidden hover:scale-[1.02] transition-all duration-300 animate-fade-in">
      <div className="h-56 sm:h-64 md:h-72 overflow-hidden relative group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
      </div>

      <div className="p-4 sm:p-6 md:p-8">
        <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2 sm:mb-3 tracking-luxury">{product.name}</h3>
        <p className="text-muted text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">{product.description}</p>

          <div className="mb-4 sm:mb-6">
          <h4 className="text-xs sm:text-sm font-semibold text-white mb-2 sm:mb-3 tracking-luxury">Performance Benefits</h4>
          <div className="flex flex-wrap gap-2">
            {product.benefits.map((benefit, index) => (
              <span
                key={index}
                className="text-xs bg-black text-cdm-yellow px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-medium border border-cdm transition-all duration-300"
              >
                {benefit}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div>
            <label className="text-xs sm:text-sm font-semibold text-white block mb-2 sm:mb-3 tracking-luxury">Select Size</label>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {product.sizes?.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSize(s.id)}
                  className={`py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl border-2 transition-all duration-300 min-h-[56px] sm:min-h-[60px] font-display uppercase ${
                    selectedSize === s.id
                      ? 'border-[#C1271A] bg-[#C1271A] text-white'
                      : 'border-cdm hover:border-[#C1271A] bg-black text-white'
                  }`}
                >
                  <div className="font-bold font-semibold text-base sm:text-lg">{s.label}</div>
                  <div className="text-xs sm:text-sm font-sans font-normal">₹{s.price}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs sm:text-sm font-semibold text-white block mb-2 sm:mb-3 tracking-luxury">Quantity</label>
            <div className="flex items-center gap-3 sm:gap-4 justify-center bg-black rounded-xl p-2 border border-cdm">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-black border-2 border-cdm text-white hover:bg-[#C1271A] hover:text-white transition-all duration-300 font-bold text-lg sm:text-xl flex items-center justify-center min-w-[44px] min-h-[44px]">-</button>
              <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="w-16 sm:w-20 h-10 sm:h-12 text-center text-lg sm:text-xl font-bold font-semibold border-2 border-cdm rounded-xl focus:border-[#C1271A] focus:outline-none transition-colors bg-black text-white" />
              <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-black border-2 border-cdm text-white hover:bg-[#C1271A] hover:text-white transition-all duration-300 font-bold text-lg sm:text-xl flex items-center justify-center min-w-[44px] min-h-[44px]">+</button>
            </div>
          </div>

          <button onClick={handleAddToCart} className={`w-full py-3 sm:py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 min-h-[48px] sm:min-h-[52px] text-sm sm:text-base font-display uppercase ${showAdded ? 'bg-[#FBCB2C] text-black' : 'bg-[#C1271A] text-white'}`}>
            {showAdded ? (
              <>
                <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                Added to Order
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                Add to Order
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
