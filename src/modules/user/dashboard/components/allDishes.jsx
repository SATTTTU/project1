import React, { useState } from "react";
import { useAddCartItem } from "../../cart/api/addItems";
import { toast } from "react-toastify"; 
import Dishes from "../../../../assets/defaultDishes.jpg"; 
import { useAllDishes } from "../../menu/api/allDishes";

export const AllDishes = () => {
  const { data: menuItems, isLoading, error } = useAllDishes();
  console.log("All dishes", menuItems)
  const { mutateAsync: addToCart, isLoading: isAddingToCart } = useAddCartItem();
  const imageUrl = "https://khajabox-bucket.s3.ap-south-1.amazonaws.com/";

  const [visibleItems, setVisibleItems] = useState(4);

  const handleAddToCart = async (dish) => {
    try {
      await addToCart({
        menu_item_id: dish.menu_item_id,
        quantity: 1,
      });
      toast.success(`${dish.name} added to cart! 🛒`);
    } catch (error) {
      toast.error("Failed to add item to cart. Try again!");
      console.error("Error adding to cart:", error);
    }
  };

  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + 6);
  };

  if (isLoading) {
    return <div className="p-6 text-center animate-pulse">Loading menu items...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">Error loading menu items: {error.message}</div>;
  }

  if (!menuItems || menuItems.length === 0) {
    return <div className="p-6 text-center">No menu items available at the moment.</div>;
  }

  const itemsToShow = menuItems.slice(0, visibleItems);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Our Dishes</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
        {itemsToShow.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-50 overflow-hidden">
              <img
                src={item?.image_url ? `${imageUrl}${item.image_url}` : Dishes} 
                alt={item.name || "Dish Image"}
                className="w-full h-full object-cover"
                onError={(e) => (e.target.src = Dishes)} // Use Dishes image if load fails
              />
            </div>

            <div className="p-4">
              <h3 className="text-2xl font-bold">{item.name}</h3>
              <p className="text-gray-600 text-sm mb-3 hover:text-green-600">By {item.cook_name}</p>

              {item.description && (
                <p className="text-gray-600 mt-2 text-sm">
                  {item.description.length > 100
                    ? `${item.description.substring(0, 100)}...`
                    : item.description}
                </p>
              )}

              <button
                className="bg-[#426B1F] text-white py-2 px-4 rounded-md font-semibold hover:bg-green-700 transition disabled:opacity-50 mt-4 cursor-pointer"
                onClick={() => handleAddToCart(item)}
                disabled={isAddingToCart}
              >
                {isAddingToCart ? "Adding..." : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {visibleItems < menuItems.length && (
        <div className="text-end mt-6">
          <button
            onClick={handleLoadMore}
            className="text-[#426B1F] bg-gray-200 py-2 px-4 rounded-md font-semibold transition"
            disabled={isAddingToCart}
          >
            {isAddingToCart ? "Loading..." : "Load More..."}
          </button>
        </div>
      )}
    </div>
  );
};
