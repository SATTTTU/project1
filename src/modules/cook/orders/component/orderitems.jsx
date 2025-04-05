import React from "react";

export const OrderItems = ({ items }) => {
  // Handle case when items is undefined or empty
  if (!items || items.length === 0) {
    return (
      <div className="mt-4 pt-4 border-t">
        <h4 className="text-sm font-bold mb-2">Order Items</h4>
        <p className="text-sm text-gray-500">No items in this order</p>
      </div>
    );
  }

  // Calculate total
  const orderTotal = items.reduce(
    (total, item) => total + (item.price * item.quantity), 
    0
  );

  return (
    <div className="mt-4 pt-4 border-t">
      <h4 className="text-sm font-bold mb-2">Order Items</h4>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span>
              {item.menu_item?.name || item.name || `Item #${index + 1}`}{" "}
              <span className="text-gray-500">x{item.quantity}</span>
            </span>
            <span>₹{((item.price || 0) * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between pt-2 mt-2 border-t border-dashed">
          <span className="font-bold">Total</span>
          <span className="font-bold">₹{orderTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};