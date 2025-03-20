import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../../../../store/cart/cart";
import { CartItems } from "@/modules/user/cart/components/cartItems";
import { CartHeader } from "@/modules/user/cart/components/cartheader";
import { EmptyCart } from "@/modules/user/cart/components/emptyCart";
import { OrderConfirmation } from "@/modules/user/cart/components/orderConfirmation";
import KhaltiCheckout from "khalti-checkout-web";
import KhaltiLogo from "../../../../assets/UserImages/khalti.png";
import { useCheckout } from "@/modules/user/cart/api/checkout";
// import { useCheckout } from "@/path/to/your/hook"; // Update with the correct path

export const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("khalti"); // Default payment method

  // Initialize the checkout mutation hook
  const { 
    mutateAsync: processCheckout, 
    isLoading: isCheckoutLoading, 
    error: checkoutError 
  } = useCheckout({
    mutationConfig: {
      onSuccess: (data) => {
        // Handle successful API checkout
        console.log('Checkout API response:', data);
        
        // If you get orderId from API, use it
        const apiOrderId = data.orderId || `KHB-${Math.floor(Math.random() * 10000)}`;
        setOrderId(apiOrderId);
        
        // Clear cart and show confirmation
        dispatch(clearCart());
        setOrderComplete(true);
      },
    },
  });

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

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    dispatch(
      updateQuantity({
        productId,
        quantity: newQuantity,
      })
    );
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleDirectCheckout = async () => {
    try {
      // Prepare the order data for API
      const orderData = {
        items: cartItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price
        })),
        subtotal: calculateSubtotal(),
        tax: calculateTax(),
        total: calculateTotal(),
        paymentMethod: "direct" // Or any identifier for direct checkout
      };
      
      await processCheckout(orderData);
    } catch (err) {
      console.error('Checkout failed:', err);
    }
  };

  const handleKhaltiPayment = () => {
    // Replace with your actual Khalti merchant details
    const config = {
      // Replace this key with your public key from Khalti Dashboard
      publicKey: "your_khalti_public_key",
      productIdentity: `cart-${Date.now()}`,
      productName: "KhanaBox Order",
      productUrl: "https://khanabox.com",
      eventHandler: {
        onSuccess(payload) {
          // Payment successful through Khalti
          console.log(payload);
          
          // After Khalti payment success, call your API with payment details
          processCheckout({
            items: cartItems.map(item => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price
            })),
            subtotal: calculateSubtotal(),
            tax: calculateTax(),
            total: calculateTotal(),
            paymentMethod: "khalti",
            khaltiPaymentDetails: payload
          }).catch(err => {
            console.error("Error saving order after Khalti payment:", err);
          });
        },
        onError(error) {
          // Payment failed
          console.log(error);
          alert("Payment failed. Please try again.");
        },
        onClose() {
          console.log("Khalti payment widget closed");
        }
      },
      // Amount in paisa (100 paisa = 1 NPR)
      amount: Math.round(parseFloat(calculateTotal()) * 100)
    };

    const checkout = new KhaltiCheckout(config);
    checkout.show({ amount: config.amount });
  };

  if (cartItems.length === 0 && !orderComplete) {
    return <EmptyCart />;
  }

  if (orderComplete) {
    return <OrderConfirmation orderId={orderId} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CartHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <CartItems
              items={cartItems}
              onQuantityChange={handleQuantityChange}
              onRemoveItem={handleRemoveItem}
            />
          </div>

          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden sticky top-20 lg:mt-15">
              <div className="p-6">
                <h2 className="text-lg font-bold mb-4">Order Summary</h2>

                <div className="mb-4">
                  {cartItems.map((item) => (
                    <div key={item.productId} className="flex justify-between py-2 border-b">
                      <div className="flex items-center">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-gray-600 ml-2">x{item.quantity}</span>
                      </div>
                      <span>Rs. {(Number.parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span>Rs. {calculateSubtotal()}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Tax (8%)</span>
                    <span>Rs. {calculateTax()}</span>
                  </div>
                  <div className="flex justify-between py-2 border-t">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">Rs. {calculateTotal()}</span>
                  </div>
                </div>

                {/* Payment options */}
                <div className="mb-4">
                  <div className="text-sm font-medium mb-2">Select Payment Method:</div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setPaymentMethod("khalti")}
                      className={`flex-1 py-2 ${paymentMethod === "khalti" ? "bg-purple-100 border-purple-500" : "bg-gray-100"} border rounded-md`}
                    >
                      <img src={KhaltiLogo} alt="khalti" className="w-8 h-6 mx-auto" />
                    </button>
                    <button
                      onClick={() => setPaymentMethod("direct")}
                      className={`flex-1 py-2 ${paymentMethod === "direct" ? "bg-green-100 border-green-500" : "bg-gray-100"} border rounded-md`}
                    >
                      Direct Checkout
                    </button>
                  </div>
                </div>

                {paymentMethod === "khalti" ? (
                  <button
                    onClick={handleKhaltiPayment}
                    className="w-full py-3 bg-[#426B1F] text-white rounded-md hover:bg-[#426B1F] flex items-center justify-center"
                    disabled={isCheckoutLoading}
                  >
                    <img src={KhaltiLogo} alt="khalti" className="w-10 text-white" />
                    Pay with Khalti
                  </button>
                ) : (
                  <button
                    onClick={handleDirectCheckout}
                    className="w-full py-3 bg-[#426B1F] text-white rounded-md hover:bg-[#426B1F] flex items-center justify-center"
                    disabled={isCheckoutLoading}
                  >
                    {isCheckoutLoading ? "Processing..." : "Complete Checkout"}
                  </button>
                )}

                {checkoutError && (
                  <div className="mt-4 text-center text-sm text-red-600">
                    <p>Error: {checkoutError.message || "Failed to process order"}</p>
                  </div>
                )}

                <div className="mt-4 text-center text-sm text-gray-600">
                  <p>Secure payment processing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};