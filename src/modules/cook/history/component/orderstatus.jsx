export const OrderStats = ({ totalOrders, totalItems, totalEarnings }) => {
  return (
    <div className="grid gap-4 mb-6 sm:grid-cols-3">
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
        <p className="mt-2 text-3xl font-bold">{totalOrders}</p>
      </div>
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <h3 className="text-sm font-medium text-gray-500">Total Items Sold</h3>
        <p className="mt-2 text-3xl font-bold">{totalItems}</p>
      </div>
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <h3 className="text-sm font-medium text-gray-500">Total Earnings</h3>
        <p className="mt-2 text-3xl font-bold">₹{totalEarnings}</p>
      </div>
    </div>
  )
}

