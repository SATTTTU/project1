import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export const setCookLocation = (data) => {
  return api.post("/api/cooks/set-location", data);
};

export const UseSetCookLocation = (options = {}) => {
  return useMutation({
    mutationFn: setCookLocation,
    onError: (error) => {
      console.error("Error setting location:", error);
    },
    ...options,
  });
};
