import { useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { User, Session, AuthError } from '@supabase/supabase-js'
import { toast } from 'sonner'

export function useSupabaseAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setLoading(false)
      return
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, metadata?: Record<string, any>) => {
    if (!isSupabaseConfigured()) {
      toast.error('Supabase no está configurado')
      return { user: null, session: null, error: { message: 'Supabase not configured' } as AuthError }
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      })
      
      if (error) throw error
      
      if (data.user && data.session) {
        toast.success('Cuenta creada exitosamente')
        return { user: data.user, session: data.session, error: null }
      }
      
      toast.info('Revisa tu correo para confirmar tu cuenta')
      return { user: data.user, session: null, error: null }
    } catch (error) {
      const authError = error as AuthError
      toast.error(authError.message || 'Error al crear cuenta')
      return { user: null, session: null, error: authError }
    }
  }

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured()) {
      toast.error('Supabase no está configurado')
      return { user: null, session: null, error: { message: 'Supabase not configured' } as AuthError }
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) throw error
      
      toast.success('Sesión iniciada correctamente')
      return { user: data.user, session: data.session, error: null }
    } catch (error) {
      const authError = error as AuthError
      toast.error(authError.message || 'Error al iniciar sesión')
      return { user: null, session: null, error: authError }
    }
  }

  const signOut = async () => {
    if (!isSupabaseConfigured()) {
      toast.error('Supabase no está configurado')
      return { error: { message: 'Supabase not configured' } as AuthError }
    }

    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      toast.success('Sesión cerrada')
      return { error: null }
    } catch (error) {
      const authError = error as AuthError
      toast.error(authError.message || 'Error al cerrar sesión')
      return { error: authError }
    }
  }

  const resetPassword = async (email: string) => {
    if (!isSupabaseConfigured()) {
      toast.error('Supabase no está configurado')
      return { error: { message: 'Supabase not configured' } as AuthError }
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      
      if (error) throw error
      
      toast.success('Correo de recuperación enviado')
      return { error: null }
    } catch (error) {
      const authError = error as AuthError
      toast.error(authError.message || 'Error al enviar correo')
      return { error: authError }
    }
  }

  const updatePassword = async (newPassword: string) => {
    if (!isSupabaseConfigured()) {
      toast.error('Supabase no está configurado')
      return { error: { message: 'Supabase not configured' } as AuthError }
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })
      
      if (error) throw error
      
      toast.success('Contraseña actualizada')
      return { error: null }
    } catch (error) {
      const authError = error as AuthError
      toast.error(authError.message || 'Error al actualizar contraseña')
      return { error: authError }
    }
  }

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
    isAuthenticated: !!user,
  }
}
