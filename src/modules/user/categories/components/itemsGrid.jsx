import { Link } from "react-router-dom";
import { FiStar } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";

const ItemsGrid = ({ items, handleAddToCart, addedToCart }) => {
  return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
			{items.map((item) => (
				<Link
					to={`/details/${item.id}`}
					key={item.id}
					className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
				>
					<div className="relative h-48">
						<img
							src={item.img || "/placeholder.svg"}
							alt={item?.name}
							className="w-full h-full object-cover"
						/>
						<div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full shadow-md flex items-center">
							<FiStar className="text-yellow-500 fill-current mr-1" />
							<span className="font-medium">{item.rating}</span>
						</div>
					</div>

					<div className="p-4">
						<h3 className="font-bold text-lg mb-1">{item?.name}</h3>
						<p className="text-gray-600 text-sm mb-3">By {item.cook}</p>

						<div className="flex justify-between items-center">
							<span className="text-xl font-bold">Rs. {item.price}</span>
							<button
								onClick={(e) => {
									e.preventDefault();
									handleAddToCart(item);
								}}
								className={`px-4 py-2 rounded-lg text-white transition-colors ${
									addedToCart === item.id
										? "bg-green-700"
										: "bg-green-600 hover:bg-green-700"
								}`}
							>
								{addedToCart === item.id ? (
									<div className="flex items-center">
										<AiOutlineShoppingCart className="mr-1" />
										Added
									</div>
								) : (
									"Add to Cart"
								)}
							</button>
						</div>
					</div>
				</Link>
			))}
		</div>
	);
};

export default ItemsGrid;