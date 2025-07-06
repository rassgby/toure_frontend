"use client"

import { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import apiService from "@/lib/api"

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  fullName: string
  initials: string
  phone?: string
  organization?: string
  department?: string
  position?: string
  lastLogin?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (credentials: { email: string; password: string; role: string }) => Promise<void>
  register: (userData: any) => Promise<void>
  logout: () => void
  updateProfile: (profileData: any) => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        setLoading(false)
        return
      }

      const response = await apiService.getProfile()
      setUser(response.user)
    } catch (error) {
      console.error("Erreur vérification auth:", error)
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials: { email: string; password: string; role: string }) => {
    try {
      const response = await apiService.login(credentials)
      setUser(response.user)

      // Redirection selon le rôle
      switch (response.user.role) {
        case "rh":
          router.push("/dashboard?role=rh")
          break
        case "tuteur":
          router.push("/dashboard?role=tuteur")
          break
        case "stagiaire":
          router.push("/dashboard?role=stagiaire")
          break
        case "direction":
          router.push("/dashboard?role=direction")
          break
        default:
          router.push("/dashboard")
      }
    } catch (error) {
      throw error
    }
  }

  const register = async (userData: any) => {
    try {
      const response = await apiService.register(userData)
      setUser(response.user)
      router.push("/dashboard")
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    apiService.logout()
    setUser(null)
    router.push("/accueil")
  }

  const updateProfile = async (profileData: any) => {
    try {
      const response = await apiService.updateProfile(profileData)
      setUser(response.user)
    } catch (error) {
      throw error
    }
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
