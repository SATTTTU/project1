"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuthStatus = () => {
      // Get token from localStorage
      const token = localStorage.getItem("token_user")
      const user = localStorage.getItem("active_user")
  
      console.log("Auth check - token found:", !!token)
  
      if (token && user) {
        // In a real app, you might want to validate the token with your backend
        setIsAuthenticated(true)
  
        // Load user data from the "active_user" key
        try {
          const userData = JSON.parse(user)
          setUser(userData)
        } catch (error) {
          console.error("Failed to parse user data:", error)
        }
      } else {
        // Explicitly set to false if no token
        setIsAuthenticated(false)
      }
  
      setLoading(false)
    }
  
    checkAuthStatus()
  }, [])
  

  // Login function
  const login = (userData, token) => {
    localStorage.setItem("authToken", token)
    localStorage.setItem("userData", JSON.stringify(userData))
    setIsAuthenticated(true)
    setUser(userData)
    console.log("Login successful, auth state:", true)
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userData")
    setIsAuthenticated(false)
    setUser(null)
    console.log("Logout successful, auth state:", false)
  }

  // Auth context value
  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
  }

  console.log("Auth Provider state:", { isAuthenticated, loading })

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

