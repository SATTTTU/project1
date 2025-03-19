import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

const loginAdmin = async (adminData) => {
  const response = await api.post("/api/admins/login", adminData);
  const { token, admin } = response.data;
  console.log("first,",response.data)
  console.log("first",token,admin);

  if (token) {
    localStorage.setItem("active_user", admin); 
    
    localStorage.setItem(`token_admin`, token); // Store the token
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
