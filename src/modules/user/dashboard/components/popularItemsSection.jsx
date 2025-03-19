import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
// import { fetchMenuItems } from "../../api/menuItems";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { storeCartItem } from "../../api/cart";
import { FiShoppingCart } from "react-icons/fi";
import { fetchMenuItems } from "../api/get-items";
import { storeCartItem } from "../../cart/api/addItems";

export const PopularItems = () => {
  const { data: menuItems, isLoading, error } = useQuery({
    queryKey: ["menuItems"],
    queryFn: fetchMenuItems,
  });

  const [addedToCart, setAddedToCart] = useState([]);
  const queryClient = useQueryClient();

  const { mutate: addToCart, isLoading: addingToCart } = useMutation({
    mutationFn: async (menuItemId) => storeCartItem({ menu_item_id: menuItemId, quantity: 1 }),
    onSuccess: (data, { menu_item_id }) => {
      setAddedToCart((prevItems) => [...prevItems, menu_item_id]);
      toast.success("Item added to cart! 🛒");
      queryClient.invalidateQueries(["userBasket"]);
    },
    onError: () => {
      toast.error("Failed to add item to cart!");
    },
  });

  if (isLoading) return <p>Loading menu items...</p>;
  if (error) return <p>Failed to load menu items.</p>;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {menuItems.map((item) => (
        <div key={item.id} className="bg-white shadow-md rounded-lg overflow-hidden">
          <img src={item.image_url} alt={item.name} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-bold">{item.name}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
            <p className="text-lg font-semibold mt-2">Rs. {item.price}</p>
            <button
              onClick={() => addToCart(item.id)}
              disabled={addingToCart || addedToCart.includes(item.id)}
              className={`mt-3 w-full py-2 rounded-lg text-white transition-all duration-300 ${
                addedToCart.includes(item.id) ? "bg-green-600" : "bg-blue-500 hover:bg-blue-600"
              } flex items-center justify-center`}
            >
              {addedToCart.includes(item.id) ? "Added to Cart" : "Add to Cart"}{" "}
              <FiShoppingCart className="ml-2" />
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

