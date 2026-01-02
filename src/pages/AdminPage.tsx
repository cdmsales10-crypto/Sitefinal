import { useState, useEffect } from "react";
import { supabase, Product, Category, Testimonial } from "../lib/supabase";
import {
  Trash2,
  Plus,
  LogOut,
  AlertCircle,
  CheckCircle,
  Star,
  Slash,
  Pencil,
  X,
  Search,
} from "lucide-react";

export default function AdminPage() {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  // Data State
  const [activeTab, setActiveTab] = useState<
    "products" | "categories" | "testimonials"
  >("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  // Search State
  const [searchQuery, setSearchQuery] = useState("");

  // Edit State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Feedback State
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Clear messages after 3 seconds
  useEffect(() => {
    if (errorMessage || successMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
        setSuccessMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, successMessage]);

  // --- Login Logic ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === import.meta.env.VITE_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchData();
    } else {
      setErrorMessage("Incorrect Password");
    }
  };

  // --- Data Fetching ---
  const fetchData = async () => {
    try {
      const { data: p, error: pError } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (pError) throw pError;
      if (p) setProducts(p);

      const { data: c, error: cError } = await supabase
        .from("categories")
        .select("*");
      if (cError) throw cError;
      if (c) setCategories(c);

      const { data: t, error: tError } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });
      if (tError) throw tError;
      if (t) setTestimonials(t);
    } catch (error: any) {
      console.error("Error fetching data:", error);
      setErrorMessage("Failed to load data: " + error.message);
    }
  };

  // --- Image Upload Helper ---
  const uploadImage = async (file: File): Promise<string> => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        { method: "POST", body: formData }
      );

      if (!res.ok) throw new Error("Cloudinary upload failed");

      const data = await res.json();
      setUploading(false);
      return data.secure_url;
    } catch (err: any) {
      console.error(err);
      setUploading(false);
      throw new Error("Image upload failed: " + err.message);
    }
  };

  // --- Handlers ---
  const handleDelete = async (table: string, id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;

      setSuccessMessage("Item deleted successfully");
      // If deleted product was being edited, clear edit state
      if (editingProduct?.id === id) {
        setEditingProduct(null);
      }
      fetchData();
    } catch (error: any) {
      setErrorMessage("Delete failed: " + error.message);
    }
  };

  const startEditing = (product: Product) => {
    setEditingProduct(product);
    // Scroll to top to see form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- Sub-Components (Forms) ---

  // 1. Product Form
  const ProductForm = () => {
    const [formData, setFormData] = useState<Partial<Product>>({
      category_slug: categories[0]?.slug || "",
      featured: false,
      stock: true,
      name: "",
      price: 0,
      mrp: 0,
      description: "",
      image_url: "",
    });
    const [file, setFile] = useState<File | null>(null);

    // Reset form when editingProduct or categories change
    useEffect(() => {
      if (editingProduct) {
        setFormData({ ...editingProduct });
      } else {
        setFormData({
          category_slug: categories[0]?.slug || "",
          featured: false,
          stock: true,
          name: "",
          price: 0,
          mrp: 0,
          description: "",
          image_url: "",
        });
        setFile(null);
      }
    }, [editingProduct, categories]);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setErrorMessage(null);

      // Validation
      if (
        !formData.name?.trim() ||
        formData.price === undefined ||
        !formData.category_slug
      ) {
        setErrorMessage("Please fill in all required fields.");
        return;
      }

      if (formData.price <= 0) {
        setErrorMessage("Price must be greater than 0.");
        return;
      }

      try {
        setUploading(true);

        // Duplicate Name Check - FIXED
        // Build query to check for duplicate names
        let query = supabase
          .from("products")
          .select("id")
          .eq("name", formData.name.trim());

        // If editing, exclude current product ID from check
        if (editingProduct) {
          query = query.neq("id", editingProduct.id);
        }

        // Use .maybeSingle() instead of .single() to avoid error when no match
        const { data: existing, error: dupError } = await query.maybeSingle();

        if (dupError) {
          setUploading(false);
          setErrorMessage("Error checking for duplicates: " + dupError.message);
          return;
        }

        if (existing) {
          setUploading(false);
          setErrorMessage(
            `A product with the name "${formData.name}" already exists.`
          );
          return;
        }

        // Image Handling Logic - FIXED
        let imageUrl = formData.image_url || ""; // Default to existing URL

        if (file) {
          // If new file selected, upload it
          imageUrl = await uploadImage(file);
        } else if (editingProduct && !file) {
          // If editing and no new file, preserve the original image URL
          imageUrl = editingProduct.image_url || "";
        }

        // Build payload - FIXED MRP handling
        const payload = {
          name: formData.name.trim(),
          category_slug: formData.category_slug,
          price: Number(formData.price),
          mrp: formData.mrp && Number(formData.mrp) > 0 ? Number(formData.mrp) : null,
          description: formData.description?.trim() || "",
          image_url: imageUrl,
          featured: formData.featured || false,
          stock: formData.stock !== false,
        };

        if (editingProduct) {
          const { error } = await supabase
            .from("products")
            .update(payload)
            .eq("id", editingProduct.id);
          if (error) throw error;
          setSuccessMessage("Product updated successfully!");
        } else {
          const { error } = await supabase.from("products").insert([payload]);
          if (error) throw error;
          setSuccessMessage("Product added successfully!");
        }

        // Cleanup - FIXED: Properly clear file input
        setEditingProduct(null);
        setFile(null);
        setFormData({
          category_slug: categories[0]?.slug || "",
          featured: false,
          stock: true,
          name: "",
          price: 0,
          mrp: 0,
          description: "",
          image_url: "",
        });
        
        const fileInput = document.getElementById(
          "product-file-input"
        ) as HTMLInputElement;
        if (fileInput) fileInput.value = "";

        fetchData();
      } catch (error: any) {
        setErrorMessage(error.message || "Operation failed");
      } finally {
        setUploading(false);
      }
    };

    return (
      <form
        onSubmit={handleSubmit}
        className={`p-6 rounded-lg mb-8 grid gap-4 border shadow-sm transition-colors ${
          editingProduct
            ? "bg-yellow-50 border-yellow-200"
            : "bg-gray-100 border-gray-200"
        }`}
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold font-anton text-gray-800 flex items-center gap-2">
            {editingProduct ? (
              <>
                <Pencil size={20} className="text-yellow-600" /> Edit Product
              </>
            ) : (
              <>
                <Plus size={20} className="text-red-600" /> Add New Product
              </>
            )}
          </h3>
          {editingProduct && (
            <button
              type="button"
              onClick={() => {
                setEditingProduct(null);
                setFile(null);
                const fileInput = document.getElementById(
                  "product-file-input"
                ) as HTMLInputElement;
                if (fileInput) fileInput.value = "";
              }}
              className="text-sm text-gray-500 hover:text-red-600 flex items-center gap-1 font-bold bg-white px-3 py-1 rounded border border-gray-300 hover:border-red-300 transition-colors"
            >
              <X size={14} /> Cancel Edit
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-700">Name*</label>
            <input
              required
              placeholder="Ex: Carnauba Wax"
              className="p-2 border rounded"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              value={formData.name || ""}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-700">Category*</label>
            <select
              className="p-2 border rounded"
              value={formData.category_slug}
              onChange={(e) =>
                setFormData({ ...formData, category_slug: e.target.value })
              }
            >
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-700">
              Price (₹)*
            </label>
            <input
              required
              type="number"
              min="1"
              step="0.01"
              placeholder="Ex: 499"
              className="p-2 border rounded"
              onChange={(e) =>
                setFormData({ ...formData, price: Number(e.target.value) })
              }
              value={formData.price || ""}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-700">
              MRP (Optional)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="Ex: 699"
              className="p-2 border rounded"
              onChange={(e) =>
                setFormData({ 
                  ...formData, 
                  mrp: e.target.value ? Number(e.target.value) : 0 
                })
              }
              value={formData.mrp || ""}
            />
          </div>

          <div className="md:col-span-2 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white p-3 rounded border flex-1 min-w-[200px]">
              <input
                id="featured-checkbox"
                type="checkbox"
                className="w-5 h-5 accent-red-600 cursor-pointer"
                checked={formData.featured || false}
                onChange={(e) =>
                  setFormData({ ...formData, featured: e.target.checked })
                }
              />
              <label
                htmlFor="featured-checkbox"
                className="font-bold text-gray-700 cursor-pointer select-none flex items-center gap-2"
              >
                <Star size={16} className="text-yellow-500 fill-yellow-500" />{" "}
                Best Seller
              </label>
            </div>

            <div className="flex items-center gap-2 bg-white p-3 rounded border flex-1 min-w-[200px]">
              <input
                id="stock-checkbox"
                type="checkbox"
                className="w-5 h-5 accent-black cursor-pointer"
                checked={formData.stock === false}
                onChange={(e) =>
                  setFormData({ ...formData, stock: !e.target.checked })
                }
              />
              <label
                htmlFor="stock-checkbox"
                className="font-bold text-gray-700 cursor-pointer select-none flex items-center gap-2 text-red-600"
              >
                <Slash size={16} /> Mark as "Out of Stock"
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-sm font-bold text-gray-700">
              Image {editingProduct && "(Leave empty to keep current image)"}
            </label>
            <div className="flex gap-4 items-center">
              {formData.image_url && (
                <img
                  src={formData.image_url}
                  alt="Current"
                  className="w-12 h-12 object-cover rounded border"
                />
              )}
              <input
                id="product-file-input"
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="p-2 border rounded bg-white flex-1"
              />
            </div>
          </div>
        </div>
        <textarea
          placeholder="Description"
          className="p-2 border rounded w-full"
          rows={3}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          value={formData.description || ""}
        />
        <button
          disabled={uploading}
          type="submit"
          className={`${
            editingProduct
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-red-600 hover:bg-red-700"
          } text-white py-3 px-6 rounded flex items-center justify-center gap-2 font-bold transition-all disabled:opacity-50 text-lg shadow-md`}
        >
          {uploading ? (
            "Processing..."
          ) : editingProduct ? (
            <>
              <CheckCircle size={20} /> Update Product
            </>
          ) : (
            <>
              <Plus size={20} /> Add Product
            </>
          )}
        </button>
      </form>
    );
  };

  // 2. Category Form
  const CategoryForm = () => {
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        if (!name.trim() || !slug.trim()) {
          setErrorMessage("Please fill in both fields.");
          return;
        }
        
        // FIXED: Use maybeSingle() instead of single()
        const { data: existing, error: dupError } = await supabase
          .from("categories")
          .select("id")
          .eq("slug", slug.trim())
          .maybeSingle();
          
        if (dupError) {
          setErrorMessage("Error checking for duplicates: " + dupError.message);
          return;
        }
        
        if (existing) {
          setErrorMessage(`Category ID "${slug}" already exists.`);
          return;
        }
        
        const { error } = await supabase
          .from("categories")
          .insert([{ name: name.trim(), slug: slug.trim() }]);
        if (error) throw error;
        setSuccessMessage("Category added successfully");
        setName("");
        setSlug("");
        fetchData();
      } catch (error: any) {
        setErrorMessage("Failed to add category: " + error.message);
      }
    };

    return (
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-6 rounded-lg mb-8 flex flex-col md:flex-row gap-4 items-end border border-gray-200 shadow-sm"
      >
        <div className="flex-1 w-full">
          <label className="text-sm font-bold text-gray-700 block mb-1">
            Display Name
          </label>
          <input
            required
            placeholder="Ex: Car Shampoos"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="flex-1 w-full">
          <label className="text-sm font-bold text-gray-700 block mb-1">
            Unique ID (Slug)
          </label>
          <input
            required
            placeholder="Ex: car_shampoos"
            value={slug}
            onChange={(e) =>
              setSlug(e.target.value.toLowerCase().replace(/\s+/g, "_"))
            }
            className="p-2 border rounded w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 font-bold h-[42px] w-full md:w-auto"
        >
          Add Category
        </button>
      </form>
    );
  };

  // 3. Testimonial Form
  const TestimonialForm = () => {
    const [t, setT] = useState<Partial<Testimonial>>({ 
      rating: 5, 
      customer_name: "", 
      comment: "" 
    });

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        if (!t.customer_name?.trim() || !t.comment?.trim()) {
          setErrorMessage("Please fill in all fields.");
          return;
        }
        
        const payload = {
          customer_name: t.customer_name.trim(),
          comment: t.comment.trim(),
          rating: t.rating || 5,
        };
        
        const { error } = await supabase.from("testimonials").insert([payload]);
        if (error) throw error;
        setSuccessMessage("Testimonial added successfully");
        setT({ rating: 5, customer_name: "", comment: "" });
        fetchData();
      } catch (error: any) {
        setErrorMessage("Failed to add testimonial: " + error.message);
      }
    };

    return (
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-6 rounded-lg mb-8 grid gap-4 border border-gray-200 shadow-sm"
      >
        <h3 className="text-xl font-bold font-anton text-gray-800">
          Add Testimonial
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            required
            placeholder="Customer Name"
            className="p-2 border rounded"
            value={t.customer_name || ""}
            onChange={(e) => setT({ ...t, customer_name: e.target.value })}
          />
          <input
            required
            type="number"
            min="1"
            max="5"
            placeholder="Rating (1-5)"
            className="p-2 border rounded"
            value={t.rating || 5}
            onChange={(e) => setT({ ...t, rating: Number(e.target.value) })}
          />
        </div>
        <textarea
          required
          placeholder="Comment"
          className="p-2 border rounded w-full"
          rows={3}
          value={t.comment || ""}
          onChange={(e) => setT({ ...t, comment: e.target.value })}
        />
        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 font-bold"
        >
          Add Testimonial
        </button>
      </form>
    );
  };

  // --- Search Logic ---
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- Main Render ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-96 border border-gray-100">
          <h1 className="text-3xl font-anton text-center mb-6 text-red-600">
            Admin Access
          </h1>

          {errorMessage && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm flex items-center gap-2">
              <AlertCircle size={16} /> {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter Admin Password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="submit"
              className="w-full bg-black text-white py-3 font-bold hover:bg-gray-800 rounded transition-all transform active:scale-95"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Toast Messages */}
      {(errorMessage || successMessage) && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[60] min-w-[300px] text-center shadow-lg rounded-lg overflow-hidden animate-bounce-in">
          {errorMessage && (
            <div className="bg-red-600 text-white p-4 font-bold flex items-center justify-center gap-2">
              <AlertCircle /> {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="bg-green-600 text-white p-4 font-bold flex items-center justify-center gap-2">
              <CheckCircle /> {successMessage}
            </div>
          )}
        </div>
      )}

      {/* Header */}
      <div className="bg-black text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
        <h1 className="text-2xl font-anton tracking-wide">
          CDM <span className="text-red-600">ADMIN</span>
        </h1>
        <button
          onClick={() => setIsAuthenticated(false)}
          className="flex items-center gap-2 text-gray-300 hover:text-white bg-gray-800 px-4 py-2 rounded transition-all"
        >
          <LogOut size={18} /> <span className="hidden sm:inline">Logout</span>
        </button>
      </div>

      <div className="container mx-auto p-4 md:p-8 max-w-5xl">
        {/* Tabs */}
        <div className="flex gap-2 md:gap-4 mb-8 border-b border-gray-200 overflow-x-auto">
          {["products", "categories", "testimonials"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`pb-3 px-6 font-bold capitalize whitespace-nowrap transition-all ${
                activeTab === tab
                  ? "border-b-4 border-red-600 text-red-600"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "products" && (
          <div className="animate-fade-in">
            <ProductForm />

            <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
              <h3 className="font-bold text-gray-500">
                Existing Products ({filteredProducts.length})
              </h3>

              {/* Search Bar */}
              <div className="relative w-full md:w-64">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200 text-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            <div className="grid gap-4">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className={`flex items-center justify-between border p-4 rounded-lg hover:shadow-md transition-shadow bg-white ${
                    editingProduct?.id === p.id
                      ? "ring-2 ring-yellow-400 border-yellow-400 bg-yellow-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0 overflow-hidden relative">
                      {p.image_url ? (
                        <img
                          src={p.image_url}
                          alt={p.name}
                          className={`w-full h-full object-cover ${
                            p.stock === false ? "grayscale opacity-50" : ""
                          }`}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                          No Img
                        </div>
                      )}
                      {p.featured && (
                        <div
                          className="absolute top-0 right-0 bg-yellow-400 text-xs p-1 rounded-bl shadow-sm z-10"
                          title="Best Seller"
                        >
                          <Star size={10} className="fill-black text-black" />
                        </div>
                      )}
                      {p.stock === false && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-[10px] font-bold text-center leading-none">
                          NO STOCK
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-lg text-gray-800">
                          {p.name}
                        </h4>
                        {p.featured && (
                          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full font-bold border border-yellow-200">
                            Best Seller
                          </span>
                        )}
                        {p.stock === false && (
                          <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full font-bold border border-red-200">
                            Out of Stock
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 font-mono">
                        ₹{p.price} <span className="mx-2">•</span>{" "}
                        {p.category_slug}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditing(p)}
                      className="text-blue-500 hover:bg-blue-50 p-2 rounded transition-colors"
                      title="Edit Product"
                    >
                      <Pencil size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete("products", p.id)}
                      className="text-red-500 hover:bg-red-50 p-2 rounded transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
              {filteredProducts.length === 0 && (
                <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <p className="text-gray-400 mb-2">
                    {searchQuery
                      ? `No products match "${searchQuery}"`
                      : "No products found."}
                  </p>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-sm text-red-600 font-bold hover:underline"
                    >
                      Clear Search
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === "categories" && (
          <div className="animate-fade-in">
            <CategoryForm />
            <h3 className="font-bold text-gray-500 mb-4">
              Existing Categories ({categories.length})
            </h3>
            <div className="grid gap-3">
              {categories.map((c) => (
                <div
                  key={c.id}
                  className="flex justify-between items-center border p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-all"
                >
                  <div>
                    <span className="font-bold text-lg text-gray-800 block">
                      {c.name}
                    </span>
                    <span className="text-gray-500 text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                      ID: {c.slug}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete("categories", c.id)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded transition-colors"
                    title="Delete Category"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Testimonials Tab */}
        {activeTab === "testimonials" && (
          <div className="animate-fade-in">
            <TestimonialForm />
            <h3 className="font-bold text-gray-500 mb-4">
              Existing Testimonials ({testimonials.length})
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="border border-gray-200 p-6 rounded-lg relative hover:shadow-lg transition-shadow bg-white"
                >
                  <button
                    onClick={() => handleDelete("testimonials", t.id)}
                    className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                  <p className="italic text-gray-600 mb-4 text-lg">
                    "{t.comment}"
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-800">
                      {t.customer_name}
                    </span>
                    <span className="text-yellow-500 text-sm font-bold">
                      ★ {t.rating}/5
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
