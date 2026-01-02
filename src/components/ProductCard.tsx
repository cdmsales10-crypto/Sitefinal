import { useState } from "react";
import { Product } from "../lib/supabase";
import { useCart } from "../lib/CartContext";
import { Star } from "lucide-react";

type Props = { product: Product };

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState<number>(1);
  const [imageError, setImageError] = useState(false);

  // Logic Checks
  const isOutOfStock = product.stock === false; // Assumes 'stock' is boolean (true = in stock)
  // Simple "Best Seller" logic: You can make this a DB field too, or just mock it for high rated/sold items
  const isBestSeller = product.featured === true;

  // Calculate Discount Percentage
  const discountPercent =
    product.mrp && product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  return (
    <div
      className={`bg-white border border-gray-100 rounded-lg md:rounded-xl overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer h-full flex flex-col group relative ${
        isOutOfStock ? "opacity-75 grayscale-[0.5]" : ""
      }`}
    >
      {/* Image Section */}
      <div className="aspect-square bg-gray-50 relative overflow-hidden">
        {/* Discount Badge (Left) */}
        {!isOutOfStock && discountPercent > 0 && (
          <div className="absolute top-2 left-2 z-10 bg-red-600 text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded shadow-md font-poppins">
            {discountPercent}% OFF
          </div>
        )}

        {/* Best Seller Badge (Right) */}
        {!isOutOfStock && isBestSeller && (
          <div className="absolute top-2 right-2 z-10 bg-yellow-400 text-black text-[10px] md:text-xs font-bold px-2 py-1 rounded shadow-md font-poppins flex items-center gap-1">
            <Star size={10} className="fill-black" /> Best Seller
          </div>
        )}

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 z-20 bg-black/50 flex items-center justify-center">
            <span className="bg-white text-black font-bold px-3 py-1 text-sm rounded shadow uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}

        {!imageError && product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
            onError={() => setImageError(true)}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="text-center">
              <div className="text-gray-400 text-3xl md:text-4xl mb-2">📦</div>
              <p className="text-gray-500 text-xs md:text-sm">Product</p>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-3 flex flex-col flex-1">
        {/* Title */}
        <h3
          className="font-semibold text-gray-800 mb-1 line-clamp-2 text-sm md:text-base leading-snug"
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Description */}
        {product.description && (
          <p
            className="text-xs text-gray-500 mb-3 line-clamp-2 leading-relaxed"
            title={product.description}
          >
            {product.description}
          </p>
        )}

        {/* Price & Quantity Controls Wrapper */}
        <div className="mt-auto space-y-3">
          {/* Row: Price (Left) + Quantity (Right) */}
          <div className="flex flex-wrap items-center justify-between gap-y-2">
            {/* Price Block */}
            <div className="flex flex-col">
              <span className="text-red-600 font-bold text-base md:text-lg font-archivo leading-none">
                ₹{product.price}
              </span>
              {product.mrp && product.mrp > product.price && (
                <span className="text-xs text-gray-400 line-through font-poppins">
                  ₹{product.mrp}
                </span>
              )}
            </div>

            {/* Quantity Selector - Disable if Out of Stock */}
            <div
              className={`flex items-center border border-gray-200 rounded-md overflow-hidden bg-gray-50 ${
                isOutOfStock ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <button
                disabled={isOutOfStock}
                onClick={(e) => {
                  e.stopPropagation();
                  setQty(Math.max(1, qty - 1));
                }}
                className="w-8 h-7 flex items-center justify-center hover:bg-gray-200 text-gray-600 font-bold transition-colors active:bg-gray-300"
              >
                -
              </button>
              <div className="w-8 text-center text-sm font-semibold text-gray-800 bg-white border-x border-gray-200 h-7 flex items-center justify-center">
                {qty}
              </div>
              <button
                disabled={isOutOfStock}
                onClick={(e) => {
                  e.stopPropagation();
                  setQty(qty + 1);
                }}
                className="w-8 h-7 flex items-center justify-center hover:bg-gray-200 text-gray-600 font-bold transition-colors active:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            disabled={isOutOfStock}
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, qty);
            }}
            className={`w-full py-2.5 rounded-lg font-poppins font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 
                ${
                  isOutOfStock
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed shadow-none"
                    : "bg-yellow-400 hover:bg-yellow-500 text-black hover:shadow active:scale-[0.98]"
                }`}
          >
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
