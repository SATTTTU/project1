import { Link } from "react-router-dom";
import { FiStar, FiClock, FiMinus, FiPlus } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiLeaf } from "react-icons/bi";
import { GiChiliPepper } from "react-icons/gi";

const FoodInfoSection = ({ food, quantity, handleQuantityChange, handleAddToCart }) => {
  return (
    <div className="md:w-1/2 p-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{food.name}</h1>
          <p className="text-gray-600 mt-1">
            By{" "}
            <Link to={`/cook/${food.cook.id}`} className="text-green-600 hover:underline">
              {food.cook.name}
            </Link>
          </p>
        </div>
        <div className="text-2xl md:text-3xl font-bold text-green-600">Rs. {food.price}</div>
      </div>

      <div className="flex items-center mt-4">
        <div className="flex items-center text-yellow-500">
          <FiStar className="fill-current" />
          <span className="ml-1 font-medium">{food.rating}</span>
        </div>
        <span className="text-gray-500 ml-2">({food.reviewCount} reviews)</span>

        <div className="flex items-center ml-6">
          <FiClock className="text-gray-500" />
          <span className="ml-1 text-gray-600">{food.preparationTime}</span>
        </div>
      </div>

      {/* Quick Info Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        {food.isVegetarian && (
          <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
            <BiLeaf className="mr-1" />
            Vegetarian
          </span>
        )}

        {food.spicyLevel && (
          <span className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
            <GiChiliPepper className="mr-1" />
            {food.spicyLevel}
          </span>
        )}

        {food.tags &&
          food.tags.map((tag, index) => (
            <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
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
        <div className="flex items-center mb-4">
          <span className="mr-4 text-gray-700">Quantity:</span>
          <div className="flex items-center border rounded-md overflow-hidden">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Decrease quantity"
            >
              <FiMinus size={16} />
            </button>
            <span className="px-4 py-1 font-medium">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Increase quantity"
            >
              <FiPlus size={16} />
            </button>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
        >
          <AiOutlineShoppingCart className="mr-2 text-xl" />
          Add to Cart - Rs. {(Number.parseFloat(food.price) * quantity).toFixed(2)}
        </button>
      </div>
    </div>
  );
};

export default FoodInfoSection;