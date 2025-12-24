import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Product {
  id: string;
  name: string;
  description: string;
  category: 'car_chemicals' | 'car_accessories';
  price: number;
  image_url: string;
  featured: boolean;
  created_at: string;
}

export interface Testimonial {
  id: string;
  customer_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface WorkflowStep {
  id: string;
  step_number: number;
  title: string;
  description: string;
  created_at: string;
}
