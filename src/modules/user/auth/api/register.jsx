import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";
 // Import your configured Axios instance

// API function to register a user
const registerUser = async (userData) => {
   api.post("/api/register", userData);
  // No need to extract .data since your interceptor already returns response.data
};

export const useUserRegister = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: registerUser,
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