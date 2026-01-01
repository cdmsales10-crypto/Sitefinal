import { useEffect, useState } from "react";
import { supabase, Product, Category } from "../lib/supabase";
import ProductCard from "../components/ProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]); // New state for dynamic categories
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [activeCategory, products]);

  const loadData = async () => {
    try {
      setLoading(true);

      // 1. Fetch Categories
      const { data: catData } = await supabase.from("categories").select("*");
      if (catData) setCategories(catData);

      // 2. Fetch Products
      const { data: prodData } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (prodData) {
        const withMrp = prodData.map((p: any) => ({
          ...p,
          mrp: p.mrp ?? Math.round(p.price * 1.2),
        }));
        setProducts(withMrp);
        setFilteredProducts(withMrp);
      }
    } catch (error) {
      console.log("Data not available");
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    if (activeCategory === "all") {
      setFilteredProducts(products);
    } else {
      // Changed from p.category to p.category_slug to match DB schema
      setFilteredProducts(
        products.filter((p) => p.category_slug === activeCategory)
      );
    }
  };

  return (
    <div className="bg-white min-h-screen py-8 md:py-12 overflow-x-hidden">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-anton mb-2 md:mb-4 text-red-600">
            Our Products
          </h1>
          <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto font-poppins font-bold px-2">
            Browse our complete range of professional car detailing supplies
          </p>
        </div>

        {/* Dynamic Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12">
          {/* 'All' Button */}
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-6 md:px-8 py-2 md:py-3 font-anton transition-all text-sm md:text-base rounded min-h-10 md:min-h-auto ${
              activeCategory === "all"
                ? "bg-red-600 text-white shadow-lg uppercase"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All
          </button>

          {/* Dynamic Category Buttons */}
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-6 md:px-8 py-2 md:py-3 font-anton transition-all text-sm md:text-base rounded min-h-10 md:min-h-auto uppercase ${
                activeCategory === cat.slug
                  ? "bg-red-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product Count */}
        <div className="mb-4 md:mb-6 text-center">
          <p className="text-sm md:text-base text-gray-600 font-poppins font-bold">
            Showing{" "}
            <span className="font-bold text-red-600">
              {filteredProducts.length}
            </span>{" "}
            products
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 auto-rows-fr">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12 md:py-20">
                <p className="text-gray-500 text-base md:text-xl">
                  No products found in this category.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
