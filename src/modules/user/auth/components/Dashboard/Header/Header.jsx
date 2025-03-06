import { FaSearch, FaShoppingCart, FaBell, FaCog } from "react-icons/fa"

export const Header=()=>{
  return (
    <header className="bg-white border-b px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1">
          <h2 className="text-2xl font-semibold">Hello, Patricia</h2>
          <div className="ml-8 flex-1 max-w-xl">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="What do you want eat today..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <FaShoppingCart className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <FaBell className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <FaCog className="w-5 h-5 text-gray-600" />
          </button>
          <img src="/placeholder.svg?height=40&width=40" alt="Profile" className="w-10 h-10 rounded-full border" />
        </div>
      </div>
    </header>
  )
}

