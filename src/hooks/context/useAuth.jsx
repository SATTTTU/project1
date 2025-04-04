import { createContext, useContext, useEffect, useState } from "react"
import { getToken, getCurrentUserType } from "@/lib/api-client"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userType, setUserType] = useState(null) // Store userType in state

  // Load userType when component mounts
  useEffect(() => {
    console.log("The cureent user type",getCurrentUserType())
    setUserType(getCurrentUserType()) // Fetch userType and store it in state
  }, [])

  // Load authentication state when userType changes
  useEffect(() => {
    if (userType === null) return // Prevent running on initial mount

    const loadAuthState = () => {
      try {
        const token = getToken() 

        console.log("userType is ", userType)

        if (token && userType) {
          setUser({ type: userType, token })
          console.log(`Auth state loaded: User type ${userType} with valid token`)
        } else {
          console.log("No valid auth state found in localStorage")
          setUser(null)
        }
      } catch (error) {
        console.error("Error loading auth state:", error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    loadAuthState()
  }, [userType]) // Now userType is in state, so useEffect runs when it changes

  const login = (userData, token) => {
    if (!userData?.type || !token) {
      console.error("Invalid login data:", { userData, token })
      return
    }

    console.log(`Setting user in auth context: ${userData.type}`)
    setUser({ type: userData.type, token })
    setUserType(userData.type) // Update userType when logging in
  }

  const logout = () => {
    setUser(null)
    setUserType(null) // Reset userType on logout
    // Note: Token removal is handled by the clearAuthData function in api-client
  }

  const isAuthenticated = !!user?.token

  const checkPermission = (allowedRoles) => {
    if (!user) return false
    return allowedRoles.length === 0 || allowedRoles.includes(user.type)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        checkPermission,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
