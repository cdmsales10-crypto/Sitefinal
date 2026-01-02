import { useEffect, useState } from "react";
import { supabase, Product, Category, Testimonial } from "../lib/supabase";
import {
  Trash2,
  Plus,
  LogOut,
  AlertCircle,
  CheckCircle,
  Pencil,
  X,
} from "lucide-react";

/* ---------------- AUTH WRAPPER ---------------- */

export default function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <div className="p-10">Loading...</div>;
  if (!session) return <Login />;

  return <AdminDashboard onLogout={() => supabase.auth.signOut()} />;
}

/* ---------------- LOGIN ---------------- */

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) setError(error.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={login}
        className="bg-white p-8 rounded-xl shadow w-96"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Login</h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-3 text-sm">
            {error}
          </div>
        )}

        <input
          className="border p-3 w-full mb-3 rounded"
          placeholder="Email"
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-3 w-full mb-4 rounded"
          placeholder="Password"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-black text-white py-3 rounded font-bold">
          Login
        </button>
      </form>
    </div>
  );
}

/* ---------------- DASHBOARD ---------------- */

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const { data: p } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    const { data: c } = await supabase.from("categories").select("*");

    if (p) setProducts(p);
    if (c) setCategories(c);
  };

  /* ---------------- IMAGE UPLOAD ---------------- */

  const uploadImage = async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: fd }
    );

    const data = await res.json();
    return data.secure_url;
  };

  /* ---------------- PRODUCT FORM ---------------- */

  const saveProduct = async (data: Partial<Product>, file?: File) => {
    let image = editing?.image_url || "";

    if (file) image = await uploadImage(file);

    const payload = {
      ...data,
      image_url: image,
      price: Number(data.price),
      mrp: data.mrp ? Number(data.mrp) : null,
    };

    if (editing) {
      await supabase.from("products").update(payload).eq("id", editing.id);

      setProducts((prev) =>
        prev.map((p) => (p.id === editing.id ? { ...p, ...payload } as Product : p))
      );
      setMessage("Product updated");
    } else {
      const { data } = await supabase
        .from("products")
        .insert([payload])
        .select()
        .single();

      if (data) setProducts((p) => [data, ...p]);
      setMessage("Product added");
    }

    setEditing(null);
  };

  const deleteProduct = async (id: string) => {
    await supabase.from("products").delete().eq("id", id);
    setProducts((p) => p.filter((x) => x.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-black text-white p-4 flex justify-between">
        <h1 className="font-bold text-xl">ADMIN</h1>
        <button onClick={onLogout} className="flex items-center gap-2">
          <LogOut size={18} /> Logout
        </button>
      </header>

      <div className="max-w-5xl mx-auto p-6">
        {message && (
          <div className="bg-green-100 text-green-800 p-3 rounded mb-4">
            {message}
          </div>
        )}

        <ProductForm
          categories={categories}
          editing={editing}
          onSave={saveProduct}
          onCancel={() => setEditing(null)}
        />

        <div className="grid gap-3">
          {products.map((p) => (
            <div key={p.id} className="bg-white p-4 rounded flex justify-between">
              <div>
                <h3 className="font-bold">{p.name}</h3>
                <p className="text-sm text-gray-500">₹{p.price}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditing(p)}>
                  <Pencil />
                </button>
                <button onClick={() => deleteProduct(p.id)}>
                  <Trash2 className="text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- PRODUCT FORM COMPONENT ---------------- */

function ProductForm({
  categories,
  editing,
  onSave,
  onCancel,
}: any) {
  const [data, setData] = useState<Partial<Product>>({});
  const [file, setFile] = useState<File | undefined>();

  useEffect(() => {
    if (editing) setData(editing);
    else
      setData({
        name: "",
        price: 0,
        category_slug: categories[0]?.slug,
        stock: true,
        featured: false,
      });
  }, [editing, categories]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(data, file);
      }}
      className="bg-white p-6 rounded mb-6"
    >
      <h2 className="font-bold mb-4">
        {editing ? "Edit Product" : "Add Product"}
      </h2>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Name"
        value={data.name || ""}
        onChange={(e) => setData({ ...data, name: e.target.value })}
      />

      <input
        className="border p-2 w-full mb-2"
        type="number"
        placeholder="Price"
        value={data.price || ""}
        onChange={(e) => setData({ ...data, price: +e.target.value })}
      />

      <select
        className="border p-2 w-full mb-2"
        value={data.category_slug}
        onChange={(e) =>
          setData({ ...data, category_slug: e.target.value })
        }
      >
        {categories.map((c: Category) => (
          <option key={c.id} value={c.slug}>
            {c.name}
          </option>
        ))}
      </select>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0])}
        className="mb-3"
      />

      <div className="flex gap-3">
        <button className="bg-black text-white px-4 py-2 rounded">
          {editing ? "Update" : "Add"}
        </button>
        {editing && (
          <button
            type="button"
            onClick={onCancel}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
