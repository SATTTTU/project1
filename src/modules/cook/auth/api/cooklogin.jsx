import { api, saveUserData, clearAuthData } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

const loginCook = async (cookData) => {
  try {
    clearAuthData();
    
    const response = await api.post("/api/cooks/login", cookData);
    console.log("Cook login response:", response);
    
    const token = response.token || response.data?.token;
    
    if (token) {
      saveUserData("cook", token);
    } else {
      console.error("Response structure:", JSON.stringify(response, null, 2));
    }
    
    return response;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const useCookLogin = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: loginCook,
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