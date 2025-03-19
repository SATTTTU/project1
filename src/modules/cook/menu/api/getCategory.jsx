import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

const fetchCategory = async () => {
  try {
    const response = await api.get("/api/cooks/get-menu");

    console.log("Category fetch response:", response);

    // Check if response contains the data
    const categories = response.data || response.categories;

    if (!categories) {
      throw new Error("No categories found in the response");
    }

    return categories;
  } catch (error) {
    console.error("Fetch category error:", error);
    throw error;
  }
};

export const useCategory = ({ queryConfig } = {}) => {
  const query = useQuery({
    queryKey: ["categories"], // Unique query key
    queryFn: fetchCategory,
    ...queryConfig,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
    isError: query.isError,
    isSuccess: query.isSuccess,
  };
};
