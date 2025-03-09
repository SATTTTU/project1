import { Heart } from "lucide-react"

export const Favorites=()=> {
  const favorites = [
    { id: 1, name: "Pizza Palace", cuisine: "Italian, Fast Food", rating: 4.5, deliveryTime: "30-45 min" },
    { id: 2, name: "Burger House", cuisine: "American, Fast Food", rating: 4.2, deliveryTime: "25-40 min" },
    { id: 3, name: "Spice Garden", cuisine: "Indian, Asian", rating: 4.7, deliveryTime: "35-50 min" },
  ]

  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-semibold mb-6">Favorite Restaurants</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((restaurant) => (
          <div key={restaurant.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-40 bg-gray-200 relative">
              <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full">
                <Heart size={20} className="text-red-500 fill-red-500" />
              </button>
            </div>

            <div className="p-4">
              <h3 className="font-medium">{restaurant.name}</h3>
              <p className="text-sm text-gray-500">{restaurant.cuisine}</p>

              <div className="flex justify-between items-center mt-3">
                <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-sm">★ {restaurant.rating}</span>
                <span className="text-sm text-gray-500">{restaurant.deliveryTime}</span>
              </div>

              <button className="w-full mt-4 bg-yellow-400 hover:bg-yellow-500 py-2 rounded text-sm font-medium">
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

