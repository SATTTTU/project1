
import { createContext, useContext, useEffect, useState } from "react"
import { getToken, getCurrentUserType } from "@/lib/api-client"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Load authentication state on initial render


  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'auth_token' || event.key === 'active_user') {
        const newUser = JSON.parse(localStorage.getItem('active_user') || '{}');

        let authStatus = false;
        if(newUser === 'user'){
          authStatus = localStorage.getItem('user_token');
        }else if (newUser === 'cook'){
          authStatus = localStorage.getItem('cook_token');
        }else if (newUser === 'admin'){
          authStatus = localStorage.getItem('admin_token');
        }


        setUser((prevUser) => ({
          ...prevUser,
          type: newUser.type, // only update the type
          authStatus : localStorage.getItem('user_token'),
          isAuthenticated:authStatus
        }));
      }
    };
  
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);


  useEffect(() => {
  const loadAuthState = () => {
      try {
        const token = getToken() // Use the getToken function from api-client
        const userType = getCurrentUserType()

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
  }, [])

  const login = (userData, token) => {
    if (!userData?.type || !token) {
      console.error("Invalid login data:", { userData, token })
      return
    }

    console.log(`Setting user in auth context: ${userData.type}`)
    setUser({ type: userData.type, token })

  }

  const logout = () => {
    setUser(null)
    const newUser = JSON.parse(localStorage.getItem('active_user') || '{}');

    if(newUser === 'user'){
      localStorage.removeItem('user_token')
    }else if(newUser === 'cook'){
      localStorage.removeItem('cook_token')
    } else if (newUser === 'admin'){
      localStorage.removeItem('admin_token')
    }



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
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

