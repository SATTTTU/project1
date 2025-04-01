import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import Logo from "../../../../assets/logo.jpg";
export const CartHeader = () => {
    return (
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center">
              <img src={Logo} alt="KhanaBox" className="h-10 w-10 mr-2" />
              <span className="text-2xl font-bold text-green-600">KhajaBox</span>
            </Link>
  
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="text-gray-600 hover:text-green-600">
                <FiArrowLeft className="inline mr-1" /> Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };