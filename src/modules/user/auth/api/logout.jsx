import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

const logoutUser = async () => {
  try {
    const response = await api.post("/api/logout"); // No need to pass userData unless required
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};

export const useUserLogout = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      localStorage.removeItem("token");
    },
    ...mutationConfig,
  });

  return {
    logout: mutation.mutateAsync, 
    isLoading: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};
