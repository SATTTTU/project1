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
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Order List</h1>

      {data.length === 0 ? (
        <p className="text-center text-gray-600">No orders available</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-md">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                <th className="px-4 py-3 border-b">Order ID</th>
                <th className="px-4 py-3 border-b">User</th>
                <th className="px-4 py-3 border-b">Cook</th>
                <th className="px-4 py-3 border-b">Pickup Location</th>
                <th className="px-4 py-3 border-b">Drop Location</th>
                <th className="px-4 py-3 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr
                  key={item.order_id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/rider/main/${item.order_id}`)}
                >
                  <td className="px-4 py-3 border-b text-blue-600 font-medium">
                    {item.order_id}
                  </td>
                  <td className="px-4 py-3 border-b">
                    <p className="font-medium">{item.user?.name}</p>
                    <p className="text-sm text-gray-500">{item.user?.email}</p>
                  </td>
                  <td className="px-4 py-3 border-b">
                    <p className="font-medium">{item.cook?.name}</p>
                    <p className="text-sm text-gray-500">{item.cook?.email}</p>
                  </td>
                  <td className="px-4 py-3 border-b text-sm text-gray-700">
                    {item.latitude}, {item.longitude}
                  </td>
                  <td className="px-4 py-3 border-b text-sm text-gray-700">
                    {item.drop_location_id?.latitude}, {item.drop_location_id?.longitude}
                  </td>
                  <td className="px-4 py-3 border-b">
                    <span
                      className={`px-3 py-1 text-sm font-semibold rounded-full
                        ${item.status === "delivered"
                          ? "bg-green-200 text-green-800"
                          : "bg-yellow-200 text-yellow-800"}`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
