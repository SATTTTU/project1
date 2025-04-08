import { api } from "@/lib/api-client"
import { useQuery } from "@tanstack/react-query"

const getAllHistory = async () => {
  try {
    const response = await api.get("/api/cooks/list-cooking-history")
    console.log("Raw API response:", response)

    // The API returns { success, data, message } format
    return response
  } catch (error) {
    console.error("Error fetching history:", error)
    return { success: false, data: [], message: "Failed to fetch order history" }
  }
}

export const usegetAllHistory = (queryConfig = {}) => {
  return useQuery({
    queryKey: ["allorder-history"],
    queryFn: getAllHistory,
    ...queryConfig,
  })
}

