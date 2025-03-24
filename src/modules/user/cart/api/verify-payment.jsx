import { api } from "@/lib/api-client"
import { useMutation } from "@tanstack/react-query"

const payment = async (userData) => {
  try {
    const response = await api.post("/api/verify-payment", userData)
    console.log("payment", response.data)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Payment verification failed.")
  }
}

export const useVerifyPayment = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: payment,
    ...mutationConfig,
  })

  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  }
}

