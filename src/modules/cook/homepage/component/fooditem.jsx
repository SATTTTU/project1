export const FoodItem = ({ item, onToggleAvailability }) => {
  return (
    <div className="rounded-lg bg-white shadow-sm overflow-hidden hover:shadow-md transition-all">
      <div className="relative">
        <img
          src={item.image || "/placeholder-food.jpg"}
          alt={item.name}
          className="h-48 w-full object-cover"
          loading="lazy"
        />
        <span className="absolute top-2 right-2 px-2 py-1 text-xs rounded-full bg-white font-medium">
          ★ {item.popularityRating || 0}
        </span>
        {!item.available && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white text-sm">Unavailable</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={item.available}
              onChange={() => onToggleAvailability?.(item.id)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-[#426B1F] peer-focus:outline-none after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-4 after:h-4 after:bg-white after:border-gray-300 after:border after:rounded-full after:transition-all peer-checked:after:translate-x-4 peer-checked:after:border-white"></div>
          </label>
        </div>

        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
          {item.description || "No description available"}
        </p>
        
        <div className="mt-2 text-xs text-gray-500">{item.orderCount || 0} orders this month</div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold">₹{item.price}</span>
          
        </div>
      </div>
    </div>
  );
};
