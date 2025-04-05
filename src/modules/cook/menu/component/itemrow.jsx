
import React from "react";
import { Edit, Trash } from 'lucide-react';
import Dishes from "../../../../assets/defaultDishes.jpg";


const ItemRow = ({
  item,
  categoryId,
  handleEditItem,
  handleDeleteItem,
  toggleItemAvailability,
}) => {
  console.log("items***",item)
  // Function to construct the full image URL
  const getFullImageUrl = (imagePath) => {
    if (!imagePath) return "/api/placeholder/80/80";

    // If it's already a full URL (starts with http/https)
    if (imagePath.startsWith("http")) return imagePath;

    // Use your existing API_URL
    // If your API_URL already includes a trailing slash, you might need to adjust this
    const storageUrl = import.meta.env.VITE_APP_API_URL.endsWith("/")
      ? `${import.meta.env.VITE_APP_API_URL}storage/`
      : `${import.meta.env.VITE_APP_API_URL}/storage/`;
    return `${storageUrl}${imagePath}`;
  };
  const imageUrl = "https://khajabox-bucket.s3.ap-south-1.amazonaws.com/";

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 pl-12">
        <div className="flex items-center space-x-4">
          <img
            src={item?.image_url ? `${imageUrl}${item.image_url}` : Dishes}
                           alt={item.name || "Dish"}
                           className="rounded-full w-10 h-10 object-cover"
          />
          <div>
            <div className="font-medium">{item.name}</div>
            <div className="text-sm text-gray-500 line-clamp-1">
              {item.description}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="font-medium">Rs. {item.price}</span>
      </td>
      <td className="px-6 py-4">
        {/* <div
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            item.available
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
          onClick={() => toggleItemAvailability(categoryId, item.id)}
          style={{ cursor: "pointer" }}
        >
          <span
            className={`mr-1 h-2 w-2 rounded-full ${
              item.available ? "bg-green-500" : "bg-red-500"
            }`}
          ></span>
          {item.available ? "Available" : "Unavailable"}
        </div> */}
      </td>
      <td className="px-6 py-4 text-right space-x-2">
        <button
          onClick={() => handleEditItem(categoryId, item)}
          className="text-blue-500 hover:text-blue-700 cursor-pointer"
        >
          <Edit size={18} />
        </button>
        <button
          onClick={() => handleDeleteItem(categoryId, item.id)}
          className="text-red-500 hover:text-red-700 cursor-pointer"
        >
          <Trash size={18} />
        </button>
      </td>
    </tr>
  );
};

export default ItemRow;
