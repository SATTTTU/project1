// import image from "next/image"
import { Link } from "react-router-dom"
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import Burger from "../../../../../assets/burger.jpg"


export const Homepage=()=> {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white shadow">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto">
          <Link href="/" className="flex items-center">
            <div className="relative w-6 h-6 mr-2">
          {/* Logo  */}
            </div>
            <span className="text-xl font-bold text-green-500">KhanaBox</span>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="#" className="text-sm font-medium text-gray-700">
              Special Offers
            </Link>
            <Link href="#" className="px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-full">
              Orders
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-700">
              Track Order
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <AiOutlineShoppingCart className="w-6 h-6 text-gray-700" />
              {/* <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs bg-red-500 text-white rounded-full">
                2
              </Badge> */}
            </Link>
            <Link href="/profile">
              <div className="w-8 h-8 overflow-hidden  rounded-full">
                <FaUserCircle className="w-full h-full p-1 text-slate-800" />
              </div>
            </Link>
          </div>
        </div>
      </header>

      <main className="container px-4 py-6 mx-auto">
        <section className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Up to -40% deals</h2>
            <div className="relative mt-2 md:mt-0 md:w-72">
              <input
                type="text"
                placeholder="Search from menu..."
                className="pl-10 pr-4 py-2 w-full border rounded-full"
              />
              <CiSearch className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="outline" className="px-3 py-1 rounded-full">
              Vegan
            </Badge>
            <Badge variant="outline" className="px-3 py-1 rounded-full">
              Sushi
            </Badge>
            <Badge variant="outline" className="px-3 py-1 rounded-full text-green-500 border-green-500">
              Pizza & Fast food
            </Badge>
            <Badge variant="outline" className="px-3 py-1 rounded-full">
              Others
            </Badge>
          </div> */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Restaurant Card 1 */}
            <div className="overflow-hidden bg-white rounded-lg shadow-md">
              <div className="relative">
                <image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Chef Burgers"
                  width={400}
                  height={200}
                  className="object-cover w-full h-40"
                />
                <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-xs font-bold rounded">
                  -40%
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                  <span className="text-xs font-medium text-white">BURGERS</span>
                  <h3 className="text-lg font-bold text-white">Chef Burgers</h3>
                  <p className="text-sm text-white">London</p>
                </div>
              </div>
            </div>

            {/* Restaurant Card 2 */}
            <div className="overflow-hidden bg-white rounded-lg shadow-md">
              <div className="relative">
                <image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Grand Al Café"
                  width={400}
                  height={200}
                  className="object-cover w-full h-40"
                />
                <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-xs font-bold rounded">
                  -30%
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                  <span className="text-xs font-medium text-white">CAFÉ</span>
                  <h3 className="text-lg font-bold text-white">Grand Al Café</h3>
                  <p className="text-sm text-white">London</p>
                </div>
              </div>
            </div>

            {/* Restaurant Card 3 */}
            <div className="overflow-hidden bg-white rounded-lg shadow-md">
              <div className="relative">
                <image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Buttered Café"
                  width={400}
                  height={200}
                  className="object-cover w-full h-40"
                />
                <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-xs font-bold rounded">
                  -17%
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                  <span className="text-xs font-medium text-white">CAFÉ</span>
                  <h3 className="text-lg font-bold text-white">Buttered Café</h3>
                  <p className="text-sm text-white">London</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Categories */}
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">Popular Categories 🍔</h2>
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
            {categories.map((category, index) => (
              <Link href="#" key={index} className="flex flex-col items-center">
                <div className="w-16 h-16 mb-2 overflow-hidden bg-gray-100 rounded-full sm:w-20 sm:h-20">
                  <image
                    src={category.image}
                    alt={category.name}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className="text-xs text-center sm:text-sm">{category.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular Cooks */}
        <section className="p-4 mb-8 border border-blue-500 rounded-lg">
          <h2 className="mb-4 text-xl font-bold">Popular Cooks</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {cooks.map((cook, index) => (
              <Link href="#" key={index} className="flex flex-col items-center">
                <div className="w-16 h-16 mb-2 overflow-hidden bg-gray-100 rounded-full sm:w-20 sm:h-20">
                  <image
                    src={cook.image || "/placeholder.svg"}
                    alt={cook.name}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className="text-xs text-center sm:text-sm">{cook.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular Items */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold text-center">Popular Items</h2>
          <div className="relative">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {popularItems.map((item, index) => (
                <div key={index} className="overflow-hidden bg-white rounded-lg shadow-md">
                  <div className="relative">
                    <image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={400}
                      height={200}
                      className="object-cover w-full h-40"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <p className="mb-3 text-lg font-bold">${item.price}</p>
                    <button className="w-full bg-green-600 hover:bg-green-700">Order Now</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button className="absolute left-0 transform -translate-y-1/2 bg-white rounded-full shadow-md top-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 p-1 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="absolute right-0 transform -translate-y-1/2 bg-white rounded-full shadow-md top-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 p-1 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}

// Sample data
const categories = [
  { name: "Burgers & Fast", image:{Burger} },
  { name: "Salads", image: "/placeholder.svg?height=80&width=80" },
  { name: "Pasta & Cousous", image: "/placeholder.svg?height=80&width=80" },
  { name: "Pizza", image: "/placeholder.svg?height=80&width=80" },
  { name: "Breakfast", image: "/placeholder.svg?height=80&width=80" },
  { name: "Soups", image: "/placeholder.svg?height=80&width=80" },
]

const cooks = [
  { name: "Ram Singh", image: "/placeholder.svg?height=80&width=80" },
  { name: "Sushma Singh", image: "/placeholder.svg?height=80&width=80" },
  { name: "Arpita Thapa", image: "/placeholder.svg?height=80&width=80" },
  { name: "Tawas Mom", image: "/placeholder.svg?height=80&width=80" },
  { name: "Rupger Ki", image: "/placeholder.svg?height=80&width=80" },
  { name: "Shaurma I", image: "/placeholder.svg?height=80&width=80" },
]

const popularItems = [
  { name: "Cheese Burger", price: "11.88", image: "/placeholder.svg?height=200&width=400" },
  { name: "Pancake", price: "11.99", image: "/placeholder.svg?height=200&width=400" },
  { name: "Crispy Sandwich", price: "13.99", image: "/placeholder.svg?height=200&width=400" },
]
