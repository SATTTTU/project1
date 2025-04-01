import { api, saveUserData, clearAuthData } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

const loginUser = async (userData) => {
  try {
    clearAuthData();

    const response = await api.post("/api/login", userData);
    console.log("user login response:", response.data);

    const token = response.token || response.data?.token;

    if (!token) {
      throw new Error("No token received from server");
    }

    // Save user data with token
    saveUserData("user", token);

    // Verify token was saved
    const savedToken = localStorage.getItem("user_token");
    if (!savedToken || savedToken === "undefined") {
      throw new Error("Failed to save token to localStorage");
    }

    console.log("✅ Usertoken stored successfully in localStorage");

    // Add a delay to confirm token is not cleared immediately
    setTimeout(() => {
      const confirmedToken = localStorage.getItem("user_token");
      console.log("Token after 1 second:", confirmedToken);
    }, 1000);

    return {
      ...response,
      token,
      user: {
        type: "user",
      },
    };
  } catch (error) {
    console.error("Login error:", error);
    // Clear any partial auth data on error
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