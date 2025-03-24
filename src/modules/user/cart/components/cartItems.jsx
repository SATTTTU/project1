import { CartItem } from "./cartitem"

export function CartItems({ data, onQuantityChange, onRemoveItem, isUpdating, isDeleting }) {
  if (!data || !data[1]?.items || data[1].items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500 text-center">Your cart is empty</p>
      </div>
    )
  }

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
              isUpdating={isUpdating}
              isDeleting={isDeleting}
            />
          ))}
        </div>
      </div>
    </>
  )
}

