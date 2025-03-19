import { Navigate, Outlet } from "react-router-dom";
import { ROLES } from "../roles"; // Import the roles

// Mock function to get the current user role (Replace this with actual authentication logic)
const getUserRole = () => {
  return localStorage.getItem("role"); // Example: "admin", "cook", "user"
};

const ProtectedRoute = ({ allowedRoles }) => {
  const userRole = getUserRole();

  // If user is not authenticated, redirect to login
  if (!userRole) {
    return <Navigate to="/user/login" replace />;
  }

  // If the user's role is not allowed, redirect to unauthorized page
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />; // Render child routes if authorized
};

export default ProtectedRoute;
