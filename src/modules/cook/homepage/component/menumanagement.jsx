import React from "react";
import FoodItem from "./FoodItem";

const MenuManagement = ({ foodItems }) => {
  return (
    <>
      {/* Food Items Menu Management */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Your Menu Items</h2>
        <div className="flex gap-2">
          <button className="flex items-center rounded-md cursor-pointer bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
            Sort by Popularity
          </button>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {foodItems.map((item) => (
          <FoodItem key={item.id} item={item} />
        ))}
      </div>
    </>
  );
};

export default MenuManagement;
