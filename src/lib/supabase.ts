import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

const createSupabaseClient = (): SupabaseClient => {
  if (!supabaseUrl || !supabaseAnonKey) {
    return createClient('https://placeholder.supabase.co', 'placeholder-key', {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      }
    })
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      storage: {
        getItem: (key: string) => {
          return window.spark.kv.get<string>(key).then(value => value || null)
        },
        setItem: (key: string, value: string) => {
          return window.spark.kv.set(key, value)
        },
        removeItem: (key: string) => {
          return window.spark.kv.delete(key)
        }
      }
    }
  })
}

export const supabase = createSupabaseClient()

export const isSupabaseConfigured = () => {
  return !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY)
}

export type Database = {
  public: {
    Tables: {
      accommodations: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          owner_id: string
          name: string
          description: string
          category: string
          city: string
          department: string
          address: string
          latitude: number | null
          longitude: number | null
          images: string[]
          amenities: string[]
          rating: number
          reviews_count: number
          base_price: number
          currency: string
          status: 'active' | 'inactive' | 'pending'
        }
        Insert: Omit<Database['public']['Tables']['accommodations']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['accommodations']['Insert']>
      }
      room_types: {
        Row: {
          id: string
          accommodation_id: string
          name: string
          description: string
          max_guests: number
          price_per_night: number
          available_rooms: number
          images: string[]
          amenities: string[]
        }
        Insert: Omit<Database['public']['Tables']['room_types']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['room_types']['Insert']>
      }
      bookings: {
        Row: {
          id: string
          created_at: string
          accommodation_id: string
          room_type_id: string
          user_id: string | null
          guest_name: string
          guest_email: string
          guest_phone: string
          check_in: string
          check_out: string
          guests_count: number
          total_price: number
          currency: string
          status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          payment_status: 'pending' | 'paid' | 'refunded'
          payment_id: string | null
          special_requests: string | null
        }
        Insert: Omit<Database['public']['Tables']['bookings']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['bookings']['Insert']>
      }
      user_preferences: {
        Row: {
          id: string
          user_id: string
          category_scores: Record<string, number>
          viewed_accommodations: string[]
          clicked_accommodations: string[]
          booked_accommodations: string[]
          search_history: string[]
          last_updated: string
        }
        Insert: Omit<Database['public']['Tables']['user_preferences']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['user_preferences']['Insert']>
      }
      pricing_data: {
        Row: {
          id: string
          city: string
          department: string
          category: string
          season: 'high' | 'low'
          budget_min: number
          budget_max: number
          mid_range_min: number
          mid_range_max: number
          premium_min: number
          premium_max: number
          luxury_min: number
          luxury_max: number
          currency: string
          last_updated: string
        }
        Insert: Omit<Database['public']['Tables']['pricing_data']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['pricing_data']['Insert']>
      }
      blog_posts: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          slug: string
          excerpt: string
          content: string
          category: string
          tags: string[]
          featured_image: string
          author: string
          published: boolean
          generated_by_ai: boolean
        }
        Insert: Omit<Database['public']['Tables']['blog_posts']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['blog_posts']['Insert']>
      }
    }
  }
}
