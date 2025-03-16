// hooks/useUpdateProfile.js
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

const updateUserProfile = async (updatedData) => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Unauthorized");
  console.log("Sending data to API:", updatedData); 

  const response = await api.put("/api/update-profile", updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log("Response from API:", response.data);
  return response.data;
};

export const useUpdateProfile = () => {
  return useMutation({ mutationFn: updateUserProfile });
};
