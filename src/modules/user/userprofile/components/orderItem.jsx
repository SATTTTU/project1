import { Link } from "react-router-dom";

export const OrderItem = ({ order }) => {
  console.log("orders items", order);

  const imageUrl = "https://khajabox-bucket.s3.ap-south-1.amazonaws.com/";

  // Calculate grand total as integer
  const grandTotal = Math.round(order?.items?.reduce((sum, item) => sum + (parseFloat(item.total) || 0), 0));

  return (
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200 mb-8">
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-6 flex flex-wrap justify-between items-center rounded-t-2xl">
        <div>
          <span className="text-sm text-gray-500">Order ID:</span>
          <span className="ml-2 font-semibold text-gray-800">{order?.order_id}</span>
        </div>
        <div>
          <span
            className={`px-4 py-1 rounded-full text-sm font-medium shadow-sm ${
              order.status === "Delivered"
                ? "bg-green-200 text-green-800"
                : order.status === "Processing"
                ? "bg-blue-200 text-blue-800"
                : "bg-yellow-200 text-yellow-800"
            }`}
          >
            {order.status}
          </span>
         
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-semibold text-xl mb-4 text-gray-800 border-b border-slate-300 pb-2">Order Items
        <span className="flex justify-end text-sm text-gray-500 mb-4">
            <Link to={`/track-order/${order?.order_id}`}>Track Orders</Link>
          </span>
        </h3>
       
        <div className="space-y-4">
          {order.items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-4 border-b border-gray-300 last:border-b-0"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={`${imageUrl}${item?.menu_item?.image_url}`}
                  alt={item?.menu_item?.name}
                  className="w-16 h-16 object-cover rounded-lg shadow-md border border-slate-300"
                />
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800">{item?.menu_item?.name}</span>
                  <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                </div>
              </div>
              <div className="text-gray-700 font-semibold">Rs. {item.price}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-slate-300 pt-4 flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-800">Grand Total</span>
          <span className="text-xl font-bold text-green-600">Rs. {grandTotal}</span>
        </div>
      </div>
    </div>
  );
};
