import { createContext, useContext, ReactNode, useEffect, useState } from 'react'
import { useKV } from '@github/spark/hooks'

export type UserRole = 'tourist' | 'host' | 'service_provider' | 'admin' | 'superadmin'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  createdAt: string
  avatarUrl?: string
  verified: boolean
  phone?: string
  twoFactorEnabled?: boolean
  preferences?: {
    language: string
    currency: string
    notifications: boolean
  }
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  isTourist: boolean
  isHost: boolean
  isServiceProvider: boolean
  isAdmin: boolean
  isSuperAdmin: boolean
  login: (email: string, password: string, role?: UserRole) => Promise<boolean>
  signup: (email: string, password: string, name: string, role?: UserRole) => Promise<boolean>
  loginWithGoogle: () => Promise<boolean>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<void>
  upgradeToHost: () => Promise<boolean>
  upgradeToServiceProvider: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useKV<User | null>('auth-user', null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, role: UserRole = 'tourist'): Promise<boolean> => {
    try {
      setIsLoading(true)
      
      await new Promise(resolve => setTimeout(resolve, 800))
      
      let assignedRole: UserRole = 'tourist'
      
      if (email === 'superadmin@sendai.com' && password === 'SuperAdmin2025!') {
        assignedRole = 'superadmin'
      } else if (role) {
        assignedRole = role
      }
      
      const mockUser: User = {
        id: `user_${Date.now()}`,
        email,
        name: email.split('@')[0],
        role: assignedRole,
        createdAt: new Date().toISOString(),
        verified: assignedRole === 'superadmin' || assignedRole === 'admin',
        twoFactorEnabled: assignedRole === 'superadmin',
        preferences: {
          language: 'es',
          currency: 'COP',
          notifications: true
        }
      }
      
      setUser(() => mockUser)
      return true
    } catch (error) {
      console.error('Login error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (email: string, password: string, name: string, role: UserRole = 'tourist'): Promise<boolean> => {
    try {
      setIsLoading(true)
      
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const newUser: User = {
        id: `user_${Date.now()}`,
        email,
        name,
        role: role,
        createdAt: new Date().toISOString(),
        verified: false,
        twoFactorEnabled: false,
        preferences: {
          language: 'es',
          currency: 'COP',
          notifications: true
        }
      }
      
      setUser(() => newUser)
      return true
    } catch (error) {
      console.error('Signup error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      setIsLoading(true)
      
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const googleUser: User = {
        id: `google_user_${Date.now()}`,
        email: 'user@gmail.com',
        name: 'Usuario Google',
        role: 'tourist',
        createdAt: new Date().toISOString(),
        verified: true,
        twoFactorEnabled: false,
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=google',
        preferences: {
          language: 'es',
          currency: 'COP',
          notifications: true
        }
      }
      
      setUser(() => googleUser)
      return true
    } catch (error) {
      console.error('Google login error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const upgradeToHost = async (): Promise<boolean> => {
    if (!user || user.role === 'superadmin') return false
    
    try {
      const upgradedUser: User = {
        ...user,
        role: 'host',
        verified: false
      }
      setUser(() => upgradedUser)
      return true
    } catch (error) {
      console.error('Upgrade to host error:', error)
      return false
    }
  }

  const upgradeToServiceProvider = async (): Promise<boolean> => {
    if (!user || user.role === 'superadmin') return false
    
    try {
      const upgradedUser: User = {
        ...user,
        role: 'service_provider',
        verified: false
      }
      setUser(() => upgradedUser)
      return true
    } catch (error) {
      console.error('Upgrade to service provider error:', error)
      return false
    }
  }

  const logout = () => {
    setUser(() => null)
  }

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return
    
    const updatedUser = { ...user, ...data }
    setUser(() => updatedUser)
  }

  const value: AuthContextType = {
    user: user ?? null,
    isAuthenticated: !!user,
    isLoading,
    isTourist: user?.role === 'tourist',
    isHost: user?.role === 'host',
    isServiceProvider: user?.role === 'service_provider',
    isAdmin: user?.role === 'admin',
    isSuperAdmin: user?.role === 'superadmin',
    login,
    signup,
    loginWithGoogle,
    logout,
    updateProfile,
    upgradeToHost,
    upgradeToServiceProvider,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
