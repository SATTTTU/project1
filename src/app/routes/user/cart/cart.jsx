
import { useState } from "react"
// import { useToast } from "@/components/ui/use-toast"
import { useUserBasket } from "@/modules/user/cart/api/getItems"
import { useUpdateStoreItem } from "@/modules/user/cart/api/updateItems"
import { useDeleteStoreItem } from "@/modules/user/cart/api/deleteItems"
import { OrderConfirmation } from "@/modules/user/cart/components/orderConfirmation"
import { EmptyCart } from "@/modules/user/cart/components/emptyCart"
import { CartHeader } from "@/modules/user/cart/components/cartheader"
import { CartItems } from "@/modules/user/cart/components/cartItems"
import { OrderSummary } from "@/modules/user/cart/components/orderSummary"
import { useCheckout } from "@/modules/user/cart/api/checkout"
// import { CartItems } from "./components/cart-items"
// import { CartHeader } from "./components/cart-header"
// import { EmptyCart } from "./components/empty-cart"
// import { OrderConfirmation } from "./components/order-confirmation"
// import { OrderSummary } from "./components/order-summary"
// import { useUserBasket } from "./api/get-items"
// import { useUpdateStoreItem } from "./api/update-items"
// import { useDeleteStoreItem } from "./api/delete-items"
// import { useCheckout } from "./api/checkout"

export const Cart=()=> {
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderId, setOrderId] = useState(null)
  // const { toast } = useToast()

  const { data, isLoading, error, refetch } = useUserBasket()
  const { updateItem, isLoading: isUpdating } = useUpdateStoreItem()
  const { mutateAsync: deleteItem, isLoading: isDeleting } = useDeleteStoreItem()
  const { mutateAsync: checkoutMutation, isLoading: isCheckoutLoading } = useCheckout()

  const calculateSubtotal = () => {
    if (!data || !data[1]?.items) return "0.00"
    return data[1].items.reduce((total, item) => total + (item.price * item.quantity || 0), 0).toFixed(2)
  }

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return

    try {
      await updateItem({ item_id: itemId, quantity: newQuantity })
      toast({
        title: "Quantity updated",
        description: "Your cart has been updated successfully.",
      })
      refetch()
    } catch (error) {
      toast({
        title: "Failed to update quantity",
        description: "Please try again later.",
        variant: "destructive",
      })
      console.error("Error updating quantity:", error)
    }
  }

  const handleRemoveItem = async (itemId) => {
    try {
      await deleteItem({ item_id: itemId })
      toast({
        title: "Item removed",
        description: "The item has been removed from your cart.",
      })
      refetch()
    } catch (error) {
      toast({
        title: "Failed to remove item",
        description: "Please try again later.",
        variant: "destructive",
      })
      console.error("Error removing item:", error)
    }
  }

  const handleCheckout = async () => {
    try {
      if (!data || !data[1]?.items || data[1].items.length === 0) {
        toast({
          title: "Empty cart",
          description: "Your cart is empty. Add items before proceeding.",
          variant: "destructive",
        })
        return
      }

      const cartData = {
        items: data[1].items.map((item) => ({
          id: item.item_id,
          quantity: item.quantity,
        })),
      }
      const response = await checkoutMutation(cartData)

      setOrderComplete(true)
      setOrderId(response?.orderId || `ORD-${Math.floor(Math.random() * 10000)}`)
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase.",
      })
    } catch (error) {
      console.error("Error during checkout:", error)
      toast({
        title: "Checkout failed",
        description: "Please try again later.",
        variant: "destructive",
      })
    }
  }

  if (isLoading && (!data || !data[1]?.items)) {
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
          <p className="text-red-500">{error instanceof Error ? error.message : "Unknown error"}</p>
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

  if (orderComplete) {
    return <OrderConfirmation orderId={orderId} />
  }

  if (!data || !data[1]?.items || data[1].items.length === 0) {
    return <EmptyCart />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CartHeader itemCount={data[1]?.items?.length || 0} />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <CartItems
              data={data}
              onQuantityChange={handleQuantityChange}
              onRemoveItem={handleRemoveItem}
              isUpdating={isUpdating}
              isDeleting={isDeleting}
            />
          </div>
          <div className="lg:w-1/3">
            <OrderSummary
              items={data[1]?.items || []}
              subtotal={calculateSubtotal()}
              onCheckout={handleCheckout}
              isCheckoutLoading={isCheckoutLoading}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

