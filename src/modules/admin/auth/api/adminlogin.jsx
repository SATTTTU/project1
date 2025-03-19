import { api, saveUserData, clearAuthData } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

const loginAdmin = async (adminData) => {
  try {
    clearAuthData();

    const response = await api.post("/api/admins/login", adminData);
    console.log("Admin login response:", response);

    // Check if response has token directly or nested in data
    const token = response.token || response.data?.token;

    if (!token) {
      throw new Error("No token received from server");
    }

    // Save user data with token
    saveUserData("admin", token);

    // Verify token was saved
    const savedToken = localStorage.getItem("admin_token");
    if (!savedToken || savedToken === "undefined") {
      throw new Error("Failed to save token to localStorage");
    }

    console.log("✅ Admin token stored successfully in localStorage");

    // Add a delay to confirm token is not cleared immediately
    setTimeout(() => {
      const confirmedToken = localStorage.getItem("admin_token");
      console.log("Token after 1 second:", confirmedToken);
    }, 1000);

    return {
      ...response,
      token,
      user: {
        type: "admin",
      },
    };
  } catch (error) {
    console.error("Login error:", error);
    // Clear any partial auth data on error
    clearAuthData();
    throw error;
  }
};

export const useAdminLogin = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: loginAdmin,
    ...mutationConfig,
  });

  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};