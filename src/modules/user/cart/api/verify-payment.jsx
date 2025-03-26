import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

export const verifyPayment = async () => {
	try {
		const storedPidx = localStorage.getItem("khalti_pidx");

		if (!storedPidx) {
			throw new Error("Missing payment ID (pidx) in local storage");
		}

		const response = await api.post("/api/verify-payment", {
			pidx: storedPidx,
		});
		console.log("verify", response.data);

		if (!response || !response.data) {
			throw new Error("Empty response from verification server");
		}

		console.log("Payment verification response:", response.data);

		if (response.data.success) {
			localStorage.setItem(
				"verified_transaction",
				JSON.stringify({
					pidx: storedPidx,
					...response.data,
					verified: true,
				})
			);
		}

		return response.data;
	} catch (error) {
		console.error("Payment verification error:", error);

		const errorMessage =
			error.response?.data?.message ||
			error.response?.data?.error ||
			error.message ||
			"Payment verification failed";

		throw new Error(errorMessage);
	}
};

export const useVerifyPayment = (mutationConfig = {}) => {
	return useMutation({
		mutationFn: verifyPayment,
		...mutationConfig,
		onError: (error) => {
			console.error("Verification mutation error:", error);
			if (mutationConfig.onError) {
				mutationConfig.onError(error);
			}
		},
	});
};
