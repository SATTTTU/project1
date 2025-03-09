"use client"

import { Bell, Heart, MapPin, ShoppingBag, User } from "lucide-react"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { use, useState } from "react"

export const Layout=()=> {
  const location = useLocation()
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "indralimbu324@gmail.com",
  })

  // Check if the current path matches the link path
  const isActive = (path) => {
    return location.pathname === path
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const handleSave = () => {
    console.log("Saving user data:", userData)
  }
  return (
    <div className="min-h-screen flex flex-col bg-white">
 

      <div className="border-b py-4 px-6 flex justify-between items-center">
        <h1 className="text-3xl text-gray-700 font-normal">Account Settings</h1>
        <button className="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded font-medium">Logout</button>
      </div>

      <div className="flex flex-1">
        <div className="w-64 border-r p-6 space-y-6">
          <Link
            to="/user/profileEdit"
            className={`flex items-center gap-2 font-medium ${isActive("/user/profileEdit") ? "text-red-600" : "text-gray-600 hover:text-red-600"}`}
          >
            <User size={20} className={isActive("/profile") ? "text-red-600" : "text-gray-600"} />
            <span>My Profile</span>
          </Link>
          <Link
            to="order"
            className={`flex items-center gap-2 font-medium ${isActive("/order-history") ? "text-red-600" : "text-gray-600 hover:text-red-600"}`}
          >
            <ShoppingBag size={20} className={isActive("/order-history") ? "text-red-600" : "text-gray-600"} />
            <span>Order History</span>
          </Link>
          <Link
            to="/favorites"
            className={`flex items-center gap-2 font-medium ${isActive("/favorites") ? "text-red-600" : "text-gray-600 hover:text-red-600"}`}
          >
            <Heart size={20} className={isActive("/favorites") ? "text-red-600" : "text-gray-600"} />
            <span>Favourites</span>
          </Link>
          <Link
            to="/saved-addresses"
            className={`flex items-center gap-2 font-medium ${isActive("/saved-addresses") ? "text-red-600" : "text-gray-600 hover:text-red-600"}`}
          >
            <MapPin size={20} className={isActive("/saved-addresses") ? "text-red-600" : "text-gray-600"} />
            <span>Saved Addresses</span>
          </Link>
        </div>

       
        <div className="flex-1 p-6">
          <div className="max-w-3xl">
            <div className="mb-8">
              <h2 className="text-sm text-gray-500 uppercase mb-4">Profile Picture</h2>
              <div className="w-32 h-32 rounded-full overflow-hidden bg-amber-100">
                <img
                  src=""
                  alt="Profile picture"
                  width={128}
                  height={128}
                  className="w-full h-full text-center object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm text-gray-500 uppercase mb-2">
                  Firstname
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded focus:outline-none focus:ring-1 focus:ring-yellow-400"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm text-gray-500 uppercase mb-2">
                  Lastname
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded focus:outline-none focus:ring-1 focus:ring-yellow-400"
                />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm text-gray-500 uppercase mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={userData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded focus:outline-none focus:ring-1 focus:ring-yellow-400"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-gray-500 uppercase mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded focus:outline-none focus:ring-1 focus:ring-yellow-400 bg-gray-100"
                />
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button onClick={handleSave} className="bg-[#426B1F] text-white px-8 py-3 rounded font-medium">
                Save
              </button>
              <button onClick={()=>navigate("/user/home")} className="bg-gray-400 text-white hover:bg-gray-500 px-8 py-3 rounded font-medium ">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

