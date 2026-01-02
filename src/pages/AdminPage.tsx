import { useEffect, useState } from "react";
import { supabase, Product, Category, Testimonial } from "../lib/supabase";
import {
  Plus,
  Trash2,
  Pencil,
  LogOut,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] =
    useState<"products" | "categories" | "testimonials">("products");

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  /* ---------------- AUTH ---------------- */

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
      if (data.user) fetchAll();
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      if (session?.user) fetchAll();
    });
  }, []);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) setError(error.message);
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  /* ---------------- DATA ---------------- */

  const fetchAll = async () => {
    const [p, c, t] = await Promise.all([
      supabase.from("products").select("*").order("created_at", { ascending: false }),
      supabase.from("categories").select("*"),
      supabase.from("testimonials").select("*").order("created_at", { ascending: false }),
    ]);

    if (p.data) setProducts(p.data);
    if (c.data) setCategories(c.data);
    if (t.data) setTestimonials(t.data);
  };

  /* ---------------- FORMS ---------------- */

  const addCategory = async (name: string, slug: string) => {
    const { error } = await supabase.from("categories").insert([{ name, slug }]);
    if (error) setError(error.message);
    else {
      setMessage("Category added");
      fetchAll();
    }
  };

  const addTestimonial = async (t: Partial<Testimonial>) => {
    const { error } = await supabase.from("testimonials").insert([t]);
    if (error) setError(error.message);
    else {
      setMessage("Testimonial added");
      fetchAll();
    }
  };

  const deleteRow = async (table: string, id: string) => {
    if (!confirm("Delete this item?")) return;
    await supabase.from(table).delete().eq("id", id);
    fetchAll();
  };

  /* ---------------- UI ---------------- */

  if (loading) return null;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={login}
          className="bg-white p-8 rounded shadow w-96"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-2 mb-3 text-sm flex gap-2">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <input
            type="email"
            placeholder="Admin Email"
            className="w-full p-2 border mb-3"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border mb-4"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full bg-black text-white py-2 font-bold">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-black text-white p-4 flex justify-between">
        <h1 className="text-xl font-bold">ADMIN PANEL</h1>
        <button onClick={logout} className="flex gap-2">
          <LogOut size={18} /> Logout
        </button>
      </header>

      {message && (
        <div className="bg-green-600 text-white p-3 text-center">
          <CheckCircle className="inline" /> {message}
        </div>
      )}

      <div className="p-6 max-w-5xl mx-auto">
        <div className="flex gap-4 mb-6">
          {["products", "categories", "testimonials"].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t as any)}
              className={`font-bold ${
                activeTab === t ? "text-red-600" : "text-gray-500"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* PRODUCTS */}
        {activeTab === "products" && (
          <div className="grid gap-3">
            {products.map((p) => (
              <div key={p.id} className="border p-4 flex justify-between">
                <span>{p.name}</span>
                <button onClick={() => deleteRow("products", p.id)}>
                  <Trash2 />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* CATEGORIES */}
        {activeTab === "categories" && (
          <CategorySection categories={categories} add={addCategory} del={deleteRow} />
        )}

        {/* TESTIMONIALS */}
        {activeTab === "testimonials" && (
          <TestimonialSection
            testimonials={testimonials}
            add={addTestimonial}
            del={deleteRow}
          />
        )}
      </div>
    </div>
  );
}

/* ---------------- SUB COMPONENTS ---------------- */

function CategorySection({ categories, add, del }: any) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          add(name, slug);
          setName("");
          setSlug("");
        }}
        className="flex gap-2 mb-4"
      >
        <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input placeholder="Slug" onChange={(e) => setSlug(e.target.value)} />
        <button className="bg-blue-600 text-white px-4">Add</button>
      </form>

      {categories.map((c: Category) => (
        <div key={c.id} className="border p-3 flex justify-between">
          {c.name}
          <button onClick={() => del("categories", c.id)}>
            <Trash2 />
          </button>
        </div>
      ))}
    </>
  );
}

function TestimonialSection({ testimonials, add, del }: any) {
  const [customer_name, setName] = useState("");
  const [comment, setComment] = useState("");

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          add({ customer_name, comment, rating: 5 });
          setName("");
          setComment("");
        }}
        className="grid gap-2 mb-4"
      >
        <input placeholder="Customer Name" onChange={(e) => setName(e.target.value)} />
        <textarea placeholder="Comment" onChange={(e) => setComment(e.target.value)} />
        <button className="bg-green-600 text-white p-2">Add</button>
      </form>

      {testimonials.map((t: Testimonial) => (
        <div key={t.id} className="border p-3 relative">
          <button
            className="absolute top-2 right-2"
            onClick={() => del("testimonials", t.id)}
          >
            <Trash2 />
          </button>
          <p>"{t.comment}"</p>
          <strong>{t.customer_name}</strong>
        </div>
      ))}
    </>
  );
}
