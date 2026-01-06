import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Interfaces
export interface Category {
  id: string;
  name: string;
  slug: string;
  display_order?: number;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  featured: boolean;
  stock: boolean;
  mrp?: number;
  image_url?: string;
  category_slug: string;
  created_at?: string;
  display_order?: number;
}

export interface Testimonial {
  id: string;
  customer_name: string;
  comment: string;
  rating: number;
  created_at?: string;
}
