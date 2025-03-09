
import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify" // Import toast for notifications
import Category1 from "../../../../assets/UserImages/Category/Cato1.jpg"
import Cook1 from "../../../../assets/UserImages/cook/cook1.png"
import Cook2 from "../../../../assets/UserImages/cook/cook2.jpeg"
import Cook3 from "../../../../assets/UserImages/cook/cook3.jpeg"
import Cook4 from "../../../../assets/UserImages/cook/cook5.jpeg"
import Burger from "../../../../assets/UserImages/burger.jpg"
import Grand from "../../../../assets/UserImages/Ai.jpeg"
import Lunch from "../../../../assets/UserImages/Lunch.jpeg"
import { Badge } from "../../../../components/ui/badge/Badge"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { useSelector, useDispatch } from "react-redux"
import { Header } from "./header" // Import the Header component
import { addToCart } from "../../../../store/cart/cart"
import { FiStar, FiClock, FiSearch } from "react-icons/fi"
import { Footer } from "./Footer"

export const Homepage = () => {
  const carts = useSelector((store) => store.cart.items)
  const dispatch = useDispatch()
  const searchRef = useRef(null)
  const navigate = useNavigate()

  // Search state
  const [searchTerm, setSearchTerm] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [searchResults, setSearchResults] = useState({
    menuItems: [],
    categories: [],
    cooks: [],
  })

  // Cart animation state
  const [addedToCart, setAddedToCart] = useState(null)

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)

    if (value.trim() === "") {
      setShowResults(false)
    } else {
      setShowResults(true)
      performSearch(value)
    }
  }

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`)
    }
  }

  // Perform search across all data types
  const performSearch = (term) => {
    const lowerCaseTerm = term.toLowerCase()

    // Search menu items
    const filteredMenuItems = popularItems.filter((item) => item.name.toLowerCase().includes(lowerCaseTerm))

    // Search categories
    const filteredCategories = categories.filter((category) => category.name.toLowerCase().includes(lowerCaseTerm))

    // Search cooks
    const filteredCooks = cooks.filter((cook) => cook.name.toLowerCase().includes(lowerCaseTerm))

    setSearchResults({
      menuItems: filteredMenuItems,
      categories: filteredCategories,
      cooks: filteredCooks,
    })
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

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
        productId: item.productId,
        quantity: 1,
        name: item.name,
        price: item.price,
        img: item.img,
      }),
    )

    // Set animation state
    setAddedToCart(item.productId)

    // Show success notification
    toast.success(`${item.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 2000,
    })
  }

  // Handle search result click
  const handleSearchResultClick = (type, id) => {
    setShowResults(false)
    if (type === "menuItem") {
      navigate(`/food/${id}`)
    } else if (type === "category") {
      navigate(`/category/${id}`)
    } else if (type === "cook") {
      navigate(`/cook/${id}`)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container px-4 py-6 mx-auto">
        <section className="mb-8">
          <div className="flex flex-col md:flex-row  md:items-center  justify-between mb-4">
            <h2 className="text-xl font-bold">Up to -40% deals</h2>
            <div className="relative mt-2 md:mt-0 md:w-96" ref={searchRef}>
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search from menu..."
                    className="pl-10 pr-4 py-2 w-full  border rounded-full"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <FiSearch className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                  <button
                    type="submit"
                    className="absolute right-2 top-1.5 bg-green-600 text-white p-1 rounded-full hover:bg-green-700 transition-colors"
                    aria-label="Search"
                  >
                    <FiSearch className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {/* Search Results Dropdown */}
              {showResults && (
                <div className="absolute z-50 mt-2 w-full bg-white rounded-lg shadow-lg border overflow-hidden">
                  {searchResults.menuItems.length === 0 &&
                  searchResults.categories.length === 0 &&
                  searchResults.cooks.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">No results found</div>
                  ) : (
                    <div className="max-h-[70vh] overflow-y-auto">
                      {/* Menu Items Results */}
                      {searchResults.menuItems.length > 0 && (
                        <div className="p-3">
                          <h3 className="text-sm font-semibold text-gray-700 mb-2 border-b pb-1">Menu Items</h3>
                          <div className="grid gap-3">
                            {searchResults.menuItems.map((item) => (
                              <div
                                key={`menu-${item.productId}`}
                                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                                onClick={() => handleSearchResultClick("menuItem", item.productId)}
                              >
                                <img
                                  src={item.img || "/placeholder.svg"}
                                  alt={item.name}
                                  className="w-12 h-12 object-cover rounded"
                                />
                                <div className="flex-1">
                                  <h4 className="font-medium text-sm">{item.name}</h4>
                                  <p className="text-green-600 font-semibold">${item.price}</p>
                                </div>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleAddToCart(item)
                                  }}
                                  className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                                >
                                  Add
                                </button>
                              </div>
                            ))}
                          </div>
                          <div className="mt-2 text-center">
                            <button
                              onClick={() => {
                                navigate(`/search?q=${encodeURIComponent(searchTerm)}`)
                                setShowResults(false)
                              }}
                              className="text-green-600 text-sm hover:underline"
                            >
                              See all results
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Categories Results */}
                      {searchResults.categories.length > 0 && (
                        <div className="p-3 border-t">
                          <h3 className="text-sm font-semibold text-gray-700 mb-2 border-b pb-1">Categories</h3>
                          <div className="flex flex-wrap gap-3">
                            {searchResults.categories.map((category, index) => (
                              <div
                                key={`category-${index}`}
                                className="flex flex-col items-center cursor-pointer"
                                onClick={() => handleSearchResultClick("category", category.id)}
                              >
                                <img
                                  src={category.img || "/placeholder.svg"}
                                  alt={category.name}
                                  className="w-14 h-14 object-cover rounded-full"
                                />
                                <p className="text-xs mt-1">{category.name}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Cooks Results */}
                      {searchResults.cooks.length > 0 && (
                        <div className="p-3 border-t">
                          <h3 className="text-sm font-semibold text-gray-700 mb-2 border-b pb-1">Cooks</h3>
                          <div className="flex flex-wrap gap-3">
                            {searchResults.cooks.map((cook, index) => (
                              <div
                                key={`cook-${index}`}
                                className="flex flex-col items-center cursor-pointer"
                                onClick={() => handleSearchResultClick("cook", cook.id)}
                              >
                                <img
                                  src={cook.img || "/placeholder.svg"}
                                  alt={cook.name}
                                  className="w-14 h-14 object-cover rounded-full"
                                />
                                <p className="text-xs mt-1">{cook.name}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="outline" className="px-3 py-1 rounded-full">
              Vegan
            </Badge>
            <Badge variant="outline" className="px-3 py-1 rounded-full">
              Sushi
            </Badge>
            <Badge variant="outline" className="px-3 py-1 rounded-full text-green-500 border-green-500">
              Pizza & Fast food
            </Badge>
            <Badge variant="outline" className="px-3 py-1 rounded-full">
              Others
            </Badge>
          </div>

          <div className="grid grid-cols-1 gap-4  lg:grid-cols-3">
            {/* Restaurant Card 1 */}
            <div className="overflow-hidden bg-white rounded-lg shadow-md">
              <div className="relative">
                <img
                  src={Category1 || "/placeholder.svg"}
                  alt="Chef Burgers"
                  width={400}
                  height={400}
                  className="object-cover w-full h-60"
                />
                <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-xs font-bold rounded">
                  -40%
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                  <span className="text-xs font-medium text-white">BURGERS</span>
                  <h3 className="text-lg font-bold text-white">Chef Burgers</h3>
                  <p className="text-sm text-white">London</p>
                </div>
              </div>
            </div>

            {/* Restaurant Card 2 */}
            <div className="overflow-hidden bg-white rounded-lg shadow-md">
              <div className="relative">
                <img
                  src={Grand || "/placeholder.svg"}
                  alt="Grand Al Café"
                  width={400}
                  height={400}
                  className="object-cover w-full h-60"
                />
                <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-xs font-bold rounded">
                  -30%
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                  <span className="text-xs font-medium text-white">CAFÉ</span>
                  <h3 className="text-lg font-bold text-white">Grand Al Café</h3>
                  <p className="text-sm text-white">London</p>
                </div>
              </div>
            </div>

            {/* Restaurant Card 3 */}
            <div className="overflow-hidden bg-white rounded-lg shadow-md">
              <div className="relative">
                <img
                  src={Lunch || "/placeholder.svg"}
                  alt="Buttered Café"
                  width={400}
                  height={400}
                  className="object-cover w-full h-60"
                />
                <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-xs font-bold rounded">
                  -17%
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                  <span className="text-xs font-medium text-white">CAFÉ</span>
                  <h3 className="text-lg font-bold text-white">Buttered Café</h3>
                  <p className="text-sm text-white">London</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Categories */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl text-center font-bold text-gray-800">Popular Categories </h2>
          <div className="grid grid-cols-1 gap-6  md:grid-cols-2 lg:grid-cols-6">
            {categories.map((category, index) => (
              <Link
                to={`/category/${category.id}`}
                key={index}
                className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg"
              >
                <div className="w-40 h-40 mb-3 overflow-hidden rounded-full bg-gray-100 shadow-md">
                  <img
                    src={category.img || "/placeholder.svg"}
                    alt={category.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className="text-sm font-medium text-gray-700 sm:text-base">{category.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular Cooks */}
        <section className="p-6 mb-12 rounded-lg bg-white">
          <h2 className="mb-6 text-2xl font-bold text-center text-green-600">Popular Cooks</h2>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:grid-cols-5">
            {cooks.map((cook, index) => (
              <Link
                to={`/cook/${cook.id}`}
                key={index}
                className="flex flex-col items-center p-4 transition-transform transform bg-blue rounded-sm w-40 md:w-50 shadow-md hover:scale-105 hover:shadow-lg"
              >
                <div className="relative mb-3 overflow-hidden w-40 h-40 md:w-50 md:h-50">
                  <img src={cook.img || "/placeholder.svg"} alt={cook.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-sm font-medium text-gray-800 sm:text-base">{cook.name}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold text-center">Popular Items</h2>
          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              className="pb-30"
              style={{
                paddingBottom: "50px", // Space for pagination dots
              }}
            >
              {popularItems.map((item) => (
                <SwiperSlide key={item.productId}>
                  <Link to={`/food/${item.productId}`} className="block">
                    <div className="overflow-hidden bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img
                          src={item.img || "/placeholder.svg"}
                          alt={item.name}
                          width={600}
                          height={200}
                          className="object-cover w-full h-48 md:h-56 lg:h-64"
                        />
                        {item.rating && (
                          <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full shadow-md flex items-center">
                            <FiStar className="text-yellow-500 fill-current mr-1" />
                            <span className="font-medium">{item.rating}</span>
                          </div>
                        )}
                        {item.preparationTime && (
                          <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 px-2 py-1 rounded-full text-white text-xs flex items-center">
                            <FiClock className="mr-1" />
                            <span>{item.preparationTime}</span>
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <h3 className="text-lg font-medium">{item.name}</h3>
                        <p className="mb-3 text-lg font-bold">${item.price}</p>
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            handleAddToCart(item)
                          }}
                          className={`w-full py-3 rounded-xl text-white transition-all duration-300 ${
                            addedToCart === item.productId ? "bg-green-700" : "bg-green-600 hover:bg-green-700"
                          }`}
                        >
                          {addedToCart === item.productId ? "Added to Cart!" : "Order Now"}
                        </button>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
       <Footer/>
      </main>
    </div>
  )
}

// Sample data
const categories = [
  { id: 1, name: "Burgers & Fast", img: Category1 },
  { id: 2, name: "Salads", img: Category1 },
  { id: 3, name: "Pasta & Cousous", img: Category1 },
  { id: 4, name: "Pizza", img: Category1 },
  { id: 5, name: "Breakfast", img: Category1 },
  { id: 6, name: "Soups", img: Category1 },
]

const cooks = [
  { id: 1, name: "Ram Singh", img: Cook1 },
  { id: 2, name: "Sushma Singh", img: Cook2 },
  { id: 3, name: "Arpita Thapa", img: Cook3 },
  { id: 4, name: "Tawas Mom", img: Cook4 },
  { id: 5, name: "Rupger Ki", img: Cook1 },
]

const popularItems = [
  { productId: 1, name: "Cheese Burger", price: "11.88", img: Burger, rating: 4.8, preparationTime: "15-20 min" },
  { productId: 2, name: "Pancake", price: "11.99", img: Burger, rating: 4.7, preparationTime: "10-15 min" },
  { productId: 3, name: "Crispy Sandwich", price: "13.99", img: Burger, rating: 4.6, preparationTime: "15-20 min" },
  { productId: 4, name: "Chicken Wrap", price: "12.99", img: Burger, rating: 4.5, preparationTime: "10-15 min" },
  { productId: 5, name: "Veggie Bowl", price: "10.99", img: Burger, rating: 4.7, preparationTime: "15-20 min" },
  { productId: 6, name: "Steak Sandwich", price: "15.99", img: Burger, rating: 4.9, preparationTime: "20-25 min" },
]

