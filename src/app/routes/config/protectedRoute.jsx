import { useAuth } from "@/hooks/context/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { isAuthenticated, loading, user, setUser } = useAuth();
  const location = useLocation();
  const [roleSynced, setRoleSynced] = useState(false);


  useEffect(() => {
    const userType = allowedRoles[0];
    localStorage.setItem('user_type', userType);
    localStorage.setItem('active_user', userType);
    localStorage.setItem('user_type', userType);

    // Handle visibility changes (e.g., switching tabs)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const storedUserType = localStorage.getItem('active_user');
        if (storedUserType !== userType) {
          localStorage.setItem('user_type', userType);
          localStorage.setItem('active_user', userType);
   
  
        }
      }
    };

    // Handle focus changes (e.g., switching browser windows)
    const handleFocus = () => {
      const storedUserType = localStorage.getItem('active_user');
      if (storedUserType !== userType) {
        localStorage.setItem('user_type', userType);
        localStorage.setItem('active_user', userType);
        localStorage.setItem('user_type', userType);

      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [allowedRoles]);



  // Sync user role based on current allowedRoles
  useEffect(() => {
    if (!user || loading) return;

    const expectedRole = allowedRoles[0]; // assuming one allowed role per route

    if (expectedRole && user?.type !== expectedRole) {
      // Update user context but preserve token
      setUser(prev => ({
        ...prev,
        type: expectedRole,
      }));

  
      localStorage.setItem(
        "active_user",
        expectedRole
      );
	  localStorage.setItem(
        "user_type",
        expectedRole
      );
    }

    // Role is now synced
    setRoleSynced(true);
  }, [allowedRoles, user?.type, setUser, loading]);

  if (import.meta.env.MODE === "development") {
    console.log("Protected Route Check:", {
      path: location.pathname,
      isAuthenticated,
      loading,
      userRole: user?.type,
      requiredRoles: allowedRoles,
      roleSynced,
    });
  }



  // Wait until role is synced to avoid premature redirects
  if ((loading || !roleSynced) && isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <Loader2 className="animate-spin text-gray-600 w-10 h-10 mx-auto" />
          <p className="text-gray-600 mt-2">Loading authentication status...</p>
        </div>
      </div>
    );
  }


  if (isAuthenticated && roleSynced && (allowedRoles[0] === location.pathname.split("/")[1] !=='dashboard' || allowedRoles[0] === location.pathname.split("/")[1])) {

    const hasRequiredRole =
      allowedRoles.length === 0 || allowedRoles.includes(user?.type);

    if (!hasRequiredRole) {
      // Role mismatch redirection
      const redirects = {
        cook: {
          "/admin": "/cook/homepage",
          "/user": "/cook/homepage",
        },
        admin: {
          "/cook": "/admin/dashboard",
          "/user": "/admin/dashboard",
        },
        user: {
          "/admin": "/dashboard",
          "/cook": "/dashboard",
        },
      };

      const roleRedirects = redirects[user?.type] || {};
      const redirectPath =
        Object.keys(roleRedirects).find(prefix =>
          location.pathname.startsWith(prefix)
        ) && roleRedirects[location.pathname.split("/")[1]]
          ? roleRedirects[location.pathname.split("/")[1]]
          : null;

      if (redirectPath) {
        return <Navigate to={redirectPath} replace state={{ from: location }} />;
      }

      // Default fallback
      const defaultRedirects = {
        admin: "/admin/dashboard",
        cook: "/cook/homepage",
        user: "/dashboard",
      };

      return (
        <Navigate
          to={defaultRedirects[user?.type] || "/"}
          replace
          state={{ from: location }}
        />
      );
    }

    return <Outlet />;
  }

  // Unauthenticated redirect logic
  let loginPath = "/login";

  if (location.pathname.includes("/admin")) {
    loginPath = "/admin/login";
  } else if (location.pathname.includes("/cook")) {
    loginPath = "/cook/login";
  } else if (location.pathname.includes("/user")) {
    loginPath = "/login";
  }

  return <Navigate to={loginPath} replace state={{ from: location }} />;
};

export default ProtectedRoute;
