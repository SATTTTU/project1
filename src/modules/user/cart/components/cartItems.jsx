
import { CartItem } from "./cartitem";

export const CartItems = ({ data, onQuantityChange, onRemoveItem }) => {
  console.log("cartiemst:",data)
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-6">
          {data[1]?.items?.map((item) => (
            <CartItem
              key={item.item_id}
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