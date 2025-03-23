
export const DishCard = ({ dish, onAddToCart }) => {
  
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img src={dish.img || "/placeholder.svg"} alt={dish.name} className="w-full h-48 object-cover" />
  
        <div className="p-4">
          <h3 className="font-bold text-lg">{dish.name}</h3>
          <p className="text-gray-600 text-sm mt-1">{dish.description}</p>
  
          <div className="flex justify-between items-center mt-4">
            <span className="text-lg font-bold">${dish.price}</span>
            <button
              onClick={() => onAddToCart(dish)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    )
  }