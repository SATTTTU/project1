
import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { IoMdLogOut } from "react-icons/io"
import { FaUserCircle } from "react-icons/fa"
import { CiSettings } from "react-icons/ci"
import { AiOutlineShoppingCart } from "react-icons/ai"
import Logo from "../../../../assets/logo.jpg"
import { useUserLogout } from "../../auth/api/logout"
import { useProfile } from "../../userprofile/api/getProfile"
import { useUserCart } from "../../cart/api/getItems"
import { SearchBar } from "./searchBar"
import { CartBadge } from "./cartBadge"

export const Header = ({ navigate, popularItems, categories, cooks }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const profileRef = useRef(null)

  const { data: profile, isLoading: isProfileLoading, isError } = useProfile()
  const { mutateAsync: logout, isLoading: isLoggingOut } = useUserLogout()
  const { data: cartItems, isLoading: isCartLoading, refetch: refetchCart } = useUserCart()

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetchCart()
    }, 30000)

    return () => clearInterval(intervalId)
  }, [refetchCart])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu)
  }

  const handleLogout = async () => {
    try {
      await logout()
      localStorage.clear()
      window.location.href = "/login"
    } catch (error) {
      console.error("Logout failed", error)
    }
  }

  return (
    <div className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between ">
          {/* Logo and Navigation */}
          <Link to="/dashboard" className="flex items-center">
            <img src={Logo || "/placeholder.svg"} alt="Khajabox" className="h-10 w-10 mr-2" />
            <span className="text-3xl font-bold text-[#426B1F]">Khajabox</span>
          </Link>

          <div className="hidden lg:block w-full max-w-lg">
            <SearchBar navigate={navigate} popularItems={popularItems} categories={categories} cooks={cooks} />
          </div>

          <div className="flex items-center space-x-4">
            {/* Cart Badge */}
            <CartBadge cartItems={cartItems} isLoading={isCartLoading} />

            {/* Profile Menu */}
            <div className="relative" ref={profileRef}>
              <button onClick={toggleProfileMenu} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <FaUserCircle className="text-3xl text-[#426B1F] cursor-pointer" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-3 z-50 border border-gray-200">
                  <div className="px-6 flex flex-col items-center text-center py-4 border-b border-gray-200">
                    <img
                      src={`https://khajabox-bucket.s3.ap-south-1.amazonaws.com/${profile?.image_url}`}
                      alt="profile"
                      className="rounded-full h-16 w-16 mb-3 border-2 border-gray-300"
                    />
                    {isProfileLoading ? (
                      <p className="text-sm text-gray-500">Loading...</p>
                    ) : isError ? (
                      <p className="text-sm text-red-500">Error loading profile</p>
                    ) : (
                      <>
                        <p className="text-lg font-semibold text-gray-900">{profile.name}</p>
                        <p className="text-sm text-gray-500 truncate">{profile.email}</p>
                      </>
                    )}
                  </div>

                  <div className="flex flex-col py-2">
                    <Link to="/profile" className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-md flex items-center">
                      <FaUserCircle className="mr-3" /> Your Profile
                    </Link>
                    <Link to="/profile/order" className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-md flex items-center">
                      <AiOutlineShoppingCart className="mr-3" /> Your Orders
                    </Link>
                    <Link to="/profile/settings" className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-md flex items-center">
                      <CiSettings className="mr-3" /> Settings
                    </Link>
                  </div>

                  <div className="border-t border-gray-200 my-2"></div>

                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="w-full px-6 py-2 text-red-600 hover:bg-gray-100 flex items-center"
                  >
                    <IoMdLogOut className="mr-3" /> {isLoggingOut ? "Logging out..." : "Sign Out"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile view search bar */}
        <div className="lg:hidden">
          <SearchBar navigate={navigate} popularItems={popularItems} categories={categories} cooks={cooks} />
        </div>
      </div>
    </div>
  )
}
