// import { useEffect, useMemo, useState } from "react";
// import { supabase, Product, Category, Testimonial } from "../lib/supabase";
// import {
//   Trash2,
//   Plus,
//   LogOut,
//   AlertCircle,
//   CheckCircle,
//   Star,
//   Slash,
//   Pencil,
//   X,
//   Search,
// } from "lucide-react";

// type Tab = "products" | "categories" | "testimonials";

// export default function AdminPage() {
//   // ---- Auth state (Supabase Auth) ----
//   const [authLoading, setAuthLoading] = useState(true);
//   const [session, setSession] = useState<any>(null);

//   // login form
//   const [emailInput, setEmailInput] = useState("");
//   const [passwordInput, setPasswordInput] = useState("");

//   // ---- Data state ----
//   const [activeTab, setActiveTab] = useState<Tab>("products");
//   const [products, setProducts] = useState<Product[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

//   // ---- UI state ----
//   const [searchQuery, setSearchQuery] = useState("");
//   const [editingProduct, setEditingProduct] = useState<Product | null>(null);

//   // feedback state
//   const [uploading, setUploading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);

//   // Clear messages after 3 seconds
//   useEffect(() => {
//     if (!errorMessage && !successMessage) return;
//     const timer = setTimeout(() => {
//       setErrorMessage(null);
//       setSuccessMessage(null);
//     }, 3000);
//     return () => clearTimeout(timer);
//   }, [errorMessage, successMessage]);

//   // ---- Auth bootstrap ----
//   useEffect(() => {
//     let mounted = true;

//     supabase.auth.getSession().then(({ data }) => {
//       if (!mounted) return;
//       setSession(data.session ?? null);
//       setAuthLoading(false);
//     });

//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((_event, newSession) => {
//       setSession(newSession ?? null);
//     }); // listen to auth events [web:21]

//     return () => {
//       mounted = false;
//       subscription.unsubscribe();
//     };
//   }, []);

//   // Fetch data when session becomes available
//   useEffect(() => {
//     if (!session) return;
//     fetchData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [session?.user?.id]);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setErrorMessage(null);
//     setSuccessMessage(null);

//     try {
//       setUploading(true);
//       const { error } = await supabase.auth.signInWithPassword({
//         email: emailInput.trim(),
//         password: passwordInput,
//       }); // password sign-in [web:25]

//       if (error) throw error;

//       setSuccessMessage("Logged in successfully");
//       setPasswordInput("");
//     } catch (err: any) {
//       setErrorMessage(err?.message || "Login failed");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleLogout = async () => {
//     setErrorMessage(null);
//     setSuccessMessage(null);
//     const { error } = await supabase.auth.signOut(); // removes session + triggers SIGNED_OUT [web:29]
//     if (error) setErrorMessage(error.message);
//     setEditingProduct(null);
//   };

//   // ---- Data fetching ----
//   const fetchData = async () => {
//     try {
//       setErrorMessage(null);

//       const { data: p, error: pError } = await supabase
//         .from("products")
//         .select("*")
//         .order("created_at", { ascending: false });
//       if (pError) throw pError;
//       setProducts(p || []);

//       const { data: c, error: cError } = await supabase
//         .from("categories")
//         .select("*")
//         .order("name", { ascending: true });
//       if (cError) throw cError;
//       setCategories(c || []);

//       const { data: t, error: tError } = await supabase
//         .from("testimonials")
//         .select("*")
//         .order("created_at", { ascending: false });
//       if (tError) throw tError;
//       setTestimonials(t || []);
//     } catch (error: any) {
//       console.error("Error fetching data:", error);
//       setErrorMessage("Failed to load data: " + (error?.message || "Unknown"));
//     }
//   };

//   // ---- Image upload ----
//   const uploadImage = async (file: File): Promise<string> => {
//     setUploading(true);

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

//     try {
//       const res = await fetch(
//         `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
//         { method: "POST", body: formData }
//       );

//       if (!res.ok) throw new Error("Cloudinary upload failed");

//       const data = await res.json();
//       if (!data?.secure_url) throw new Error("Cloudinary did not return secure_url");
//       return data.secure_url as string;
//     } finally {
//       setUploading(false);
//     }
//   };

//   // ---- Delete handler ----
//   const handleDelete = async (table: string, id: string) => {
//     if (!confirm("Are you sure you want to delete this item?")) return;

//     try {
//       setErrorMessage(null);
//       setUploading(true);

//       const { error } = await supabase.from(table).delete().eq("id", id);
//       if (error) throw error;

//       setSuccessMessage("Item deleted successfully");

//       if (editingProduct?.id === id) setEditingProduct(null);

//       await fetchData();
//     } catch (error: any) {
//       setErrorMessage("Delete failed: " + (error?.message || "Unknown"));
//     } finally {
//       setUploading(false);
//     }
//   };

//   const startEditing = (product: Product) => {
//     setEditingProduct(product);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // ---- Search ----
//   const filteredProducts = useMemo(() => {
//     const q = searchQuery.trim().toLowerCase();
//     if (!q) return products;
//     return products.filter((p) => (p.name || "").toLowerCase().includes(q));
//   }, [products, searchQuery]);

//   // ----------------- Sub Components -----------------

//   const ProductForm = () => {
//     const emptyForm: Partial<Product> = {
//       category_slug: categories[0]?.slug || "",
//       featured: false,
//       stock: true,
//       name: "",
//       price: 0,
//       mrp: 0,
//       description: "",
//       image_url: "",
//     };

//     const [formData, setFormData] = useState<Partial<Product>>(emptyForm);
//     const [file, setFile] = useState<File | null>(null);

//     // Reset form when editing changes
//     useEffect(() => {
//       if (editingProduct) {
//         setFormData({ ...editingProduct });
//         setFile(null);
//         const fileInput = document.getElementById("product-file-input") as HTMLInputElement | null;
//         if (fileInput) fileInput.value = "";
//       } else {
//         setFormData({
//           ...emptyForm,
//           category_slug: categories[0]?.slug || "",
//         });
//         setFile(null);
//         const fileInput = document.getElementById("product-file-input") as HTMLInputElement | null;
//         if (fileInput) fileInput.value = "";
//       }
//       // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [editingProduct]);

