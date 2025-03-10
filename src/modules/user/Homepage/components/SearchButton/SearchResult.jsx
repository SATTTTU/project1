"use client"

import { useState, useEffect } from "react"
import { useLocation, useNavigate, Link } from "react-router-dom"
import { FiSearch, FiFilter, FiX, FiStar, FiArrowLeft, FiClock } from "react-icons/fi"
import { BiCategory, BiRestaurant } from "react-icons/bi"
import { Header } from "./header"
import { useDispatch } from "react-redux"
import { addToCart } from "../../../../store/cart/cart"
import { toast } from "react-toastify"
import Burger from "../../../../assets/UserImages/burger.jpg"
import Category1 from "../../../../assets/UserImages/Category/Cato1.jpg"
import Cook1 from "../../../../assets/UserImages/cook/cook1.png"
import Cook2 from "../../../../assets/UserImages/cook/cook2.jpeg"
import Cook3 from "../../../../assets/UserImages/cook/cook3.jpeg"
import Cook4 from "../../../../assets/UserImages/cook/cook5.jpeg"

// Sample data for search results
const allFoodItems = [
  {
    id: 1,
    name: "Cheese Burger",
    price: "11.88",
    img: Burger,
    rating: 4.8,
    category: "Burgers & Fast",
    cook: { id: 1, name: "Ram Singh", img: Cook1 },
    preparationTime: "15-20 min",
    description:
      "Our signature cheese burger features a juicy beef patty, melted cheddar cheese, fresh lettuce, tomato, and our special sauce, all served on a toasted brioche bun.",
  },
  {
    id: 2,
    name: "Pancake",
    price: "11.99",
    img: Burger,
    rating: 4.7,
    category: "Breakfast",
    cook: { id: 2, name: "Sushma Singh", img: Cook2 },
    preparationTime: "10-15 min",
    description:
      "Fluffy pancakes served with maple syrup, fresh berries, and a dusting of powdered sugar. Perfect for a sweet breakfast treat.",
  },
  {
    id: 3,
    name: "Crispy Sandwich",
    price: "13.99",
    img: Burger,
    rating: 4.6,
    category: "Burgers & Fast",
    cook: { id: 3, name: "Arpita Thapa", img: Cook3 },
    preparationTime: "15-20 min",
    description:
      "A crispy chicken sandwich with fresh lettuce, tomato, pickles, and our homemade mayo, all served on a toasted artisan roll.",
  },
  {
    id: 4,
    name: "Chicken Wrap",
    price: "12.99",
    img: Burger,
    rating: 4.5,
    category: "Burgers & Fast",
    cook: { id: 4, name: "Tawas Mom", img: Cook4 },
    preparationTime: "10-15 min",
    description:
      "Grilled chicken, fresh vegetables, and creamy sauce wrapped in a soft tortilla. A perfect on-the-go meal that's both healthy and delicious.",
  },
  {
    id: 5,
    name: "Veggie Bowl",
    price: "10.99",
    img: Burger,
    rating: 4.7,
    category: "Salads",
    cook: { id: 5, name: "Rupger Ki", img: Cook1 },
    preparationTime: "15-20 min",
    description:
      "A nutritious bowl filled with quinoa, roasted vegetables, avocado, and a tangy dressing. Perfect for a healthy and satisfying meal.",
  },
  {
    id: 6,
    name: "Steak Sandwich",
    price: "15.99",
    img: Burger,
    rating: 4.9,
    category: "Burgers & Fast",
    cook: { id: 1, name: "Ram Singh", img: Cook1 },
    preparationTime: "20-25 min",
    description:
      "Tender slices of grilled steak with caramelized onions, melted cheese, and horseradish sauce on a toasted ciabatta roll. A gourmet sandwich experience.",
  },
  {
    id: 7,
    name: "Vegetable Biryani",
    price: "14.50",
    img: Burger,
    rating: 4.6,
    category: "Indian",
    cook: { id: 2, name: "Sushma Singh", img: Cook2 },
    preparationTime: "25-30 min",
    description:
      "Fragrant basmati rice cooked with mixed vegetables, aromatic spices, and herbs. Served with raita and papadum.",
  },
  {
    id: 8,
    name: "Margherita Pizza",
    price: "13.99",
    img: Burger,
    rating: 4.8,
    category: "Pizza",
    cook: { id: 3, name: "Arpita Thapa", img: Cook3 },
    preparationTime: "20-25 min",
    description:
      "Classic pizza with tomato sauce, fresh mozzarella, basil leaves, and a drizzle of olive oil on a thin, crispy crust.",
  },
  {
    id: 9,
    name: "Caesar Salad",
    price: "9.99",
    img: Burger,
    rating: 4.5,
    category: "Salads",
    cook: { id: 4, name: "Tawas Mom", img: Cook4 },
    preparationTime: "10-15 min",
    description:
      "Crisp romaine lettuce, garlic croutons, parmesan cheese, and our homemade Caesar dressing. Add grilled chicken for an extra charge.",
  },
  {
    id: 10,
    name: "Chocolate Brownie",
    price: "6.99",
    img: Burger,
    rating: 4.9,
    category: "Desserts",
    cook: { id: 5, name: "Rupger Ki", img: Cook1 },
    preparationTime: "5-10 min",
    description: "Rich, fudgy chocolate brownie served warm with vanilla ice cream and chocolate sauce.",
  },
]

