// src/api/getEarnings.js
import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

// Fetch Earnings API
const getAllEarnings = async () => {
  try {
    const response = await api.get("/api/cooks/earnings");
    console.log("earningssss:", response.data);  // Log the earnings data
    return response;  // Return the earnings data
  } catch (error) {
    console.error("Error fetching earnings:", error);
    throw new Error("Unable to fetch earnings");  // Throw an error if the request fails
  }
};

export const useAllEarnings = (queryConfig = {}) => {
    return useQuery({
      queryKey: ["allEarning"],  // Unique key for this query
      queryFn: getAllEarnings,   // The API call function
      ...queryConfig,            // Allow additional query config options (e.g., refetching, retry, etc.)
    });
  };
