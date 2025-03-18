import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

export const CartItem = ({ item, onQuantityChange, onRemoveItem }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center py-4 border-b last:border-b-0">
      <div className="sm:w-24 w-full mb-4 sm:mb-0 sm:mr-6">
        <img
          src={item.img || "/placeholder.svg"}
          alt={item.name}
          className="w-full h-24 object-cover rounded"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-medium text-lg">{item.name}</h3>
        <p className="text-gray-600 text-sm mb-2">Unit Price: ${item.price}</p>

        <div className="flex flex-wrap items-center justify-between mt-2">
          <div className="flex items-center border rounded-md overflow-hidden">
            <button
              onClick={() => onQuantityChange(item.productId, item.quantity - 1)}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
            >
              <FiMinus size={14} />
            </button>
            <span className="px-4 py-1">{item.quantity}</span>
            <button
              onClick={() => onQuantityChange(item.productId, item.quantity + 1)}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
            >
              <FiPlus size={14} />
            </button>
          </div>

          <div className="flex items-center mt-2 sm:mt-0">
            <span className="font-semibold mr-4">
              ${(Number.parseFloat(item.price) * item.quantity).toFixed(2)}
            </span>
            <button
              onClick={() => onRemoveItem(item.productId)}
              className="text-red-500 hover:text-red-700"
            >
              <FiTrash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};