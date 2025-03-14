// import { useState, useEffect } from "react"
// import { Link, useNavigate, useLocation } from "react-router-dom"
// import { FiArrowLeft, FiUser, FiShoppingBag, FiHeart, FiSettings, FiLogOut } from "react-icons/fi"
// import { Header } from "./Header"

// export const ProfilePage = () => {
//   const navigate = useNavigate()
//   const location = useLocation()
//   const [activeTab, setActiveTab] = useState("profile")
//   const [isMobile, setIsMobile] = useState(false)
//   const [showMobileMenu, setShowMobileMenu] = useState(false)

//   useEffect(() => {
//     const checkIfMobile = () => {
//       setIsMobile(window.innerWidth < 768)
//     }

//     checkIfMobile()
//     window.addEventListener("resize", checkIfMobile)

//     return () => {
//       window.removeEventListener("resize", checkIfMobile)
//     }
//   }, [])

//   useEffect(() => {
//     const path = location.pathname.split("/").pop()
//     if (path === "profile" || path === "") {
//       setActiveTab("profile")
//     } else if (path === "orders") {
//       setActiveTab("orders")
//     } else if (path === "wishlist") {
//       setActiveTab("wishlist")
//     } else if (path === "settings") {
//       setActiveTab("settings")
//     }
//   }, [location])

//   const navItems = [
//     { id: "profile", label: "Your Profile", icon: <FiUser />, path: "/user/profile" },
//     { id: "orders", label: "Your Orders", icon: <FiShoppingBag />, path: "/user/orders" },
//     { id: "wishlist", label: "Wishlist", icon: <FiHeart />, path: "/user/favourite" },
//     { id: "settings", label: "Settings", icon: <FiSettings />, path: "/user/setting" },
//   ]

//   const handleLogout = () => {
//     navigate("/")
//   }

//   const renderContent = () => {
//     switch (activeTab) {
//       case "profile":
//         return <ProfileContent />
//       case "orders":
//         return <OrdersContent />
//       case "wishlist":
//         return <WishlistContent />
//       case "settings":
//         return <SettingsContent />
//       default:
//         return <ProfileContent />
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />

//       <main className="container mx-auto px-4 py-6">
//         {/* <div className="mb-6">
//           <Link to="/user/dashboard" className="inline-flex items-center text-gray-600 hover:text-green-600 transition-colors">
//             <FiArrowLeft className="mr-2" />
//             Back to Home
//           </Link>
//         </div> */}

//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           {isMobile && (
//             <div className="p-4 border-b">
//               <button
//                 onClick={() => setShowMobileMenu(!showMobileMenu)}
//                 className="flex items-center justify-between w-full"
//               >
//                 <span className="font-medium">
//                   {navItems.find((item) => item.id === activeTab)?.label || "Your Profile"}
//                 </span>
//                 <svg
//                   className={`w-5 h-5 transition-transform ${showMobileMenu ? "transform rotate-180" : ""}`}
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                 </svg>
//               </button>
//             </div>
//           )}

//           <div className="flex flex-col md:flex-row">
//             <div className={`md:w-64 bg-white border-r ${isMobile ? (showMobileMenu ? "block" : "hidden") : "block"}`}>
//               <div className="p-6 border-b">
//                 <div className="flex items-center">
//                   <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
//                     <FiUser className="text-gray-500 text-xl" />
//                   </div>
//                   <div className="ml-3">
//                     <h3 className="font-medium">John Doe</h3>
//                     <p className="text-sm text-gray-500">john.doe@example.com</p>
//                   </div>
//                 </div>
//               </div>

//               <nav className="p-4">
//                 <ul className="space-y-1">
//                   {navItems.map((item) => (
//                     <li key={item.id}>
//                       <Link
//                         to={item.path}
//                         className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
//                           activeTab === item.id ? "bg-green-50 text-green-600" : "text-gray-700 hover:bg-gray-100"
//                         }`}
//                         onClick={() => {
//                           setActiveTab(item.id)
//                           if (isMobile) setShowMobileMenu(false)
//                         }}
//                       >
//                         <span className="mr-3">{item.icon}</span>
//                         {item.label}
//                       </Link>
//                     </li>
//                   ))}
//                   <li>
//                     <button
//                       onClick={handleLogout}
//                       className="flex items-center w-full px-4 py-3 rounded-lg text-red-600 hover:bg-gray-100 transition-colors"
//                     >
//                       <FiLogOut className="mr-3" />
//                       Sign out
//                     </button>
//                   </li>
//                 </ul>
//               </nav>
//             </div>

