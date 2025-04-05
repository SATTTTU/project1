import React, { useState } from "react";
import { useAddCartItem } from "../../cart/api/addItems";
import { toast } from "react-toastify";
import Dishes from "../../../../assets/defaultDishes.jpg";
import { useAllDishes } from "../../menu/api/allDishes";
import { useNavigate } from "react-router-dom";

export const AllDishes = () => {
  const navigate = useNavigate();
  const { data: menuItems, isLoading, error } = useAllDishes();
  const { mutateAsync: addToCart } = useAddCartItem();
  const imageUrl = "https://khajabox-bucket.s3.ap-south-1.amazonaws.com/";

  const [visibleItems, setVisibleItems] = useState(8);
  const [loadingItemId, setLoadingItemId] = useState(null); // individual item loading state

  const handleAddToCart = async (dish, e) => {
    e.stopPropagation();
    setLoadingItemId(dish.id);
    try {
      await addToCart({
        menu_item_id: dish.id,
        quantity: 1,
      });
      toast.success(`${dish?.name} added to cart! 🛒`);
    } catch (error) {
      toast.error("Failed to add item to cart.");
      console.error("Cart error:", error);
    } finally {
      setLoadingItemId(null);
    }
  };

  // const handleLoadMore = () => {
  //   setVisibleItems((prev) => prev + 6);
  // };

  if (isLoading) {
    return <div className="p-6 text-center animate-pulse">Loading menu items...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        Error loading dishes: {error.message}
      </div>
    );
  }

  if (!menuItems || menuItems.length === 0) {
    return <div className="p-6 text-center">No dishes available right now.</div>;
  }

  const itemsToShow = menuItems.slice(0, visibleItems);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-10 text-center text-[#0e9300]">
       All Special Dishes
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {itemsToShow.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/food/${item.id}`)}
            className="bg-white rounded-2xl shadow-md border border-slate-200 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer group flex flex-col"
          >
            <div className="h-48 w-full overflow-hidden rounded-t-2xl">
              <img
                src={item.image_url ? `${imageUrl}${item.image_url}` : Dishes}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => (e.target.src = Dishes)}
              />
            </div>

            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[#426B1F]">
                {item.name}
              </h3>

              <p className="text-md font-bold text-green-700 mb-1">
                Rs. {item.price}
              </p>

              {item.cook_name && (
                <p
                  className="text-sm text-gray-600 mb-1 hover:underline hover:text-green-600 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/cook/${item.cook_id}`);
                  }}
                >
                  👨‍🍳 By {item.cook_name}
                </p>
              )}

              {item.description && (
                <p className="text-gray-500 text-sm mb-4">
                  {item.description.length > 90
                    ? item.description.substring(0, 90) + "..."
                    : item.description}
                </p>
              )}

              <div className="mt-auto pt-2">
                <button
                  onClick={(e) => handleAddToCart(item, e)}
                  className="bg-[#0e9300] text-white py-2 px-4 w-full rounded-md font-semibold hover:bg-green-800 transition disabled:opacity-50"
                  disabled={loadingItemId === item.id}
                >
                  {loadingItemId === item.id ? "Adding..." : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* {visibleItems < menuItems.length && (
        <div className="text-center mt-10">
          <button
            onClick={handleLoadMore}
            className="text-[#426B1F] border border-[#426B1F] py-2 px-6 rounded-md font-semibold transition hover:bg-[#426B1F] hover:text-white"
          >
            Load More
          </button>
        </div>
      )} */}
    </div>
  );
};
