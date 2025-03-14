import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { FiArrowLeft } from "react-icons/fi"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { addToCart } from "../../../../store/cart/cart"
import { cooksData } from "../../../../modules/user/Homepage/component/data";
import { LoadingSkeleton } from "@/modules/user/CookSection/components/loadingSkeleton";
import { Header } from "@/modules/user/CookSection/components/header";
import { CookProfileHeader } from "@/modules/user/CookSection/components/cookProfileHeader";
import { CookTabs } from "@/modules/user/CookSection/components/cookTabs";
import { CookCategories } from "@/modules/user/CookSection/components/cookCategories";
import { AboutTab } from "@/modules/user/CookSection/components/aboutTab";
import { CookReviews } from "@/modules/user/CookSection/components/cookReviews";


export const CookProfile = () => {
  const { id } = useParams()
  const [cook, setCook] = useState(null)
  const [activeTab, setActiveTab] = useState("categories")
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
    return <LoadingSkeleton />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <Link to="/user/dashboard" className="inline-flex items-center text-gray-600 hover:text-green-600 transition-colors">
            <FiArrowLeft className="mr-2" />
            Back to Home
          </Link>
        </div>

        <CookProfileHeader cook={cook} isFavorite={isFavorite} toggleFavorite={toggleFavorite} />

        <CookTabs activeTab={activeTab} setActiveTab={setActiveTab} reviewCount={cook.reviewCount} />

        <div className="mb-12">
          {activeTab === "categories" && (
            <div>
              <h2 className="text-xl font-bold mb-6">Food Categories</h2>
              <CookCategories cook={cook} onAddToCart={handleAddToCart} />
            </div>
          )}

          {activeTab === "reviews" && <CookReviews reviews={cook.reviews} />}

          {activeTab === "about" && <AboutTab cook={cook} />}
        </div>
      </main>
    </div>
  )
}