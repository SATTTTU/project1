
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { FiArrowLeft, FiStar, FiPhone, FiMail, FiMapPin, FiClock } from "react-icons/fi"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { addToCart } from "../../../../../store/cart/cart"
import { toast } from "react-toastify"
import { Header } from "../Header"
import Cook1 from "../../../../../assets/UserImages/cook/cook5.jpeg"
// import Back from "../../../../../assets/UserImages/cookbackground.png"
// Sample cook data - in a real app, this would come from an API
const cooksData = [
  {
    id: 1,
    name: "Ram Singh",
    img: Cook1,
    bio: "Specializing in authentic Indian cuisine with over 15 years of experience. My passion is creating flavorful dishes that bring people together.",
    rating: 4.8,
    reviewCount: 124,
    specialties: ["Indian", "Vegetarian", "Curry"],
    location: "Kathmandu, Nepal",
    phone: "+44 123 456 7890",
    email: "ram.singh@example.com",
    workingHours: "Mon-Sat: 9:00 AM - 8:00 PM",
    dishes: [
      {
        id: 101,
        name: "Butter Chicken",
        price: "14.99",
        img: "/placeholder.svg?height=200&width=300",
        description: "Tender chicken in a rich, creamy tomato sauce",
      },
      {
        id: 102,
        name: "Vegetable Biryani",
        price: "12.99",
        img: "/placeholder.svg?height=200&width=300",
        description: "Fragrant rice with mixed vegetables and spices",
      },
      {
        id: 103,
        name: "Paneer Tikka",
        price: "10.99",
        img: "/placeholder.svg?height=200&width=300",
        description: "Grilled cottage cheese with spices and vegetables",
      },
      {
        id: 104,
        name: "Chicken Tikka Masala",
        price: "15.99",
        img: "/placeholder.svg?height=200&width=300",
        description: "Grilled chicken pieces in a spiced curry sauce",
      },
    ],
    reviews: [
      {
        id: 1,
        user: "Sarah M.",
        rating: 5,
        comment: "The best Indian food I've had in London! Authentic flavors and generous portions.",
        date: "2 weeks ago",
      },
      {
        id: 2,
        user: "James P.",
        rating: 4,
        comment: "Delicious food, though delivery was a bit delayed. Would order again.",
        date: "1 month ago",
      },
      {
        id: 3,
        user: "Emma L.",
        rating: 5,
        comment: "Ram's Butter Chicken is to die for! Highly recommend.",
        date: "2 months ago",
      },
    ],
  },
  {
    id: 2,
    name: "Sushma Singh",
    img: "/placeholder.svg?height=300&width=300",
    bio: "I specialize in home-style North Indian cooking with a modern twist. My goal is to bring the authentic taste of my grandmother's kitchen to your table.",
    rating: 4.7,
    reviewCount: 98,
    specialties: ["North Indian", "Street Food", "Desserts"],
    location: "Kathmandu,Nepal",
    phone: "+44 123 456 7891",
    email: "sushma.singh@example.com",
    workingHours: "Mon-Sun: 10:00 AM - 9:00 PM",
    dishes: [
      {
        id: 201,
        name: "Chole Bhature",
        price: "13.99",
        img: "/placeholder.svg?height=200&width=300",
        description: "Spicy chickpea curry with fried bread",
      },
      {
        id: 202,
        name: "Aloo Paratha",
        price: "9.99",
        img: "/placeholder.svg?height=200&width=300",
        description: "Stuffed potato flatbread with yogurt",
      },
      {
        id: 203,
        name: "Gulab Jamun",
        price: "7.99",
        img: "/placeholder.svg?height=200&width=300",
        description: "Sweet milk dumplings soaked in rose syrup",
      },
      {
        id: 204,
        name: "Pani Puri",
        price: "8.99",
        img: "/placeholder.svg?height=200&width=300",
        description: "Crispy hollow shells with spicy tangy water",
      },
    ],
    reviews: [
      {
        id: 1,
        user: "Michael T.",
        rating: 5,
        comment: "Sushma's Chole Bhature is incredible! Authentic taste that reminds me of Delhi.",
        date: "1 week ago",
      },
      {
        id: 2,
        user: "Priya K.",
        rating: 4,
        comment: "Great food, though a bit on the spicy side. The desserts are amazing!",
        date: "3 weeks ago",
      },
      {
        id: 3,
        user: "David W.",
        rating: 5,
        comment: "Best Indian street food in London, hands down!",
        date: "1 month ago",
      },
    ],
  },
  {
    id: 3,
    name: "Arpita Thapa",
    img: "/placeholder.svg?height=300&width=300",
    bio: "I bring the flavors of Nepal and the Himalayas to your doorstep. My cooking focuses on fresh ingredients and traditional techniques passed down through generations.",
    rating: 4.9,
    reviewCount: 87,
    specialties: ["Nepalese", "Himalayan", "Momos"],
    location: "Biratnagar, Nepal",
    phone: "+44 123 456 7892",
    email: "arpita.thapa@example.com",
    workingHours: "Tue-Sun: 11:00 AM - 10:00 PM",
    dishes: [
      {
        id: 301,
        name: "Chicken Momos",
        price: "11.99",
        img: "/placeholder.svg?height=200&width=300",
        description: "Steamed dumplings filled with spiced chicken",
      },
      {
        id: 302,
        name: "Thukpa",
        price: "13.99",
        img: "/placeholder.svg?height=200&width=300",
        description: "Hearty noodle soup with vegetables and meat",
      },
      {
        id: 303,
        name: "Sel Roti",
        price: "8.99",
        img: "/placeholder.svg?height=200&width=300",
        description: "Traditional Nepali sweet ring bread",
      },
      {
        id: 304,
        name: "Aloo Tama",
        price: "12.99",
        img: "/placeholder.svg?height=200&width=300",
        description: "Potato and bamboo shoot curry",
      },
    ],
    reviews: [
      {
        id: 1,
        user: "Lisa R.",
        rating: 5,
        comment: "The momos are out of this world! Authentic Nepalese flavors.",
        date: "3 days ago",
      },
      {
        id: 2,
        user: "Tom H.",
        rating: 5,
        comment: "Arpita's Thukpa is perfect for cold London days. So comforting!",
        date: "2 weeks ago",
      },
      {
        id: 3,
        user: "Anita S.",
        rating: 4,
        comment: "Delicious food with great variety. The Sel Roti is a must-try!",
        date: "1 month ago",
      },
    ],
  },
  {
    id: 4,
    name: "Tawas Mom",
    img: "",
    bio: "I specialize in Filipino home cooking, bringing the vibrant flavors of the Philippines to London. My dishes are a blend of Spanish, American, and Asian influences.",
    rating: 4.6,
    reviewCount: 76,
    specialties: ["Filipino", "Asian Fusion", "BBQ"],
    location: "Dharan, Nepal",
    phone: "+44 123 456 7893",
    email: "tawas.mom@example.com",
    workingHours: "Wed-Mon: 12:00 PM - 9:00 PM",
    dishes: [
      {
        id: 401,
        name: "Chicken Adobo",
        price: "13.99",
        img: "/placeholder.svg?height=200&width=300",
        description: "Chicken marinated in vinegar, soy sauce, and spices",
      },
      {
        id: 402,
        name: "Pancit Bihon",
        price: "11.99",
        img: "/placeholder.svg?height=200&width=300",
        description: "Stir-fried rice noodles with meat and vegetables",
      },
      {
        id: 403,
        name: "Lechon Kawali",
        price: "15.99",
        img: "/placeholder.svg?height=200&width=300",
        description: "Crispy deep-fried pork belly",
      },
      {
        id: 404,
        name: "Halo-Halo",
        price: "8.99",
        img: "/placeholder.svg?height=200&width=300",
        description: "Mixed dessert with shaved ice, fruits, and sweet beans",
      },
    ],
    reviews: [
      {
        id: 1,
        user: "Carlos M.",
        rating: 5,
        comment: "Finally found authentic Filipino food in London! The Adobo is just like my grandmother's.",
        date: "1 week ago",
      },
      {
        id: 2,
        user: "Jenny K.",
        rating: 4,
        comment: "Great flavors and generous portions. The Halo-Halo is a perfect dessert!",
        date: "3 weeks ago",
      },
      {
        id: 3,
        user: "Mark L.",
        rating: 5,
        comment: "The Lechon Kawali is crispy perfection. Will definitely order again!",
        date: "1 month ago",
      },
    ],
  },
  {
    id: 5,
    name: "Rupger Ki",
    img: "/placeholder.svg?height=300&width=300",
    bio: "I bring the rich flavors of Tibet and the Himalayas to your table. My cooking emphasizes organic ingredients and traditional methods that have been used for centuries.",
    rating: 4.7,
    reviewCount: 65,
    specialties: ["Tibetan", "Himalayan", "Vegetarian"],
    location: "Kathamandu, Nepal",
    phone: "+44 123 456 7894",
    email: "rupger.ki@example.com",
    workingHours: "Mon-Sat: 10:00 AM - 8:00 PM",
    dishes: [
      {
        id: 501,
        name: "Beef Momos",
        price: "12.99",
        img: "/placeholder.svg?height=200&width=300",
        description: "Steamed dumplings with spiced beef filling",
      },
      {
        id: 502,
        name: "Thenthuk",
        price: "13.99",
        img: "/placeholder.svg?height=200&width=300",
        description: "Hand-pulled noodle soup with vegetables",
      },
      {
        id: 503,
        name: "Sha Phaley",
        price: "11.99",
        img: "/placeholder.svg?height=200&width=300",
        description: "Bread stuffed with seasoned beef and cabbage",
      },
      {
        id: 504,
        name: "Butter Tea",
        price: "4.99",
        img: "/placeholder.svg?height=200&width=300",
        description: "Traditional Tibetan tea made with butter and salt",
      },
    ],
    reviews: [
      {
        id: 1,
        user: "Nina P.",
        rating: 5,
        comment: "The momos are incredible! So flavorful and perfectly cooked.",
        date: "2 weeks ago",
      },
      {
        id: 2,
        user: "Robert J.",
        rating: 4,
        comment: "Authentic Tibetan cuisine that's hard to find elsewhere in London.",
        date: "1 month ago",
      },
      {
        id: 3,
        user: "Sophie T.",
        rating: 5,
        comment: "The Thenthuk is perfect for cold days. So comforting and delicious!",
        date: "2 months ago",
      },
    ],
  },
]

