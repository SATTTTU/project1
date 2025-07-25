import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import Logo from "../../../../assets/unnamed.png";
export const CartHeader = () => {
    return (
      <div className="bg-white shadow-sm sticky top-0">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center">
              <img src={Logo} alt="KhanaBox" className="h-8 w-8 mr-2" />
              <span className="text-3xl font-bold text-[#0e9300]">KhajaBox</span>
            </Link>
  
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="text-[#0e9300] hover:text-green-600">
                <FiArrowLeft className="inline mr-1" /> Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };