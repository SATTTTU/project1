export const OrderSummary = ({ cartItems, checkoutStep, onProceedToCheckout }) => {
    // Calculate cart totals
    const calculateSubtotal = () => {
      return cartItems
        .reduce((total, item) => {
          return total + Number.parseFloat(item.price) * item.quantity;
        }, 0)
        .toFixed(2);
    };
  
    const calculateTax = () => {
      return (calculateSubtotal() * 0.08).toFixed(2);
    };
  
    const calculateTotal = () => {
      return (Number.parseFloat(calculateSubtotal()) + Number.parseFloat(calculateTax())).toFixed(2);
    };
  
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-6">
        <div className="p-6">
          <h2 className="text-lg font-bold mb-4">Order Summary</h2>
  
          <div className="mb-4">
            {cartItems.map((item) => (
              <div key={item.productId} className="flex justify-between py-2 border-b">
                <div className="flex items-center">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-gray-600 ml-2">x{item.quantity}</span>
                </div>
                <span>${(Number.parseFloat(item.price) * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
  
          <div className="mb-4">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Subtotal</span>
              <span>${calculateSubtotal()}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Tax (8%)</span>
              <span>${calculateTax()}</span>
            </div>
            <div className="flex justify-between py-2 border-t">
              <span className="font-bold">Total</span>
              <span className="font-bold">${calculateTotal()}</span>
            </div>
          </div>
  
          {checkoutStep === "cart" && (
            <button
              onClick={onProceedToCheckout}
              className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Proceed to Checkout
            </button>
          )}
  
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>We accept all major credit cards and PayPal</p>
            <div className="flex justify-center mt-2 space-x-2">
              <div className="w-10 h-6 bg-gray-200 rounded"></div>
              <div className="w-10 h-6 bg-gray-200 rounded"></div>
              <div className="w-10 h-6 bg-gray-200 rounded"></div>
              <div className="w-10 h-6 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };