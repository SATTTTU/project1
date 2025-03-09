"use client"

import { Bell, Heart, MapPin, ShoppingBag, User } from "lucide-react"
import { Link, Outlet, useLocation } from "react-router-dom"
import { useState } from "react"

export default function Layout() {
  const location = useLocation()
  const [userData, setUserData] = useState({
    firstName: "endra",
    lastName: "Labung",
    phoneNumber: "9805351234",
    email: "indralimbu324@gmail.com",
  })

  // Check if the current path matches the link path
  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="border-b shadow-sm py-3 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img
              src="/placeholder.svg?height=40&width=40"
              alt="Foodmandu logo"
              width={40}
              height={40}
              className="mr-2"
            />
            <span className="text-2xl font-bold">Foodmandu</span>
          </Link>
        </div>

        <div className="flex-1 max-w-2xl mx-4">
          <div className="flex">
            <input
              type="text"
              placeholder="Restaurant name or cuisine"
              className="w-full px-4 py-2 border rounded-l-md focus:outline-none"
            />
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-r-md font-medium">
              Find Restaurants
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-gray-600 hover:text-gray-900">
            <Bell size={20} />
          </button>
          <button className="text-gray-600 hover:text-gray-900">
            <User size={20} />
          </button>
          <button className="text-gray-600 hover:text-gray-900">
            <ShoppingBag size={20} />
          </button>
        </div>
      </header>

      {/* Account Settings Header */}
      <div className="border-b py-4 px-6 flex justify-between items-center">
        <h1 className="text-3xl text-gray-700 font-normal">Account Settings</h1>
        <button className="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded font-medium">Logout</button>
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 border-r p-6 space-y-6">
          <Link
            to="/user/profile"
            className={`flex items-center gap-2 font-medium ${isActive("/profile") ? "text-red-600" : "text-gray-600 hover:text-red-600"}`}
          >
            <User size={20} className={isActive("/profile") ? "text-red-600" : "text-gray-600"} />
            <span>My Profile</span>
          </Link>
          <Link
            to="/user/order"
            className={`flex items-center gap-2 font-medium ${isActive("/order-history") ? "text-red-600" : "text-gray-600 hover:text-red-600"}`}
          >
            <ShoppingBag size={20} className={isActive("/order-history") ? "text-red-600" : "text-gray-600"} />
            <span>Order History</span>
          </Link>
          <Link
            to="/user/favourite"
            className={`flex items-center gap-2 font-medium ${isActive("/favorites") ? "text-red-600" : "text-gray-600 hover:text-red-600"}`}
          >
            <Heart size={20} className={isActive("/favorites") ? "text-red-600" : "text-gray-600"} />
            <span>Favourites</span>
          </Link>
          <Link
            to="/user/addresses"
            className={`flex items-center gap-2 font-medium ${isActive("/saved-addresses") ? "text-red-600" : "text-gray-600 hover:text-red-600"}`}
          >
            <MapPin size={20} className={isActive("/saved-addresses") ? "text-red-600" : "text-gray-600"} />
            <span>Saved Addresses</span>
          </Link>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6">
          <Outlet context={[userData, setUserData]} />
        </div>
      </div>
    </div>
  )
}

