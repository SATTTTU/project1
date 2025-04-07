import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

export const updateMenuItem = ({ menuId, data }) => {
	console.log("data***", data);
	const formData = new FormData();
	formData.append("name", data?.name);
	formData.append("description", data.description);
	formData.append("price", data.price.toString());
	if (data.image instanceof File) {
		formData.append("image", data.image);
	  }
	  
	formData.append("category_id", data.category_id.toString()); // Always include category_id

	// Add authentication token
	const token = localStorage.getItem("cook_token");
	if (!token) {
		throw new Error("No authentication token found");
	}

	const headers = {
		"Content-Type": "multipart/form-data",
	};

	return api.post(
		`/api/cooks/update-menu-item/${menuId}?_method=put`,
		formData,
		{ headers }
	);
};

export const useUpdateMenuItem = (options = {}) => {
	const queryClient = useQueryClient();
	const { onSuccess, ...restConfig } = options;

	return useMutation({
		mutationFn: updateMenuItem,
		onSuccess: (...args) => {
			queryClient.invalidateQueries({
				queryKey: ["categories"],
			});
			onSuccess?.(...args);
		},
		...restConfig,
	});
};
