"use client"
import { useGetUserOrder } from "../api/getUserOrder"
import OrderRequestCard from "./orderrequest"

const OrderManagement = () => {
  const { data, isLoading, error } = useGetUserOrder()

  console.log("Raw API response:", data)
  console.log("Is data undefined?", data === undefined)
  console.log("Does data have a data property?", data && "data" in data)
  console.log("Data structure:", data && typeof data === "object" ? Object.keys(data) : "Not an object")

  if (isLoading) return <p className="text-center py-4">Loading orders...</p>
  if (error) return <p className="text-center py-4 text-red-500">Error fetching orders: {error.message}</p>

  // Enhanced data extraction with better error handling
  let orders = []
  if (data) {
    if (Array.isArray(data)) {
      orders = data
    }
    else if (data.data && Array.isArray(data.data)) {
      orders = data.data
    }
    else if (data.orders && Array.isArray(data.orders)) {
      orders = data.orders
    }
    else {
      console.warn("Unexpected data structure:", data)
    }
  }

  // Safely format orders for the OrderRequestCard
  const formattedOrders = orders.map(order => {
    // Use order.id if available, otherwise fall back to order.order_id
    const orderId = order.id || order.order_id
    
    return {
      id: orderId,
      customerName: order.user?.name || "Unknown Customer",
      image: order.items?.[0]?.menu_item?.image_url || "/default.png",
      items: order.items?.map(item => 
        `${item.menu_item?.name || 'Unknown Item'} (x${item.quantity || 1})`
      ) || ["No items"],
      time: order.created_at || "Just now",
      distance: order.distance || "2 km",
      paymentMethod: order.payment_method || "Cash on Delivery",
      total: order.total || order.items?.reduce(
        (sum, item) => sum + Number.parseFloat(item.total || 0), 0
      ) || 0,
      status: order.status || "preparing"
    }
  })

  console.log("Formatted orders:", formattedOrders)

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="mb-4 text-xl font-bold">New Order Requests</h2>
      {formattedOrders.length > 0 ? (
        <div className="grid gap-4 mb-8">
          {formattedOrders.map((order) => (
            <OrderRequestCard
              key={order.id}  // Using the consistent id here
              order={order}
            />
          ))}
        </div>
      ) : (
        <p className="text-center py-4">No orders available</p>
      )}
    </div>
  )
}

export default OrderManagement