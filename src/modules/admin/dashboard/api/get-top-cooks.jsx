import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export const getTopCooks = () => {
  return api.get("/api/admins/get-top-cooks");
};

export const useGetPopularCooks = () => {
    return useQuery({
      queryKey: ["top-cooks"],
      queryFn: async () => {
        const response = await getTopCooks();
        return response?.data ?? 0; // ✅ Ensures a fallback value
      },
    });
  };