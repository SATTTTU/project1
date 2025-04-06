import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";


export const getTotalUsers = () => {
  return api.get("/api/admins/get-total-users");
};

export const getTotalCooks = () => {
  return api.get("/api/admins/get-total-cooks");
};

export const getTotalOrders = () => {
  return api.get("/api/admins/get-total-orders");
};


export const useGetTotalUsers = () => {
    return useQuery({
      queryKey: ["total-users"],
      queryFn: async () => {
        const response = await getTotalUsers();
        return response?.data ?? 0; // ✅ Ensures a fallback value
      },
    });
  };
  
  export const useGetTotalCooks = () => {
    return useQuery({
      queryKey: ["total-cooks"],
      queryFn: async () => {
        const response = await getTotalCooks();
        console.log("Total Cooks Response:", response); // ✅ Debugging
        return response?.data ?? 0; // ✅ Avoids undefined
      },
    });
  };
  
  export const useGetTotalOrders = () => {
    return useQuery({
      queryKey: ["total-orders"],
      queryFn: async () => {
        const response = await getTotalOrders();
        return response?.data ?? 0; // ✅ Prevents crash
      },
    });
  };
  
