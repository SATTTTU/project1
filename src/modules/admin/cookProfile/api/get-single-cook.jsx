import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export const getSingleCook = (cookId) => {
  return api.get(`/api/admins/get-cook/${cookId}`);
};

export const useGetSingleCook = (cookId) => {
  console.log("dfddffddfdfd");
  return useQuery({
    queryKey: ["cook", cookId], // Added queryKey for caching & refetching
    queryFn: async () => {
      console.log("cook id 9:", cookId);

      if (!cookId) return null; // Prevents unnecessary API calls if cookId is undefined

      try {
        console.log("Fetching cook with ID:", cookId); // Debugging
        const response = await getSingleCook(cookId);
        console.log("API Response:", response.data); // Debugging
        return response.data;
      } catch (error) {
        console.error("Error fetching cook:", error.response?.data || error);
        throw error;
      }
    },
    enabled: !!cookId, // Ensures the query only runs when cookId is valid
  });

  // return {
  //   isLoading: getCookQuery.isLoading,
  //   error: getCookQuery.error,
  //   isError: getCookQuery.isError,
  //   isSuccess: getCookQuery.isSuccess,
  //   data: getCookQuery.data,
  // };
};
