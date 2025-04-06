import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { GiChiliPepper } from "react-icons/gi";
import { BiLeaf } from "react-icons/bi";
import { useAddCartItem } from "../../cart/api/addItems";
import { toast } from "react-toastify";

const FoodInfoSection = ({ food }) => {
	const { mutateAsync: addToCart, isLoading: isAddingToCart } = useAddCartItem();
	const menuItem = Array.isArray(food) ? food[0] : food;
	if (!menuItem) return <p>Loading...</p>;

	const [quantity, setQuantity] = useState(1);
	const handleQuantityChange = (amount) => {
		setQuantity((prev) => Math.max(1, prev + amount));
	};

	const handleAddToCart = async () => {
		try {
			await addToCart({
				menu_item_id: menuItem.id,
				quantity,
			});
			toast.success(`${menuItem.name} added to cart! 🛒`);
		} catch (error) {
			toast.error("Failed to add item to cart. Try again!");
			console.error("Add to cart error:", error);
		}
	};

	return (
		<div className="w-full md:w-1/2 p-4 flex flex-col space-y-5">
			<div>
				<h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">{menuItem.name}</h1>
				<p className="text-xl text-green-600 font-semibold">Rs. {menuItem.price}</p>
			</div>

			<div className="flex flex-wrap gap-2">
				{menuItem.isVegetarian && (
					<span className="flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
						<BiLeaf className="mr-2" />
						Vegetarian
					</span>
				)}
				{menuItem.spicyLevel && (
					<span className="flex items-center px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
						<GiChiliPepper className="mr-2" />
						{menuItem.spicyLevel}
					</span>
				)}
				{menuItem.tags &&
					menuItem.tags.map((tag, i) => (
						<span
							key={i}
							className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full"
						>
							{tag}
						</span>
					))}
			</div>

			<p className="text-gray-700 text-sm sm:text-base">{menuItem.description}</p>

			{menuItem.allergens && menuItem.allergens.length > 0 && (
				<p className="text-sm text-gray-500">
					<span className="font-medium">Allergens:</span> {menuItem.allergens.join(", ")}
				</p>
			)}

			{/* Add to Cart Section */}
			<div className="space-y-4 mt-6">
				<div className="flex items-center space-x-3">
					<span className="text-gray-700 text-sm">Quantity:</span>
					<div className="flex items-center border border-gray-300 rounded-md">
						<button
							onClick={() => handleQuantityChange(-1)}
							className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
							aria-label="Decrease quantity"
						>
							<FiMinus size={18} />
						</button>
						<span className="px-4 py-2">{quantity}</span>
						<button
							onClick={() => handleQuantityChange(1)}
							className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
							aria-label="Increase quantity"
						>
							<FiPlus size={18} />
						</button>
					</div>
				</div>

				<button
					onClick={(e) => {
						e.stopPropagation();
						handleAddToCart();
					}}
					className="w-full py-3 bg-[#218b16] text-white text-sm sm:text-base font-medium rounded-lg shadow hover:bg-green-700 transition disabled:bg-gray-400"
					disabled={isAddingToCart}
				>
					{isAddingToCart ? "Adding..." : "Add to Cart"}
				</button>
			</div>
		</div>
	);
};

export default FoodInfoSection;
