import { api, saveUserData, clearAuthData } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

const loginUser = async (userData) => {
  try {
    clearAuthData();

    const response = await api.post("/api/login", userData);
    console.log("User login response:", response.data);

    const token = response.data?.token;
    console.log("token****", token);
    const userId = response.data?.user?.id;

    if (!token || !userId) {
      throw new Error("No token or user ID received from server");
    }

    saveUserData("user", token);
    localStorage.setItem("user_id", userId); 

    const savedToken = localStorage.getItem("user_token");
    const savedUserId = localStorage.getItem("user_id");

    if (!savedToken || !savedUserId || savedToken === "undefined") {
      throw new Error("Failed to save token or user ID to localStorage");
    }

    console.log("✅ User token and ID stored successfully in localStorage");

    setTimeout(() => {
      console.log("Token after 1 second:", localStorage.getItem("user_token"));
      console.log("User ID after 1 second:", localStorage.getItem("user_id"));
    }, 1000);

    return {
      ...response,
      token,
      user: {
        id: userId,
        type: "user",
      },
    };
  } catch (error) {
    console.error("Login error:", error);
    clearAuthData();
    throw error;
  }
};

export const useUserLogin = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: loginUser,
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
