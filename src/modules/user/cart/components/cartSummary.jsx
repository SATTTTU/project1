import { useUserCart } from "../api/getItems"
import { CheckoutButton } from "./checkoutButton"
// import { CheckoutButton } from "./checkoutButton"

export function CartSummary() {
  const { data: cartData } = useUserCart()
  console.log("baseket  k", cartData)

  const calculateSubtotal = () => {
    if (!cartData || !cartData[0]?.items) return 0
    return cartData[0].items.reduce((total, item) => total + (item.price * item.quantity || 0), 0)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-lg font-bold mb-4">Order Summary</h2>

        <div className="mb-4">
          {cartData &&
            cartData[0]?.items &&
            cartData[0].items.map((item) => (
              <div key={item.item_id} className="flex justify-between py-2 border-b">
                <span>
                  {item.menu_item?.name} x{item.quantity}
                </span>
                <span>Rs. {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
        </div>

        <div className="flex justify-between font-bold text-lg mb-6">
          <span>Total:</span>
          <span>Rs. {calculateSubtotal().toFixed(2)}</span>
        </div>

        <CheckoutButton />
      </div>
    </div>
  )
}

