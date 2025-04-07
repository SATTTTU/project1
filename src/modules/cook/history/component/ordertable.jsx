export const OrderTable = ({ paginatedData = [] }) => {
	return (
	  <div className="overflow-x-auto">
		<table className="w-full">
		  <thead>
			<tr className="border-b bg-gray-50">
			  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Order ID</th>
			  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Customer</th>
			  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Items</th>
			  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Quantity</th>
			  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
			  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
			  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Amount</th>
			</tr>
		  </thead>
		  <tbody>
			{paginatedData.length > 0 ? (
			  paginatedData.map((order) => (
				<tr key={order?.order_id} className="border-b hover:bg-gray-50">
				  <td className="px-4 py-4 text-sm font-medium">{order?.order_id || "N/A"}</td>
				  <td className="px-4 py-4 text-sm">{order?.user?.name || "N/A"}</td>
				  <td className="px-4 py-4 text-sm">
					<div className="space-y-1">
					  {Array.isArray(order?.items) ? (
						order.items.map((item, index) => <div key={index}>{item?.name || "Unnamed item"}</div>)
					  ) : (
						<div>No items</div>
					  )}
					</div>
				  </td>
				  <td className="px-4 py-4 text-sm">
					<div className="space-y-1">
					  {Array.isArray(order?.items) ? (
						order.items.map((item, index) => <div key={index}>{item?.quantity || 0}</div>)
					  ) : (
						<div>0</div>
					  )}
					</div>
				  </td>
				  <td className="px-4 py-4 text-sm text-gray-500">
					{order?.created_at ? new Date(order.created_at).toLocaleDateString() : "N/A"}
				  </td>
				  <td className="px-4 py-4 text-sm">
					<span
					  className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
						order?.status === "delivered"
						  ? "bg-green-100 text-green-800"
						  : order?.status === "pending"
							? "bg-yellow-100 text-yellow-800"
							: order?.status === "cancelled"
							  ? "bg-red-100 text-red-800"
							  : "bg-gray-100 text-gray-800"
					  }`}
					>
					  {order?.status || "Unknown"}
					</span>
				  </td>
				  <td className="px-4 py-4 text-right text-sm font-medium">
					₹{order?.total || calculateTotal(order?.items) || "0"}
				  </td>
				</tr>
			  ))
			) : (
			  <tr>
				<td colSpan="7" className="px-4 py-8 text-center text-gray-500">
				  No orders found matching your search criteria
				</td>
			  </tr>
			)}
		  </tbody>
		</table>
	  </div>
	)
  }
  
  // Helper function to calculate total from items if total is not available
  function calculateTotal(items) {
	if (!Array.isArray(items)) return 0
  
	return items
	  .reduce((sum, item) => {
		const price = Number.parseFloat(item?.price || 0)
		const quantity = Number.parseInt(item?.quantity || 0)
		return sum + price * quantity
	  }, 0)
	  .toFixed(2)
  }
  
  