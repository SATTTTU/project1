import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

// Admin Profile Edit API
const getUsers = async (userData) => {
  const response = await api.get("/api/admins/get-users", userData);
  return response.data;
};

export const useUserList = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: getUsers,
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
