
import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

const fetchCookProfile = async () => {
  const token = localStorage.getItem("Cook_token");

  if (!token) {
    throw new Error("Cook not authenticated");
  }

  const response = await api.get("/api/cooks/get-profile", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const useProfile = () => {
  return useQuery({
    queryKey: ["CookProfile"],
    queryFn: fetchCookProfile,
    staleTime: 600000, // Cache for 10 minutes
  });
};
