"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuthStatus = () => {
      // Get token based on the same keys used in api-client.js
      const userType = localStorage.getItem("user_type")
      const adminToken = localStorage.getItem("admin_token") || localStorage.getItem("authToken")
      const cookToken = localStorage.getItem("cook_token")
      const activeUser = localStorage.getItem("active_user")
      

      // Determine if we have a valid token
      const hasValidToken =
        (userType === "admin" && adminToken && adminToken !== "undefined") ||
        (userType === "cook" && cookToken && cookToken !== "undefined")

      console.log("Auth check - token found:", hasValidToken, "user type:", userType)

      if (hasValidToken && activeUser) {
        setIsAuthenticated(true)

        setUser({
          type: userType,
        })
      } else {
        setIsAuthenticated(false)
        setUser(null)
      }

      setLoading(false)
    }

    checkAuthStatus()

    window.addEventListener("storage", checkAuthStatus)

    return () => {
      window.removeEventListener("storage", checkAuthStatus)
    }
  }, [])

  const login = (userData, token) => {
    const userType = userData.type || "admin" 

    localStorage.setItem("user_type", userType)

    if (userType === "admin") {
      localStorage.setItem("admin_token", token)
      localStorage.setItem("authToken", token) 
    } else if (userType === "cook") {
      localStorage.setItem("cook_token", token)
    }

    localStorage.setItem("active_user", userType)

    setIsAuthenticated(true)
    setUser(userData)
    console.log("Login successful, auth state:", true)
  }

  // Logout function - updated to match clearAuthData in api-client.js
  const logout = () => {
    // Clear all auth-related localStorage items
    localStorage.removeItem("user_type")
    localStorage.removeItem("admin_token")
    localStorage.removeItem("cook_token")
    localStorage.removeItem("active_user")
    localStorage.removeItem("authToken")

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

  console.log("Auth Provider state:", { isAuthenticated, loading, userType: user?.type })

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

