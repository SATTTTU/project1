import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../store/cart/cart";
import { LoadingSkeleton } from "@/modules/user/cooks/components/loadingSkeleton";
import { CookTabs } from "@/modules/user/cooks/components/cookTabs";
import { CookCategories } from "@/modules/user/cooks/components/cookCategories";
import { Header } from "@/modules/user/dashboard/components/header";
import { useGetSingleCook } from "@/modules/user/cooks/api/getCookProfie";
import { CookReviews } from "@/modules/user/cooks/components/cookReviews";
import { AboutTab } from "@/modules/user/cooks/components/aboutTab";
import { UseSetCookStatus } from "@/modules/cook/homepage/api/availableStatus";

export const CookProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: cookData, isLoading, isError } = useGetSingleCook(id);
  const { data: cookStatus, isLoading: statusLoading } = UseSetCookStatus(id); // Fetch cook status
  const [cook, setCook] = useState({
    reviews: [],
    reviewCount: 0,
    available_status: "offline", 
  });
  const [activeTab, setActiveTab] = useState("categories");

  const videoBaseUrl = "https://khajabox-bucket.s3.ap-south-1.amazonaws.com/";

  useEffect(() => {
    if (cookData) {
      setCook(cookData);
    }
  }, [cookData]);

  useEffect(() => {
    if (cookStatus) {
      setCook((prevCook) => ({
        ...prevCook,
        available_status: cookStatus?.available_status,
      }));
    }
  }, [cookStatus]); // Update cook status from the server

  const handleAddToCart = (dish) => {
    if (!dish) return;
    dispatch(
      addToCart({
        productId: dish.id,
        quantity: 1,
        name: dish?.name,
        price: dish.price,
        img: dish.img,
      })
    );
    toast.success(`${dish?.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  if (isLoading || statusLoading) return <LoadingSkeleton />;
  if (isError)
    return <p className="text-red-500 text-center py-4">Failed to load cook profile.</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <div className="mb-4">
          <Link
            to="/dashboard"
            className="flex items-center text-gray-700 hover:text-green-600 transition"
          >
            <FiArrowLeft className="mr-2" /> Back to Home
          </Link>
        </div>

        <section className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src={`${videoBaseUrl}${cook?.image_url}`}
            alt={cook?.name || "Cook Profile"}
            className="w-40 h-40 rounded-full object-cover border-4 border-green-500 shadow-md"
          />
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800">{cook?.name || "Unknown Cook"}</h2>
            <p className="text-gray-600">{cook?.email || "No email available"}</p>
            <p
              className={`mt-2 px-4 py-2 text-sm font-semibold rounded-full inline-block shadow-md ${
                cook?.available_status === "online"
                  ? "bg-green-100 text-green-700"
                  : cook?.available_status === "busy"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {cook?.available_status || "Unavailable"}
            </p>
          </div>
        </section>

        <div className="mt-6">
          <CookTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            reviewCount={cook?.reviews?.length}
          />
        </div>

        <div className="mt-8">
          {activeTab === "categories" && (
            <>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Food Categories</h2>
              {cook?.available_status === "offline" || cook?.available_status === "busy" ? (
                <div className="p-6 bg-yellow-100 text-yellow-800 rounded-lg shadow">
                  This cook is currently <strong>{cook?.available_status}</strong>. You cannot order items at the moment.
                </div>
              ) : (
                <CookCategories
                  cookId={cook?.id}
                  cook={cook}
                  onAddToCart={handleAddToCart}
                  disabled={cook?.available_status === "offline" || cook?.available_status === "busy"}
                />
              )}
            </>
          )}

          {activeTab === "reviews" && (
            <CookReviews
              id={cook?.id}
              reviews={cook?.reviews}
              reviewCount={cook?.reviewCount || 0}
              cookId={cook?.id}
              cookName={cook?.name}
              setCook={setCook}
            />
          )}
          {activeTab === "about" && <AboutTab cook={cook} />}
        </div>
      </main>
    </div>
  );
};
