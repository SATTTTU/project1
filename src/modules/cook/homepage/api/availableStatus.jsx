// api/availableStatus.js
import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

// API function to update cook's availability status
export const setCookStatus = (data) => {
  return api.post("/api/cooks/update-available-status", data);
};

// Custom hook for setting the cook status
export const UseSetCookStatus = (options = {}) => {
  return useMutation({
    mutationFn: setCookStatus,
    onError: (error) => {
      console.error("Error setting cook status:", error);
    },
    ...options,
  });
};
