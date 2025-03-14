import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";

const EmptyWishlistState = () => {
  return (
    <div className="text-center py-12 bg-gray-50 rounded-lg">
      <FiHeart className="mx-auto text-gray-300 text-5xl mb-4" />
      <h3 className="text-xl font-medium mb-2">Your wishlist is empty</h3>
      <p className="text-gray-600 mb-6">Save your favorite items to your wishlist.</p>
      <Link to="/" className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
        Browse Menu
      </Link>
    </div>
  );
};

export default EmptyWishlistState;