import { api } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Create Category API Call
export const createCategory = async (data) => {
  try {
    console.log("🔍 Sending request to API with data:", data);

    const endpoint =
      data.action === "update"
        ? `/api/cooks/update-menu/${data.id}`
        : `/api/cooks/store-menu`;

    const method = data.action === "update" ? "put" : "post";

    const response = await api[method](endpoint, {
      name: data.name,
      description: data.description,
    });

    console.log("✅ API Response:", response);
    return response.data; // Return the category data from the response
  } catch (error) {
    console.error("❌ API Error:", error.response?.data || error.message);
    throw error;
  }
};

// Custom Hook for Creating Category
export const useCreateCategory = ({ mutationConfig } = {}) => {
  const queryClient = useQueryClient(); // Get the queryClient instance

  const mutation = useMutation({
    mutationFn: createCategory,
    onSuccess: (newCategory) => {
      // Invalidate the query after a successful mutation to trigger a refresh
      queryClient.invalidateQueries(["categories"]);

      // Optionally, update the query data immediately with the new category
      queryClient.setQueryData(["categories"], (oldCategories) => {
        if (!oldCategories) return [newCategory]; // If there are no existing categories, return a new array with the created category
        return [...oldCategories, newCategory]; // Otherwise, append the new category to the existing list
      });

      if (mutationConfig?.onSuccess) mutationConfig.onSuccess(newCategory); // If there's a custom onSuccess callback, call it
    },
    ...mutationConfig,
  });

  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};
