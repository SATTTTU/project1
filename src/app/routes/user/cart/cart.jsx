import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../../../../store/cart/cart";
import { CheckoutSteps } from "@/modules/user/CartSection/components/CheckOutSteps";
import { CartItems } from "@/modules/user/CartSection/components/CartItems";
import { ShippingForm } from "@/modules/user/CartSection/components/ShippingForm";
import { PaymentForm } from "@/modules/user/CartSection/components/PaymentForm";
import { OrderSummary } from "@/modules/user/CartSection/components/OrderSummary";
import { CartHeader } from "@/modules/user/CartSection/components/cartHeader";
import { EmptyCart } from "@/modules/user/CartSection/components/EmptyCart";
import { OrderConfirmation } from "@/modules/user/CartSection/components/OrderConfirmation";

export const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const [checkoutStep, setCheckoutStep] = useState("cart");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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

  const handleProceedToCheckout = () => {
    setCheckoutStep("shipping");
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    setCheckoutStep("payment");
  };

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    setCheckoutStep("confirmation");
    dispatch(clearCart());
  };

  if (cartItems.length === 0 && checkoutStep === "cart") {
    return <EmptyCart/>;
  }

  if (checkoutStep === "confirmation") {
    return <OrderConfirmation />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CartHeader/>
      <CheckoutSteps currentStep={checkoutStep} />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            {checkoutStep === "cart" && (
              <CartItems
                items={cartItems}
                onQuantityChange={handleQuantityChange}
                onRemoveItem={handleRemoveItem}
              />
            )}

            {checkoutStep === "shipping" && (
              <ShippingForm
                formData={formData}
                onChange={handleInputChange}
                onSubmit={handleProceedToPayment}
                onBack={() => setCheckoutStep("cart")}
              />
            )}

            {checkoutStep === "payment" && (
              <PaymentForm
                formData={formData}
                onChange={handleInputChange}
                onSubmit={handleCompleteOrder}
                onBack={() => setCheckoutStep("shipping")}
              />
            )}
          </div>

          <div className="lg:w-1/3">
            <OrderSummary
              cartItems={cartItems}
              checkoutStep={checkoutStep}
              onProceedToCheckout={handleProceedToCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};