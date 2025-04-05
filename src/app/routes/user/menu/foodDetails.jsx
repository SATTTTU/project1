import { useParams, Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";
import FoodImageSection from "@/modules/user/menu/components/foodImageSection";
import FoodInfoSection from "@/modules/user/menu/components/foodInfo";
import FoodTabs from "@/modules/user/menu/components/foodTabs";
import RelatedItems from "@/modules/user/menu/components/relatedItem";
import { useMenuItemsInfo } from "@/modules/user/cooks/api/getMenuItemsInfo";
import { useState } from "react";
import { useUpdateCartItem } from "@/modules/user/cart/api/updateItems";
import { Header } from "@/modules/user/dashboard/components/header";

export const FoodDetails = () => {
  const { id } = useParams();

  const { data: food, isLoading, error } = useMenuItemsInfo(id);
  console.log("food details ", food)
  const { updateItem } = useUpdateCartItem();
  
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <p>Loading food details...</p>
        </div>
      </div>
    );
  }

  if (error || !food) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <p>Error loading food details. Please try again later.</p>
        </div>
      </div>
    );
  }

  const handleQuantityChange = async (itemId, newQuantity) => {
    console.log("quantity", itemId, newQuantity)
    if (newQuantity < 1) return;
    try {
      await updateItem({ item_id: itemId, quantity: newQuantity });
      // refetch(); // Ensure cart updates
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(
      isFavorite
        ? `Removed ${food.name} from favorites`
        : `Added ${food.name} to favorites`,
      {
        position: "bottom-right",
        autoClose: 2000,
      }
    );
  };

  return (
    <div className="min-h-screen">
      <div className="">


      <Header />
      </div>

      <main className="container mx-auto px-4 py-6 lg:mt-30 mt-16"> {/* Added mt-16 */}
        <div className="mb-6 mt-2">
          <Link
            to="/dashboard"
            className="inline-flex items-center text-gray-600 hover:text-green-600 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-10">
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
            />
          </div>

          {/* <FoodTabs food={food} activeTab={activeTab} setActiveTab={setActiveTab} /> */}
        </div>
      </main>
    </div>
  );
};