//             <div className="flex-1 p-6">{renderContent()}</div>
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }

//  const ProfileContent = () => {
//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-6">Your Profile</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="bg-gray-50 p-6 rounded-lg">
//           <h3 className="text-lg font-medium mb-4">Personal Information</h3>

//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//               <input
//                 type="text"
//                 defaultValue="John Doe"
//                 className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//               <input
//                 type="email"
//                 defaultValue="john.doe@example.com"
//                 className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//               <input
//                 type="tel"
//                 defaultValue="+44 123 456 7890"
//                 className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//               />
//             </div>
//           </div>

//           <button className="mt-6 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
//             Save Changes
//           </button>
//         </div>

//         <div className="bg-gray-50 p-6 rounded-lg">
//           <h3 className="text-lg font-medium mb-4">Address Information</h3>

//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
//               <input
//                 type="text"
//                 defaultValue="123 Main Street"
//                 className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
//               <input
//                 type="text"
//                 defaultValue="Apt 4B"
//                 className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//               />
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
//                 <input
//                   type="text"
//                   defaultValue="London"
//                   className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
//                 <input
//                   type="text"
//                   defaultValue="SW1A 1AA"
//                   className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 />
//               </div>
//             </div>
//           </div>

//           <button className="mt-6 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
//             Save Address
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

//  const OrdersContent = () => {
//   const orders = [
//     {
//       id: "ORD-12345",
//       date: "March 10, 2025",
//       total: "$45.97",
//       status: "Delivered",
//       items: [
//         { name: "Cheese Burger", quantity: 2, price: "$23.76" },
//         { name: "Crispy Sandwich", quantity: 1, price: "$13.99" },
//       ],
//     },
//     {
//       id: "ORD-12344",
//       date: "March 5, 2025",
//       total: "$32.98",
//       status: "Delivered",
//       items: [
//         { name: "Veggie Bowl", quantity: 1, price: "$10.99" },
//         { name: "Pancake", quantity: 1, price: "$11.99" },
//       ],
//     },
//     {
//       id: "ORD-12343",
//       date: "February 28, 2025",
//       total: "$15.99",
//       status: "Delivered",
//       items: [{ name: "Steak Sandwich", quantity: 1, price: "$15.99" }],
//     },
//   ]

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-6">Your Orders</h2>

//       {orders.length > 0 ? (
//         <div className="space-y-6">
//           {orders.map((order) => (
//             <div key={order.id} className="bg-gray-50 rounded-lg overflow-hidden">
//               <div className="bg-gray-100 p-4 flex flex-wrap justify-between items-center">
//                 <div>
//                   <span className="text-sm text-gray-500">Order ID:</span>
//                   <span className="ml-2 font-medium">{order.id}</span>
//                 </div>
//                 <div>
//                   <span className="text-sm text-gray-500">Date:</span>
//                   <span className="ml-2">{order.date}</span>
//                 </div>
//                 <div>
//                   <span className="text-sm text-gray-500">Total:</span>
//                   <span className="ml-2 font-medium">{order.total}</span>
//                 </div>
//                 <div>
//                   <span
//                     className={`px-3 py-1 rounded-full text-sm ${
//                       order.status === "Delivered"
//                         ? "bg-green-100 text-green-800"
//                         : order.status === "Processing"
//                           ? "bg-blue-100 text-blue-800"
//                           : "bg-yellow-100 text-yellow-800"
//                     }`}
//                   >
//                     {order.status}
//                   </span>
//                 </div>
//               </div>

//               <div className="p-4">
//                 <h3 className="font-medium mb-3">Order Items</h3>
//                 <div className="space-y-2">
//                   {order.items.map((item, index) => (
//                     <div key={index} className="flex justify-between py-2 border-b last:border-b-0">
//                       <div>
//                         <span className="font-medium">{item.name}</span>
//                         <span className="text-gray-500 ml-2">x{item.quantity}</span>
//                       </div>
//                       <span>{item.price}</span>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="mt-4 flex justify-end">
//                   <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
//                     Order Again
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center py-12 bg-gray-50 rounded-lg">
//           <FiShoppingBag className="mx-auto text-gray-300 text-5xl mb-4" />
//           <h3 className="text-xl font-medium mb-2">No orders yet</h3>
//           <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
//           <Link to="/" className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
//             Browse Menu
//           </Link>
//         </div>
//       )}
//     </div>
//   )
// }

