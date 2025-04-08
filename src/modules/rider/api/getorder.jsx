import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

const fetchUserOrder = async () => {
  const token = localStorage.getItem("rider_token");

  if (!token) {
    throw new Error("No authentication token found");
  }

  try {
    const response = await api.get(`/api/riders/get-order-rides`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Orders fetched:", response.data);

    if (!response.data) {
      throw new Error("No orders found in the response");
    }

    return response.data;
  } catch (error) {
    console.error("Fetch order item error:", error);
    throw error;
  }
};

export const useFetchOrder = ({ queryConfig } = {}) => {
  const query = useQuery({
    queryKey: ["orderItem"],
    queryFn: fetchUserOrder,
    ...queryConfig,
  });

  return {
    data: query.data || { data: [] },  // Return the full response object with a default empty data array
    isLoading: query.isLoading,
    error: query.error,
    isError: query.isError,
    isSuccess: query.isSuccess,
  };
};