
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { FiArrowLeft, FiStar, FiClock, FiInfo, FiShare2, FiMinus, FiPlus } from "react-icons/fi"
import { AiOutlineShoppingCart, AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { BiLeaf, BiRestaurant } from "react-icons/bi"
import { GiChiliPepper } from "react-icons/gi"
import { Header } from "../Header"
import { useDispatch } from "react-redux"
import { addToCart } from "../../../../../store/cart/cart"

import { toast } from "react-toastify"
import { foodItemsData } from "../../data/Data"


export const FoodDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const [food, setFood] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState("description")
  const [relatedItems, setRelatedItems] = useState([])

  useEffect(() => {
    const foodItem = foodItemsData.find((item) => item.id === Number.parseInt(id))
    if (foodItem) {
      setFood(foodItem)

      if (foodItem.relatedItems && foodItem.relatedItems.length > 0) {
        const related = foodItemsData.filter(
          (item) => foodItem.relatedItems.includes(item.id) && item.id !== foodItem.id,
        )
        setRelatedItems(related)
      }
    }

    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [id])

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    if (!food) return

    dispatch(
      addToCart({
        productId: food.id,
        quantity: quantity,
        name: food.name,
        price: food.price,
        img: food.img,
      }),
    )

    toast.success(`${quantity} × ${food.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 2000,
    })
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    toast.success(isFavorite ? `Removed ${food.name} from favorites` : `Added ${food.name} to favorites`, {
      position: "bottom-right",
      autoClose: 2000,
    })
  }

  if (!food) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
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

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-1/2">
              <div className="relative h-72 md:h-full">
                <img src={food.img || "/placeholder.svg"} alt={food.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={toggleFavorite}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    {isFavorite ? (
                      <AiFillHeart className="text-red-500 text-xl" />
                    ) : (
                      <AiOutlineHeart className="text-gray-600 text-xl" />
                    )}
                  </button>
                  <button
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    aria-label="Share"
                  >
                    <FiShare2 className="text-gray-600 text-xl" />
                  </button>
                </div>

                <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {food.category}
                </div>
              </div>
            </div>

            <div className="md:w-1/2 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{food.name}</h1>
                  <p className="text-gray-600 mt-1">
                    By{" "}
                    <Link to={`/cook/${food.cook.id}`} className="text-green-600 hover:underline">
                      {food.cook.name}
                    </Link>
                  </p>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-green-600">Rs. {food.price}</div>
              </div>

              <div className="flex items-center mt-4">
                <div className="flex items-center text-yellow-500">
                  <FiStar className="fill-current" />
                  <span className="ml-1 font-medium">{food.rating}</span>
                </div>
                <span className="text-gray-500 ml-2">({food.reviewCount} reviews)</span>

                <div className="flex items-center ml-6">
                  <FiClock className="text-gray-500" />
                  <span className="ml-1 text-gray-600">{food.preparationTime}</span>
                </div>
              </div>

              {/* Quick Info Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {food.isVegetarian && (
                  <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                    <BiLeaf className="mr-1" />
                    Vegetarian
                  </span>
                )}

                {food.spicyLevel && (
                  <span className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                    <GiChiliPepper className="mr-1" />
                    {food.spicyLevel}
                  </span>
                )}

                {food.tags &&
                  food.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
              </div>

              {/* Short Description */}
              <p className="mt-6 text-gray-700">{food.description}</p>

              {/* Allergens */}
              {food.allergens && food.allergens.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Allergens:</span> {food.allergens.join(", ")}
                  </p>
                </div>
              )}

              {/* Add to Cart Section */}
              <div className="mt-8">
                <div className="flex items-center mb-4">
                  <span className="mr-4 text-gray-700">Quantity:</span>
                  <div className="flex items-center border rounded-md overflow-hidden">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <FiMinus size={16} />
                    </button>
                    <span className="px-4 py-1 font-medium">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <FiPlus size={16} />
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                >
                  <AiOutlineShoppingCart className="mr-2 text-xl" />
                  Add to Cart - Rs. {(Number.parseFloat(food.price) * quantity).toFixed(2)}
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab("description")}
                className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
                  activeTab === "description"
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-600 hover:text-green-600"
                }`}
              >
                Description
              </button>

              <button
                onClick={() => setActiveTab("ingredients")}
                className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
                  activeTab === "ingredients"
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-600 hover:text-green-600"
                }`}
              >
                Ingredients
              </button>

              <button
                onClick={() => setActiveTab("nutrition")}
                className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
                  activeTab === "nutrition"
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-600 hover:text-green-600"
                }`}
              >
                Nutritional Info
              </button>

              <button
                onClick={() => setActiveTab("reviews")}
                className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
                  activeTab === "reviews"
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-600 hover:text-green-600"
                }`}
              >
                Reviews ({food.reviews ? food.reviews.length : 0})
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {/* Description Tab */}
              {activeTab === "description" && (
                <div>
                  <p className="text-gray-700">{food.description}</p>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center">
                      <FiClock className="text-green-600 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Preparation Time</p>
                        <p className="font-medium">{food.preparationTime}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <BiRestaurant className="text-green-600 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Category</p>
                        <p className="font-medium">{food.category}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <GiChiliPepper className="text-green-600 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Spicy Level</p>
                        <p className="font-medium">{food.spicyLevel || "None"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Ingredients Tab */}
              {activeTab === "ingredients" && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Ingredients</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {food.ingredients &&
                      food.ingredients.map((ingredient, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                          {ingredient}
                        </li>
                      ))}
                  </ul>

                  {food.allergens && food.allergens.length > 0 && (
                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-medium flex items-center text-yellow-800">
                        <FiInfo className="mr-2" />
                        Allergen Information
                      </h4>
                      <p className="mt-2 text-yellow-800">Contains: {food.allergens.join(", ")}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Nutrition Tab */}
              {activeTab === "nutrition" && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Nutritional Information</h3>

                  {food.nutritionalInfo ? (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-sm text-gray-500">Calories</p>
                        <p className="text-xl font-bold">{food.nutritionalInfo.calories}</p>
                        <p className="text-xs text-gray-500">kcal</p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-sm text-gray-500">Protein</p>
                        <p className="text-xl font-bold">{food.nutritionalInfo.protein}</p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-sm text-gray-500">Carbs</p>
                        <p className="text-xl font-bold">{food.nutritionalInfo.carbs}</p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-sm text-gray-500">Fat</p>
                        <p className="text-xl font-bold">{food.nutritionalInfo.fat}</p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-sm text-gray-500">Sodium</p>
                        <p className="text-xl font-bold">{food.nutritionalInfo.sodium}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-600">Nutritional information not available for this item.</p>
                  )}

                  <p className="mt-6 text-sm text-gray-500">
                    * Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower
                    depending on your calorie needs.
                  </p>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === "reviews" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium">Customer Reviews</h3>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      Write a Review
                    </button>
                  </div>

                  {food.reviews && food.reviews.length > 0 ? (
                    <div className="space-y-6">
                      {food.reviews.map((review) => (
                        <div key={review.id} className="border-b pb-6 last:border-b-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{review.user}</h4>
                              <div className="flex items-center mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <FiStar
                                    key={i}
                                    className={`${i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"} mr-1`}
                                  />
                                ))}
                                <span className="text-gray-500 text-sm ml-2">{review.date}</span>
                              </div>
                            </div>
                          </div>

                          <p className="mt-3 text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">No reviews yet. Be the first to review this item!</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Items */}
        {relatedItems.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-bold mb-6">You May Also Like</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedItems.map((item) => (
                <Link
                  to={`/food/${item.id}`}
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
                    <p className="text-gray-600 text-sm mb-3">By {item.cook.name}</p>

                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold">Rs. {item.price}</span>
                      <span className="text-sm text-gray-500">{item.preparationTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

