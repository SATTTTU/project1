// import { CartItem } from "./cartitem";

import { CartItem } from "./cartitem";

export const CartItems = ({ items, onQuantityChange, onRemoveItem }) => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-6">
          {items.map((item) => (
            <CartItem
              key={item.productId}
              item={item}
              onQuantityChange={onQuantityChange}
              onRemoveItem={onRemoveItem}
            />
          ))}
        </div>
      </div>
    </>
  );
};