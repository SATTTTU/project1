import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useDeleteStoreItem } from "../api/deleteItems";
import { useUpdateStoreItem } from "../api/updateItems";
import { useState } from "react";

export const CartItem = ({ item, setCartItems }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const { updateItem, isLoading } = useUpdateStoreItem();
  const { mutate: deleteItem } = useDeleteStoreItem(setCartItems);

  // Remove Item from Cart
  const handleRemoveItem = () => {
    deleteItem({ item_id: item?.item_id });
  };

  // Update Item Quantity
  const handleUpdate = async (newQuantity) => {
    if (newQuantity < 1) return; // Prevent invalid updates

    // Optimistic UI update (update state before API call)
    setQuantity(newQuantity);
    setCartItems((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.item_id === item.item_id
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      )
    );

    try {
      const updatedItems = await updateItem({ item_id: item?.item_id, quantity: newQuantity });

      if (updatedItems) {
        setCartItems(updatedItems); // Ensure cart updates with API response
      } else {
        console.error("API returned no updated items.");
      }
    } catch (err) {
      console.error("Error updating item:", err);
      setQuantity(item.quantity); // Revert UI on failure
    }
  };

  // Get Full Image URL for the Item
  const getFullImageUrl = (imagePath) => {
    if (!imagePath) return "/api/placeholder/80/80";
    if (imagePath.startsWith("http")) return imagePath;
    const storageUrl = import.meta.env.VITE_APP_API_URL.endsWith("/")
      ? `${import.meta.env.VITE_APP_API_URL}storage/`
      : `${import.meta.env.VITE_APP_API_URL}/storage/`;
    return `${storageUrl}${imagePath}`;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center py-4 border-b last:border-b-0">
      {/* Image */}
      <div className="sm:w-24 w-full mb-4 sm:mb-0 sm:mr-6">
        <img
          src={getFullImageUrl(item?.menu_item?.image_url)}
          alt={item?.menu_item?.name}
          className="w-full h-24 object-cover rounded"
        />
      </div>

      {/* Item Details */}
      <div className="flex-1">
        <h3 className="font-medium text-lg">{item?.menu_item?.name}</h3>
        <p className="text-gray-600 text-sm mb-2">Unit Price: Rs. {item.price}</p>

        <div className="flex flex-wrap items-center justify-between mt-2">
          {/* Quantity Control */}
          <div className="flex items-center border rounded-md overflow-hidden">
            <button
              onClick={() => handleUpdate(quantity - 1)}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
            >
              <FiMinus size={14} />
            </button>
            <span className="px-4 py-1">{quantity}</span>
            <button
              onClick={() => handleUpdate(quantity + 1)}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
            >
              <FiPlus size={14} />
            </button>
          </div>

          {/* Total Price & Delete Button */}
          <div className="flex items-center mt-2 sm:mt-0">
            <span className="font-semibold mr-4">
              Rs. {(Number.parseFloat(item.price) * quantity).toFixed(2)}
            </span>
            <button
              onClick={handleRemoveItem}
              disabled={isLoading}
              className="text-red-500 hover:text-red-700"
            >
              {isLoading ? "Removing..." : <FiTrash2 size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
