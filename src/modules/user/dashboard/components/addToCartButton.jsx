"use client"

import { useCart } from "@/hooks/context/cart-context"
import { useState } from "react"
// import { useCart } from "../cart-context"

const AddToCartButton = ({ product }) => {
  const [isAdding, setIsAdding] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = async () => {
    setIsAdding(true)
    try {
      await addToCart(product)
      // Show success message or feedback
    } catch (error) {
      console.error("Failed to add item to cart", error)
      // Show error message
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className="bg-[#426B1F] text-white px-4 py-2 rounded-md hover:bg-[#355818] transition-colors"
    >
      {isAdding ? "Adding..." : "Add to Cart"}
    </button>
  )
}

export default AddToCartButton

