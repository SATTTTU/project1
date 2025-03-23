"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { removeFromCart, updateQuantity } from "../../../../store/cart/cart"
import { CartItems } from "@/modules/user/cart/components/cartItems"
import { CartHeader } from "@/modules/user/cart/components/cartheader"
import { EmptyCart } from "@/modules/user/cart/components/emptyCart"
import { OrderConfirmation } from "@/modules/user/cart/components/orderConfirmation"
import { useUserBasket } from "@/modules/user/cart/api/getItems"
import { toast } from "react-toastify"

export const Cart = () => {
  const dispatch = useDispatch()
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderId, setOrderId] = useState(null)

  // Use the enhanced useUserBasket hook that auto-refreshes
  const { data, isLoading, error, refetch } = useUserBasket()

  // Process cart items from the API response
  const processCartItems = () => {
    if (!data || !data.data) return []

    // Find the first basket key (usually user ID)
    const basketKey = Object.keys(data.data)[0]
    if (!basketKey || !data.data[basketKey] || !data.data[basketKey].items) return []

    // Map the items to the expected format
    return data.data[basketKey].items.map((item) => ({
      id: item.item_id,
      name: item.menu_item?.name || "Unknown Item",
      description: item.menu_item?.description || "",
      image: item.menu_item?.image_url || "",
      price: Number.parseFloat(item.price),
      quantity: item.quantity,
      total: Number.parseFloat(item.total),
    }))
  }

  const cartItems = processCartItems()

  // Calculate cart totals
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
  }

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return

    try {
      // Update in Redux
      dispatch(updateQuantity({ productId: itemId, quantity: newQuantity }))

      // Update in API (you would need to implement this API call)
      // await updateCartItemQuantity({ item_id: itemId, quantity: newQuantity });

      // Refetch cart data
      refetch()

      toast.success("Quantity updated successfully")
    } catch (error) {
      toast.error("Failed to update quantity")
      console.error("Error updating quantity:", error)
    }
  }

  const handleRemoveItem = async (itemId) => {
    try {
      // Update in Redux
      dispatch(removeFromCart(itemId))

      // Update in API (you would need to implement this API call)
      // await removeCartItem({ item_id: itemId });

      // Refetch cart data
      refetch()

      toast.success("Item removed from cart")
    } catch (error) {
      toast.error("Failed to remove item")
      console.error("Error removing item:", error)
    }
  }

  const handleCheckout = () => {
    // Implement checkout logic here
    setOrderComplete(true)
    setOrderId("ORD-" + Math.floor(Math.random() * 10000))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-6 rounded-lg">
          <h2 className="text-red-600 font-bold text-xl">Error loading cart</h2>
          <p className="text-red-500">{error.message}</p>
          <button
            onClick={() => refetch()}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0 && !orderComplete) {
    return <EmptyCart />
  }

  if (orderComplete) {
    return <OrderConfirmation orderId={orderId} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CartHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Your Cart</h1>
          <button onClick={() => refetch()} className="text-blue-500 hover:text-blue-700 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
            Refresh Cart
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <CartItems items={cartItems} onQuantityChange={handleQuantityChange} onRemoveItem={handleRemoveItem} />
          </div>
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden sticky top-20">
              <div className="p-6">
                <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                <div className="mb-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between py-2 border-b">
                      <span>
                        {item.name} x{item.quantity}
                      </span>
                      <span>Rs. {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between font-bold text-lg mb-6">
                  <span>Subtotal:</span>
                  <span>Rs. {calculateSubtotal()}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-green-500 text-white py-3 rounded-md font-medium hover:bg-green-600 transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

