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
      // Clear user session (localStorage, sessionStorage, cookies)
      localStorage.removeItem("token");
    //   sessionStorage.removeItem("token");
    //   document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    },
    ...mutationConfig,
  });

  return {
    logout: mutation.mutateAsync, // Renamed for clarity
    isLoading: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};
