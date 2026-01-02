The issue with updating fields like `stock`, `featured`, and `image_url` often stems from how `Supabase` handles updates when the payload contains fields that might be `undefined` or when the logic for merging old and new data isn't explicit enough. Additionally, standard HTML checkbox behavior (where unchecked often results in `undefined` or just `false` which might be missed if logic checks for existence) can cause issues.

Here is the corrected and robust `ProductForm` component logic.

### Key Fixes Applied:
1.  **Explicit Boolean Handling:** Checkboxes for `featured` and `stock` now use strict boolean logic (`checked={!!formData.featured}`) to ensure they never fall into an indeterminate state.
2.  **Robust Image Logic:**
    *   If a **new file** is selected (`file` state exists), it uploads and uses the new URL.
    *   If **no new file** is selected, it explicitly uses `formData.image_url` (which is populated from `editingProduct` on mount).
    *   Added a fallback: `image_url: finalImageUrl || null` to ensure we send `null` instead of an empty string or undefined if there's no image, which Supabase handles better.
3.  **Payload Construction:** The payload now explicitly includes all fields every time to ensure the database row is fully updated to match the form state.

### Updated Code

```tsx
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
  Upload,
} from "lucide-react";

// --- Types ---
interface ProductFormProps {
  categories: Category[];
  editingProduct: Product | null;
  onCancel: () => void;
  onSuccess: () => void;
}

// --- Helper: Image Upload ---
const uploadImage = async (file: File): Promise<string> => {
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
    return data.secure_url;
  } catch (err: any) {
    console.error(err);
    throw new Error("Image upload failed: " + err.message);
  }
};

// --- Component: Product Form ---
const ProductForm = ({
  categories,
  editingProduct,
  onCancel,
  onSuccess,
}: ProductFormProps) => {
  // Initialize form data
  const [formData, setFormData] = useState<Partial<Product>>({
    category_slug: "",
    featured: false,
    stock: true,
    name: "",
    price: 0,
    mrp: 0,
    description: "",
    image_url: "",
  });
  
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  // Sync Form Data with Editing Product
  useEffect(() => {
    if (editingProduct) {
      setFormData({
        ...editingProduct,
        category_slug: editingProduct.category_slug || categories[0]?.slug || "",
        // Ensure booleans are strictly true/false, not null/undefined
        featured: !!editingProduct.featured,
        stock: editingProduct.stock !== false, // Default to true if undefined
        image_url: editingProduct.image_url || "",
      });
    } else {
      // Reset for Add Mode
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
    }
    setFile(null); // Always clear file input on switch
    setMessage(null);
  }, [editingProduct, categories]); // Depend on categories to set default slug if needed

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    // Validation
    if (!formData.name || formData.price === undefined || !formData.category_slug) {
      setMessage({ type: "error", text: "Please fill in all required fields." });
      return;
    }

    try {
      setUploading(true);

      // 1. Duplicate Name Check
      let query = supabase.from("products").select("id").eq("name", formData.name);
      if (editingProduct) {
        query = query.neq("id", editingProduct.id);
      }
      const { data: existing } = await query.single();

      if (existing) {
        setUploading(false);
        setMessage({
          type: "error",
          text: `Product "${formData.name}" already exists.`,
        });
        return;
      }

      // 2. Image Handling
      let finalImageUrl = formData.image_url; // Start with existing URL from state

      if (file) {
        // If a new file is selected, upload it and use the NEW url
        finalImageUrl = await uploadImage(file);
      }
      
      // 3. Prepare Payload
      // We construct the payload explicitly to ensure all fields (including booleans) are sent correctly
      const payload = {
        name: formData.name,
        category_slug: formData.category_slug,
        price: Number(formData.price),
        mrp: formData.mrp ? Number(formData.mrp) : null,
        description: formData.description,
        image_url: finalImageUrl || null, // Send null if string is empty
        featured: !!formData.featured,    // Force boolean
        stock: !!formData.stock,          // Force boolean
      };

      // 4. Submit to Supabase
      if (editingProduct) {
        const { error } = await supabase
          .from("products")
          .update(payload)
          .eq("id", editingProduct.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("products").insert([payload]);
        if (error) throw error;
      }

      // 5. Success
      onSuccess(); 
      
    } catch (error: any) {
      console.error(error);
      setMessage({ type: "error", text: error.message || "Operation failed" });
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
      {/* Form Header */}
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
            onClick={onCancel}
            className="text-sm text-gray-500 hover:text-red-600 flex items-center gap-1 font-bold bg-white px-3 py-1 rounded border border-gray-300 hover:border-red-300 transition-colors"
          >
            <X size={14} /> Cancel Edit
          </button>
        )}
      </div>

      {/* Messages */}
      {message && (
        <div
          className={`p-3 rounded text-sm font-bold flex items-center gap-2 ${
            message.type === "error"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message.type === "error" ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
          {message.text}
        </div>
      )}

      {/* Fields Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Name */}
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

        {/* Category */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold text-gray-700">Category*</label>
          <select
            className="p-2 border rounded bg-white"
            value={formData.category_slug}
            onChange={(e) =>
              setFormData({ ...formData, category_slug: e.target.value })
            }
          >
            {/* Fallback option if no categories exist */}
            {categories.length === 0 && <option value="">Loading...</option>}
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold text-gray-700">Price (₹)*</label>
          <input
            required
            type="number"
            min="0"
            placeholder="Ex: 499"
            className="p-2 border rounded"
            onChange={(e) =>
              setFormData({ ...formData, price: Number(e.target.value) })
            }
            value={formData.price ?? 0}
          />
        </div>

        {/* MRP */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold text-gray-700">
            MRP (Optional)
          </label>
          <input
            type="number"
            min="0"
            placeholder="Ex: 699"
            className="p-2 border rounded"
            onChange={(e) =>
              setFormData({ ...formData, mrp: Number(e.target.value) })
            }
            value={formData.mrp ?? ""}
          />
        </div>

        {/* Checkboxes */}
        <div className="md:col-span-2 flex flex-wrap gap-4">
          <div className="flex items-center gap-2 bg-white p-3 rounded border flex-1 min-w-[200px] cursor-pointer" onClick={() => setFormData(prev => ({ ...prev, featured: !prev.featured }))}>
            <input
              id="featured-checkbox"
              type="checkbox"
              className="w-5 h-5 accent-red-600 cursor-pointer"
              checked={!!formData.featured}
              onChange={() => {}} // Handled by parent div for easier clicking
            />
            <label
              htmlFor="featured-checkbox"
              className="font-bold text-gray-700 cursor-pointer select-none flex items-center gap-2"
              onClick={(e) => e.stopPropagation()} // Prevent double toggle
            >
              <Star size={16} className="text-yellow-500 fill-yellow-500" />{" "}
              Best Seller
            </label>
          </div>

          <div className="flex items-center gap-2 bg-white p-3 rounded border flex-1 min-w-[200px] cursor-pointer" onClick={() => setFormData(prev => ({ ...prev, stock: !prev.stock }))}>
            <input
              id="stock-checkbox"
              type="checkbox"
              className="w-5 h-5 accent-black cursor-pointer"
              checked={!formData.stock} // Checked means "Out of Stock" (stock is false)
              onChange={() => {}} // Handled by parent div
            />
            <label
              htmlFor="stock-checkbox"
              className="font-bold text-gray-700 cursor-pointer select-none flex items-center gap-2 text-red-600"
               onClick={(e) => e.stopPropagation()}
            >
              <Slash size={16} /> Mark as "Out of Stock"
            </label>
          </div>
        </div>

        {/* Image Upload */}
        <div className="flex flex-col gap-1 md:col-span-2">
          <label className="text-sm font-bold text-gray-700">
            Image {editingProduct && "(Upload new to replace)"}
          </label>
          <div className="flex gap-4 items-center">
            {/* Image Preview */}
            <div className="w-16 h-16 border rounded bg-gray-50 flex items-center justify-center overflow-hidden flex-shrink-0 relative group">
               {file ? (
                  <img src={URL.createObjectURL(file)} alt="New" className="w-full h-full object-cover" />
               ) : formData.image_url ? (
                  <img src={formData.image_url} alt="Current" className="w-full h-full object-cover" />
               ) : (
                  <Upload size={20} className="text-gray-400" />
               )}
            </div>

            <div className="flex-1">
                <input
                id="product-file-input"
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="p-2 border rounded bg-white w-full"
                />
                {editingProduct && !file && (
                    <p className="text-xs text-gray-500 mt-1">Current image: <a href={formData.image_url || "#"} target="_blank" className="text-blue-500 hover:underline truncate inline-block max-w-[200px] align-bottom">{formData.image_url ? "View Link" : "None"}</a></p>
                )}
            </div>
          </div>
        </div>
      </div>

      <textarea
        placeholder="Description"
        className="p-2 border rounded w-full"
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

// --- Main Page Component ---
export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [activeTab, setActiveTab] = useState<"products" | "categories" | "testimonials">("products");
  
  // Data
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Global Feedback
  const [globalMessage, setGlobalMessage] = useState<string | null>(null);

  useEffect(() => {
    if (globalMessage) {
      const timer = setTimeout(() => setGlobalMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [globalMessage]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === import.meta.env.VITE_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchData();
    } else {
      alert("Incorrect Password");
    }
  };

  const fetchData = async () => {
    try {
      const { data: p } = await supabase.from("products").select("*").order("created_at", { ascending: false });
      if (p) setProducts(p);

      const { data: c } = await supabase.from("categories").select("*");
      if (c) setCategories(c);

      const { data: t } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
      if (t) setTestimonials(t);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleDelete = async (table: string, id: string) => {
    if (!confirm("Delete this item?")) return;
    try {
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;
      setGlobalMessage("Item deleted successfully");
      if (editingProduct?.id === id) setEditingProduct(null);
      fetchData();
    } catch (err: any) {
      alert("Delete failed: " + err.message);
    }
  };

  // 2. Category Form
  const CategoryForm = () => {
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    
    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!name || !slug) return;
        const { error } = await supabase.from("categories").insert([{ name, slug }]);
        if(error) alert(error.message);
        else {
            setGlobalMessage("Category Added");
            setName(""); setSlug("");
            fetchData();
        }
    }
    return (
        <form onSubmit={submit} className="bg-gray-100 p-6 rounded-lg mb-8 flex flex-col md:flex-row gap-4 items-end border">
             <div className="flex-1 w-full">
                <label className="text-sm font-bold text-gray-700 block mb-1">Display Name</label>
                <input required placeholder="Ex: Car Shampoos" value={name} onChange={e=>setName(e.target.value)} className="p-2 border rounded w-full"/>
             </div>
             <div className="flex-1 w-full">
                <label className="text-sm font-bold text-gray-700 block mb-1">Slug ID</label>
                <input required placeholder="car_shampoos" value={slug} onChange={e=>setSlug(e.target.value)} className="p-2 border rounded w-full"/>
             </div>
             <button className="bg-blue-600 text-white py-2 px-6 rounded font-bold">Add Category</button>
        </form>
    )
  }

  // 3. Testimonial Form
  const TestimonialForm = () => {
      const [t, setT] = useState({customer_name: "", rating: 5, comment: ""});
      const submit = async (e: React.FormEvent) => {
          e.preventDefault();
          const { error } = await supabase.from("testimonials").insert([t]);
          if(error) alert(error.message);
          else {
              setGlobalMessage("Testimonial Added");
              setT({customer_name: "", rating: 5, comment: ""});
              fetchData();
          }
      }
      return (
        <form onSubmit={submit} className="bg-gray-100 p-6 rounded-lg mb-8 grid gap-4 border">
            <div className="grid md:grid-cols-2 gap-4">
                <input required placeholder="Name" className="p-2 border rounded" value={t.customer_name} onChange={e=>setT({...t, customer_name: e.target.value})} />
                <input required type="number" min="1" max="5" className="p-2 border rounded" value={t.rating} onChange={e=>setT({...t, rating: Number(e.target.value)})} />
            </div>
            <textarea required placeholder="Comment" className="p-2 border rounded" value={t.comment} onChange={e=>setT({...t, comment: e.target.value})} />
            <button className="bg-green-600 text-white py-2 px-4 rounded font-bold">Add Testimonial</button>
        </form>
      )
  }

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-96 border border-gray-100">
          <h1 className="text-3xl font-anton text-center mb-6 text-red-600">Admin Access</h1>
          <form onSubmit={handleLogin}>
            <input type="password" placeholder="Password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className="w-full p-3 border border-gray-300 rounded mb-4" />
            <button className="w-full bg-black text-white py-3 font-bold rounded">LOGIN</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {globalMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white p-4 font-bold rounded shadow-lg flex gap-2 animate-bounce-in">
            <CheckCircle /> {globalMessage}
        </div>
      )}

      {/* Header */}
      <div className="bg-black text-white p-4 flex justify-between items-center sticky top-0 z-40 shadow-md">
        <h1 className="text-2xl font-anton">CDM <span className="text-red-600">ADMIN</span></h1>
        <button onClick={() => setIsAuthenticated(false)} className="flex items-center gap-2 text-gray-300 hover:text-white">
          <LogOut size={18} /> Logout
        </button>
      </div>

      <div className="container mx-auto p-4 md:p-8 max-w-5xl">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b overflow-x-auto">
          {["products", "categories", "testimonials"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab as any)} className={`pb-3 px-6 font-bold capitalize ${activeTab === tab ? "border-b-4 border-red-600 text-red-600" : "text-gray-500"}`}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "products" && (
          <div className="animate-fade-in">
            {/* PRODUCT FORM COMPONENT */}
            <ProductForm 
                categories={categories}
                editingProduct={editingProduct}
                onCancel={() => setEditingProduct(null)}
                onSuccess={() => {
                    setEditingProduct(null);
                    setGlobalMessage(editingProduct ? "Product Updated" : "Product Added");
                    fetchData();
                }}
            />

            {/* List & Search */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
              <h3 className="font-bold text-gray-500">Existing Products ({filteredProducts.length})</h3>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-full text-sm" />
                {searchQuery && <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><X size={14} /></button>}
              </div>
            </div>

            <div className="grid gap-4">
              {filteredProducts.map((p) => (
                <div key={p.id} className={`flex items-center justify-between border p-4 rounded-lg bg-white ${editingProduct?.id === p.id ? "ring-2 ring-yellow-400 border-yellow-400 bg-yellow-50" : ""}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden relative">
                        {p.image_url ? <img src={p.image_url} className={`w-full h-full object-cover ${!p.stock && "grayscale opacity-50"}`} /> : <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Img</div>}
                        {!p.stock && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-[10px] font-bold">NO STOCK</div>}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h4 className="font-bold text-lg">{p.name}</h4>
                            {p.featured && <Star size={12} className="fill-yellow-500 text-yellow-500" />}
                        </div>
                        <p className="text-sm text-gray-500">₹{p.price} • {p.category_slug}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setEditingProduct(p); window.scrollTo({top:0, behavior:'smooth'}); }} className="text-blue-500 p-2 hover:bg-blue-50 rounded"><Pencil size={20} /></button>
                    <button onClick={() => handleDelete("products", p.id)} className="text-red-500 p-2 hover:bg-red-50 rounded"><Trash2 size={20} /></button>
                  </div>
                </div>
              ))}
              {filteredProducts.length === 0 && <p className="text-center text-gray-400 py-8">No products found.</p>}
            </div>
          </div>
        )}

        {activeTab === "categories" && (
            <div>
                <CategoryForm />
                <div className="grid gap-3">
                    {categories.map(c => (
                        <div key={c.id} className="flex justify-between p-4 border rounded bg-white">
                            <div><span className="font-bold block">{c.name}</span><span className="text-sm text-gray-500">{c.slug}</span></div>
                            <button onClick={()=>handleDelete("categories", c.id)} className="text-red-500"><Trash2/></button>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {activeTab === "testimonials" && (
            <div>
                <TestimonialForm />
                <div className="grid md:grid-cols-2 gap-4">
                    {testimonials.map(t => (
                        <div key={t.id} className="border p-4 rounded bg-white relative">
                            <button onClick={()=>handleDelete("testimonials", t.id)} className="absolute top-2 right-2 text-red-500"><Trash2 size={16}/></button>
                            <p className="italic text-gray-600 mb-2">"{t.comment}"</p>
                            <div className="font-bold text-sm">{t.customer_name} <span className="text-yellow-500">★ {t.rating}</span></div>
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
```
