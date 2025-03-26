import { CartItem } from "./cartitem"

export const CartItems=({ items, onQuantityChange, onRemoveItem, isUpdating, isDeleting })=> {
  // if (!items || items.length === 0) {
  //   return (
  //     <div className="bg-white rounded-lg shadow-md p-6">
  //       <p className="text-gray-500 text-center">Your cart is empty</p>
  //     </div>
  //   )
  // }
console.log("items",items[0])
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-6">
          {items[0]?.items?.map((item) => (
            <CartItem
              key={item.item_id}
              item={item}
              onQuantityChange={onQuantityChange}
              onRemoveItem={onRemoveItem}
              isUpdating={isUpdating}
              isDeleting={isDeleting}
            />
          ))}
        </div>
      </div>
    </>
  )
}

