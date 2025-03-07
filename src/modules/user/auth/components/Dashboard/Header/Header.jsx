import { FaSearch, FaShoppingCart, FaBell, FaCog } from "react-icons/fa"
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../../../../../../assets/logo.jpg";
import { Badge } from "../../../../../../components/ui/badge/Badge";


export const Header=()=>{
  return (
       <header className="sticky top-0 z-50 bg-white shadow">
          <div className="container flex items-center justify-between h-20 px-4 mx-auto">
            <Link href="/" className="flex items-center justify-center">
              <div className="relative w-10 h-10">
                <img src={Logo} alt="logo" />
              </div>
              <span className="text-2xl font-bold text-green-500">KhanaBox</span>
            </Link>
   
            <div className="hidden md:flex items-center space-x-4">
              <Link href="#" className="text-sm font-medium text-gray-700">
                Special Offers
              </Link>
              <Link
                href="#"
                className="px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-full"
              >
                Orders
              </Link>
              <Link href="#" className="text-sm font-medium text-gray-700">
                Track Order
              </Link>
            </div>
   
            <div className="flex items-center space-x-4">
              <Link href="/cart" className="relative">
                <AiOutlineShoppingCart className="w-8 h-8 text-gray-700" />
                <Badge className="absolute -top-3 -right-4   text-xs bg-red-500 text-white rounded-full">
                  2
                </Badge>
              </Link>
              <Link href="/profile">
                <div className="w-10 h-10 overflow-hidden  rounded-full">
                  <FaUserCircle className="w-full h-full p-1 text-slate-800" />
                </div>
              </Link>
            </div>
          </div>
        </header>
  )
}

