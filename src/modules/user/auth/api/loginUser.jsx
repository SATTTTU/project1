import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

const loginUser = async (userData) => {
   const response =await api.post("/api/login", userData);
  //  return response.data;
  const { token, user } = response.data;
  console.log("first toke", response.data)
  console.log('user',user)
   if (token) {
    localStorage.setItem("active_user", user.name); 
    localStorage.setItem(`token_user`, token);
    console.log("✅ Token stored successfully:", token);
  } else {
    console.error("No token received from server!");
  }

  return response.data; // Return response data
};


export const useUserLogin = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: loginUser,
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