import React, { useState } from "react";
import { useSearch } from "../api/search";
import { useNavigate } from "react-router-dom";
import { useGetSingleCook } from "../../cooks/api/getCookProfie";
import { toast } from "react-toastify"; // Import toast notifications
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import { storeCartItem } from "../../cart/api/addItems";

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCookId, setSelectedCookId] = useState(null);
  const [loadingCartItem, setLoadingCartItem] = useState(null); // Tracks loading state for add to cart
  const navigate = useNavigate();

  // Fetch search results
  const { data: searchResults, isLoading, error } = useSearch({
    query: searchTerm,
    queryConfig: { enabled: searchTerm.length > 0 },
  });

  // Fetch cook details when cookId changes
  const { isFetching } = useGetSingleCook(selectedCookId, {
    queryConfig: {
      enabled: !!selectedCookId,
      onSuccess: () => {
        navigate(`/cook/${selectedCookId}`);
      },
    },
  });

  // Handle input change
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle cook name click
  const handleCookClick = (cookId) => {
    setSelectedCookId(cookId);
  };

  // Handle Add to Cart
  const handleAddToCart = async (dish) => {
    try {
      setLoadingCartItem(dish.menu_item_id); // Set loading state for this item
      await storeCartItem({ menu_item_id: dish.menu_item_id, quantity: 1 });

      toast.success(`${dish.name} added to cart! 🛒`, { position: "top-right" });
    } catch (error) {
      toast.error("Failed to add item to cart. Try again!", { position: "top-right" });
      console.error("Error adding to cart:", error);
    } finally {
      setLoadingCartItem(null); // Reset loading state
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for dishes..."
        value={searchTerm}
        onChange={handleInputChange}
        className="border p-3 rounded-md w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 md:w-4/5 lg:w-3/5"
      />

      {/* Cart Button */}
      {/* <div className="mt-4 text-right">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600 transition"
          onClick={() => navigate("/user/cart")}
        >
          🛒 Go to Cart
        </button>
      </div> */}

      {/* Search Results */}
      {searchTerm.length > 0 && (
        <div className="mt-4 bg-white shadow-lg rounded-lg p-4 z-10">
          {isLoading && <p className="text-gray-600">Loading...</p>}
          {error && <p className="text-red-500">Error: {error.message}</p>}
          
          {searchResults?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((dish) => (
                <div key={dish.menu_item_id} className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition">
                  {/* Dish Image */}
                  <img src={dish.image_url} alt={dish.name} className="w-full h-40 object-cover rounded-md" />
                  
                  {/* Dish Details */}
                  <div className="mt-3">
                    <h2 className="text-lg font-semibold">{dish.name}</h2>
                    
                    {/* Clickable Cook Name */}
                    <p className="text-gray-600">
                      Cook:{" "}
                      <span
                        className="font-medium text-blue-500 hover:underline cursor-pointer"
                        onClick={() => handleCookClick(dish.cook_id)}
                      >
                        {dish.cook_name}
                      </span>
                    </p>
                    
                    <p className="text-gray-800 font-bold mt-2">${dish.price}</p>

                    {/* Rating */}
                    <div className="flex items-center mt-1">
                      <span className="text-yellow-500 text-lg">⭐</span>
                      <span className="ml-1 text-gray-700">{dish.average_rating} / 5</span>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      className="mt-3 w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition disabled:opacity-50"
                      onClick={() => handleAddToCart(dish)}
                      disabled={loadingCartItem === dish.menu_item_id} // Disable while adding
                    >
                      {loadingCartItem === dish.menu_item_id ? "Adding..." : "Add to Cart 🛒"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No results found</p>
          )}
        </div>
      )}

      {/* Show loading state if cook details are being fetched */}
      {isFetching && (
        <p className="mt-4 text-blue-500 text-center">Loading cook profile...</p>
      )}
    </div>
  );
};
