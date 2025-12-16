import { createContext, useContext, ReactNode } from 'react'
import { useSupabaseAuth } from '@/hooks/use-supabase-auth'
import { User as SupabaseUser } from '@supabase/supabase-js'

export interface User {
  id: string
  email: string
  name?: string
  role: 'owner' | 'admin' | 'user'
  createdAt: string
  avatarUrl?: string
}

interface SupabaseAuthContextType {
  user: User | null
  supabaseUser: SupabaseUser | null
  isAuthenticated: boolean
  loading: boolean
  signUp: (email: string, password: string, metadata?: Record<string, any>) => Promise<any>
  signIn: (email: string, password: string) => Promise<any>
  signOut: () => Promise<any>
  resetPassword: (email: string) => Promise<any>
  updatePassword: (newPassword: string) => Promise<any>
}

const SupabaseAuthContext = createContext<SupabaseAuthContextType | undefined>(undefined)

export function SupabaseAuthProvider({ children }: { children: ReactNode }) {
  const auth = useSupabaseAuth()

  const transformUser = (supabaseUser: SupabaseUser | null): User | null => {
    if (!supabaseUser) return null
    
    return {
      id: supabaseUser.id,
      email: supabaseUser.email || '',
      name: supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0],
      role: supabaseUser.user_metadata?.role || 'user',
      createdAt: supabaseUser.created_at,
      avatarUrl: supabaseUser.user_metadata?.avatar_url,
    }
  }

  const value: SupabaseAuthContextType = {
    user: transformUser(auth.user),
    supabaseUser: auth.user,
    isAuthenticated: auth.isAuthenticated,
    loading: auth.loading,
    signUp: auth.signUp,
    signIn: auth.signIn,
    signOut: auth.signOut,
    resetPassword: auth.resetPassword,
    updatePassword: auth.updatePassword,
  }

  return (
    <SupabaseAuthContext.Provider value={value}>
      {children}
    </SupabaseAuthContext.Provider>
  )
}

export function useSupabaseAuthContext() {
  const context = useContext(SupabaseAuthContext)
  if (context === undefined) {
    throw new Error('useSupabaseAuthContext must be used within a SupabaseAuthProvider')
  }
  return context
}
