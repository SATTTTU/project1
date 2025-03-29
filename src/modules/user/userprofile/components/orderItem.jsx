export const OrderItem = ({ order }) => {
  console.log("orders items", order);

  const imageUrl = "https://khajabox-bucket.s3.ap-south-1.amazonaws.com/";

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 mb-6">
      <div className="bg-gray-100 p-6 flex flex-wrap justify-between items-center rounded-t-lg">
        <div>
          <span className="text-sm text-gray-500">Order ID:</span>
          <span className="ml-2 font-medium text-gray-700">{order?.order_id}</span>
        </div>
        <div>
          {order?.items?.map((item, index) => (
            <div key={index}>
              <span className="text-sm text-gray-500">Total:</span>
              <span className="ml-2 font-medium text-gray-700">{item.total}</span>
            </div>
          ))}
        </div>
        <div>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              order.status === "Delivered"
                ? "bg-green-100 text-green-800"
                : order.status === "Processing"
                ? "bg-blue-100 text-blue-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {order.status}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-semibold text-lg mb-4">Order Items</h3>
        <div className="space-y-4">
          {order.items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-4 border-b last:border-b-0"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={`${imageUrl}${item?.menu_item?.image_url}`}
                  alt={item?.menu_item?.name}
                  className="w-16 h-16 object-cover rounded-lg shadow-md"
                />
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800">{item?.menu_item?.name}</span>
                  <span className="text-sm text-gray-500">x{item.quantity}</span>
                </div>
              </div>
              <div className="text-gray-700 font-medium">{item.price}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md focus:outline-none">
            Order Again
          </button>
        </div>
      </div>
    </div>
  );
};
