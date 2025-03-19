import { Navigate, Outlet } from "react-router-dom";
import { ROLES } from "../roles"; // Import the roles

// Mock function to get the current user role (Replace this with actual authentication logic)
const getUserRole = () => {
  return localStorage.getItem("role"); // Example: "admin", "cook", "user"
};

const ProtectedRoute = ({ allowedRoles }) => {
  const userRole = getUserRole();

  if (!userRole) {
    return <Navigate to="/user/login" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />; 
};

export default ProtectedRoute;