//     // If categories load after first render, ensure category_slug is not empty (for new product)
//     useEffect(() => {
//       if (editingProduct) return;
//       if (!formData.category_slug && categories.length > 0) {
//         setFormData((prev) => ({ ...prev, category_slug: categories[0].slug }));
//       }
//       // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [categories.length]);

//     const handleSubmit = async (e: React.FormEvent) => {
//       e.preventDefault();
//       setErrorMessage(null);
//       setSuccessMessage(null);

//       // Validation
//       if (!formData.name?.trim() || !formData.category_slug) {
//         setErrorMessage("Please fill in all required fields.");
//         return;
//       }
//       if (Number(formData.price) <= 0) {
//         setErrorMessage("Price must be greater than 0.");
//         return;
//       }

//       try {
//         setUploading(true);

//         const normalizedName = formData.name.trim();

//         // Duplicate Name Check (exclude current product when editing)
//         let dupQuery = supabase
//           .from("products")
//           .select("id")
//           .eq("name", normalizedName);

//         if (editingProduct?.id) {
//           dupQuery = dupQuery.neq("id", editingProduct.id);
//         }

//         const { data: existing, error: dupError } = await dupQuery.maybeSingle();
//         if (dupError) throw dupError;
//         if (existing) {
//           setErrorMessage(`A product with the name "${normalizedName}" already exists.`);
//           return;
//         }

//         // Image logic
//         let imageUrl = (formData.image_url || "").trim();

//         if (file) {
//           imageUrl = await uploadImage(file);
//         } else if (editingProduct?.image_url) {
//           // keep old image if no new file chosen
//           imageUrl = editingProduct.image_url;
//         }

//         const payload = {
//           name: normalizedName,
//           category_slug: formData.category_slug,
//           price: Number(formData.price),
//           mrp: formData.mrp && Number(formData.mrp) > 0 ? Number(formData.mrp) : null,
//           description: (formData.description || "").trim(),
//           image_url: imageUrl || null,
//           featured: !!formData.featured,
//           stock: formData.stock !== false, // true unless explicitly false
//         };

//         if (editingProduct?.id) {
//           // UPDATE
//           const { data: updatedProduct, error } = await supabase
//             .from("products")
//             .update(payload)
//             .eq("id", editingProduct.id)
//             .select("*") // ensure returning row when allowed [page:0]
//             .maybeSingle(); // ok for 0/1 row [web:3]

//           if (error) throw error;

//           // If RLS prevents returning row, updatedProduct can be null; still refetch for consistency.
//           setSuccessMessage("Product updated successfully!");
//         } else {
//           // INSERT
//           const { data: newProduct, error } = await supabase
//             .from("products")
//             .insert([payload])
//             .select("*")
//             .single();

//           if (error) throw error;

//           // Optimistic prepend
//           if (newProduct) setProducts((prev) => [newProduct, ...prev]);

//           setSuccessMessage("Product added successfully!");
//         }

//         // Cleanup
//         setEditingProduct(null);
//         setFile(null);
//         setFormData({
//           ...emptyForm,
//           category_slug: categories[0]?.slug || "",
//         });

//         const fileInput = document.getElementById("product-file-input") as HTMLInputElement | null;
//         if (fileInput) fileInput.value = "";

//         // Always refetch to avoid stale UI (especially if update returned null)
//         await fetchData();
//       } catch (error: any) {
//         console.error("Error in product submit:", error);
//         setErrorMessage(error?.message || "Operation failed");
//       } finally {
//         setUploading(false);
//       }
//     };

//     const isOutOfStock = formData.stock === false;

//     return (
//       <form
//         onSubmit={handleSubmit}
//         className={`p-6 rounded-lg mb-8 grid gap-4 border shadow-sm transition-colors ${
//           editingProduct ? "bg-yellow-50 border-yellow-200" : "bg-gray-100 border-gray-200"
//         }`}
//       >
//         <div className="flex justify-between items-center mb-2">
//           <h3 className="text-xl font-bold font-anton text-gray-800 flex items-center gap-2">
//             {editingProduct ? (
//               <>
//                 <Pencil size={20} className="text-yellow-600" /> Edit Product
//               </>
//             ) : (
//               <>
//                 <Plus size={20} className="text-red-600" /> Add New Product
//               </>
//             )}
//           </h3>

//           {editingProduct && (
//             <button
//               type="button"
//               onClick={() => {
//                 setEditingProduct(null);
//                 setFile(null);
//                 const fileInput = document.getElementById("product-file-input") as HTMLInputElement | null;
//                 if (fileInput) fileInput.value = "";
//               }}
//               className="text-sm text-gray-500 hover:text-red-600 flex items-center gap-1 font-bold bg-white px-3 py-1 rounded border border-gray-300 hover:border-red-300 transition-colors"
//             >
//               <X size={14} /> Cancel Edit
//             </button>
//           )}
//         </div>

//         <div className="grid md:grid-cols-2 gap-4">
//           <div className="flex flex-col gap-1">
//             <label className="text-sm font-bold text-gray-700">Name*</label>
//             <input
//               required
//               placeholder="Ex: Carnauba Wax"
//               className="p-2 border rounded"
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               value={formData.name || ""}
//             />
//           </div>

//           <div className="flex flex-col gap-1">
//             <label className="text-sm font-bold text-gray-700">Category*</label>
//             <select
//               className="p-2 border rounded"
//               value={formData.category_slug || ""}
//               onChange={(e) => setFormData({ ...formData, category_slug: e.target.value })}
//             >
//               {categories.length === 0 ? (
//                 <option value="" disabled>
//                   No categories found
//                 </option>
//               ) : (
//                 categories.map((c) => (
//                   <option key={c.id} value={c.slug}>
//                     {c.name}
//                   </option>
//                 ))
//               )}
//             </select>
//           </div>

