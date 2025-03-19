import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../../../../store/cart/cart";
import { CartItems } from "@/modules/user/cart/components/cartItems";
import { CartHeader } from "@/modules/user/cart/components/cartheader";
import { EmptyCart } from "@/modules/user/cart/components/emptyCart";
import { OrderConfirmation } from "@/modules/user/cart/components/orderConfirmation";
import KhaltiCheckout from "khalti-checkout-web";
import KhaltiLogo from "../../../../assets/UserImages/khalti.png"

export const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);

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
          // Payment successful
          console.log(payload);
          
          // Generate a random order ID
          const generatedOrderId = `KHB-${Math.floor(Math.random() * 10000)}`;
          setOrderId(generatedOrderId);
          
          // Clear cart and show confirmation
          dispatch(clearCart());
          setOrderComplete(true);
          
          // You would typically make an API call here to your backend
          // to verify the payment and create the order
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
      // Convert your total to paisa (multiply by 100)
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

                <button
                  onClick={handleKhaltiPayment}
                  className="w-full py-3 bg-[#426B1F] text-white rounded-md hover:bg-[#426B1F] flex items-center justify-center"
                >
             <img src={KhaltiLogo} alt="khalti" className="w-10 text-white" />
                  Pay with Khalti
                </button>

                <div className="mt-4 text-center text-sm text-gray-600">
                  <p>Secure payment powered by Khalti</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};