"use client"

import { useUserCart } from "@/modules/user/cart/api/getItems"
import { createContext, useContext, useState, useEffect } from "react"

// Create context
const CartContext = createContext()

// Create provider component
export const CartProvider = ({ children }) => {
  const { data: cartItems, isLoading, error, refetch } = useUserCart()
  const [cart, setCart] = useState([])

  // Update local cart state when API data changes
  useEffect(() => {
    if (cartItems) {
      setCart(cartItems)
    }
  }, [cartItems])

  // Function to add item to cart
  const addToCart = async (item) => {
    // Here you would call your API to add the item
    // For example: await addItemToCartAPI(item);

    // Then refetch to get updated cart data
    await refetch()

    // For immediate UI feedback, you can also update the local state
    setCart((prevCart) => [...prevCart, item])
  }

  // Function to remove item from cart
  const removeFromCart = async (itemId) => {
    // Here you would call your API to remove the item
    // For example: await removeItemFromCartAPI(itemId);

    // Then refetch to get updated cart data
    await refetch()

    // For immediate UI feedback, you can also update the local state
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId))
  }

  // Function to update item quantity
  const updateQuantity = async (itemId, quantity) => {
    // Here you would call your API to update the quantity
    // For example: await updateCartItemQuantityAPI(itemId, quantity);

    // Then refetch to get updated cart data
    await refetch()

    // For immediate UI feedback, you can also update the local state
    setCart((prevCart) => prevCart.map((item) => (item.id === itemId ? { ...item, quantity } : item)))
  }

  // Value to be provided to consumers
  const value = {
    cart,
    cartCount: cart.length,
    isLoading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    refetchCart: refetch,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

