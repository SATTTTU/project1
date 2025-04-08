import { api } from "@/lib/api-client"
import { useQuery } from "@tanstack/react-query"

const getPerformance = async (cookId) => {
  try {
    const response = await api.get(`/api/admins/cooks-performance/${cookId}`)
    console.log("Raw API response:", response)

    // The API returns { success, data, message } format
    return response
  } catch (error) {
    console.error("Error fetching performance:", error)
    return { success: false, data: [], message: "Failed to fetch order history" }
  }
}

export const usegetPerformance = (cookId, queryConfig = {}) => {
  return useQuery({
    queryKey: ["cook-performance", cookId],
    queryFn: () => getPerformance(cookId),
    ...queryConfig,
  })
}

