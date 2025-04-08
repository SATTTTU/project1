import { useState } from "react"
import { useCurrentOrders } from "../../cart/api/currentOrders"
import { useAllOrders } from "../api/getAllOrders"
import { EmptyOrder } from "./emptyOrder"
import { OrderItem } from "./orderItem"

export const OrdersContent = () => {
  const [showCurrent, setShowCurrent] = useState(false) // false = history, true = current
  const { data: orders } = useAllOrders()
  const { data: currentorders } = useCurrentOrders()

  const displayedOrders = showCurrent ? currentorders : orders

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Your Orders</h2>

      {/* Toggle Buttons */}
      <div className="flex mb-6 space-x-4">
        <button
          onClick={() => setShowCurrent(false)}
          className={`px-4 py-2 rounded ${
            !showCurrent ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
        >
          Order History
        </button>
        <button
          onClick={() => setShowCurrent(true)}
          className={`px-4 py-2 rounded ${
            showCurrent ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
        >
          Current Orders
        </button>
      </div>

      {/* Scrollable Orders List */}
      {displayedOrders?.length > 0 ? (
        <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
          {displayedOrders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <EmptyOrder />
      )}
    </div>
  )
}
