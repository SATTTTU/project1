

import { useState, useEffect, useRef } from "react"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { Link } from "react-router-dom"

export const CartBadge = ({ cartItems, isLoading }) => {
  const [cartItemCount, setCartItemCount] = useState(cartItems?.length || 0)
  const [isAnimating, setIsAnimating] = useState(false)
  const prevCountRef = useRef(cartItemCount)

  // Update count and trigger animation when cartItems changes
  useEffect(() => {
    if (isLoading) return

    const newCount = cartItems?.length || 0
    const prevCount = prevCountRef.current

    // Only animate if the count increases
    if (newCount > prevCount) {
      setIsAnimating(true)

      // Reset animation after it completes
      const timer = setTimeout(() => {
        setIsAnimating(false)
      }, 300)

      return () => clearTimeout(timer)
    }

    setCartItemCount(newCount)
    prevCountRef.current = newCount
  }, [cartItems, isLoading])

  return (
    <Link to="/cart" className="relative p-1 hover:bg-gray-100 rounded-full transition-colors">
      <AiOutlineShoppingCart className="text-3xl text-[#426B1F]" />
      {cartItemCount > 0 && (
        <span
          className={`absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full
            ${isAnimating ? "animate-ping-once" : ""}`}
        >
          {cartItemCount}
        </span>
      )}
    </Link>
  )
}


