
import { useState } from "react"
import { ArrowRight } from "lucide-react"
import Logo from "../../../../../assets/logo.jpg";


const initialItems = [
  {
    id: 1,
    name: "momo",
    price: 5.99,
    quantity: 1,
    portion: "plate",
    time: 30,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "chowmein",
    price: 12.99,
    quantity: 0.5,
    portion: "plate",
    time: 30,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "fried rice",
    price: 2.99,
    quantity: 5,
    portion: "plate",
    time: 30,
    image: "/placeholder.svg?height=80&width=80",
  },
]

export const Cart=()=> {
  const [cartItems, setCartItems] = useState(initialItems)

  const calculateItemTotal = (item) => {
    return (item.price * item.quantity).toFixed(2)
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
  }

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, quantity: Number.parseFloat(newQuantity) } : item)),
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={Logo} alt="KhanaBox" className="w-8 h-8" />
            <h1 className="text-xl font-semibold text-gray-800">KhanaBox</h1>
          </div>
          <nav className="flex items-center gap-6">
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Track Order
            </a>
       
            <button className="bg-green-700 text-white px-4 py-2 rounded-md">Basket (3)</button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-6">
              Basket <span className="text-gray-500 text-lg">3 items</span>
            </h2>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg p-4 flex gap-4 items-center">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium capitalize">{item.name}</h3>
                    <div className="text-green-700">
                      ${item.price} / {item.portion}
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                          className="w-16 px-2 py-1 border rounded"
                          step={0.5}
                          min={0.5}
                        />
                        <span className="text-gray-500">{item.portion}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {item.time}mins
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${calculateItemTotal(item)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full md:w-80">
            <div className="bg-white rounded-lg p-6 sticky top-4">
              <h3 className="font-medium mb-4">Order summary</h3>
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center mb-2">
                  <span className="capitalize">{item.name}</span>
                  <span>${calculateItemTotal(item)}</span>
                </div>
              ))}
              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between items-center font-medium">
                  <span>Total</span>
                  <span>${calculateTotal()}</span>
                </div>
              </div>
              <button className="w-full bg-green-700 text-white py-2 rounded-md mt-6 flex items-center justify-center gap-2">
                Continue to payment
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Order Time */}
              <div className="mt-8">
                <h3 className="font-medium mb-4">Order Time</h3>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center mb-2">
                    <span className="capitalize">{item.name}</span>
                    <span>{item.time} min</span>
                  </div>
                ))}
                <div className="border-t mt-4 pt-4">
                  <div className="flex justify-between items-center font-medium">
                    <span>Total time</span>
                    <span>30 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