export const CookProfile = () => {
  const { id } = useParams()
  const [cook, setCook] = useState(null)
  const [activeTab, setActiveTab] = useState("menu")
  const [isFavorite, setIsFavorite] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const cookData = cooksData.find((c) => c.id === Number.parseInt(id))
    if (cookData) {
      setCook(cookData)
    }
    window.scrollTo(0, 0)
  }, [id])

  const handleAddToCart = (dish) => {
    dispatch(
      addToCart({
        productId: dish.id,
        quantity: 1,
        name: dish.name,
        price: dish.price,
        img: dish.img,
      }),
    )

    toast.success(`${dish.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 2000,
    })
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    toast.success(isFavorite ? `Removed ${cook.name} from favorites` : `Added ${cook.name} to favorites`, {
      position: "bottom-right",
      autoClose: 2000,
    })
  }

  if (!cook) {
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
        {/* Back button */}
        <div className="mb-6">
          <Link to="/user/home" className="inline-flex items-center text-gray-600 hover:text-green-600 transition-colors">
            <FiArrowLeft className="mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Cook Profile Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="relative h-48 bg-gradient-to-r from-[#426B1F] to-green-600">
            <button
              onClick={toggleFavorite}
              className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
            >
              {isFavorite ? (
                <AiFillHeart className="text-red-500 text-xl" />
              ) : (
                <AiOutlineHeart className="text-gray-600 text-xl" />
              )}
            </button>
          </div>

          <div className="relative px-6 pb-6">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4">
                <img
                  src={cook.img || "/placeholder.svg"}
                  alt={cook.name}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg -mt-16 md:-mt-20 mx-auto md:mx-0"
                />
              </div>

              <div className="md:w-3/4 mt-4 md:mt-0 text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold">{cook.name}</h1>

                <div className="flex items-center justify-center md:justify-start mt-2">
                  <div className="flex items-center text-yellow-500 mr-2">
                    <FiStar className="fill-current" />
                    <span className="ml-1 font-medium">{cook.rating}</span>
                  </div>
                  <span className="text-gray-500">({cook.reviewCount} reviews)</span>
                </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                  {cook.specialties.map((specialty, index) => (
                    <span key={index} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      {specialty}
                    </span>
                  ))}
                </div>

                <p className="mt-4 text-gray-600">{cook.bio}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="flex items-center">
                    <FiMapPin className="text-gray-500 mr-2" />
                    <span className="text-gray-700">{cook.location}</span>
                  </div>

                  <div className="flex items-center">
                    <FiPhone className="text-gray-500 mr-2" />
                    <span className="text-gray-700">{cook.phone}</span>
                  </div>

                  <div className="flex items-center">
                    <FiClock className="text-gray-500 mr-2" />
                    <span className="text-gray-700">{cook.workingHours}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab("menu")}
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "menu"
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-600 hover:text-green-600"
              }`}
            >
              Menu
            </button>

            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "reviews"
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-600 hover:text-green-600"
              }`}
            >
              Reviews ({cook.reviewCount})
            </button>

            <button
              onClick={() => setActiveTab("about")}
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "about"
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-600 hover:text-green-600"
              }`}
            >
              About
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mb-12">
          {/* Menu Tab */}
          {activeTab === "menu" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Menu</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cook.dishes.map((dish) => (
                  <div key={dish.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img src={dish.img || "/placeholder.svg"} alt={dish.name} className="w-full h-48 object-cover" />

                    <div className="p-4">
                      <h3 className="font-bold text-lg">{dish.name}</h3>
                      <p className="text-gray-600 text-sm mt-1">{dish.description}</p>

                      <div className="flex justify-between items-center mt-4">
                        <span className="text-lg font-bold">Rs. {dish.price}</span>
                        <button
                          onClick={() => handleAddToCart(dish)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Customer Reviews</h2>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Write a Review
                </button>
              </div>

              <div className="space-y-6">
                {cook.reviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold">{review.user}</h3>
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
            </div>
          )}

          {/* About Tab */}
          {activeTab === "about" && (
            <div>
              <h2 className="text-xl font-bold mb-4">About {cook.name}</h2>

              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-700 mb-6">{cook.bio}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-lg mb-3">Contact Information</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <FiMapPin className="text-green-600 mr-3" />
                        <span>{cook.location}</span>
                      </li>
                      <li className="flex items-center">
                        <FiPhone className="text-green-600 mr-3" />
                        <span>{cook.phone}</span>
                      </li>
                      <li className="flex items-center">
                        <FiMail className="text-green-600 mr-3" />
                        <span>{cook.email}</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-3">Working Hours</h3>
                    <p className="flex items-center">
                      <FiClock className="text-green-600 mr-3" />
                      <span>{cook.workingHours}</span>
                    </p>

                    <h3 className="font-bold text-lg mt-6 mb-3">Specialties</h3>
                    <div className="flex flex-wrap gap-2">
                      {cook.specialties.map((specialty, index) => (
                        <span key={index} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

