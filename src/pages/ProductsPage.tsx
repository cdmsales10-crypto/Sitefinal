import { useEffect, useState } from 'react';
import { supabase, Product } from '../lib/supabase';
import { MessageCircle } from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [activeCategory, products]);

  const loadProducts = async () => {
    try {
      const { data } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) {
        setProducts(data);
        setFilteredProducts(data);
      }
    } catch (error) {
      console.log('Products not available');
    }
  };

  const filterProducts = () => {
    if (activeCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === activeCategory));
    }
  };

  const handleWhatsAppOrder = (product: Product) => {
    const message = `Hi, I'm interested in ordering:\n\nProduct: ${product.name}\nPrice: ₹${product.price}\n\nPlease provide more details.`;
    window.open(`https://wa.me/919000805105?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="bg-white min-h-screen py-8 md:py-12 overflow-x-hidden">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-anton mb-2 md:mb-4 text-red-600">Our Products</h1>
          <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto font-poppins font-bold px-2">
            Browse our complete range of professional car detailing supplies
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-6 md:px-8 py-2 md:py-3 font-anton transition-all text-sm md:text-base rounded min-h-10 md:min-h-auto ${
              activeCategory === 'all'
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Products
          </button>
          <button
            onClick={() => setActiveCategory('car_chemicals')}
            className={`px-6 md:px-8 py-2 md:py-3 font-anton transition-all text-sm md:text-base rounded min-h-10 md:min-h-auto ${
              activeCategory === 'car_chemicals'
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Car Chemicals
          </button>
          <button
            onClick={() => setActiveCategory('car_accessories')}
            className={`px-6 md:px-8 py-2 md:py-3 font-anton transition-all text-sm md:text-base rounded min-h-10 md:min-h-auto ${
              activeCategory === 'car_accessories'
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Car Accessories
          </button>
        </div>

        <div className="mb-4 md:mb-6 text-center">
          <p className="text-sm md:text-base text-gray-600 font-poppins font-bold">
            Showing <span className="font-bold text-red-600">{filteredProducts.length}</span> products
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border-2 border-gray-100 rounded-lg md:rounded-xl overflow-hidden hover:shadow-lg md:hover:shadow-2xl transition-all transform hover:scale-105"
            >
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative group">
                <div className="text-center">
                  <div className="text-gray-400 text-3xl md:text-4xl mb-2">📦</div>
                  <p className="text-gray-500 text-xs md:text-sm">Product</p>
                </div>
                <div className="absolute top-2 right-2">
                  <span className="bg-yellow-400 text-black text-xs px-2 md:px-3 py-1 rounded-full font-semibold text-xs md:text-sm">
                    {product.category === 'car_chemicals' ? 'Chemical' : 'Accessory'}
                  </span>
                </div>
              </div>
              <div className="p-3 md:p-4">
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[3rem] text-sm md:text-base">
                  {product.name}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 mb-3 line-clamp-2 min-h-[2.5rem]">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-red-600 font-bold text-base md:text-xl">₹{product.price}</span>
                </div>
                <button
                  onClick={() => handleWhatsAppOrder(product)}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2.5 md:py-3 rounded-lg font-poppins flex items-center justify-center space-x-2 transition-all text-sm md:text-base font-semibold min-h-11"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Place Order</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 md:py-20">
            <p className="text-gray-500 text-base md:text-xl">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
