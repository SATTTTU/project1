import { FiStar, FiClock, FiMinus, FiPlus } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiLeaf } from "react-icons/bi";
import { GiChiliPepper } from "react-icons/gi";
import { useAddCartItem } from "../../cart/api/addItems";
import { toast } from "react-toastify"; 

const FoodInfoSection = ({ food, quantity }) => {
  const { mutateAsync: addToCart, isLoading: isAddingToCart } = useAddCartItem(); 

  const handleAddToCart = async (food) => {
    try {
      await addToCart({
        menu_item_id: food.id,
        quantity: quantity,
      });

      toast.success(`${food.name} added to cart! 🛒`);
    } catch (error) {
      toast.error("Failed to add item to cart. Try again!");
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="md:w-1/2 p-6 flex flex-col justify-center space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">{food.name}</h1>
        </div>
        <div className="text-3xl font-bold text-green-600">Rs. {food.price}</div>
      </div>

      {/* Quick Info Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        {food.isVegetarian && (
          <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 text-sm rounded-full">
            <BiLeaf className="mr-2" />
            Vegetarian
          </span>
        )}

        {food.spicyLevel && (
          <span className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 text-sm rounded-full">
            <GiChiliPepper className="mr-2" />
            {food.spicyLevel}
          </span>
        )}

        {food.tags &&
          food.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
      </div>

      {/* Short Description */}
      <p className="mt-6 text-gray-700">{food.description}</p>

      {/* Allergens */}
      {food.allergens && food.allergens.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-gray-500">
            <span className="font-medium">Allergens:</span> {food.allergens.join(", ")}
          </p>
        </div>
      )}

      {/* Add to Cart Section */}
      <div className="mt-8">
        {/* <div className="flex items-center mb-4 space-x-4">
          <span className="text-gray-700">Quantity:</span>
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Decrease quantity"
            >
              <FiMinus size={20} />
            </button>
            <span className="px-6 py-2 font-medium">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Increase quantity"
            >
              <FiPlus size={20} />
            </button>
          </div>
        </div> */}

        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent navigation when clicking the button
            handleAddToCart(food); // Add to cart when button is clicked
          }}
          className="w-full px-6 py-3 bg-[#426B1F] text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors disabled:bg-gray-400"
          disabled={isAddingToCart}
        >
          {isAddingToCart ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default FoodInfoSection;