//           <div className="flex flex-col gap-1">
//             <label className="text-sm font-bold text-gray-700">Price (₹)*</label>
//             <input
//               required
//               type="number"
//               min="1"
//               step="0.01"
//               placeholder="Ex: 499"
//               className="p-2 border rounded"
//               onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
//               value={formData.price ?? ""}
//             />
//           </div>

//           <div className="flex flex-col gap-1">
//             <label className="text-sm font-bold text-gray-700">MRP (Optional)</label>
//             <input
//               type="number"
//               min="0"
//               step="0.01"
//               placeholder="Ex: 699"
//               className="p-2 border rounded"
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   mrp: e.target.value ? Number(e.target.value) : 0,
//                 })
//               }
//               value={formData.mrp ?? ""}
//             />
//           </div>

//           <div className="md:col-span-2 flex flex-wrap gap-4">
//             <div className="flex items-center gap-2 bg-white p-3 rounded border flex-1 min-w-[200px]">
//               <input
//                 id="featured-checkbox"
//                 type="checkbox"
//                 className="w-5 h-5 accent-red-600 cursor-pointer"
//                 checked={!!formData.featured}
//                 onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
//               />
//               <label
//                 htmlFor="featured-checkbox"
//                 className="font-bold text-gray-700 cursor-pointer select-none flex items-center gap-2"
//               >
//                 <Star size={16} className="text-yellow-500 fill-yellow-500" /> Best Seller
//               </label>
//             </div>

//             {/* FIXED: checkbox now directly represents "out of stock" */}
//             <div className="flex items-center gap-2 bg-white p-3 rounded border flex-1 min-w-[200px]">
//               <input
//                 id="stock-checkbox"
//                 type="checkbox"
//                 className="w-5 h-5 accent-black cursor-pointer"
//                 checked={isOutOfStock}
//                 onChange={(e) => setFormData({ ...formData, stock: !e.target.checked })}
//               />
//               <label
//                 htmlFor="stock-checkbox"
//                 className="font-bold text-gray-700 cursor-pointer select-none flex items-center gap-2 text-red-600"
//               >
//                 <Slash size={16} /> Mark as "Out of Stock"
//               </label>
//             </div>
//           </div>

//           <div className="flex flex-col gap-1 md:col-span-2">
//             <label className="text-sm font-bold text-gray-700">
//               Image {editingProduct && "(Leave empty to keep current image)"}
//             </label>
//             <div className="flex gap-4 items-center">
//               {formData.image_url && (
//                 <img
//                   src={String(formData.image_url)}
//                   alt="Current"
//                   className="w-12 h-12 object-cover rounded border"
//                 />
//               )}
//               <input
//                 id="product-file-input"
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => setFile(e.target.files?.[0] || null)}
//                 className="p-2 border rounded bg-white flex-1"
//               />
//             </div>
//           </div>
//         </div>

//         <textarea
//           placeholder="Description"
//           className="p-2 border rounded w-full"
//           rows={3}
//           onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//           value={formData.description || ""}
//         />

//         <button
//           disabled={uploading}
//           type="submit"
//           className={`${
//             editingProduct ? "bg-yellow-500 hover:bg-yellow-600" : "bg-red-600 hover:bg-red-700"
//           } text-white py-3 px-6 rounded flex items-center justify-center gap-2 font-bold transition-all disabled:opacity-50 text-lg shadow-md`}
//         >
//           {uploading ? (
//             "Processing..."
//           ) : editingProduct ? (
//             <>
//               <CheckCircle size={20} /> Update Product
//             </>
//           ) : (
//             <>
//               <Plus size={20} /> Add Product
//             </>
//           )}
//         </button>
//       </form>
//     );
//   };

//   const CategoryForm = () => {
//     const [name, setName] = useState("");
//     const [slug, setSlug] = useState("");

//     const handleSubmit = async (e: React.FormEvent) => {
//       e.preventDefault();
//       setErrorMessage(null);
//       setSuccessMessage(null);

//       try {
//         if (!name.trim() || !slug.trim()) {
//           setErrorMessage("Please fill in both fields.");
//           return;
//         }

//         setUploading(true);

//         const { data: existing, error: dupError } = await supabase
//           .from("categories")
//           .select("id")
//           .eq("slug", slug.trim())
//           .maybeSingle();

//         if (dupError) throw dupError;
//         if (existing) {
//           setErrorMessage(`Category ID "${slug}" already exists.`);
//           return;
//         }

//         const { data: newCategory, error } = await supabase
//           .from("categories")
//           .insert([{ name: name.trim(), slug: slug.trim() }])
//           .select("*")
//           .single();

//         if (error) throw error;

//         if (newCategory) setCategories((prev) => [...prev, newCategory]);

//         setSuccessMessage("Category added successfully");
//         setName("");
//         setSlug("");

//         await fetchData();
//       } catch (error: any) {
//         setErrorMessage("Failed to add category: " + (error?.message || "Unknown"));
//       } finally {
//         setUploading(false);
//       }
//     };

//     return (
//       <form
//         onSubmit={handleSubmit}
//         className="bg-gray-100 p-6 rounded-lg mb-8 flex flex-col md:flex-row gap-4 items-end border border-gray-200 shadow-sm"
//       >
//         <div className="flex-1 w-full">
//           <label className="text-sm font-bold text-gray-700 block mb-1">Display Name</label>
//           <input
//             required
//             placeholder="Ex: Car Shampoos"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="p-2 border rounded w-full"
//           />
//         </div>

//         <div className="flex-1 w-full">
//           <label className="text-sm font-bold text-gray-700 block mb-1">Unique ID (Slug)</label>
//           <input
//             required
//             placeholder="Ex: car_shampoos"
//             value={slug}
//             onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, "_"))}
//             className="p-2 border rounded w-full"
//           />
//         </div>

//         <button
//           disabled={uploading}
//           type="submit"
//           className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 font-bold h-[42px] w-full md:w-auto disabled:opacity-50"
//         >
//           Add Category
//         </button>
//       </form>
//     );
//   };

