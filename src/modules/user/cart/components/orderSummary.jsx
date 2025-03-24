
export function OrderSummary({ items, subtotal, onCheckout, isCheckoutLoading }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden sticky top-20">
      <div className="p-6">
        <h2 className="text-lg font-bold mb-4">Order Summary</h2>
        <div className="mb-4">
          {items.map((item) => (
            <div key={item.item_id} className="flex justify-between py-2 border-b">
              <span>
                {item.menu_item?.name} x{item.quantity}
              </span>
              <span>Rs. {(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between font-bold text-lg mb-6">
          <span>Subtotal:</span>
          <span>Rs. {subtotal}</span>
        </div>
        <button
          onClick={onCheckout}
          disabled={isCheckoutLoading}
          className={`w-full bg-green-500 text-white py-3 rounded-md font-medium hover:bg-green-600 transition-colors ${
            isCheckoutLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isCheckoutLoading ? "Processing..." : "Proceed to Checkout"}
        </button>
      </div>
    </div>
  )
}

