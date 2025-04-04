import React from "react";
import { useFetchOrder } from "../api/getorder";
import { useNavigate } from "react-router-dom";

export const OrderListPage = () => {
  const { data, isLoading, isError, error } = useFetchOrder();
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="text-center text-gray-500 py-10">Loading orders...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 py-10">
        Error fetching orders: {error.message}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Order List</h1>
      {data.length === 0 ? (
        <p className="text-center text-gray-600">No orders available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((item) => (
            <div
              key={item.order_id}
              className="bg-white shadow-md rounded-lg p-6 border border-gray-200 cursor-pointer hover:shadow-lg transition"
              onClick={() => navigate(`/rider/main/${item.order_id}`)} // Navigate to details page
            >
              <h2 className="text-xl font-semibold text-blue-600">
                Order ID: {item.order_id}
              </h2>

              {/* User Info */}
              <div className="flex items-center gap-4 mt-3">
                <div>
                  <p className="font-medium">{item.user?.name}</p>
                  <p className="text-sm text-gray-600">{item.user?.email}</p>
                </div>
              </div>

              {/* Cook Info */}
              <div className="mt-4">
                <p className="text-gray-700">
                  <span className="font-semibold">Cook:</span> {item.cook?.name} ({item.cook?.email})
                </p>
              </div>

              {/* Pickup & Drop Info */}
              <div className="mt-4 text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Pickup:</span> {item?.latitude}, {item?.longitude}
                </p>
                <p>
                  <span className="font-semibold">Drop:</span> {item.drop_location_id?.latitude}, {item.drop_location_id?.longitude}
                </p>
              </div>

              {/* Status */}
              <p
                className={`mt-4 px-3 py-1 w-fit text-sm font-semibold rounded-full 
                ${item.status === "delivered" ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"}
              `}
              >
                {item.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
