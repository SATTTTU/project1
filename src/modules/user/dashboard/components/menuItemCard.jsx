import React, { useState } from "react";
import { useCart } from "../../cart/api/addItems";
// import { useCart } from "../hooks/useCart";

export const MenuItemCard = ({ item }) => {
  const { addToCart, isLoading: cartLoading } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
		setIsAdding(true);
		try {
			const success = await addToCart(item.id, 1);
			if (success) {
				// Optional: Show success message
				console.log(`${item?.name} added to cart!`);
			}
		} finally {
			setIsAdding(false);
		}
	};

	return (
		<div className="border rounded-lg overflow-hidden shadow-lg">
			{item.image && (
				<div className="h-48 overflow-hidden">
					<img
						src={item.image}
						alt={item?.name}
						className="w-full h-full object-cover"
					/>
				</div>
			)}

			<div className="p-4">
				<div className="flex justify-between items-start mb-2">
					<h3 className="text-xl font-semibold">{item?.name}</h3>
					<span className="font-bold">
						Rs. {parseFloat(item.price).toFixed(2)}
					</span>
				</div>

				{item.description && (
					<p className="text-gray-600 mb-4">
						{item.description.length > 100
							? `${item.description.substring(0, 100)}...`
							: item.description}
					</p>
				)}

				<button
					onClick={handleAddToCart}
					disabled={isAdding || cartLoading}
					className={`w-full py-2 rounded-md text-white font-medium ${
						isAdding || cartLoading
							? "bg-gray-400"
							: "bg-blue-600 hover:bg-blue-700"
					}`}
				>
					{isAdding ? "Adding..." : "Add to Cart"}
				</button>
			</div>
		</div>
	);
};