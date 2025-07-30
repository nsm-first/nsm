import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://njstekxvtkqgqceygvnk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qc3Rla3h2dGtxZ3FjZXlndm5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3ODE3MzAsImV4cCI6MjA2OTM1NzczMH0.aX6-p_jCQT46blpFllfMH4wIFwuV-EO8DSkzZybQV7E';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: false, // Changed to false to require fresh login each time
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    storageKey: 'nellai-auth-token',
    flowType: 'pkce'
  },
  global: {
    headers: {
      'X-Client-Info': 'nellai-vegetable-shop'
    }
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          phone?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          phone?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          phone?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      shipping_addresses: {
        Row: {
          id: string;
          user_id: string;
          address_line1: string;
          address_line2?: string;
          city: string;
          state: string;
          pincode: string;
          country: string;
          is_default: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          address_line1: string;
          address_line2?: string;
          city: string;
          state: string;
          pincode: string;
          country?: string;
          is_default?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          address_line1?: string;
          address_line2?: string;
          city?: string;
          state?: string;
          pincode?: string;
          country?: string;
          is_default?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          order_number: string;
          customer_name: string;
          customer_email: string;
          customer_phone: string;
          delivery_address: string;
          city: string;
          state: string;
          pincode: string;
          items: OrderItem[];
          subtotal: number;
          delivery_fee: number;
          total_amount: number;
          payment_method: 'cod' | 'online';
          payment_status: 'pending' | 'paid' | 'failed';
          order_status: 'placed' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
          razorpay_order_id?: string;
          razorpay_payment_id?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          order_number: string;
          customer_name: string;
          customer_email: string;
          customer_phone: string;
          delivery_address: string;
          city: string;
          state: string;
          pincode: string;
          items: OrderItem[];
          subtotal: number;
          delivery_fee?: number;
          total_amount: number;
          payment_method: 'cod' | 'online';
          payment_status?: 'pending' | 'paid' | 'failed';
          order_status?: 'placed' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
          razorpay_order_id?: string;
          razorpay_payment_id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          order_number?: string;
          customer_name?: string;
          customer_email?: string;
          customer_phone?: string;
          delivery_address?: string;
          city?: string;
          state?: string;
          pincode?: string;
          items?: OrderItem[];
          subtotal?: number;
          delivery_fee?: number;
          total_amount?: number;
          payment_method?: 'cod' | 'online';
          payment_status?: 'pending' | 'paid' | 'failed';
          order_status?: 'placed' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
          razorpay_order_id?: string;
          razorpay_payment_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      payment_details: {
        Row: {
          id: string;
          order_id: string;
          payment_method: string;
          amount: number;
          currency: string;
          status: 'pending' | 'completed' | 'failed' | 'refunded';
          gateway_response?: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          payment_method: string;
          amount: number;
          currency?: string;
          status?: 'pending' | 'completed' | 'failed' | 'refunded';
          gateway_response?: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          payment_method?: string;
          amount?: number;
          currency?: string;
          status?: 'pending' | 'completed' | 'failed' | 'refunded';
          gateway_response?: any;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      order_summary: {
        Row: {
          id: string;
          order_number: string;
          customer_name: string;
          customer_email: string;
          total_amount: number;
          payment_status: string;
          order_status: string;
          created_at: string;
          user_name: string;
        };
      };
    };
  };
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  unit: string;
}

export interface ShippingAddress {
  id: string;
  user_id: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}