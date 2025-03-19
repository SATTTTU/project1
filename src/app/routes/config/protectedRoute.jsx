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
      if (user?.type === "cook" && location.pathname.startsWith("/admin")) {
        return <Navigate to="/cook/dashboard" replace state={{ from: location }} />;
      }
      if (user?.type === "admin" && location.pathname.startsWith("/cook")) {
        return <Navigate to="/admin/dashboard" replace state={{ from: location }} />;
      }
      return <Navigate to={user?.type === "admin" ? "/admin/dashboard" : "/admin/login"} replace state={{ from: location }} />;
    }
    return <Outlet />;
  }

  const loginPath = location.pathname.startsWith("/admin")
    ? "/admin/login"
    : "/cook/login";
  return <Navigate to={loginPath} replace state={{ from: location }} />;
};

export default ProtectedRoute;
