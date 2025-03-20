import React from "react";
import { Edit, Trash } from "lucide-react";

const ItemRow = ({
  item,
  categoryId,
  handleEditItem,
  handleDeleteItem,
  toggleItemAvailability,
}) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 pl-12">
        <div className="flex items-center">
          <img
            src={item.image_url || "/placeholder.svg"}
            alt={item.name}
            className="h-10 w-10 rounded-full object-cover mr-3"
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
        <span className="font-medium">₹{item.price}</span>
      </td>
      <td className="px-6 py-4">
        <div
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
        </div>
      </td>
      <td className="px-6 py-4 text-right space-x-2">
        <button
          onClick={() => handleEditItem(categoryId, item)}
          className="text-blue-500 hover:text-blue-700"
        >
          <Edit size={18} />
        </button>
        <button
          onClick={() => handleDeleteItem(categoryId, item.id)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash size={18} />
        </button>
      </td>
    </tr>
  );
};

export default ItemRow;