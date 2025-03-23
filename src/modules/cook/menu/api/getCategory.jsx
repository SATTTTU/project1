import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

const fetchCategory = async () => {
  try {
    const response = await api.get("/api/cooks/get-menu");
    console.log("Category fetch response:", response);

    // डाटा स्ट्रक्चर चेक गर्ने
    if (!response.data) {
      throw new Error("No data found in the response");
    }

    // डाटा फर्म्याटिङ
    const formattedCategories = response.data.map((category) => ({
      ...category,
      isExpanded: false, // UI को लागि आवश्यक
      items: category.items || [], // items array नभएमा खाली array प्रयोग गर्ने
    }));

    return formattedCategories;
  } catch (error) {
    console.error("Fetch category error:", error);
    throw error;
  }
};

export const useCategory = ({ queryConfig } = {}) => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategory,
    staleTime: 1000 * 60 * 5, 
    ...queryConfig,
  });
};