//   const TestimonialForm = () => {
//     const [t, setT] = useState<Partial<Testimonial>>({
//       rating: 5,
//       customer_name: "",
//       comment: "",
//     });

//     const handleSubmit = async (e: React.FormEvent) => {
//       e.preventDefault();
//       setErrorMessage(null);
//       setSuccessMessage(null);

//       try {
//         if (!t.customer_name?.trim() || !t.comment?.trim()) {
//           setErrorMessage("Please fill in all fields.");
//           return;
//         }

//         setUploading(true);

//         const payload = {
//           customer_name: t.customer_name.trim(),
//           comment: t.comment.trim(),
//           rating: Number(t.rating || 5),
//         };

//         const { data: newTestimonial, error } = await supabase
//           .from("testimonials")
//           .insert([payload])
//           .select("*")
//           .single();

//         if (error) throw error;

//         if (newTestimonial) setTestimonials((prev) => [newTestimonial, ...prev]);

//         setSuccessMessage("Testimonial added successfully");
//         setT({ rating: 5, customer_name: "", comment: "" });

//         await fetchData();
//       } catch (error: any) {
//         setErrorMessage("Failed to add testimonial: " + (error?.message || "Unknown"));
//       } finally {
//         setUploading(false);
//       }
//     };

//     return (
//       <form
//         onSubmit={handleSubmit}
//         className="bg-gray-100 p-6 rounded-lg mb-8 grid gap-4 border border-gray-200 shadow-sm"
//       >
//         <h3 className="text-xl font-bold font-anton text-gray-800">Add Testimonial</h3>

//         <div className="grid md:grid-cols-2 gap-4">
//           <input
//             required
//             placeholder="Customer Name"
//             className="p-2 border rounded"
//             value={t.customer_name || ""}
//             onChange={(e) => setT({ ...t, customer_name: e.target.value })}
//           />
//           <input
//             required
//             type="number"
//             min="1"
//             max="5"
//             placeholder="Rating (1-5)"
//             className="p-2 border rounded"
//             value={t.rating ?? 5}
//             onChange={(e) => setT({ ...t, rating: Number(e.target.value) })}
//           />
//         </div>

//         <textarea
//           required
//           placeholder="Comment"
//           className="p-2 border rounded w-full"
//           rows={3}
//           value={t.comment || ""}
//           onChange={(e) => setT({ ...t, comment: e.target.value })}
//         />

//         <button
//           disabled={uploading}
//           type="submit"
//           className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 font-bold disabled:opacity-50"
//         >
//           Add Testimonial
//         </button>
//       </form>
//     );
//   };

//   // ----------------- Render -----------------

//   if (authLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-600">
//         Loading...
//       </div>
//     );
//   }

//   // Not logged in => show Supabase auth login form
//   if (!session) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="bg-white p-8 rounded-xl shadow-2xl w-96 border border-gray-100">
//           <h1 className="text-3xl font-anton text-center mb-6 text-red-600">Admin Login</h1>

//           {errorMessage && (
//             <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm flex items-center gap-2">
//               <AlertCircle size={16} /> {errorMessage}
//             </div>
//           )}

//           {successMessage && (
//             <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm flex items-center gap-2">
//               <CheckCircle size={16} /> {successMessage}
//             </div>
//           )}

//           <form onSubmit={handleLogin} className="grid gap-3">
//             <input
//               type="email"
//               placeholder="Admin Email"
//               value={emailInput}
//               onChange={(e) => setEmailInput(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
//               required
//             />
//             <input
//               type="password"
//               placeholder="Admin Password"
//               value={passwordInput}
//               onChange={(e) => setPasswordInput(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
//               required
//             />
//             <button
//               disabled={uploading}
//               type="submit"
//               className="w-full bg-black text-white py-3 font-bold hover:bg-gray-800 rounded transition-all transform active:scale-95 disabled:opacity-50"
//             >
//               {uploading ? "Logging in..." : "LOGIN"}
//             </button>
//           </form>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Toast Messages */}
//       {(errorMessage || successMessage) && (
//         <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[60] min-w-[300px] text-center shadow-lg rounded-lg overflow-hidden animate-bounce-in">
//           {errorMessage && (
//             <div className="bg-red-600 text-white p-4 font-bold flex items-center justify-center gap-2">
//               <AlertCircle /> {errorMessage}
//             </div>
//           )}
//           {successMessage && (
//             <div className="bg-green-600 text-white p-4 font-bold flex items-center justify-center gap-2">
//               <CheckCircle /> {successMessage}
//             </div>
//           )}
//         </div>
//       )}

//       {/* Header */}
//       <div className="bg-black text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
//         <h1 className="text-2xl font-anton tracking-wide">
//           CDM <span className="text-red-600">ADMIN</span>
//         </h1>

//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-2 text-gray-300 hover:text-white bg-gray-800 px-4 py-2 rounded transition-all"
//         >
//           <LogOut size={18} /> <span className="hidden sm:inline">Logout</span>
//         </button>
//       </div>

//       <div className="container mx-auto p-4 md:p-8 max-w-5xl">
//         {/* Tabs */}
//         <div className="flex gap-2 md:gap-4 mb-8 border-b border-gray-200 overflow-x-auto">
//           {(["products", "categories", "testimonials"] as Tab[]).map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`pb-3 px-6 font-bold capitalize whitespace-nowrap transition-all ${
//                 activeTab === tab ? "border-b-4 border-red-600 text-red-600" : "text-gray-500 hover:text-gray-800"
//               }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>

//         {/* Products */}
//         {activeTab === "products" && (
//           <div className="animate-fade-in">
//             <ProductForm />

//             <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
//               <h3 className="font-bold text-gray-500">Existing Products ({filteredProducts.length})</h3>

//               <div className="relative w-full md:w-64">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                 <input
//                   type="text"
//                   placeholder="Search products..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200 text-sm"
//                 />
//                 {searchQuery && (
//                   <button
//                     type="button"
//                     onClick={() => setSearchQuery("")}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                   >
//                     <X size={14} />
//                   </button>
//                 )}
//               </div>
//             </div>

