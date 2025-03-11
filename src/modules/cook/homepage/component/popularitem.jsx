import React from "react";

const PopularItems = ({ foodItems }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="font-medium mb-3">Most Popular Items</h3>
      <div className="space-y-3">
        {foodItems
          .sort((a, b) => b.orderCount - a.orderCount)
          .slice(0, 3)
          .map((item, index) => (
            <div key={item.id} className="flex items-center">
              <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2 text-sm">
                {index + 1}
              </span>
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">₹{item.price}</span>
                  <span className="text-sm text-gray-500">
                    {item.orderCount} orders
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PopularItems;
