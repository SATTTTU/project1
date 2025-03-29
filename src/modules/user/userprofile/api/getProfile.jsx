import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

// Fetch User Profile API
const getUserProfile = async () => {
  const response = await api.get("/api/get-profile"); 
  console.log("Profile Data:", response.data);
  return response.data;
};

export const useProfile = (queryConfig = {}) => {
  return useQuery({
    queryKey: ["userProfile"], 
    queryFn: getUserProfile,
    ...queryConfig,
  });
};
