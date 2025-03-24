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

  // Show loading indicator
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

  // Handle unauthenticated users
  if (!isAuthenticated) {
    // Extract role from path to determine which login page to redirect to
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const roleFromPath = pathSegments[0] || 'user';
    const validRoles = ['admin', 'cook', 'user'];
    const role = validRoles.includes(roleFromPath) ? roleFromPath : 'user';
    
    return <Navigate to={`/${role}/login`} replace state={{ from: location }} />;
  }
  
  // Handle authenticated users
  const hasRequiredRole = allowedRoles.length === 0 || allowedRoles.includes(user?.type);
  
  if (!hasRequiredRole) {
    // Get user's dashboard based on their role
    const userDashboard = `/${user?.type}/dashboard`;
    
    return <Navigate to={userDashboard} replace state={{ from: location }} />;
  }
  
  // User is authenticated and has the required role
  return <Outlet />;
};

export default ProtectedRoute;