import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { FiArrowLeft, FiFilter, FiStar } from "react-icons/fi"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { Header } from "../Header"
import { useDispatch } from "react-redux"
import { addToCart } from "../../../../../store/cart/cart"
import { toast } from "react-toastify"
import { categoriesData,allFoodItems } from "../../data/Data";

export const CategoryPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const [category, setCategory] = useState(null)
  const [items, setItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 20])
  const [ratingFilter, setRatingFilter] = useState(0)
  const [sortOption, setSortOption] = useState("recommended")
  const [addedToCart, setAddedToCart] = useState(null)

  useEffect(() => {
    const categoryData = categoriesData.find((c) => c.id === Number.parseInt(id))
    if (categoryData) {
      setCategory(categoryData)

      const categoryItems = allFoodItems.filter(
        (item) => item.category.toLowerCase() === categoryData.name.toLowerCase(),
      )
      setItems(categoryItems)
      setFilteredItems(categoryItems)
    }

    window.scrollTo(0, 0)
  }, [id])

  useEffect(() => {
    if (!items.length) return

    let result = [...items]

    result = result.filter((item) => {
      const price = Number.parseFloat(item.price)
      return price >= priceRange[0] && price <= priceRange[1]
    })

    if (ratingFilter > 0) {
      result = result.filter((item) => item.rating >= ratingFilter)
    }

    switch (sortOption) {
      case "price-low-high":
        result.sort((a, b) => Number.parseFloat(a.price) - Number.parseFloat(b.price))
        break
      case "price-high-low":
        result.sort((a, b) => Number.parseFloat(b.price) - Number.parseFloat(a.price))
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }

    setFilteredItems(result)
  }, [items, priceRange, ratingFilter, sortOption])

  useEffect(() => {
    if (addedToCart) {
      const timer = setTimeout(() => {
        setAddedToCart(null)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [addedToCart])

  const handleAddToCart = (item) => {
    dispatch(
      addToCart({
        productId: item.id,
        quantity: 1,
        name: item.name,
        price: item.price,
        img: item.img,
      }),
    )

    setAddedToCart(item.id)

    toast.success(`${item.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 2000,
    })
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-pulse">
            <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <Link to="/user/home" className="inline-flex items-center text-gray-600 hover:text-green-600 transition-colors">
            <FiArrowLeft className="mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Category Header */}
        <div className="relative mb-8">
          <div className="h-64 overflow-hidden rounded-lg">
            <img
              src={category.img || "/placeholder.svg?height=400&width=1000"}
              alt={category.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-center p-6">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{category.name}</h1>
                <p className="text-white max-w-2xl mx-auto">{category.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
          <button
            className="mb-4 md:mb-0 flex items-center px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-50"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <FiFilter className="mr-2" />
            Filter
          </button>

          <div className="flex items-center">
            <span className="mr-2 text-gray-600">Sort by:</span>
            <select
              className="px-4 py-2 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="recommended">Recommended</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {isFilterOpen && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="font-bold text-lg mb-4">Filters</h3>

            <div className="mb-6">
              <h4 className="font-medium mb-2">Price Range</h4>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Rs. {priceRange[0]}</span>
                <span className="text-gray-600">Rs. {priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <h4 className="font-medium mb-2">Minimum Rating</h4>
              <div className="flex items-center space-x-4">
                {[0, 3, 3.5, 4, 4.5].map((rating) => (
                  <button
                    key={rating}
                    className={`flex items-center px-3 py-1 rounded-full ${
                      ratingFilter === rating ? "bg-green-100 text-green-800" : "bg-gray-100"
                    }`}
                    onClick={() => setRatingFilter(rating)}
                  >
                    {rating > 0 ? (
                      <>
                        <FiStar
                          className={`${ratingFilter === rating ? "text-green-600" : "text-gray-500"} mr-1 ${rating === ratingFilter ? "fill-current" : ""}`}
                        />
                        {rating}+
                      </>
                    ) : (
                      "Any"
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredItems.length} {filteredItems.length === 1 ? "item" : "items"} found
          </p>
        </div>

        {/* Food Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredItems.map((item) => (
              <Link
              to="/food"
                key={item.id}

                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <img src={item.img || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full shadow-md flex items-center">
                    <FiStar className="text-yellow-500 fill-current mr-1" />
                    <span className="font-medium">{item.rating}</span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">By {item.cook}</p>

                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">Rs. {item.price}</span>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className={`px-4 py-2 rounded-lg text-white transition-colors ${
                        addedToCart === item.id ? "bg-green-700" : "bg-green-600 hover:bg-green-700"
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
        ) : (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🍽️</div>
            <h3 className="text-xl font-bold mb-2">No items found</h3>
            <p className="text-gray-600">Try adjusting your filters to find what you're looking for.</p>
          </div>
        )}
      </main>
    </div>
  )
}

