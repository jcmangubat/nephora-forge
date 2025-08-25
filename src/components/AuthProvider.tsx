import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check localStorage for existing session on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem("nephoraforge-auth")
    if (storedAuth === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  const login = () => {
    setIsAuthenticated(true)
    localStorage.setItem("nephoraforge-auth", "true")
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("nephoraforge-auth")
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}