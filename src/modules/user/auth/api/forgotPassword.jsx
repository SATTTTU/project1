import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

const forgotPassword = async (userData) => {
  const response = await api.post("/api/password/forgot", userData);
  
  // Store token and email in localStorage
  if (response.data && response.data.token && response.data.token.token) {
    localStorage.setItem('token', response.data.token.token);
    localStorage.setItem('email', userData.email);
    console.log("Token stored successfully:", response.data.token.token);
  }
  
  return response.data;
};

export const useForgotPassword = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: forgotPassword,
    ...mutationConfig,
  });

  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};