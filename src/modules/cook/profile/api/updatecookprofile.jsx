import { api } from "@/lib/api-client"
import { useMutation,useQueryClient } from "@tanstack/react-query"

const updateCookProfile = async (cookData) => {
  console.log("cookdata:", cookData);
  const token = localStorage.getItem("cook_token")

  if (!token) {
    throw new Error("Cook not authenticated")
  }

  const response = await api.post("/api/cooks/update-profile?_method=put", cookData, {
    headers: {
      Authorization: `Bearer ${token}`,
      // Don't set Content-Type here as FormData will set it automatically with boundary
    },
  })
  return response.data
}
export const UpdateCookProfile = ({ mutationConfig } = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateCookProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(["cookProfile"]); 
    },
    ...mutationConfig,
  });
  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isLoading, // Loading state
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  }
}

