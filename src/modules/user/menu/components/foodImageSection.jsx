import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";

const FoodImageSection = ({ food, isFavorite, toggleFavorite }) => {
  return (
    <div className="md:w-1/2">
      <div className="relative h-72 md:h-full">
        <img src={food.img || "/placeholder.svg"} alt={food.name} className="w-full h-full object-cover" />
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={toggleFavorite}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? (
              <AiFillHeart className="text-red-500 text-xl" />
            ) : (
              <AiOutlineHeart className="text-gray-600 text-xl" />
            )}
          </button>
          <button
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Share"
          >
            <FiShare2 className="text-gray-600 text-xl" />
          </button>
        </div>

        <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          {food.category}
        </div>
      </div>
    </div>
  );
};

export default FoodImageSection;