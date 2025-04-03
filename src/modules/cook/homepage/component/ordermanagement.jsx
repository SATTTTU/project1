"use client"
import { useGetUserOrder } from "../api/getUserOrder"
import OrderRequestCard from "./orderrequest"

const OrderManagement = () => {
  const { data, isLoading, error } = useGetUserOrder()

  console.log("Raw API response:", data)
  console.log("Is data undefined?", data === undefined)
  console.log("Does data have a data property?", data && "data" in data)
  console.log("Data structure:", data && typeof data === "object" ? Object.keys(data) : "Not an object")

  console.log("Fetched data in OrderManagement:", data) // Debug log

  if (isLoading) return <p className="text-center py-4">Loading orders...</p>
  if (error) return <p className="text-center py-4 text-red-500">Error fetching orders: {error.message}</p>

  // Replace the existing data extraction with this more robust approach
  // that handles different possible API response structures
  let orders = []
  if (data) {
    // Handle case where data might be the array directly
    if (Array.isArray(data)) {
      orders = data
    }
    // Handle case where data.data is the array
    else if (data.data && Array.isArray(data.data)) {
      orders = data.data
    }
    // Handle case where data might be an object with orders as a property
    else if (data.orders && Array.isArray(data.orders)) {
      orders = data.orders
    }
  }

  console.log("Final orders array:", orders)
  console.log("Orders length:", orders.length)

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="mb-4 text-xl font-bold">New Order Requests</h2>
      {orders.length > 0 ? (
        <div className="grid gap-4 mb-8">
          {orders.map((order) => (
            <OrderRequestCard
              key={order.order_id}
              order={{
                id: order.order_id,
                customerName: order.user.name,
                image: order.items[0]?.menu_item.image_url || "/default.png",
                items: order.items.map((item) => `${item.menu_item.name} (x${item.quantity})`).join(", "),
                time: "Just now", // Static value for now
                distance: "2 km", // Static value for now
                paymentMethod: "Cash on Delivery", // Static value for now
                total: order.items.reduce((sum, item) => sum + Number.parseFloat(item.total), 0),
              }}
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

