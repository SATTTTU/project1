"use client"

import { useState, useEffect } from "react"
import { Minus, Plus, Trash2 } from "lucide-react"

export function CartItem({ item, onQuantityChange, onRemoveItem, isUpdating, isDeleting }) {
  const [quantity, setQuantity] = useState(item.quantity)

  useEffect(() => {
    setQuantity(item.quantity)
  }, [item.quantity])

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return
    setQuantity(newQuantity)
    onQuantityChange(item.item_id, newQuantity)
  }

  const getFullImageUrl = (imagePath) => {
    if (!imagePath) return "/placeholder.svg?height=80&width=80"
    if (imagePath.startsWith("http")) return imagePath
    const storageUrl =import.meta.env.VITE_APP_API_URL  || "https://api.example.com/"
    return `${storageUrl}${storageUrl.endsWith("/") ? "" : "/"}storage/${imagePath}`
  }

  return (
    <div className="flex flex-col sm:flex-row items-center py-4 border-b last:border-b-0">
      <div className="sm:w-24 w-full mb-4 sm:mb-0 sm:mr-6">
        <img
          src={getFullImageUrl(item?.menu_item?.image_url) || "/placeholder.svg?height=80&width=80"}
          alt={item?.menu_item?.name || "Product image"}
          width={80}
          height={80}
          className="w-full h-24 object-cover rounded"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-medium text-lg">{item?.menu_item?.name}</h3>
        <p className="text-gray-600 text-sm mb-2">Unit Price: Rs. {item.price}</p>

        <div className="flex flex-wrap items-center justify-between mt-2">
          <div className="flex items-center border rounded-md overflow-hidden">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={isUpdating || quantity <= 1}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="px-4 py-1">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={isUpdating}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>

          <div className="flex items-center mt-2 sm:mt-0">
            <span className="font-semibold mr-4">Rs. {(Number.parseFloat(item.price) * quantity).toFixed(2)}</span>
            <button
              onClick={() => onRemoveItem(item.item_id)}
              disabled={isDeleting}
              className="text-red-500 hover:text-red-700 disabled:opacity-50"
              aria-label="Remove item"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

