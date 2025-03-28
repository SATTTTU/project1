import React from "react";
import { usePopularDishes } from "../api/get-items";
import { useAddCartItem } from "../../cart/api/addItems";
import { toast } from "react-toastify"; // Import toast

export const PopularItemsPage = () => {
	const { data: menuItems, isLoading, error } = usePopularDishes();
	console.log("popular dishes", menuItems);
	const { mutateAsync: addToCart, isLoading: isAddingToCart } =
		useAddCartItem();

	const imageUrl = "https://khajabox-bucket.s3.ap-south-1.amazonaws.com/";

	const handleAddToCart = async (dish) => {
		try {
			await addToCart({
				menu_item_id: dish.menu_item_id,
				quantity: 1,
			});

			// ✅ Show success notification
			toast.success(`${dish.name} added to cart! 🛒`);
		} catch (error) {
			// ❌ Show error notification
			toast.error("Failed to add item to cart. Try again!");
			console.error("Error adding to cart:", error);
		}
	};

	if (isLoading) {
		return (
			<div className="p-6 text-center animate-pulse">Loading menu items...</div>
		);
	}

	if (error) {
		return (
			<div className="p-6 text-center text-red-500">
				Error loading menu items: {error.message}
			</div>
		);
	}

	if (!menuItems || menuItems.length === 0) {
		return (
			<div className="p-6 text-center">
				No menu items available at the moment.
			</div>
		);
	}

	return (
		<div className="container mx-auto p-4">
			<h2 className="text-2xl font-bold mb-6 text-center">
				Our Popular Dishes
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{menuItems.map((item) => (
					<div
						key={item.id}
						className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
					>
						<div className="h-48 overflow-hidden">
							<img
								src={`${imageUrl}${item?.image_url}`}
								alt="image"
								className="w-full h-full object-cover"
							/>
						</div>

						<div className="p-4">
							<div className="flex justify-between items-start">
								<h3 className="text-xl font-bold">{item.name}</h3>
							</div>

							{item.description && (
								<p className="text-gray-600 mt-2 text-sm">
									{item.description.length > 100
										? `${item.description.substring(0, 100)}...`
										: item.description}
								</p>
							)}

							<button
								className="bg-[#426B1F] text-white  py-2 px-4 rounded-md font-semibold hover:bg-green-700 transition disabled:opacity-50 mt-4"
								onClick={() => handleAddToCart(item)}
								disabled={isAddingToCart}
							>
								{isAddingToCart ? "Adding..." : "Add to Cart"}
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
