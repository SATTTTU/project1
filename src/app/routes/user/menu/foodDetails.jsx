import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { FiArrowLeft } from "react-icons/fi"
import { useDispatch } from "react-redux"
import { addToCart } from "../../../../store/cart/cart"
import { toast } from "react-toastify"
import { foodItemsData } from "../../../../modules/user/menu/components/data";
import { Header } from "@/modules/user/menu/components/header"
import FoodImageSection from "@/modules/user/menu/components/foodImageSection"
import FoodInfoSection from "@/modules/user/menu/components/foodInfo"
import FoodTabs from "@/modules/user/menu/components/foodTabs"
import RelatedItems from "@/modules/user/menu/components/relatedItem"

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
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <Link to="/user/home" className="inline-flex items-center text-gray-600 hover:text-green-600 transition-colors">
            <FiArrowLeft className="mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="md:flex">
            <FoodImageSection
              food={food} 
              isFavorite={isFavorite} 
              toggleFavorite={toggleFavorite} 
            />
            
            <FoodInfoSection
              food={food} 
              quantity={quantity} 
              handleQuantityChange={handleQuantityChange} 
              handleAddToCart={handleAddToCart} 
            />
          </div>

          <FoodTabs
            food={food} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
          />
        </div>

        {relatedItems.length > 0 && (
          <RelatedItems items={relatedItems} />
        )}
      </main>
    </div>
  )
}