import { useAuth } from "@/hooks/context/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  if (import.meta.env.MODE === "development") {
    console.log("Protected Route Check:", {
      path: location.pathname,
      isAuthenticated,
      loading,
      userRole: user?.type,
      requiredRoles: allowedRoles,
    });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <Loader2 className="animate-spin text-gray-600 w-10 h-10 mx-auto" />
          <p className="text-gray-600 mt-2">Loading authentication status...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    const hasRequiredRole =
      allowedRoles.length === 0 || allowedRoles.includes(user?.type);
    
    if (!hasRequiredRole) {
      // Redirect based on user type and current path
      if (user?.type === "cook" && location.pathname.startsWith("/admin")) {
        return <Navigate to="/cook/homepage" replace state={{ from: location }} />;
      }
      if (user?.type === "cook" && location.pathname.startsWith("/user")) {
        return <Navigate to="/cook/homepage" replace state={{ from: location }} />;
      }
      if (user?.type === "admin" && location.pathname.startsWith("/cook")) {
        return <Navigate to="/admin/dashboard" replace state={{ from: location }} />;
      }
      if (user?.type === "admin" && location.pathname.startsWith("/user")) {
        return <Navigate to="/admin/dashboard" replace state={{ from: location }} />;
      }
      if (user?.type === "user" && location.pathname.startsWith("/admin")) {
        return <Navigate to="/user/dashboard" replace state={{ from: location }} />;
      }
      if (user?.type === "user" && location.pathname.startsWith("/cook")) {
        return <Navigate to="/user/dashboard" replace state={{ from: location }} />;
      }
      
      // Default redirects based on user type
      const defaultRedirects = {
        admin: "/admin/dashboard",
        cook: "/cook/homepage",
        user: "/user/dashboard"
      };
      
      return <Navigate to={defaultRedirects[user?.type] || "/"} replace state={{ from: location }} />;
    }
    return <Outlet />;
  }

  // Fixed logic for unauthenticated users
  let loginPath = "/login"; // Default fallback
  
  if (location.pathname.includes("/admin")) {
    loginPath = "/admin/login";
  } else if (location.pathname.includes("/cook")) {
    loginPath = "/cook/login";
  } else if (location.pathname.includes("/")) {
    loginPath = "/login";
  }
  
  return <Navigate to={loginPath} replace state={{ from: location }} />;
};

export default ProtectedRoute;