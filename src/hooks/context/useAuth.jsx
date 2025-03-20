import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const adminToken = localStorage.getItem("admin_token");
    const cookToken = localStorage.getItem("cook_token");
    const userToken = localStorage.getItem("user_token");
    

    if (adminToken) {
      setUser({ type: "admin", token: adminToken });
    } else if (cookToken) {
      setUser({ type: "cook", token: cookToken });
    } else if (userToken) {
      setUser({ type: "user", token: userToken });
    } else {
      setUser(null);
    }

    setLoading(false);
  }, []);

  const login = (userData, token) => {
    if (userData?.type === "admin") {
      localStorage.setItem("admin_token", token);
      localStorage.removeItem("cook_token"); // Ensure cook token is cleared
    } else if (userData?.type === "cook") {
      localStorage.setItem("cook_token", token);
      localStorage.removeItem("admin_token"); // Ensure admin token is cleared
    }else if (userData?.type === "user") {
      localStorage.setItem("user_token", token);
      localStorage.removeItem("admin_token");
      localStorage.removeItem("cook_token");
       // Ensure admin token is cleared
    }
    setUser({ type: userData.type, token });
  };

  const isAuthenticated = !!user;

  const checkPermission = (allowedRoles) => {
    if (!user) return false;
    return allowedRoles.length === 0 || allowedRoles.includes(user.type);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, checkPermission, login }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
