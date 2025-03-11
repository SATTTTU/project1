import React from "react";

const FoodItem = ({ item }) => {
  return (
    <div className="rounded-lg bg-white shadow-sm overflow-hidden hover:shadow-md transition-all">
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="h-48 w-full object-cover"
        />
        <span className="absolute top-2 right-2 px-2 py-1 text-xs rounded-full bg-white font-medium">
          ★ {item.popularityRating}
        </span>
        {!item.available && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="px-3 py-1 bg-red-600 text-white rounded-full text-sm font-medium">
              Currently Unavailable
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={item.available}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#426B1F]"></div>
          </label>
        </div>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
          {item.description}
        </p>
        <div className="mt-2 text-xs text-gray-500">
          {item.orderCount} orders this month
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold">₹{item.price}</span>
          <button className="rounded-md bg-gray-100 px-3 py-1 text-xs text-gray-600 hover:bg-gray-200">
            Edit Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
