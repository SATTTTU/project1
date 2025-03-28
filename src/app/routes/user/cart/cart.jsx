// import { Modal } from "@/components/ui/modal/Modal";
import { useDeleteCartItem } from "@/modules/user/cart/api/deleteItems";
import { useUserCart } from "@/modules/user/cart/api/getItems";
import { useUpdateCartItem } from "@/modules/user/cart/api/updateItems";
// import { useVerifyPayment } from "@/modules/user/cart/api/verify-payment";
import { CartHeader } from "@/modules/user/cart/components/cartheader";
import { CartItems } from "@/modules/user/cart/components/cartItems";
import { CartSummary } from "@/modules/user/cart/components/cartSummary";
import { EmptyCart } from "@/modules/user/cart/components/emptyCart";
// import { useEffect, useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";

export const Cart = () => {
	// const navigate = useNavigate();
	const { data, isLoading, error, refetch } = useUserCart();
	const { updateItem, isLoading: isUpdating } = useUpdateCartItem();
	// const [isModalOpen, setIsModalOpen] = useState(false);
	const { mutateAsync: deleteItem, isLoading: isDeleting } =
		useDeleteCartItem();
	console.log("Cart ko items", data);

	// const { mutate: verifyPayment, isLoading: isVerifying } = useVerifyPayment({});

	const calculateSubtotal = () => {
		if (!data || !data[0]?.items?.length) return 0;
		return data[0]?.items?.reduce(
			(total, item) => total + (item.price * item.quantity || 0),
			0
		);
	};

	const handleQuantityChange = async (itemId, newQuantity) => {
		if (newQuantity < 1) return;
		try {
			await updateItem({ item_id: itemId, quantity: newQuantity });
			refetch(); // Ensure cart updates
		} catch (error) {
			console.error("Error updating quantity:", error);
		}
	};

	const handleRemoveItem = async (itemId) => {
		try {
			await deleteItem({ item_id: itemId });
			refetch(); // Ensure item is removed
		} catch (error) {
			console.error("Error removing item:", error);
		}
	};
	// const [searchParams] = useSearchParams();

	// const handleVerifyPayment = async () => {
	// 	const pidx = searchParams.get("pidx");
	// 	console.log("token", pidx); // ✅ Get pidx from search params
	// 	if (!pidx) {
	// 		alert("Missing Payment ID");
	// 		return;
	// 	}

	// 	verifyPayment(pidx, {
	// 		onSuccess: (data) => {
	// 			console.log("Payment verified:", data);
	// 			navigate("/order-success")
	// 			setIsModalOpen(false);

	// 		},
	// 		onError: (error) => {
	// 		alert(`Payment Verification Failed: ${error.message}`);
	// 	},
	// 	});

	// };

	// const pidx = searchParams.get("pidx");
	// console.log("window", pidx);
	// useEffect(() => {
	// 	const pidx = searchParams.get("pidx");
	// 	console.log("Window ko output", pidx);
	// 	if (pidx) {
	// 		setIsModalOpen(true);
	// 	}
	// }, []);

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="bg-red-50 p-6 rounded-lg">
					<h2 className="text-red-600 font-bold text-xl">Error loading cart</h2>
					<p className="text-red-500">{error.message}</p>
					<button
						onClick={() => refetch()}
						className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
					>
						Try Again
					</button>
				</div>
			</div>
		);
	}

	if (!data || data?.length ===0) {
		return <EmptyCart />;
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<CartHeader itemCount={data.items?.length || 0} />
			<div className="container mx-auto px-4 py-8">
				<div className="flex flex-col lg:flex-row gap-8">
					<div className="lg:w-2/3">
						<CartItems
							items={data}
							onQuantityChange={handleQuantityChange}
							onRemoveItem={handleRemoveItem}
							isUpdating={isUpdating}
							isDeleting={isDeleting}
						/>
					</div>
					<div className="lg:w-1/3">
						<CartSummary subtotal={calculateSubtotal()} />
					</div>
				</div>
			</div>
			{/* <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<div className="space-x-4 text-center">
					<h2 className="text-lg font-bold mb-2">Checkout Successful</h2>
					<p>Your checkout has been processed successfully!</p>
					<button
						onClick={handleVerifyPayment}
						className={`mt-4 bg-[#426B1F] text-white px-4 py-2 rounded-md ${
							isVerifying ? "opacity-50 cursor-not-allowed" : ""
						}`}
						disabled={isVerifying}
					>
						{isVerifying ? "Verifying..." : "Verify Payment"}
					</button>
					
				</div>
			</Modal> */}
		</div>
	);
};
