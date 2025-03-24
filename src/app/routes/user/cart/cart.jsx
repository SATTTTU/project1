import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	removeFromCart,
	updateQuantity,
	addToCart,
} from "../../../../store/cart/cart";
import { CartItems } from "@/modules/user/cart/components/cartItems";
import { CartHeader } from "@/modules/user/cart/components/cartheader";
import { EmptyCart } from "@/modules/user/cart/components/emptyCart";
import { OrderConfirmation } from "@/modules/user/cart/components/orderConfirmation";
import { useUserBasket } from "@/modules/user/cart/api/getItems";
import { toast } from "react-toastify";
import { useCheckout } from "@/modules/user/cart/api/checkout";

export const Cart = () => {
	const dispatch = useDispatch();
	const [orderComplete, setOrderComplete] = useState(false);
	const [orderId, setOrderId] = useState(null);


	// Get cart items from Redux store for real-time updates
	const reduxCartItems = useSelector((state) => state.cart.items);

	// Fetch cart data from API
	const { data, isLoading, error, refetch, mutateAsync } = useUserBasket({
		mutationConfig: {
			onSuccess: (data) => {
				// This will run after successful API operations
				console.log("Cart data updated:", data);
			},
		},
	});
	console.log("cart ko data", data);

	// Store cart items in state for rendering
	const [cartItems, setCartItems] = useState([]);

	const { mutateAsync: checkoutMutation, isLoading: isCheckoutLoading } =
		useCheckout({
			mutationConfig: {
				onSuccess: (data) => {
					setOrderComplete(true);
					setOrderId(data.orderId); // Assuming API returns an orderId
					toast.success("Order placed successfully!");
				},
				onError: (error) => {
					toast.error("Checkout failed. Please try again.");
					console.error("Checkout Error:", error);
				},
			},
		});

    const handleQuantityChange = async (itemId, newQuantity) => {
      if (newQuantity < 1) return;
  
      try {
          // Update Redux store immediately
          dispatch(updateQuantity({ productId: itemId, quantity: newQuantity }));
  
          // Update local state immediately
          setCartItems((prevItems) =>
              prevItems.map((item) =>
                  item.id === itemId
                      ? { ...item, quantity: newQuantity }
                      : item
              )
          );
  
          // Update backend asynchronously
          await mutateAsync({
              basket_item_id: itemId,
              quantity: newQuantity,
          });
  
          toast.success("Quantity updated successfully");
      } catch (error) {
          toast.error("Failed to update quantity");
          console.error("Error updating quantity:", error);
  
          // Revert changes if API fails
          refetch();
      }
  };
  

	// Handle item removal with immediate update
	const handleRemoveItem = async (itemId) => {
		try {
			// Update Redux store immediately for UI update
			dispatch(removeFromCart(itemId));

			// Update local state immediately
			setCartItems((prevItems) =>
				prevItems.filter((item) => item.id !== itemId)
			);

			// Update backend asynchronously
			await mutateAsync({ basket_item_id: itemId });

			toast.success("Item removed from cart");
		} catch (error) {
			toast.error("Failed to remove item");
			console.error("Error removing item:", error);

			// Revert changes if API fails
			refetch();
		}
	};

	// Handle adding item to cart with immediate update
	const handleAddToCart = (item) => {
		// Update Redux store immediately
		dispatch(addToCart(item));

		// Update local state immediately
		setCartItems((prevItems) => {
			const existingItem = prevItems.find((i) => i.id === item.id);
			if (existingItem) {
				return prevItems.map((i) =>
					i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
				);
			}
			return [...prevItems, { ...item, quantity: 1 }];
		});

		mutateAsync({
			menu_item_id: item.id,
			quantity: 1,
		}).catch((error) => {
			console.error("Error adding item to cart:", error);
			refetch(); // Sync with backend on error
		});

		toast.success(`${item.name} added to cart!`);
	};

	// const handleCheckout = () => {
	//   setOrderComplete(true)
	//   setOrderId("ORD-" + Math.floor(Math.random() * 10000))
	// }

	if (isLoading && cartItems.length === 0) {
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

	if (orderComplete) {
		return <OrderConfirmation orderId={orderId} />;
	}

	if (data?.length === 0) {
		return <EmptyCart onAddItem={handleAddToCart} />;
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<CartHeader itemCount={cartItems.length} />
			<div className="container mx-auto px-4 py-8">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-2xl font-bold">Your Cart</h1>
				</div>

				<div className="flex flex-col lg:flex-row gap-8">
					<div className="lg:w-2/3">
						<CartItems
							data={data}
							onQuantityChange={handleQuantityChange}
							onRemoveItem={handleRemoveItem}
						/>
					</div>
					<div className="lg:w-1/3">
						<div className="bg-white rounded-lg shadow-lg overflow-hidden sticky top-20">
							<div className="p-6">
								<h2 className="text-lg font-bold mb-4">Order Summary</h2>
								<div className="mb-4">
									{data[1]?.items?.map((item) => (
										<div
											key={item.id}
											className="flex justify-between py-2 border-b"
										>
											<span>
												{item.name} x{item.quantity}
											</span>
											<span>Rs. {(item.price * item.quantity).toFixed(2)}</span>
										</div>
									))}
								</div>
								<div className="flex justify-between font-bold text-lg mb-6">
									<span>Subtotal:</span>
									<span>Rs. {calculateSubtotal()}</span>
								</div>

								<button
									onClick={handleCheckout}
									disabled={isCheckoutLoading}
									className={`w-full bg-green-500 text-white py-3 rounded-md font-medium hover:bg-green-600 transition-colors ${
										isCheckoutLoading ? "opacity-50 cursor-not-allowed" : ""
									}`}
								>
									{isCheckoutLoading ? "Processing..." : "Proceed to Checkout"}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
