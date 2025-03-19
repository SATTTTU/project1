import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api-client"; // Ensure this is correctly configured

const logoutUser = async () => {
	try {
		const token = localStorage.getItem("token_user");
		if (!token) throw new Error("No auth token found"); // Prevent request without a token

		const response = await api.post(
			"/api/logout",
			{},
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);

		return response.data;
	} catch (error) {
		throw new Error(error.response?.data?.message || "Logout failed");
	}
};

export const useUserLogout = () => {
	const mutation = useMutation({
		mutationFn: logoutUser,
		onSuccess: () => {
			localStorage.removeItem("token_user");
			// Remove auth token after successful logout
			window.location.href = "/user/login"; // Redirect to login page
		},
		onError: (error) => {
			console.error("Logout error:", error);
		},
	});

	return {
		logout: mutation.mutateAsync,
		isLoading: mutation.isPending,
		error: mutation.error,
		isError: mutation.isError,
		isSuccess: mutation.isSuccess,
	};
};
