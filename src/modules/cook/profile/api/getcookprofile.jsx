import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

const fetchCookProfile = async () => {
  const response = await api.get("/api/cooks/get-profile");

  return response.data;
};

export const useProfile = () => {
  return useQuery({
    queryKey: ["CookProfile"],
    queryFn: fetchCookProfile,
    staleTime: 600000, // Cache for 10 minutes
  });
};
