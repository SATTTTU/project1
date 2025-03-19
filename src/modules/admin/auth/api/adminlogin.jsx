import { api, saveUserData, clearAuthData } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

const loginAdmin = async (adminData) => {
  try {
    clearAuthData();
    
    const response = await api.post("/api/admins/login", adminData);
    console.log("Admin login response:", response);
    
    const token = response.token || response.data?.token;
    
    if (token) {
      saveUserData("admin", token);
      console.log("✅ Admin token stored successfully in localStorage");
    } else {
      console.error("❌ No token received from server for admin login!");
      console.error("Response structure:", JSON.stringify(response, null, 2));
    }
    
    return response;
  } catch (error) {
    console.error("Login error:", error);
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