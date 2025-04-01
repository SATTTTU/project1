import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

export const verifyPayment = async () => {
	try {
		const storedPidx = localStorage.getItem("khalti_pidx");
		console.log("Stored id", storedPidx);

		if (!storedPidx) {
			throw new Error("Missing payment ID (pidx) in local storage");
		}

		const response = await api.post("/api/verify-payment", {
			pidx: storedPidx,
		});
		console.log("verify", response);

		return response;
	} catch (error) {
		console.error("Payment ****** verification error:", error);

		const errorMessage =
			error.response?.data?.message ||
			error.response?.data?.error ||
			error.message ||
			"Payment verification failed";

		throw new Error(errorMessage);
	}
};

export const useVerifyPayment = (mutationConfig = {}) => {
	console.log("mutation", mutationConfig);
	return useMutation({
		mutationFn: verifyPayment,
		onSuccess: (data) => {
			console.log("onSuccess", data);
		},
		onError: (error) => {
			console.error("Verification mutation error:", error);
			if (mutationConfig.onError) {
				mutationConfig.onError(error);
			}
		},
	});
};

