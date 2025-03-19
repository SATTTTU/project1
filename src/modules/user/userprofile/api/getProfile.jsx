import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

const fetchUserProfile = async () => {
  const token = localStorage.getItem("token_user");

  if (!token) {
    throw new Error("User not authenticated");
  }

  const response = await api.get("/api/get-profile", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const useProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
    staleTime: 600000, // Cache for 10 minutes
  });
};
