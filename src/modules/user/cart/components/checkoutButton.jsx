import { useState } from "react";
import { toast } from "react-toastify";
import { useCheckout } from "../api/checkout";
import { useUserCart } from "../api/getItems";
import { useNavigate } from "react-router-dom";

export const CheckoutButton = () => {
	const navigate = useNavigate();
	const [isProcessing, setIsProcessing] = useState(false);
	const { data: cartData } = useUserCart();
	console.log("Checkout button ", cartData);
	const { mutateAsync: processCheckout } = useCheckout({
		onSuccess: (data) => {
			console.log("Checkout successful:", data);
			// navigate("/checkout");
			//   debugger;
		},
		onError: (error) => {
			console.error("Checkout error:", error);
			toast.error(error.message || "Checkout failed. Please try again.");
		},
	});

	const calculateTotal = () => {
		if (!cartData || !cartData[0]?.items) return 0;
		return cartData[0].items.reduce(
			(total, item) => total + (item.price * item.quantity || 0),
			0
		);
	};

	const handleCheckout = async () => {
		if (!cartData || !cartData[0]?.items || cartData[0].items.length === 0) {
			toast.error("Your cart is empty. Add items before checking out.");
			return;
		}

		try {
			setIsProcessing(true);

			const checkoutData = {
				items: cartData[0].items.map((item) => ({
					id: item.item_id,
					quantity: item.quantity,
				})),

				amount: Math.round(calculateTotal() * 100),

				purchase_order_id: `ORDER-${Date.now()}`,
				purchase_order_name: "Food Order",

				return_url: `${window.location.origin}/payment/callback`,
				website_url: window.location.origin,
			};

			console.log("Sending checkout data:", checkoutData);

			const response = await processCheckout(checkoutData);

			console.log("Checkout response:", response);

			if (response && response.pidx) {
				try {
					// Store pidx directly in localStorage (as a separate item)
					localStorage.setItem("khalti_pidx", response.pidx);
					console.log("Stored pidx in localStorage:", response.pidx);

	

				

					const storedPidx = localStorage.getItem("khalti_pidx");
					if (!storedPidx) {
						console.error("Failed to store pidx in localStorage");
						toast.warning(
							"Warning: Could not store payment information locally"
						);
					}

					const khaltiPaymentUrl = `https://test-pay.khalti.com/?pidx=${response.pidx}`;

					console.log("Redirecting to Khalti payment page:", khaltiPaymentUrl);

					window.location.href = khaltiPaymentUrl;
				} catch (storageError) {
					console.error("Error storing data in localStorage:", storageError);
					toast.warning("Warning: Could not store payment information locally");

					// window.location.href = `https://test-pay.khalti.com/?pidx=${response.pidx}`;
				}
			} else {
				const errorMsg = "Invalid payment response from server. Missing pidx.";
				console.error(errorMsg, { response });
				toast.error(errorMsg);
			}
		} catch (error) {
			const errorMsg =
				error.response?.data?.message ||
				error.message ||
				"Checkout failed. Please try again.";
			console.error("Checkout error:", error);
			toast.error(errorMsg);
		} finally {
			setIsProcessing(false);
		}
	};

	return (
		<button
			onClick={handleCheckout}
			disabled={isProcessing}
			className={`w-full bg-[#426B1F] text-white py-3 rounded-md font-medium transition-colors ${
				isProcessing ? "opacity-50 cursor-not-allowed" : ""
			}`}
		>
			{isProcessing
				? "Processing..."
				: `Pay with Khalti • Rs. ${calculateTotal().toFixed(2)}`}
		</button>
	);
};
