// components/OrderTable.jsx
import React from "react";

export const OrderTable = ({ paginatedData }) => {
  return (
		<div className="overflow-x-auto">
			<table className="w-full">
				<thead>
					<tr className="border-b bg-gray-50">
						<th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
							Order ID
						</th>
						<th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
							Customer
						</th>
						<th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
							Items
						</th>
						<th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
							Quantity
						</th>
						<th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
							Date
						</th>
						<th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
							Status
						</th>
						<th className="px-4 py-3 text-right text-sm font-medium text-gray-500">
							Amount
						</th>
					</tr>
				</thead>
				<tbody>
					{paginatedData.length > 0 ? (
						paginatedData.map((item) => (
							<tr key={item.id} className="border-b hover:bg-gray-50">
								<td className="px-4 py-4 text-sm font-medium">{item.id}</td>
								<td className="px-4 py-4 text-sm">{item.customerName}</td>
								<td className="px-4 py-4 text-sm">
									<div className="space-y-1">
										{item.items.map((food, index) => (
											<div key={index}>{food?.name}</div>
										))}
									</div>
								</td>
								<td className="px-4 py-4 text-sm">
									<div className="space-y-1">
										{item.items.map((food, index) => (
											<div key={index}>{food.quantity}</div>
										))}
									</div>
								</td>
								<td className="px-4 py-4 text-sm text-gray-500">{item.date}</td>
								<td className="px-4 py-4 text-sm">
									<span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
										{item.status}
									</span>
								</td>
								<td className="px-4 py-4 text-right text-sm font-medium">
									₹{item.total}
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
	);
};
