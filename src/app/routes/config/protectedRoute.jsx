import { useAuth } from "@/hooks/context/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  console.log("Protected Route Check:", {
    path: location.pathname,
    isAuthenticated,
    loading,
  });

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

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to login");
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  console.log("Authentication successful, rendering protected content");
  return <Outlet />;
};

export default ProtectedRoute;
