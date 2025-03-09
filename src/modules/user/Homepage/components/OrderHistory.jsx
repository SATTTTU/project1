export const OrderHistory=()=> {
    return (
      <div className="max-w-4xl">
        <h2 className="text-2xl font-semibold mb-6">Order History</h2>
  
        {[1, 2, 3].map((order) => (
          <div key={order} className="mb-6 border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium">Order #{1000 + order}</h3>
                <p className="text-sm text-gray-500">Placed on {new Date().toLocaleDateString()}</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Delivered</span>
            </div>
  
            <div className="border-t pt-4">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-16 h-16 bg-gray-100 rounded"></div>
                <div>
                  <p className="font-medium">Restaurant Name</p>
                  <p className="text-sm text-gray-600">2 items • Rs. {300 * order}</p>
                </div>
              </div>
  
              <div className="flex justify-between mt-4">
                <button className="text-sm text-blue-600 hover:underline">View Details</button>
                <button className="text-sm bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded">Reorder</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  