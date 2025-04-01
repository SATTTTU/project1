import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; 
import { useAddCartItem } from "../../cart/api/addItems";

export const DishCard = ({ dish }) => {
  console.log("dishes888", dish)
  const navigate = useNavigate();
  const { mutateAsync: addToCart, isLoading: isAddingToCart } = useAddCartItem(); // Destructure the mutation function and loading state
  const imageUrl = "https://khajabox-bucket.s3.ap-south-1.amazonaws.com/";

  const handleAddToCart = async (dish) => {
    try {
      await addToCart({
        menu_item_id: dish.id,
        quantity: 1,
      });

      toast.success(`${dish.name} added to cart! 🛒`);
    } catch (error) {
      toast.error("Failed to add item to cart. Try again!");
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
      onClick={() => navigate(`/food/${dish.id}`)} 
    >
      <img
        src={`${imageUrl}${dish?.image_url}`}
        alt={dish.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h3 className="font-bold text-lg">{dish.name}</h3>
        <p className="text-gray-600 text-sm mt-1">{dish.description}</p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold">Rs. {dish.price}</span>
          <button
            onClick={(e) => {
              e.stopPropagation(); 
              handleAddToCart(dish); 
            }}
            className="px-4 py-2 bg-[#426B1F] text-white rounded-lg transition-colors"
            disabled={isAddingToCart} 
          >
            {isAddingToCart ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};
