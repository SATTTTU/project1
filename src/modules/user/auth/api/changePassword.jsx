import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

const changePassword = async (userData) => {
  const response = await api.put("/api/change-password", userData);
  return response.data;
};

export const UserChangePassword = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: changePassword,
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
