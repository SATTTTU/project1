import { FiHeart } from "react-icons/fi";

const WishlistItem = ({ item }) => {
  return (
    <div className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-48">
        <img src={item.img || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
        <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md text-red-500">
          <FiHeart className="fill-current" />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{item.name}</h3>
        <p className="text-gray-600 text-sm mb-3">By {item.cook}</p>

        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">{item.price}</span>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;