//             <div className="grid gap-4">
//               {filteredProducts.map((p) => (
//                 <div
//                   key={p.id}
//                   className={`flex items-center justify-between border p-4 rounded-lg hover:shadow-md transition-shadow bg-white ${
//                     editingProduct?.id === p.id ? "ring-2 ring-yellow-400 border-yellow-400 bg-yellow-50" : "border-gray-200"
//                   }`}
//                 >
//                   <div className="flex items-center gap-4">
//                     <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0 overflow-hidden relative">
//                       {p.image_url ? (
//                         <img
//                           src={p.image_url}
//                           alt={p.name}
//                           className={`w-full h-full object-cover ${p.stock === false ? "grayscale opacity-50" : ""}`}
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Img</div>
//                       )}

//                       {p.featured && (
//                         <div
//                           className="absolute top-0 right-0 bg-yellow-400 text-xs p-1 rounded-bl shadow-sm z-10"
//                           title="Best Seller"
//                         >
//                           <Star size={10} className="fill-black text-black" />
//                         </div>
//                       )}

//                       {p.stock === false && (
//                         <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-[10px] font-bold text-center leading-none">
//                           NO STOCK
//                         </div>
//                       )}
//                     </div>

//                     <div>
//                       <div className="flex items-center gap-2 flex-wrap">
//                         <h4 className="font-bold text-lg text-gray-800">{p.name}</h4>
//                         {p.featured && (
//                           <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full font-bold border border-yellow-200">
//                             Best Seller
//                           </span>
//                         )}
//                         {p.stock === false && (
//                           <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full font-bold border border-red-200">
//                             Out of Stock
//                           </span>
//                         )}
//                       </div>

//                       <p className="text-sm text-gray-500 font-mono">
//                         ₹{p.price} <span className="mx-2">•</span> {p.category_slug}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex gap-2">
//                     <button
//                       type="button"
//                       onClick={() => startEditing(p)}
//                       className="text-blue-500 hover:bg-blue-50 p-2 rounded transition-colors"
//                       title="Edit Product"
//                     >
//                       <Pencil size={20} />
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => handleDelete("products", p.id)}
//                       className="text-red-500 hover:bg-red-50 p-2 rounded transition-colors"
//                       title="Delete Product"
//                     >
//                       <Trash2 size={20} />
//                     </button>
//                   </div>
//                 </div>
//               ))}

//               {filteredProducts.length === 0 && (
//                 <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
//                   <p className="text-gray-400 mb-2">
//                     {searchQuery ? `No products match "${searchQuery}"` : "No products found."}
//                   </p>
//                   {searchQuery && (
//                     <button type="button" onClick={() => setSearchQuery("")} className="text-sm text-red-600 font-bold hover:underline">
//                       Clear Search
//                     </button>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Categories */}
//         {activeTab === "categories" && (
//           <div className="animate-fade-in">
//             <CategoryForm />
//             <h3 className="font-bold text-gray-500 mb-4">Existing Categories ({categories.length})</h3>
//             <div className="grid gap-3">
//               {categories.map((c) => (
//                 <div
//                   key={c.id}
//                   className="flex justify-between items-center border p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-all"
//                 >
//                   <div>
//                     <span className="font-bold text-lg text-gray-800 block">{c.name}</span>
//                     <span className="text-gray-500 text-sm font-mono bg-gray-100 px-2 py-1 rounded">ID: {c.slug}</span>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() => handleDelete("categories", c.id)}
//                     className="text-red-500 hover:bg-red-50 p-2 rounded transition-colors"
//                     title="Delete Category"
//                   >
//                     <Trash2 size={20} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Testimonials */}
//         {activeTab === "testimonials" && (
//           <div className="animate-fade-in">
//             <TestimonialForm />
//             <h3 className="font-bold text-gray-500 mb-4">Existing Testimonials ({testimonials.length})</h3>
//             <div className="grid md:grid-cols-2 gap-4">
//               {testimonials.map((t) => (
//                 <div
//                   key={t.id}
//                   className="border border-gray-200 p-6 rounded-lg relative hover:shadow-lg transition-shadow bg-white"
//                 >
//                   <button
//                     type="button"
//                     onClick={() => handleDelete("testimonials", t.id)}
//                     className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors"
//                     title="Delete testimonial"
//                   >
//                     <Trash2 size={18} />
//                   </button>
//                   <p className="italic text-gray-600 mb-4 text-lg">"{t.comment}"</p>
//                   <div className="flex items-center gap-2">
//                     <span className="font-bold text-gray-800">{t.customer_name}</span>
//                     <span className="text-yellow-500 text-sm font-bold">★ {t.rating}/5</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import { useEffect, useMemo, useState } from "react";
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

type Tab = "products" | "categories" | "testimonials";

