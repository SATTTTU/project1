import { useState, useRef, useEffect } from "react"
import { Search, Loader2 } from "lucide-react"
import { useAddCartItem } from "../../cart/api/addItems"
import { useSearch } from "../api/search"
import { FiStar } from "react-icons/fi"
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { useNavigate } from "react-router-dom"

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [loadingCartItem, setLoadingCartItem] = useState(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const searchRef = useRef(null)
  const navigate = useNavigate()

  const { mutateAsync: addToCart } = useAddCartItem()

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

  const handleAddToCart = async (dish) => {
    try {
      setLoadingCartItem(dish.menu_item_id)
      await addToCart({ menu_item_id: dish.menu_item_id, quantity: 1 })
      toast.success(`${dish.name} added to cart!`, { autoClose: 2000 });
    } catch (error) {
      console.error("Error adding to cart:", error)
      toast.error("Failed to add item to cart.", { autoClose: 2000 });
    } finally {
      setLoadingCartItem(null)
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const imageUrl = "https://khajabox-bucket.s3.ap-south-1.amazonaws.com/";

  return (
    <div className="relative p-6" ref={searchRef}>
      <div className="flex rounded-full border border-slate-300 shadow-sm w-full">
        <div className="ml-4 flex items-center">
          <Search className="h-5 w-5 text-gray-500" />
        </div>
        <input
          type="text"
          placeholder="Search for dishes..."
          value={searchTerm}
          onChange={handleInputChange}
          className="w-96 md:w-[400px] lg:w-[500px] xl:w-[600px] p-3 text-lg focus:outline-none transition-all duration-200 rounded-full"
          aria-label="Search for dishes"
        />
      </div>

      {showDropdown && (
        <div className="absolute left-0 mt-2 w-full max-w-2xl bg-white shadow-xl border border-slate-200 rounded-lg p-4 z-50">
          {isLoading && (
            <div className="flex justify-center p-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
                  className="p-3 border-b border-slate-200 hover:bg-gray-100 transition flex items-center justify-between cursor-pointer"
                  onClick={() => navigate(`/food/${dish.menu_item_id}`)}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={`${imageUrl}${dish?.image_url}`}
                      alt={dish.name}
                      className="w-20 h-20 object-cover rounded-lg shadow-md hover:scale-105 transition-transform"
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/food/${dish.menu_item_id}`)
                      }}
                      onError={(e) => {
                        e.target.src = "/placeholder.svg"
                      }}
                    />
                    <div>
                      <h2
                        className="text-lg font-semibold text-blue-700 hover:underline"
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/food/${dish.menu_item_id}`)
                        }}
                      >
                        {dish.name}
                      </h2>
                      <p className="text-gray-600">
                        Cook:{" "}
                        <button
                          className="font-medium text-blue-500 hover:underline cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/cook/${dish.cook_id}`)
                          }}
                        >
                          {dish.cook_name}
                        </button>
                      </p>
                      <p className="text-gray-800 font-bold">Rs. {dish.price}</p>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, index) => (
                          <FiStar
                            key={index}
                            className={`h-5 w-5 ${
                              index < Math.round(dish.average_rating)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    className="bg-[#426B1F] text-white py-2 px-4 rounded-md font-semibold hover:bg-green-700 transition disabled:opacity-50"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAddToCart(dish)
                    }}
                    disabled={loadingCartItem === dish.menu_item_id}
                    aria-label={`Add ${dish.name} to cart`}
                  >
                    {loadingCartItem === dish.menu_item_id ? "Adding..." : "Add to Cart"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={true} />
    </div>
  )
}
