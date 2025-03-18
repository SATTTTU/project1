// import { useUserLogout } from "@/hooks/useUserLogout";

import { useUserLogout } from "../../auth/api/logout";

const LogoutButton = () => {
  const { logout, isLoading } = useUserLogout();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/"; // Redirect after logout
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <button onClick={handleLogout} disabled={isLoading}>
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;
