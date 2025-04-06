import { useState, useEffect } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useUpdateCartItem } from "../api/updateItems";


export const CartItem = ({ item, onRemoveItem, isUpdating, isDeleting }) => {
	const { mutateAsync } = useUpdateCartItem();
	const [quantity, setQuantity] = useState(item.quantity);
	console.log("cart ma ", item);

	useEffect(() => {
		setQuantity(item.quantity);
	}, [item.quantity]);

	const handleQuantityChange = async (newQuantity) => {
		console.log("quantity", item.basket_item_id, newQuantity);
		if (newQuantity < 1) return;
		try {
			await mutateAsync({
				item_id: item.basket_item_id,
				quantity: newQuantity,
			});
		} catch (error) {
			console.error("Error updating quantity:", error);
		}
	};

	const imageUrl = "https://khajabox-bucket.s3.ap-south-1.amazonaws.com/";

	return (
		<div className="flex flex-col sm:flex-row items-center py-4 border-b last:border-b-0">
			<div className="sm:w-24 w-full mb-4 sm:mb-0 sm:mr-6">
				<img
					src={`${imageUrl}${item?.menu_item?.image_url}`}
					alt="image"
					className="w-full h-26 object-cover"
				/>
			</div>

			<div className="flex-1">
				<h3 className="font-medium text-lg">{item?.menu_item?.name}</h3>
				<p className="text-gray-600 text-sm mb-2">
					Unit Price: Rs. {item?.price}
				</p>

				<div className="flex flex-wrap items-center justify-between mt-2">
					<div className="flex items-center border rounded-md overflow-hidden">
						<button
							onClick={(e) => handleQuantityChange(quantity - 1, e)}
							disabled={isUpdating || quantity <= 1}
							className="px-3 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
							aria-label="Decrease quantity"
							type="button"
						>
							<Minus size={14} />
						</button>
						<span className="px-4 py-1">{quantity}</span>
						<button
							onClick={() => handleQuantityChange(quantity + 1)}
							disabled={isUpdating}
							className="px-3 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
							aria-label="Increase quantity"
							type="button"
						>
							<Plus size={14} />
						</button>
					</div>

					<div className="flex items-center mt-2 sm:mt-0">
						<span className="font-semibold mr-4">
							Rs. {(Number.parseFloat(item.price) * quantity).toFixed(2)}
						</span>
						<button
							onClick={(e) => {
								e.preventDefault();
								onRemoveItem(item.basket_item_id);
							}}
							disabled={isDeleting}
							className="text-red-500 hover:text-red-700 disabled:opacity-50"
							aria-label="Remove item"
							type="button"
						>
							<Trash2 size={24} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
