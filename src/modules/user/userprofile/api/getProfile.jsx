// import { api } from "@/lib/api-client";
// import { useQuery } from "@tanstack/react-query";

// const fetchUserProfile = async () => {
//   const token = localStorage.getItem("user_token");

//   // if (!token) {
//   //   throw new Error("User not authenticated");
//   // }

//   // const response = await api.get("/api/get-profile", {
//   //   headers: { Authorization: `Bearer ${token}` },
//   // });

//   return response.data;
// };

// export const useProfile = () => {
//   return useQuery({
//     queryKey: ["userProfile"],
//     queryFn: fetchUserProfile,
//     staleTime: 600000, // Cache for 10 minutes
//   });
// };
import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

// Admin Profile Edit API
const getUserProfile = async (userData) => {
  const response = await api.get("/api/get-profile", userData);
  console.log("data",response.data)
  return response.data;
};

export const useProfile = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: getUserProfile,
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
