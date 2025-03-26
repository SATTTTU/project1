import React from "react";
import { usePopularDishes } from "../api/get-items";
import { useAddCartItem } from "../../cart/api/addItems";

export const PopularItemsPage = () => {
	const { data: menuItems, isLoading, error } = usePopularDishes();
	console.log("data for all ", menuItems)

  const { mutateAsync: addToCart, isLoading: isAddingToCart } = useAddCartItem()


  const handleAddToCart = async (dish) => {
    try {
      // setLoadingCartItem(dish.menu_item_id)

      // Use our addToCart mutation
      await addToCart({
        menu_item_id: dish.menu_item_id,
        quantity: 1,
      })

      toast.success(`${dish.name} added to cart! 🛒`, {
        position: "top-right",
      })
    } catch (error) {
      toast.error("Failed to add item to cart. Try again!", {
        position: "top-right",
      })
      console.error("Error adding to cart:", error)
    } finally {
      // setLoadingCartItem(null)
    }
  }
  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-pulse">Loading menu items...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        Error loading menu items: {error.message}
      </div>
    );
  }

  if (!menuItems || menuItems.length === 0) {
    return <div className="p-6 text-center">No menu items available at the moment.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Our Popular Dishes</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {item.image && (
              <div className="h-48 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold">{item.name}</h3>
                <span className="text-green-600 font-semibold">Rs. {parseFloat(item.price).toFixed(2)}</span>
              </div>

              {item.description && (
                <p className="text-gray-600 mt-2 text-sm">
                  {item.description.length > 100 ? `${item.description.substring(0, 100)}...` : item.description}
                </p>
              )}

<button
                    className="bg-green-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-green-700 transition disabled:opacity-50"
                    onClick={() => handleAddToCart(dish)}
                    // disabled={loadingCartItem === dish.menu_item_id}
                    // aria-label={`Add ${dish.name} to cart`}
                  >Add to cart
                    {/* {loadingCartItem === dish.menu_item_id ? "Adding..." : "Add to Cart 🛒"} */}
                  </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
