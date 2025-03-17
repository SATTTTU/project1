import React from "react";
// import { useCart } from "@/hooks/useCart";
import { CheckoutSteps } from "@/modules/user/CartSection/components/checkoutsteps";
import { CartItems } from "@/modules/user/CartSection/components/cartitems";
import { ShippingForm } from "@/modules/user/CartSection/components/shippingForm";
import { PaymentForm } from "@/modules/user/CartSection/components/paymentForm";
import { OrderSummary } from "@/modules/user/CartSection/components/orderSummary";
import { CartHeader } from "@/modules/user/CartSection/components/cartheader";
import { EmptyCart } from "@/modules/user/CartSection/components/emptyCart";
import { OrderConfirmation } from "@/modules/user/CartSection/components/orderConfirmation";
import { useCart } from "@/modules/user/CartSection/hooks/useCart";

export const Cart = () => {
  const { cartItems, isLoading, isError, updateCartItem, deleteCartItem} = useCart();
  const [checkoutStep, setCheckoutStep] = React.useState("cart");

  if (isLoading) return <p>Loading cart...</p>;
  if (isError) return <p>Error loading cart</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <CartHeader />
      <CheckoutSteps currentStep={checkoutStep} />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            {checkoutStep === "cart" && cartItems.length > 0 ? (
              <CartItems
                items={cartItems}
                onQuantityChange={(id, quantity) => updateCartItem({ basket_item_id: id, quantity })}
                onRemoveItem={(id) => deleteCartItem(id)}
              />
            ) : (
              <EmptyCart />
            )}

            {checkoutStep === "shipping" && (
              <ShippingForm onSubmit={() => setCheckoutStep("payment")} onBack={() => setCheckoutStep("cart")} />
            )}

            {checkoutStep === "payment" && (
              <PaymentForm onSubmit={() => setCheckoutStep("confirmation")} onBack={() => setCheckoutStep("shipping")} />
            )}
          </div>

          <div className="lg:w-1/3">
            <OrderSummary cartItems={cartItems} checkoutStep={checkoutStep} onProceedToCheckout={() => setCheckoutStep("shipping")} />
          </div>
        </div>
      </div>
    </div>
  );
};
