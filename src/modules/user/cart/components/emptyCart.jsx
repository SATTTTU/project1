import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Logo from "../../../../assets/logo.jpg";

export const EmptyCart = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center">
              <img src={Logo} alt="KhanaBox" className="h-10 w-10 mr-2" />
              <span className="text-3xl font-bold text-green-600">KhajaBox</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <AiOutlineShoppingCart className="mx-auto text-gray-300 text-8xl mb-6" />
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Link
            to="/dashboard"
            className="inline-flex items-center px-6 py-3 bg-[#426B1F] text-white rounded-lg hover:bg-green-700"
          >
            <FiArrowLeft className="mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};