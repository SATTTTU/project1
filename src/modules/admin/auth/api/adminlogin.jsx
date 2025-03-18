import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

const loginAdmin = async (adminData) => {
  const response = await api.post("/api/admins/login", adminData);
  const { token, user } = response.data;

  if (token) {
    localStorage.setItem("active_user", user); 
    localStorage.setItem(`token_${user}`, token); // Store the token
    console.log("✅ Token stored successfully:", token);
  } else {
    console.error("❌ No token received from server!");
  }

  return response.data; // Return response data
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
