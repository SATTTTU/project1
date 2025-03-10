
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { FiTrash2, FiMinus, FiPlus, FiArrowLeft } from "react-icons/fi"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { removeFromCart, updateQuantity, clearCart } from "../../../../../store/cart/cart"
import Logo from "../../../../../assets/logo.jpg"

export const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [checkoutStep, setCheckoutStep] = useState("cart") 
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
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return

    dispatch(
      updateQuantity({
        productId,
        quantity: newQuantity,
      }),
    )
  }

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId))
  }

  // Calculate cart totals
  const calculateSubtotal = () => {
    return cartItems
      .reduce((total, item) => {
        return total + Number.parseFloat(item.price) * item.quantity
      }, 0)
      .toFixed(2)
  }

  const calculateTax = () => {
    return (calculateSubtotal() * 0.08).toFixed(2)
  }

  const calculateTotal = () => {
    return (Number.parseFloat(calculateSubtotal()) + Number.parseFloat(calculateTax())).toFixed(2)
  }

  const handleProceedToCheckout = () => {
    setCheckoutStep("shipping")
  }

  const handleProceedToPayment = (e) => {
    e.preventDefault()
    setCheckoutStep("payment")
  }

  const handleCompleteOrder = (e) => {
    e.preventDefault()
    setCheckoutStep("confirmation")
    // In a real app, you would process the payment here
    // and then clear the cart after successful payment
    dispatch(clearCart())
  }

  //YO chai  Empty cart view
  if (cartItems.length === 0 && checkoutStep === "cart") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <Link to="/user/home" className="flex items-center">
                <img src={Logo || "/placeholder.svg"} alt="KhanaBox" className="h-10 w-10 mr-2" />
                <span className="text-xl font-bold text-green-600">KhanaBox</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <AiOutlineShoppingCart className="mx-auto text-gray-300 text-8xl mb-6" />
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link
              to="/user/home"
              className="inline-flex items-center px-6 py-3 bg-[#426B1F] text-white rounded-lg hover:bg-green-700"
            >
              <FiArrowLeft className="mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  //YO chai Order confirmation view
  if (checkoutStep === "confirmation") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <Link to="/user/home" className="flex items-center">
                <img src={Logo || "/placeholder.svg"} alt="KhanaBox" className="h-10 w-10 mr-2" />
                <span className="text-xl font-bold text-green-600">KhanaBox</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Order Confirmed!</h2>
              <p className="text-gray-600 mt-2">Thank you for your order. Your order has been placed successfully.</p>
            </div>

            <div className="border-t border-b py-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Order Number:</span>
                <span className="font-semibold">KHB-{Math.floor(Math.random() * 10000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Delivery:</span>
                <span className="font-semibold">30-45 minutes</span>
              </div>
            </div>

            <div className="text-center">
              <Link
                to="/user/home"
                className="inline-flex items-center px-6 py-3 bg-[#426B1F] text-white rounded-lg hover:bg-green-900"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/user/home" className="flex items-center">
              <img src={Logo || "/placeholder.svg"} alt="KhanaBox" className="h-10 w-10 mr-2" />
              <span className="text-3xl font-bold text-green-600">KhanaBox</span>
            </Link>

            {/* Checkout Steps */}
            <div className="hidden md:flex items-center space-x-2">
              <div
                className={`flex items-center ${checkoutStep === "cart" ? "text-green-600 font-medium" : "text-gray-500"}`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${checkoutStep === "cart" ? "bg-green-600 text-white" : "bg-gray-200"}`}
                >
                  1
                </span>
                Cart
              </div>
              <div className="w-8 h-px bg-gray-300"></div>
              <div
                className={`flex items-center ${checkoutStep === "shipping" ? "text-green-600 font-medium" : "text-gray-500"}`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${checkoutStep === "shipping" ? "bg-green-600 text-white" : "bg-gray-200"}`}
                >
                  2
                </span>
                Shipping
              </div>
              <div className="w-8 h-px bg-gray-300"></div>
              <div
                className={`flex items-center ${checkoutStep === "payment" ? "text-green-600 font-medium" : "text-gray-500"}`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${checkoutStep === "payment" ? "bg-green-600 text-white" : "bg-gray-200"}`}
                >
                  3
                </span>
                Payment
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link to="/user/home" className="text-gray-600 hover:text-green-600">
                <FiArrowLeft className="inline mr-1" /> Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {checkoutStep === "cart" && (
              <>
                <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

                {/* Cart Items */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                  <div className="p-6">
                    {cartItems.map((item) => (
                      <div
                        key={item.productId}
                        className="flex flex-col sm:flex-row items-center py-4 border-b last:border-b-0"
                      >
                        <div className="sm:w-24 w-full mb-4 sm:mb-0 sm:mr-6">
                          <img
                            src={item.img || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-24 object-cover rounded"
                          />
                        </div>

                        <div className="flex-1">
                          <h3 className="font-medium text-lg">{item.name}</h3>
                          <p className="text-gray-600 text-sm mb-2">Unit Price: ${item.price}</p>

                          <div className="flex flex-wrap items-center justify-between mt-2">
                            <div className="flex items-center border rounded-md overflow-hidden">
                              <button
                                onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                                className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                              >
                                <FiMinus size={14} />
                              </button>
                              <span className="px-4 py-1">{item.quantity}</span>
                              <button
                                onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                                className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                              >
                                <FiPlus size={14} />
                              </button>
                            </div>

                            <div className="flex items-center mt-2 sm:mt-0">
                              <span className="font-semibold mr-4">
                                ${(Number.parseFloat(item.price) * item.quantity).toFixed(2)}
                              </span>
                              <button
                                onClick={() => handleRemoveItem(item.productId)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <FiTrash2 size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {checkoutStep === "shipping" && (
              <>
                <h1 className="text-2xl font-bold mb-6">Shipping Information</h1>

                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                  <form onSubmit={handleProceedToPayment} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                            State
                          </label>
                          <input
                            type="text"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                            ZIP Code
                          </label>
                          <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-between">
                      <button
                        type="button"
                        onClick={() => setCheckoutStep("cart")}
                        className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      >
                        Back to Cart
                      </button>

                      <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                        Continue to Payment
                      </button>
                    </div>
                  </form>
                </div>
              </>
            )}

            {checkoutStep === "payment" && (
              <>
                <h1 className="text-2xl font-bold mb-6">Payment Information</h1>

                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                  <form onSubmit={handleCompleteOrder} className="p-6">
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-4">Shipping Address</h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p>
                          {formData.firstName} {formData.lastName}
                        </p>
                        <p>{formData.address}</p>
                        <p>
                          {formData.city}, {formData.state} {formData.zipCode}
                        </p>
                        <p>{formData.email}</p>
                        <p>{formData.phone}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-4">Payment Method</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                            Name on Card
                          </label>
                          <input
                            type="text"
                            id="cardName"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Card Number
                          </label>
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            required
                            placeholder="XXXX XXXX XXXX XXXX"
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label htmlFor="expDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Expiration Date
                          </label>
                          <input
                            type="text"
                            id="expDate"
                            name="expDate"
                            value={formData.expDate}
                            onChange={handleInputChange}
                            required
                            placeholder="MM/YY"
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                            CVV
                          </label>
                          <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            required
                            placeholder="XXX"
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-between">
                      <button
                        type="button"
                        onClick={() => setCheckoutStep("shipping")}
                        className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      >
                        Back to Shipping
                      </button>

                      <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                        Complete Order
                      </button>
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
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
                    onClick={handleProceedToCheckout}
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
          </div>
        </div>
      </div>
    </div>
  )
}

