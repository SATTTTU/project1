import { api } from "@/lib/api-client"
import { useMutation } from "@tanstack/react-query"

// API call to get location
export const getLocation = () => {
  return api.get(`/api/get-location`)
}

export const usegetLocation = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: getLocation,
    ...mutationConfig,
    onError: (error) => {
      if (error.response && error.response.status === 400) {
        console.error("Location not found:", error.response.data)
      } else {
        console.error("Error getting location:", error)
      }
    },
  })

  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  }
}

