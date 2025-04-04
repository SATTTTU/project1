import { Link } from "react-router-dom";
import { useCurrentOrders } from "../api/currentOrders";
import { CartHeader } from "./cartheader";

export const OrderList = () => {
  const { data: orders, isLoading, error } = useCurrentOrders();
  console.log("orders****", orders);

  if (isLoading) return <p>Loading orders...</p>;
  if (error) return <p>Failed to load orders.</p>;

  return (
    <>
      <CartHeader />
      <div className="p-6 bg-white shadow-lg rounded-md">
        <h2 className="text-2xl font-semibold mb-4">My Orders</h2>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <ul className="space-y-6">
            {orders.map((order) => {
              const totalOrderPrice = order.items.reduce(
                (sum, item) => sum + parseFloat(item.total),
                0
              );

              return (
                <li key={order.id} className="p-6 border rounded-md shadow-sm">
                  <h3 className="font-bold text-lg">Order ID: {order.order_id}</h3>
                  <p>Status: <span className="font-medium">{order.status}</span></p>

                  <h4 className="font-semibold mt-3">Items:</h4>
                  <ul className="mt-2 space-y-4">
                    {order.items.map((item) => (
                      <li key={item.order_item_id} className="border-b pb-4 flex items-center gap-4">
                        {item.menu_item.image_url && (
                          <img
                            src={item.menu_item.image_url}
                            alt={item.menu_item.name}
                            className="w-20 h-20 object-cover rounded"
                          />
                        )}
                        <div>
                          <p className="font-semibold">{item.menu_item.name}</p>
                          <p className="text-sm text-gray-600">{item.menu_item.description}</p>
                          <p>Quantity: {item.quantity}</p>
                          <p>Price: Rs. {item.price}</p>
                          <p>Total: Rs. {item.total}</p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <p className="font-bold text-lg mt-3">
                    Grand Total: Rs. {totalOrderPrice.toFixed(2)}
                  </p>

                  <Link
                    to={`/track-order/${order?.order_id}`}
                    className="text-blue-500 hover:underline mt-4 inline-block"
                  >
                    Track Order
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};
