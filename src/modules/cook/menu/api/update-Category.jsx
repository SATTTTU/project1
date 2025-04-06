import { useMutation,useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

export const updateMenu = ({ menuId, data }) => {
  console.log("data***",data)
      const formData = new FormData();
      formData.append("name", data?.name);
      formData.append("description", data.description);
      formData.append("price", data.price.toString());
      formData.append("image", data.image);
      formData.append("category_id", data.category_id.toString()); // Always include category_id
      
      // Add authentication token
      const token = localStorage.getItem("cook_token");
      if (!token) {
        throw new Error("No authentication token found");
      }
      
      const headers = {
     "Content-Type": "multipart/form-data"
      };
      
    return api.put(`/api/cooks/update-menu/${menuId}`, formData,{headers});
  };
  
  export const useUpdateMenu = (options = {}) => {

    const queryClient = useQueryClient();
    const { onSuccess, ...restConfig } = options;
    
    return useMutation({
      mutationFn: updateMenu,
      onSuccess: (...args) => {
        queryClient.invalidateQueries({
          queryKey: ["categories"],
        });
        onSuccess?.(...args);
      },
      ...restConfig
    });
  };