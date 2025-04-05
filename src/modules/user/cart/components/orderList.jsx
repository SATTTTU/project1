import { useCurrentOrders } from "../api/currentOrders";
import { CartHeader } from "./cartheader";

const imageBaseUrl = "https://khajabox-bucket.s3.ap-south-1.amazonaws.com/";

export const OrderList = () => {
  const { data: orders, isLoading, error } = useCurrentOrders();
  console.log("orders****", orders);

  if (isLoading) return <p className="p-4 text-gray-600">Loading orders...</p>;
  if (error) return <p className="p-4 text-red-500">Failed to load orders.</p>;

  return (
    <>
      <CartHeader />
      <div className="p-6 bg-white shadow-md rounded-xl max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">My Orders</h2>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500">You haven’t placed any orders yet.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const totalOrderPrice = order.items.reduce(
                (sum, item) => sum + parseFloat(item.total),
                0
              );

              const getStatusColor = (status) => {
                switch (status.toLowerCase()) {
                  case "delivered":
                    return "text-green-600 bg-green-100";
                  case "pending":
                    return "text-yellow-600 bg-yellow-100";
                  case "cancelled":
                    return "text-red-600 bg-red-100";
                  default:
                    return "text-gray-700 bg-gray-100";
                }
              };

              return (
                <div key={order.id} className="border rounded-xl p-5 shadow-sm hover:shadow-md transition duration-200 bg-white">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">Order #{order.order_id}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div
                        key={item.order_item_id}
                        className="flex items-start gap-4 border-b pb-4"
                      >
                        <img
                          src={
                            item.menu_item.image_url
                              ? `${imageBaseUrl}${item.menu_item.image_url}`
                              : "/placeholder.jpg"
                          }
                          alt={item.menu_item.name}
                          className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                          onError={(e) => {
                            e.target.src = "/placeholder.jpg";
                          }}
                        />

                        <div>
                          <p className="font-semibold text-gray-900">{item.menu_item.name}</p>
                          <p className="text-sm text-gray-600">{item.menu_item.description}</p>
                          <div className="text-sm mt-1">
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: Rs. {item.price}</p>
                            <p className="font-medium">Total: Rs. {item.total}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="text-lg font-bold mt-4 text-right text-gray-800">
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
          </div>
        )}
      </div>
    </>
  );
};
