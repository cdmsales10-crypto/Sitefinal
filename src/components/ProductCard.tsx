import { useState } from 'react';
import { Product } from '../lib/supabase';
import { useCart } from '../lib/CartContext';

type Props = { product: Product };

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState<number>(1);

  return (
    <div className="bg-white border-2 border-gray-100 rounded-lg md:rounded-xl overflow-hidden hover:shadow-xl md:hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer">
      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-3xl md:text-4xl mb-2">📦</div>
          <p className="text-gray-500 text-xs md:text-sm">Product</p>
        </div>
      </div>
      <div className="p-3 md:p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 text-sm md:text-base">{product.name}</h3>
        <p className="text-xs md:text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        <div className="mb-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <span className="text-red-600 font-bold text-base md:text-lg font-archivo">₹{product.price}</span>
              {product.mrp && product.mrp > product.price ? (
                <span className="text-sm text-gray-500 font-poppins">
                  M.R.P. <span className="line-through text-gray-400 font-poppins font-bold">₹{product.mrp}</span>
                </span>
              ) : null}
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={(e) => { e.stopPropagation(); setQty(Math.max(1, qty - 1)); }} className="px-2 py-1 bg-gray-100 rounded font-archivo">-</button>
              <div className="px-3 py-1 border rounded font-archivo">{qty}</div>
              <button onClick={(e) => { e.stopPropagation(); setQty(qty + 1); }} className="px-2 py-1 bg-gray-100 rounded font-archivo">+</button>
            </div>
          </div>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); addToCart(product, qty); }}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2.5 md:py-3 rounded-lg font-poppins flex items-center justify-center space-x-2 transition-all text-sm md:text-base font-semibold min-h-11"
        >
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}