//  const WishlistContent = () => {
//   const wishlistItems = [
//     {
//       id: 1,
//       name: "Cheese Burger",
//       price: "$11.88",
//       img: "/placeholder.svg?height=200&width=300",
//       cook: "Ram Singh",
//     },
//     {
//       id: 3,
//       name: "Crispy Sandwich",
//       price: "$13.99",
//       img: "/placeholder.svg?height=200&width=300",
//       cook: "Arpita Thapa",
//     },
//   ]

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-6">Your Wishlist</h2>

//       {wishlistItems.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {wishlistItems.map((item) => (
//             <div
//               key={item.id}
//               className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
//             >
//               <div className="relative h-48">
//                 <img src={item.img || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
//                 <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md text-red-500">
//                   <FiHeart className="fill-current" />
//                 </button>
//               </div>

//               <div className="p-4">
//                 <h3 className="font-bold text-lg mb-1">{item.name}</h3>
//                 <p className="text-gray-600 text-sm mb-3">By {item.cook}</p>

//                 <div className="flex justify-between items-center">
//                   <span className="text-xl font-bold">{item.price}</span>
//                   <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center py-12 bg-gray-50 rounded-lg">
//           <FiHeart className="mx-auto text-gray-300 text-5xl mb-4" />
//           <h3 className="text-xl font-medium mb-2">Your wishlist is empty</h3>
//           <p className="text-gray-600 mb-6">Save your favorite items to your wishlist.</p>
//           <Link to="/" className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
//             Browse Menu
//           </Link>
//         </div>
//       )}
//     </div>
//   )
// }

// const SettingsContent = () => {
//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-6">Settings</h2>

//       <div className="space-y-8">
//         <div className="bg-gray-50 p-6 rounded-lg">
//           <h3 className="text-lg font-medium mb-4">Account Settings</h3>

//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h4 className="font-medium">Email Notifications</h4>
//                 <p className="text-sm text-gray-600">Receive order updates and promotions</p>
//               </div>
//               <label className="relative inline-flex items-center cursor-pointer">
//                 <input type="checkbox" className="sr-only peer" defaultChecked />
//                 <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
//               </label>
//             </div>

//             <div className="flex items-center justify-between">
//               <div>
//                 <h4 className="font-medium">SMS Notifications</h4>
//                 <p className="text-sm text-gray-600">Receive order updates via text message</p>
//               </div>
//               <label className="relative inline-flex items-center cursor-pointer">
//                 <input type="checkbox" className="sr-only peer" />
//                 <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
//               </label>
//             </div>
//           </div>
//         </div>

//         <div className="bg-gray-50 p-6 rounded-lg">
//           <h3 className="text-lg font-medium mb-4">Change Password</h3>

//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
//               <input
//                 type="password"
//                 className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
//               <input
//                 type="password"
//                 className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
//               <input
//                 type="password"
//                 className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//               />
//             </div>
//           </div>

//           <button className="mt-6 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
//             Update Password
//           </button>
//         </div>

//         <div className="bg-gray-50 p-6 rounded-lg">
//           <h3 className="text-lg font-medium mb-4">Privacy Settings</h3>

//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h4 className="font-medium">Share Order History</h4>
//                 <p className="text-sm text-gray-600">Allow KhanaBox to use your order history for recommendations</p>
//               </div>
//               <label className="relative inline-flex items-center cursor-pointer">
//                 <input type="checkbox" className="sr-only peer" defaultChecked />
//                 <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
//               </label>
//             </div>

//             <div className="flex items-center justify-between">
//               <div>
//                 <h4 className="font-medium">Location Services</h4>
//                 <p className="text-sm text-gray-600">Allow KhanaBox to access your location</p>
//               </div>
//               <label className="relative inline-flex items-center cursor-pointer">
//                 <input type="checkbox" className="sr-only peer" defaultChecked />
//                 <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
//               </label>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

