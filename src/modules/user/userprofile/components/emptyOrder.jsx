import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";

 export const EmptyOrder = () => {
		return (
			<div className="text-center py-12 bg-gray-50 rounded-lg">
				<FiShoppingBag className="mx-auto text-gray-300 text-5xl mb-4" />
				<h3 className="text-xl font-medium mb-2">No orders yet</h3>
				<p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
				<Link
					to="/"
					className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
				>
					Browse Menu
				</Link>
			</div>
		);
 };