const categories = [
  { id: 1, name: "Burgers & Fast", img: Category1, count: 4 },
  { id: 2, name: "Salads", img: Category1, count: 2 },
  { id: 3, name: "Pasta & Cousous", img: Category1, count: 0 },
  { id: 4, name: "Pizza", img: Category1, count: 1 },
  { id: 5, name: "Breakfast", img: Category1, count: 1 },
  { id: 6, name: "Soups", img: Category1, count: 0 },
  { id: 7, name: "Indian", img: Category1, count: 1 },
  { id: 8, name: "Desserts", img: Category1, count: 1 },
]

const cooks = [
  { id: 1, name: "Ram Singh", img: Cook1, count: 2 },
  { id: 2, name: "Sushma Singh", img: Cook2, count: 2 },
  { id: 3, name: "Arpita Thapa", img: Cook3, count: 2 },
  { id: 4, name: "Tawas Mom", img: Cook4, count: 2 },
  { id: 5, name: "Rupger Ki", img: Cook1, count: 2 },
]

export const SearchResults = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Get search query from URL
  const searchParams = new URLSearchParams(location.search)
  const initialQuery = searchParams.get("q") || ""

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [searchResults, setSearchResults] = useState({
    foodItems: [],
    categories: [],
    cooks: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    priceRange: [0, 20],
    rating: 0,
    categories: [],
  })
  const [sortOption, setSortOption] = useState("relevance")
  const [addedToCart, setAddedToCart] = useState(null)

  // Perform search when query changes
  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery])

  // Reset animation state after timeout
  useEffect(() => {
    if (addedToCart) {
      const timer = setTimeout(() => {
        setAddedToCart(null)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [addedToCart])

  const performSearch = (query) => {
    setIsLoading(true)

    // Simulate API call with setTimeout
    setTimeout(() => {
      const lowerCaseQuery = query.toLowerCase()

      // Search food items
      const filteredFoodItems = allFoodItems.filter(
        (item) =>
          item.name.toLowerCase().includes(lowerCaseQuery) ||
          item.category.toLowerCase().includes(lowerCaseQuery) ||
          item.description.toLowerCase().includes(lowerCaseQuery),
      )

      // Search categories
      const filteredCategories = categories.filter((category) => category.name.toLowerCase().includes(lowerCaseQuery))

      // Search cooks
      const filteredCooks = cooks.filter((cook) => cook.name.toLowerCase().includes(lowerCaseQuery))

      setSearchResults({
        foodItems: filteredFoodItems,
        categories: filteredCategories,
        cooks: filteredCooks,
      })

      setIsLoading(false)
    }, 500)
  }

  const handleSearch = (e) => {
    e.preventDefault()

    // Update URL with search query
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    performSearch(searchQuery)
  }

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

  const applyFilters = (items) => {
    if (!items.length) return []

    let result = [...items]

    // Apply price filter
    result = result.filter((item) => {
      const price = Number.parseFloat(item.price)
      return price >= filters.priceRange[0] && price <= filters.priceRange[1]
    })

    // Apply rating filter
    if (filters.rating > 0) {
      result = result.filter((item) => item.rating >= filters.rating)
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      result = result.filter((item) => filters.categories.includes(item.category))
    }

    // Apply sorting
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
        // For "relevance" we keep the original order
        break
    }

    return result
  }

  const handleCategoryFilter = (category) => {
    setFilters((prev) => {
      const newCategories = prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category]

      return {
        ...prev,
        categories: newCategories,
      }
    })
  }

  const handleRatingFilter = (rating) => {
    setFilters((prev) => ({
      ...prev,
      rating: prev.rating === rating ? 0 : rating,
    }))
  }

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 20],
      rating: 0,
      categories: [],
    })
    setSortOption("relevance")
  }

  const filteredFoodItems = applyFilters(searchResults.foodItems)

  const getTotalResults = () => {
    return searchResults.foodItems.length + searchResults.categories.length + searchResults.cooks.length
  }

  const getActiveTabResults = () => {
    switch (activeTab) {
      case "food":
        return filteredFoodItems.length
      case "categories":
        return searchResults.categories.length
      case "cooks":
        return searchResults.cooks.length
      default:
        return getTotalResults()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-6">
        {/* Back button */}
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-green-600 transition-colors">
            <FiArrowLeft className="mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Search Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold mb-4">Search Results</h1>

          <form onSubmit={handleSearch} className="relative">
            <div className="flex">
              <div className="relative flex-grow">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for food, categories, or cooks..."
                  className="w-full pl-10 pr-4 py-3 border rounded-l-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  aria-label="Search query"
                />
                <FiSearch className="absolute left-3 top-3.5 text-gray-400" size={20} />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                    aria-label="Clear search"
                  >
                    <FiX size={20} />
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-3 rounded-r-lg hover:bg-green-700 transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {!isLoading && initialQuery && (
            <div className="mt-4 flex flex-wrap items-center justify-between">
              <p className="text-gray-600">
                {getActiveTabResults()} results for <span className="font-medium">"{initialQuery}"</span>
              </p>

              <div className="flex items-center mt-2 sm:mt-0">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="mr-4 flex items-center text-gray-700 hover:text-green-600"
                >
                  <FiFilter className="mr-1" />
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </button>

                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="px-3 py-1.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  aria-label="Sort results"
                >
                  <option value="relevance">Sort by: Relevance</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Panel (Desktop) */}
          {showFilters && (
            <div className="md:w-1/4 bg-white rounded-lg shadow-md p-6 h-fit">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Filters</h2>
                <button onClick={clearFilters} className="text-sm text-green-600 hover:text-green-800">
                  Clear All
                </button>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">${filters.priceRange[0]}</span>
                  <span className="text-gray-600">${filters.priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={filters.priceRange[1]}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      priceRange: [prev.priceRange[0], Number.parseInt(e.target.value)],
                    }))
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Rating</h3>
                <div className="space-y-2">
                  {[4.5, 4, 3.5, 3].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => handleRatingFilter(rating)}
                      className={`flex items-center w-full px-3 py-2 rounded-md ${
                        filters.rating === rating ? "bg-green-100 text-green-800" : "hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={`${
                              i < Math.floor(rating)
                                ? "text-yellow-500 fill-current"
                                : i < rating
                                  ? "text-yellow-500 fill-current"
                                  : "text-gray-300"
                            } mr-0.5`}
                            size={16}
                          />
                        ))}
                        <span className="ml-2">{rating}+ stars</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {categories
                    .filter((category) => category.count > 0)
                    .map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryFilter(category.name)}
                        className={`flex items-center justify-between w-full px-3 py-2 rounded-md ${
                          filters.categories.includes(category.name)
                            ? "bg-green-100 text-green-800"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <span>{category.name}</span>
                        <span className="text-sm text-gray-500">({category.count})</span>
                      </button>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* Results Content */}
          <div className={`${showFilters ? "md:w-3/4" : "w-full"}`}>
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-md mb-6">
              <div className="flex overflow-x-auto">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-4 py-3 font-medium whitespace-nowrap ${
                    activeTab === "all"
                      ? "text-green-600 border-b-2 border-green-600"
                      : "text-gray-600 hover:text-green-600"
                  }`}
                >
                  All Results ({getTotalResults()})
                </button>

                <button
                  onClick={() => setActiveTab("food")}
                  className={`px-4 py-3 font-medium whitespace-nowrap ${
                    activeTab === "food"
                      ? "text-green-600 border-b-2 border-green-600"
                      : "text-gray-600 hover:text-green-600"
                  }`}
                >
                  Food Items ({filteredFoodItems.length})
                </button>

                <button
                  onClick={() => setActiveTab("categories")}
                  className={`px-4 py-3 font-medium whitespace-nowrap ${
                    activeTab === "categories"
                      ? "text-green-600 border-b-2 border-green-600"
                      : "text-gray-600 hover:text-green-600"
                  }`}
                >
                  Categories ({searchResults.categories.length})
                </button>

                <button
                  onClick={() => setActiveTab("cooks")}
                  className={`px-4 py-3 font-medium whitespace-nowrap ${
                    activeTab === "cooks"
                      ? "text-green-600 border-b-2 border-green-600"
                      : "text-gray-600 hover:text-green-600"
                  }`}
                >
                  Cooks ({searchResults.cooks.length})
                </button>
              </div>
            </div>

            {/* Loading State */}
            {isLoading ? (
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-16 h-16 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-600">Searching for "{initialQuery}"...</p>
                </div>
              </div>
            ) : (
              <>
                {/* Empty State */}
                {getTotalResults() === 0 && (
                  <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <div className="text-5xl mb-4">🔍</div>
                    <h2 className="text-xl font-bold mb-2">No results found</h2>
                    <p className="text-gray-600 mb-6">
                      We couldn't find any matches for "{initialQuery}". Please try another search term or browse our
                      categories.
                    </p>
                    <Link
                      to="/"
                      className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Browse All Categories
                    </Link>
                  </div>
                )}

                {/* Results Content */}
                {getTotalResults() > 0 && (
                  <div className="space-y-8">
                    {/* Food Items */}
                    {(activeTab === "all" || activeTab === "food") && filteredFoodItems.length > 0 && (
                      <div>
                        {activeTab === "all" && (
                          <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">Food Items</h2>
                            {filteredFoodItems.length > 3 && (
                              <button
                                onClick={() => setActiveTab("food")}
                                className="text-green-600 hover:text-green-800"
                              >
                                View All ({filteredFoodItems.length})
                              </button>
                            )}
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {(activeTab === "all" ? filteredFoodItems.slice(0, 6) : filteredFoodItems).map((item) => (
                            <Link
                              to={`/food/${item.id}`}
                              key={item.id}
                              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                            >
                              <div className="relative h-48">
                                <img
                                  src={item.img || "/placeholder.svg"}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full shadow-md flex items-center">
                                  <FiStar className="text-yellow-500 fill-current mr-1" />
                                  <span className="font-medium">{item.rating}</span>
                                </div>
                                <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 px-2 py-1 rounded-full text-white text-xs flex items-center">
                                  <FiClock className="mr-1" />
                                  <span>{item.preparationTime}</span>
                                </div>
                              </div>

                              <div className="p-4">
                                <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                                <p className="text-gray-600 text-sm mb-2">By {item.cook.name}</p>
                                <p className="text-gray-700 text-sm mb-3 line-clamp-2">{item.description}</p>

                                <div className="flex justify-between items-center">
                                  <span className="text-xl font-bold">${item.price}</span>
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault()
                                      handleAddToCart(item)
                                    }}
                                    className={`px-4 py-2 rounded-lg text-white transition-colors ${
                                      addedToCart === item.id ? "bg-green-700" : "bg-green-600 hover:bg-green-700"
                                    }`}
                                  >
                                    {addedToCart === item.id ? "Added!" : "Add to Cart"}
                                  </button>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Categories */}
                    {(activeTab === "all" || activeTab === "categories") && searchResults.categories.length > 0 && (
                      <div>
                        {activeTab === "all" && (
                          <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">Categories</h2>
                            {searchResults.categories.length > 4 && (
                              <button
                                onClick={() => setActiveTab("categories")}
                                className="text-green-600 hover:text-green-800"
                              >
                                View All ({searchResults.categories.length})
                              </button>
                            )}
                          </div>
                        )}

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                          {(activeTab === "all" ? searchResults.categories.slice(0, 4) : searchResults.categories).map(
                            (category) => (
                              <Link
                                to={`/category/${category.id}`}
                                key={category.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                              >
                                <div className="relative h-40">
                                  <img
                                    src={category.img || "/placeholder.svg"}
                                    alt={category.name}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                    <div className="text-center">
                                      <BiCategory className="mx-auto text-white text-3xl mb-2" />
                                      <h3 className="text-white font-bold text-lg">{category.name}</h3>
                                      <p className="text-white text-sm">{category.count} items</p>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            ),
                          )}
                        </div>
                      </div>
                    )}

                    {/* Cooks */}
                    {(activeTab === "all" || activeTab === "cooks") && searchResults.cooks.length > 0 && (
                      <div>
                        {activeTab === "all" && (
                          <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">Cooks</h2>
                            {searchResults.cooks.length > 4 && (
                              <button
                                onClick={() => setActiveTab("cooks")}
                                className="text-green-600 hover:text-green-800"
                              >
                                View All ({searchResults.cooks.length})
                              </button>
                            )}
                          </div>
                        )}

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                          {(activeTab === "all" ? searchResults.cooks.slice(0, 4) : searchResults.cooks).map((cook) => (
                            <Link
                              to={`/cook/${cook.id}`}
                              key={cook.id}
                              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                            >
                              <div className="relative h-40">
                                <img
                                  src={cook.img || "/placeholder.svg"}
                                  alt={cook.name}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                  <div className="text-center">
                                    <BiRestaurant className="mx-auto text-white text-3xl mb-2" />
                                    <h3 className="text-white font-bold text-lg">{cook.name}</h3>
                                    <p className="text-white text-sm">{cook.count} dishes</p>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

