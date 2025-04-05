import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

const createCategoryItem = async (data) => {
  try {
    console.log("🔍 Sending request to API with data:", data);
    
    // Check if it's an update operation and the ID is defined
    const isUpdate = data.action === "update" && data.id !== undefined;
    const method = isUpdate ? "put" : "post";
    
    // Fix the endpoint paths to match what's used in MenuTable
    const endpoint = isUpdate
      ? `/api/cooks/update-menu-item/${data.id}`  // Changed to match MenuTable format
      : `/api/cooks/store-menu-item/${data.category_id}`; // Changed to match MenuTable format
    
    console.log("📬 API Call Method:", method, "Endpoint:", endpoint);
    
    let requestData;
    if (data.image instanceof File) {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price.toString());
      formData.append("image", data.image);
      formData.append("category_id", data.category_id.toString()); // Always include category_id
      requestData = formData;
    } else {
      requestData = {
        name: data.name,
        description: data.description,
        price: data.price,
        category_id: data.category_id,
      };
      if (typeof data.image === "string") {
        requestData.image = data.image;
      }
    }
    
    // Add authentication token
    const token = localStorage.getItem("cook_token");
    if (!token) {
      throw new Error("No authentication token found");
    }
    
    const headers = {
      ...(data.image instanceof File ? { "Content-Type": "multipart/form-data" } : {}),
      Authorization: `Bearer ${token}`,
    };
    
    const response = await api[method](endpoint, requestData, { headers });
    
    console.log("✅ API Response:", response);
    return response;
  } catch (error) {
    console.error("❌ API Error:", error.response?.data || error.message);
    throw error;
  }
};

export const useCreateCategoryItem = (options = {}) => {
  const { onSuccess, onError, ...mutationConfig } = options;
  
  const mutation = useMutation({
    mutationFn: createCategoryItem,
    onSuccess,
    onError,
    ...mutationConfig,
  });
  
  return {
    createCategoryItem: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};