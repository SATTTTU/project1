import React from "react";

export const OrderItems = ({ items }) => {
  return (
    <div className="mt-4 pt-4 border-t">
      <h4 className="text-sm font-bold mb-2">Order Items</h4>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span>
              {item.menu_item.name}{" "}
              <span className="text-gray-500">x{item.quantity}</span>
            </span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
