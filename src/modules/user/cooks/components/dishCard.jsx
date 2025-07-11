import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddCartItem } from "../../cart/api/addItems";
import Dishes from "../../../../assets/defaultDishes.jpg";

export const DishCard = ({ dish }) => {
	const navigate = useNavigate();
	const { mutateAsync: addToCart, isLoading: isAddingToCart } =
		useAddCartItem(); // Destructure the mutation function and loading state
	const imageUrl = "https://khajabox-bucket.s3.ap-south-1.amazonaws.com/";

	const handleAddToCart = async (dish) => {
		try {
			await addToCart({
				menu_item_id: dish.id,
				quantity: 1,
			});

			toast.success(`${dish?.name} added to cart! 🛒`);
		} catch (error) {
			toast.error("Failed to add item to cart. Try again!");
			console.error("Error adding to cart:", error);
		}
	};

	return (
		<div
			className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer flex flex-col justify-between h-full"
			onClick={() => navigate(`/food/${dish.id}`)}
		>
			<img
				src={dish?.image_url ? `${imageUrl}${dish.image_url}` : Dishes}
				alt={dish?.name}
				className="w-full h-50 object-cover"
			/>

			<div className="p-4 flex flex-col flex-grow">
				<h3 className="font-bold text-xl">{dish?.name}</h3>
				<div className="flex justify-between items-center mt-4">
					<span className="text-md font-bold">Rs. {dish.price}</span>
				</div>
				<p className="text-gray-600 text-sm mt-1">{dish.description}</p>

			</div>

			<div className="mt-auto flex justify-center items-center">
				<button
					onClick={(e) => {
						e.stopPropagation();
						handleAddToCart(dish);
					}}
					className="px-4 py-2 w-full bg-[#0e9300] text-white rounded-lg transition-colors "
					disabled={isAddingToCart}
				>
					{isAddingToCart ? "Adding..." : "Add to Cart"}
				</button>
			</div>
		</div>
	);
};
