
import { useState, useRef, useEffect } from "react"
import { useSearch } from "../api/search"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { IoSearchOutline } from "react-icons/io5"
import { useStoreItem } from "../../cart/api/addItems"

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCookId, setSelectedCookId] = useState(null)
  const [loadingCartItem, setLoadingCartItem] = useState(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const navigate = useNavigate()
  const searchRef = useRef(null)

  // Use our cart mutation hook
  const { mutateAsync: addToCart, isLoading: isAddingToCart } = useStoreItem()

  // Search query using the provided hook
  const {
    data: searchResults,
    isLoading,
    error,
  } = useSearch({
    query: searchTerm,
    queryConfig: { enabled: searchTerm.length > 0 },
  })

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value)
    setShowDropdown(e.target.value.length > 0)
  }

  const handleCookClick = (cookId) => {
    setSelectedCookId(cookId)
    setShowDropdown(false)
    navigate(`/cook/${cookId}`)
  }

  const handleAddToCart = async (dish) => {
    try {
      setLoadingCartItem(dish.menu_item_id)

      // Use our addToCart mutation
      await addToCart({
        menu_item_id: dish.menu_item_id,
        quantity: 1,
      })

      toast.success(`${dish.name} added to cart! 🛒`, {
        position: "top-right",
      })
    } catch (error) {
      toast.error("Failed to add item to cart. Try again!", {
        position: "top-right",
      })
      console.error("Error adding to cart:", error)
    } finally {
      setLoadingCartItem(null)
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative p-6" ref={searchRef}>
      {/* Search Input */}
      <div className="flex rounded-full border border-slate-300 lg:shadow-lg w-full">
        <div className="ml-4 flex items-center">
          <IoSearchOutline className="text-gray-500" />
        </div>
        <input
          type="text"
          placeholder="Search for dishes..."
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full sm:w-96 md:w-[500px] lg:w-[600px] xl:w-[700px] p-3 text-lg focus:outline-none transition-all duration-200 rounded-full"
          aria-label="Search for dishes"
        />
      </div>

      {/* Search Results Popup */}
      {showDropdown && (
        <div className="absolute left-0 mt-2 w-full max-w-2xl bg-white shadow-lg rounded-lg p-4 z-50">
          {isLoading && (
            <div className="flex justify-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 text-red-500 rounded-md">
              <p>Error: {error.message}</p>
            </div>
          )}

          {!isLoading && !error && searchResults?.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              <p>No results found for "{searchTerm}"</p>
            </div>
          )}

          {searchResults?.length > 0 && (
            <div className="max-h-80 overflow-y-auto">
              {searchResults.map((dish) => (
                <div
                  key={dish.menu_item_id}
                  className="p-3 border-b hover:bg-gray-100 transition flex items-center justify-between"
                >
                  {/* Dish Info */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={dish.image_url || "/placeholder.svg?height=64&width=64"}
                      alt={dish.name}
                      className="w-16 h-16 rounded-md object-cover"
                      onError={(e) => {
                        e.target.src = "/placeholder.svg?height=64&width=64"
                      }}
                    />
                    <div>
                      <h2 className="text-lg font-semibold">{dish.name}</h2>
                      <p className="text-gray-600">
                        Cook:{" "}
                        <button
                          className="font-medium text-blue-500 hover:underline cursor-pointer"
                          onClick={() => handleCookClick(dish.cook_id)}
                        >
                          {dish.cook_name}
                        </button>
                      </p>
                      <p className="text-gray-800 font-bold">Rs. {dish.price}</p>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    className="bg-green-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-green-700 transition disabled:opacity-50"
                    onClick={() => handleAddToCart(dish)}
                    disabled={loadingCartItem === dish.menu_item_id}
                    aria-label={`Add ${dish.name} to cart`}
                  >
                    {loadingCartItem === dish.menu_item_id ? "Adding..." : "Add to Cart 🛒"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

