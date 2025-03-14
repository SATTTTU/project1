import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { AiOutlineShoppingCart, AiOutlineUser, AiOutlineLogout, AiOutlineHeart } from "react-icons/ai"
import { FaUserCircle } from "react-icons/fa"
import { CiSettings } from "react-icons/ci"
import { useSelector } from "react-redux"
import Logo from "../../../../assets/logo.jpg"

export const Header = () => {
  const cartItems = useSelector((store) => store.cart.items)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const profileRef = useRef(null)

  const getTotalCartItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleProfileMenu = () => {
        setShowProfileMenu(!showProfileMenu);
    };

    return (
        <div className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    <Link to="/user/dashboard" className="flex items-center">
                        <img src={Logo} alt="KhanaBox" className="h-10 w-10 mr-2" />
                        <span className="text-xl font-bold text-green-600">KhanaBox</span>
                    </Link>

                    <div className="flex items-center space-x-4">
                        <button className="px-4 py-1.5 bg-green-600 text-white rounded-full text-sm hover:bg-green-700 transition-colors">
                            Special Offers
                        </button>
                        <button className="px-4 py-1.5 border border-gray-300 rounded-full text-sm hover:bg-gray-50 transition-colors">
                            Track Order
                        </button>

                        <Link
                            to="/user/cart"
                            className="relative p-1 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <AiOutlineShoppingCart className="text-2xl" />
                            {getTotalCartItems() > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {getTotalCartItems()}
                                </span>
                            )}
                        </Link>

                        <div className="relative" ref={profileRef}>
                            <button
                                onClick={toggleProfileMenu}
                                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <FaUserCircle className="text-2xl text-gray-600" />
                            </button>

                            {showProfileMenu && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                                    <div className="px-4 py-3 border-b">
                                        <p className="text-sm font-medium text-gray-900">
                                            Your Profile
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">
                                            name@example.com
                                        </p>
                                    </div>

                                    <Link
                                        to="/user/profile"
                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <AiOutlineUser className="mr-2 text-gray-500" />
                                        Your Profiles
                                    </Link>

                                    <Link
                                        to="/user/orders"
                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <AiOutlineShoppingCart className="mr-2 text-gray-500" />
                                        Your Orders
                                    </Link>

                                    <Link
                                        to="/user/favourite"
                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <AiOutlineHeart className="mr-2 text-gray-500" />
                                        Wishlist
                                    </Link>

                                    <Link
                                        to="/user/setting"
                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <CiSettings className="mr-2 text-gray-500" />
                                        Settings
                                    </Link>

                                    <div className="border-t my-1"></div>

                                    <Link
                                        to="/logout"
                                        className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                    >
                                        <AiOutlineLogout className="mr-2" />
                                        Sign out
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

