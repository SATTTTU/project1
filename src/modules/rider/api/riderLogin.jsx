import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

const loginRider = async (riderData) => {
  try {
    const response = await api.post("/api/riders/login", riderData);

    console.log("Rider login response:", response);

    if (response?.data?.token) {
      localStorage.setItem("rider_token", response.data.token);
      return response.data; // Return the response data if needed
    } else {
      throw new Error("No token received.");
    }
  } catch (error) {
    console.error("Login error:", error);
    throw new Error(error.response?.data?.message || error.message); // Handle errors gracefully
  }
};

export const useRiderLogin = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: loginRider,
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