export default function AdminPage() {
  // ---- Auth state (Supabase Auth) ----
  const [authLoading, setAuthLoading] = useState(true);
  const [session, setSession] = useState<any>(null);

  // login form
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  // ---- Data state ----
  const [activeTab, setActiveTab] = useState<Tab>("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  // ---- UI state ----
  const [searchQuery, setSearchQuery] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [editingOrder, setEditingOrder] = useState<Tab | null>(null);

  // feedback state
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Clear messages after 3 seconds
  useEffect(() => {
    if (!errorMessage && !successMessage) return;
    const timer = setTimeout(() => {
      setErrorMessage(null);
      setSuccessMessage(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [errorMessage, successMessage]);

  // ---- Auth bootstrap ----
  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session ?? null);
      setAuthLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession ?? null);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Fetch data when session becomes available
  useEffect(() => {
    if (!session) return;
    fetchData();
  }, [session?.user?.id]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      setUploading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: emailInput.trim(),
        password: passwordInput,
      });

      if (error) throw error;

      setSuccessMessage("Logged in successfully");
      setPasswordInput("");
    } catch (err: any) {
      setErrorMessage(err?.message || "Login failed");
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    const { error } = await supabase.auth.signOut();
    if (error) setErrorMessage(error.message);
    setEditingProduct(null);
    setEditingOrder(null);
    setDraggedItem(null);
  };

  // ---- Data fetching with display_order ----
  const fetchData = async () => {
    try {
      setErrorMessage(null);

      // Products ordered by display_order first
      const { data: p, error: pError } = await supabase
        .from("products")
        .select("*")
        .order("display_order", { ascending: true, nullsFirst: false })
        .order("created_at", { ascending: false });
      if (pError) throw pError;
      setProducts(p || []);

      // Categories ordered by display_order first
      const { data: c, error: cError } = await supabase
        .from("categories")
        .select("*")
        .order("display_order", { ascending: true, nullsFirst: false })
        .order("name", { ascending: true });
      if (cError) throw cError;
      setCategories(c || []);

      const { data: t, error: tError } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });
      if (tError) throw tError;
      setTestimonials(t || []);
    } catch (error: any) {
      console.error("Error fetching data:", error);
      setErrorMessage("Failed to load data: " + (error?.message || "Unknown"));
    }
  };

  // ---- Manual Order Controls (Up/Down buttons) ----
  const moveItemUp = async (
    table: string,
    id: string,
    currentIndex: number
  ) => {
    if (currentIndex === 0) return;

    const items = table === "products" ? products : categories;
    const newItems = [...items];
    const [movedItem] = newItems.splice(currentIndex, 1);
    newItems.splice(currentIndex - 1, 0, movedItem);

    // Update display_order
    const updatedItems = newItems.map((item, index) => ({
      ...item,
      display_order: index + 1,
    }));

    try {
      setUploading(true);
      const { error } = await supabase.from(table).upsert(
        updatedItems.map(({ id, display_order }) => ({ id, display_order })),
        { onConflict: "id" }
      );

      if (error) throw error;

      if (table === "products") {
        setProducts(newItems as Product[]);
      } else {
        setCategories(newItems as Category[]);
      }

      setSuccessMessage("Order updated successfully!");
    } catch (error: any) {
      setErrorMessage(
        "Failed to update order: " + (error?.message || "Unknown")
      );
    } finally {
      setUploading(false);
    }
  };

  const moveItemDown = async (
    table: string,
    id: string,
    currentIndex: number
  ) => {
    const items = table === "products" ? products : categories;
    if (currentIndex === items.length - 1) return;

    const newItems = [...items];
    const [movedItem] = newItems.splice(currentIndex, 1);
    newItems.splice(currentIndex + 1, 0, movedItem);

    // Update display_order
    const updatedItems = newItems.map((item, index) => ({
      ...item,
      display_order: index + 1,
    }));

    try {
      setUploading(true);
      const { error } = await supabase.from(table).upsert(
        updatedItems.map(({ id, display_order }) => ({ id, display_order })),
        { onConflict: "id" }
      );

      if (error) throw error;

      if (table === "products") {
        setProducts(newItems as Product[]);
      } else {
        setCategories(newItems as Category[]);
      }

      setSuccessMessage("Order updated successfully!");
    } catch (error: any) {
      setErrorMessage(
        "Failed to update order: " + (error?.message || "Unknown")
      );
    } finally {
      setUploading(false);
    }
  };

  const toggleOrderEditing = (tab: Tab | null) => {
    setEditingOrder(editingOrder ? null : tab);
  };

  // ---- Image upload ----
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
      if (!data?.secure_url)
        throw new Error("Cloudinary did not return secure_url");
      return data.secure_url as string;
    } finally {
      setUploading(false);
    }
  };

  // ---- Delete handler ----
  const handleDelete = async (table: string, id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      setErrorMessage(null);
      setUploading(true);

      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;

      setSuccessMessage("Item deleted successfully");
      if (editingProduct?.id === id) setEditingProduct(null);

      await fetchData();
    } catch (error: any) {
      setErrorMessage("Delete failed: " + (error?.message || "Unknown"));
    } finally {
      setUploading(false);
    }
  };

  const startEditing = (product: Product) => {
    setEditingProduct(product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ---- Search ----
  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => (p.name || "").toLowerCase().includes(q));
  }, [products, searchQuery]);

  // ----------------- ProductForm Component -----------------
  const ProductForm = () => {
    const emptyForm: Partial<Product> = {
      category_slug: categories[0]?.slug || "",
      featured: false,
      stock: true,
      name: "",
      price: 0,
      mrp: 0,
      description: "",
      image_url: "",
    };

    const [formData, setFormData] = useState<Partial<Product>>(emptyForm);
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
      if (editingProduct) {
        setFormData({ ...editingProduct });
        setFile(null);
        const fileInput = document.getElementById(
          "product-file-input"
        ) as HTMLInputElement | null;
        if (fileInput) fileInput.value = "";
      } else {
        setFormData({
          ...emptyForm,
          category_slug: categories[0]?.slug || "",
        });
        setFile(null);
        const fileInput = document.getElementById(
          "product-file-input"
        ) as HTMLInputElement | null;
        if (fileInput) fileInput.value = "";
      }
    }, [editingProduct, categories]);

    useEffect(() => {
      if (editingProduct) return;
      if (!formData.category_slug && categories.length > 0) {
        setFormData((prev) => ({ ...prev, category_slug: categories[0].slug }));
      }
    }, [categories.length, formData.category_slug, editingProduct]);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setErrorMessage(null);
      setSuccessMessage(null);

      if (!formData.name?.trim() || !formData.category_slug) {
        setErrorMessage("Please fill in all required fields.");
        return;
      }
      if (Number(formData.price) <= 0) {
        setErrorMessage("Price must be greater than 0.");
        return;
      }

      try {
        setUploading(true);

        const normalizedName = formData.name.trim();

        let dupQuery = supabase
          .from("products")
          .select("id")
          .eq("name", normalizedName);

        if (editingProduct?.id) {
          dupQuery = dupQuery.neq("id", editingProduct.id);
        }

        const { data: existing, error: dupError } =
          await dupQuery.maybeSingle();
        if (dupError) throw dupError;
        if (existing) {
          setErrorMessage(
            `A product with the name "${normalizedName}" already exists.`
          );
          return;
        }

        let imageUrl = (formData.image_url || "").trim();

        if (file) {
          imageUrl = await uploadImage(file);
        } else if (editingProduct?.image_url) {
          imageUrl = editingProduct.image_url;
        }

        const payload: any = {
          name: normalizedName,
          category_slug: formData.category_slug,
          price: Number(formData.price),
          mrp:
            formData.mrp && Number(formData.mrp) > 0
              ? Number(formData.mrp)
              : null,
          description: (formData.description || "").trim(),
          image_url: imageUrl || null,
          featured: !!formData.featured,
          stock: formData.stock !== false,
        };

        let updatedProducts = products;
        if (editingProduct?.id) {
          // UPDATE
          const { data: updatedProduct, error } = await supabase
            .from("products")
            .update(payload)
            .eq("id", editingProduct.id)
            .select()
            .single();

          if (error) throw error;

          if (updatedProduct) {
            updatedProducts = products.map((p) =>
              p.id === updatedProduct.id ? updatedProduct : p
            );
          }
        } else {
          // INSERT - new product gets display_order at end
          payload.display_order = products.length + 1;

          const { data: newProduct, error } = await supabase
            .from("products")
            .insert([payload])
            .select()
            .single();

          if (error) throw error;

          if (newProduct) {
            updatedProducts = [...products, newProduct];
          }
        }

        setProducts(updatedProducts);
        setSuccessMessage(
          editingProduct
            ? "Product updated successfully!"
            : "Product added successfully!"
        );
        setEditingProduct(null);
        setFile(null);
        setFormData({
          ...emptyForm,
          category_slug: categories[0]?.slug || "",
        });

        const fileInput = document.getElementById(
          "product-file-input"
        ) as HTMLInputElement | null;
        if (fileInput) fileInput.value = "";
      } catch (error: any) {
        console.error("Error in product submit:", error);
        setErrorMessage(error?.message || "Operation failed");
      } finally {
        setUploading(false);
      }
    };

    const isOutOfStock = formData.stock === false;

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
                ) as HTMLInputElement | null;
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
              value={formData.category_slug || ""}
              onChange={(e) =>
                setFormData({ ...formData, category_slug: e.target.value })
              }
            >
              {categories.length === 0 ? (
                <option value="" disabled>
                  No categories found
                </option>
              ) : (
                categories.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))
              )}
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
              value={formData.price ?? ""}
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
                  mrp: e.target.value ? Number(e.target.value) : 0,
                })
              }
              value={formData.mrp ?? ""}
            />
          </div>

          <div className="md:col-span-2 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white p-3 rounded border flex-1 min-w-[200px]">
              <input
                id="featured-checkbox"
                type="checkbox"
                className="w-5 h-5 accent-red-600 cursor-pointer"
                checked={!!formData.featured}
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
                checked={isOutOfStock}
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
                  src={String(formData.image_url)}
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

  // ----------------- CategoryForm Component -----------------
  const CategoryForm = () => {
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setErrorMessage(null);
      setSuccessMessage(null);

      try {
        if (!name.trim() || !slug.trim()) {
          setErrorMessage("Please fill in both fields.");
          return;
        }

        setUploading(true);

        const { data: existing, error: dupError } = await supabase
          .from("categories")
          .select("id")
          .eq("slug", slug.trim())
          .maybeSingle();

        if (dupError) throw dupError;
        if (existing) {
          setErrorMessage(`Category ID "${slug}" already exists.`);
          return;
        }

        // New category gets display_order at end
        const payload = {
          name: name.trim(),
          slug: slug.trim(),
          display_order: categories.length + 1,
        };

        const { data: newCategory, error } = await supabase
          .from("categories")
          .insert([payload])
          .select()
          .single();

        if (error) throw error;

        if (newCategory) {
          setCategories((prev) => [...prev, newCategory]);
        }

        setSuccessMessage("Category added successfully");
        setName("");
        setSlug("");
      } catch (error: any) {
        setErrorMessage(
          "Failed to add category: " + (error?.message || "Unknown")
        );
      } finally {
        setUploading(false);
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
          disabled={uploading}
          type="submit"
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 font-bold h-[42px] w-full md:w-auto disabled:opacity-50"
        >
          Add Category
        </button>
      </form>
    );
  };

  // ----------------- TestimonialForm Component -----------------
  const TestimonialForm = () => {
    const [t, setT] = useState<Partial<Testimonial>>({
      rating: 5,
      customer_name: "",
      comment: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setErrorMessage(null);
      setSuccessMessage(null);

      try {
        if (!t.customer_name?.trim() || !t.comment?.trim()) {
          setErrorMessage("Please fill in all fields.");
          return;
        }

        setUploading(true);

        const payload = {
          customer_name: t.customer_name.trim(),
          comment: t.comment.trim(),
          rating: Number(t.rating || 5),
        };

        const { data: newTestimonial, error } = await supabase
          .from("testimonials")
          .insert([payload])
          .select()
          .single();

        if (error) throw error;

        if (newTestimonial) {
          setTestimonials((prev) => [newTestimonial, ...prev]);
        }

        setSuccessMessage("Testimonial added successfully");
        setT({ rating: 5, customer_name: "", comment: "" });
      } catch (error: any) {
        setErrorMessage(
          "Failed to add testimonial: " + (error?.message || "Unknown")
        );
      } finally {
        setUploading(false);
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
            value={t.rating ?? 5}
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
          disabled={uploading}
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 font-bold disabled:opacity-50"
        >
          Add Testimonial
        </button>
      </form>
    );
  };

  // ----------------- Render -----------------
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-600">
        Loading...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-96 border border-gray-100">
          <h1 className="text-3xl font-anton text-center mb-6 text-red-600">
            Admin Login
          </h1>

          {errorMessage && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm flex items-center gap-2">
              <AlertCircle size={16} /> {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm flex items-center gap-2">
              <CheckCircle size={16} /> {successMessage}
            </div>
          )}

          <form onSubmit={handleLogin} className="grid gap-3">
            <input
              type="email"
              placeholder="Admin Email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
            <input
              type="password"
              placeholder="Admin Password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
            <button
              disabled={uploading}
              type="submit"
              className="w-full bg-black text-white py-3 font-bold hover:bg-gray-800 rounded transition-all transform active:scale-95 disabled:opacity-50"
            >
              {uploading ? "Logging in..." : "LOGIN"}
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
          onClick={handleLogout}
          className="flex items-center gap-2 text-gray-300 hover:text-white bg-gray-800 px-4 py-2 rounded transition-all"
        >
          <LogOut size={18} /> <span className="hidden sm:inline">Logout</span>
        </button>
      </div>

      <div className="container mx-auto p-4 md:p-8 max-w-5xl">
        {/* Tabs */}
        <div className="flex gap-2 md:gap-4 mb-8 border-b border-gray-200 overflow-x-auto">
          {(["products", "categories", "testimonials"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
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

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="animate-fade-in">
            <ProductForm />

            {/* Order Controls */}
            {editingOrder === "products" && (
              <div className="flex flex-col sm:flex-row gap-3 mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <button
                  onClick={() => toggleOrderEditing("products")}
                  disabled={uploading}
                  className="flex items-center gap-2 px-4 py-2 rounded font-bold transition-all bg-blue-600 text-white shadow-md hover:bg-blue-700 disabled:opacity-50"
                >
                  <X size={16} /> Done Editing Order
                </button>
                <div className="text-sm text-blue-700 flex items-center gap-1 flex-1">
                  Drag items using ↑↓ buttons. Items will appear in this exact
                  order on frontend.
                </div>
              </div>
            )}

            <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
              <h3 className="font-bold text-gray-500">
                Existing Products ({filteredProducts.length})
                {editingOrder === "products" && " - Use ↑↓ to reorder"}
              </h3>

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
                  className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200 text-sm"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            <div className="grid gap-4">
              {filteredProducts.map((p) => {
                const globalIndex = products.findIndex(
                  (prod) => prod.id === p.id
                );
                return (
                  <div
                    key={p.id}
                    className={`flex items-center justify-between border p-4 rounded-lg hover:shadow-md transition-all bg-white ${
                      editingProduct?.id === p.id
                        ? "ring-2 ring-yellow-400 border-yellow-400 bg-yellow-50"
                        : editingOrder === "products"
                        ? "border-blue-200 bg-blue-50"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1">
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

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-lg text-gray-800 truncate">
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
                        {editingOrder === "products" && (
                          <p className="text-xs text-blue-600 font-mono mt-1">
                            Position: #{p.display_order || globalIndex + 1}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      {editingOrder === "products" && (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              moveItemUp("products", p.id, globalIndex)
                            }
                            disabled={globalIndex === 0 || uploading}
                            className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Move Up"
                          >
                            ↑
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              moveItemDown("products", p.id, globalIndex)
                            }
                            disabled={
                              globalIndex === products.length - 1 || uploading
                            }
                            className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Move Down"
                          >
                            ↓
                          </button>
                        </>
                      )}
                      <button
                        type="button"
                        onClick={() => startEditing(p)}
                        className="text-blue-500 hover:bg-blue-50 p-2 rounded transition-colors"
                        title="Edit Product"
                      >
                        <Pencil size={20} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete("products", p.id)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                );
              })}

              {filteredProducts.length === 0 && (
                <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <p className="text-gray-400 mb-2">
                    {searchQuery
                      ? `No products match "${searchQuery}"`
                      : "No products found."}
                  </p>
                  {searchQuery && (
                    <button
                      type="button"
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
            {/* Order Controls */}
            {editingOrder === "categories" && (
              <div className="flex flex-col sm:flex-row gap-3 mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <button
                  onClick={() => toggleOrderEditing("categories")}
                  disabled={uploading}
                  className="flex items-center gap-2 px-4 py-2 rounded font-bold transition-all bg-blue-600 text-white shadow-md hover:bg-blue-700 disabled:opacity-50"
                >
                  <X size={16} /> Done Editing Order
                </button>
                <div className="text-sm text-blue-700 flex items-center gap-1 flex-1">
                  Use ↑↓ buttons to reorder. Items will appear in this exact
                  order on frontend.
                </div>
              </div>
            )}

            <CategoryForm />

            <h3 className="font-bold text-gray-500 mb-4">
              Existing Categories ({categories.length})
              {editingOrder === "categories" && " - Use ↑↓ to reorder"}
            </h3>

            <div className="grid gap-3">
              {categories.map((c, index) => (
                <div
                  key={c.id}
                  className={`flex items-center justify-between border p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-all ${
                    editingOrder === "categories"
                      ? "border-blue-200 bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <span className="font-bold text-lg text-gray-800 block truncate">
                      {c.name}
                    </span>
                    <span className="text-gray-500 text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                      ID: {c.slug}
                    </span>
                    {editingOrder === "categories" && (
                      <p className="text-xs text-blue-600 font-mono mt-1">
                        Position: #{(c as any).display_order || index + 1}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    {editingOrder === "categories" && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            moveItemUp("categories", c.id, index)
                          }
                          disabled={index === 0 || uploading}
                          className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Move Up"
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            moveItemDown("categories", c.id, index)
                          }
                          disabled={
                            index === categories.length - 1 || uploading
                          }
                          className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Move Down"
                        >
                          ↓
                        </button>
                      </>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDelete("categories", c.id)}
                      className="text-red-500 hover:bg-red-50 p-2 rounded transition-colors"
                      title="Delete Category"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
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
                    type="button"
                    onClick={() => handleDelete("testimonials", t.id)}
                    className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors"
                    title="Delete testimonial"
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

